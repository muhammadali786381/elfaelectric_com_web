"use client";

import JoinRevolutionCTA from "@/components/sections/JoinRevolutionCTA";

export default function AdventureCTA({ buyHref }: { buyHref?: string }) {
  return (
    <JoinRevolutionCTA
      title={
        <>
          Boost-Up Your <br className="hidden sm:block" /> Adventure
        </>
      }
      subtitle="Enjoy every ride like never before! Our powerful, eco-friendly Electric Motorcycle offer smooth, exciting drives — perfect for city trips or outdoor adventures."
      primaryButtonText="Buy Now"
      primaryButtonHref={buyHref}
      secondaryButtonText="Book A Test Ride"
      secondaryButtonHref="/book-a-test-ride"
    />
  );
}
