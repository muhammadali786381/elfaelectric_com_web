"use client";

import React from "react";
import Image from "next/image";
import { Zap, Shield, Cpu } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

const whyChooseUs = [
  {
    icon: Cpu,
    label: "Advanced Technology",
    desc: "Powered by a Lithium Iron Phosphate (LiFePO4) battery, efficient motor power and higher battery capacity for superior performance.",
  },
  {
    icon: Zap,
    label: "Affordable Excellence",
    desc: "Incorporated with latest features, all at an accessible price, delivering exceptional bike riding experience.",
  },
  {
    icon: Shield,
    label: "Customer-Centric Service",
    desc: "Providing support and assistance at every stage of your journey to meet and exceed your expectations.",
  },
];

const whatSetsUsApart = [
  {
    icon: Shield,
    label: "Reliable and Safe",
    desc: "Built-in app allows you to track your bike's location, and a button to shut your engine, ensuring security and peace of mind.",
  },
  {
    icon: Zap,
    label: "Budget-Friendly",
    desc: "Enjoy eco-friendly electric biking solutions that are easy on both the environment and your wallet.",
  },
  {
    icon: Cpu,
    label: "Easy and Simple",
    desc: "Features like reverse mode, a digital meter, and a convenient 8A charger provide fast charging in just 2 hours.",
  },
];

function FeatureItem({
  item,
}: {
  item: { icon: React.ElementType; label: string; desc: string };
}) {
  const Icon = item.icon;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/10">
        <Icon className="h-5 w-5 text-brand-primary" strokeWidth={1.5} />
      </div>
      <h4 className="font-roboto text-[15px] font-semibold text-white">
        {item.label}
      </h4>
      <p className="font-roboto text-[13px] leading-[1.65] text-white/60">
        {item.desc}
      </p>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-bg-primary py-16 lg:py-24">
      {/* Full-section background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/sut.webp"
          alt="ELFA Scooty"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Very dark overlay so text is readable */}
        <div className="absolute inset-0 bg-bg-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-transparent to-bg-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,8,10,0.85)_100%)]" />
      </div>

      {/* Content overlaid on top */}
      <div className="relative z-10 mx-auto w-full max-w-container px-4 sm:px-6">
        
        {/* Heading */}
        <FadeIn variant="fadeIn" speed="slow" className="mb-16">
          <div className="text-center">
            <p className="font-roboto mb-3 text-[12px] font-semibold uppercase tracking-[2px] text-brand-primary">
              Built Different
            </p>
            <h2 className="font-montserrat text-[28px] font-bold text-white sm:text-[36px] lg:text-[44px]">
              Why Choose <span className="text-brand-primary">ELFA?</span>
            </h2>
          </div>
        </FadeIn>

        {/* Why Choose Us Grid */}
        <FadeIn variant="fadeIn" speed="slow">
          <div className="mb-12">
            <h3 className="font-montserrat mb-8 text-center text-[18px] font-bold uppercase tracking-[2px] text-brand-primary sm:text-left">
              Why Choose Us
            </h3>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {whyChooseUs.map((item) => (
                <FeatureItem key={item.label} item={item} />
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Divider */}
        <div className="mb-12 h-px w-full bg-white/[0.12]" />

        {/* What Sets Us Apart Grid */}
        <FadeIn variant="fadeIn" speed="slow">
          <div>
            <h3 className="font-montserrat mb-8 text-center text-[18px] font-bold uppercase tracking-[2px] text-brand-primary sm:text-left">
              What Sets Us Apart
            </h3>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {whatSetsUsApart.map((item) => (
                <FeatureItem key={item.label} item={item} />
              ))}
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
