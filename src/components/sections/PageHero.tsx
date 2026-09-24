import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";

type PageHeroProps = {
  title: ReactNode;
  subtitle?: string;
  breadcrumb: string;
  /** When true, renders the two-column layout with bikes on the right (used for Newsroom/Blog) */
  withBikes?: boolean;
  /** Optional full-bleed hero background (defaults to newsroom sunset) */
  backgroundSrc?: string;
  /** Optional single combined bikes image (e.g. blog-page.png). Falls back to EV-125 + scooty cutouts. */
  bikesSrc?: string;
  /** Smaller title + taller hero — matches About Us live (36px / ~580px) */
  compact?: boolean;
  /** Body-paragraph subtitle (14px) instead of short tagline — used on Referral */
  bodySubtitle?: boolean;
  /**
   * Contact Us hero: base title color var(--color-brand-primary), tagline subtitle (30px capitalize),
   * taller hero. Pass white <span>s inside title for mixed coloring.
   */
  greenTitle?: boolean;
  /** Large 60px title with bikes — Privacy / Consent / Certified Mechanics */
  largeTitle?: boolean;
  /** 70px title — Blog / Newsroom live */
  bigTitle?: boolean;
  /** Extra-large 86px title — Financing Partners live */
  xlTitle?: boolean;
};

export default function PageHero({
  title,
  subtitle,
  breadcrumb,
  withBikes,
  backgroundSrc = "/assets/images/newsroom/newsroom-hero-bg.jpg",
  bikesSrc,
  compact,
  bodySubtitle,
  greenTitle,
  largeTitle,
  bigTitle,
  xlTitle,
}: PageHeroProps) {
  return (
    <section
      className={`relative flex overflow-hidden ${
        compact
          ? "min-h-[420px] items-start pt-8 lg:min-h-[580px] lg:pt-12"
          : greenTitle
            ? "min-h-[480px] items-center lg:min-h-[640px]"
            : bodySubtitle
              ? "min-h-[460px] items-center lg:min-h-[518px]"
              : xlTitle || largeTitle || bigTitle
                ? "min-h-[420px] items-center lg:min-h-[518px]"
                : "h-[420px] items-center lg:h-[510px]"
      }`}
    >
      <Image
        src={backgroundSrc}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-bg-inverse/20" />

      <div
        className={`relative z-10 mx-auto w-full max-w-container px-4 sm:px-6 ${
          compact ? "py-6 lg:py-4" : "py-10 lg:py-12"
        }`}
      >
        {withBikes ? (
          <div
            className={`relative flex ${
              compact
                ? "min-h-[400px] items-start lg:min-h-[520px]"
                : "items-center justify-between gap-6"
            }`}
          >
            <div
              className={
                compact
                  ? "relative z-10 w-full max-w-[725px] text-center lg:translate-y-12 lg:text-left"
                  : xlTitle || largeTitle || bigTitle
                    ? "mx-auto max-w-[640px] text-center lg:mx-0 lg:text-left"
                    : greenTitle || bodySubtitle
                      ? "mx-auto max-w-[560px] text-center lg:mx-0 lg:text-left"
                      : "mx-auto max-w-[520px] text-center lg:mx-0 lg:text-left"
              }
            >
              <h1
                className={
                  compact
                    ? "font-montserrat text-center text-[26px] font-bold uppercase leading-[38px] text-text-inverse sm:text-[32px] sm:leading-[46px] lg:text-left lg:text-[36px] lg:leading-[48px]"
                    : xlTitle
                      ? "font-montserrat text-center text-[36px] font-bold uppercase leading-[1.05] text-text-inverse sm:text-[56px] sm:leading-[1] lg:text-left lg:text-[86px] lg:leading-[81px]"
                      : bigTitle
                        ? "font-montserrat text-center text-[36px] font-bold uppercase leading-[1.05] text-text-inverse sm:text-[52px] sm:leading-[1] lg:text-left lg:text-[70px] lg:leading-[70px]"
                      : largeTitle
                        ? "font-montserrat text-center text-[32px] font-bold uppercase leading-tight text-text-inverse sm:text-[46px] lg:text-left lg:text-[60px] lg:leading-[60px]"
                        : greenTitle
                          ? "font-montserrat text-center text-[28px] font-bold uppercase leading-[36px] text-brand-primary sm:text-[34px] sm:leading-[44px] lg:text-left lg:text-[40px] lg:leading-[52px]"
                          : bodySubtitle
                            ? "font-montserrat text-center text-[24px] font-bold uppercase leading-[32px] text-text-inverse sm:text-[28px] sm:leading-[36px] lg:text-left lg:text-[32px] lg:leading-[42px]"
                            : "font-montserrat text-center text-[28px] font-bold uppercase leading-[1.15] text-text-inverse sm:text-[36px] lg:text-left lg:text-[45px] lg:leading-[57px]"
                }
              >
                {title}
              </h1>
              {subtitle && (
                <p
                  className={
                    greenTitle
                      ? "font-roboto mt-3 text-center text-[22px] font-medium capitalize leading-[28px] text-text-inverse sm:mt-4 sm:text-[30px] sm:leading-[30px] lg:text-left"
                      : bodySubtitle
                        ? "font-roboto mx-auto mt-3 max-w-[536px] text-center text-[14px] font-normal leading-[22px] text-text-inverse sm:mt-4 sm:text-[16px] sm:leading-[25px] lg:mx-0 lg:text-left"
                        : "font-roboto mt-4 text-center text-[18px] font-medium leading-[25px] text-text-inverse sm:text-[23px] lg:text-left"
                  }
                >
                  {subtitle}
                </p>
              )}
              <div
                className={`font-roboto flex items-center justify-center gap-2 text-text-inverse lg:justify-start ${
                  compact
                    ? "mt-3 text-[18px] sm:text-[22px] lg:mt-[20px] lg:text-[27px]"
                    : xlTitle || largeTitle || bigTitle
                      ? "mt-5 text-[18px] sm:text-[21px]"
                      : greenTitle || bodySubtitle
                        ? "mt-4 text-[18px] sm:text-[21px]"
                        : "mt-4 text-[18px] sm:text-[21px]"
                }`}
              >
                <Link href="/" className="transition-colors hover:text-brand-primary">
                  Home
                </Link>
                <span className="text-text-inverse/70">|</span>
                <span>{breadcrumb}</span>
              </div>
            </div>

            {/* About Us: bikes sit lower-right so title clears the wheels */}
            {compact ? (
              <div className="pointer-events-none absolute bottom-6 right-0 hidden h-[380px] w-[520px]  xl:h-[460px] xl:w-[660px] lg:block">
                {bikesSrc ? (
                  <FadeIn variant="fadeIn" speed="slow" className="absolute inset-0" immediate>
                    <Image
                      src={bikesSrc}
                      alt="ELFA electric bikes"
                      fill
                      className="object-contain object-right-bottom"
                      sizes="700px"
                      priority
                    />
                  </FadeIn>
                ) : null}
              </div>
            ) : (
              <div
                className={`relative hidden shrink-0 lg:block ${
                  bodySubtitle || greenTitle
                    ? "h-[360px] w-[480px] xl:h-[400px] xl:w-[560px]"
                    : xlTitle || largeTitle
                      ? "h-[400px] w-[560px] xl:h-[450px] xl:w-[620px]"
                      : "h-[410px] w-[520px] xl:w-[592px]"
                }`}
              >
                {bikesSrc ? (
                  <FadeIn variant="fadeIn" speed="slow" className="absolute inset-0" immediate>
                    <Image
                      src={bikesSrc}
                      alt="ELFA electric bikes"
                      fill
                      className="object-contain object-right-bottom"
                      sizes="679px"
                      priority
                    />
                  </FadeIn>
                ) : (
                  <>
                    <div className="absolute bottom-0 right-24 h-[320px] w-[360px]">
                      <Image
                        src="/assets/images/ev125-hero.webp"
                        alt="ELFA EV-125"
                        fill
                        className="object-contain object-bottom"
                        sizes="360px"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 h-[260px] w-[240px]">
                      <Image
                        src="/assets/images/scooty-silver.png"
                        alt="ELFA EV-1 Scooty"
                        fill
                        className="object-contain object-bottom"
                        sizes="240px"
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <>
            <h1 className="font-montserrat mx-auto max-w-[820px] text-center text-[32px] font-bold uppercase leading-tight text-text-inverse sm:text-[46px] lg:mx-0 lg:text-left lg:text-[60px]">
              {title}
            </h1>
            {subtitle && (
              <p className="font-roboto mx-auto mt-4 max-w-[640px] text-center text-[16px] leading-relaxed text-text-inverse/85 lg:mx-0 lg:text-left">
                {subtitle}
              </p>
            )}
            <div className="mt-5 flex items-center justify-center gap-2 text-[16px] text-text-inverse lg:justify-start">
              <Link href="/" className="transition-colors hover:text-brand-primary">
                Home
              </Link>
              <span className="text-text-inverse/70">|</span>
              <span>{breadcrumb}</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
