import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import Marquee from "@/components/sections/Marquee";
import FinancingPlans from "./FinancingPlans";

export const metadata: Metadata = {
  title: "ELFA Financing Partners | Easy Electric Bike Installments",
  description:
    "Explore ELFA EV-125 and EV-1 installment plans with Asaan Ghar, Qist Baazar, WASL, and TMF financing partners.",
};

export default function FinancingPartnersPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title={
            <>
              Financing
              <br />
              Partners
            </>
          }
          breadcrumb="Financing Partners"
          withBikes
          xlTitle
          backgroundSrc="/assets/images/blog-hero-bg.jpg"
          bikesSrc="/assets/images/blog-page.png"
        />

        <FinancingPlans />
        <Marquee />
      </main>
      <Footer />
    </>
  );
}
