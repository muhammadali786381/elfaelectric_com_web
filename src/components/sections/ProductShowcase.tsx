"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

const icons = {
  battery: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="6" width="14" height="12" rx="2" />
      <path d="M22 10v4" />
      <path d="M11 9l-2 4h3l-1 3" />
    </svg>
  ),
  speed: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21a9 9 0 1 0-9-9" />
      <path d="M12 12l2.5-2.5" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  ),
  motor: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  road: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22L10 2" />
      <path d="M20 22L14 2" />
      <path d="M12 22v-4" />
      <path d="M12 14v-4" />
      <path d="M12 6V2" />
    </svg>
  ),
};

const products = [
  {
    id: "ev125",
    type: "ELECTRIC MOTORCYCLE",
    name: "EV-125 Bike",
    image: "/assets/images/products/newproductshwbike.png",
    specs: [
      { value: "72V / 30Ah", label: "BATTERY", icon: "battery" as keyof typeof icons },
      { value: "75 km/h", label: "TOP SPEED", icon: "speed" as keyof typeof icons },
      { value: "2,000 W", label: "MOTOR POWER", icon: "motor" as keyof typeof icons },
      { value: "100+ km", label: "RANGE", icon: "road" as keyof typeof icons },
    ],
    oldPrice: "PKR 345,000",
    price: "PKR 335,000",
    savings: "Save PKR 10,000",
    exploreHref: "/ev-125",
    buyHref: "/book-a-test-ride",
  },
  {
    id: "ev1",
    type: "ELECTRIC SCOOTER",
    name: "EV-1 Scooty",
    image: "/assets/images/products/newproductshwscooty.png",
    specs: [
      { value: "64V / 30Ah", label: "BATTERY", icon: "battery" as keyof typeof icons },
      { value: "60 km/h", label: "TOP SPEED", icon: "speed" as keyof typeof icons },
      { value: "1,500 W", label: "MOTOR POWER", icon: "motor" as keyof typeof icons },
      { value: "75 km", label: "RANGE", icon: "road" as keyof typeof icons },
    ],
    oldPrice: "PKR 270,000",
    price: "PKR 260,000",
    savings: "Save PKR 10,000",
    exploreHref: "/scooty-ev-1",
    buyHref: "/book-a-test-ride",
  },
];

export default function ProductShowcase() {
  return (
    <section className="bg-[#050505] py-16 lg:py-20 flex flex-col justify-center">
      <FadeIn variant="fadeInUp" speed="slow">
        {/* Header Area */}
        <div className="mx-auto w-full max-w-[1300px] px-4 sm:px-6 mb-8 lg:mb-10">
          <p className="font-roboto mb-2 text-[10px] font-bold uppercase tracking-[3px] text-brand-primary">
            THE ELFA LINEUP
          </p>
          <h2 className="font-montserrat mb-1 text-[32px] font-bold leading-tight text-white sm:text-[40px] lg:text-[48px]">
            Find your electric ride.
          </h2>
          <p className="font-roboto text-[14px] font-medium text-white/50 sm:text-[16px]">
            Two ways to move. One electric future.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {products.map((product) => (
              <article
                key={product.id}
                className="flex flex-col relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#050505]"
              >
                {/* Top Section */}
                <div className="px-6 sm:px-10 pt-8 sm:pt-10">
                  {/* Top Labels */}
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-roboto text-[10px] font-bold uppercase tracking-[2px] text-white/50">
                      {product.type}
                    </p>
                    <div className="rounded-full border border-brand-primary/40 px-3 py-1 text-[11px] font-bold text-brand-primary">
                      {product.savings}
                    </div>
                  </div>

                  {/* Product Name */}
                  <h3 className="font-montserrat mb-2 text-[32px] font-bold text-white sm:text-[40px]">
                    {product.name}
                  </h3>
                </div>

                {/* Product Image - Full Bleed */}
                <div className="relative w-full h-[260px] sm:h-[340px] lg:h-[400px]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>

                {/* Bottom Section */}
                <div className="flex flex-1 flex-col px-6 sm:px-10 pb-8 sm:pb-10">
                  {/* Specifications */}
                  <div className="mb-10 grid grid-cols-4 divide-x divide-white/10 pt-4">
                    {product.specs.map((spec) => {
                      const Icon = icons[spec.icon];
                      return (
                        <div key={spec.label} className="flex flex-col items-center text-center px-1 sm:px-2">
                          <div className="mb-3 text-white/60">
                            <Icon />
                          </div>
                          <p className="font-montserrat mb-1 text-[12px] sm:text-[14px] font-bold text-white">
                            {spec.value}
                          </p>
                          <p className="font-roboto text-[9px] sm:text-[10px] font-semibold tracking-[1px] uppercase text-white/40">
                            {spec.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Price and Action Buttons */}
                  <div className="mt-auto flex flex-col gap-6">
                    {/* Price Block */}
                    <div>
                      <div className="relative mb-1 inline-block">
                        <span className="font-montserrat text-[14px] font-medium text-white/40">
                          {product.oldPrice}
                        </span>
                        {/* Red Strike */}
                        <div className="absolute inset-x-0 top-[45%] h-px w-[110%] -left-[5%] -rotate-6 bg-red-500" />
                      </div>
                      <div className="font-montserrat text-[32px] sm:text-[38px] font-bold leading-none text-white">
                        {product.price}{" "}
                        <span className="ml-1 text-[13px] font-medium text-white/40">
                          + tax
                        </span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                      <Link
                        href={product.exploreHref}
                        className="inline-flex h-[44px] items-center justify-center gap-2 rounded-full bg-[#00FF85] px-6 text-[14px] font-bold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Explore model <ArrowRight className="h-4 w-4" />
                      </Link>

                      <Link
                        href={product.buyHref}
                        className="group inline-flex items-center gap-2 text-[13px] font-bold text-white transition-colors hover:text-white/80"
                      >
                        <span className="border-b border-white pb-0.5 group-hover:border-white/80">
                          Book a test ride
                        </span>
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
