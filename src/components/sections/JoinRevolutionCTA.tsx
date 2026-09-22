"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import ProductSelectModal from "@/components/ui/ProductSelectModal";

const SPARK =
  "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)";

export default function JoinRevolutionCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="bg-white py-8 lg:py-10">
        <div className="mx-auto w-full max-w-container px-4 sm:px-6">
          <div
            className="flex flex-col items-start gap-6 rounded-[15px] px-6 py-10 text-center sm:px-10"
            style={{ backgroundImage: SPARK }}
          >
            <h2 className="font-montserrat w-full text-[28px] font-bold leading-tight text-[#fcfcfc] sm:text-[36px] lg:text-[42px] lg:leading-[42px]">
              Join Pakistan’s Electric Bike Revolution Today
            </h2>
            <p className="font-roboto w-full text-[16px] font-normal leading-relaxed text-white">
              Boost-up your adventure with an E-Vehicle! Enjoy every ride like never before. Our
              powerful, eco-friendly E-Vehicles offer smooth, exciting drives—perfect for city trips
              or outdoor adventures. Take your journey to the next level with ELFA Electric—the best
              electric bike company in Pakistan.
            </p>
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="font-roboto inline-flex cursor-pointer items-center justify-center gap-x-2 rounded-[3px] bg-[#61ce70] px-6 py-2 text-[16px] font-normal text-white transition-colors hover:bg-[#4fbf5f]"
              >
                <Calendar className="h-4 w-4" strokeWidth={2} />
                Buy Now
              </button>
              <a
                href="#booking"
                className="font-roboto inline-flex cursor-pointer items-center justify-center gap-x-2 rounded-[3px] bg-[#61ce70] px-6 py-2 text-[16px] font-normal text-white transition-colors hover:bg-[#4fbf5f]"
              >
                <Calendar className="h-4 w-4" strokeWidth={2} />
                Book a Test Ride
              </a>
            </div>
          </div>
        </div>
      </section>

      <ProductSelectModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
