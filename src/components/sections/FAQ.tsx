"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What is the range of ELFA EV-125 on a single charge?",
    a: "The ELFA EV-125 offers a range of 100+ km on a single charge under normal riding conditions. Actual range may vary depending on terrain, load, and riding style.",
  },
  {
    q: "How long does it take to fully charge the battery?",
    a: "The ELFA EV-125 takes approximately 4–6 hours to fully charge from 0% to 100% using the standard charger. Fast charging options are also available.",
  },
  {
    q: "What type of battery does ELFA use?",
    a: "ELFA uses advanced Lithium Iron Phosphate (LiFePO4) batteries — the safest and most durable lithium battery chemistry, rated for 2,000+ charge cycles.",
  },
  {
    q: "Is the battery water-resistant?",
    a: "Yes! ELFA's battery packs are IP-rated for water resistance, allowing you to ride confidently through rain and wet road conditions.",
  },
  {
    q: "What is the top speed of ELFA bikes?",
    a: "The EV-125 reaches up to 75 Km/h, while the EV-1 Scooty reaches up to 60 Km/h. Both are speed-limited for optimal battery efficiency.",
  },
  {
    q: "Is there a warranty on ELFA Electric vehicles?",
    a: "Yes, ELFA Electric offers a comprehensive warranty on all vehicles, including a dedicated battery warranty. Contact our sales team for complete warranty details.",
  },
  {
    q: "Where can I service my ELFA Electric bike?",
    a: "ELFA has an expanding service network across Pakistan. You can also book a service visit through our website or by calling our helpline at +92 311 1000 333.",
  },
  {
    q: "Can I book a test ride before buying?",
    a: "Absolutely! You can book a test ride at your nearest ELFA showroom through our website or WhatsApp. We'd love for you to experience the difference firsthand.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-red-600 text-sm font-bold uppercase tracking-widest mb-3">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-2xl overflow-hidden hover:border-red-200 transition-colors"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 bg-white hover:bg-red-50 transition-colors"
                aria-expanded={open === i}
              >
                <span className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                  {faq.q}
                </span>
                <span
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    open === i
                      ? "bg-red-600 border-red-600 rotate-45"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${open === i ? "text-white" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-64" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          Still have questions?{" "}
          <a href="#contact" className="text-red-600 font-semibold hover:underline">
            Contact us
          </a>{" "}
          — we&apos;re happy to help.
        </p>
      </div>
    </section>
  );
}
