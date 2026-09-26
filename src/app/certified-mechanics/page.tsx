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
            <main className="flex-1">
        <SecondaryHero
          titleLine1="Certified"
          titleLine2="Mechanics"
          description="Find your nearest ELFA certified mechanic for genuine electric bike service and repairs across Pakistan."
          imageSrc="/assets/images/hero4.jpeg"
          imageAlt="ELFA Certified Mechanics"
        />

        <section className="bg-[#050505] py-20 lg:py-32">
          <div className="mx-auto w-full max-w-container px-4 sm:px-6">
            <h2 className="font-montserrat mb-16 text-center text-[36px] font-black italic uppercase tracking-tight text-white sm:text-[48px] lg:text-left lg:text-[64px]">
              Our <span className="text-brand-primary">Network</span>
            </h2>
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:gap-16">
              {mechanics.map((m, i) => (
                <FadeIn
                  key={m.name}
                  variant="fadeInUp"
                  speed="normal"
                  delay={Math.floor(i / 3) * 0.1}
                  className="group flex flex-col justify-between border-t-2 border-white/10 pt-6 transition-colors hover:border-brand-primary"
                >
                  <div>
                    <h3 className="font-montserrat mb-8 text-[24px] font-bold uppercase leading-tight tracking-tight text-white transition-colors group-hover:text-brand-primary sm:text-[26px]">
                      {m.name}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="flex items-start gap-4">
                      <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" strokeWidth={2.5} />
                      <div className="font-roboto flex flex-col gap-1.5 text-[16px] font-medium leading-snug text-white/70 sm:text-[18px]">
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
                    <div className="flex items-start gap-4">
                      <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-primary" strokeWidth={2.5} />
                      <p className="font-roboto text-[16px] leading-relaxed text-white/70 sm:text-[18px]">{m.location}</p>
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
