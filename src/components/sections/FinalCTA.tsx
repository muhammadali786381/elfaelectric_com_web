"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

export default function FinalCTA() {
  return (
    <section className="mt-2 bg-white py-8 lg:py-10">
      <FadeIn variant="fadeIn" speed="slow">
        <div className="mx-auto w-full max-w-container px-4 sm:px-6">
          <div
            className="flex flex-col items-center justify-between gap-6 rounded-[12px] px-6 py-10 text-center sm:flex-row sm:px-10 sm:text-left"
            style={{
              backgroundImage: "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)",
            }}
          >
            <h2 className="font-montserrat text-[22px] font-bold leading-tight text-white sm:text-[26px] lg:text-[30px]">
              Boost-Up Your Adventure With Electric Motorcycle
            </h2>
            <div className="flex shrink-0 flex-wrap items-center justify-center gap-3 sm:justify-start">
              <Link
                href="/products"
                className="font-roboto inline-flex h-11 items-center gap-2 rounded-[3px] bg-[#61ce70] px-5 text-[13px] font-semibold uppercase tracking-[1.2px] text-white transition-colors hover:bg-[#4fbf5f]"
              >
                Buy Now
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
