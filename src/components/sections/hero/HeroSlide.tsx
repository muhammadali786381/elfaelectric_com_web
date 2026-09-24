"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Calendar } from "lucide-react";
import type { Slide, Spec } from "./hero.data";
import { ease, duration } from "@/components/motion/FadeIn";

/**
 * Spec card — ref measurements:
 *   Mobile: value 13px, icon ~57px, label below card ~12px
 *   Card box h ≈ 95px on mobile, 115px on desktop
 */
function SpecCard({ spec }: { spec: Spec }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1 lg:gap-[6px]">
      <div className="flex h-[95px] w-full flex-col items-center justify-between rounded-[9px] border-2 border-white bg-black/30 px-[8px] py-2 lg:h-[115px] lg:py-2.5">
        <span className="font-montserrat text-center text-[13px] font-semibold leading-tight text-white lg:text-[14px] xl:text-[17px] xl:leading-[18px]">
          {spec.value}
        </span>
        <div className="relative h-[40px] w-[40px] sm:h-[52px] sm:w-[52px] lg:h-[58px] lg:w-[58px] xl:h-[68px] xl:w-[76px]">
          <Image
            src={spec.icon}
            alt=""
            fill
            className="object-contain brightness-0 invert"
            sizes="76px"
          />
        </div>
      </div>
      <p className="font-roboto whitespace-pre-line text-center text-[10px] font-semibold uppercase leading-[12px] text-white sm:text-[12px] sm:leading-[14px] lg:text-[13px] lg:leading-[15px] xl:text-[15px] xl:leading-[17px]">
        {spec.label}
      </p>
    </div>
  );
}

function SlideBackground({ background }: { background: string }) {
  return (
    <div className="absolute inset-0">
      <Image
        src={background}
        alt=""
        fill
        priority
        className="object-cover object-top"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}

/**
 * Mobile layout (matches elfaelectric.com @390px):
 *  - Bike photo: absolute inset-0, object-cover object-top (zoomed close-up)
 *  - Gradient: transparent 0-28%, fades to black by 58%
 *  - Content: absolute bottom-0, centered, spec 2x2 grid
 *
 * Desktop: flex row — left 55% photo | right 45% content
 */
export function SplitSlide({ slide }: { slide: Extract<Slide, { layout: "split" }> }) {
  return (
    <div className="relative h-full w-full lg:flex lg:flex-row lg:items-stretch">
      <SlideBackground background={slide.background} />

      {/* Product image — shorter top band on mobile (slightly smaller), left column on desktop */}
      <div className="absolute inset-x-0 top-0 h-[49%] lg:relative lg:inset-auto lg:h-full lg:w-[55%] lg:shrink-0">
        <Image
          src={slide.productImage}
          alt={slide.productAlt}
          fill
          priority
          className="object-contain object-bottom lg:object-cover lg:object-top"
          sizes="(min-width: 1024px) 55vw, 100vw"
        />
      </div>

      {/* Gradient: transparent at top → solid black by ~52% — mobile only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] lg:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0.45) 34%, rgba(0,0,0,0.88) 44%, #000 52%, #000 100%)",
        }}
      />

      {/* Content — mobile: sticks to bottom; desktop: right column, centred vertically */}
      <div className="absolute inset-x-0 bottom-0 z-[2] flex flex-col items-center px-4 pb-3 text-center lg:static lg:h-full lg:w-[45%] lg:items-start lg:justify-center lg:px-0 lg:pb-8 lg:pr-10 lg:pt-8 lg:text-left">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.slow, ease }}
          className="font-montserrat mb-1 text-[40px] font-extrabold italic leading-none text-white sm:text-[44px] lg:mb-[20px] lg:text-[55px] xl:text-[65px] xl:leading-[65px]"
        >
          {slide.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.slow, delay: 0.15, ease }}
          className="font-roboto mb-2 max-w-[320px] whitespace-pre-line text-[16px] font-medium leading-tight text-[#fcfcfc] sm:max-w-[440px] sm:text-[20px] lg:mb-[20px] lg:max-w-[520px] lg:text-[28px] xl:text-[34px] xl:leading-[38px]"
        >
          {slide.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: "40%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: duration.normal, delay: 0.35, ease }}
          className="mb-2 flex flex-nowrap items-center justify-center gap-2 sm:gap-4 lg:mb-[20px] lg:justify-start"
        >
          <Link
            href="/book-a-test-ride"
            className="font-roboto inline-flex h-9 items-center gap-1.5 rounded-[3px] bg-[#61ce70] px-3 text-[11px] font-normal uppercase leading-none tracking-[0.8px] text-white transition-colors hover:bg-[#4fbf5f] sm:h-10 sm:px-5 sm:text-[13px] sm:tracking-[1.2px] lg:text-[16px]"
          >
            <Calendar className="h-3.5 w-3.5 lg:h-[18px] lg:w-[18px]" strokeWidth={2} />
            Book a test ride
          </Link>
          <Link
            href={slide.exploreHref}
            className="font-roboto inline-flex h-9 items-center gap-1 rounded-[3px] bg-[#61ce70] px-3 text-[11px] font-normal uppercase leading-none tracking-[0.8px] text-white transition-colors hover:bg-[#4fbf5f] sm:h-10 sm:gap-1.5 sm:px-5 sm:text-[13px] sm:tracking-[1.2px] lg:text-[16px]"
          >
            Explore now
            <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </motion.div>

        {/* Mobile: 2×2 grid matching live site. Desktop: 4-up flex row */}
        <div className="grid w-full grid-cols-2 gap-2 lg:flex lg:flex-nowrap lg:gap-3 xl:gap-4">
          {slide.specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              className="min-w-0 lg:flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: duration.normal, delay: 0.5 + i * 0.08, ease }}
            >
              <SpecCard spec={spec} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BannerSlide({ slide }: { slide: Extract<Slide, { layout: "banner" }> }) {
  const external = /^https?:\/\//.test(slide.href);

  return (
    <Link
      href={slide.href}
      className="relative block h-full w-full"
      aria-label={slide.alt}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.slow, ease }}
        className="absolute inset-0"
      >
        <Image
          src={slide.image}
          alt={slide.alt}
          fill
          priority
          className="hidden object-cover object-center sm:block"
          sizes="(min-width: 640px) 100vw, 1px"
        />
        <Image
          src={slide.imageMobile ?? slide.image}
          alt=""
          fill
          priority
          className="object-cover object-center sm:hidden"
          sizes="(max-width: 639px) 100vw, 1px"
        />
      </motion.div>
    </Link>
  );
}
