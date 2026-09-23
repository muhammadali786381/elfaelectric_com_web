import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DealersHero from "@/components/sections/DealersHero";
import Marquee from "@/components/sections/Marquee";
import { FadeIn } from "@/components/motion/FadeIn";
import DealersDirectory from "./DealersDirectory";

export const metadata: Metadata = {
  title: "ELFA Electric Dealers | Authorized Showrooms in Pakistan",
  description:
    "Find authorized ELFA Electric dealers across Karachi, Hyderabad, Lahore, Rahim Yar Khan, and Rawalpindi. Book a test ride or visit a showroom near you.",
};

const SPARK =
  "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)";

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
      <Header />
      <main className="flex-1">
        <DealersHero />

        {/* Bike from left · card from right */}
        <section className="bg-white py-10 lg:py-14">
          <div className="mx-auto grid w-full max-w-container items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10">
            <FadeIn
              variant="fadeInRight"
              speed="slow"
              className="order-1 rounded-[16px] border-2 border-[#61ce70] px-4 py-8 sm:rounded-[20px] sm:px-8 sm:py-20 lg:order-2"
              style={{ backgroundImage: SPARK }}
            >
              <h2 className="font-montserrat mb-3 text-[22px] font-semibold capitalize leading-tight text-white sm:mb-4 sm:text-[32px] sm:leading-[41px]">
                Looking for ELFA Electric dealers in Pakistan?
              </h2>
              <p className="font-roboto text-[14px] leading-relaxed text-white sm:text-[16px]">
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
        <section className="bg-white pb-10 lg:pb-14">
          <div className="mx-auto grid w-full max-w-container items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10">
            <FadeIn
              variant="fadeInLeft"
              speed="slow"
              className="order-1 rounded-[16px] border-2 border-[#61ce70] px-4 py-8 sm:rounded-[20px] sm:px-8 sm:py-16"
              style={{ backgroundImage: SPARK }}
            >
              <h2 className="font-montserrat mb-3 text-[22px] font-semibold capitalize leading-tight text-white sm:mb-4 sm:text-[32px] sm:leading-[41px]">
                Why Buy From Authorized ELFA Electric Motorcycle Dealers?
              </h2>
              <p className="font-roboto mb-4 text-[14px] leading-relaxed text-white sm:text-[16px]">
                When you choose ELFA Electric Motorcycle dealers in Pakistan, you get:
              </p>
              <ul className="flex flex-col gap-2.5">
                {whyItems.map((item) => (
                  <li
                    key={item}
                    className="font-roboto flex items-start gap-2 text-[14px] text-white sm:text-[16px]"
                  >
                    <ChevronRight
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#61ce70]"
                      strokeWidth={2.5}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-roboto mt-5 text-[14px] leading-relaxed text-white sm:text-[16px]">
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

        {/* Apply CTA — spark gradient + fade up */}
        <section className="bg-white py-12 lg:py-16">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <FadeIn
              variant="fadeInUp"
              speed="slow"
              className="rounded-[15px] px-6 py-10 text-center sm:px-10 sm:py-12"
              style={{ backgroundImage: SPARK }}
            >
              <h2 className="font-montserrat mb-3 text-[28px] font-bold text-white sm:text-[36px]">
                Contact Our Dealer Support Team
              </h2>
              <p className="font-roboto mx-auto mb-6 max-w-[560px] text-[15px] text-white sm:text-[16px]">
                Apply online to become an ELFA dealer today!
              </p>
              <Link
                href="/contact-us"
                className="font-roboto inline-flex h-[48px] items-center justify-center rounded-[3px] bg-[#61ce70] px-8 text-[16px] font-semibold uppercase tracking-wide text-[#fcfcfc] transition-colors hover:bg-[#4fbf5f]"
              >
                Apply Online
              </Link>
            </FadeIn>
          </div>
        </section>

        <Marquee />
      </main>
      <Footer />
    </>
  );
}
