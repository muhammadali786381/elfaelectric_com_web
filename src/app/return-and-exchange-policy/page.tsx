import type { Metadata } from "next";
import SecondaryHero from "@/components/sections/SecondaryHero";

export const metadata: Metadata = {
  title: "Return & Exchange Policy | ELFA Electric",
  description: "Return and Exchange Policy for ELFA Electric.",
};

const policySections = [
  {
    title: "Onboarding Process",
    items: [
      "Day 1 initial call after purchasing (introduce and explain and onboard the client on App).",
      "Day 14 Feedback from the customer.",
    ],
  },
  {
    title: "SOW",
    items: [
      "Door to door service (reach on the spot of trouble and repair it or bring back to the office).",
      "Living far from the repair stations so our mechanic would come to your location and repair or bring back the bike to repair it.",
    ],
  },
  {
    title: "Replacement of the bike",
    items: [
      "Any issue arises on the parts which are insured by us then we make sure to provide you a bike so you don't face any issues to travel.",
    ],
  },
];

export default function ReturnAndExchangePolicyPage() {
  return (
    <>
      <main className="flex-1 bg-bg-primary">
        <SecondaryHero
          titleLine1="Return & Exchange"
          titleLine2="Policy"
          description="Learn about our exceptional customer service standards, onboarding process, and replacement policies."
          imageSrc="/assets/images/hero4.jpeg"
          imageAlt="ELFA Electric Motorcycle Customer Service"
        />

        <section className="mx-auto w-full max-w-container px-4 py-12 sm:px-6 lg:py-16">
          <div className="mx-auto flex max-w-container flex-col gap-10">
            <h2 className="font-montserrat text-[32px] sm:text-[40px] font-bold text-white mb-2">
              Highlight Customer Service
            </h2>

            <div className="flex flex-col gap-10">
              {policySections.map((section) => (
                <div key={section.title} className="flex flex-col gap-4">
                  <h3 className="font-montserrat text-[24px] sm:text-[28px] font-semibold text-white">
                    {section.title}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-primary" />
                        <p className="font-roboto text-[16px] leading-[1.6] text-white/80">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
