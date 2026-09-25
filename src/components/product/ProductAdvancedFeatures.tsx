"use client";

import Image from "next/image";
import type { ProductAdvancedFeature } from "@/data/products/types";
import { STORE_BADGES } from "@/data/products/types";
import { motion } from "motion/react";

export default function ProductAdvancedFeatures({
  features,
}: {
  features: ProductAdvancedFeature[];
}) {
  return (
    <section className="bg-[#050505] py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="mb-20 flex flex-col items-center justify-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 0.2, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-montserrat text-[40px] font-black italic uppercase leading-[0.9] tracking-tighter text-white sm:text-[56px] lg:text-[80px]"
          >
            Advanced Features
          </motion.h2>
        </div>

        <div className="flex flex-col gap-24 lg:gap-32">
          {features.map((feat, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image Container with Glow */}
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-[24px] bg-brand-primary/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px] border border-white/10 bg-[#111] shadow-2xl">
                    <Image
                      src={feat.image}
                      alt={feat.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 1024px) 600px, 100vw"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col items-start">
                  <h3 className="font-montserrat text-[28px] font-bold uppercase leading-tight text-white sm:text-[36px]">
                    {feat.title}
                  </h3>

                  {feat.bullets?.length ? (
                    <div className="font-roboto mt-6 space-y-4 text-[16px] font-normal leading-relaxed text-white/70 sm:text-[18px]">
                      {feat.bullets.map((b) => (
                        <div key={b.label} className="flex items-start gap-3">
                          <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-primary" />
                          <p>
                            <strong className="font-bold text-white">{b.label}:</strong> {b.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {feat.description ? (
                    <p className="font-roboto mt-6 text-[16px] font-normal leading-relaxed text-white/70 sm:text-[18px]">
                      {feat.description}
                    </p>
                  ) : null}

                  {feat.showStoreBadges ? (
                    <div className="mt-10 flex flex-wrap items-center gap-4">
                      <a
                        href="https://play.google.com/store"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative h-[56px] w-[180px] transition-transform hover:scale-105"
                      >
                        <Image
                          src={STORE_BADGES.googlePlay}
                          alt="Get it on Google Play"
                          fill
                          className="object-contain"
                          sizes="180px"
                        />
                      </a>
                      <a
                        href="https://apps.apple.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative h-[56px] w-[180px] transition-transform hover:scale-105"
                      >
                        <Image
                          src={STORE_BADGES.appStore}
                          alt="Download on the App Store"
                          fill
                          className="object-contain"
                          sizes="180px"
                        />
                      </a>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
