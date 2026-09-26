"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { ProductPurchase } from "@/data/products/purchase-types";
import { formatRs, moneyFromPurchase, useCart } from "@/components/cart/CartContext";
import FlipButton from "@/components/ui/FlipButton";

export type ShopProduct = {
  product: ProductPurchase;
  /** Loop / catalog card image */
  catalogImage: string;
  href: string;
};

type SortKey = "menu_order" | "popularity" | "date" | "price" | "price-desc";

function priceOf(p: ProductPurchase) {
  return moneyFromPurchase(p.priceCurrent).price;
}

export default function ShopCatalog({ products }: { products: ShopProduct[] }) {
  const [sort, setSort] = useState<SortKey>("menu_order");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const sorted = [...products].sort((a, b) => {
    const pa = priceOf(a.product);
    const pb = priceOf(b.product);
    if (sort === "price") return pa - pb;
    if (sort === "price-desc") return pb - pa;
    if (sort === "date") return a.product.title.localeCompare(b.product.title) * -1;
    return 0;
  });

  return (
    <section className="bg-[#050505] text-white pb-16 pt-10 lg:pb-20 lg:pt-12">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <div className="font-roboto mb-8 flex flex-wrap items-center justify-between gap-3 text-[16px] text-white/60">
          <p>Showing all {sorted.length} results</p>
          <select
            aria-label="Shop order"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-10 rounded border border-white/10 bg-[#0a0a0a] px-3 text-[14px] text-white outline-none focus:border-brand-primary"
          >
            <option value="menu_order">Default sorting</option>
            <option value="popularity">Sort by popularity</option>
            <option value="date">Sort by latest</option>
            <option value="price">Sort by price: low to high</option>
            <option value="price-desc">Sort by price: high to low</option>
          </select>
        </div>

        <ul className="grid grid-cols-1 gap-x-[30px] gap-y-11 sm:grid-cols-2">
          {sorted.map((entry) => (
            <li key={entry.product.slug}>
              <ShopProductCard
                entry={entry}
                open={openSlug === entry.product.slug}
                onToggle={() =>
                  setOpenSlug((s) => (s === entry.product.slug ? null : entry.product.slug))
                }
                onClose={() => setOpenSlug(null)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ShopProductCard({
  entry,
  open,
  onToggle,
  onClose,
}: {
  entry: ShopProduct;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const { product, catalogImage, href } = entry;
  const { addItem } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const panelRef = useRef<HTMLDivElement>(null);
  const active = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const { price, tax } = moneyFromPurchase(product.priceCurrent, product.priceTaxNote);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onDoc);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const handleAdd = () => {
    if (!active) return;
    addItem({
      id: `${product.slug}__${active.id}`,
      name: product.title,
      variantLabel: active.label,
      price,
      tax,
      image: active.image,
      qty: Math.max(1, qty),
    });
    onClose();
  };

  return (
    <article className="relative flex flex-col items-center rounded-[39px] border border-white/5 bg-white/[0.02] px-6 pb-8 pt-4 text-center transition-colors hover:border-white/10 hover:bg-white/[0.04]">
      {product.offerBadge && (
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 shadow-sm">
          <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="font-roboto text-[11px] font-bold tracking-wide text-red-400 uppercase">
            {product.offerBadge}
          </span>
        </div>
      )}
      <Link href={href} className="group block w-full">
        <span className="relative mx-auto mb-6 mt-4 block aspect-video w-full max-w-[420px]">
          <Image
            src={catalogImage}
            alt={product.title}
            fill
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            sizes="(min-width: 640px) 420px, 100vw"
          />
        </span>
        <h2 className="font-montserrat text-[22px] font-bold text-white transition-colors group-hover:text-brand-primary">{product.title}</h2>
        <p className="font-roboto mt-2 text-[16px] font-medium text-brand-primary/80">{formatRs(price)}</p>
      </Link>

      <div className="relative mt-8 w-full" ref={panelRef}>
        <FlipButton
          type="button"
          onClick={onToggle}
          variant="primary"
          className="font-roboto mx-auto h-11 w-full max-w-[200px] rounded-full text-[14px] font-bold"
        >
          Select options
        </FlipButton>

        {open && active ? (
          <div className="absolute left-1/2 top-[calc(100%+12px)] z-20 w-[min(100%,320px)] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_16px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-3 rounded-t-2xl">
              <p className="font-roboto truncate text-[13px] font-medium text-white/80">
                {product.variantLabel} : {active.label}
              </p>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="shrink-0 p-1 text-white/50 transition-colors hover:text-white"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-3 px-4 py-4">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  aria-label={v.label}
                  aria-pressed={v.id === active.id}
                  onClick={() => setVariantId(v.id)}
                  className={`relative h-14 w-14 overflow-hidden rounded-lg border bg-white/5 transition-all ${
                    v.id === active.id ? "border-brand-primary ring-2 ring-brand-primary/20 scale-105" : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <Image src={v.thumb} alt="" fill className="object-contain p-1" sizes="56px" />
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 px-4 pb-4">
              <input
                type="number"
                min={1}
                max={99}
                value={qty}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  if (!Number.isNaN(n)) setQty(Math.max(1, n));
                }}
                className="font-roboto h-10 w-16 rounded-lg border border-white/10 bg-white/5 text-center text-[14px] text-white outline-none transition-colors focus:border-brand-primary"
              />
              <FlipButton
                type="button"
                onClick={handleAdd}
                variant="primary"
                className="font-roboto h-10 rounded-lg px-5 text-[14px] font-bold"
              >
                Add to cart
              </FlipButton>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
