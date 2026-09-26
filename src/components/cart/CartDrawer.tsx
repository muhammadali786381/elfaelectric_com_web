"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { formatRs, useCart } from "@/components/cart/CartContext";
import FlipButton from "@/components/ui/FlipButton";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQty,
    clearCart,
    subtotal,
    taxTotal,
    discount,
    total,
    coupon,
    couponMessage,
    applyCoupon,
  } = useCart();
  const [code, setCode] = useState("");

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close cart backdrop"
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your cart"
            className="fixed top-0 left-0 z-[75] flex h-full w-full max-w-[520px] flex-col bg-[#050505] border-r border-white/10 shadow-2xl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-6 py-4">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-5 w-5 text-white/80" strokeWidth={2} />
                <h2 className="font-montserrat text-[18px] font-bold text-white">Your cart</h2>
              </div>
              <button
                type="button"
                aria-label="Close cart"
                onClick={closeCart}
                className="rounded p-1 text-white/50 transition-colors hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <p className="font-roboto py-10 text-center text-[15px] text-white/50">
                  Your cart is empty.
                </p>
              ) : (
                <>
                  <div className="font-roboto mb-4 hidden grid-cols-[1.4fr_0.8fr_1.1fr_0.9fr] gap-2 text-[12px] font-medium text-white/50 sm:grid uppercase tracking-wider">
                    <span>Product</span>
                    <span>Price</span>
                    <span>Quantity</span>
                    <span className="text-right">Subtotal</span>
                  </div>

                  <ul className="divide-y divide-white/10 border-t border-white/10">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="grid grid-cols-1 gap-4 py-5 sm:grid-cols-[1.4fr_0.8fr_1.1fr_0.9fr] sm:items-center"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white/5 border border-white/5">
                            <Image
                              src={item.image}
                              alt=""
                              fill
                              className="object-contain p-2"
                              sizes="64px"
                            />
                          </div>
                          <p className="font-roboto text-[13px] font-medium leading-snug text-brand-primary">
                            {item.name} <br/> <span className="text-white/60 font-normal">{item.variantLabel}</span>
                          </p>
                        </div>

                        <p className="font-roboto text-[14px] text-white/80">
                          {formatRs(item.price)}
                        </p>

                        <div className="flex w-fit items-center gap-2 rounded-full border border-white/20 px-1 py-1">
                          <button
                            type="button"
                            aria-label="Decrease"
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10"
                          >
                            <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
                          </button>
                          <span className="font-roboto min-w-[28px] text-center text-[14px] font-semibold text-white">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase"
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10"
                          >
                            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                          </button>
                        </div>

                        <p className="font-roboto text-right text-[14px] font-medium text-white">
                          {formatRs(item.price * item.qty)}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Coupon code"
                      className="font-roboto h-11 min-w-[140px] flex-1 rounded-lg border border-white/10 bg-white/5 px-4 text-[14px] text-white outline-none transition-colors focus:border-brand-primary placeholder:text-white/30"
                    />
                    <FlipButton
                      type="button"
                      onClick={() => applyCoupon(code)}
                      variant="primary"
                      className="font-roboto h-11 rounded-lg px-5 text-[14px] font-bold"
                    >
                      Apply coupon
                    </FlipButton>
                    <FlipButton
                      type="button"
                      onClick={clearCart}
                      variant="outline"
                      className="font-roboto h-11 rounded-lg px-5 text-[14px] font-bold"
                    >
                      Empty Cart
                    </FlipButton>
                  </div>
                  {couponMessage ? (
                    <p
                      className={`font-roboto mt-3 text-[13px] ${
                        couponMessage.includes("successfully")
                          ? "text-brand-primary"
                          : "text-red-400"
                      }`}
                    >
                      {couponMessage}
                    </p>
                  ) : null}

                  <div className="font-roboto mt-8 space-y-3 border-t border-white/10 pt-6 text-[14px] text-white/70">
                    <div className="flex justify-between">
                      <span>Subtotal :</span>
                      <span className="text-white">{formatRs(subtotal)}</span>
                    </div>
                    {discount > 0 ? (
                      <div className="flex justify-between text-brand-primary">
                        <span>Coupon ({coupon?.code}) :</span>
                        <span>−{formatRs(discount)}</span>
                      </div>
                    ) : null}
                    <div className="flex justify-between">
                      <span>Shipment :</span>
                      <span className="text-white">Free shipping</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax :</span>
                      <span className="text-white">{formatRs(taxTotal)}</span>
                    </div>
                    <div className="flex justify-between pt-2 text-[18px] font-bold text-white border-t border-white/10">
                      <span>Total :</span>
                      <span className="text-brand-primary">{formatRs(total)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white/10 bg-[#0a0a0a] p-6">
              <FlipButton
                href="/cart"
                onClick={closeCart}
                variant="dark"
                className="font-roboto h-12 rounded-xl text-[15px] font-bold"
              >
                View Cart
              </FlipButton>
              <FlipButton
                href="/checkout"
                onClick={closeCart}
                variant="primary"
                className="font-roboto h-12 rounded-xl text-[15px] font-bold"
              >
                Checkout Now
              </FlipButton>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
