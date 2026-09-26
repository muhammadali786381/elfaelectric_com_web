import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";

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
            <main className="flex-1">
        <PageHero
          title={
            <>
              Installment
              <br />
              Plans
            </>
          }
          breadcrumb="Installment Plans"
          withBikes
          xlTitle
          backgroundSrc="/assets/images/blog-hero-bg.jpg"
          bikesSrc="/assets/images/blog-page.png"
        />

        <FinancingPlans />
        
      </main>
          </>
  );
}
