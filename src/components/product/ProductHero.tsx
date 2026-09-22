import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import type { Product } from "@/data/products/types";

export default function ProductHero({ product }: { product: Product }) {
  return (
    <section
      className="relative overflow-hidden lg:h-[632px]"
      style={{
        backgroundImage: `url('${product.heroBackground}')`,
        backgroundSize: "cover",
        backgroundPosition: "center bottom 50%",
      }}
    >
      {/* Live Elementor ::before — black @ 0.4 opacity */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/40" aria-hidden />

      {/* ─── Mobile (< lg): bike → circular specs → centered copy ─── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[480px] flex-col items-center px-3 py-8 lg:hidden">
        <div className="relative h-[210px] w-full sm:h-[240px]">
          <Image
            src={product.heroImage}
            alt={product.name}
            fill
            priority
            className="object-contain object-center"
            sizes="90vw"
          />
        </div>

        {/* 3 glass circles — live ~121×93, radius 500 */}
        <div className="mt-3 flex w-full items-stretch justify-between gap-2">
          {product.heroSpecs.map((spec) => (
            <div
              key={spec.label}
              className="flex min-h-[93px] flex-1 flex-col items-center justify-center rounded-full border border-white/33 bg-[rgba(33,33,33,0.41)] px-1.5 py-2 text-center"
            >
              <div className="relative mb-1 h-7 w-7 shrink-0">
                <Image src={spec.icon} alt="" fill className="object-contain" sizes="28px" />
              </div>
              <p className="font-montserrat text-[11px] font-bold leading-tight text-[#fcfcfc] sm:text-[12px]">
                {spec.label}
              </p>
              <p className="font-roboto mt-0.5 text-[9px] font-normal leading-tight text-[#fcfcfc] sm:text-[10px]">
                {spec.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex w-full flex-col items-center text-center">
          {product.offerBadge ? (
            <div className="lto-badge mb-3">
              <span className="lto-dot" />
              <span className="lto-text">{product.offerBadge}</span>
            </div>
          ) : null}

          <h1 className="font-montserrat text-[32px] font-extrabold italic uppercase leading-[1.05] text-white sm:text-[35px]">
            {product.title}
          </h1>

          <p className="font-roboto mt-2 max-w-[340px] whitespace-pre-line text-[14px] font-normal leading-[20px] text-[#fcfcfc] sm:text-[15px]">
            {product.subtitle}
          </p>

          {/* Side-by-side CTAs */}
          <div className="mt-4 flex w-full items-center justify-center gap-2 sm:gap-3">
            <Link
              href={product.bookHref}
              className="font-roboto inline-flex h-[36px] flex-1 items-center justify-center gap-1.5 rounded-[8px] bg-[#61ce70] px-2 text-[12px] font-normal leading-none text-white sm:text-[13px]"
            >
              <Calendar className="h-4 w-4 shrink-0" strokeWidth={2} />
              Book a test ride
            </Link>
            <Link
              href={product.buyHref}
              className="font-roboto inline-flex h-[36px] flex-1 items-center justify-center gap-1 rounded-[8px] bg-[#61ce70] px-2 text-[12px] font-normal leading-none text-white sm:text-[13px]"
            >
              Buy now
              <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={2.5} />
            </Link>
          </div>

          {product.priceTagline ? (
            <p className="font-roboto mt-5 text-[15px] font-normal leading-tight text-[#fcfcfc] sm:text-[16px]">
              {product.priceTagline}
            </p>
          ) : null}

          <div className="mt-2">
            {product.priceOriginal ? (
              <p className="cutprice font-montserrat text-[14px] font-medium leading-[18px] text-[#fcfcfc]">
                {product.priceOriginal}
              </p>
            ) : null}
            <p className="font-montserrat mt-1 text-[22px] font-semibold leading-[28px] text-[#fcfcfc] sm:text-[24px]">
              Only in{" "}
              <span className="text-[#61ce70]">{product.priceCurrent}</span>
              {product.priceTaxNote ? (
                <span className="ml-1 text-[12px] font-medium text-[#DCF8C6]">
                  {product.priceTaxNote}
                </span>
              ) : null}
            </p>
          </div>
        </div>
      </div>

      {/* ─── Desktop (lg+): original left / bike / right layout ─── */}
      <div className="relative z-10 mx-auto hidden h-full w-full max-w-[1150px] lg:block lg:px-0 lg:py-[100px] lg:pb-[120px]">
        <div className="relative z-20 w-full max-w-[460px]">
          {product.offerBadge ? (
            <div className="lto-badge mb-4 w-fit">
              <span className="lto-dot" />
              <span className="lto-text">{product.offerBadge}</span>
            </div>
          ) : null}

          <h1 className="font-montserrat text-[65px] font-extrabold italic uppercase leading-[68px] text-white">
            {product.title}
          </h1>

          <p className="font-roboto mt-3 whitespace-pre-line text-[18px] font-normal leading-[23px] text-[#fcfcfc]">
            {product.subtitle}
          </p>

          <div className="mt-5 flex w-full max-w-[230px] flex-col gap-[13px]">
            <Link
              href={product.bookHref}
              className="font-roboto inline-flex h-10 w-full items-center justify-center gap-2 rounded-[8px] bg-[#61ce70] px-6 text-[16px] font-normal leading-none text-white transition-colors hover:bg-[#4fbf5f]"
            >
              <Calendar className="h-[18px] w-[18px]" strokeWidth={2} />
              Book a test ride
            </Link>
            <Link
              href={product.buyHref}
              className="font-roboto inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-[8px] bg-[#61ce70] px-6 text-[16px] font-normal leading-none text-white transition-colors hover:bg-[#4fbf5f]"
            >
              Buy now
              <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>

          {product.priceTagline ? (
            <p className="font-roboto mt-6 text-[19px] font-normal leading-[19px] text-[#fcfcfc]">
              {product.priceTagline}
            </p>
          ) : null}

          <div className="mt-3">
            {product.priceOriginal ? (
              <p className="cutprice font-montserrat text-[18px] font-medium leading-[18px] text-[#fcfcfc]">
                {product.priceOriginal}
              </p>
            ) : null}
            <p className="font-montserrat mt-2 text-[28px] font-semibold leading-[31px] text-[#fcfcfc]">
              Only in
              <br />
              <span className="text-[#61ce70]">{product.priceCurrent}</span>
              {product.priceTaxNote ? (
                <span className="ml-1.5 text-[13px] font-medium text-[#DCF8C6]">
                  {product.priceTaxNote}
                </span>
              ) : null}
            </p>
          </div>
        </div>

        <div className="absolute top-[152px] left-[260px] z-10 h-[402px] w-[690px]">
          <Image
            src={product.heroImage}
            alt={product.name}
            fill
            priority
            className="object-contain object-center"
            sizes="690px"
          />
        </div>

        <div className="absolute top-[188px] right-0 z-20 flex flex-col items-end gap-[20px]">
          {product.heroSpecs.map((spec, i) => (
            <div
              key={spec.label}
              className="flex w-[230px] items-center gap-[10px] rounded-full border border-white/33 bg-[rgba(33,33,33,0.41)] p-[10px]"
              style={{ transform: `translateX(${i * 28}px)` }}
            >
              <div className="relative h-[44px] w-[44px] shrink-0 overflow-hidden rounded-full">
                <Image src={spec.icon} alt="" fill className="object-contain" sizes="44px" />
              </div>
              <div className="min-w-0">
                <p className="font-montserrat text-[18px] font-bold leading-[1.2] text-[#fcfcfc]">
                  {spec.label}
                </p>
                <p className="font-roboto text-[14px] font-normal leading-[21px] text-[#fcfcfc]">
                  {spec.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
