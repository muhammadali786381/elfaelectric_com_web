"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import ProductSelectModal from "@/components/ui/ProductSelectModal";
import { FadeIn } from "@/components/motion/FadeIn";
import FlipButton from "@/components/ui/FlipButton";

const SPARK =
  "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)";

export default function JoinRevolutionCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="bg-bg-primary py-8 lg:py-10">
        <div className="mx-auto w-full max-w-container px-4 sm:px-6">
          <FadeIn
            variant="fadeInUp"
            speed="normal"
            className="flex flex-col items-start gap-6 rounded-[15px] px-6 py-10 text-center sm:px-10"
            style={{ backgroundImage: SPARK }}
          >
            <h2 className="font-montserrat w-full text-[28px] font-bold leading-tight text-text-inverse sm:text-[36px] lg:text-[42px] lg:leading-[42px]">
              Join Pakistan’s Electric Bike Revolution Today
            </h2>
            <p className="font-roboto w-full text-[16px] font-normal leading-relaxed text-text-inverse">
              Boost-up your adventure with an E-Vehicle! Enjoy every ride like never before. Our
              powerful, eco-friendly E-Vehicles offer smooth, exciting drives—perfect for city trips
              or outdoor adventures. Take your journey to the next level with ELFA Electric—the best
              electric bike company in Pakistan.
            </p>
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              <FlipButton
                type="button"
                onClick={() => setOpen(true)}
                variant="primary"
                icon={<Calendar className="h-4 w-4" strokeWidth={2} />}
                className="rounded-[3px] h-[40px] px-6 text-[14px]"
              >
                Buy Now
              </FlipButton>
              <FlipButton
                href="#booking"
                variant="primary"
                icon={<Calendar className="h-4 w-4" strokeWidth={2} />}
                className="rounded-[3px] h-[40px] px-6 text-[14px]"
              >
                Book a Test Ride
              </FlipButton>
            </div>
          </FadeIn>
        </div>
      </section>

      <ProductSelectModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
