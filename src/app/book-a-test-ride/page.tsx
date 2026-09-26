import type { ReactNode } from "react";
import type { Metadata } from "next";
import SecondaryHero from "@/components/sections/SecondaryHero";

import JoinRevolutionCTA from "@/components/sections/JoinRevolutionCTA";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Book a Test Ride – ELFA Electric Bikes & Scooty in Pakistan",
  description:
    "Book a free test ride of the ELFA EV-125 or EV-1 Scooty. Experience 2000W power, long range, and smart features at a dealership near you.",
};

const BOOKING_IFRAME =
  "https://app.digistartupgroup.com/widget/booking/f0FdDh2Z0n2Zam9VcR4t";

const whyItems = [
  "2000W motor power for smooth acceleration.",
  "100Km range on a single charge.",
  "Smart features like app connectivity and digital dashboards.",
  "Eco-friendly transport with zero emissions.",
  "Affordable electric bike performance at PKR 1/Km running cost.",
];

const scheduleItems = [
  "Fill out the booking form below with your details.",
  "Choose your preferred model: ELFA EV125 or EV-1 Scooty.",
  "Select your nearest dealership and confirm your date and time. It’s that simple! Book test ride electric bike Pakistan in just within no time.",
];

const modelItems = [
  "ELFA EV125: Pakistan’s best-selling electric bike with 2000W motor, 100km range, and 75Km/h top speed.",
  "EV-1 Scooty: Compact electric scooty with 1500W motor, 75Km range, and 60Km/h top speed.",
  "Both models come with 3-year battery warranty and smart app controls.",
];

const locationItems = [
  "Karachi: DHA Phase 8, Gulshan-e-Iqbal, Saddar.",
  "Hyderabad: Jamshoro Road.",
  "Lahore: Shalamar Link Road.",
];

const expectItems = [
  "Get a safety briefing from our experts.",
  "Test speed modes (Eco, City, Sports).",
  "Experience smart features (app controls, digital dashboard).",
];

const reasonItems = [
  "Powerful Performance: 2000W motors for smooth rides.",
  "Long Range: Up to 100Km per charge.",
  "Smart Features: App controls, digital dashboard.",
  "Affordable: Save PKR 1/km vs. fuel bikes.",
  "Eco-Friendly: Zero emissions, zero noise.",
];

function GlassCard({
  title,
  intro,
  items,
  footer,
  from,
}: {
  title: string;
  intro?: string;
  items: string[];
  footer?: ReactNode;
  from: "left" | "right";
}) {
  return (
    <FadeIn
      variant={from === "left" ? "fadeInLeft" : "fadeInRight"}
      speed="normal"
      className="flex h-full flex-col rounded-3xl border border-white/5 bg-white/[0.02] p-8 sm:p-10 backdrop-blur-xl transition-colors hover:bg-white/[0.04] hover:border-white/10"
    >
      <h2 className="font-montserrat mb-4 text-[22px] font-bold leading-snug text-white sm:text-[26px]">
        {title}
      </h2>
      {intro && (
        <p className="font-roboto mb-6 text-[15px] font-normal leading-relaxed text-white/60">
          {intro}
        </p>
      )}
      <ul className="font-roboto flex flex-col gap-4 text-[15px] font-normal leading-relaxed text-white/80">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-[6px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-primary/20 text-brand-primary text-[10px] font-bold">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {footer && <div className="mt-8 border-t border-white/10 pt-6">{footer}</div>}
    </FadeIn>
  );
}

export default function BookTestRidePage() {
  return (
    <main className="flex-1 bg-[#050505] text-white">
      <SecondaryHero
        titleLine1="Book a"
        titleLine2="Test Ride"
        description="Experience ELFA Electric Bike & Scooty in Pakistan"
        imageSrc="/assets/images/hero4.jpeg"
        imageAlt="Book a test ride"
      />

      {/* Why + How — left / right */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto grid w-full max-w-container grid-cols-1 items-stretch gap-6 px-4 sm:px-6 lg:grid-cols-2">
          <GlassCard
            from="left"
            title="Why Book a Test Ride with ELFA Electric?"
            intro="Book a test ride with ELFA and feel the difference! Our test rides let you experience:"
            items={whyItems}
          />
          <GlassCard
            from="right"
            title="How to Schedule Your Electric Bike Demo"
            intro="Schedule your electric bike demo Pakistan in 3 easy steps:"
            items={scheduleItems}
          />
        </div>
      </section>

      {/* Intro text */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto w-full max-w-4xl text-center">
          <FadeIn variant="fadeInUp" speed="normal">
            <h2 className="font-montserrat mb-6 text-[28px] font-bold leading-tight text-white sm:text-[40px]">
              Book a test ride with an electric bike
            </h2>
            <div className="font-roboto mx-auto flex flex-col gap-4 text-[16px] sm:text-[18px] font-normal leading-relaxed text-white/60">
              <p>
                Book a test ride with an electric bike brand proudly made in Pakistan and
                experience the future of mobility with ELFA Electric!
              </p>
              <p>
                We offer free test rides for our flagship ELFA EV125 and EV-1 Scooty across
                Karachi. Feel the power of 2000W motors, enjoy a 100Km range, and explore smart
                features all before you buy.
              </p>
              <p>
                Schedule your electric bike demo today and join us and know why we’re the best
                electric bike and electric scooty brand!
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Models + Locations — left / right */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto grid w-full max-w-container grid-cols-1 items-stretch gap-6 px-4 sm:px-6 lg:grid-cols-2">
          <GlassCard
            from="left"
            title="Available Models for Test Ride: EV125 & EV-1 Scooty"
            items={modelItems}
          />
          <GlassCard
            from="right"
            title="Test Ride Locations in Karachi, Hyderabad & DHA"
            intro="We offer test rides at:"
            items={locationItems}
          />
        </div>
      </section>

      {/* Reach title + booking iframe */}
      <section id="booking" className="py-20 sm:py-28">
        <div className="mx-auto w-full max-w-container px-4 text-center sm:px-6">
          <FadeIn variant="fadeInUp" speed="normal" className="text-center">
            <h2 className="font-montserrat mb-4 text-[28px] font-bold leading-none text-white sm:text-[36px] lg:text-[42px]">
              Reach Our Experts For Support
            </h2>
            <p className="font-roboto mx-auto max-w-2xl mb-12 text-[16px] font-normal leading-relaxed text-white/60">
              Experience the thrill of riding our electric bikes firsthand. Book your test ride
              today and feel the power and innovation in every journey!
            </p>
          </FadeIn>
          <div className="w-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-2 sm:p-4">
            <iframe
              src={BOOKING_IFRAME}
              title="Book a test ride"
              className="min-h-[800px] w-full border-0 rounded-xl bg-transparent"
              loading="lazy"
              allow="fullscreen"
            />
          </div>
        </div>
      </section>

      {/* Expect + 5 Reasons — left / right */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto grid w-full max-w-container grid-cols-1 items-stretch gap-6 px-4 sm:px-6 lg:grid-cols-2">
          <GlassCard
            from="left"
            title="What to Expect During Your Test Ride"
            intro="During your ELFA test ride, you’ll:"
            items={expectItems}
            footer={
              <p className="font-roboto text-[15px] font-medium text-white/80">
                Book test ride electric bike Pakistan for a complete experience!
              </p>
            }
          />
          <GlassCard
            from="right"
            title="5 Reasons to Try ELFA Electric Bikes Today"
            items={reasonItems}
          />
        </div>
      </section>

      <JoinRevolutionCTA />
      
    </main>
  );
}
