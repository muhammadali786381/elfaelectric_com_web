"use client";

import { useRef } from "react";
import Image from "next/image";

const cities = [
  { name: "Karachi", icon: "/assets/images/slidericons/karachi.png" },
  { name: "Hyderabad", icon: "/assets/images/slidericons/hyderabad.png" },
  { name: "Lahore", icon: "/assets/images/slidericons/lahore.png" },
  { name: "Rawalpindi", icon: "/assets/images/slidericons/rawalpindi.png" },
  { name: "Peshawar", icon: "/assets/images/slidericons/peshawar.png" },
  { name: "Sahiwal", icon: "/assets/images/slidericons/sahiwal.png" },
  { name: "Rahimyar Khan", icon: "/assets/images/slidericons/rahim-yar-khan.png" },
];

export default function CityMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (marqueeRef.current) {
      marqueeRef.current.getAnimations({ subtree: true }).forEach((anim) => {
        anim.playbackRate = 0.2;
      });
    }
  };

  const handleMouseLeave = () => {
    if (marqueeRef.current) {
      marqueeRef.current.getAnimations({ subtree: true }).forEach((anim) => {
        anim.playbackRate = 1;
      });
    }
  };

  return (
    <section className="overflow-hidden border-b border-white/5 bg-[#050505] py-8 lg:py-12">
      <div
        className="mx-auto w-full max-w-[1400px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={marqueeRef} className="flex w-max animate-marquee">
          {[0, 1, 2, 3].map((dup) => (
            <div
              key={dup}
              className="flex w-max shrink-0 items-center justify-around px-4"
            >
              {cities.map((city) => (
                <span
                  key={`${dup}-${city.name}`}
                  className="flex items-center gap-3 px-6 lg:gap-4 lg:px-12"
                >
                  <span className="relative flex h-11 w-11 shrink-0  sm:h-16 sm:w-16">
                    <Image
                      src={city.icon}
                      alt=""
                      fill
                      className="object-contain brightness-0 invert opacity-80"
                      sizes="64px"
                    />
                  </span>
                  <span className="font-montserrat whitespace-nowrap text-[20px] font-bold uppercase tracking-[2px] text-text-inverse/40 transition-colors hover:text-text-inverse sm:text-[24px] lg:text-[30px]">
                    {city.name}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
