"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

type Spec = {
  value: string;
  label: string;
  icon: string;
};

type Slide =
  | {
      id: string;
      layout: "split";
      title: string;
      subtitle: string;
      productImage: string;
      productAlt: string;
      specs: Spec[];
      exploreHref: string;
    }
  | {
      id: string;
      layout: "center";
      title: string;
      subtitle: string;
      productImage: string;
      productAlt: string;
    };

const slides: Slide[] = [
  {
    id: "ev125",
    layout: "split",
    title: "EV-125 BIKE",
    subtitle: "Designed to perform on rough and\nchallenging roads!",
    productImage: "/assets/images/ev125-hero.webp",
    productAlt: "ELFA EV-125 electric bike",
    exploreHref: "/ev-125",
    specs: [
      { value: "72V / 30Ah", label: "BATTERY\nCAPACITY", icon: "/assets/images/battery.webp" },
      { value: "Up to 75 Km/h", label: "TOP SPEED", icon: "/assets/images/untitled-2.webp" },
      { value: "2,000 Watt", label: "MOTOR POWER", icon: "/assets/images/motor-power.webp" },
      { value: "100+ Km", label: "RANGE", icon: "/assets/images/range.webp" },
    ],
  },
  {
    id: "scooty",
    layout: "split",
    title: "EV-1 Scooty",
    subtitle: "Ready to handle every local\nroad challenge.",
    productImage: "/assets/images/scooty-hero.webp",
    productAlt: "ELFA EV-1 Scooty",
    exploreHref: "/scooty-ev-1",
    specs: [
      { value: "64V / 30Ah", label: "BATTERY\nCAPACITY", icon: "/assets/images/battery.webp" },
      { value: "Up to 60 Km/h", label: "TOP SPEED", icon: "/assets/images/untitled-2.webp" },
      { value: "1,500 Watt", label: "MOTOR POWER", icon: "/assets/images/motor-power.webp" },
      { value: "75 Km", label: "RANGE", icon: "/assets/images/range.webp" },
    ],
  },
  {
    id: "battery",
    layout: "center",
    title: "Advanced Lithium Iron Phosphate\nBatteries",
    subtitle: "Safer and longer-lasting than graphene.",
    productImage: "/assets/images/bike-red.png",
    productAlt: "ELFA bike with LiFePO4 battery",
  },
];

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

function SplitSlide({ slide }: { slide: Extract<Slide, { layout: "split" }> }) {
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

function CenterSlide({ slide }: { slide: Extract<Slide, { layout: "center" }> }) {
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

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[min(78vh,640px)] min-h-[520px] w-full md:h-[495px] md:min-h-0">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/Hero-Banner-Background.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
            className="absolute inset-0 z-10"
          >
            {slide.layout === "split" ? (
              <SplitSlide slide={slide} />
            ) : (
              <CenterSlide slide={slide} />
            )}
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous"
          className="absolute left-3 top-1/2 z-30 flex h-[35px] w-[35px] -translate-y-1/2 items-center justify-center rounded-full bg-[#61ce70] text-white transition-colors hover:bg-[#4fbf5f] sm:left-5"
        >
          <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next"
          className="absolute right-3 top-1/2 z-30 flex h-[35px] w-[35px] -translate-y-1/2 items-center justify-center rounded-full bg-[#61ce70] text-white transition-colors hover:bg-[#4fbf5f] sm:right-5"
        >
          <ChevronRight className="h-[22px] w-[22px]" strokeWidth={2.5} />
        </button>
      </div>

      <div className="fixed bottom-6 left-[26px] z-40 flex flex-col gap-3">
        <button
          type="button"
          aria-label="Cart"
          className="flex h-[47px] w-[47px] items-center justify-center rounded-full border border-[#61ce70] bg-[#61ce70] text-white shadow-md transition-transform hover:scale-105"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </button>
        <a
          href="https://wa.me/923114863532"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="flex h-[47px] w-[47px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-transform hover:scale-105"
        >
          <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>
    </section>
  );
}
