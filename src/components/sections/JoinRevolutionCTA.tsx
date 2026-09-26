"use client";

import { useState } from "react";
import ProductSelectModal from "@/components/ui/ProductSelectModal";
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
}

export default function JoinRevolutionCTA({
  title,
  subtitle,
  primaryButtonText = "Buy Now",
  primaryButtonHref = "/ev-125",
  secondaryButtonText = "Book a Test Ride",
  secondaryButtonHref = "/book-a-test-ride",
  onPrimaryClick,
}: CTAProps) {
  const [open, setOpen] = useState(false);

  const handlePrimary = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <section className="relative w-full py-16 lg:py-24 bg-brand-primary overflow-hidden">
        {/* Sleek diagonal background pattern */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent)] bg-[length:40px_40px] opacity-10" />
        
        <div className="max-w-[1400px] mx-auto px-6 text-center relative z-10">
          <FadeIn variant="fadeInUp" speed="slow">
            <h2 className="font-montserrat text-[40px] sm:text-[56px] lg:text-[72px] font-black uppercase italic leading-[0.85] tracking-tighter text-black mb-6">
              {title || (
                <>
                  Join The <br className="hidden sm:block" /> Revolution
                </>
              )}
            </h2>
            {subtitle && (
              <p className="font-roboto mx-auto mb-10 max-w-lg text-[16px] sm:text-[18px] font-medium text-black/80">
                {subtitle}
              </p>
            )}
            
            <div className={`flex flex-wrap justify-center gap-4 ${subtitle ? "" : "mt-12"}`}>
              {secondaryButtonText && (
                <FlipButton
                  href={secondaryButtonHref}
                  variant="outline"
                  className="rounded-[4px] h-[56px] px-10 text-[16px] border-black text-black hover:bg-black hover:text-brand-primary font-bold"
                >
                  {secondaryButtonText}
                </FlipButton>
              )}
              {primaryButtonText && (
                <FlipButton
                  onClick={onPrimaryClick || (() => setOpen(true))}
                  type="button"
                  variant="primary"
                  className="rounded-[4px] h-[56px] px-10 text-[16px] bg-black text-brand-primary hover:bg-white hover:text-black font-bold border-none"
                >
                  {primaryButtonText}
                </FlipButton>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      <ProductSelectModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
