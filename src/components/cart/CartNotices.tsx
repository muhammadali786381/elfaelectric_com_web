"use client";

import Link from "next/link";
import { Check, Info } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";

/** WooCommerce-style cart notices (removed + Undo / empty) */
export default function CartNotices() {
  const { removedNotices, undoRemove, dismissNotice, items } = useCart();

  if (removedNotices.length === 0 && items.length > 0) return null;

  return (
    <div className="font-roboto mx-auto mb-6 w-full max-w-[1095px] space-y-3 px-4 sm:px-5">
      {removedNotices.map((n) => (
        <div
          key={n.noticeId}
          className="flex flex-wrap items-center gap-x-2 gap-y-1 border-t-[3px] border-brand-primary bg-bg-secondary px-4 py-3 text-[14px] text-text-secondary"
          role="status"
        >
          <Check className="h-4 w-4 shrink-0 text-brand-primary" strokeWidth={2.5} aria-hidden />
          <span>
            “{n.item.name}” removed.{" "}
            <button
              type="button"
              onClick={() => undoRemove(n.noticeId)}
              className="font-medium text-brand-accent underline-offset-2 hover:underline"
            >
              Undo?
            </button>
          </span>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => dismissNotice(n.noticeId)}
            className="ml-auto text-[18px] leading-none text-text-secondary hover:text-text-secondary"
          >
            ×
          </button>
        </div>
      ))}

      {items.length === 0 ? (
        <div
          className="flex items-center gap-2 border-t-[3px] border-[#2ea2cc] bg-bg-secondary px-4 py-3 text-[14px] text-text-secondary"
          role="status"
        >
          <Info className="h-4 w-4 shrink-0 text-[#2ea2cc]" strokeWidth={2} aria-hidden />
          <span>Your cart is currently empty.</span>
        </div>
      ) : null}
    </div>
  );
}
