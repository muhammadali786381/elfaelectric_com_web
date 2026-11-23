"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/motion/FadeIn";
import { faqs as defaultFaqs } from "@/data/faqs";

export interface FAQItem {
  q: string;
  a: React.ReactNode;
  link?: { href: string; label: string };
}

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
            <p className="font-roboto whitespace-pre-line pb-5 pr-10 text-[14px] leading-relaxed text-white/45 sm:text-[15px]">
              {faq.a}
              {faq.link && (
                <> <a href={faq.link.href} target="_blank" rel="noopener noreferrer" className="text-brand-primary underline underline-offset-2 hover:text-white">{faq.link.label}</a></>
              )}
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
