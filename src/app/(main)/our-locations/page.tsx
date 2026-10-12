import type { Metadata } from "next";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import SecondaryHero from "@/components/sections/SecondaryHero";

import { FadeIn } from "@/components/motion/FadeIn";
import DealersDirectory from "./DealersDirectory";
import JoinRevolutionCTA from "@/components/sections/JoinRevolutionCTA";
export const metadata: Metadata = {
  title: "ELFA Electric Dealers | Authorized Showrooms in Pakistan",
  description:
    "Find authorized ELFA Electric dealers across Karachi, Hyderabad, Lahore, Rahim Yar Khan, and Rawalpindi. Book a test ride or visit a showroom near you.",
};


const whyItems = [
  "Complete instruction on electric bikes and electric scooters.",
  "Free test rides for all models.",
  "After-sales support and maintenance services.",
];

/**
 * Animations: opacity + px translate only.
 * FadeIn IS the card (same classes) — no size/spacing changes.
 */
export default function OurDealersPage() {
  return (
    <>
      <main className="flex-1">
        {/* Custom Locations Hero */}
        <section className="relative flex min-h-[55dvh] items-end justify-center overflow-hidden pb-16 pt-32 lg:min-h-[60dvh] lg:pb-24 lg:pt-40">
          <Image
            src="/assets/images/hero4.jpeg"
            alt="ELFA Electric Motorcycle"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/60 to-[#050505]" />

          <div className="relative z-10 w-full max-w-[1200px] px-4 text-center sm:px-6 lg:px-8 mt-10">
            <FadeIn variant="fadeInUp" speed="slow">
              <h1 className="font-montserrat mb-4 text-[56px] font-black italic uppercase leading-[0.9] tracking-tighter text-white sm:text-[72px] lg:text-[92px]">
                Our <span className="text-brand-primary">Locations</span>
              </h1>
              <p className="font-roboto mx-auto max-w-2xl text-[16px] font-medium leading-relaxed text-white/70 sm:text-[20px]">
                Find your nearest locations across Pakistan
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Bike from left · card from right */}
        <section className="bg-bg-primary pt-6 pb-10 lg:pt-8 lg:pb-14">
          <div className="mx-auto grid w-full max-w-container items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10">
            <FadeIn
              variant="fadeInRight"
              speed="slow"
              className="order-1 flex flex-col justify-center py-8 lg:order-2 lg:pl-10"
            >
              <h2 className="font-montserrat mb-4 text-[28px] font-black italic uppercase leading-none tracking-tight text-white sm:mb-6 sm:text-[40px] lg:text-[48px]">
                Looking for ELFA Electric dealers in Pakistan?
              </h2>
              <p className="font-roboto text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
                Our authorized dealers across Karachi, Hyderabad, Lahore, and other cities offer
                electric bikes, electric scooty, and expert support. Whether you want to buy an
                electric bike, schedule a test ride, or become an ELFA dealer, we have got you
                covered.
              </p>
            </FadeIn>
            <FadeIn
              variant="fadeInLeft"
              speed="slow"
              className="relative order-2 mx-auto aspect-square w-full max-w-[360px] sm:max-w-[480px] lg:order-1"
            >
              <Image
                src="/assets/images/dealers/red-bike.png"
                alt="ELFA EV-125 red electric motorcycle"
                fill
                className="object-contain"
                sizes="480px"
              />
            </FadeIn>
          </div>
        </section>

        {/* Card + scooty both from left */}
        <section className="bg-bg-primary pb-10 lg:pb-14">
          <div className="mx-auto grid w-full max-w-container items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10">
            <FadeIn
              variant="fadeInLeft"
              speed="slow"
              className="order-1 flex flex-col justify-center py-8 lg:pr-10"
            >
              <h2 className="font-montserrat mb-4 text-[28px] font-black italic uppercase leading-none tracking-tight text-white sm:mb-6 sm:text-[40px] lg:text-[48px]">
                Why Buy From Authorized ELFA Electric Motorcycle Dealers?
              </h2>
              <p className="font-roboto mb-6 text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
                When you choose ELFA Electric Motorcycle dealers in Pakistan, you get:
              </p>
              <ul className="flex flex-col gap-2.5">
                {whyItems.map((item) => (
                  <li
                    key={item}
                    className="font-roboto flex items-start gap-3 text-[16px] font-medium text-white sm:text-[18px]"
                  >
                    <ChevronRight
                      className="mt-1 h-5 w-5 shrink-0 text-brand-primary"
                      strokeWidth={3}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-roboto mt-8 text-[16px] font-medium leading-relaxed text-brand-primary sm:text-[18px]">
                Visit your nearest EV bike showroom in Pakistan for the complete experience!
              </p>
            </FadeIn>
            <FadeIn
              variant="fadeInLeft"
              speed="slow"
              delay={0.12}
              className="relative order-2 mx-auto aspect-square w-full max-w-[360px] sm:max-w-[480px]"
            >
              <Image
                src="/assets/images/contact/new-bike-scooty.png"
                alt="ELFA EV-125 and EV-1 scooty"
                fill
                className="object-contain"
                sizes="480px"
              />
            </FadeIn>
          </div>
        </section>

        <DealersDirectory />

        <JoinRevolutionCTA
          title={<>Contact Our <br className="hidden sm:block" /> Support Team</>}
          subtitle="Apply online to become an ELFA dealer today!"
          primaryButtonText="Apply Online"
          primaryModal="dealership"
          secondaryButtonText=""
        />


      </main>
    </>
  );
}
