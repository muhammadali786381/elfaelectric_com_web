import type { Metadata } from "next";
import Image from "next/image";
import FinancingPlans from "./FinancingPlans";
import { FadeIn } from "@/components/motion/FadeIn";
import SecondaryHero from "@/components/sections/SecondaryHero";

export const metadata: Metadata = {
  title: "ELFA Financing Partners | Easy Electric Bike Installments",
  description:
    "Explore ELFA EV-125 and EV-1 installment plans with Asaan Ghar, Qist Baazar, WASL, and TMF financing partners.",
};

export default function FinancingPartnersPage() {
  return (
    <>
      <main className="flex-1 bg-bg-primary overflow-hidden">
        <SecondaryHero 
          titleLine1="Financing"
          titleLine2="Partners"
          description="Explore ELFA EV-125 and EV-1 installment plans with our trusted financing partners. Zero hassle, instant approvals."
          imageSrc="/assets/images/hero4.jpeg"
          imageAlt="Financing Partners"
        />

        <FinancingPlans />
      </main>
    </>
  );
}
