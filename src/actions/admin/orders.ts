"use server";

import {
  OrderStatus,
  type Order,
  type OrderItem,
  type OrderStatusEvent,
} from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export type OrderListItem = {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: string;
  totalAmount: number;
  status: OrderStatus;
};

export type OrderDetail = Order & {
  items: OrderItem[];
  events: OrderStatusEvent[];
};

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session;
}

function formatRs(n: number) {
  return `Rs. ${n.toLocaleString("en-PK")}`;
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function toListItem(order: Order): OrderListItem {
  return {
    id: order.id,
    customer: `${order.shipFirstName} ${order.shipLastName}`.trim(),
    email: order.email,
    date: formatDate(order.createdAt),
    total: formatRs(order.total),
    totalAmount: order.total,
    status: order.status,
  };
}

export type PaginatedOrders = {
  items: OrderListItem[];
  total: number;
  page: number;
  pageSize: number;
};

function searchTokenClause(token: string) {
  const mode = "insensitive" as const;
  return {
    OR: [
      { id: { contains: token, mode } },
      { email: { contains: token, mode } },
      { shipFirstName: { contains: token, mode } },
      { shipLastName: { contains: token, mode } },
      { billFirstName: { contains: token, mode } },
      { billLastName: { contains: token, mode } },
    ],
  };
}

export async function listOrders(filters?: {
  query?: string;
  status?: OrderStatus | "ALL";
  page?: number;
  pageSize?: number;
}): Promise<ActionResult<PaginatedOrders>> {
  await requireAdmin();
  const q = filters?.query?.trim() ?? "";
  const status = filters?.status ?? "ALL";
  const pageSize = Math.min(Math.max(filters?.pageSize ?? 20, 1), 100);
  const page = Math.max(filters?.page ?? 1, 1);
  const tokens = q.split(/\s+/).filter(Boolean);

  // Every token must match somewhere (id, email, or any name part).
  // So "shahmeer Ali" can hit email + last name even when first-name spelling differs.
  const where = {
    ...(status !== "ALL" ? { status } : {}),
    ...(tokens.length ? { AND: tokens.map((token) => searchTokenClause(token)) } : {}),
  };

  const [total, orders] = await Promise.all([
    prisma.order.count({ where }),
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  return {
    ok: true,
    data: {
      items: orders.map(toListItem),
      total,
      page,
      pageSize,
    },
  };
}

export async function getOrder(
  id: string,
): Promise<ActionResult<OrderDetail | null>> {
  await requireAdmin();
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: true,
      events: { orderBy: { createdAt: "desc" } },
    },
  });
  return { ok: true, data: order };
}

const STATUS_NOTES: Record<OrderStatus, string> = {
  PENDING: "Status set to Pending",
  HOLD: "Order put on hold",
  PROCESSING: "Order is processing",
  DELIVERED: "Order delivered",
  CANCELLED: "Order cancelled",
};

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
): Promise<ActionResult<OrderListItem>> {
  await requireAdmin();
  if (!Object.values(OrderStatus).includes(status)) {
    return { ok: false, error: "Invalid status." };
  }

  try {
    const existing = await prisma.order.findUnique({ where: { id } });
    if (!existing) return { ok: false, error: "Order not found." };
    if (existing.status === status) {
      return { ok: true, data: toListItem(existing) };
    }

    const order = await prisma.$transaction(async (tx) => {
      const updated = await tx.order.update({
        where: { id },
        data: { status },
      });
      await tx.orderStatusEvent.create({
        data: {
          orderId: id,
          status,
          note: STATUS_NOTES[status],
        },
      });
      return updated;
    });

    const { recordAdminAudit } = await import("@/actions/admin/audit");
    await recordAdminAudit({
      action: "admin.order.status",
      detail: `${id} -> ${status}`,
    });

    return { ok: true, data: toListItem(order) };
  } catch {
    return { ok: false, error: "Order not found." };
  }
}
