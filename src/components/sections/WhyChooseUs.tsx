"use client";

import Image from "next/image";
import { Zap } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

const whyChooseUs = [
  {
    label: "Advanced Technology:",
    desc: "Powered by a Lithium Iron Phosphate (LiFePO4) battery, efficient motor power and higher battery capacity for superior performance.",
  },
  {
    label: "Affordable Excellence:",
    desc: "Incorporated with latest features, all at an accessible price, delivering exceptional bike riding experience.",
  },
  {
    label: "Customer-Centric Service:",
    desc: "Providing support and assistance at every stage of your journey to meet and exceed your expectations.",
  },
];

const whatSetsUsApart = [
  {
    label: "Reliable and Safe:",
    desc: "Built-in app allows you to track your bike's location, and a button to shut your engine, ensuring security and peace of mind.",
  },
  {
    label: "Budget-Friendly:",
    desc: "Enjoy eco-friendly electric biking solutions that are easy on both the environment and your wallet.",
  },
  {
    label: "Easy and Simple:",
    desc: "Features like reverse mode, a digital meter, and a convenient 8A charger provide fast charging in just 2 hours.",
  },
];

function List({ items }: { items: typeof whyChooseUs }) {
  return (
    <div className="flex flex-col gap-6">
      {items.map((item) => (
        <div key={item.label}>
          <p className="font-roboto mb-1.5 flex items-start gap-2 text-left text-[18px] font-semibold leading-snug text-[#212121]">
            <Zap className="mt-0.5 h-4 w-4 shrink-0 fill-[#61ce70] text-[#61ce70]" />
            <span>{item.label}</span>
          </p>
          <p className="font-roboto pl-6 text-left text-[16px] font-normal leading-[1.55] text-[#212121]">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Scooty fades in — copy stays static. Layout matches live elfaelectric.com. */
export default function WhyChooseUs() {
  return (
    <section className="bg-white pb-16 lg:pb-20">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6">
        {/*
          Ref @1280: cols ~276px | image 514×538 | cols ~276px
          Both columns left-aligned (including “What sets us apart”).
        */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_514px_minmax(0,1fr)] lg:gap-8 xl:gap-10">
          <div className="max-w-[276px] justify-self-start lg:max-w-none">
            <h3 className="font-montserrat mb-6 text-left text-[24px] font-bold text-[#61ce70] sm:text-[26px]">
              Why choose us
            </h3>
            <List items={whyChooseUs} />
          </div>

          <FadeIn variant="fadeIn" speed="slow" className="flex justify-center">
            <Image
              src="/assets/images/sut.webp"
              alt="ELFA EV-1 Scooty"
              width={514}
              height={538}
              className="h-auto w-full max-w-[514px] object-contain"
              sizes="(max-width: 1024px) 80vw, 514px"
            />
          </FadeIn>

          <div className="max-w-[276px] justify-self-start lg:max-w-none">
            <h3 className="font-montserrat mb-6 text-left text-[24px] font-bold text-[#61ce70] sm:text-[26px]">
              What sets us apart
            </h3>
            <List items={whatSetsUsApart} />
          </div>
        </div>
      </div>
    </section>
  );
}
