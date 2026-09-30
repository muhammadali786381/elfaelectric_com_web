import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";
import { sanitizeAdminCallbackUrl } from "@/lib/admin-url";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    if (req.auth) {
      return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") && !req.auth) {
    const login = new URL("/admin/login", req.nextUrl.origin);
    login.searchParams.set(
      "callbackUrl",
      sanitizeAdminCallbackUrl(pathname),
    );
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
