import type { Metadata } from "next";
import Image from "next/image";
import Marquee from "@/components/sections/Marquee";
import { FadeIn } from "@/components/motion/FadeIn";
import JoinRevolutionCTA from "@/components/sections/JoinRevolutionCTA";
import styles from "./CoreValues.module.css";

export const metadata: Metadata = {
  title: "About ELFA Electric – Leading Electric Bike Pakistan",
  description:
    "ELFA Electric, born under EV Technologies at Wavetec, builds sustainable, affordable electric motorcycles engineered for Pakistan's roads.",
};

const whyChoose = [
  "Best electric bike company in Pakistan with a legacy of 30+ years.",
  "Affordable electric bike options starting at PKR 1/km running cost.",
  "Eco-friendly transport in Pakistan with zero emissions.",
  "EV motorcycle in Pakistan designed for local roads and rider needs.",
  "Sustainable mobility in Pakistan through innovative technology.",
  "Electric scooty in Pakistan for urban commuting.",
  "Comprehensive after-sales support for all electric bikes.",
];

const coreValues = [
  {
    title: "Sustainable Innovation",
    desc: "We never stop evolving. Through continuous learning and experimentation, we deliver smart, sustainable solutions that adapt quickly to changing needs and emerging technologies.",
    img: "/assets/images/about/aboutassets/core3.jpeg",
  },
  {
    title: "Unwavering Trust",
    desc: "Trust is our foundation. Built on honesty, integrity, and reliability, we promise performance you can count on.",
    img: "/assets/images/about/aboutassets/core2.jpeg",
  },
  {
    title: "Customer Obsession",
    desc: "Your journey drives us. We listen closely, understand your needs, and design solutions that fit seamlessly into your life.",
    img: "/assets/images/about/aboutassets/core1.jpeg",
  },
  {
    title: "Equitable Progress",
    desc: "We believe progress must be for everyone. That’s why we engineer accessible, fair, and simple solutions that empower people to move forward toward a better future.",
    img: "/assets/images/about/aboutassets/core4.jpeg",
  },
];

export default function AboutUsPage() {
  return (
    <>
      <main className="flex-1 bg-bg-primary">
        {/* HERO: Cinematic & Minimal */}
        <section className="relative min-h-[46dvh] lg:min-h-[52dvh] w-full flex items-center justify-center pt-28 pb-12 lg:pt-28">
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/images/about/team2.jpeg"
              alt="ELFA Team"
              fill
              priority
              className="object-cover opacity-40 mix-blend-luminosity grayscale"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/80 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-[1400px] px-6 text-center">
            <FadeIn variant="fadeInUp" speed="slow">
              <p className="font-roboto mb-6 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-primary">
                About ELFA Electric
              </p>
              <h1 className="font-montserrat text-[48px] sm:text-[64px] lg:text-[80px] font-black uppercase italic leading-[1.1] tracking-tighter text-white drop-shadow-2xl xl:whitespace-nowrap">
                Engineering The Future.
              </h1>
            </FadeIn>
          </div>
        </section>

        {/* WHO WE ARE - STICKY SCROLL LAYOUT */}
        <section className="relative w-full px-6 py-12 sm:py-16 max-w-[1200px] mx-auto border-t border-white/5">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <FadeIn variant="fadeInLeft" speed="slow">
                <h2 className="font-montserrat text-[40px] sm:text-[52px] lg:text-[56px] font-black uppercase italic leading-[1.1] tracking-tighter text-white">
                  Driven By <br className="hidden lg:block" />
                  <span className="text-brand-primary">Purpose</span>
                </h2>
                <p className="mt-4 font-roboto text-[12px] text-white/50 uppercase tracking-widest font-bold">
                  Welcome to ELFA
                </p>
              </FadeIn>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-6">
              <FadeIn
                variant="fadeInUp"
                speed="slow"
                className="text-[17px] sm:text-[20px] font-roboto leading-relaxed text-white/60"
              >
                <span className="text-white font-medium">ELFA Electric</span>, born under EV
                Technologies at Wavetec, is driven by a passion for building an electric future with
                sustainable, affordable, and innovative solutions powered by clean technology.
              </FadeIn>
              <FadeIn
                variant="fadeInUp"
                speed="slow"
                className="text-[17px] sm:text-[20px] font-roboto leading-relaxed text-white/60"
              >
                At ELFA Electric, we believe that every person and every detail matters. Our electric
                motorcycles are meticulously designed, engineered, and rigorously tested for the
                local rider, using top-quality components.
              </FadeIn>
              <FadeIn
                variant="fadeInUp"
                speed="slow"
                className="text-[17px] sm:text-[20px] font-roboto leading-relaxed text-white/60"
              >
                We have studied driving patterns, road conditions, and the needs of different types
                of riders to determine the optimal specifications. This customer-centric approach is
                backed by EV Technologies expertise and Wavetec&apos;s 30-year legacy of R&amp;D.
              </FadeIn>

              <FadeIn
                variant="fadeInUp"
                speed="slow"
                className="relative aspect-[16/9] w-full max-w-xl rounded-2xl overflow-hidden mt-2 grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10"
              >
                <Image
                  src="/assets/images/about/aboutassets/firstimage.JPG"
                  alt="Engineering"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Mission and vision share one reading line and type scale. */}
        <section className="relative w-full border-t border-white/5 bg-[#050505] py-12 sm:py-16">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 md:grid-cols-2 md:gap-12">
            <FadeIn variant="fadeInUp" speed="normal">
              <h2 className="font-montserrat mb-4 text-[22px] font-bold leading-tight text-white sm:text-[24px]">
                Our Vision
              </h2>
              <p className="font-montserrat max-w-xl text-[24px] font-medium leading-[1.4] tracking-tight text-white/80 lg:text-[28px]">
                Enable equitable progress through{' '}
                <span className="font-semibold text-brand-primary">sustainable mobility.</span>
              </p>
            </FadeIn>
            <FadeIn variant="fadeInUp" speed="normal" className="border-t border-white/10 pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-12">
              <h2 className="font-montserrat mb-4 text-[22px] font-bold leading-tight text-white sm:text-[24px]">
                Our Mission
              </h2>
              <p className="font-montserrat max-w-xl text-[24px] font-medium leading-[1.4] tracking-tight text-white/80 lg:text-[28px]">
                Deliver accessible, smart, and reliable electric solutions that fuel{' '}
                <span className="font-semibold text-brand-primary">everyday productivity</span>{' '}
                for everyone.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* CORE VALUES - IMMERSIVE OVERLAY LIST */}
        <section className="relative w-full py-12 sm:py-16 border-t border-white/5 bg-bg-primary">
          <div className="max-w-[1200px] mx-auto px-6">
            <FadeIn variant="fadeInUp" speed="slow" className="mb-8">
              <p className="font-roboto mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-primary">
                Philosophy
              </p>
              <h2 className="font-montserrat text-[32px] sm:text-[44px] font-black uppercase italic leading-none tracking-tighter text-white">
                Core Values
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, i) => (
                <FadeIn
                  key={i}
                  variant="fadeInUp"
                  delay={i * 0.1}
                  speed="slow"
                  tabIndex={0}
                  className={`${styles.card} group relative h-[360px] sm:h-[400px] rounded-2xl overflow-hidden cursor-pointer border border-white/5 bg-[#080808] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-primary`}
                >
                  <Image
                    src={value.img}
                    alt={value.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/55 to-[#050505]/15 transition-colors duration-500 group-hover:from-[#050505] group-hover:via-[#050505]/75 group-hover:to-[#050505]/45" />
                  <div className={styles.content}>
                    <h4 className="min-h-[60px] font-montserrat text-[20px] lg:text-[18px] xl:text-[20px] font-bold uppercase italic leading-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.85)]">
                      {value.title}
                    </h4>
                    <p className={`${styles.description} pt-3 font-roboto text-[14px] leading-relaxed text-white/90 [text-shadow:0_2px_14px_rgba(0,0,0,0.9)]`}>
                      {value.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US - MINIMALIST SPLIT */}
        <section className="relative w-full py-12 sm:py-16 border-t border-white/5 bg-[#050505] overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <FadeIn
              variant="fadeInUp"
              speed="slow"
              className="order-2 lg:order-1 relative h-[320px] lg:h-[440px] w-full"
            >
              {/* Using EV-125-BIKE-1.png which has a transparent background for a sleek product showcase */}
              <Image
                src="/assets/images/contact/EV-125-BIKE-1.png"
                alt="ELFA EV-125"
                fill
                className="object-contain lg:scale-100 "
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeIn>
            <div className="order-1 lg:order-2">
              <FadeIn variant="fadeInUp" speed="slow">
                <p className="font-roboto mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-primary">
                  The Edge
                </p>
                <h2 className="font-montserrat text-[32px] sm:text-[40px] lg:text-[44px] font-black uppercase italic leading-[1.1] tracking-tighter text-white mb-6">
                  The ELFA <br /> <span className="text-brand-primary">Advantage</span>
                </h2>
                <ul className="space-y-4">
                  {whyChoose.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-4 items-start font-roboto text-[15px] sm:text-[16px] text-white/70"
                    >
                      <span className="text-brand-primary font-black mt-0.5">
                        0{i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA */}
        <JoinRevolutionCTA />

      </main>
    </>
  );
}
