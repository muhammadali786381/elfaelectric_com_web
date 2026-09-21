"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const SPARK = "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)";

export default function FAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-[10px]">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.q} className="overflow-hidden rounded-[10px]" style={{ backgroundImage: SPARK }}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-4 px-[10px] py-5 text-left sm:px-4"
            >
              <span className="font-montserrat text-[16px] font-medium leading-snug text-white sm:text-[18px] lg:text-[20px]">
                {faq.q}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-white transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                strokeWidth={2.5}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <div className="bg-white px-[10px] pb-[15px] pt-[10px] sm:px-4">
                  <p className="font-roboto text-[15px] leading-relaxed text-[#333]">{faq.a}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
