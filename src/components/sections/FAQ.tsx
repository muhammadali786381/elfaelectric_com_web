"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import Link from "next/link";

const faqs = [
  {
    q: "How do I maintain my EV bike?",
    a: "Maintaining an EV bike is simple and hassle-free. Keep your bike clean, ensure the battery is charged, and avoid exposing it to wet areas while charging. Unlike traditional engine bikes, EV bikes have fewer moving parts and require minimal care. Just check tyre pressure, brake condition, and battery health periodically.",
  },
  {
    q: "How long is the battery warranty?",
    a: "The battery warranty for ELFA electric bikes is 3 years or 50,000 KM, whichever comes first. This applies to issues specified in the warranty booklet. Any breach of regulations not covered under warranty terms will not be eligible for coverage.",
  },
  {
    q: "How long do I need to charge my electric bike?",
    a: "Our EV-125 has a 72V/30Ah battery, requiring approximately 2 units of electricity for a full charge. Using the company-provided charger, it charges fully in just 2–3 hours.",
  },
  {
    q: "Is driving an EV bike easy?",
    a: "Yes — no gear or clutch to manage. Our electric bike offers three speed modes: Eco, City, and Sports, switchable with a single button. Anyone comfortable on a regular bike will feel right at home.",
  },
  {
    q: "What are the key features of the EV-1 Scooty?",
    a: "The EV-1 features a 1,500W motor, 64V/30Ah lithium-ion battery, tubeless tyres, alloy rims, digital meter, reverse mode, and an 8A fast charger — engineered for every local road.",
  },
  {
    q: "What is the range on a single charge?",
    a: "The EV-125 offers 100+ km and the EV-1 Scooty delivers 70–80 km per charge, depending on riding mode, rider weight, and terrain conditions.",
  },
  {
    q: "Is the bike water resistant?",
    a: "Both models are water-resistant and handle light rain and wet roads with confidence. We recommend avoiding full submersion of the bike or battery in standing water.",
  },
  {
    q: "How can I book a test ride?",
    a: "Visit the 'Book a Test Ride' page on our website or contact your nearest ELFA dealer. Test rides are free, no commitment required.",
  },
  {
    q: "What financing options are available?",
    a: "ELFA offers flexible installment plans through multiple financing partners. You can explore plans on our Installment Plans page or speak to a dealer for personalised options.",
  },
];

function AccordionItem({
  faq,
  open,
  onToggle,
  index,
}: {
  faq: { q: string; a: string };
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div className="border-b border-white/[0.08]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-brand-primary"
      >
        <span
          className={`font-roboto text-[15px] font-medium leading-snug transition-colors duration-200 sm:text-[16px] ${
            open ? "text-brand-primary" : "text-white/80 group-hover:text-brand-primary"
          }`}
        >
          {faq.q}
        </span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            open
              ? "border-brand-primary bg-brand-primary text-bg-primary"
              : "border-white/20 text-white/50 group-hover:border-brand-primary/50 group-hover:text-brand-primary"
          }`}
        >
          {open ? (
            <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
          ) : (
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="font-roboto pb-5 pr-10 text-[14px] leading-relaxed text-white/45 sm:text-[15px]">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section id="faq" className="bg-bg-primary py-20 lg:py-28">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6">

        {/* Split layout: left editorial col + right accordion */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">

          {/* ── Left: editorial headline block ── */}
          <FadeIn variant="fadeInLeft" speed="slow">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="font-roboto mb-4 text-[11px] font-semibold uppercase tracking-[2.5px] text-brand-primary">
                Got Questions?
              </p>
              <h2 className="font-montserrat mb-5 text-[40px] font-black leading-[0.95] tracking-tight text-white sm:text-[52px] lg:text-[64px]">
                Frequently
                <br />
                <span className="text-brand-primary">Asked.</span>
              </h2>
              <p className="font-roboto mb-8 max-w-[360px] text-[14px] leading-relaxed text-white/40 sm:text-[15px]">
                Everything you need to know about ordering, charging, warranty, and owning your ELFA electric bike.
              </p>
              <Link
                href="/contact-us"
                className="font-roboto group inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 text-[12px] font-semibold uppercase tracking-[1.5px] text-white/50 transition-all hover:border-brand-primary/40 hover:bg-brand-primary/10 hover:text-brand-primary"
              >
                Still have questions?
                <span className="text-brand-primary/60 transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </FadeIn>

          {/* ── Right: accordion list ── */}
          <FadeIn variant="fadeInRight" speed="slow">
            <div className="border-t border-white/[0.08]">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  index={i}
                  faq={faq}
                  open={open === i}
                  onToggle={() => toggle(i)}
                />
              ))}
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
