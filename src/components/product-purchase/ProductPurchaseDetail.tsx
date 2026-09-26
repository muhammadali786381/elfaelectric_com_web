"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState, type MouseEvent } from "react";
import { Calendar, Check, ShoppingCart } from "lucide-react";
import type { ProductPurchase } from "@/data/products/purchase-types";
import { moneyFromPurchase, useCart } from "@/components/cart/CartContext";
import FlipButton from "@/components/ui/FlipButton";

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
    <section className="bg-[#050505] text-white pt-28 pb-10 lg:pt-32 lg:pb-16">
      <div className="mx-auto grid w-full max-w-[1100px] grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_450px] lg:gap-12 lg:px-8">
        {/* Product image */}
        <div
          ref={imgRef}
          className="relative mx-auto aspect-[4/3] w-full max-w-[500px] cursor-crosshair overflow-hidden rounded-[24px] border border-white/5 bg-white/[0.02] backdrop-blur-2xl shadow-2xl lg:aspect-square"
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
        <div className="flex flex-col">
          {product.offerBadge ? (
            <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-roboto text-[12px] font-bold tracking-wide text-red-400 uppercase">
                {product.offerBadge}
              </span>
            </div>
          ) : null}

          <h1 className="font-montserrat text-[36px] font-bold leading-tight tracking-tight text-white sm:text-[44px] lg:text-[48px]">
            {product.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-baseline gap-3">
            {product.priceOriginal ? (
              <p className="font-montserrat text-[18px] font-medium text-white/40 line-through">
                {product.priceOriginal}
              </p>
            ) : null}

            <p className="font-montserrat text-[26px] font-bold leading-tight text-white sm:text-[32px]">
              Only in <span className="text-brand-primary">{product.priceCurrent}</span>
              {product.priceTaxNote ? (
                <span className="ml-2 text-[14px] font-medium text-white/50">
                  {product.priceTaxNote}
                </span>
              ) : null}
            </p>
          </div>

          <p className="font-roboto mt-4 text-[15px] font-normal leading-relaxed text-white/60 sm:text-[16px]">
            {product.subtitle}
          </p>

          {/* Variants */}
          {product.variants.length > 0 ? (
            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="font-roboto text-[14px] font-medium text-white">
                {product.variantLabel}
                {active ? (
                  <span className="font-normal text-white/60"> : {active.label}</span>
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
                      className={`relative h-[70px] w-[70px] overflow-hidden rounded-[12px] border-2 transition-all sm:h-[90px] sm:w-[90px] ${
                        selected
                          ? "border-brand-primary scale-105 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                          : "border-white/10 opacity-70 hover:border-white/30 hover:opacity-100"
                      }`}
                    >
                      <Image src={v.thumb} alt={v.label} fill className="object-cover" sizes="90px" />
                      {selected ? (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                          <Check className="h-6 w-6 text-brand-primary drop-shadow-md" strokeWidth={3} />
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
                  className="font-roboto mt-3 text-[13px] font-medium text-red-400 transition-colors hover:text-red-300 hover:underline"
                >
                  Clear selection
                </button>
              ) : null}
            </div>
          ) : null}

          {/* Actions */}
          <div className="mt-8 flex w-full max-w-[480px] flex-col gap-4">
            <div className="flex h-14 w-full items-stretch gap-3">
              {/* Qty pill */}
              <div className="flex w-[120px] shrink-0 items-center justify-between rounded-xl border border-white/10 bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  −
                </button>
                <span className="w-8 text-center font-roboto text-[16px] font-bold text-white">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty(Math.min(99, qty + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  +
                </button>
              </div>

              <FlipButton
                type="button"
                onClick={handleBuyNow}
                variant="primary"
                icon={<ShoppingCart className="h-5 w-5 shrink-0" strokeWidth={2.5} />}
                className="font-roboto h-full flex-1 rounded-xl px-5 text-[16px] font-bold uppercase tracking-wider shadow-lg shadow-brand-primary/20"
              >
                Buy Now
              </FlipButton>
            </div>

            <FlipButton
              href={product.installmentHref}
              variant="outline"
              icon={<Calendar className="h-5 w-5 shrink-0" strokeWidth={2} />}
              className="font-roboto h-14 w-full rounded-xl px-5 text-[15px] font-bold tracking-wider"
            >
              Installment Plans
            </FlipButton>
          </div>
        </div>
      </div>
    </section>
  );
}
