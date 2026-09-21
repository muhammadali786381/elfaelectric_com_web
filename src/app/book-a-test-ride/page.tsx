import type { Metadata } from "next";
import { Gauge, MapPinned, ShieldCheck, Wallet, Leaf } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";
import PavePromo from "@/components/sections/PavePromo";

export const metadata: Metadata = {
  title: "Book a Test Ride – Experience ELFA Electric Bike & Scooty in Pakistan",
  description: "Book a free test ride of the ELFA EV-125 or EV-1 Scooty at a dealership near you.",
};

const reasons = [
  { icon: Gauge, title: "Powerful Performance", desc: "Instant torque and smooth acceleration on every ride." },
  { icon: MapPinned, title: "Long Range", desc: "Up to 100+ km on a single charge." },
  { icon: ShieldCheck, title: "Smart Features", desc: "App tracking, kill switch, and real-time diagnostics." },
  { icon: Wallet, title: "Affordable", desc: "Running cost of roughly PKR 1 per kilometre." },
  { icon: Leaf, title: "Eco-Friendly", desc: "Zero tailpipe emissions, cleaner commutes." },
];

const locations = [
  { city: "Karachi", areas: "DHA Phase 8, Gulshan-e-Iqbal, Saddar" },
  { city: "Hyderabad", areas: "Jamshoro Road" },
  { city: "Lahore", areas: "Shalamar Link Road" },
];

export default function BookTestRidePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="Book a Test Ride — Experience ELFA Electric Bike & Scooty"
          subtitle="Feel the difference of electric riding firsthand. Schedule a free test ride at a dealership near you."
          breadcrumb="Book a Test Ride"
        />

        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr]">
              {/* Form */}
              <div>
                <h2 className="font-montserrat mb-6 text-[24px] font-bold text-[#212121] sm:text-[28px]">
                  Schedule Your Test Ride
                </h2>
                <form className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      className="font-roboto h-[48px] w-full rounded-[6px] border border-gray-300 px-4 text-[15px] outline-none focus:border-[#61ce70]"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      className="font-roboto h-[48px] w-full rounded-[6px] border border-gray-300 px-4 text-[15px] outline-none focus:border-[#61ce70]"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="font-roboto h-[48px] w-full rounded-[6px] border border-gray-300 px-4 text-[15px] outline-none focus:border-[#61ce70]"
                  />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <select
                      required
                      defaultValue=""
                      className="font-roboto h-[48px] w-full rounded-[6px] border border-gray-300 px-4 text-[15px] text-[#212121] outline-none focus:border-[#61ce70]"
                    >
                      <option value="" disabled>
                        Select Model
                      </option>
                      <option value="ev-125">EV-125 Bike</option>
                      <option value="ev-1">EV-1 Scooty</option>
                    </select>
                    <input
                      type="date"
                      required
                      className="font-roboto h-[48px] w-full rounded-[6px] border border-gray-300 px-4 text-[15px] text-[#212121] outline-none focus:border-[#61ce70]"
                    />
                  </div>
                  <select
                    required
                    defaultValue=""
                    className="font-roboto h-[48px] w-full rounded-[6px] border border-gray-300 px-4 text-[15px] text-[#212121] outline-none focus:border-[#61ce70]"
                  >
                    <option value="" disabled>
                      Preferred Dealership
                    </option>
                    <option value="karachi-dha">Karachi — DHA Phase 8</option>
                    <option value="karachi-gulshan">Karachi — Gulshan-e-Iqbal</option>
                    <option value="karachi-saddar">Karachi — Saddar</option>
                    <option value="hyderabad">Hyderabad — Jamshoro Road</option>
                    <option value="lahore">Lahore — Shalamar Link Road</option>
                  </select>
                  <button
                    type="submit"
                    className="font-roboto mt-2 inline-flex h-[48px] items-center justify-center rounded-[6px] bg-[#61ce70] text-[15px] font-semibold uppercase tracking-[1px] text-white transition-colors hover:bg-[#4fbf5f]"
                  >
                    Book Now
                  </button>
                </form>
              </div>

              {/* Why book / what to expect */}
              <div>
                <h2 className="font-montserrat mb-6 text-[24px] font-bold text-[#212121] sm:text-[28px]">
                  Why Book a Test Ride with ELFA?
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {reasons.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#61ce70]/10 text-[#61ce70]">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h3 className="font-montserrat text-[15px] font-bold text-[#212121]">{title}</h3>
                        <p className="font-roboto text-[13px] leading-relaxed text-gray-500">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="font-montserrat mb-4 mt-10 text-[19px] font-bold text-[#212121]">
                  What to Expect
                </h3>
                <p className="font-roboto text-[14px] leading-relaxed text-gray-600">
                  A quick safety briefing, a chance to try each riding mode, and a walkthrough of the
                  smart app features — all guided by our team at your chosen dealership.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f5f5] py-16 lg:py-20">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <h2 className="font-montserrat mb-8 text-[24px] font-bold text-[#212121] sm:text-[28px]">
              Test Ride Locations
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {locations.map((l) => (
                <div key={l.city} className="rounded-[12px] bg-white p-6 shadow-sm">
                  <h3 className="font-montserrat mb-1 text-[17px] font-bold text-[#212121]">{l.city}</h3>
                  <p className="font-roboto text-[14px] text-gray-500">{l.areas}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PavePromo />
      </main>
      <Footer />
    </>
  );
}
