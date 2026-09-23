"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

// Questions & answers scraped directly from elfaelectric.com
const faqs = [
  {
    q: "How do I maintain my EV bike?",
    a: "Maintaining an EV bike is simple and hassle-free. Keep your bike clean, ensure the battery is charged, and avoid exposing it to wet areas while charging. Unlike traditional engine bikes that need regular maintenance of the engine, brakes, clutch, and gears, EV bikes have fewer moving parts and require minimal care. Just check your tyre pressure, brake condition, and battery health periodically to ensure optimal performance and a smooth ride. If you have any questions or need assistance, feel free to call our customer service center.",
  },
  {
    q: "How long is the battery warranty?",
    a: "The battery warranty for ELFA electric bikes in Pakistan is 3 years or 50,000 KM, whichever comes first. This warranty applies to issues specified by the company in the warranty booklet. Any breach of the regulations not covered under the warranty terms will not be eligible for coverage.",
  },
  {
    q: "How long do I need to charge my electric bike?",
    a: "Our current EV-125 variant has a battery capacity of 72V/30Ah, which requires approximately 2 units of electricity to fully charge. It can be charged in 2–3 hours using a company-provided charging plug, giving you a full charge without any hassle.",
  },
  {
    q: "Is driving an EV bike easy?",
    a: "Yes, riding an EV bike is really easy, as it doesn't have a gear or clutch to adjust whenever you change speeds. Our electric bike offers three speed modes — Eco, City, and Sports — that you can switch between with the push of a button.",
  },
  {
    q: "What are the key features of your electric scooty?",
    a: "Our EV-1 Scooty features a powerful electric motor of 1,500W, a long-lasting lithium-ion battery with a capacity of 64V/30Ah, tubeless tyres, front and rear alloy rims, a digital meter, reverse mode, and a convenient 8A fast charger. It is designed for comfort and reliability on every local road.",
  },
  {
    q: "What is the charging time for the scooty?",
    a: "Using the standard charger included with your purchase, charging the battery from 0% to 100% takes approximately 03 hours.",
  },
  {
    q: "What is the range of electric scooty on a single charge?",
    a: "The range of our electric scooty is approximately 70–80 Km, depending on riding mode, weight on the scooty, and terrain.",
  },
  {
    q: "Is the electric scooty water resistance?",
    a: "Our electric scooty is water-resistant and designed to handle light rain and wet conditions, but we recommend avoiding submerging the bike or battery in water.",
  },
  {
    q: "Is the electric EV 125 water resistance?",
    a: "Our electric EV 125 is water-resistant and designed to handle light rain and wet conditions, but we recommend avoiding submerging the bike or battery in water.",
  },
];

// Split into 2 columns matching the reference site's 5-left / 4-right layout
const col1 = faqs.filter((_, i) => i % 2 === 0); // indices 0,2,4,6,8
const col2 = faqs.filter((_, i) => i % 2 === 1); // indices 1,3,5,7

function AccordionItem({
  faq,
  open,
  onToggle,
}: {
  faq: { q: string; a: string };
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-[10px]" style={{ background: "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)" }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        {/* Live site: underline by default, none on hover */}
        <span className="font-montserrat text-[15px] font-semibold leading-snug text-white underline decoration-white/80 underline-offset-4 transition-all group-hover:no-underline sm:text-[16px] lg:text-[18px]">
          {faq.q}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-white transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          strokeWidth={2.5}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        {/* Live site answer panel: white bg + dark text */}
        <div className="bg-white px-5 py-4 sm:px-6 sm:py-5">
          <p className="font-roboto text-[14px] leading-relaxed text-[#333333] sm:text-[15px]">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section id="faq" className="bg-white py-16 lg:py-20">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6">
        <FadeIn variant="fadeInUp" speed="slow">
          <h2 className="font-montserrat mb-10 text-center text-[32px] font-bold text-[#212121] sm:text-[38px] lg:text-[44px]">
            Frequently Asked Questions
          </h2>
        </FadeIn>

        {/* 2-column grid matching the reference site layout */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {/* Left column */}
          <div className="flex flex-col gap-3">
            {col1.map((faq) => {
              const globalIdx = faqs.indexOf(faq);
              return (
                <AccordionItem
                  key={globalIdx}
                  faq={faq}
                  open={open === globalIdx}
                  onToggle={() => toggle(globalIdx)}
                />
              );
            })}
          </div>
          {/* Right column */}
          <div className="flex flex-col gap-3">
            {col2.map((faq) => {
              const globalIdx = faqs.indexOf(faq);
              return (
                <AccordionItem
                  key={globalIdx}
                  faq={faq}
                  open={open === globalIdx}
                  onToggle={() => toggle(globalIdx)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
