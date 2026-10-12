"use client";

import { useState } from "react";
import ProductSelectModal from "@/components/ui/ProductSelectModal";
import DealershipApplyModal from "@/components/ui/DealershipApplyModal";
import { FadeIn } from "@/components/motion/FadeIn";
import FlipButton from "@/components/ui/FlipButton";

interface CTAProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  onPrimaryClick?: () => void;
  /** Which modal the primary button opens (ignored if onPrimaryClick is set) */
  primaryModal?: "products" | "dealership";
}

export default function JoinRevolutionCTA({
  title,
  subtitle,
  primaryButtonText = "Buy Now",
  primaryButtonHref,
  secondaryButtonText = "Book a Test Ride",
  secondaryButtonHref = "/book-a-test-ride",
  onPrimaryClick,
  primaryModal = "products",
}: CTAProps) {
  const [open, setOpen] = useState(false);

  const handlePrimary = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
      return;
    }
    setOpen(true);
  };

  const useHref =
    Boolean(primaryButtonHref) &&
    !onPrimaryClick &&
    primaryModal !== "dealership";

  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#050505] py-12 lg:py-16">
        {/* Subtle top/bottom border accents */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />

        <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center gap-6 px-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          {/* Left: compact heading */}
          <div className="text-center sm:text-left">
            <h2 className="font-montserrat text-[28px] font-black italic uppercase leading-[0.95] tracking-tighter text-white sm:text-[36px] lg:text-[44px]">
              {title || (
                <>
                  Join The <span className="text-brand-primary">Revolution</span>
                </>
              )}
            </h2>
            {subtitle && (
              <p className="font-roboto mt-2 text-[14px] font-medium text-white/50 sm:text-[15px] max-w-md">
                {subtitle}
              </p>
            )}
          </div>

          {/* Right: buttons */}
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
            {primaryButtonText ? (
              useHref ? (
                <FlipButton
                  href={primaryButtonHref}
                  variant="primary"
                  className="h-[48px] w-full rounded-[4px] px-8 text-[13px] font-bold sm:w-auto"
                >
                  {primaryButtonText}
                </FlipButton>
              ) : (
                <FlipButton
                  onClick={handlePrimary}
                  type="button"
                  variant="primary"
                  className="h-[48px] w-full rounded-[4px] px-8 text-[13px] font-bold sm:w-auto"
                >
                  {primaryButtonText}
                </FlipButton>
              )
            ) : null}
            {secondaryButtonText ? (
              <FlipButton
                href={secondaryButtonHref}
                variant="outline"
                className="h-[48px] w-full rounded-[4px] border-white/20 px-8 text-[13px] font-bold text-white hover:border-[#CC5500] hover:bg-[#CC5500] hover:text-white sm:w-auto"
              >
                {secondaryButtonText}
              </FlipButton>
            ) : null}
          </div>
        </div>
      </section>

      {primaryModal === "dealership" ? (
        <DealershipApplyModal open={open} onClose={() => setOpen(false)} />
      ) : (
        <ProductSelectModal open={open} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
