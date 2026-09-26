import type { Metadata } from "next";
import Image from "next/image";
import Marquee from "@/components/sections/Marquee";
import { FadeIn } from "@/components/motion/FadeIn";
import JoinRevolutionCTA from "@/components/sections/JoinRevolutionCTA";

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
    img: "/assets/images/about/engineering.jpeg",
  },
  {
    title: "Unwavering Trust",
    desc: "Trust is our foundation. Built on honesty, integrity, and reliability, we promise performance you can count on.",
    img: "/assets/images/about/team7.jpeg",
  },
  {
    title: "Customer Obsession",
    desc: "Your journey drives us. We listen closely, understand your needs, and design solutions that fit seamlessly into your life.",
    img: "/assets/images/about/people3.jpeg",
  },
  {
    title: "Equitable Progress",
    desc: "We believe progress must be for everyone. That’s why we engineer accessible, fair, and simple solutions that empower people to move forward toward a better future.",
    img: "/assets/images/about/people6.jpeg",
  },
];

export default function AboutUsPage() {
  return (
    <>
            <main className="flex-1 bg-bg-primary overflow-hidden">
        {/* HERO: Cinematic & Minimal */}
        <section className="relative min-h-[60dvh] lg:min-h-[70dvh] w-full flex items-center justify-center pt-28 pb-20 lg:pt-32">
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
              <h1 className="font-montserrat text-[48px] sm:text-[64px] lg:text-[80px] font-black uppercase italic leading-[0.9] tracking-tighter text-white drop-shadow-2xl">
                Engineering <br className="hidden sm:block" /> The Future.
              </h1>
            </FadeIn>
          </div>
        </section>

        {/* WHO WE ARE - STICKY SCROLL LAYOUT */}
        <section className="relative w-full px-6 py-24 sm:py-32 max-w-[1400px] mx-auto border-t border-white/5">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <FadeIn variant="fadeInLeft" speed="slow">
                <h2 className="font-montserrat text-[40px] sm:text-[64px] font-black uppercase italic leading-[0.9] tracking-tighter text-white">
                  Driven By <br className="hidden lg:block" />
                  <span className="text-brand-primary">Purpose</span>
                </h2>
                <p className="mt-8 font-roboto text-[12px] text-white/50 uppercase tracking-widest font-bold">
                  Welcome to ELFA
                </p>
              </FadeIn>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-12 sm:gap-20">
              <FadeIn
                variant="fadeInUp"
                speed="slow"
                className="text-[20px] sm:text-[32px] font-roboto leading-snug text-white/60"
              >
                <span className="text-white font-medium">ELFA Electric</span>, born under EV
                Technologies at Wavetec, is driven by a passion for building an electric future with
                sustainable, affordable, and innovative solutions powered by clean technology.
              </FadeIn>
              <FadeIn
                variant="fadeInUp"
                speed="slow"
                className="text-[20px] sm:text-[32px] font-roboto leading-snug text-white/60"
              >
                At ELFA Electric, we believe that every person and every detail matters. Our electric
                motorcycles are meticulously designed, engineered, and rigorously tested for the
                local rider, using top-quality components.
              </FadeIn>
              <FadeIn
                variant="fadeInUp"
                speed="slow"
                className="text-[20px] sm:text-[32px] font-roboto leading-snug text-white/60"
              >
                We have studied driving patterns, road conditions, and the needs of different types
                of riders to determine the optimal specifications. This customer-centric approach is
                backed by EV Technologies expertise and Wavetec&apos;s 30-year legacy of R&amp;D.
              </FadeIn>

              <FadeIn
                variant="fadeInUp"
                speed="slow"
                className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden mt-8 grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10"
              >
                <Image
                  src="/assets/images/about/engineering.jpeg"
                  alt="Engineering"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* MISSION & VISION - HUGE TYPOGRAPHY */}
        <section className="relative w-full py-32 sm:py-48 border-t border-white/5 bg-[#050505] overflow-hidden">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-primary/5 blur-[120px]" />
          
          <div className="max-w-[1400px] mx-auto px-6 flex flex-col gap-32 relative z-10">
            <FadeIn variant="fadeInUp" speed="slow" className="max-w-5xl">
              <p className="font-roboto mb-8 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-primary/80">
                Our Vision
              </p>
              <h3 className="font-montserrat text-[32px] sm:text-[64px] font-medium leading-[1.1] tracking-tight text-white">
                Enable equitable progress through <br className="hidden sm:block" />
                <span className="text-brand-primary font-black italic">sustainable mobility.</span>
              </h3>
            </FadeIn>
            <FadeIn variant="fadeInUp" speed="slow" className="max-w-5xl lg:self-end lg:text-right">
              <p className="font-roboto mb-8 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-primary/80">
                Our Mission
              </p>
              <h3 className="font-montserrat text-[32px] sm:text-[64px] font-medium leading-[1.1] tracking-tight text-white">
                Deliver accessible, smart, and reliable electric solutions that fuel{" "}
                <span className="text-brand-primary font-black italic">
                  everyday productivity
                </span>{" "}
                for everyone.
              </h3>
            </FadeIn>
          </div>
        </section>

        {/* CORE VALUES - IMMERSIVE OVERLAY LIST */}
        <section className="relative w-full py-24 sm:py-32 border-t border-white/5 bg-bg-primary">
          <div className="max-w-[1400px] mx-auto px-6">
            <FadeIn variant="fadeInUp" speed="slow" className="mb-20">
              <p className="font-roboto mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-primary">
                Philosophy
              </p>
              <h2 className="font-montserrat text-[40px] sm:text-[80px] font-black uppercase italic leading-none tracking-tighter text-white">
                Core <br /> Values
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, i) => (
                <FadeIn
                  key={i}
                  variant="fadeInUp"
                  delay={i * 0.1}
                  speed="slow"
                  className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer border border-white/5 bg-[#080808]"
                >
                  <Image
                    src={value.img}
                    alt={value.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-40 mix-blend-luminosity grayscale group-hover:grayscale-0"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-60" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h4 className="font-montserrat text-[24px] font-bold uppercase italic leading-tight text-white mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {value.title}
                    </h4>
                    <p className="font-roboto text-[15px] leading-relaxed text-white/60 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      {value.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US - MINIMALIST SPLIT */}
        <section className="relative w-full py-24 sm:py-32 border-t border-white/5 bg-[#050505] overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative h-[500px] lg:h-[700px] w-full">
              {/* Using EV-125-BIKE-1.png which has a transparent background for a sleek product showcase */}
              <Image
                src="/assets/images/contact/EV-125-BIKE-1.png"
                alt="ELFA EV-125"
                fill
                className="object-contain lg:scale-125 transition-transform duration-1000 hover:scale-150"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 lg:order-2">
              <FadeIn variant="fadeInUp" speed="slow">
                <p className="font-roboto mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-primary">
                  The Edge
                </p>
                <h2 className="font-montserrat text-[40px] sm:text-[64px] font-black uppercase italic leading-[0.9] tracking-tighter text-white mb-12">
                  The ELFA <br /> <span className="text-brand-primary">Advantage</span>
                </h2>
                <ul className="space-y-6">
                  {whyChoose.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-6 items-start font-roboto text-[16px] sm:text-[18px] text-white/70"
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
