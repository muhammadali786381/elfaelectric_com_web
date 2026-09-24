"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import FlipButton from "@/components/ui/FlipButton";

export default function FinalCTA() {
  return (
    <section className="mt-2 bg-bg-primary py-8 lg:py-10">
      <FadeIn variant="fadeIn" speed="slow">
        <div className="mx-auto w-full max-w-container px-4 sm:px-6">
          <div
            className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/[0.08] bg-transparent px-6 py-10 text-center sm:flex-row sm:px-10 sm:text-left"
          >
            <h2 className="font-montserrat text-[22px] font-bold leading-tight text-text-inverse sm:text-[26px] lg:text-[30px]">
              Boost-Up Your Adventure With Electric Motorcycle
            </h2>
            <div className="flex shrink-0 flex-wrap items-center justify-center gap-3 sm:justify-start">
              <FlipButton
                href="/products"
                variant="primary"
                className="rounded-[3px] h-11 px-5 text-[13px]"
              >
                Buy Now
              </FlipButton>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
