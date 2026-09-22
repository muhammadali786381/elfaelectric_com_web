"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { ProductPurchase } from "@/data/products/purchase-types";
import { formatRs, moneyFromPurchase, useCart } from "@/components/cart/CartContext";

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
    <section className="bg-white pb-16 pt-10 lg:pb-20 lg:pt-12">
      <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6">
        <div className="font-roboto mb-8 flex flex-wrap items-center justify-between gap-3 text-[16px] text-[#333]">
          <p>Showing all {sorted.length} results</p>
          <select
            aria-label="Shop order"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-10 rounded border border-[#d5d8dc] bg-white px-3 text-[14px] outline-none focus:border-[#61ce70]"
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
    <article className="relative flex flex-col items-center rounded-[39px] border border-[rgba(122,122,122,0.14)] bg-white px-3 pb-5 pt-2.5 text-center">
      <Link href={href} className="group block w-full">
        <span className="relative mx-auto mb-3 block aspect-square w-full max-w-[280px]">
          <Image
            src={catalogImage}
            alt={product.title}
            fill
            className="object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            sizes="280px"
          />
        </span>
        <h2 className="font-montserrat text-[20px] font-bold text-[#212121]">{product.title}</h2>
        <p className="font-roboto mt-1 text-[15px] text-[#333]">{formatRs(price)}</p>
      </Link>

      <div className="relative mt-4 w-full" ref={panelRef}>
        <button
          type="button"
          onClick={onToggle}
          className="font-roboto mx-auto flex h-10 min-w-[140px] items-center justify-center rounded-[3px] bg-[#212121] px-5 text-[14px] font-semibold text-white hover:bg-black"
        >
          Select options
        </button>

        {open && active ? (
          <div className="absolute left-1/2 top-[calc(100%+8px)] z-20 w-[min(100%,280px)] -translate-x-1/2 rounded border border-[#e0e0e0] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
            <div className="flex items-center justify-between border-b border-[#eee] bg-[#f5f5f5] px-3 py-2">
              <p className="font-roboto truncate text-[13px] text-[#333]">
                {product.variantLabel} : {active.label}
              </p>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="shrink-0 p-0.5 text-[#666] hover:text-black"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 px-3 py-3">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  aria-label={v.label}
                  aria-pressed={v.id === active.id}
                  onClick={() => setVariantId(v.id)}
                  className={`relative h-12 w-12 overflow-hidden rounded border-2 bg-[#f7f7f7] ${
                    v.id === active.id ? "border-[#212121]" : "border-transparent"
                  }`}
                >
                  <Image src={v.thumb} alt="" fill className="object-contain p-0.5" sizes="48px" />
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 px-3 pb-3">
              <input
                type="number"
                min={1}
                max={99}
                value={qty}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  if (!Number.isNaN(n)) setQty(Math.max(1, n));
                }}
                className="font-roboto h-9 w-12 rounded border border-[rgba(32,7,7,0.8)] text-center text-[14px] outline-none focus:border-[#61ce70]"
              />
              <button
                type="button"
                onClick={handleAdd}
                className="font-roboto h-9 rounded-[3px] bg-[#212121] px-4 text-[13px] font-semibold text-white hover:bg-black"
              >
                Add to cart
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
