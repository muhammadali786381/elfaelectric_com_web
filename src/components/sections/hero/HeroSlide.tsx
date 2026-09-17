"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Calendar } from "lucide-react";
import type { Slide, Spec } from "./hero.data";

function SpecCard({ spec }: { spec: Spec }) {
  return (
    <div className="flex w-[calc(50%-6.5px)] shrink-0 flex-col gap-[5px] sm:w-[110px] lg:w-[131px]">
      <div className="flex h-[78px] w-full flex-col items-center justify-between rounded-[9px] border-2 border-white bg-black/30 px-[5px] py-2 lg:h-[91px] lg:py-[10px]">
        <span className="font-montserrat text-center text-[11px] font-semibold leading-tight text-white lg:text-[13px] lg:leading-[13px]">
          {spec.value}
        </span>
        <Image
          src={spec.icon}
          alt=""
          width={36}
          height={36}
          className="h-7 w-7 object-contain brightness-0 invert lg:h-9 lg:w-9"
        />
      </div>
      <p className="font-roboto whitespace-pre-line text-center text-[11px] font-semibold uppercase leading-[13px] text-white lg:text-[14px] lg:leading-[15px]">
        {spec.label}
      </p>
    </div>
  );
}

export function SplitSlide({ slide }: { slide: Extract<Slide, { layout: "split" }> }) {
  return (
    <div className="relative flex h-full w-full flex-col lg:flex-row lg:items-stretch">
      {/* Product — left; live bike sits mid-left of the 495px frame */}
      <motion.div
        initial={{ opacity: 0, x: -28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-[42%] w-full items-center justify-center px-8 pt-4 lg:h-full lg:w-[52%] lg:justify-start lg:pl-8 lg:pt-0 xl:pl-12"
      >
        <Image
          src={slide.productImage}
          alt={slide.productAlt}
          width={900}
          height={700}
          priority
          className="h-auto max-h-[95%] w-full max-w-[740px] object-contain object-center lg:object-left"
        />
      </motion.div>

      {/* Right column — live title ~63px from hero top (not vertically centered) */}
      <motion.div
        initial={{ opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-[58%] w-full flex-col justify-start px-5 pb-4 pt-2 lg:h-full lg:w-[48%] lg:justify-start lg:px-0 lg:pb-0 lg:pr-12 lg:pt-[56px] xl:pr-16 xl:pt-[63px]"
      >
        <h1 className="font-montserrat mb-2 text-[32px] font-extrabold italic leading-none text-white sm:text-[40px] lg:mb-[20px] lg:text-[55px] xl:text-[65px] xl:leading-[65px]">
          {slide.title}
        </h1>
        <p className="font-roboto mb-4 max-w-[483px] whitespace-pre-line text-[18px] font-medium leading-[1.15] text-[#fcfcfc] sm:text-[22px] lg:mb-[36px] lg:text-[28px] xl:text-[34px] xl:leading-[38px]">
          {slide.subtitle}
        </p>

        <div className="mb-4 flex flex-wrap gap-5 lg:mb-[30px]">
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

        <div className="flex flex-wrap gap-[13px]">
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
      <div className="absolute inset-0 flex items-center justify-center pt-2">
        <Image
          src={slide.productImage}
          alt={slide.productAlt}
          width={900}
          height={600}
          priority
          className="h-auto max-h-[70%] w-auto max-w-[780px] object-contain drop-shadow-2xl lg:max-h-[78%]"
        />
      </div>
      <div className="relative z-10 px-4">
        <h1 className="font-poppins mx-auto max-w-[600px] whitespace-pre-line text-[28px] font-extrabold italic leading-none tracking-[-1.5px] text-white sm:text-[36px] lg:text-[40px] xl:text-[45px] xl:tracking-[-2px]">
          {slide.title}
        </h1>
        <p className="font-roboto mt-3 text-[16px] font-medium leading-none text-[#fcfcfc] lg:text-[20px]">
          {slide.subtitle}
        </p>
      </div>
    </div>
  );
}
