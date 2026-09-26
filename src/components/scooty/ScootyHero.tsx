"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from "@/data/products/types";
import FlipButton from "@/components/ui/FlipButton";
import { Badge } from "@/components/ui/badge";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ScootyHero({ product }: { product: Product }) {
  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col items-center justify-between overflow-hidden bg-[#050505] px-4 pb-12 pt-28 sm:px-6 lg:px-12 xl:px-16 2xl:px-24">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[#050505]">
        <Image
          src="/assets/images/newhero3.jpeg"
          alt="Background"
          fill
          priority
          className="object-cover object-center opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/40 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />
        {/* Subtle urban grid lines */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex h-full w-full max-w-[1500px] mx-auto flex-col justify-between flex-1 pt-8 lg:pt-0">

        <div className="flex flex-col lg:flex-row lg:items-center w-full flex-1 gap-10 lg:gap-0 lg:pl-4">

          {/* Left: Header Section */}
          <div className="flex w-full lg:w-[45%] xl:w-[40%] flex-col items-center lg:items-start text-center lg:text-left z-20 shrink-0">
            {product.offerBadge && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                className="mb-4 lg:mb-6"
              >
                <Badge variant="outline" className="h-7 border-brand-primary/30 bg-brand-primary/5 px-4 font-roboto text-[11px] font-bold uppercase tracking-widest text-brand-primary backdrop-blur-md">
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-brand-primary animate-pulse" />
                  {product.offerBadge}
                </Badge>
              </motion.div>
            )}

            <h1 className="font-montserrat flex flex-wrap justify-center lg:justify-start text-[48px] font-black italic uppercase leading-[0.9] tracking-tighter text-white sm:text-[64px] lg:text-[80px] xl:text-[100px]">
              {product.title.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.12, ease }}
                  className="inline-block mr-[0.25em] last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
              className="font-roboto mt-5 max-w-[480px] text-[15px] font-medium leading-relaxed text-white/60 sm:text-[17px] lg:text-[19px]"
            >
              {product.subtitle}
            </motion.p>
          </div>

          {/* Right: Huge Scooter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -150 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease }}
            className="relative flex-1 w-full lg:w-[55%] xl:w-[60%] max-w-[700px] lg:max-w-none min-h-[300px] lg:min-h-[500px] z-10 scale-[1.1]  lg:-mr-10 xl:-mr-20"
          >
            {/* Decorative glow behind scooty */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-brand-primary/15 blur-[100px] rounded-full pointer-events-none" />

            <Image
              src={product.heroImage}
              alt={product.name}
              fill
              priority
              className="object-contain object-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              sizes="(max-width: 1024px) 100vw, 1000px"
            />
          </motion.div>
        </div>

        {/* Bottom: Specs (Left/Center) & Pricing/CTAs (Right) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="flex w-full shrink-0 flex-col gap-6 border-t border-white/10 pt-4 lg:flex-row lg:items-end lg:justify-between lg:gap-0 lg:pt-6 z-20"
        >
          {/* Horizontal Specs */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:justify-start">
            {product.heroSpecs.map((spec, i) => (
              <div key={spec.label} className="flex items-center gap-2 lg:gap-3">
                <div className="relative h-8 w-8 shrink-0 lg:h-10 lg:w-10">
                  <Image src={spec.icon} alt="" fill className="object-contain opacity-90" sizes="40px" />
                </div>
                <div className="flex flex-col">
                  <span className="font-montserrat text-[9px] font-bold uppercase tracking-widest text-white/40 lg:text-[10px]">
                    {spec.label}
                  </span>
                  <span className="font-montserrat text-[16px] font-black text-white lg:text-[18px]">
                    {spec.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing & CTAs */}
          <div className="flex flex-col items-center gap-4 lg:items-end">
            <div className="flex flex-col items-center lg:items-end">
              <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 lg:justify-end">
                {product.priceOriginal && (
                  <p className="font-montserrat text-[14px] font-medium text-white/30 line-through decoration-white/40">
                    {product.priceOriginal}
                  </p>
                )}
                <div className="font-montserrat flex items-baseline gap-2 text-[24px] font-bold tracking-tight text-white sm:text-[28px]">
                  <span className="text-[14px] font-medium text-white/60">Only in</span>
                  <span className="text-brand-primary">{product.priceCurrent}</span>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:w-auto lg:justify-end lg:gap-3">
              <FlipButton
                href={product.buyHref}
                variant="primary"
                className="h-[46px] w-full rounded-none px-8 text-[12px] sm:w-auto"
              >
                Buy Now
              </FlipButton>
              <FlipButton
                href={product.bookHref}
                variant="outline"
                icon={<Calendar className="h-[14px] w-[14px]" strokeWidth={2} />}
                className="h-[46px] w-full rounded-none border-white/20 px-8 text-[12px] text-white hover:border-brand-primary hover:bg-transparent hover:text-brand-primary sm:w-auto"
              >
                Book a Test Ride
              </FlipButton>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
