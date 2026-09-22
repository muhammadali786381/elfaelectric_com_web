"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState, type MouseEvent } from "react";
import { Calendar, Check, ShoppingCart } from "lucide-react";
import type { ProductPurchase } from "@/data/products/purchase-types";
import { moneyFromPurchase, useCart } from "@/components/cart/CartContext";

type ZoomPos = { left: number; top: number; w: number; h: number };

/**
 * WooCommerce jquery.zoom style: full-size image inside overflow:hidden,
 * positioned so the point under the cursor stays centered in view.
 */
export default function ProductPurchaseDetail({ product }: { product: ProductPurchase }) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [zooming, setZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState<ZoomPos>({ left: 0, top: 0, w: 0, h: 0 });
  const imgRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  const active = product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  const handleBuyNow = () => {
    if (!active) return;
    const { price, tax } = moneyFromPurchase(product.priceCurrent, product.priceTaxNote);
    addItem(
      {
        id: `${product.slug}__${active.id}`,
        name: product.title,
        variantLabel: active.label,
        price,
        tax,
        image: active.image,
        qty,
      },
      imgRef.current?.getBoundingClientRect() ?? null,
    );
  };

  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = imgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    // ~2× like live (1024 inside ~495)
    const zoomW = rect.width * 2.05;
    const zoomH = rect.height * 2.05;
    setZoomPos({
      w: zoomW,
      h: zoomH,
      left: -(x * (zoomW - rect.width)),
      top: -(y * (zoomH - rect.height)),
    });
  }, []);

  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="mx-auto grid w-full max-w-[1150px] grid-cols-1 items-start gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
        {/* Product image */}
        <div
          ref={imgRef}
          className="relative mx-auto aspect-square w-full max-w-[500px] cursor-crosshair overflow-hidden rounded-[8px] border border-[#e5e5e5] bg-[#f7f7f7]"
          onMouseEnter={(e) => {
            setZooming(true);
            onMove(e);
          }}
          onMouseLeave={() => setZooming(false)}
          onMouseMove={onMove}
        >
          {active ? (
            <>
              {/* Base image */}
              <Image
                key={active.image}
                src={active.image}
                alt={active.label}
                fill
                priority
                draggable={false}
                className={`object-contain p-4 transition-opacity duration-150 ${
                  zooming ? "opacity-0" : "opacity-100"
                }`}
                sizes="(min-width: 1024px) 500px, 90vw"
              />
              {/* Zoom layer — absolute large image, pans with cursor */}
              {zooming ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={active.image}
                  alt=""
                  draggable={false}
                  className="pointer-events-none absolute max-w-none select-none"
                  style={{
                    width: zoomPos.w,
                    height: zoomPos.h,
                    left: zoomPos.left,
                    top: zoomPos.top,
                  }}
                />
              ) : null}
            </>
          ) : null}
        </div>

        {/* Summary */}
        <div>
          {product.offerBadge ? (
            <div className="lto-badge mb-4 w-fit">
              <span className="lto-dot" />
              <span className="lto-text">{product.offerBadge}</span>
            </div>
          ) : null}

          <h1 className="font-poppins text-[36px] font-semibold leading-none text-[#212121] sm:text-[48px] lg:text-[58px] lg:leading-[58px]">
            {product.title}
          </h1>

          {product.priceOriginal ? (
            <p className="cutprice font-montserrat mt-4 text-[18px] font-medium leading-[18px] text-[#212121]">
              {product.priceOriginal}
            </p>
          ) : null}

          <p className="font-poppins mt-2 text-[24px] font-semibold leading-tight text-[#212121] sm:text-[31px] sm:leading-[31px]">
            Only in <span className="text-[#61ce70]">{product.priceCurrent}</span>
            {product.priceTaxNote ? (
              <span className="ml-1.5 text-[14px] font-medium text-[#555]">
                {product.priceTaxNote}
              </span>
            ) : null}
          </p>

          <p className="font-roboto mt-4 text-[15px] font-normal leading-relaxed text-[#333] sm:text-[16px]">
            {product.subtitle}
          </p>

          {/* Variants */}
          {product.variants.length > 0 ? (
            <div className="mt-6">
              <p className="font-roboto text-[14px] font-medium text-[#212121]">
                {product.variantLabel}
                {active ? (
                  <span className="font-normal text-[#666]"> : {active.label}</span>
                ) : null}
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.variants.map((v) => {
                  const selected = v.id === variantId;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      aria-label={v.label}
                      aria-pressed={selected}
                      onClick={() => setVariantId(v.id)}
                      className={`relative h-[72px] w-[72px] overflow-hidden rounded-[10px] border-2 transition-colors sm:h-[100px] sm:w-[100px] ${
                        selected
                          ? "border-[#212121]"
                          : "border-transparent hover:border-[#ccc]"
                      }`}
                    >
                      <Image src={v.thumb} alt={v.label} fill className="object-cover" sizes="100px" />
                      {selected ? (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                          <Check className="h-8 w-8 text-white drop-shadow" strokeWidth={3} />
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
              {product.variants.length > 1 ? (
                <button
                  type="button"
                  onClick={() => setVariantId(product.variants[0].id)}
                  className="font-roboto mt-2 text-[13px] font-medium text-[#e83e8c] underline-offset-2 hover:underline"
                >
                  Clear
                </button>
              ) : null}
            </div>
          ) : null}

          {/* Qty beside Buy Now; Installment full width under both */}
          <div className="mt-6 w-full max-w-[420px]">
            <div className="flex items-stretch gap-3">
              <input
                type="number"
                min={1}
                max={99}
                value={qty}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  if (!Number.isNaN(n)) setQty(Math.min(99, Math.max(1, n)));
                }}
                aria-label="Quantity"
                className="font-roboto h-[45px] w-[56px] shrink-0 rounded-[2px] border border-[#666] bg-white text-center text-[16px] text-[#212121] outline-none"
              />

              <button
                type="button"
                onClick={handleBuyNow}
                className="font-poppins inline-flex h-[45px] min-w-0 flex-1 items-center justify-center gap-2.5 rounded-[6px] bg-[#212121] px-5 text-[18px] font-medium leading-none text-[#fcfcfc] transition-colors hover:bg-[#333] sm:text-[20px]"
              >
                <ShoppingCart className="h-5 w-5 shrink-0" strokeWidth={2} />
                Buy Now
              </button>
            </div>

            <Link
              href={product.installmentHref}
              className="font-poppins mt-3 inline-flex h-[46px] w-full items-center justify-center gap-2.5 rounded-[3px] bg-[#212121] px-6 text-[16px] font-medium uppercase leading-none tracking-wide text-[#fcfcfc] transition-colors hover:bg-[#333] sm:text-[18px]"
            >
              <Calendar className="h-5 w-5 shrink-0" strokeWidth={2} />
              Installment Plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
