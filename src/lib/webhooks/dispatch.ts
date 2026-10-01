import { WebhookEvent } from "@prisma/client";
import { prisma } from "@/lib/db";
import { buildOrderCreatedPayload } from "@/lib/webhooks/order-payload";
import type { OrderCreatedWebhookPayload } from "@/lib/webhooks/types";

const DELIVERY_TIMEOUT_MS = 8_000;

type PostResult =
  | { ok: true; httpStatus: number }
  | { ok: false; httpStatus: number | null; error: string };

async function postWebhook(
  url: string,
  payload: OrderCreatedWebhookPayload,
): Promise<PostResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DELIVERY_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "ELFA-Webhook/1.0",
        "X-ELFA-Event": payload.event,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!res.ok) {
      return {
        ok: false,
        httpStatus: res.status,
        error: `HTTP ${res.status}`,
      };
    }
    return { ok: true, httpStatus: res.status };
  } catch (error) {
    const message =
      error instanceof Error ? error.message.slice(0, 200) : "Delivery failed";
    return { ok: false, httpStatus: null, error: message };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Load active ORDER_CREATED endpoints and POST the order payload.
 * Writes WebhookDeliveryLog rows; never throws to the caller.
 */
export async function dispatchOrderCreatedWebhooks(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });
  if (!order) return;

  const endpoints = await prisma.webhookEndpoint.findMany({
    where: { enabled: true, event: WebhookEvent.ORDER_CREATED },
  });
  if (!endpoints.length) return;

  const payload = buildOrderCreatedPayload(order);

  await Promise.all(
    endpoints.map(async (endpoint) => {
      const result = await postWebhook(endpoint.url, payload);
      const deliveredAt = new Date();

      try {
        await prisma.$transaction([
          prisma.webhookDeliveryLog.create({
            data: {
              orderId,
              endpointId: endpoint.id,
              endpointUrl: endpoint.url,
              endpointLabel: endpoint.label,
              event: WebhookEvent.ORDER_CREATED,
              success: result.ok,
              httpStatus: result.ok ? result.httpStatus : result.httpStatus,
              error: result.ok ? "" : result.error,
              createdAt: deliveredAt,
            },
          }),
          prisma.webhookEndpoint.update({
            where: { id: endpoint.id },
            data: result.ok
              ? {
                  lastStatus: "ok",
                  lastError: "",
                  lastDeliveredAt: deliveredAt,
                }
              : {
                  lastStatus: "error",
                  lastError: result.error,
                  lastDeliveredAt: deliveredAt,
                },
          }),
        ]);
      } catch (error) {
        console.error(
          "[webhook] failed to persist delivery log",
          endpoint.id,
          error,
        );
      }
    }),
  );
}

/** Fire-and-forget wrapper so checkout never waits on third parties. */
export function enqueueOrderCreatedWebhooks(orderId: string) {
  void dispatchOrderCreatedWebhooks(orderId).catch((error) => {
    console.error("[webhook] dispatch failed", orderId, error);
  });
}
