import { Badge, type BadgeProps } from "@/components/ui/badge";
import type { CouponStatus, OrderStatus } from "@/components/admin/mock-data";

const ORDER_VARIANT: Record<OrderStatus, BadgeProps["variant"]> = {
  PENDING: "warning",
  PROCESSING: "secondary",
  HOLD: "destructive",
  DELIVERED: "success",
  CANCELLED: "muted",
};

const COUPON_VARIANT: Record<CouponStatus, BadgeProps["variant"]> = {
  ACTIVE: "success",
  EXHAUSTED: "warning",
  INACTIVE: "muted",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <Badge variant={ORDER_VARIANT[status]}>{status}</Badge>;
}

export function CouponStatusBadge({ status }: { status: CouponStatus }) {
  return <Badge variant={COUPON_VARIANT[status]}>{status}</Badge>;
}
