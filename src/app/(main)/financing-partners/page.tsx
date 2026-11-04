import type { Metadata } from "next";
import FinancingPlans from "./FinancingPlans";
import SecondaryHero from "@/components/sections/SecondaryHero";

export const metadata: Metadata = {
  title: "ELFA Financing Partners | Easy Electric Bike Installments",
  description:
    "Explore ELFA EV-125 installment plans with Asaan Ghar, Qist Baazar, WASL, TMF, and Burj financing partners.",
};

export default function FinancingPartnersPage() {
  return (
    <>
      <main className="flex-1 bg-bg-primary overflow-hidden">
        <SecondaryHero
          titleLine1="Financing"
          titleLine2="Partners"
          imageSrc="/assets/images/hero4.jpeg"
          imageAlt="Financing Partners"
          compact
        />

        <FinancingPlans />
      </main>
    </>
  );
}
