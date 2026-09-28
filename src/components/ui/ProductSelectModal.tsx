"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const products = [
  {
    label: "EV-125 BIKE",
    href: "/product/elfaev125",
    image: "/assets/images/popup/ev-125-bike.png",
  },
  {
    label: "EV-1 Scooty",
    href: "/product/ev1-scooty",
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

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-select-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-[800px] rounded-[24px] border border-white/10 bg-[#0a0a0a] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top decorative glow */}
            <div className="absolute left-1/2 top-0 h-px w-[200px] -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50" />
            <div className="absolute left-1/2 top-0 h-[100px] w-[300px] -translate-x-1/2 bg-brand-primary/10 blur-[80px]" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-50 cursor-pointer rounded-full bg-white/5 p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>

            <div className="p-8 sm:p-12 relative z-10">
              <h2
                id="product-select-title"
                className="font-montserrat mb-2 text-center text-[28px] font-black uppercase italic leading-tight text-white sm:text-[36px]"
              >
                Select Your <span className="text-brand-primary">Ride</span>
              </h2>
              <p className="font-roboto mb-10 text-center text-[12px] font-bold text-white/50 uppercase tracking-[0.2em]">
                Choose the vehicle you want to explore
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
                {products.map((p, i) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    onClick={onClose}
                    className="group relative flex cursor-pointer flex-col items-center rounded-[16px] border border-white/5 bg-white/[0.03] p-6 transition-all duration-300 hover:border-brand-primary/50 hover:bg-brand-primary/5"
                  >
                    <span className="relative mb-6 block h-[180px] w-full max-w-[280px] sm:h-[220px]">
                      <Image
                        src={p.image}
                        alt={p.label}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                        sizes="(max-width: 640px) 280px, 320px"
                      />
                    </span>
                    <span className="font-montserrat text-[20px] font-bold uppercase text-white transition-colors group-hover:text-brand-primary sm:text-[24px]">
                      {p.label}
                    </span>
                    
                    <div className="mt-4 flex items-center gap-2 font-roboto text-[13px] font-bold text-white/40 uppercase tracking-wider transition-colors group-hover:text-brand-primary">
                      <span>Buy Now</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
