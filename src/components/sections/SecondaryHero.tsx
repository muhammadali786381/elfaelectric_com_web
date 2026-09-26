import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import type { ReactNode } from "react";

interface SecondaryHeroProps {
  titleLine1: ReactNode;
  titleLine2?: ReactNode;
  description: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  /** Levrix-style: left title + right description on dark field */
  layout?: "centered" | "split";
}

export default function SecondaryHero({
  titleLine1,
  titleLine2,
  description,
  imageSrc = "/assets/images/hero4.jpeg",
  imageAlt = "ELFA Electric",
  layout = "centered",
}: SecondaryHeroProps) {
  if (layout === "split") {
    return (
      <section className="relative overflow-hidden bg-[#050505] pt-28 pb-10 sm:pt-32 sm:pb-14 lg:pt-36 lg:pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(97,206,112,0.12), transparent 55%)",
          }}
        />
        <div className="relative z-10 mx-auto grid w-full max-w-[1200px] grid-cols-1 items-end gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <FadeIn
            variant="fadeInUp"
            speed="slow"
            className="lg:col-span-7"
          >
            <h1 className="font-anton text-[42px] uppercase leading-[0.92] tracking-[0.02em] text-white sm:text-[56px] lg:text-[72px]">
              {titleLine1}
              {titleLine2 ? (
                <>
                  <br />
                  {titleLine2}
                </>
              ) : null}
            </h1>
          </FadeIn>
          <FadeIn
            variant="fadeInUp"
            speed="normal"
            delay={0.08}
            className="lg:col-span-5 lg:pb-2"
          >
            <p className="font-roboto max-w-md text-[15px] font-normal leading-relaxed text-white/55 sm:text-[16px] lg:ml-auto lg:text-right">
              {description}
            </p>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-[60dvh] items-center justify-center overflow-hidden pt-28 pb-20 lg:min-h-[70dvh] lg:pt-32">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/60 to-[#050505]" />

      <div className="relative z-10 w-full max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
        <FadeIn variant="fadeInUp" speed="slow">
          <h1 className="font-montserrat mb-6 text-[48px] font-black italic uppercase leading-[0.9] tracking-tighter text-white sm:text-[64px] lg:text-[80px]">
            {titleLine1}{" "}
            {titleLine2 && (
              <>
                <br className="hidden sm:block" />
                <span className="text-brand-primary">{titleLine2}</span>
              </>
            )}
          </h1>
          <p className="font-roboto mx-auto max-w-2xl text-[16px] font-medium leading-relaxed text-white/70 sm:text-[18px]">
            {description}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
