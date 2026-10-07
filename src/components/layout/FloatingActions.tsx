"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function FloatingActions() {
  const { itemCount } = useCart();

  return (
    <div className="fixed bottom-6 left-[26px] z-40 flex flex-col gap-3">
      
      {/* Cart Button */}
      <div className="group relative flex items-center">
        <motion.div whileTap={{ scale: 0.96 }}>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full border border-brand-primary bg-[#151515] text-brand-primary shadow-[0_0_8px_rgba(0,255,133,0.15)] transition-all duration-250 ease-out hover:-translate-y-[3px] hover:bg-brand-primary hover:text-black hover:shadow-[0_0_12px_rgba(0,255,133,0.3)]"
          >
            <ShoppingBag className="h-6 w-6" strokeWidth={2} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-[12px] font-extrabold text-black shadow-sm">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>
        </motion.div>

        {/* Tooltip */}
        <div className="pointer-events-none absolute left-full top-1/2 ml-4 -translate-y-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#151515] px-3 py-1.5 font-roboto text-[13px] font-medium text-white opacity-0 shadow-lg transition-all duration-250 group-hover:opacity-100">
          View cart
          {/* Tooltip Arrow */}
          <div className="absolute top-1/2 -left-[5px] -translate-y-1/2 border-y-[5px] border-r-[5px] border-y-transparent border-r-white/10">
            <div className="absolute -left-[4px] -top-[4px] border-y-[4px] border-r-[4px] border-y-transparent border-r-[#151515]" />
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className="group relative flex items-center">
        <motion.div whileTap={{ scale: 0.96 }}>
          <a
            href="https://wa.me/923114863532"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#25D366] text-[#050505] shadow-[0_0_8px_rgba(37,211,102,0.3)] transition-all duration-250 ease-out hover:-translate-y-[3px] hover:bg-[#20bd5a] hover:shadow-[0_0_12px_rgba(37,211,102,0.4)]"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </motion.div>

        {/* Tooltip */}
        <div className="pointer-events-none absolute left-full top-1/2 ml-4 -translate-y-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#151515] px-3 py-1.5 font-roboto text-[13px] font-medium text-white opacity-0 shadow-lg transition-all duration-250 group-hover:opacity-100">
          Chat on WhatsApp
          {/* Tooltip Arrow */}
          <div className="absolute top-1/2 -left-[5px] -translate-y-1/2 border-y-[5px] border-r-[5px] border-y-transparent border-r-white/10">
            <div className="absolute -left-[4px] -top-[4px] border-y-[4px] border-r-[4px] border-y-transparent border-r-[#151515]" />
          </div>
        </div>
      </div>

    </div>
  );
}
