import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";
import DealersDirectory from "./DealersDirectory";
import JoinRevolutionCTA from "@/components/sections/JoinRevolutionCTA";

export const metadata: Metadata = {
  title: "ELFA Electric Dealers | Authorized Showrooms in Pakistan",
  description:
    "Find authorized ELFA Electric dealers across Karachi, Hyderabad, Lahore, Rahim Yar Khan, and Rawalpindi. Book a test ride or visit a showroom near you.",
};

export default function OurDealersPage() {
  return (
    <>
      <main className="flex-1">
        <section className="relative flex min-h-[40dvh] items-end justify-center overflow-hidden pb-10 pt-28 lg:min-h-[45dvh] lg:pb-14 lg:pt-36">
          <Image
            src="/assets/images/hero4.jpeg"
            alt="ELFA Electric Motorcycle"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/60 to-[#050505]" />

          <div className="relative z-10 w-full max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
            <FadeIn variant="fadeInUp" speed="slow">
              <h1 className="font-montserrat mb-4 text-[56px] font-black italic uppercase leading-[0.9] tracking-tighter text-white sm:mb-5 sm:text-[72px] lg:text-[92px]">
                Our <span className="text-brand-primary">Locations</span>
              </h1>
              <p className="font-roboto mx-auto max-w-[920px] text-[15px] font-medium leading-snug text-white/70 sm:text-[17px] lg:max-w-[980px] lg:text-[18px] lg:leading-[1.45]">
                Our authorised dealers across Karachi, Hyderabad, Lahore, and other cities offer
                ELFA electric bikes and scooties with expert guidance and support. Whether
                you&apos;re looking to buy your next ride, book a test ride, or become an authorised
                ELFA dealer, we&apos;ve got you covered.
              </p>
            </FadeIn>
          </div>
        </section>

        <DealersDirectory />

        <JoinRevolutionCTA
          title={
            <>
              Apply Online to Become
              <br />
              an ELFA Dealer
            </>
          }
          primaryButtonText="Apply Now"
          primaryModal="dealership"
          secondaryButtonText=""
        />
      </main>
    </>
  );
}
