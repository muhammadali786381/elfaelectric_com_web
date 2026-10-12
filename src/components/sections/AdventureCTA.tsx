"use client";

import JoinRevolutionCTA from "@/components/sections/JoinRevolutionCTA";
import { ArrowRight } from "lucide-react";

export default function AdventureCTA({ buyHref }: { buyHref?: string }) {
  return (
    <JoinRevolutionCTA
      title={
        <>
          Ready to <span className="text-brand-primary">Ride?</span>
        </>
      }
      subtitle="Experience the future of mobility today."
      primaryButtonText="Buy Now"
      primaryButtonHref={buyHref}
      secondaryButtonText="Book a Test Ride"
      secondaryButtonHref="/book-a-test-ride"
    />
  );
}
