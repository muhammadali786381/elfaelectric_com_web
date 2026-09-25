"use client";

import Image from "next/image";
import type { ProductCoreFeature } from "@/data/products/types";
import { motion } from "motion/react";

type Props = {
  features: ProductCoreFeature[];
  centerImage: string;
  productName: string;
};

function FeatureCard({ 
  feature, 
  align = "left",
  index = 0
}: { 
  feature: ProductCoreFeature, 
  align?: "left" | "right" | "center",
  index?: number
}) {
  const isRightSide = align === "left"; // Text aligns left -> it's placed on the right side of the bike
  const isLeftSide = align === "right"; // Text aligns right -> it's placed on the left side of the bike
  
  // They emerge from the bike, so left items come from right (+x), right items come from left (-x)
  const initialX = isRightSide ? -60 : isLeftSide ? 60 : 0;
  const initialY = align === "center" ? 40 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, y: initialY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1], 
        delay: index * 0.15 
      }}
      className={`group flex flex-col gap-2 ${
        align === "right" ? "items-end text-right" : align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
    >
      <div className="relative h-10 w-10 shrink-0 transition-transform duration-500 group-hover:scale-110 sm:h-12 sm:w-12">
        <Image src={feature.icon} alt="" fill className="object-contain" sizes="48px" />
      </div>
      <div>
        <h3 className="font-montserrat text-[20px] font-bold leading-tight text-white sm:text-[24px]">
          {feature.title}
        </h3>
        <p className="font-roboto mt-2 max-w-[280px] text-[15px] font-normal leading-relaxed text-white/60">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ProductCoreFeatures({ features, centerImage, productName }: Props) {
  const left = features.slice(0, 3);
  const right = features.slice(3, 6);

  return (
    <section className="relative w-full overflow-hidden bg-[#050505] py-24 lg:py-32">
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6">
        
        <div className="mb-20 flex flex-col items-center justify-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 0.2, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-montserrat text-[40px] font-black italic uppercase leading-[0.9] tracking-tighter text-white sm:text-[56px] lg:text-[80px]"
          >
            Core Features
          </motion.h2>
        </div>

        {/* Desktop: left | bike | right */}
        <div className="hidden items-center lg:grid lg:grid-cols-[1fr_minmax(400px,500px)_1fr] lg:gap-8 xl:gap-16">
          {/* Left Column (aligned right to point at bike) */}
          <div className="flex flex-col gap-16">
            {left.map((f, i) => (
              <FeatureCard key={f.title} feature={f} align="right" index={i} />
            ))}
          </div>

          {/* Center Bike */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto flex h-[500px] w-full items-center justify-center"
          >
            <Image
              src={centerImage}
              alt={productName}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="500px"
              priority
            />
          </motion.div>

          {/* Right Column (aligned left to point at bike) */}
          <div className="flex flex-col gap-16">
            {right.map((f, i) => (
              <FeatureCard key={f.title} feature={f} align="left" index={i} />
            ))}
          </div>
        </div>

        {/* Mobile / Tablet Grid */}
        <div className="flex flex-col gap-16 lg:hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto h-[300px] w-full max-w-[400px] sm:h-[400px]"
          >
            <Image
              src={centerImage}
              alt={productName}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="100vw"
            />
          </motion.div>
          
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {features.map((f, i) => (
              <FeatureCard key={f.title} feature={f} align="center" index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
