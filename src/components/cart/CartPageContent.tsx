"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatRs, useCart } from "@/components/cart/CartContext";
import CartNotices from "@/components/cart/CartNotices";

const sectionClass =
  "rounded-[7px] border border-[rgba(122,122,122,0.3)] bg-white p-5";

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
      <section className="bg-white py-10 lg:py-14">
        <CartNotices />
        <div className="mx-auto max-w-[1095px] px-4 sm:px-5">
          <Link
            href="/shop"
            className="font-roboto inline-flex h-10 items-center justify-center rounded-[3px] border border-[#d5d8dc] bg-[#ebe9f1] px-5 text-[14px] font-medium text-[#333] hover:bg-[#e0dde8]"
          >
            Return to shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-8 lg:py-10">
      <CartNotices />
      <div className="mx-auto grid w-full max-w-[1095px] grid-cols-1 gap-[5px] px-4 sm:px-5 lg:grid-cols-[minmax(0,59%)_minmax(0,1fr)]">
        {/* Left column: products + coupon */}
        <div className="flex min-w-0 flex-col gap-[5px]">
          {/* Products table section */}
          <div className={`${sectionClass} m-[5px]`}>
            <div className="overflow-x-auto">
              <table className="font-roboto w-full min-w-[520px] border-collapse text-left text-[14.4px] leading-[1.5] text-[#333]">
                <thead>
                  <tr>
                    <th className="w-5 pb-2 pr-0 text-[14px] font-bold text-black" scope="col">
                      <span className="sr-only">Remove item</span>
                    </th>
                    <th className="w-[76px] pb-2 pr-5 text-[14px] font-bold text-black" scope="col">
                      <span className="sr-only">Thumbnail</span>
                    </th>
                    <th className="pb-2 pr-5 text-[14px] font-bold text-black" scope="col">
                      Product
                    </th>
                    <th className="pb-2 pr-5 text-[14px] font-bold text-black" scope="col">
                      Price
                    </th>
                    <th className="pb-2 pr-5 text-[14px] font-bold text-black" scope="col">
                      Quantity
                    </th>
                    <th className="pb-2 pr-5 text-[14px] font-bold text-black" scope="col">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-5 align-middle">
                        <button
                          type="button"
                          aria-label={`Remove ${item.name} from cart`}
                          onClick={() => removeItem(item.id)}
                          className="font-roboto block text-[22px] font-bold leading-none text-black hover:text-[#e31e24]"
                        >
                          ×
                        </button>
                      </td>
                      <td className="py-5 pr-5 align-middle">
                        <div className="relative h-[55px] w-[55px] overflow-hidden">
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            className="object-contain"
                            sizes="55px"
                          />
                        </div>
                      </td>
                      <td className="py-5 pr-5 align-middle">
                        <Link
                          href={
                            item.id.includes("ev-125") || item.id.includes("ev125")
                              ? "/product/elfaev125"
                              : "/product/ev1-scooty"
                          }
                          className="font-roboto text-[14.4px] font-normal text-[#61ce70] hover:underline"
                        >
                          {item.name} - {item.variantLabel}
                        </Link>
                      </td>
                      <td className="py-5 pr-5 align-middle whitespace-nowrap text-[#333]">
                        {formatRs(item.price)}
                      </td>
                      <td className="py-5 pr-5 align-middle">
                        <input
                          type="number"
                          min={1}
                          max={99}
                          aria-label="Product quantity"
                          value={item.qty}
                          onChange={(e) => {
                            const n = Number(e.target.value);
                            if (!Number.isNaN(n)) updateQty(item.id, Math.max(1, n));
                          }}
                          className="font-roboto h-7 w-[51px] rounded-[3px] border border-[#d5d8dc] bg-transparent px-0.5 text-center text-[14px] text-black outline-none focus:border-[#61ce70]"
                        />
                      </td>
                      <td className="py-5 pr-5 align-middle whitespace-nowrap text-[#333]">
                        {formatRs(item.price * item.qty)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Coupon section — separate bordered box */}
          <div className={`${sectionClass} m-[5px]`}>
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
                className="font-roboto h-8 min-w-[180px] flex-1 rounded border border-[rgba(32,7,7,0.8)] bg-white px-[7px] text-[14px] text-black outline-none placeholder:text-[#666] focus:border-[#61ce70] sm:max-w-[368px]"
              />
              <button
                type="button"
                onClick={() => applyCoupon(code)}
                className="font-roboto h-[34px] shrink-0 rounded-[3px] bg-[#61ce70] px-[19px] text-[14px] font-bold leading-none text-white hover:bg-[#4fbf5f]"
              >
                Apply coupon
              </button>
              {coupon ? (
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="font-roboto text-[13px] font-medium text-[#e31e24] underline-offset-2 hover:underline"
                >
                  Remove {coupon.code}
                </button>
              ) : null}
            </div>
            {couponMessage ? (
              <p
                className={`font-roboto mt-2 text-[13px] ${
                  couponMessage.includes("successfully") ? "text-[#1a5e45]" : "text-[#e31e24]"
                }`}
              >
                {couponMessage}
              </p>
            ) : null}
          </div>
        </div>

        {/* Right: Cart Totals */}
        <aside className={`${sectionClass} m-[5px] h-fit`}>
          <h2 className="font-montserrat pb-2 text-[20px] font-bold leading-6 text-black">
            Cart Totals
          </h2>

          <table className="font-roboto mt-1 w-full border-collapse text-[14.4px] leading-[1.5] text-[#333]">
            <tbody>
              <tr>
                <th className="py-[9px] pr-3 text-left font-bold" scope="row">
                  Subtotal
                </th>
                <td className="py-3 pr-0 text-right">{formatRs(subtotal)}</td>
              </tr>
              {discount > 0 ? (
                <tr>
                  <th className="py-[9px] pr-3 text-left font-bold" scope="row">
                    Coupon ({coupon?.code})
                  </th>
                  <td className="py-3 pr-0 text-right text-[#61ce70]">−{formatRs(discount)}</td>
                </tr>
              ) : null}
              <tr>
                <th className="py-[9px] pr-3 align-top text-left font-bold" scope="row">
                  Shipment
                </th>
                <td className="py-3 pr-0 text-right">
                  <span className="block text-[15px] leading-[15px] text-[#61ce70]">
                    Free shipping
                  </span>
                  <span className="mt-1 block text-[14px] text-[#69727d]">
                    Shipping to Punjab.
                  </span>
                  <button
                    type="button"
                    className="mt-[7px] text-[14px] text-[#61ce70] hover:underline"
                  >
                    Change address
                  </button>
                </td>
              </tr>
              <tr>
                <th className="py-[9px] pr-3 text-left font-bold" scope="row">
                  Tax
                </th>
                <td className="py-3 pr-0 text-right">{formatRs(taxTotal)}</td>
              </tr>
              <tr>
                <th className="py-[9px] pr-3 text-left font-bold" scope="row">
                  Total
                </th>
                <td className="py-3 pr-0 text-right font-bold">{formatRs(total)}</td>
              </tr>
            </tbody>
          </table>

          <Link
            href="/checkout"
            className="font-roboto mt-4 flex w-full items-center justify-center rounded-[3px] bg-[#61ce70] px-[15px] py-[15px] text-[15px] font-bold leading-none text-white hover:bg-[#4fbf5f]"
          >
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </section>
  );
}
