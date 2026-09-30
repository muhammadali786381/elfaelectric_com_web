"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type {
  Coupon,
  CouponStatus,
  CouponType,
} from "@/components/admin/mock-data";

export type CouponFormValues = {
  code: string;
  type: CouponType;
  amount: number;
  /** Numeric string; "-1" = unlimited */
  maxUses: string;
  status: CouponStatus;
};

const EMPTY: CouponFormValues = {
  code: "",
  type: "FIXED_AMOUNT",
  amount: 15000,
  maxUses: "100",
  status: "ACTIVE",
};

const selectClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 font-roboto text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  coupon?: Coupon | null;
  pending?: boolean;
  onSubmit: (values: CouponFormValues) => void;
};

export default function CouponFormDialog({
  open,
  onOpenChange,
  mode,
  coupon,
  pending = false,
  onSubmit,
}: Props) {
  const [values, setValues] = useState<CouponFormValues>(EMPTY);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CouponFormValues, string>>
  >({});

  useEffect(() => {
    if (!open) return;
    if (mode === "edit" && coupon) {
      setValues({
        code: coupon.code,
        type: coupon.type,
        amount: coupon.amount,
        maxUses: String(coupon.maxUses),
        status: coupon.status,
      });
    } else {
      setValues(EMPTY);
    }
    setErrors({});
  }, [open, mode, coupon]);

  function update<K extends keyof CouponFormValues>(
    key: K,
    value: CouponFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;
    const next: typeof errors = {};
    if (!values.code.trim()) next.code = "Enter a coupon code.";
    if (!Number.isFinite(values.amount) || values.amount <= 0) {
      next.amount = "Enter a positive amount.";
    }
    if (values.type === "PERCENTAGE" && values.amount > 100) {
      next.amount = "Percentage cannot exceed 100.";
    }
    const maxUsesRaw = values.maxUses.trim();
    if (!/^-?\d+$/.test(maxUsesRaw)) {
      next.maxUses = "Enter a whole number, or -1 for unlimited.";
    } else {
      const n = Number(maxUsesRaw);
      if (n !== -1 && n < 1) {
        next.maxUses = "Enter a positive number, or -1 for unlimited.";
      }
    }
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    onSubmit({
      ...values,
      code: values.code.trim().toUpperCase(),
      maxUses: maxUsesRaw,
    });
  }

  const isEdit = mode === "edit";

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (pending) return;
        onOpenChange(next);
      }}
    >
      <DialogContent className="admin-theme dark sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit coupon" : "Create coupon"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? `Update ${coupon?.code ?? "this"} promo for cart and checkout.`
              : "Add a flat or percent discount for the storefront cart."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
          <fieldset disabled={pending} className="grid gap-4 border-0 p-0">
            <div className="grid gap-2">
              <Label htmlFor="coupon-code">Code</Label>
              <Input
                id="coupon-code"
                value={values.code}
                onChange={(e) => update("code", e.target.value.toUpperCase())}
                placeholder="AZADI15K"
                className="bg-background font-mono uppercase"
                autoComplete="off"
              />
              {errors.code ? (
                <p className="font-roboto text-xs text-destructive">
                  {errors.code}
                </p>
              ) : (
                <p className="font-roboto text-xs text-muted-foreground">
                  Letters and numbers only. Applied case-insensitive.
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="coupon-type">Type</Label>
                <select
                  id="coupon-type"
                  value={values.type}
                  onChange={(e) => update("type", e.target.value as CouponType)}
                  className={selectClass}
                >
                  <option value="FIXED_AMOUNT">Fixed amount (PKR)</option>
                  <option value="PERCENTAGE">Percentage</option>
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="coupon-amount">
                  {values.type === "PERCENTAGE" ? "Percent" : "Amount (PKR)"}
                </Label>
                <Input
                  id="coupon-amount"
                  type="number"
                  min={1}
                  max={values.type === "PERCENTAGE" ? 100 : undefined}
                  value={values.amount}
                  onChange={(e) => update("amount", Number(e.target.value))}
                  className="bg-background"
                />
                {errors.amount ? (
                  <p className="font-roboto text-xs text-destructive">
                    {errors.amount}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="coupon-max-uses">Max uses</Label>
                <Input
                  id="coupon-max-uses"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={values.maxUses}
                  onChange={(e) => {
                    const next = e.target.value;
                    // Allow empty, lone "-", or integer (incl. -1)
                    if (next === "" || next === "-" || /^-?\d*$/.test(next)) {
                      update("maxUses", next);
                    }
                  }}
                  placeholder="-1 for unlimited"
                  className="bg-background"
                />
                {errors.maxUses ? (
                  <p className="font-roboto text-xs text-destructive">
                    {errors.maxUses}
                  </p>
                ) : (
                  <p className="font-roboto text-xs text-muted-foreground">
                    Use -1 for unlimited redemptions.
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="coupon-status">Status</Label>
                <select
                  id="coupon-status"
                  value={values.status}
                  onChange={(e) =>
                    update("status", e.target.value as CouponStatus)
                  }
                  className={selectClass}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="EXHAUSTED">Exhausted</option>
                </select>
              </div>
            </div>
          </fieldset>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={pending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending
                ? isEdit
                  ? "Saving…"
                  : "Creating…"
                : isEdit
                  ? "Save changes"
                  : "Create coupon"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
