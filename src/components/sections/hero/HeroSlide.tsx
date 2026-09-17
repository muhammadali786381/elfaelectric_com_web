"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Calendar } from "lucide-react";
import type { Slide, Spec } from "./hero.data";

function SpecCard({ spec }: { spec: Spec }) {
  return (
    <div className="flex w-[calc(50%-8px)] shrink-0 flex-col gap-[6px] sm:w-[150px] xl:w-[185px]">
      <div className="flex h-[95px] w-full flex-col items-center justify-between rounded-[9px] border-2 border-white bg-black/30 px-[6px] py-2 xl:h-[112px]">
        <span className="font-montserrat text-center text-[12px] font-semibold leading-tight text-white xl:text-[15px] xl:leading-[15px]">
          {spec.value}
        </span>
        <Image
          src={spec.icon}
          alt=""
          width={56}
          height={56}
          className="h-9 w-9 object-contain brightness-0 invert xl:h-[56px] xl:w-[56px]"
        />
      </div>
      <p className="font-roboto whitespace-pre-line text-center text-[11px] font-semibold uppercase leading-[13px] text-white xl:text-[14px] xl:leading-[15px]">
        {spec.label}
      </p>
    </div>
  );
}

function SlideBackground({ background }: { background: string }) {
  return (
    <div className="absolute inset-0">
      <Image src={background} alt="" fill priority className="object-cover object-center" sizes="100vw" />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}

export function SplitSlide({ slide }: { slide: Extract<Slide, { layout: "split" }> }) {
  return (
    <div className="relative flex h-full w-full flex-col lg:flex-row lg:items-stretch">
      <SlideBackground background={slide.background} />

      {/* Product photo — full-bleed, edge-to-edge, 55% of the hero width on
          desktop (matches the live site's actual image box exactly). */}
      <motion.div
        initial={{ opacity: 0, x: -28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-[42%] w-full lg:h-full lg:w-[55%]"
      >
        <Image
          src={slide.productImage}
          alt={slide.productAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="(min-width: 1024px) 55vw, 100vw"
        />
      </motion.div>

      {/* Right column — starts flush at the 55% mark, title sits 147px down
          from the hero top on desktop (measured from the live site). */}
      <motion.div
        initial={{ opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-[58%] w-full flex-col justify-start px-5 pb-4 pt-2 lg:h-full lg:w-[45%] lg:justify-start lg:px-0 lg:pb-0 lg:pr-10 lg:pt-[110px] xl:pt-[147px]"
      >
        <h1 className="font-montserrat mb-3 text-[32px] font-extrabold italic leading-none text-white sm:text-[40px] lg:mb-[20px] lg:text-[55px] xl:text-[65px] xl:leading-[65px]">
          {slide.title}
        </h1>
        <p className="font-roboto mb-3 max-w-[520px] whitespace-pre-line text-[18px] font-medium leading-[1.15] text-[#fcfcfc] sm:text-[22px] lg:mb-[20px] lg:text-[28px] xl:text-[34px] xl:leading-[38px]">
          {slide.subtitle}
        </p>

        <div className="mb-3 flex flex-wrap gap-5 lg:mb-[20px]">
          <Link
            href="/book-a-test-ride"
            className="font-roboto inline-flex h-10 items-center gap-2 rounded-[3px] bg-[#61ce70] px-6 text-[13px] font-normal uppercase leading-none tracking-[1.2px] text-white transition-colors hover:bg-[#4fbf5f] lg:text-[16px]"
          >
            <Calendar className="h-4 w-4 lg:h-[18px] lg:w-[18px]" strokeWidth={2} />
            Book a test ride
          </Link>
          <Link
            href={slide.exploreHref}
            className="font-roboto inline-flex h-10 items-center gap-1.5 rounded-[3px] bg-[#61ce70] px-6 text-[13px] font-normal uppercase leading-none tracking-[1.2px] text-white transition-colors hover:bg-[#4fbf5f] lg:text-[16px]"
          >
            Explore now
            <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>

        <div className="flex flex-wrap gap-[18px] xl:gap-[27px]">
          {slide.specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.22 + i * 0.06, ease: "easeOut" }}
            >
              <SpecCard spec={spec} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function CenterSlide({ slide }: { slide: Extract<Slide, { layout: "center" }> }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-end pb-8 text-center lg:pb-10">
      <SlideBackground background={slide.background} />
      <div className="relative z-10 px-4">
        <h1 className="font-poppins mx-auto max-w-[830px] whitespace-pre-line text-[28px] font-extrabold italic leading-none tracking-[-1.5px] text-white sm:text-[36px] lg:text-[40px] xl:text-[45px] xl:tracking-[-2px]">
          {slide.title}
        </h1>
        <p className="font-roboto mt-3 text-[16px] font-medium leading-none text-[#fcfcfc] lg:text-[20px]">
          {slide.subtitle}
        </p>
      </div>
    </div>
  );
}
