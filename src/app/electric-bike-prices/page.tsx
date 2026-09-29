import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Plus, Minus } from "lucide-react";
import SecondaryHero from "@/components/sections/SecondaryHero";
import { FadeIn } from "@/components/motion/FadeIn";
import FlipButton from "@/components/ui/FlipButton";

export const metadata: Metadata = {
  title: "Electric Bike Prices - ELFA Electric",
  description:
    "ELFA Electric bike price list 2026 — EV125 and EV-1 Scooty with transparent pricing, financing options, and no hidden charges in Pakistan.",
};

/** Scraped from https://elfaelectric.com/electric-bike-prices/ */

const priceListNote =
  "All prices include 3-year battery warranty and after-sales support. No hidden charges—just transparent electric bike prices in Pakistan!";

const introCopy =
  "You’re in the right place! ELFA Electric offers affordable electric bikes and electric scooty with transparent pricing, no hidden Charges. Whether you want a high-performance ELFA EV125 or a compact EV-1 Scooty, we’ve got the best EV bike cost Pakistan options for every budget. Explore our electric bike price list below and find your perfect ride!";

const ev125Intro =
  "The ELFA EV125 is Pakistan’s best-selling electric bike. Here’s why it’s worth every rupee:";

const ev125Specs = [
  "Price: PKR 345,000 + Tax",
  "Motor: 2000W (75Km/h top speed)",
  "Range: 100Km per charge",
  "Battery: 72V/30Ah Lithium iron phosphate (LiFePO4) battery",
  "Features: Digital dashboard, app connectivity, tubeless tyres.",
  "At this EV bike cost Pakistan, the EV125 offers unmatched value!",
];

const scootyIntro =
  "The EV-1 Scooty is the most affordable electric scooty in Pakistan:";

const scootySpecs = [
  "Price: PKR 270,000 + Tax",
  "Motor: 1500W (60km/h top speed)",
  "Range: 75Km per charge",
  "Battery: 64V/30Ah Lithium iron phosphate (LiFePO4) battery",
  "Features: LED display, mobile app, water resistant battery.",
  "Perfect for city commuting at an unbeatable electric scooty price Pakistan!",
];

const whyChoose = [
  "Transparent Pricing: No hidden fees—just clear electric bike prices in Pakistan.",
  "Affordable Options: Bikes and scooty for every budget.",
  "Low Running Cost: Travel up to 1 Km in just 1 Rupee",
  "Eco-Friendly: Zero emissions, sustainable transport.",
  "After-Sales Support: 3-year warranty + service centers nationwide.",
];

const financingIntro =
  "Can’t pay upfront? We offer easy financing for ELFA EV 125:";

const financingItems = [
  "Monthly Installments: Starting from PKR 10,500/month.",
  "Our Finance Partners: Asan Ghar, Qist Bazar, Thardeep Microfinance Foundation (TMF), WASL Plan and SOLARIZE",
];

const faqs = [
  {
    q: "How do I book a test ride?",
    a: "Contact ELFA Electric Pakistan via phone, WhatsApp, or visit our electric bike showroom.",
  },
  {
    q: "Do you offer after-sales service?",
    a: "Yes! All our EV bike service centers provide maintenance and support.",
  },
  {
    q: "Can I become an ELFA dealer?",
    a: "Absolutely! Learn more about our dealership program.",
  },
];

function ChevronList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
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
  );
}

export default function ElectricBikePricesPage() {
  return (
    <>
      <main className="flex-1">
        <SecondaryHero
          titleLine1="Electric Bike"
          titleLine2="Prices"
          description="Affordable ELFA electric bike and scooty prices in Pakistan — transparent pricing, no hidden charges."
          imageSrc="/assets/images/hero4.jpeg"
          imageAlt="ELFA Electric Bike Prices"
        />

        {/* Limited offer + price list */}
        <section className="bg-bg-primary py-10 lg:py-14">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <FadeIn variant="fadeInUp" speed="slow" className="text-center">
              <p className="font-montserrat mb-6 inline-block text-[14px] font-bold uppercase tracking-[0.2em] text-brand-primary sm:text-[16px]">
                Limited time offer · Save 10K
              </p>
              <h2 className="font-montserrat mb-8 text-[28px] font-black italic uppercase leading-none tracking-tight text-white sm:mb-10 sm:text-[40px] lg:text-[48px]">
                ELFA Electric Bike Price List 2026
              </h2>
            </FadeIn>

            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
              <FadeIn
                variant="fadeInUp"
                speed="slow"
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <h3 className="font-montserrat mb-4 text-[20px] font-bold text-white">
                  ELFA EV125
                </h3>
                <p className="font-roboto text-[16px] text-white/40 line-through">
                  PKR 345,000
                </p>
                <p className="font-montserrat mt-1 text-[28px] font-black text-brand-primary">
                  PKR 335,000
                  <span className="font-roboto ml-1 text-[14px] font-medium text-white/60">
                    + Tax
                  </span>
                </p>
              </FadeIn>

              <FadeIn
                variant="fadeInUp"
                speed="slow"
                delay={0.08}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <h3 className="font-montserrat mb-4 text-[20px] font-bold text-white">
                  EV-1 Scooty
                </h3>
                <p className="font-roboto text-[16px] text-white/40 line-through">
                  PKR 270,000
                </p>
                <p className="font-montserrat mt-1 text-[28px] font-black text-brand-primary">
                  PKR 260,000
                  <span className="font-roboto ml-1 text-[14px] font-medium text-white/60">
                    + Tax
                  </span>
                </p>
              </FadeIn>
            </div>

            <FadeIn variant="fadeInUp" speed="slow" className="mt-8 text-center">
              <p className="font-roboto mx-auto max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-[16px]">
                {priceListNote}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Intro + image */}
        <section className="bg-bg-primary py-10 lg:py-14">
          <div className="mx-auto grid w-full max-w-container items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10">
            <FadeIn
              variant="fadeInRight"
              speed="slow"
              className="order-1 flex flex-col justify-center py-8 lg:order-2 lg:pl-10"
            >
              <h2 className="font-montserrat mb-4 text-[28px] font-black italic uppercase leading-none tracking-tight text-white sm:mb-6 sm:text-[36px] lg:text-[38px] xl:text-[48px]">
                Looking for the latest electric bike prices in Pakistan?
              </h2>
              <p className="font-roboto text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
                {introCopy}
              </p>
            </FadeIn>
            <FadeIn
              variant="fadeInLeft"
              speed="slow"
              className="relative order-2 mx-auto aspect-[4/3] w-full lg:order-1"
            >
              <Image
                src="/assets/images/electric-bike-prices/hero-bike.png"
                alt="Electric bike prices in Pakistan"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeIn>
          </div>
        </section>

        {/* EV125 */}
        <section className="bg-bg-primary pb-10 lg:pb-14">
          <div className="mx-auto grid w-full max-w-container items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10">
            <FadeIn
              variant="fadeInLeft"
              speed="slow"
              className="order-1 flex flex-col justify-center py-8 lg:pr-10"
            >
              <h2 className="font-montserrat mb-4 text-[28px] font-black italic uppercase leading-none tracking-tight text-white sm:mb-6 sm:text-[36px] lg:text-[38px] xl:text-[48px]">
                ELFA EV125 – Best Electric Bike
              </h2>
              <p className="font-roboto mb-6 text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
                {ev125Intro}
              </p>
              <ChevronList items={ev125Specs} />
            </FadeIn>
            <FadeIn
              variant="fadeInLeft"
              speed="slow"
              delay={0.12}
              className="relative order-2 mx-auto aspect-[4/3] w-full"
            >
              <Image
                src="/assets/images/electric-bike-prices/pricesbike.png"
                alt="ELFA EV125 electric motorcycle"
                fill
                className="object-contain scale-105 lg:scale-105 origin-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeIn>
          </div>
        </section>

        {/* EV-1 Scooty */}
        <section className="bg-bg-primary pb-10 lg:pb-14 overflow-hidden">
          <div className="mx-auto grid w-full max-w-container items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
            <FadeIn
              variant="fadeInRight"
              speed="slow"
              className="relative order-2 lg:order-1 mx-auto aspect-[4/3] w-full lg:col-span-5"
            >
              <Image
                src="/assets/images/electric-bike-prices/pricesscooty.png"
                alt="ELFA EV-1 Scooty"
                fill
                className="object-contain scale-100 lg:scale-[1.12] lg:-translate-y-8 origin-[20%_50%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeIn>
            <FadeIn
              variant="fadeInRight"
              speed="slow"
              delay={0.12}
              className="order-1 lg:order-2 flex flex-col justify-center py-8 lg:pl-10 lg:col-span-7"
            >
              <h2 className="font-montserrat mb-4 text-[28px] font-black italic uppercase leading-none tracking-tight text-white sm:mb-6 sm:text-[36px] lg:text-[38px] xl:text-[44px]">
                EV-1 Scooty – Affordable Electric Scooty Price
              </h2>
              <p className="font-roboto mb-6 text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
                {scootyIntro}
              </p>
              <ChevronList items={scootySpecs} />
            </FadeIn>
          </div>
        </section>

        {/* Why Choose */}
        <section className="bg-bg-primary pb-10 lg:pb-14">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <FadeIn variant="fadeInUp" speed="slow" className="mx-auto max-w-3xl">
              <h2 className="font-montserrat mb-6 text-[28px] font-black italic uppercase leading-none tracking-tight text-white sm:mb-8 sm:text-[40px] lg:text-[48px]">
                Why Choose ELFA Electric Bikes?
              </h2>
              <ChevronList items={whyChoose} />
            </FadeIn>
          </div>
        </section>

        {/* Financing */}
        <section className="bg-bg-primary pb-10 lg:pb-14">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <FadeIn variant="fadeInUp" speed="slow" className="mx-auto max-w-3xl">
              <h2 className="font-montserrat mb-4 text-[28px] font-black italic uppercase leading-none tracking-tight text-white sm:mb-6 sm:text-[40px] lg:text-[48px]">
                Financing Options for Electric Bikes
              </h2>
              <p className="font-roboto mb-6 text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
                {financingIntro}
              </p>
              <ChevronList items={financingItems} />
              <p className="font-roboto mt-8 text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
                To learn more about our financial plans for EV-125, please visit our{" "}
                <Link
                  href="/installment-plans"
                  className="font-medium text-brand-primary underline hover:no-underline"
                >
                  installment plan
                </Link>
                .
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="bg-[#050505] py-20 lg:py-32">
          <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20 items-start">
            <FadeIn variant="fadeInLeft" speed="slow" className="flex flex-col items-start">
              <p className="text-brand-primary font-montserrat text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                Got Questions?
              </p>
              <h2 className="font-montserrat text-[48px] sm:text-[64px] lg:text-[72px] font-black leading-[1] text-white tracking-tighter mb-6">
                Frequently<br />
                <span className="text-brand-primary">Asked.</span>
              </h2>
              <p className="font-roboto text-[15px] leading-relaxed text-white/60 mb-10 max-w-md">
                Find answers to common questions about our electric bike prices, features, and financing options.
              </p>
              <FlipButton
                href="/contact-us"
                variant="glass"
                className="px-6 py-3.5 text-[11px] font-bold tracking-[0.15em] text-white/80"
              >
                Still have questions?
              </FlipButton>
            </FadeIn>

            <FadeIn variant="fadeInRight" speed="slow" className="w-full border-t border-white/10 mt-2">
              {faqs.map((f, i) => (
                <details
                  key={f.q}
                  className="group overflow-hidden border-b border-white/10"
                >
                  <summary className="font-roboto flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-left text-[15px] font-medium text-white/90 sm:text-[16px] [&::-webkit-details-marker]:hidden outline-none">
                    {f.q}
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/50 transition-all group-hover:border-white/40 group-open:bg-brand-primary group-open:border-brand-primary group-open:text-black">
                      <Plus className="h-4 w-4 group-open:hidden" />
                      <Minus className="h-4 w-4 hidden group-open:block" />
                    </div>
                  </summary>
                  <div className="pb-6 pr-12">
                    <div className="font-roboto text-[15px] leading-relaxed text-white/60">{f.a}</div>
                  </div>
                </details>
              ))}
            </FadeIn>
          </div>
        </section>
      </main>
    </>
  );
}
