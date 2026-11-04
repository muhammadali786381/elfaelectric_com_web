"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import FlipButton from "@/components/ui/FlipButton";

export default function AboutUs() {
  return (
    <section className="relative overflow-hidden bg-bg-primary pb-12 pt-0 lg:pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, var(--color-brand-primary) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center px-4 sm:px-6">
        <FadeIn variant="fadeInUp" speed="slow" className="flex w-full flex-col items-center text-center">
          <div className="mb-5 h-1 w-12 rounded-full bg-brand-primary" />

          <h2 className="section-heading mb-5 text-balance text-white sm:mb-6">
            About <span className="text-brand-primary">ELFA</span> Electric
          </h2>

          <div className="mb-8 flex w-full max-w-[1120px] flex-col gap-4 sm:mb-9 sm:gap-5">
            <p className="font-roboto text-[17px] leading-[1.65] text-white/90 sm:text-[18px] lg:text-[19px] lg:leading-[1.7]">
              <span className="lg:block">
                ELFA Electric, born under EV Technologies at Wavetec, is driven by a passion for building an
              </span>{" "}
              <span className="lg:block">
                electric future with sustainable, affordable, and innovative solutions powered by clean technology.
              </span>
            </p>
            <p className="font-roboto text-[16px] leading-[1.65] text-white/70 sm:text-[17px] lg:text-[18px] lg:leading-[1.7]">
              <span className="lg:block">
                At ELFA Electric, we believe that every person and every detail matters. Our electric motorcycles
              </span>{" "}
              <span className="lg:block">
                are meticulously designed, engineered, and rigorously tested for the local rider, using top-quality
                components.
              </span>
            </p>
          </div>
          
          <FlipButton
            href="/about-us"
            variant="primary"
            shape="cut"
            icon={<ArrowRight className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />}
            className="font-roboto h-[52px] flex-row-reverse px-10 text-[14px] tracking-[1.5px] uppercase font-bold"
          >
            Discover More
          </FlipButton>
        </FadeIn>
      </div>
    </section>
  );
}
