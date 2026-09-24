"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { formatRs, useCart } from "@/components/cart/CartContext";

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
            className="fixed inset-0 z-[70] bg-bg-inverse/35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your cart"
            className="fixed top-0 left-0 z-[75] flex h-full w-full max-w-[520px] flex-col bg-bg-primary shadow-2xl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-text-secondary/20 bg-bg-secondary px-4 py-3">
              <ShoppingCart className="h-5 w-5 text-text-secondary" strokeWidth={2} />
              <h2 className="font-montserrat text-[18px] font-bold text-text-secondary">Your cart</h2>
              <button
                type="button"
                aria-label="Close cart"
                onClick={closeCart}
                className="rounded p-1 text-text-secondary hover:bg-bg-inverse/5"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              {items.length === 0 ? (
                <p className="font-roboto py-10 text-center text-[15px] text-text-secondary">
                  Your cart is empty.
                </p>
              ) : (
                <>
                  <div className="font-roboto mb-3 hidden grid-cols-[1.4fr_0.8fr_1.1fr_0.9fr] gap-2 text-[12px] font-medium text-text-secondary sm:grid">
                    <span>Product</span>
                    <span>Price</span>
                    <span>Quantity</span>
                    <span className="text-right">Subtotal</span>
                  </div>

                  <ul className="divide-y divide-[#eee]">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="grid grid-cols-1 gap-3 py-4 sm:grid-cols-[1.4fr_0.8fr_1.1fr_0.9fr] sm:items-center"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded bg-bg-secondary">
                            <Image
                              src={item.image}
                              alt=""
                              fill
                              className="object-contain p-1"
                              sizes="56px"
                            />
                          </div>
                          <p className="font-roboto text-[13px] font-medium leading-snug text-[#c2185b]">
                            {item.name} - {item.variantLabel}
                          </p>
                        </div>

                        <p className="font-roboto text-[14px] text-text-secondary">
                          {formatRs(item.price)}
                        </p>

                        <div className="flex w-fit items-center gap-1 rounded-full border border-[#ff8a65] px-1 py-0.5">
                          <button
                            type="button"
                            aria-label="Decrease"
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-text-secondary hover:bg-bg-secondary"
                          >
                            <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
                          </button>
                          <span className="font-roboto min-w-[28px] text-center text-[14px] font-semibold text-text-secondary">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase"
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-text-secondary hover:bg-bg-secondary"
                          >
                            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                          </button>
                        </div>

                        <p className="font-roboto text-right text-[14px] font-medium text-text-secondary">
                          {formatRs(item.price * item.qty)}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Coupon code"
                      className="font-roboto h-10 min-w-[140px] flex-1 rounded border border-[#ddd] px-3 text-[14px] outline-none focus:border-[#045e54]"
                    />
                    <button
                      type="button"
                      onClick={() => applyCoupon(code)}
                      className="font-roboto h-10 rounded bg-brand-primary px-4 text-[14px] font-semibold text-text-inverse hover:bg-brand-secondary"
                    >
                      Apply coupon
                    </button>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="font-roboto h-10 rounded border border-[#ff8a65] bg-bg-primary px-4 text-[14px] font-semibold text-[#1a5e45] hover:bg-[#fff8f5]"
                    >
                      Empty Cart
                    </button>
                  </div>
                  {couponMessage ? (
                    <p
                      className={`font-roboto mt-2 text-[12px] ${
                        couponMessage.includes("successfully")
                          ? "text-[#1a5e45]"
                          : "text-brand-accent"
                      }`}
                    >
                      {couponMessage}
                    </p>
                  ) : null}

                  <div className="font-roboto mt-6 space-y-2 border-t border-text-secondary/20 pt-4 text-[14px] text-text-secondary">
                    <div className="flex justify-between">
                      <span>Subtotal :</span>
                      <span>{formatRs(subtotal)}</span>
                    </div>
                    {discount > 0 ? (
                      <div className="flex justify-between text-brand-primary">
                        <span>Coupon ({coupon?.code}) :</span>
                        <span>−{formatRs(discount)}</span>
                      </div>
                    ) : null}
                    <div className="flex justify-between">
                      <span>Shipment :</span>
                      <span>Free shipping</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax :</span>
                      <span>{formatRs(taxTotal)}</span>
                    </div>
                    <div className="flex justify-between text-[16px] font-bold">
                      <span>Total :</span>
                      <span>{formatRs(total)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-text-secondary/20 p-4">
              <Link
                href="/cart"
                onClick={closeCart}
                className="font-roboto inline-flex h-12 items-center justify-center rounded bg-brand-primary text-[15px] font-semibold text-text-inverse hover:bg-brand-secondary"
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="font-roboto inline-flex h-12 items-center justify-center rounded bg-brand-primary text-[15px] font-semibold text-text-inverse hover:bg-brand-secondary"
              >
                Checkout Now
              </Link>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
