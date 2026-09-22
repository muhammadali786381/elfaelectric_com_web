import type { Metadata } from "next";
import { Phone, MapPin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "ELFA Certified Mechanics | Electric Bike Service Pakistan",
  description:
    "Find your nearest ELFA certified mechanic for genuine electric bike service and repairs.",
};

const SPARK =
  "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)";

/** Scraped from https://elfaelectric.com/elfa-certified-mechanics/ */
const mechanics = [
  {
    name: "Rasheed Uncle Autos",
    phones: ["+92 321 822 1656", "+92 333 366 7239"],
    location: "Up mor (Nagan chowrangi)",
  },
  {
    name: "Tanveer Autos",
    phones: ["+92 315 268 6789"],
    location: "North karachi near Midasia school",
  },
  {
    name: "Khan Autos",
    phones: ["+92 311 258 5369"],
    location: "North Karachi near 5c4",
  },
  {
    name: "Ikram Autos",
    phones: ["+92 303 218 6032", "+92 321 822 1656"],
    location: "Mangopeer near Niya nazimabad",
  },
  {
    name: "Ubaid Autos",
    phones: ["+92 316 181 0951"],
    location: "Gulshan near 13 d bike market",
  },
  {
    name: "Adnan Autos",
    phones: ["+92 300 338 4058"],
    location: "2k chowrangi, near Surjani",
  },
  {
    name: "Godo Mechanic",
    phones: ["+92 300 227 7034"],
    location: "Peoples chowrangi, Bufferzone, Karachi",
  },
  {
    name: "Islam Autos",
    phones: ["+92 311 250 1672"],
    location: "Korangi 5 sector e",
  },
];

export default function CertifiedMechanicsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          title="ELFA Certified Mechanics"
          breadcrumb="ELFA Certified Mechanics"
          withBikes
          largeTitle
          backgroundSrc="/assets/images/blog-hero-bg.jpg"
          bikesSrc="/assets/images/blog-page.png"
        />

        <section className="bg-white py-16 lg:py-[70px]">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <h2 className="font-montserrat mb-8 text-[26px] font-bold text-[#212121] sm:text-[30px]">
              ELFA certified Mechanics
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {mechanics.map((m) => (
                <article
                  key={m.name}
                  className="rounded-[20px] border-b-[3px] border-[#61ce70] px-5 py-3 transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
                  style={{ backgroundImage: SPARK }}
                >
                  <h3 className="font-montserrat mb-2 text-[24px] font-bold leading-tight text-white sm:text-[30px]">
                    {m.name}
                  </h3>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#61ce70]/20">
                        <Phone className="h-3.5 w-3.5 text-[#61ce70]" strokeWidth={2} />
                      </span>
                      <div className="font-roboto flex flex-wrap gap-x-1 text-[15px] leading-relaxed text-white">
                        {m.phones.map((p, i) => (
                          <span key={p}>
                            <a
                              href={`tel:${p.replace(/\s/g, "")}`}
                              className="transition-colors hover:text-[#61ce70]"
                            >
                              {p}
                            </a>
                            {i < m.phones.length - 1 && <span className="mx-1">|</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#61ce70]/20">
                        <MapPin className="h-3.5 w-3.5 text-[#61ce70]" strokeWidth={2} />
                      </span>
                      <p className="font-roboto text-[15px] leading-relaxed text-white">{m.location}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
