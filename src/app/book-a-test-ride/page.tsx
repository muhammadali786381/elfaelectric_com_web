import type { ReactNode } from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import Marquee from "@/components/sections/Marquee";
import JoinRevolutionCTA from "@/components/sections/JoinRevolutionCTA";

export const metadata: Metadata = {
  title: "Book a Test Ride – ELFA Electric Bikes & Scooty in Pakistan",
  description:
    "Book a free test ride of the ELFA EV-125 or EV-1 Scooty. Experience 2000W power, long range, and smart features at a dealership near you.",
};

const SPARK =
  "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)";

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

function SparkCard({
  title,
  intro,
  items,
  footer,
}: {
  title: string;
  intro?: string;
  items: string[];
  footer?: ReactNode;
}) {
  return (
    <div
      className="flex h-full flex-col rounded-[19px] p-[30px]"
      style={{ backgroundImage: SPARK }}
    >
      <h2 className="font-montserrat mb-3 text-[24px] font-bold leading-[1.2] text-[#61ce70] sm:text-[28px] sm:leading-[33px]">
        {title}
      </h2>
      {intro && (
        <p className="font-roboto mb-4 text-[17px] font-normal leading-relaxed text-white">
          {intro}
        </p>
      )}
      <ul className="font-roboto flex flex-col gap-2.5 text-[15px] font-normal leading-snug text-white">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-[#61ce70]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {footer}
    </div>
  );
}

export default function BookTestRidePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero — same as Newsroom */}
        <PageHero
          title={
            <>
              Book a Test Ride
              <br />
              Experience ELFA Electric Bike &amp; Scooty in Pakistan
            </>
          }
          breadcrumb="Book a Test Ride"
          withBikes
          bodySubtitle
          backgroundSrc="/assets/images/blog-hero-bg.jpg"
          bikesSrc="/assets/images/blog-page.png"
        />

        {/* Why + How — live: 50px section pad, 22px gap, spark cards */}
        <section className="bg-[#fcfcfc] py-[50px]">
          <div className="mx-auto grid w-full max-w-container grid-cols-1 gap-[22px] px-4 sm:px-6 lg:grid-cols-2">
            <SparkCard
              title="Why Book a Test Ride with ELFA Electric?"
              intro="Book a test ride with ELFA and feel the difference! Our test rides let you experience:"
              items={whyItems}
            />
            <SparkCard
              title="How to Schedule Your Electric Bike Demo"
              intro="Schedule your electric bike demo Pakistan in 3 easy steps:"
              items={scheduleItems}
            />
          </div>
        </section>

        {/* Intro band — full-width spark */}
        <section className="bg-white py-[50px]">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <div
              className="rounded-[15px] text-center px-6 py-[30px] sm:px-10"
              style={{ backgroundImage: SPARK }}
            >
              <h2 className="font-montserrat mb-5 text-[28px] font-bold leading-tight text-[#61ce70] sm:text-[36px] lg:text-[45px] lg:leading-[45px]">
                Book a test ride with an electric bike
              </h2>
              <div className="font-roboto flex max-w-[1000px] flex-col gap-3  text-[18px] font-normal leading-relaxed text-[#fcfcfc]">
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
            </div>
          </div>
        </section>

        {/* Models + Locations */}
        <section className="bg-[#fcfcfc] py-[50px]">
          <div className="mx-auto grid w-full max-w-container grid-cols-1 gap-[22px] px-4 sm:px-6 lg:grid-cols-2">
            <SparkCard
              title="Available Models for Test Ride: EV125 & EV-1 Scooty"
              items={modelItems}
            />
            <SparkCard
              title="Test Ride Locations in Karachi, Hyderabad & DHA"
              intro="We offer test rides at:"
              items={locationItems}
            />
          </div>
        </section>

        {/* Reach + booking iframe */}
        <section id="booking" className="bg-white py-[60px]">
          <div className="mx-auto w-full text-center max-w-container px-4 sm:px-6 ">
            <h2 className="font-montserrat mb-4 text-[28px] font-bold leading-none text-[#61ce70] sm:text-[36px] lg:text-[42px]">
              Reach Our Experts For Support
            </h2>
            <p className="font-roboto mb-12 text-[16px] font-normal leading-6 text-[#212121]">
              Experience the thrill of riding our electric bikes firsthand. Book your test ride
              today and feel the power and innovation in every journey!
            </p>
            <div className="w-full overflow-hidden rounded-[12px]">
              <iframe
                src={BOOKING_IFRAME}
                title="Book a test ride"
                className="min-h-[800px] w-full border-0"
                loading="lazy"
                allow="fullscreen"
              />
            </div>
          </div>
        </section>

        {/* Expect + 5 Reasons */}
        <section className="bg-[#fcfcfc] py-[50px]">
          <div className="mx-auto grid w-full max-w-container grid-cols-1 gap-[22px] px-4 sm:px-6 lg:grid-cols-2">
            <SparkCard
              title="What to Expect During Your Test Ride"
              intro="During your ELFA test ride, you’ll:"
              items={expectItems}
              footer={
                <p className="font-roboto mt-4 text-[15px] font-bold text-white">
                  Book test ride electric bike Pakistan for a complete experience!
                </p>
              }
            />
            <SparkCard
              title="5 Reasons to Try ELFA Electric Bikes Today"
              items={reasonItems}
            />
          </div>
        </section>

        <JoinRevolutionCTA />

        <Marquee />
      </main>
      <Footer />
    </>
  );
}
