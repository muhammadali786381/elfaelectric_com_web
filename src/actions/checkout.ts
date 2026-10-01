"use server";

import { CouponStatus, OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { parseCheckoutForm, zodFieldErrors } from "@/lib/checkout-schema";
import { computeCouponDiscount } from "@/lib/coupons";
import {
  generateOrderId,
  type CheckoutAddress,
  type CheckoutLineItem,
} from "@/lib/orders";

export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export type PlaceOrderInput = {
  email: string;
  shipping: CheckoutAddress;
  billingSameAsShipping: boolean;
  billing: CheckoutAddress | null;
  note: string;
  items: CheckoutLineItem[];
  couponCode?: string | null;
};

export type PlaceOrderResult = {
  id: string;
  email: string;
  total: number;
  subtotal: number;
  discount: number;
  taxTotal: number;
  couponCode: string | null;
};

export async function placeOrder(
  input: PlaceOrderInput,
): Promise<ActionResult<PlaceOrderResult>> {
  const { headers } = await import("next/headers");
  const { clientIpFromHeaders, rateLimit } = await import("@/lib/rate-limit");
  const h = await headers();
  const ip = clientIpFromHeaders(h);
  const limited = rateLimit(`order:${ip}`, 10, 10 * 60 * 1000);
  if (!limited.ok) {
    return {
      ok: false,
      error: `Too many orders from this network. Try again in ${limited.retryAfterSeconds}s.`,
    };
  }

  if (!input.items.length) {
    return { ok: false, error: "Your cart is empty." };
  }

  const parsed = parseCheckoutForm({
    email: input.email,
    shipping: input.shipping,
    billingSameAsShipping: input.billingSameAsShipping,
    billing: input.billing,
    note: input.note,
  });

  if (!parsed.success) {
    const fieldErrors = zodFieldErrors(parsed.error);
    const first = Object.values(fieldErrors)[0] ?? "Please fix the highlighted fields.";
    return { ok: false, error: first };
  }

  const { email, shipping, billingSameAsShipping, billing: parsedBilling, note } =
    parsed.data;

  const subtotal = input.items.reduce((s, i) => s + i.price * i.qty, 0);
  const taxTotal = input.items.reduce((s, i) => s + i.tax * i.qty, 0);

  let discount = 0;
  let couponCode: string | null = null;
  let couponId: string | null = null;

  const rawCode = input.couponCode?.trim().toUpperCase() ?? "";
  if (rawCode) {
    const coupon = await prisma.coupon.findUnique({ where: { code: rawCode } });
    if (
      !coupon ||
      coupon.status !== CouponStatus.ACTIVE ||
      (coupon.maxUses != null && coupon.uses >= coupon.maxUses)
    ) {
      return { ok: false, error: `Coupon “${rawCode}” is not valid.` };
    }
    discount = computeCouponDiscount(coupon, subtotal);
    couponCode = coupon.code;
    couponId = coupon.id;
  }

  const total = Math.max(0, subtotal - discount) + taxTotal;
  const id = generateOrderId();
  const billing = billingSameAsShipping ? null : parsedBilling;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.order.create({
        data: {
          id,
          email,
          status: OrderStatus.PENDING,
          note: note.trim(),
          paymentMethod: "bacs",
          shippingMethod: "free_shipping",
          subtotal,
          discount,
          taxTotal,
          shippingTotal: 0,
          total,
          couponCode,
          billingSameAsShipping,
          shipFirstName: shipping.firstName,
          shipLastName: shipping.lastName,
          shipCountry: shipping.country || "Pakistan",
          shipAddress1: shipping.address1,
          shipAddress2: shipping.address2,
          shipCity: shipping.city,
          shipState: shipping.state,
          shipPostcode: shipping.postcode,
          shipPhone: shipping.phone,
          billFirstName: billing?.firstName ?? null,
          billLastName: billing?.lastName ?? null,
          billCountry: billing?.country ?? null,
          billAddress1: billing?.address1 ?? null,
          billAddress2: billing?.address2 ?? null,
          billCity: billing?.city ?? null,
          billState: billing?.state ?? null,
          billPostcode: billing?.postcode ?? null,
          billPhone: billing?.phone ?? null,
          items: {
            create: input.items.map((item) => ({
              productId: item.id,
              name: item.name,
              variantLabel: item.variantLabel,
              price: item.price,
              tax: item.tax,
              image: item.image,
              qty: item.qty,
            })),
          },
          events: {
            create: {
              status: OrderStatus.PENDING,
              note: "Order placed",
            },
          },
        },
      });

      if (couponId) {
        const updated = await tx.coupon.update({
          where: { id: couponId },
          data: { uses: { increment: 1 } },
        });
        if (
          updated.maxUses != null &&
          updated.uses >= updated.maxUses &&
          updated.status === CouponStatus.ACTIVE
        ) {
          await tx.coupon.update({
            where: { id: couponId },
            data: { status: CouponStatus.EXHAUSTED },
          });
        }
      }
    });
  } catch (error) {
    console.error("placeOrder failed", error);
    return { ok: false, error: "Could not place order. Please try again." };
  }

  const { enqueueOrderCreatedWebhooks } = await import("@/lib/webhooks/dispatch");
  enqueueOrderCreatedWebhooks(id);

  return {
    ok: true,
    data: {
      id,
      email,
      total,
      subtotal,
      discount,
      taxTotal,
      couponCode,
    },
  };
}
