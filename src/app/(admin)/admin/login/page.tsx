"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { loginAdmin } from "@/actions/auth";
import { sanitizeAdminCallbackUrl } from "@/lib/admin-url";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const result = await loginAdmin(email, password);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      const callback = sanitizeAdminCallbackUrl(
        searchParams.get("callbackUrl"),
      );
      router.replace(callback);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="admin-theme dark flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/assets/images/logo-full.png"
            alt="ELFA Electric"
            width={220}
            height={40}
            className="h-9 w-auto object-contain"
            priority
          />
          <p className="mt-3 font-roboto text-sm text-muted-foreground">
            Sign in to manage orders and coupons.
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="admin-email">Email</Label>
            <Input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background"
              required
            />
          </div>

          {error ? (
            <p className="font-roboto text-sm text-destructive">{error}</p>
          ) : null}

          <Button type="submit" className="mt-2 w-full" disabled={pending}>
            {pending ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
