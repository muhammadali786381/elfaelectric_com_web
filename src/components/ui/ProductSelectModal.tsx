"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

const products = [
  {
    label: "EV-125 BIKE",
    href: "/ev-125",
    image: "/assets/images/popup/ev-125-bike.png",
  },
  {
    label: "EV-1 Scooty",
    href: "/scooty-ev-1",
    image: "/assets/images/popup/ev-1-scooty.png",
  },
] as const;

type ProductSelectModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ProductSelectModal({ open, onClose }: ProductSelectModalProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-inverse/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-select-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[704px] rounded-[16px] border-2 border-[rgba(128,128,128,0.51)] bg-bg-inverse px-4 py-8 sm:px-8 sm:py-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 cursor-pointer p-1 text-brand-primary transition-opacity hover:opacity-80 sm:right-4 sm:top-4"
        >
          <X className="h-6 w-6" strokeWidth={2.5} />
        </button>

        <h2
          id="product-select-title"
          className="font-montserrat mb-8 text-center text-[24px] font-bold uppercase leading-tight text-text-inverse sm:text-[35px]"
        >
          Select Your Favorite Item
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {products.map((p, i) => (
            <Link
              key={p.href}
              href={p.href}
              className={`group flex cursor-pointer flex-col items-center px-4 py-2 text-center ${
                i === 0 ? "sm:border-r sm:border-[rgba(128,128,128,0.51)]" : ""
              }`}
            >
              <span className="relative mb-4 block h-[180px]   object-cover w-full max-w-[280px] sm:h-[200px]">
                <Image src={p.image} alt={p.label} fill className="object-cover transition-transform duration-200 group-hover:scale-105" sizes="280px" />
              </span>
              <span className="font-montserrat text-[20px] font-bold uppercase text-text-inverse sm:text-[25px]">
                {p.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
