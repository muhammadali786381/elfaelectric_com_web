"use client";

import { FadeIn } from "@/components/motion/FadeIn";

export default function HeadlineBanner() {
  return (
    <section className="bg-white pb-4 pt-4 lg:pb-6 lg:pt-6">
      <FadeIn variant="fadeIn" speed="slow">
        <h2 className="font-montserrat mx-auto max-w-[900px] px-4 text-center text-[28px] font-bold leading-tight text-[#212121] sm:text-[36px] lg:text-[50px]">
          Constructing The Sustainable Future, Electrifying Innovation!
        </h2>
      </FadeIn>
    </section>
  );
}
