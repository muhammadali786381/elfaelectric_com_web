"use server";

import { CouponStatus, OrderStatus } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { OrderListItem } from "@/actions/admin/orders";

export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export type DashboardMetric = {
  label: string;
  value: string;
  hint: string;
  hintTone: "success" | "warning" | "muted";
};

export type DashboardData = {
  metrics: DashboardMetric[];
  recentOrders: OrderListItem[];
};

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session;
}

function formatRs(n: number) {
  return n.toLocaleString("en-PK");
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function getDashboardMetrics(): Promise<
  ActionResult<DashboardData>
> {
  await requireAdmin();

  const [
    revenueAgg,
    pendingCount,
    deliveredCount,
    activeCoupons,
    recent,
  ] = await Promise.all([
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { not: OrderStatus.CANCELLED } },
    }),
    prisma.order.count({ where: { status: OrderStatus.PENDING } }),
    prisma.order.count({ where: { status: OrderStatus.DELIVERED } }),
    prisma.coupon.count({ where: { status: CouponStatus.ACTIVE } }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const revenue = revenueAgg._sum.total ?? 0;

  return {
    ok: true,
    data: {
      metrics: [
        {
          label: "Total Revenue",
          value: formatRs(revenue),
          hint: "Excludes cancelled orders",
          hintTone: "success",
        },
        {
          label: "Pending Orders",
          value: String(pendingCount),
          hint: pendingCount > 0 ? "Requires attention" : "All clear",
          hintTone: pendingCount > 0 ? "warning" : "muted",
        },
        {
          label: "Completed Deliveries",
          value: String(deliveredCount),
          hint: "Lifetime total",
          hintTone: "muted",
        },
        {
          label: "Active Coupons",
          value: String(activeCoupons),
          hint: "Currently usable",
          hintTone: "muted",
        },
      ],
      recentOrders: recent.map((order) => ({
        id: order.id,
        customer: `${order.shipFirstName} ${order.shipLastName}`.trim(),
        email: order.email,
        date: formatDate(order.createdAt),
        total: `Rs. ${order.total.toLocaleString("en-PK")}`,
        totalAmount: order.total,
        status: order.status,
      })),
    },
  };
}
