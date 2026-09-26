"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "@/data/products/types";
import FlipButton from "@/components/ui/FlipButton";
import { Badge } from "@/components/ui/badge";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ProductHero({ product }: { product: Product }) {
  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#050505] px-4 pb-12 pt-28 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
      {/* Background Image with Dark Gradients */}
      <div className="absolute inset-0 z-0 bg-[#050505]">
        <Image
          src="/assets/images/newhero3.jpeg"
          alt={`${product.name} background`}
          fill
          priority
          className="object-cover object-center opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/40 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/50" />
        {/* Subtle urban grid lines */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-1 w-full max-w-[1600px] mx-auto flex-col justify-between pointer-events-none">

        {/* Top Section: Title */}
        <div className="pointer-events-auto flex flex-col items-start gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-0">

          <div className="flex flex-col items-start gap-4 lg:gap-6">
            {product.offerBadge && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
              >
                <Badge variant="outline" className="h-7 border-brand-primary/30 bg-brand-primary/5 px-3 font-roboto text-[11px] font-bold uppercase tracking-widest text-brand-primary backdrop-blur-md">
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-brand-primary animate-pulse" />
                  {product.offerBadge}
                </Badge>
              </motion.div>
            )}

            <h1 className="flex flex-wrap overflow-hidden font-montserrat text-[48px] font-black italic uppercase leading-[0.9] tracking-tighter text-white sm:text-[64px] lg:text-[100px] xl:text-[120px]">
              {product.title.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease }}
                  className="mr-[0.3em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="font-roboto max-w-[420px] text-[15px] font-medium leading-relaxed text-white/60 sm:text-[17px] lg:text-[19px]"
            >
              {product.subtitle}
            </motion.p>
          </div>

          {/* Specs (Vertical on Desktop) */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:flex-col lg:items-start lg:gap-10 lg:pr-6 xl:pr-0">
            {product.heroSpecs.map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.15, ease }}
                className="flex items-center gap-4 lg:flex-col lg:items-end lg:text-right"
              >
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 lg:h-20 lg:w-20 lg:border lg:border-white/10 lg:bg-[#111]/60 lg:backdrop-blur-md">
                  <div className="relative h-6 w-6 lg:h-10 lg:w-10">
                    <Image src={spec.icon} alt="" fill className="object-contain opacity-80" sizes="40px" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-montserrat text-[15px] font-bold uppercase tracking-wide text-white lg:text-[20px]">
                    {spec.label}
                  </span>
                  <span className="font-roboto text-[12px] font-medium text-brand-primary lg:text-[15px]">
                    {spec.value}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Massive Bike Image (In flow on mobile, absolute centered on desktop) */}
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease }}
          className="relative flex-1 w-full min-h-[300px] my-6 z-[5] pointer-events-none lg:absolute lg:inset-0 lg:my-0 lg:pb-[140px] lg:pt-[120px] lg:translate-x-[5%] lg:flex lg:items-center lg:justify-center"
        >
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-full max-w-[900px] xl:max-w-[1000px] scale-[1.1] ">
            <Image
              src={product.heroImage}
              alt={product.name}
              fill
              priority
              className="object-contain object-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              sizes="(max-width: 1024px) 100vw, 900px"
            />
          </div>
        </motion.div>

        {/* Bottom Section: Pricing & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="pointer-events-auto relative z-20 flex flex-col items-start justify-between gap-8 border-t border-white/10 pt-8 lg:mt-16 lg:flex-row lg:items-center lg:gap-0 lg:pt-10"
        >
          <div className="flex flex-col gap-1">
            {product.priceTagline && (
              <p className="font-roboto text-[12px] font-semibold uppercase tracking-widest text-white/50">
                {product.priceTagline}
              </p>
            )}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              {product.priceOriginal && (
                <p className="font-montserrat text-[18px] font-medium text-white/30 line-through decoration-white/40">
                  {product.priceOriginal}
                </p>
              )}
              <div className="font-montserrat flex items-baseline gap-2 text-[32px] font-bold tracking-tight text-white sm:text-[40px]">
                <span className="text-[20px] font-medium text-white/60">Only in</span>
                <span className="text-brand-primary">{product.priceCurrent}</span>
              </div>
              {product.priceTaxNote && (
                <span className="font-roboto ml-1 text-[13px] font-medium text-white/40">
                  {product.priceTaxNote}
                </span>
              )}
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto lg:gap-4">
            <FlipButton
              href={product.buyHref}
              variant="primary"
              className="h-[56px] w-full rounded-none px-10 text-[14px] lg:w-auto"
            >
              Buy Now
            </FlipButton>
            <FlipButton
              href={product.bookHref}
              variant="outline"
              icon={<Calendar className="h-[18px] w-[18px]" strokeWidth={2} />}
              className="h-[56px] w-full rounded-none border-white/20 px-10 text-[14px] text-white hover:border-brand-primary hover:bg-transparent hover:text-brand-primary lg:w-auto"
            >
              Book a test ride
            </FlipButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
