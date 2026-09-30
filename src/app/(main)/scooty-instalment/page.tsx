import type { Metadata } from "next";
import SecondaryHero from "@/components/sections/SecondaryHero";
import ScootyInstallmentPlans from "./ScootyInstallmentPlans";

export const metadata: Metadata = {
  title: "Scooty Installment Plans | Easy Electric Bike Financing",
  description:
    "Explore ELFA Scooty installment plans. Easy financing options with flexible payment terms for ELFA Scooty EV1.",
};

export default function ScootyInstallmentPlansPage() {
  return (
    <>
      <main className="flex-1 bg-bg-primary overflow-hidden">
        <SecondaryHero 
          titleLine1="Installment"
          titleLine2="Plans"
          description="Explore our flexible installment plans tailored to make owning an ELFA Scooty EV1 easy and affordable."
          imageSrc="/assets/images/hero4.jpeg"
          imageAlt="Scooty Installment Plans"
        />

        <ScootyInstallmentPlans />
      </main>
    </>
  );
}
