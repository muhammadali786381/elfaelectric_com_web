import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Consent & Policy Acknowledgement | ELFA Electric",
  description: "Consent & Policy Acknowledgement for ELFA Electric.",
};

const terms = [
  "EV Technologies (Private) Limited reserves the right to access and utilize tracker data (including location, driving patterns) from the Vehicle for service improvement, diagnostics and product research and development. All data will be treated with strict confidentiality and will not be shared with unauthorized third parties.",
  "All carbon credits generated through the use of the Vehicle shall remain the sole property of EV Technologies (Private) Limited. The company reserves the right to trade, retire, or utilize these credits at its discretion.",
  "EV Technologies (Private) Limited reserves the right to deploy software updates remotely to improve performance, safety, and user experience.",
  "The electric vehicle is covered under a limited warranty as specified in the Warranty Policy.",
  "The customer agrees to operate the Vehicle in compliance with local laws. EV Technologies (Private) Limited shall not be held liable for misuse, accidents, or violations resulting from the customer’s actions.",
  "In the event of a transfer of ownership of the Vehicle, all responsibilities, obligations, and terms outlined in this Consent & Policy Acknowledgement shall automatically transfer to the new owner, who shall be deemed a user of the Vehicle and subject to the same terms, conditions, and user consent as the original owner. The original owner is responsible for providing the new owner with the original Consent & Policy Acknowledgement document prior to the transfer. EV Technologies (Private) Limited shall not be liable for any claims, disputes, or issues arising from the original owner’s failure to communicate these obligations. All services, data rights, warranty terms, and other provisions of this document shall remain tied to the Vehicle and apply to all users, irrespective of the change in ownership.",
];

export default function ConsentPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-bg-primary">
        <PageHero
          title="Consent & Policy Acknowledgement"
          breadcrumb="Consent & Policy Acknowledgement"
          withBikes
          backgroundSrc="/assets/images/blog-hero-bg.jpg"
          bikesSrc="/assets/images/blog-page.png"
        />

        <section className="mx-auto w-full max-w-container px-4 py-12 sm:px-6 lg:py-16">
          <div className="mx-auto flex max-w-container flex-col gap-8">
            {terms.map((text, i) => (
              <div key={i} className="flex  gap-4">
                <h4 className="font-montserrat text-[16px] font-bold leading-normal text-text-primary">
                  {i + 1}.
                </h4>
                <p className="font-roboto text-[15px] font-normal leading-[25px] text-text-primary">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
