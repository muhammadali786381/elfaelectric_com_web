"use client";

import Link from "next/link";
import { Check, Info } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";

/** WooCommerce-style cart notices (removed + Undo / empty) */
export default function CartNotices() {
  const { removedNotices, undoRemove, dismissNotice, items } = useCart();

  if (removedNotices.length === 0 && items.length > 0) return null;

  return (
    <div className="font-roboto mx-auto mb-8 w-full max-w-[1200px] space-y-3 px-4 sm:px-6 lg:px-8">
      {removedNotices.map((n) => (
        <div
          key={n.noticeId}
          className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-brand-primary/20 bg-brand-primary/5 px-5 py-3 text-[14px] text-white/80"
          role="status"
        >
          <Check className="h-5 w-5 shrink-0 text-brand-primary" strokeWidth={2} aria-hidden />
          <span>
            “{n.item.name}” removed.{" "}
            <button
              type="button"
              onClick={() => undoRemove(n.noticeId)}
              className="font-bold text-brand-primary transition-colors hover:text-white"
            >
              Undo?
            </button>
          </span>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => dismissNotice(n.noticeId)}
            className="ml-auto flex h-7 w-7 items-center justify-center rounded-full text-[20px] leading-none text-white/40 transition-colors hover:bg-white/10 hover:text-white"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
