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
      <section className="relative w-full overflow-hidden bg-brand-primary py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent)] bg-[length:40px_40px] opacity-10" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 text-center">
          <FadeIn variant="fadeInUp" speed="slow">
            <h2 className="font-montserrat mb-6 text-[40px] font-black uppercase italic leading-[0.85] tracking-tighter text-black sm:text-[56px] lg:text-[72px]">
              {title || (
                <>
                  Join The <br className="hidden sm:block" /> Revolution
                </>
              )}
            </h2>
            {subtitle && (
              <p className="font-roboto mx-auto mb-10 max-w-lg text-[16px] font-medium text-black/80 sm:text-[18px]">
                {subtitle}
              </p>
            )}

            <div
              className={`flex flex-col sm:flex-row flex-wrap items-stretch justify-center gap-4 ${subtitle ? "" : "mt-12"}`}
            >
              {secondaryButtonText ? (
                <FlipButton
                  href={secondaryButtonHref}
                  variant="outline"
                  className="h-[56px] w-full sm:w-auto rounded-[4px] border-black px-10 text-[16px] font-bold text-black hover:bg-black hover:text-brand-primary"
                >
                  {secondaryButtonText}
                </FlipButton>
              ) : null}
              {primaryButtonText ? (
                useHref ? (
                  <FlipButton
                    href={primaryButtonHref}
                    variant="primary"
                    className="h-[56px] w-full sm:w-auto rounded-[4px] border-none bg-black px-10 text-[16px] font-bold text-brand-primary hover:bg-white hover:text-black"
                  >
                    {primaryButtonText}
                  </FlipButton>
                ) : (
                  <FlipButton
                    onClick={handlePrimary}
                    type="button"
                    variant="primary"
                    className="h-[56px] w-full sm:w-auto rounded-[4px] border-none bg-black px-10 text-[16px] font-bold text-brand-primary hover:bg-white hover:text-black"
                  >
                    {primaryButtonText}
                  </FlipButton>
                )
              ) : null}
            </div>
          </FadeIn>
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
