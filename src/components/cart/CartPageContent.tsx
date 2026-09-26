"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatRs, useCart } from "@/components/cart/CartContext";
import CartNotices from "@/components/cart/CartNotices";
import FlipButton from "@/components/ui/FlipButton";

const sectionClass =
  "rounded-[24px] border border-white/5 bg-white/[0.02] backdrop-blur-2xl p-6 sm:p-8 lg:p-10 shadow-2xl";

export default function CartPageContent() {
  const {
    items,
    updateQty,
    removeItem,
    subtotal,
    taxTotal,
    discount,
    total,
    coupon,
    couponMessage,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [code, setCode] = useState("");

  if (items.length === 0) {
    return (
      <section className="bg-[#050505] text-white pt-32 pb-10 lg:pt-40 lg:pb-24 min-h-[60vh] flex flex-col items-center">
        <div className="w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <CartNotices />
        </div>
        <div className="mx-auto flex flex-col items-center justify-center flex-1 max-w-[1095px] px-4 sm:px-5 text-center mt-8">
          <p className="font-montserrat mb-8 text-[20px] text-white/50">Your cart is currently empty.</p>
          <FlipButton
            href="/shop"
            variant="primary"
            className="font-roboto h-14 rounded-xl px-10 text-[16px] font-bold uppercase tracking-wider"
          >
            Return to shop
          </FlipButton>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#050505] text-white pt-32 pb-10 lg:pt-40 lg:pb-24">
      <CartNotices />
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <h1 className="font-montserrat mb-8 text-[32px] font-bold text-white md:mb-12 md:text-[42px]">Your Cart</h1>
        <div className="grid grid-cols-1 gap-8 items-start lg:grid-cols-[1fr_400px]">
          {/* Left column: products + coupon in a single card */}
          <div className={`${sectionClass} flex h-fit flex-col`}>
            <div className="overflow-x-auto pb-4">
              <table className="font-roboto w-full min-w-[520px] border-collapse text-left text-[15px] leading-[1.5] text-white/70">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="w-10 pb-4 pr-4 text-left text-[12px] font-bold tracking-widest text-white/40 uppercase" scope="col">
                      <span className="sr-only">Remove</span>
                    </th>
                    <th className="w-[100px] pb-4 pr-4 text-left text-[12px] font-bold tracking-widest text-white/40 uppercase" scope="col">
                      Product
                    </th>
                    <th className="pb-4 pr-4 text-left text-[12px] font-bold tracking-widest text-white/40 uppercase" scope="col">
                      <span className="sr-only">Details</span>
                    </th>
                    <th className="pb-4 pr-4 text-left text-[12px] font-bold tracking-widest text-white/40 uppercase" scope="col">
                      Price
                    </th>
                    <th className="pb-4 pr-4 text-left text-[12px] font-bold tracking-widest text-white/40 uppercase" scope="col">
                      Qty
                    </th>
                    <th className="pb-4 text-right text-[12px] font-bold tracking-widest text-white/40 uppercase" scope="col">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-6 align-middle">
                        <button
                          type="button"
                          aria-label={`Remove ${item.name} from cart`}
                          onClick={() => removeItem(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-[18px] leading-none text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-500"
                        >
                          ×
                        </button>
                      </td>
                      <td className="py-6 pr-4 align-middle">
                        <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-white/5 border border-white/5">
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            className="object-contain p-3"
                            sizes="80px"
                          />
                        </div>
                      </td>
                      <td className="py-6 pr-4 align-middle">
                        <Link
                          href={
                            item.id.includes("ev-125") || item.id.includes("ev125")
                              ? "/product/elfaev125"
                              : "/product/ev1-scooty"
                          }
                          className="font-roboto block text-[16px] font-bold text-white transition-colors hover:text-brand-primary"
                        >
                          {item.name}
                        </Link>
                        <span className="mt-1 block text-[14px] font-normal text-white/50">{item.variantLabel}</span>
                      </td>
                      <td className="py-6 pr-4 align-middle whitespace-nowrap text-[15px] font-medium text-white/70">
                        {formatRs(item.price)}
                      </td>
                      <td className="py-6 pr-4 align-middle">
                        <div className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                          >
                            −
                          </button>
                          <span className="w-6 text-center font-roboto text-[14px] font-bold text-white">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-6 align-middle whitespace-nowrap text-right text-[16px] font-bold text-white">
                        {formatRs(item.price * item.qty)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Coupon section integrated at the bottom of the card */}
            <div className="mt-6 border-t border-white/10 pt-8">
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                id="coupon_code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") applyCoupon(code);
                }}
                placeholder="Coupon code"
                className="font-roboto h-11 min-w-[180px] flex-1 rounded-lg border border-white/10 bg-white/5 px-4 text-[15px] text-white outline-none transition-colors placeholder:text-white/30 focus:border-brand-primary sm:max-w-[368px]"
              />
              <FlipButton
                type="button"
                onClick={() => applyCoupon(code)}
                variant="primary"
                className="font-roboto h-11 shrink-0 rounded-lg px-6 text-[15px] font-bold leading-none"
              >
                Apply coupon
              </FlipButton>
              {coupon ? (
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="font-roboto ml-2 text-[13px] font-medium text-red-400 underline-offset-2 transition-colors hover:text-red-300 hover:underline"
                >
                  Remove {coupon.code}
                </button>
              ) : null}
            </div>
            {couponMessage ? (
              <p
                className={`font-roboto mt-4 text-[14px] font-medium ${couponMessage.includes("successfully") ? "text-brand-primary" : "text-red-400"
                  }`}
              >
                {couponMessage}
              </p>
            ) : null}
          </div>
        </div>

        {/* Right: Cart Totals */}
        <div className="relative">
          <aside className={`${sectionClass} sticky top-32`}>
            <h2 className="font-montserrat pb-6 border-b border-white/10 text-[24px] font-bold tracking-tight text-white">
              Order Summary
            </h2>

          <table className="font-roboto mt-4 w-full border-collapse text-[15px] leading-[1.5] text-white/70">
            <tbody className="divide-y divide-white/5">
              <tr>
                <th className="py-4 pr-3 text-left font-medium" scope="row">
                  Subtotal
                </th>
                <td className="py-4 pr-0 text-right text-white">{formatRs(subtotal)}</td>
              </tr>
              {discount > 0 ? (
                <tr>
                  <th className="py-4 pr-3 text-left font-medium" scope="row">
                    Coupon ({coupon?.code})
                  </th>
                  <td className="py-4 pr-0 text-right text-brand-primary">−{formatRs(discount)}</td>
                </tr>
              ) : null}
              <tr>
                <th className="py-4 pr-3 align-top text-left font-medium" scope="row">
                  Shipment
                </th>
                <td className="py-4 pr-0 text-right">
                  <span className="block text-[15px] font-bold text-white">
                    Free shipping
                  </span>
                  <span className="mt-1 block text-[14px] text-white/50">
                    Shipping to Punjab.
                  </span>
                  <button
                    type="button"
                    className="mt-2 text-[14px] font-medium text-brand-primary transition-colors hover:text-white"
                  >
                    Change address
                  </button>
                </td>
              </tr>
              <tr>
                <th className="py-4 pr-3 text-left font-medium" scope="row">
                  Tax
                </th>
                <td className="py-4 pr-0 text-right text-white">{formatRs(taxTotal)}</td>
              </tr>
              <tr>
                <th className="py-5 pr-3 text-left text-[18px] font-bold text-white" scope="row">
                  Total
                </th>
                <td className="py-5 pr-0 text-right text-[18px] font-bold text-brand-primary">{formatRs(total)}</td>
              </tr>
            </tbody>
          </table>

          <FlipButton
            href="/checkout"
            variant="primary"
            className="font-roboto mt-8 h-14 w-full rounded-xl px-6 text-[16px] font-bold uppercase tracking-wider"
          >
            Proceed to Checkout
          </FlipButton>
        </aside>
        </div>
      </div>
    </div>
    </section>
  );
}
