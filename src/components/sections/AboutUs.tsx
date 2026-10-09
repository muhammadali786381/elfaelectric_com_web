"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import FlipButton from "@/components/ui/FlipButton";

export default function AboutUs() {
  return (
    <section className="relative overflow-hidden bg-bg-primary pt-0 pb-20 lg:pt-0 lg:pb-32">
      {/* Subtle background glow to prevent it from looking like an empty void */}
      <div 
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, var(--color-brand-primary) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-4 sm:px-6">
        <FadeIn variant="fadeInUp" speed="slow" className="flex flex-col items-center text-center">
          
          {/* Subtle accent line */}
          <div className="mb-8 h-1 w-12 rounded-full bg-brand-primary" />

          <h2 className="font-montserrat mb-8 text-[38px] font-bold leading-tight text-white sm:text-[48px] lg:text-[56px] text-balance">
            About <span className="text-brand-primary">ELFA</span> Electric
          </h2>
          
          <div className="mb-10 flex flex-col gap-6 px-4">
            {/* Lead paragraph: larger and brighter */}
            <p className="font-roboto text-[18px] leading-[1.6] text-white/90 sm:text-[20px] lg:text-[22px] text-balance">
              ELFA Electric, born under EV Technologies at Wavetec, is driven by a passion for building
              an electric future with sustainable, affordable, and innovative solutions powered by clean
              technology.
            </p>
            {/* Supporting paragraph: smaller and dimmer */}
            <p className="font-roboto text-[15px] leading-relaxed text-white/60 sm:text-[16px] text-balance">
              At ELFA Electric, we believe that every person and every detail matters. Our electric
              motorcycles are meticulously designed, engineered, and rigorously tested for the local
              rider, using top-quality components.
            </p>
          </div>
          
          <FlipButton
            href="/about-us"
            variant="primary"
            icon={<ArrowRight className="h-5 w-5" strokeWidth={2.5} />}
            className="font-roboto h-[52px] rounded-full px-10 text-[14px] tracking-[1.5px] uppercase font-bold"
          >
            Discover More
          </FlipButton>
        </FadeIn>
      </div>
    </section>
  );
}
