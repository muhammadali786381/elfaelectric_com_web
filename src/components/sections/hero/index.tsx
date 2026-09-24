"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BreathingText from "@/components/fancy/text/breathing-text";
import FlipButton from "@/components/ui/FlipButton";

const specs = [
  { value: "72V / 30Ah", label: "BATTERY CAPACITY" },
  { value: "Up to 75 Km/h", label: "TOP SPEED" },
  { value: "2,000 Watt", label: "MOTOR POWER" },
  { value: "100+ Km", label: "RANGE" },
];

export default function Hero() {
  const duration = 0.8;
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-[#050505] pt-20 lg:flex-row lg:items-center lg:pt-0">
      {/* Background with user-provided image and gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/newhero1.jpeg"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center opacity-80"
        />
        {/* Gradients adjusted to let the background show through more clearly */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent lg:w-[60%]" />
        <div className="absolute inset-0 top-auto bottom-0 h-40 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
      </div>

      {/* Content - Left side on desktop */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pt-4 pb-8 sm:px-10 lg:h-full lg:w-[50%] lg:flex-none lg:pb-32 lg:pl-16 xl:pl-24 2xl:pl-[100px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, ease }}
          className="font-roboto mb-3 text-[11px] font-bold uppercase tracking-[3px] text-brand-primary lg:text-[13px]"
        >
          THE NEW EV-125 BIKE
        </motion.div>

        <h1 className="font-montserrat mb-4 flex flex-col text-[40px] font-black leading-[0.95] tracking-tight text-white sm:text-[50px] lg:text-[70px] xl:text-[80px]">
          <div className="block">
            <BreathingText
              staggerDuration={0.08}
              fromFontVariationSettings="'wght' 100, 'slnt' 0"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
            >
              MOVE INTO
            </BreathingText>
          </div>
          <div className="block text-brand-primary">
            <BreathingText
              staggerDuration={0.08}
              fromFontVariationSettings="'wght' 100, 'slnt' 0"
              toFontVariationSettings="'wght' 900, 'slnt' -10"
            >
              THE FUTURE.
            </BreathingText>
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.25, ease }}
          className="font-roboto mb-8 max-w-[380px] text-[15px] font-medium leading-relaxed text-white/70 sm:text-[17px] lg:text-[19px]"
        >
          Designed to perform on rough and challenging roads.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration, delay: 0.4, ease }}
          className="flex flex-wrap items-center gap-3 sm:gap-4"
        >
          <FlipButton
            href="/ev-125"
            variant="primary"
            className="rounded-none h-12 sm:h-[50px] px-6 sm:px-8 text-[13px]"
          >
            Explore Bikes
          </FlipButton>
          <FlipButton
            href="/book-a-test-ride"
            variant="outline"
            className="rounded-none h-12 sm:h-[50px] px-6 sm:px-8 text-[13px] border-white/20 text-white hover:border-brand-primary hover:bg-transparent hover:text-brand-primary"
          >
            Book a test ride
          </FlipButton>
        </motion.div>
      </div>

      {/* Product Image - Right side on desktop */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 pb-20 sm:px-10 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[55%] lg:items-end lg:pb-0 lg:pr-4">
        <motion.div
          initial={{ opacity: 0, x: "20vw" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 50,
            damping: 15
          }}
          className="relative aspect-[4/3] w-[90%] max-w-[500px] lg:aspect-auto lg:h-[85%] lg:w-[130%] lg:max-w-none lg:translate-x-[-5%]"
        >
          <Image
            src="/assets/images/consent-policy-banner.png"
            alt="EV-125 Bike"
            fill
            priority
            className="object-contain object-center lg:object-right-bottom"
            sizes="(max-width: 1024px) 90vw, 55vw"
          />
        </motion.div>
      </div>

      {/* Bottom Specs Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration, delay: 0.6, ease }}
        className="absolute bottom-4 left-0 right-0 z-20 flex w-full items-center justify-center px-2 lg:bottom-10"
      >
        <div className="flex w-full max-w-[1200px] flex-wrap items-center justify-center gap-y-2 divide-x divide-white/10 lg:flex-nowrap">
          {specs.map((spec) => (
            <div key={spec.label} className="w-1/2 lg:w-1/4">
              <div className="flex flex-col items-center justify-center gap-1 px-2 text-center lg:px-4">
                <div className="mb-0.5 h-[2px] w-5 bg-brand-primary lg:mb-1 lg:w-6" />
                <span className="font-montserrat whitespace-nowrap text-[11px] font-bold tracking-widest text-white sm:text-[13px] lg:text-[14px]">
                  {spec.value.toUpperCase()}
                </span>
                <span className="font-roboto whitespace-nowrap text-[8.5px] font-medium uppercase tracking-[1px] text-white/50 sm:text-[9.5px] lg:text-[11px]">
                  {spec.label.replace("\n", " ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
