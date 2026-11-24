import type { Metadata } from "next";
import Script from "next/script";
import FlipButton from "@/components/ui/FlipButton";
import SecondaryHero from "@/components/sections/SecondaryHero";
import JoinRevolutionCTA from "@/components/sections/JoinRevolutionCTA";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Book a Test Ride – ELFA Electric Bikes & Scooty in Pakistan",
  description:
    "Book a free test ride of the ELFA EV-125 or EV-1 Scooty. Experience 2000W power, long range, and smart features at a dealership near you.",
};

const whyItems = [
  {
    title: "Responsive Performance",
    desc: "Feel the smooth acceleration and easy handling.",
  },
  {
    title: "Smart Technology",
    desc: "Explore the digital display, app connectivity and smart features.",
  },
  {
    title: "Versatile Riding Modes",
    desc: "Try different riding modes to find what suits your journey.",
  },
  {
    title: "Everyday Comfort",
    desc: "Experience a ride designed to make your daily commute easier.",
  },
];

const bikeChoices = [
  {
    title: "EV-125",
    desc: "A powerful electric motorcycle built for everyday commutes, with a range of over 100 km on a single charge.",
  },
  {
    title: "EV-1 Scooty",
    desc: "Designed for convenient everyday travel, offering a range of up to 80 km on a single charge.",
  },
];

export default function BookTestRidePage() {
  return (
    <main className="flex-1 bg-[#050505] text-white">
      <SecondaryHero
        titleLine1="Book a"
        titleLine2="Test Ride"
        description="Experience the ride before you make it yours. Book a test ride with ELFA."
        imageSrc="/assets/images/hero4.jpeg"
        imageAlt="Book a test ride"
        compact
      />

      {/* Cards Row: Why Book a Test Ride? & CHOOSE YOUR ELFA BIKE */}
      <section className="pt-8 pb-4 sm:pt-12 sm:pb-6">
        <div className="mx-auto grid w-full max-w-container grid-cols-1 items-stretch gap-6 px-4 sm:px-6 lg:grid-cols-2">
          {/* Card 1: Why Book a Test Ride? */}
          <FadeIn
            variant="fadeInLeft"
            speed="normal"
            className="flex h-full flex-col justify-between rounded-3xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl transition-colors hover:bg-white/[0.04] hover:border-white/10"
          >
            <div>
              <h2 className="font-montserrat mb-3 text-[22px] font-bold leading-snug text-white sm:text-[26px]">
                Why Book a Test Ride?
              </h2>
              <p className="font-roboto mb-5 text-[15px] font-normal leading-relaxed text-white/60">
                Experience ELFA Electric up close before making your choice. Take a test ride to explore the performance, technology and everyday comfort of our electric bikes.
              </p>
              <ul className="font-roboto flex flex-col gap-3.5 text-[15px] font-normal leading-relaxed text-white/80">
                {whyItems.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="mt-[6px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-primary/20 text-brand-primary text-[10px] font-bold">
                      ✓
                    </span>
                    <span>
                      <strong className="text-white font-medium">{item.title}:</strong>{" "}
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Card 2: CHOOSE YOUR ELFA BIKE */}
          <FadeIn
            variant="fadeInRight"
            speed="normal"
            className="flex h-full flex-col justify-between rounded-3xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl transition-colors hover:bg-white/[0.04] hover:border-white/10"
          >
            <div className="flex h-full flex-col">
              <h2 className="font-montserrat mb-3 text-[22px] font-bold leading-snug text-white sm:text-[26px]">
                CHOOSE YOUR ELFA BIKE
              </h2>
              <p className="font-roboto mb-5 text-[15px] font-normal leading-relaxed text-white/60">
                Select your preferred ELFA model to test ride and discover electric mobility built for Pakistani roads.
              </p>
              <div className="flex flex-1 flex-col justify-between gap-4">
                {bikeChoices.map((bike) => (
                  <div
                    key={bike.title}
                    className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-colors hover:border-white/10 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-primary/20 text-brand-primary text-[10px] font-bold">
                        ✓
                      </span>
                      <h3 className="font-montserrat text-[16px] sm:text-[17px] font-bold text-white">
                        {bike.title}
                      </h3>
                    </div>
                    <p className="font-roboto text-[14px] sm:text-[15px] leading-relaxed text-white/70 pl-6.5">
                      {bike.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. FIND YOUR NEAREST TEST RIDE LOCATION */}
      <section className="py-14 sm:py-18 lg:py-20">
        <FadeIn
          variant="fadeInUp"
          speed="normal"
          className="mx-auto w-full max-w-container px-4 sm:px-6"
        >
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-montserrat text-[22px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-bold uppercase tracking-tight text-white sm:whitespace-nowrap">
              FIND YOUR NEAREST <span className="text-brand-primary">TEST RIDE LOCATION</span>
            </h2>
            <p className="font-roboto mt-4 text-[15px] leading-relaxed text-white/70 sm:text-[17px]">
              Explore ELFA test ride locations and select the one most convenient for you.
            </p>
            <div className="mt-8 flex justify-center">
              <FlipButton
                href="/our-locations"
                variant="primary"
                shape="cut"
                className="rounded-none h-12 sm:h-[50px] px-8 sm:px-10 text-[13px] sm:text-[14px] w-full sm:w-auto font-bold tracking-wider"
              >
                Find Your Nearest Location
              </FlipButton>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 5. BOOK YOUR TEST RIDE (Calendar & Form) */}
      <section id="booking" className="py-8 sm:py-12">
        <div className="mx-auto w-full max-w-container px-4 sm:px-6">
          <FadeIn variant="fadeInUp" speed="normal" className="text-center mb-8 sm:mb-10">
            <h2 className="font-montserrat mb-3 text-[28px] font-black uppercase italic tracking-tight text-white sm:text-[36px] lg:text-[44px]">
              BOOK YOUR <span className="text-brand-primary">TEST RIDE</span>
            </h2>
            <p className="font-roboto mx-auto max-w-2xl text-[15px] sm:text-[17px] font-normal leading-relaxed text-white/70">
              Enter your details below, and our team will get in touch to confirm your test ride booking.
            </p>
          </FadeIn>
          <div className="w-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-2 sm:p-4 backdrop-blur-xl">
            <iframe
              src="https://app.digistartupgroup.com/widget/booking/f0FdDh2Z0n2Zam9VcR4t" 
              style={{ width: "100%", height: "800px", border: "none", overflow: "hidden" }} 
              scrolling="no" 
              id="f0FdDh2Z0n2Zam9VcR4t"
              className="bg-transparent rounded-xl w-full"
            />
            <Script src="https://app.digistartupgroup.com/js/form_embed.js" strategy="afterInteractive" />
          </div>
        </div>
      </section>

      <JoinRevolutionCTA secondaryButtonText="" />
    </main>
  );
}
