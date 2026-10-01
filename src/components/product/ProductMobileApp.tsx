"use client";

import Image from "next/image";
import type { ProductAdvancedFeature } from "@/data/products/types";
import { STORE_BADGES } from "@/data/products/types";
import { motion } from "motion/react";

export default function ProductMobileApp({
  feature,
}: {
  feature: ProductAdvancedFeature;
}) {
  return (
    <section className="bg-[#050505] py-24 lg:py-32 overflow-hidden border-t border-white/5">
      <div className="mx-auto w-full max-w-[1300px] px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">

          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col items-start lg:pr-10 order-2 lg:order-1"
          >
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3 text-[16px] font-medium tracking-wide text-white">
              <div className="h-2 w-2 rounded-full bg-white" />
              Download now
            </div>

            {/* Title */}
            <h2 className="font-montserrat mb-8 text-[48px] font-medium leading-[1.05] tracking-tight text-white lg:text-[72px] xl:text-[80px]">
              {feature.title}
            </h2>

            {/* Description */}
            <p className="font-roboto mb-12 text-[18px] font-normal leading-relaxed text-white/60 lg:text-[22px] max-w-[600px]">
              {feature.description}
            </p>

            {/* Badges */}
            {feature.showStoreBadges && (
              <div className="flex flex-row items-center gap-3 sm:gap-5 w-full max-w-[420px]">
                <a
                  href="https://play.google.com/store/apps/details?id=com.elfaelectric.webapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex-1 aspect-[190/60] transition-transform hover:scale-105"
                >
                  <Image
                    src={STORE_BADGES.googlePlay}
                    alt="Get it on Google Play"
                    fill
                    className="object-contain object-left"
                    sizes="(max-width: 640px) 140px, 190px"
                  />
                </a>
                <a
                  href="https://apps.apple.com/pk/app/elfa-electric/id6744618877"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex-1 aspect-[190/60] transition-transform hover:scale-105"
                >
                  <Image
                    src={STORE_BADGES.appStore}
                    alt="Download on the App Store"
                    fill
                    className="object-contain object-left"
                    sizes="(max-width: 640px) 140px, 190px"
                  />
                </a>
              </div>
            )}
          </motion.div>

          {/* Right: Huge Floating Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="relative flex justify-center lg:justify-start order-1 lg:order-2"
          >
            <div className="relative w-full max-w-[500px] lg:max-w-none lg:w-[110%] aspect-[3/4] lg:h-[700px] lg:aspect-auto">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-contain object-center lg:object-left opacity-90"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
