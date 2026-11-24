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
  { title: "Designed for Local Roads", desc: "Engineered to suit everyday road conditions and riding needs in Pakistan." },
  { title: "Consistent Performance", desc: "Quality components and advanced technology deliver dependable performance for everyday rides." },
  { title: "Affordable Running Costs", desc: "Enjoy economical travel with running costs starting at PKR 1/km." },
  { title: "Everyday Convenience", desc: "Practical features make daily commuting easier and more convenient." },
  { title: "Rider-Focused Design", desc: "Designed around local riding habits and the needs of different riders." },
  { title: "Dedicated After-Sales Support", desc: "Get service and assistance throughout your ownership journey." },
  { title: "Backed by Experience", desc: "Supported by EV Technologies' expertise and Wavetec's 35+ years of R&D experience." },
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
                <span className="text-white font-medium">ELFA</span>, born under EV Technologies at
                Wavetec, is driven by a vision to shape a cleaner electric future through sustainable,
                affordable and innovative solutions powered by clean technology.
              </FadeIn>
              <FadeIn
                variant="fadeInUp"
                speed="slow"
                className="text-[17px] sm:text-[20px] font-roboto leading-relaxed text-white/60"
              >
                At ELFA Electric, we believe every rider and every detail matters. Our electric
                motorcycles are thoughtfully designed, carefully engineered and rigorously tested
                for local riders, using high-quality components.
              </FadeIn>
              <FadeIn
                variant="fadeInUp"
                speed="slow"
                className="text-[17px] sm:text-[20px] font-roboto leading-relaxed text-white/60"
              >
                By understanding local driving patterns, road conditions and the needs of different
                riders, we develop specifications that best suit everyday journeys. This
                customer-focused approach is backed by EV Technologies&apos; expertise and
                Wavetec&apos;s 40-year legacy of research and development.
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

        {/* BUILT AROUND YOUR NEEDS - CIRCULAR ORBITAL FEATURE MAP */}
        <section className="relative w-full py-16 sm:py-20 lg:py-24 border-t border-white/5 bg-[#050505] overflow-hidden">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 relative z-10">
            {/* Centered Heading */}
            <FadeIn variant="fadeInUp" speed="normal" className="text-center mb-10 sm:mb-14">
              <p className="font-roboto mb-3 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.25em] text-brand-primary">
                The Edge
              </p>
              <h2 className="font-montserrat text-[36px] sm:text-[48px] lg:text-[56px] font-black uppercase italic leading-[1.1] tracking-tighter text-white">
                Built Around <span className="text-brand-primary drop-shadow-[0_0_25px_rgba(0,200,83,0.35)]">Your Needs</span>
              </h2>
            </FadeIn>

            {/* Desktop Proper Circular Layout (lg and above) */}
            <div className="hidden lg:block relative w-full h-[680px] xl:h-[720px] mx-auto">
              {/* Centered Bike with subtle ambient glow (no rings) */}
              <div className="absolute top-[43%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                <div className="absolute w-[340px] h-[340px] rounded-full bg-brand-primary/10 blur-[90px]" />
                <div className="relative w-[340px] xl:w-[410px] h-[320px] xl:h-[370px]">
                  <Image
                    src="/assets/images/contact/EV-125-BIKE-1.png"
                    alt="ELFA EV-125 Electric Motorcycle"
                    fill
                    priority
                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                    sizes="(max-width: 1024px) 100vw, 420px"
                  />
                </div>
              </div>

              {/* 1. Top-Left (Inward on curve) */}
              <FadeIn
                variant="fadeInLeft"
                speed="normal"
                className="absolute top-[4%] left-[7%] xl:left-[9%] max-w-[250px] xl:max-w-[280px]"
              >
                <div className="flex items-start justify-end gap-3 group">
                  <div className="text-right">
                    <h3 className="font-montserrat text-[15px] xl:text-[16px] font-bold text-white group-hover:text-brand-primary transition-colors">
                      {whyChoose[0].title}
                    </h3>
                    <p className="font-roboto text-[13px] leading-relaxed text-white/65 mt-1">
                      {whyChoose[0].desc}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center justify-center shrink-0">
                    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary/40 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary shadow-[0_0_8px_#00c853]" />
                    </span>
                  </div>
                </div>
              </FadeIn>

              {/* 3. Middle-Left (Outward on curve) */}
              <FadeIn
                variant="fadeInLeft"
                delay={0.1}
                speed="normal"
                className="absolute top-[40%] left-[0%] xl:left-[1%] max-w-[250px] xl:max-w-[280px]"
              >
                <div className="flex items-start justify-end gap-3 group">
                  <div className="text-right">
                    <h3 className="font-montserrat text-[15px] xl:text-[16px] font-bold text-white group-hover:text-brand-primary transition-colors">
                      {whyChoose[2].title}
                    </h3>
                    <p className="font-roboto text-[13px] leading-relaxed text-white/65 mt-1">
                      {whyChoose[2].desc}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center justify-center shrink-0">
                    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary/40 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary shadow-[0_0_8px_#00c853]" />
                    </span>
                  </div>
                </div>
              </FadeIn>

              {/* 5. Bottom-Left (Inward on curve) */}
              <FadeIn
                variant="fadeInLeft"
                delay={0.2}
                speed="normal"
                className="absolute bottom-[16%] left-[7%] xl:left-[9%] max-w-[250px] xl:max-w-[280px]"
              >
                <div className="flex items-start justify-end gap-3 group">
                  <div className="text-right">
                    <h3 className="font-montserrat text-[15px] xl:text-[16px] font-bold text-white group-hover:text-brand-primary transition-colors">
                      {whyChoose[4].title}
                    </h3>
                    <p className="font-roboto text-[13px] leading-relaxed text-white/65 mt-1">
                      {whyChoose[4].desc}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center justify-center shrink-0">
                    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary/40 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary shadow-[0_0_8px_#00c853]" />
                    </span>
                  </div>
                </div>
              </FadeIn>

              {/* 2. Top-Right (Inward on curve) */}
              <FadeIn
                variant="fadeInRight"
                speed="normal"
                className="absolute top-[4%] right-[7%] xl:right-[9%] max-w-[250px] xl:max-w-[280px]"
              >
                <div className="flex items-start justify-start gap-3 group">
                  <div className="mt-1 flex items-center justify-center shrink-0">
                    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary/40 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary shadow-[0_0_8px_#00c853]" />
                    </span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-montserrat text-[15px] xl:text-[16px] font-bold text-white group-hover:text-brand-primary transition-colors">
                      {whyChoose[1].title}
                    </h3>
                    <p className="font-roboto text-[13px] leading-relaxed text-white/65 mt-1">
                      {whyChoose[1].desc}
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* 4. Middle-Right (Outward on curve) */}
              <FadeIn
                variant="fadeInRight"
                delay={0.1}
                speed="normal"
                className="absolute top-[40%] right-[0%] xl:right-[1%] max-w-[250px] xl:max-w-[280px]"
              >
                <div className="flex items-start justify-start gap-3 group">
                  <div className="mt-1 flex items-center justify-center shrink-0">
                    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary/40 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary shadow-[0_0_8px_#00c853]" />
                    </span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-montserrat text-[15px] xl:text-[16px] font-bold text-white group-hover:text-brand-primary transition-colors">
                      {whyChoose[3].title}
                    </h3>
                    <p className="font-roboto text-[13px] leading-relaxed text-white/65 mt-1">
                      {whyChoose[3].desc}
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* 6. Bottom-Right (Inward on curve) */}
              <FadeIn
                variant="fadeInRight"
                delay={0.2}
                speed="normal"
                className="absolute bottom-[16%] right-[7%] xl:right-[9%] max-w-[250px] xl:max-w-[280px]"
              >
                <div className="flex items-start justify-start gap-3 group">
                  <div className="mt-1 flex items-center justify-center shrink-0">
                    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary/40 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary shadow-[0_0_8px_#00c853]" />
                    </span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-montserrat text-[15px] xl:text-[16px] font-bold text-white group-hover:text-brand-primary transition-colors">
                      {whyChoose[5].title}
                    </h3>
                    <p className="font-roboto text-[13px] leading-relaxed text-white/65 mt-1">
                      {whyChoose[5].desc}
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* 7. Bottom-Center (Directly underneath the bike) */}
              <FadeIn
                variant="fadeInUp"
                delay={0.3}
                speed="normal"
                className="absolute bottom-[0%] left-1/2 -translate-x-1/2 max-w-[360px] text-center"
              >
                <div className="flex flex-col items-center group">
                  <div className="mb-2 flex items-center justify-center">
                    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary/40 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary shadow-[0_0_8px_#00c853]" />
                    </span>
                  </div>
                  <h3 className="font-montserrat text-[15px] xl:text-[16px] font-bold text-white group-hover:text-brand-primary transition-colors">
                    {whyChoose[6].title}
                  </h3>
                  <p className="font-roboto text-[13px] leading-relaxed text-white/65 mt-1">
                    {whyChoose[6].desc}
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Mobile / Tablet Responsive Layout (< lg) */}
            <div className="lg:hidden flex flex-col items-center">
              {/* Center Bike on Mobile */}
              <div className="relative flex items-center justify-center w-full max-w-[340px] sm:max-w-[400px] h-[280px] sm:h-[320px] mb-8">
                <div className="w-[240px] h-[240px] rounded-full bg-brand-primary/10 blur-[60px] absolute" />
                <Image
                  src="/assets/images/contact/EV-125-BIKE-1.png"
                  alt="ELFA EV-125"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]"
                  sizes="(max-width: 1024px) 90vw, 400px"
                />
              </div>

              {/* 7 Feature Points on mobile/tablet (no cards, no background) */}
              <div className="flex flex-col gap-6 w-full max-w-lg mx-auto sm:grid sm:grid-cols-2 sm:max-w-none sm:gap-6">
                {whyChoose.map((item, index) => (
                  <FadeIn
                    key={item.title}
                    variant="fadeInUp"
                    delay={index * 0.05}
                    speed="normal"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="mt-1.5 flex items-center justify-center shrink-0">
                        <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary/40 opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary shadow-[0_0_8px_#00c853]" />
                        </span>
                      </div>
                      <div>
                        <h3 className="font-montserrat text-[16px] font-bold text-white">
                          {item.title}
                        </h3>
                        <p className="font-roboto text-[14px] leading-relaxed text-white/65 mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <JoinRevolutionCTA />

      </main>
    </>
  );
}
