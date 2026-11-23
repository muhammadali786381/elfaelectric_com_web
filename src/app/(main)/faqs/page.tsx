import type { Metadata } from "next";
import SecondaryHero from "@/components/sections/SecondaryHero";
import FAQAccordion from "./FAQAccordion";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "ELFA Electric FAQs | Electric Bike Questions Answered",
  description:
    "Answers to common questions about ELFA electric bikes and scooties — charging, range, warranty, maintenance, and more.",
};

export default function FAQsPage() {
  return (
    <>
      <main className="flex-1 bg-[#050505]">
        <SecondaryHero 
          titleLine1="Frequently"
          titleLine2="Asked Questions"
          description="Answers to common questions about ELFA electric bikes and scooties — charging, range, warranty, maintenance, and more."
          imageSrc="/assets/images/hero4.jpeg"
          imageAlt="ELFA Electric FAQs"
        />

        <section className="bg-[#050505] py-16 lg:py-24">
          <div className="mx-auto w-full max-w-[954px] px-4 sm:px-6">
            <FAQAccordion faqs={faqs} />
          </div>
        </section>
      </main>
    </>
  );
}
