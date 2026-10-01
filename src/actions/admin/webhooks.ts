"use server";

import { WebhookEvent, type WebhookEndpoint } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { webhookUrlSchema } from "@/lib/webhooks/types";

export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export type WebhookView = {
  id: string;
  url: string;
  label: string;
  event: WebhookEvent;
  enabled: boolean;
  lastStatus: string | null;
  lastError: string;
  lastDeliveredAt: string | null;
  createdAt: string;
};

function toView(row: WebhookEndpoint): WebhookView {
  return {
    id: row.id,
    url: row.url,
    label: row.label,
    event: row.event,
    enabled: row.enabled,
    lastStatus: row.lastStatus,
    lastError: row.lastError,
    lastDeliveredAt: row.lastDeliveredAt?.toISOString() ?? null,
    createdAt: row.createdAt.toISOString(),
  };
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function listWebhooks(): Promise<ActionResult<WebhookView[]>> {
  await requireAdmin();
  const rows = await prisma.webhookEndpoint.findMany({
    orderBy: { createdAt: "desc" },
  });
  return { ok: true, data: rows.map(toView) };
}

export async function createWebhook(input: {
  url: string;
  label?: string;
}): Promise<ActionResult<WebhookView>> {
  await requireAdmin();

  const parsed = webhookUrlSchema.safeParse(input.url);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid URL" };
  }

  const row = await prisma.webhookEndpoint.create({
    data: {
      url: parsed.data,
      label: (input.label ?? "").trim().slice(0, 80),
      event: WebhookEvent.ORDER_CREATED,
      enabled: true,
    },
  });

  const { recordAdminAudit } = await import("@/actions/admin/audit");
  await recordAdminAudit({
    action: "admin.webhook.create",
    detail: row.url,
  });

  return { ok: true, data: toView(row) };
}

export async function updateWebhook(
  id: string,
  input: { url?: string; label?: string; enabled?: boolean },
): Promise<ActionResult<WebhookView>> {
  await requireAdmin();

  const existing = await prisma.webhookEndpoint.findUnique({ where: { id } });
  if (!existing) return { ok: false, error: "Webhook not found." };

  let url = existing.url;
  if (input.url != null) {
    const parsed = webhookUrlSchema.safeParse(input.url);
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Invalid URL",
      };
    }
    url = parsed.data;
  }

  const row = await prisma.webhookEndpoint.update({
    where: { id },
    data: {
      url,
      ...(input.label != null
        ? { label: input.label.trim().slice(0, 80) }
        : {}),
      ...(input.enabled != null ? { enabled: input.enabled } : {}),
    },
  });

  const { recordAdminAudit } = await import("@/actions/admin/audit");
  await recordAdminAudit({
    action: "admin.webhook.update",
    detail: `${id} enabled=${row.enabled}`,
  });

  return { ok: true, data: toView(row) };
}

export async function deleteWebhook(id: string): Promise<ActionResult> {
  await requireAdmin();

  try {
    await prisma.webhookEndpoint.delete({ where: { id } });
  } catch {
    return { ok: false, error: "Webhook not found." };
  }

  const { recordAdminAudit } = await import("@/actions/admin/audit");
  await recordAdminAudit({
    action: "admin.webhook.delete",
    detail: id,
  });

  return { ok: true, data: undefined };
}

export type WebhookLogView = {
  id: string;
  orderId: string;
  endpointUrl: string;
  endpointLabel: string;
  event: WebhookEvent;
  success: boolean;
  httpStatus: number | null;
  error: string;
  createdAt: string;
};

export type PaginatedWebhookLogs = {
  items: WebhookLogView[];
  total: number;
  page: number;
  pageSize: number;
};

function toLogView(row: {
  id: string;
  orderId: string;
  endpointUrl: string;
  endpointLabel: string;
  event: WebhookEvent;
  success: boolean;
  httpStatus: number | null;
  error: string;
  createdAt: Date;
}): WebhookLogView {
  return {
    id: row.id,
    orderId: row.orderId,
    endpointUrl: row.endpointUrl,
    endpointLabel: row.endpointLabel,
    event: row.event,
    success: row.success,
    httpStatus: row.httpStatus,
    error: row.error,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function listWebhookLogs(filters?: {
  orderId?: string;
  page?: number;
  pageSize?: number;
}): Promise<ActionResult<PaginatedWebhookLogs>> {
  await requireAdmin();
  const orderId = filters?.orderId?.trim() ?? "";
  const pageSize = Math.min(Math.max(filters?.pageSize ?? 20, 1), 100);
  const page = Math.max(filters?.page ?? 1, 1);

  const where = orderId
    ? { orderId: { contains: orderId, mode: "insensitive" as const } }
    : {};

  const [total, rows] = await Promise.all([
    prisma.webhookDeliveryLog.count({ where }),
    prisma.webhookDeliveryLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  return {
    ok: true,
    data: {
      items: rows.map(toLogView),
      total,
      page,
      pageSize,
    },
  };
}

export async function listWebhookLogsForOrder(
  orderId: string,
): Promise<ActionResult<WebhookLogView[]>> {
  await requireAdmin();
  const rows = await prisma.webhookDeliveryLog.findMany({
    where: { orderId },
    orderBy: { createdAt: "desc" },
  });
  return { ok: true, data: rows.map(toLogView) };
}
