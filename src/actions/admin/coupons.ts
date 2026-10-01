"use server";

import {
  CouponStatus,
  CouponType,
  type Coupon,
} from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  computeCouponDiscount,
  formatCouponLabel,
  formatCouponValue,
} from "@/lib/coupons";
import { clientIpFromHeaders, rateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";

export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export type CouponView = {
  id: string;
  code: string;
  type: CouponType;
  amount: number;
  value: string;
  uses: number;
  /** -1 means unlimited */
  maxUses: number;
  status: CouponStatus;
};

export type ValidateCouponResult = {
  code: string;
  discount: number;
  label: string;
};

function toView(coupon: Coupon): CouponView {
  return {
    id: coupon.id,
    code: coupon.code,
    type: coupon.type,
    amount: coupon.amount,
    value: formatCouponValue(coupon.type, coupon.amount),
    uses: coupon.uses,
    maxUses: coupon.maxUses == null ? -1 : coupon.maxUses,
    status: coupon.status,
  };
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function validateCoupon(
  codeRaw: string,
  subtotal: number,
): Promise<ActionResult<ValidateCouponResult>> {
  const h = await headers();
  const ip = clientIpFromHeaders(h);
  // Slow coupon probing (30 attempts / 10 minutes per IP)
  const limited = rateLimit(`coupon:${ip}`, 30, 10 * 60 * 1000);
  if (!limited.ok) {
    return {
      ok: false,
      error: `Too many coupon attempts. Try again in ${limited.retryAfterSeconds}s.`,
    };
  }

  const code = codeRaw.trim().toUpperCase();
  if (!code) {
    return { ok: false, error: "Please enter a coupon code." };
  }

  const coupon = await prisma.coupon.findUnique({ where: { code } });
  if (!coupon) {
    return { ok: false, error: `Coupon “${code}” does not exist!` };
  }
  if (coupon.status !== CouponStatus.ACTIVE) {
    return { ok: false, error: `Coupon “${code}” is not active.` };
  }
  if (coupon.maxUses != null && coupon.uses >= coupon.maxUses) {
    return { ok: false, error: `Coupon “${code}” has been fully used.` };
  }

  const discount = computeCouponDiscount(coupon, Math.max(0, subtotal));
  if (discount <= 0) {
    return { ok: false, error: "Coupon cannot be applied to this cart." };
  }

  return {
    ok: true,
    data: {
      code: coupon.code,
      discount,
      label: formatCouponLabel(coupon.code, coupon.type, coupon.amount),
    },
  };
}

export type PaginatedCoupons = {
  items: CouponView[];
  total: number;
  page: number;
  pageSize: number;
};

export async function listCoupons(filters?: {
  query?: string;
  page?: number;
  pageSize?: number;
}): Promise<ActionResult<PaginatedCoupons>> {
  await requireAdmin();
  const q = filters?.query?.trim() ?? "";
  const pageSize = Math.min(Math.max(filters?.pageSize ?? 20, 1), 100);
  const page = Math.max(filters?.page ?? 1, 1);

  const upper = q.toUpperCase();
  const statusMatch = Object.values(CouponStatus).find((s) => s === upper);
  const typeMatch = Object.values(CouponType).find((s) => s === upper);

  const finalWhere =
    q.length === 0
      ? {}
      : {
          OR: [
            { code: { contains: q, mode: "insensitive" as const } },
            ...(statusMatch ? [{ status: statusMatch }] : []),
            ...(typeMatch ? [{ type: typeMatch }] : []),
          ],
        };

  const [total, coupons] = await Promise.all([
    prisma.coupon.count({ where: finalWhere }),
    prisma.coupon.findMany({
      where: finalWhere,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  return {
    ok: true,
    data: {
      items: coupons.map(toView),
      total,
      page,
      pageSize,
    },
  };
}

export type CouponInput = {
  code: string;
  type: CouponType;
  amount: number;
  maxUses: number | null;
  status: CouponStatus;
};

export async function createCoupon(
  input: CouponInput,
): Promise<ActionResult<CouponView>> {
  await requireAdmin();
  const code = input.code.trim().toUpperCase();
  if (!code) return { ok: false, error: "Enter a coupon code." };
  if (!Number.isFinite(input.amount) || input.amount <= 0) {
    return { ok: false, error: "Enter a positive amount." };
  }
  if (input.type === CouponType.PERCENTAGE && input.amount > 100) {
    return { ok: false, error: "Percentage cannot exceed 100." };
  }

  try {
    const coupon = await prisma.coupon.create({
      data: {
        code,
        type: input.type,
        amount: Math.floor(input.amount),
        maxUses: input.maxUses,
        status: input.status,
      },
    });
    const { recordAdminAudit } = await import("@/actions/admin/audit");
    await recordAdminAudit({
      action: "admin.coupon.create",
      detail: code,
    });
    return { ok: true, data: toView(coupon) };
  } catch {
    return { ok: false, error: "That coupon code already exists." };
  }
}

export async function updateCoupon(
  id: string,
  input: CouponInput,
): Promise<ActionResult<CouponView>> {
  await requireAdmin();
  const code = input.code.trim().toUpperCase();
  if (!code) return { ok: false, error: "Enter a coupon code." };
  if (!Number.isFinite(input.amount) || input.amount <= 0) {
    return { ok: false, error: "Enter a positive amount." };
  }
  if (input.type === CouponType.PERCENTAGE && input.amount > 100) {
    return { ok: false, error: "Percentage cannot exceed 100." };
  }

  try {
    const coupon = await prisma.coupon.update({
      where: { id },
      data: {
        code,
        type: input.type,
        amount: Math.floor(input.amount),
        maxUses: input.maxUses,
        status: input.status,
      },
    });
    const { recordAdminAudit } = await import("@/actions/admin/audit");
    await recordAdminAudit({
      action: "admin.coupon.update",
      detail: `${id}:${code}`,
    });
    return { ok: true, data: toView(coupon) };
  } catch {
    return { ok: false, error: "Could not update coupon." };
  }
}
