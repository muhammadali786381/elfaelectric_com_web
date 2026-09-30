"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div 
            key={faq.q} 
            className="group rounded-2xl border border-white/10 bg-[#111] overflow-hidden transition-colors hover:border-brand-primary/50"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 p-6 text-left"
            >
              <span className={`font-montserrat text-[16px] sm:text-[18px] lg:text-[20px] font-bold transition-colors duration-300 ${isOpen ? "text-brand-primary" : "text-white group-hover:text-white/80"}`}>
                {faq.q}
              </span>
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? "border-brand-primary bg-brand-primary/10" : "border-white/10 bg-white/5 group-hover:bg-white/10"}`}>
                <Plus
                  className={`h-5 w-5 transition-transform duration-500 ${isOpen ? "rotate-45 text-brand-primary" : "text-white/70"}`}
                  strokeWidth={2}
                />
              </div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-0">
                    <p className="font-roboto text-[15px] sm:text-[16px] leading-relaxed text-white/60">
                      {faq.a}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
