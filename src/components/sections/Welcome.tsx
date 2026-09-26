"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import FlipButton from "@/components/ui/FlipButton";

const features = [
  {
    title: "Meet Us",
    body: "Locate us today to enjoy a unique and personalized experience.",
    /** Wave 1 — with “Welcome” */
    wave: 1 as const,
  },
  {
    title: "Book A Test Ride",
    body: "Experience the journey from your doorstep by booking a Test Ride.",
    wave: 1 as const,
  },
  {
    title: "Discover Your Perfect Ride",
    body: "Available in a range of striking colors to match your style.",
    /** Wave 2 — with Explore headline */
    wave: 2 as const,
  },
];

/**
 * Wave 1: Welcome + Meet Us + Book A Test Ride → from right → left
 * Wave 2 (delayed): Explore title + Discover → from right → left
 */
export default function Welcome() {
  return (
    <section className="bg-bg-primary py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex justify-center">
            <Image
              src="/assets/images/EV-125-BIKE-1.webp"
              alt="ELFA EV-125"
              width={565}
              height={534}
              className="h-auto w-full max-w-[565px] object-contain"
            />
          </div>

          <div>
            <FadeIn variant="fadeInRight" speed="slow" delay={0}>
              <span className="font-montserrat block text-[24px] font-bold text-brand-primary sm:text-[30px]">
                Welcome
              </span>
            </FadeIn>

            <FadeIn variant="fadeInRight" speed="slow" delay={0.35}>
              <h2 className="font-montserrat mb-8 max-w-[565px] text-[32px] font-bold leading-tight text-text-primary sm:text-[38px] lg:text-[44px]">
                Explore, Experience, And Connect With Us
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 gap-x-[20px] gap-y-8 sm:grid-cols-2">
              {features.map((f) => (
                <FadeIn
                  key={f.title}
                  variant="fadeInRight"
                  speed="slow"
                  delay={f.wave === 1 ? 0 : 0.35}
                  className="max-w-[273px]"
                >
                  <h3 className="font-montserrat mb-2 text-[18px] font-bold text-brand-primary sm:text-[20px]">
                    {f.title}
                  </h3>
                  <p className="font-roboto text-[14px] leading-relaxed text-text-primary">{f.body}</p>
                </FadeIn>
              ))}
            </div>
            
            <FadeIn variant="fadeInRight" speed="slow" delay={0.5} className="mt-8">
              <FlipButton
                href="/ev-education"
                variant="primary"
                className="font-roboto h-12 rounded-[4px] px-8 text-[15px] font-semibold tracking-[1px]"
              >
                EV Education
              </FlipButton>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
