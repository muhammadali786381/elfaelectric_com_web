"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { clientIpFromHeaders } from "@/lib/rate-limit";

export async function recordAdminAudit(input: {
  action: string;
  success?: boolean;
  detail?: string;
  email?: string;
}) {
  try {
    const h = await headers();
    const ip = clientIpFromHeaders(h);
    let email = input.email ?? "";
    if (!email) {
      const session = await auth();
      email = session?.user?.email ?? "";
    }
    await prisma.adminAuditEvent.create({
      data: {
        action: input.action,
        email,
        ip,
        success: input.success ?? true,
        detail: input.detail ?? "",
      },
    });
  } catch (error) {
    console.error("[audit]", input.action, error);
  }
}
