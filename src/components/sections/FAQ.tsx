"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";

export interface FAQItem {
  q: string;
  a: React.ReactNode;
}

const defaultFaqs: FAQItem[] = [
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

export function AccordionItem({
  faq,
  open,
  onToggle,
  index,
}: {
  faq: FAQItem;
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
          className={`font-roboto text-[15px] font-medium leading-snug transition-colors duration-200 sm:text-[16px] ${open ? "text-brand-primary" : "text-white/80 group-hover:text-brand-primary"
            }`}
        >
          {faq.q}
        </span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${open
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

interface FAQProps {
  items?: FAQItem[];
  title?: React.ReactNode;
  hideTitle?: boolean;
  className?: string;
  defaultOpenIndex?: number | null;
}

export default function FAQ({
  items,
  title,
  hideTitle = false,
  className = "bg-bg-primary py-20 lg:py-28",
  defaultOpenIndex = null,
}: FAQProps) {
  const faqList = items || defaultFaqs;
  const [open, setOpen] = useState<number | null>(defaultOpenIndex);
  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section id="faq" className={className}>
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">

        {/* ── Headline ── */}
        {!hideTitle && (
          <FadeIn variant="fadeInUp" speed="slow">
            <div className="mb-12 text-center lg:mb-16">
              {title || (
                <h2 className="font-montserrat text-[32px] font-black leading-tight tracking-tight text-white sm:text-[40px] lg:text-[48px]">
                  Frequently Asked <span className="text-brand-primary">Questions</span>
                </h2>
              )}
            </div>
          </FadeIn>
        )}

        {/* ── Accordion list ── */}
        <FadeIn variant="fadeInUp" speed="slow">
          <div className="border-t border-white/[0.08]">
            {faqList.map((faq, i) => (
              <AccordionItem
                key={faq.q || i}
                index={i}
                faq={faq}
                open={open === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
