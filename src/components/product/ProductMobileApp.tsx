"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductAdvancedFeature } from "@/data/products/types";
import { STORE_BADGES } from "@/data/products/types";
import { motion } from "motion/react";

/** Phone+watch mock PNGs are all 1187×1325. */
const MOCK_ASPECT = "1187/1325";

const APP_TABS = [
  {
    id: "home",
    label: "Show home screen",
    src: "/assets/images/bikeapp/bikeapp4.png",
  },
  {
    id: "battery",
    label: "Show battery screen",
    src: "/assets/images/bikeapp/bikebattery.png",
  },
  {
    id: "savings",
    label: "Show savings screen",
    src: "/assets/images/bikeapp/bikesaving.png",
  },
  {
    id: "track",
    label: "Show track screen",
    src: "/assets/images/bikeapp/biketrack.png",
  },
  {
    id: "replay",
    label: "Show replay screen",
    src: "/assets/images/bikeapp/bikereplay.png",
  },
] as const;

type AppTabId = (typeof APP_TABS)[number]["id"];

export default function ProductMobileApp({
  feature,
}: {
  feature: ProductAdvancedFeature;
}) {
  const [activeTab, setActiveTab] = useState<AppTabId>("home");
  const homeSrc = feature.image || APP_TABS[0].src;

  return (
    <section className="overflow-hidden border-t border-white/5 bg-[#050505] pb-24 pt-10 lg:pb-32 lg:pt-14">
      <div className="mx-auto w-full max-w-[1300px] px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">

          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="order-2 flex flex-col items-start lg:order-1 lg:pr-10"
          >
            <h2 className="font-montserrat mb-6 text-[48px] font-medium leading-[1.05] tracking-tight text-white lg:mb-8 lg:text-[72px] xl:text-[80px]">
              {feature.title}
            </h2>

            <p className="font-roboto mb-12 max-w-[600px] text-[18px] font-normal leading-relaxed text-white/60 lg:text-[22px]">
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

          {/* Right: Interactive phone mock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="relative flex justify-center lg:justify-start order-1 lg:order-2"
          >
            <div
              className="relative w-full max-w-[500px] lg:max-w-none lg:w-[110%]"
              style={{ aspectRatio: MOCK_ASPECT }}
            >
              {APP_TABS.map((tab) => {
                const src = tab.id === "home" ? homeSrc : tab.src;
                const isActive = activeTab === tab.id;
                return (
                  <Image
                    key={tab.id}
                    src={src}
                    alt={isActive ? feature.title : ""}
                    fill
                    priority={tab.id === "home"}
                    aria-hidden={!isActive}
                    className={`object-contain object-center transition-opacity duration-300 ${
                      isActive ? "opacity-90" : "pointer-events-none opacity-0"
                    }`}
                    sizes="(min-width: 1024px) 60vw, 100vw"
                  />
                );
              })}

              {/* Hotspots over phone bottom nav (Home → Replay). Profile has no screen. */}
              <div
                className="absolute left-[10%] top-[87%] grid h-[7.5%] w-[52.5%] grid-cols-6"
                role="toolbar"
                aria-label="App screen preview"
              >
                {APP_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    aria-label={tab.label}
                    aria-pressed={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="h-full w-full cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                  />
                ))}
                {/* Profile column — no image / not interactive */}
                <span className="pointer-events-none" aria-hidden="true" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
