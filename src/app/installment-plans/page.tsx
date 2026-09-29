import type { Metadata } from "next";
import SecondaryHero from "@/components/sections/SecondaryHero";

import FinancingPlans from "@/app/financing-partners/FinancingPlans";

export const metadata: Metadata = {
  title: "ELFA Installment Plans | Easy Electric Bike Financing",
  description:
    "Explore ELFA EV-125 and EV-1 installment plans with Asaan Ghar, Qist Baazar, WASL, and TMF financing partners.",
};

/** Same content as Financing Partners — dedicated route for product-detail CTA. */
export default function InstallmentPlansPage() {
  return (
    <>
      <main className="flex-1 bg-bg-primary overflow-hidden">
        <SecondaryHero 
          titleLine1="Installment"
          titleLine2="Plans"
          description="Explore our flexible installment plans tailored to make owning an ELFA electric bike easy and affordable."
          imageSrc="/assets/images/hero4.jpeg"
          imageAlt="Installment Plans"
        />

        <FinancingPlans />
      </main>
    </>
  );
}
