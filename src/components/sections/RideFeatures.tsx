"use client";

import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";

const features = [
  {
    title: "Digital LED Meter",
    desc: "Engaging LED display showing speed modes, battery alerts, and kilometers covered.",
    image: "/assets/images/metter.webp",
  },
  {
    title: "Disc Brake",
    desc: "Reliable brakes that ensure smooth stopping, with enhanced stability for a safe ride every time.",
    image: "/assets/images/Disc-Brake.png",
  },
  {
    title: "Superior Performance Tyres",
    desc: "Tyres that guarantee stability, smooth handling, and optimal ground clearance.",
    image: "/assets/images/bike-t.webp",
  },
  {
    title: "Water Resistant Battery",
    desc: "Protects the battery from water and allowing you to ride confidently in the rain.",
    image: "/assets/images/batter-1.webp",
  },
];

export default function RideFeatures() {
  return (
    <section className="bg-bg-primary py-16 lg:py-20">
      <FadeIn variant="fadeIn" speed="slow">
        <h2 className="font-montserrat mb-10 text-center text-[32px] font-bold leading-tight text-text-primary sm:text-[40px] lg:text-[50px]">
          Features to Make Your Ride
          <br />
          Smoother and Comfortable
        </h2>

        <div className="mx-auto grid w-full max-w-container grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="relative flex h-[330px] flex-col justify-end overflow-hidden rounded-[19px] border-[3px] border-brand-primary bg-bg-inverse p-6"
            >
              <Image
                src={f.image}
                alt={f.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-inverse via-black/70 to-transparent" />
              <h3 className="font-montserrat relative z-10 mb-2 text-center text-[18px] font-bold text-text-inverse">
                {f.title}
              </h3>
              <p className="font-roboto relative z-10 text-center text-[14px] leading-relaxed text-text-inverse/75">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
