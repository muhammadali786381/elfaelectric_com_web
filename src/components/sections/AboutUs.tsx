"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import FlipButton from "@/components/ui/FlipButton";

export default function AboutUs() {
  return (
    <section className="bg-bg-primary py-16 lg:py-24">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">

          {/* Left — Product image with dark gradient overlay */}
          <FadeIn variant="fadeInLeft" speed="slow">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src="/assets/images/ne-a.webp"
                alt="ELFA Electric Solutions"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/80 via-bg-primary/40 to-transparent" />
              {/* Bottom fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />
            </div>
          </FadeIn>

          {/* Right — Text content */}
          <FadeIn variant="fadeInRight" speed="slow">
            <div className="flex flex-col gap-6">
              <p className="font-roboto text-[13px] font-semibold uppercase tracking-[2px] text-brand-primary">
                Our Story
              </p>
              <h2 className="font-montserrat text-[32px] font-bold leading-tight text-text-primary sm:text-[38px] lg:text-[44px]">
                About <span className="text-brand-primary">ELFA</span> Electric
              </h2>
              <div className="flex flex-col gap-4">
                <p className="font-roboto text-[15px] leading-relaxed text-text-secondary sm:text-[16px]">
                  ELFA Electric, born under EV Technologies at Wavetec, is driven by a passion for building
                  an electric future with sustainable, affordable, and innovative solutions powered by clean
                  technology.
                </p>
                <p className="font-roboto text-[15px] leading-relaxed text-text-secondary sm:text-[16px]">
                  At ELFA Electric, we believe that every person and every detail matters. Our electric
                  motorcycles are meticulously designed, engineered, and rigorously tested for the local
                  rider, using top-quality components.
                </p>
              </div>
              <div className="mt-2">
                <FlipButton
                  href="/about-us"
                  variant="primary"
                  icon={<ArrowRight className="h-4 w-4" strokeWidth={2.5} />}
                  className="font-roboto h-[48px] px-8 text-[13px] tracking-[1.5px]"
                >
                  Discover More
                </FlipButton>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
