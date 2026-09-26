"use client";

import JoinRevolutionCTA from "@/components/sections/JoinRevolutionCTA";

export default function AdventureCTA() {
  return (
    <JoinRevolutionCTA
      title={
        <>
          Boost-Up Your <br className="hidden sm:block" /> Adventure
        </>
      }
      subtitle="Enjoy every ride like never before! Our powerful, eco-friendly Electric Motorcycle offer smooth, exciting drives — perfect for city trips or outdoor adventures."
      primaryButtonText="Buy Now"
      primaryButtonHref="/products"
      secondaryButtonText="Book A Test Ride"
      secondaryButtonHref="/contact-us"
    />
  );
}
