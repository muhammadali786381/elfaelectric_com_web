import type { Metadata } from "next";
import { Phone, MapPin } from "lucide-react";
import SecondaryHero from "@/components/sections/SecondaryHero";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "ELFA Certified Mechanics | Electric Bike Service Pakistan",
  description:
    "Find your nearest ELFA certified mechanic for genuine electric bike service and repairs.",
};

/** Scraped from https://elfaelectric.com/elfa-certified-mechanics/ */
const mechanics = [
  {
    name: "Rasheed Uncle Autos",
    phones: ["+92 321 822 1656", "+92 333 366 7239"],
    location: "Up Mor (Nagan Chowrangi)",
  },
  {
    name: "Tanveer Autos",
    phones: ["+92 315 268 6789"],
    location: "North Karachi near Midasia School",
  },
  {
    name: "Khan Autos",
    phones: ["+92 311 258 5369"],
    location: "North Karachi near 5C4",
  },
  {
    name: "Ikram Autos",
    phones: ["+92 303 218 6032", "+92 321 822 1656"],
    location: "Manghopir near New Nazimabad",
  },
  {
    name: "Ubaid Autos",
    phones: ["+92 316 181 0951"],
    location: "Gulshan near 13-D Bike Market",
  },
  {
    name: "Adnan Autos",
    phones: ["+92 300 338 4058"],
    location: "2K Chowrangi, near Surjani",
  },
  {
    name: "Godo Mechanic",
    phones: ["+92 300 227 7034"],
    location: "Peoples Chowrangi, Buffer Zone, Karachi",
  },
  {
    name: "Islam Autos",
    phones: ["+92 311 250 1672"],
    location: "Korangi 5, Sector E",
  },
];

function mapsUrl(location: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location}, Karachi`)}`;
}

export default function CertifiedMechanicsPage() {
  return (
    <>
      <main className="flex-1">
        <SecondaryHero
          titleLine1="Certified"
          titleLine2="Mechanics"
          description="Find your nearest ELFA certified mechanic for genuine electric bike service and repairs across Pakistan."
          imageSrc="/assets/images/hero4.jpeg"
          imageAlt="ELFA Certified Mechanics"
        />

        <section className="bg-[#050505] py-16 lg:py-24">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <h2 className="font-montserrat mb-8 text-left text-[36px] font-black italic uppercase tracking-tight text-white sm:mb-10 sm:text-[48px] lg:text-[64px]">
              Our <span className="text-brand-primary">Network</span>
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-8">
              {mechanics.map((m, i) => (
                <FadeIn
                  key={m.name}
                  variant="fadeInUp"
                  speed="normal"
                  delay={Math.floor(i / 3) * 0.1}
                  className="group flex flex-col"
                >
                  <h3 className="font-montserrat relative mb-2 w-fit pt-3 text-[22px] font-bold uppercase leading-tight tracking-tight text-white transition-colors group-hover:text-brand-primary sm:text-[24px]">
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-px w-[120%] bg-white/20 transition-colors group-hover:bg-brand-primary"
                    />
                    {m.name}
                  </h3>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-start gap-2.5">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" strokeWidth={2.5} />
                      <div className="font-roboto flex flex-col gap-0.5 text-[15px] font-medium leading-snug text-white/70 sm:text-[16px]">
                        {m.phones.map((p) => (
                          <a
                            key={p}
                            href={`tel:${p.replace(/\s/g, "")}`}
                            className="transition-colors hover:text-white"
                          >
                            {p}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" strokeWidth={2.5} />
                      <a
                        href={mapsUrl(m.location)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-roboto text-[15px] leading-snug text-white/70 underline underline-offset-2 transition-colors hover:text-brand-primary sm:text-[16px]"
                      >
                        {m.location}
                      </a>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
