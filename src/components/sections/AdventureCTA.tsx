"use client";

import { Calendar } from "lucide-react";
import { motion } from "motion/react";
import FlipButton from "@/components/ui/FlipButton";

export default function AdventureCTA() {
  return (
    <section className="bg-[#050505] py-8 lg:py-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto w-full max-w-container px-4"
      >
        <div
          className="flex flex-col items-center rounded-2xl border border-white/[0.08] bg-transparent px-6 py-14 text-center sm:px-12 lg:px-20"
        >
          <h2 className="font-montserrat text-[26px] font-bold leading-tight text-text-inverse sm:text-[32px] lg:text-[38px]">
            Boost-Up Your Adventure With Electric Motorcycle
          </h2>

          <p className="font-roboto mt-5 px-10 text-[15px] leading-relaxed text-text-inverse sm:text-[18px]">
            Enjoy every ride like never before! Our powerful, eco-friendly Electric Motorcycle offer
            smooth, exciting drives — perfect for city trips or outdoor adventures. Take your journey
            to the next level!
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <FlipButton
              href="/contact-us"
              variant="primary"
              icon={<Calendar className="h-4 w-4" strokeWidth={2} />}
              className="rounded-[4px] h-[44px] px-5 text-[14px]"
            >
              Book A Test Ride
            </FlipButton>
            <FlipButton
              href="/products"
              variant="primary"
              className="rounded-[4px] h-[44px] px-5 text-[14px]"
            >
              Buy Now
            </FlipButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
