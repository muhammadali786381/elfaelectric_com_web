import type { Coupon, CouponType } from "@prisma/client";

export function computeCouponDiscount(
  coupon: Pick<Coupon, "type" | "amount">,
  subtotal: number,
): number {
  if (subtotal <= 0) return 0;
  const raw =
    coupon.type === "PERCENTAGE"
      ? Math.floor((subtotal * coupon.amount) / 100)
      : coupon.amount;
  return Math.min(Math.max(0, raw), subtotal);
}

export function formatCouponValue(type: CouponType, amount: number): string {
  if (type === "PERCENTAGE") return `${amount}%`;
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}

export function formatCouponLabel(
  code: string,
  type: CouponType,
  amount: number,
): string {
  if (type === "PERCENTAGE") return `${code} (−${amount}%)`;
  return `${code} (−Rs ${amount.toLocaleString("en-PK")})`;
}
