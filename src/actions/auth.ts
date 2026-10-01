"use server";

import { AuthError } from "next-auth";
import { headers } from "next/headers";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { clientIpFromHeaders, rateLimit } from "@/lib/rate-limit";

export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: string };

/** 5 attempts / 15 minutes per IP+email */
const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

async function auditLogin(input: {
  email: string;
  ip: string;
  success: boolean;
  detail?: string;
}) {
  try {
    await prisma.adminAuditEvent.create({
      data: {
        action: "admin.login",
        email: input.email,
        ip: input.ip,
        success: input.success,
        detail: input.detail ?? "",
      },
    });
  } catch (error) {
    console.error("[audit] admin.login failed", error);
  }
}

export async function loginAdmin(
  emailRaw: string,
  password: string,
): Promise<ActionResult> {
  const email = emailRaw.trim().toLowerCase();
  const h = await headers();
  const ip = clientIpFromHeaders(h);

  const limited = rateLimit(`login:${ip}:${email}`, LOGIN_LIMIT, LOGIN_WINDOW_MS);
  if (!limited.ok) {
    await auditLogin({
      email,
      ip,
      success: false,
      detail: `rate_limited retry_after=${limited.retryAfterSeconds}s`,
    });
    return {
      ok: false,
      error: `Too many login attempts. Try again in ${limited.retryAfterSeconds}s.`,
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    await auditLogin({ email, ip, success: true, detail: "ok" });
    return { ok: true, data: undefined };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    await auditLogin({
      email,
      ip,
      success: false,
      detail: error instanceof AuthError ? error.type : "auth_failed",
    });
    if (error instanceof AuthError) {
      return { ok: false, error: "Invalid email or password." };
    }
    return { ok: false, error: "Invalid email or password." };
  }
}

export async function logoutAdmin(): Promise<void> {
  const h = await headers();
  const ip = clientIpFromHeaders(h);
  try {
    const { auth } = await import("@/lib/auth");
    const session = await auth();
    await prisma.adminAuditEvent.create({
      data: {
        action: "admin.logout",
        email: session?.user?.email ?? "",
        ip,
        success: true,
        detail: "ok",
      },
    });
  } catch (error) {
    console.error("[audit] admin.logout failed", error);
  }
  await signOut({ redirectTo: "/admin/login" });
}
