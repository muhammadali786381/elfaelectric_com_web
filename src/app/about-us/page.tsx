import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import Marquee from "@/components/sections/Marquee";

export const metadata: Metadata = {
  title: "About ELFA Electric – Leading Electric Bike Pakistan",
  description:
    "ELFA Electric, born under EV Technologies at Wavetec, builds sustainable, affordable electric motorcycles engineered for Pakistan's roads.",
};

const SPARK =
  "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)";

const whyChoose = [
  "Best electric bike company in Pakistan with a legacy of 30+ years.",
  "Affordable electric bike options starting at PKR 1/km running cost.",
  "Eco-friendly transport in Pakistan with zero emissions.",
  "EV motorcycle in Pakistan designed for local roads and rider needs.",
  "Sustainable mobility in Pakistan through innovative technology.",
  "Electric scooty in Pakistan for urban commuting.",
  "Comprehensive after-sales support for all electric bikes.",
];

const coreValues = [
  {
    title: (
      <>
        Sustainable
        <br />
        Innovation
      </>
    ),
    desc: "We never stop evolving. Through continuous learning and experimentation, we deliver smart, sustainable solutions that adapt quickly to changing needs and emerging technologies.",
  },
  {
    title: (
      <>
        Unwavering
        <br />
        Trust
      </>
    ),
    desc: "Trust is our foundation. Built on honesty, integrity, and reliability, we promise performance you can count on.",
  },
  {
    title: (
      <>
        Customer
        <br />
        Obsession
      </>
    ),
    desc: "Your journey drives us. We listen closely, understand your needs, and design solutions that fit seamlessly into your life.",
  },
  {
    title: (
      <>
        Equitable
        <br />
        Progress
      </>
    ),
    desc: "We believe progress must be for everyone. That’s why we engineer accessible, fair, and simple solutions that empower people to move forward toward a better future.",
  },
];

export default function AboutUsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title={
            <>
              About{" "}
              <span className="text-[#61CE70]">ELFA Electric Motorcycle</span> Pakistan
              Leading Electric
              <br />
              Bike &amp; Scooty Brand
            </>
          }
          breadcrumb="About us"
          withBikes
          compact
          backgroundSrc="/assets/images/about/about-hero-bg.webp"
          bikesSrc="/assets/images/blog-page.png"
        />

        {/* Who We Are — spark gradient card + scooty */}
        <section className="bg-white py-12 lg:py-[70px]">
          <div className="mx-auto grid w-full max-w-container items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10">
            <div
              className="flex flex-col gap-5 rounded-[10px] border-2 border-[#61ce70] px-5 py-[30px] shadow-[0_0_40px_-20px_rgba(0,0,0,0.5)] sm:px-10 sm:py-[30px] sm:pl-5"
              style={{ backgroundImage: SPARK }}
            >
              <h2 className="font-montserrat text-[28px] font-bold leading-[30px] text-white sm:text-[32px]">
                Who We Are
              </h2>
              <h3 className="font-montserrat text-[28px] font-bold leading-[35px] text-[#61ce70] sm:text-[32px]">
                Welcome to ELFA
              </h3>
              <p className="font-roboto text-[14px] leading-relaxed text-white">
                ELFA Electric, born under EV Technologies at Wavetec, is driven by a passion for
                building an electric future with sustainable, affordable, and innovative solutions
                powered by clean technology.
              </p>
              <p className="font-roboto text-[14px] leading-relaxed text-white">
                At ELFA Electric, we believe that every person and every detail matters. Our electric
                motorcycles are meticulously designed, engineered, and rigorously tested for the local
                rider, using top-quality components. We have studied driving patterns, road
                conditions, and the needs of different types of riders to determine the optimal
                specifications, including the selection of the right motor size, battery, and battery
                management system for our EV motorcycles. This customer-centric approach to developing
                solutions is backed by EV Technologies expertise and Wavetec&apos;s 30-year legacy of
                R&amp;D and technology, which has successfully powered both global and local
                companies.
              </p>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[420px] lg:max-w-none">
              <Image
                src="/assets/images/about/sut.png"
                alt="ELFA EV-1 Scooty"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 420px, 520px"
              />
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="bg-white py-[50px]">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <h2 className="font-montserrat text-center text-[32px] font-bold leading-none text-[#61ce70] sm:text-[44px]">
              Vision &amp; Mission
            </h2>
            <p className="font-montserrat mt-4 text-center text-[24px] font-bold leading-tight text-black sm:mt-5 sm:text-[32px]">
              For a Cleaner, and Brighter Future
            </p>

            <div className="mx-auto mt-10 grid max-w-[900px] gap-6 md:grid-cols-2 md:gap-8">
              <div
                className="rounded-[20px] border-2 border-[#61ce70] p-[30px] text-center shadow-[0_0_20px_-11px_rgba(0,0,0,0.5)]"
                style={{ backgroundImage: SPARK }}
              >
                <h3 className="font-montserrat mb-4 text-[28px] font-bold leading-[35px] text-[#61ce70] sm:text-[35px]">
                  Our Vision
                </h3>
                <p className="font-roboto text-[14px] leading-relaxed text-white">
                  Enable equitable progress through sustainable mobility.
                </p>
              </div>
              <div
                className="rounded-[20px] border-2 border-[#61ce70] p-[30px] text-center shadow-[0_0_20px_-11px_rgba(0,0,0,0.5)]"
                style={{ backgroundImage: SPARK }}
              >
                <h3 className="font-montserrat mb-4 text-[28px] font-bold leading-[35px] text-[#61ce70] sm:text-[35px]">
                  Our Mission
                </h3>
                <p className="font-roboto text-[14px] leading-relaxed text-white">
                  Deliver accessible, smart, and reliable electric solutions that fuel everyday
                  productivity and progress for everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose — bordered card + bike */}
        <section className="bg-white pb-12 pt-4 lg:pb-16">
          <div className="mx-auto grid  w-full max-w-container items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="relative mx-auto aspect-[380/360] w-full max-w-[420px] lg:max-w-none">
              <Image
                src="/assets/images/contact/EV-125-BIKE-1.png"
                alt="ELFA EV-125 Bike"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 420px, 520px"
              />
            </div>
            <div
              className="rounded-[10px] border-2 border-[#61ce70] px-5 py-[30px] pb-10 shadow-[0_0_40px_-20px_rgba(0,0,0,0.5)] sm:px-5"
              style={{ backgroundImage: SPARK }}
            >
              <h2 className="font-montserrat mb-6 text-[26px] font-bold leading-tight text-[#61ce70] sm:text-[32px]">
                Why Choose ELFA Electric Bikes &amp; Scooty?
              </h2>
              <ul className="flex flex-col gap-3">
                {whyChoose.map((item) => (
                  <li
                    key={item}
                    className="font-roboto flex items-start gap-3 text-[14px] leading-relaxed text-white"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#61ce70]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-white py-12 lg:py-16">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <h2 className="font-montserrat mb-10 text-center text-[28px] font-bold text-black sm:text-[32px]">
              Core Values
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {coreValues.map(({ title, desc }) => (
                <div
                  key={desc.slice(0, 24)}
                  className="rounded-[20px] border-2 border-[#61ce70] p-[15px] text-center shadow-[0_0_20px_-11px_rgba(0,0,0,0.5)]"
                  style={{ backgroundImage: SPARK }}
                >
                  <h3 className="font-montserrat mb-3 text-[15px] font-bold uppercase leading-[15px] text-white">
                    {title}
                  </h3>
                  <p className="font-roboto text-[13px] leading-relaxed text-white/85">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join CTA — spark */}
        <section className="bg-white py-8 lg:py-12">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <div
              className="rounded-[15px] px-6 py-10 text-center sm:px-10 sm:py-[40px]"
              style={{ backgroundImage: SPARK }}
            >
              <h2 className="font-montserrat mb-4 text-[28px] font-bold leading-tight text-[#fcfcfc] sm:text-[36px] lg:text-[42px] lg:leading-[42px]">
                Join Pakistan&apos;s Electric Bike Revolution Today
              </h2>
              <p className="font-roboto mx-auto mb-8 max-w-[720px] text-[14px] leading-relaxed text-white/90 sm:text-[15px]">
                Boost-up your adventure with an E-Vehicle! Enjoy every ride like never before. Our
                powerful, eco-friendly E-Vehicles offer smooth, exciting drives—perfect for city trips
                or outdoor adventures. Take your journey to the next level with ELFA Electric—the best
                electric bike company in Pakistan.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/book-a-test-ride"
                  className="font-roboto inline-flex items-center rounded-[3px] bg-[#61ce70] px-6 py-3 text-[14px] font-semibold uppercase tracking-[1px] text-white transition-colors hover:bg-[#4fbf5f]"
                >
                  Book a Test Ride
                </Link>
                <Link
                  href="/ev-125"
                  className="font-roboto inline-flex items-center rounded-[3px] bg-[#61ce70] px-6 py-3 text-[14px] font-semibold uppercase tracking-[1px] text-white transition-colors hover:bg-[#4fbf5f]"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Marquee />
      </main>
      <Footer />
    </>
  );
}
