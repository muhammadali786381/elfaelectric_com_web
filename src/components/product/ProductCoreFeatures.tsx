"use client";

import Image from "next/image";
import type { ProductCoreFeature } from "@/data/products/types";
import { motion } from "motion/react";

type Props = {
  features: ProductCoreFeature[];
  centerImage: string;
  productName: string;
};

function ColorizedValue({ text }: { text: string }) {
  // Known green parts from screenshot
  const regex = /(W|30Ah|km\/h|km|hours|-frame)/g;
  const parts = text.split(regex);
  
  return (
    <span className="font-montserrat text-[28px] sm:text-[36px] xl:text-[40px] font-black leading-none text-white tracking-tight whitespace-nowrap">
      {parts.map((part, i) => 
        regex.test(part) ? (
          <span key={i} className="text-[#00E573]">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

export default function ProductCoreFeatures({ features, centerImage, productName }: Props) {
  return (
    <section className="relative w-full overflow-hidden bg-[#050505] py-24 lg:py-32">
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6">
        
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-16 xl:gap-24">
          
          {/* Left Bike Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[45%] xl:w-[40%] relative h-[350px] sm:h-[450px] lg:h-[600px] flex items-center justify-center shrink-0"
          >
            {/* Soft glow behind the bike */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />

            <Image
              src={centerImage}
              alt={productName}
              fill
              className="object-contain object-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] scale-110 lg:scale-[1.15]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>

          {/* Right Content */}
          <div className="w-full lg:w-[55%] xl:w-[60%] flex flex-col items-center lg:items-start text-center lg:text-left pt-8 lg:pt-0">
            
            {/* Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-montserrat text-[40px] sm:text-[50px] xl:text-[60px] font-black uppercase leading-[1.1] tracking-tight text-white mb-10 sm:mb-12 whitespace-nowrap"
            >
              CORE FEATURES
            </motion.h2>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-x-4 sm:gap-x-10 xl:gap-x-16 gap-y-10 sm:gap-y-12 w-full">
              {features.map((feature, i) => {
                const [val, sub] = feature.description.split("\n");
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center lg:items-start"
                  >
                    <span className="font-roboto text-[14px] sm:text-[16px] font-medium text-white/50 mb-1 sm:mb-2">
                      {feature.title}
                    </span>
                    <ColorizedValue text={val} />
                    {sub && (
                      <span className="font-roboto text-[13px] sm:text-[15px] text-white/40 mt-1 sm:mt-2">
                        {sub}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
