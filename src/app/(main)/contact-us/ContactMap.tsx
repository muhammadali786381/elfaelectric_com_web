"use client";

import dynamic from "next/dynamic";
import { dealersByCity } from "@/app/(main)/our-locations/DealersDirectory";

const allDealers = Object.values(dealersByCity).flat();

const DynamicMap = dynamic(() => import("@/components/ui/Map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#050505]">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" />
        <span className="font-roboto text-[13px] text-white/40">Loading map...</span>
      </div>
    </div>
  ),
});

export default function ContactMap() {
  return (
    <div className="rounded-[24px] overflow-hidden border border-white/10 relative z-10 bg-white/5 h-[350px] w-full sm:h-[420px] lg:h-[520px]">
      <DynamicMap dealers={allDealers} activeDealer={null} />
    </div>
  );
}
