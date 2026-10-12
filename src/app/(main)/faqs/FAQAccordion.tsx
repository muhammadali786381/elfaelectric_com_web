"use client";

import { useState } from "react";
import { AccordionItem } from "@/components/sections/FAQ";

export default function FAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-t border-white/[0.08]">
      {faqs.map((faq, i) => (
        <AccordionItem
          key={faq.q || i}
          faq={faq}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          index={i}
        />
      ))}
    </div>
  );
}
