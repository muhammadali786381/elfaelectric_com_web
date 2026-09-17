import Image from "next/image";
import { Zap } from "lucide-react";

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

function List({ items, align }: { items: typeof whyChooseUs; align: "left" | "right" }) {
  return (
    <div className={`flex flex-col gap-8 ${align === "right" ? "sm:items-end sm:text-right" : ""}`}>
      {items.map((item) => (
        <div key={item.label}>
          <p className={`font-roboto mb-1.5 flex items-center gap-2 text-[16px] text-[#212121] ${align === "right" ? "sm:flex-row-reverse" : ""}`}>
            <Zap className="h-4 w-4 shrink-0 fill-[#61ce70] text-[#61ce70]" />
            <span className="font-semibold">{item.label}</span>
          </p>
          <p className="font-roboto text-[15px] leading-relaxed text-[#212121]/75">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1150px] px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr_1fr]">
          <div>
            <h3 className="font-montserrat mb-8 text-[24px] font-bold text-[#61ce70] sm:text-[26px]">
              Why choose us
            </h3>
            <List items={whyChooseUs} align="left" />
          </div>

          <div className="flex justify-center">
            <Image
              src="/assets/images/sut.webp"
              alt="ELFA EV-1 Scooty"
              width={514}
              height={538}
              className="h-auto w-full max-w-[560px] object-contain"
            />
          </div>

          <div>
            <h3 className="font-montserrat mb-8 text-[24px] font-bold text-[#61ce70] sm:text-right sm:text-[26px]">
              What sets us apart
            </h3>
            <List items={whatSetsUsApart} align="right" />
          </div>
        </div>
      </div>
    </section>
  );
}
