"use client";

import { useMemo, useState, useCallback } from "react";
import { Building2, Phone, MessageCircle, Navigation, Clock, CalendarCheck, MapPin, Search, X } from "lucide-react";
import dynamic from "next/dynamic";
import FlipButton from "@/components/ui/FlipButton";

export type Dealer = {
  name: string;
  address: string;
  phones: string[];
  email?: string;
  mapQuery?: string;
  coordinates?: [number, number];
};

export const CITIES = [
  "Karachi",
  "Hyderabad",
  "Lahore",
  "Rahim Yar Khan",
  "Rawalpindi",
] as const;

export type City = (typeof CITIES)[number];

export const dealersByCity: Record<City, Dealer[]> = {
  Karachi: [
    {
      name: "Smart Electric Wheels",
      address: "Shop No. U3, Al Fizza Glass Tower, Gulshan-e-Iqbal, Block 10A, Rashid Minhas Road, Karachi",
      phones: ["0315 8847869"],
      mapQuery: "Smart Electric Wheels Gulshan-e-Iqbal Karachi",
    },
    {
      name: "Hilal Motors",
      address: "Showroom No. 3, Hamza Homes, Main Khalid Bin Walid Road, Maniya Society, MCHS, Karachi",
      phones: ["0321-8959370"],
      mapQuery: "Hilal Motors Khalid Bin Walid Road Karachi",
    },
    {
      name: "Laox Electronics",
      address: "Yousaf Plaza, Pakistan Ave, Block 16, Federal B Area, Gulberg Town, Karachi",
      phones: ["0312-3440196", "021-36811407"],
      mapQuery: "Laox Electronics Federal B Area Karachi",
    },
    {
      name: "Mubashira Motors",
      address: "Shop No. 1, O-34, Korangi No. 3, Karachi",
      phones: ["0339-2399000"],
      mapQuery: "Mubashira Motors Korangi Karachi",
    },
    {
      name: "Auto Power",
      address: "Shop No. 05 & 06, Ruby Arcade, A.M.20 Shahrah-e-Liaquat, Off Akbar Road, Saddar, Karachi",
      phones: ["021-32717777", "0322-2578859"],
      email: "sales@autopower.com.pk",
      mapQuery: "Auto Power Saddar Karachi",
    },
    {
      name: "Green Wheels",
      address: "Shop #A40, National Complex, B-2 Rashid Minhas Rd, Block 10-A Gulshan-e-Iqbal, Karachi",
      phones: ["0333-8224263"],
      mapQuery: "Green Wheels Gulshan-e-Iqbal Karachi",
    },
    {
      name: "TK Dealership",
      address: "24 Commercial Street, DHA Phase 2 Commercial Area, Defence Housing Authority, Karachi",
      phones: ["0331-3617793"],
      mapQuery: "TK Dealership DHA Phase 2 Karachi",
    },
    {
      name: "Solarize",
      address: "Shop No. 1, C 43/6, Malir Tanki, Kalaboard, Malir, Karachi",
      phones: ["0333-2236876"],
      email: "ssolarize@gmail.com",
      mapQuery: "Solarize Malir Karachi",
    },
    {
      name: "Al Noor Traders",
      address: "Shop No.27, Al-Burhan Arcade, Block-E, North Nazimabad, Karachi",
      phones: ["0345-2234827", "0345-2234857"],
      mapQuery: "Al Noor Traders North Nazimabad Karachi",
    },
    {
      name: "Bangash Green Energy",
      address: "B-30, Sunlay Arcade, Near Safoora Chowrangi, Kiran Hospital Road, Scheme 33, Karachi",
      phones: ["0330-2323264"],
      mapQuery: "Bangash Green Energy Scheme 33 Karachi",
    },
    {
      name: "Visdom EV",
      address: "Shop No. 6, Haroon Royal City Phase 1, Gulistan-e-Johar, Block 17, Karachi",
      phones: ["0331-0009579", "0301-2129910"],
      mapQuery: "Visdom EV Gulistan-e-Johar Karachi",
    },
    {
      name: "GreenWood Power 3S Service Center",
      address: "Shop no. G-16 Rufi Shopping Mall, Gulistan-e-Johar Block 18, Near Johar Chowrangi, Karachi",
      phones: ["0348-2037861"],
      mapQuery: "GreenWood Power Gulistan-e-Johar Karachi",
    },
    {
      name: "AGW Auto Solutions",
      address: "R-407, Incholi Cooperative Housing Society, Sector 24/A Scheme 33, Gulzar-e-Hijri, Karachi",
      phones: ["0318-2509267"],
      mapQuery: "AGW Auto Solutions Gulzar-e-Hijri Karachi",
    },
    {
      name: "BlueChip Technologies",
      address: "Showroom #29, Crown Garden, Block 4, Gulistan-e-Jauhar, Main University Road, Karachi",
      phones: ["0370-1335134"],
      mapQuery: "BlueChip Technologies Gulistan-e-Jauhar Karachi",
    },
    {
      name: "Flagship Store Karachi",
      address: "Plot 1-A, Shahra-e-Faisal, PECHS Extension Block 6, Karachi 74400",
      phones: ["02137173532"],
      mapQuery: "ELFA Electric Flagship Store Shahra-e-Faisal Karachi",
    },
  ],
  Hyderabad: [
    {
      name: "ELFA Flagship Store",
      address: "G-14, Signature Tower & Mall, opposite Diplai Memon Society, beside Hyderabad Bakery, Jamshoro Road, Hyderabad",
      phones: ["0311-4863532"],
      mapQuery: "ELFA Flagship Store Hyderabad Signature Tower",
    },
    {
      name: "Future Bike EV",
      address: "Shop No. 27, New Saddar, Phase 2, Bond Street, Qasimabad, Hyderabad, Sindh",
      phones: ["0300-3010432"],
      mapQuery: "Future Bike EV Qasimabad Hyderabad",
    },
    {
      name: "Hyderabad EV's",
      address: "101, Doctors Lane, Bohra Bazar, Saddar, Hyderabad, Sindh",
      phones: ["0333-2601652", "0333-0323669"],
      mapQuery: "Hyderabad EVs Saddar Hyderabad",
    },
  ],
  Lahore: [
    {
      name: "ROZ Shopping Center",
      address: "3/15 B Opp. Al Fatah Electronics, Shalamar Link Road, Lahore",
      phones: ["03250769769"],
      mapQuery: "ROZ Shopping Center Shalamar Link Road Lahore",
    },
  ],
  "Rahim Yar Khan": [
    {
      name: "New Madina Auto Centre",
      address: "Near Ali Motor, Shahbazpur Road, Shalimar Town, Rahim Yar Khan",
      phones: ["0300-6743738"],
      mapQuery: "New Madina Auto Centre Rahim Yar Khan",
    },
  ],
  Rawalpindi: [
    {
      name: "The EV Store",
      address: "N-119, North Circular Road, Near Islamiya School No. 2, Waris Khan, Rawalpindi",
      phones: ["0343-5629919", "0333-5559645"],
      mapQuery: "The EV Store Waris Khan Rawalpindi",
    },
  ],
};

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

function getCityForDealer(dealer: Dealer): string {
  for (const [city, dealers] of Object.entries(dealersByCity)) {
    if (dealers.some((d) => d.name === dealer.name)) return city;
  }
  return "";
}

function DealerCard({
  dealer,
  isActive,
  onClick,
}: {
  dealer: Dealer;
  isActive: boolean;
  onClick: (d: Dealer) => void;
}) {
  const city = getCityForDealer(dealer);
  const whatsappNum = dealer.phones[0].replace(/[\s-]/g, "").replace(/^0/, "92");
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(dealer.mapQuery || dealer.address)}`;

  return (
    <article
      onClick={() => onClick(dealer)}
      className={`group relative flex cursor-pointer flex-col gap-4 border-b border-white/[0.07] p-5 transition-all duration-200 sm:p-6 ${
        isActive
          ? "bg-[#0d1a0d] border-l-2 border-l-brand-primary"
          : "hover:bg-[#0a0a0a] hover:border-l-2 hover:border-l-brand-primary/40"
      }`}
    >
      {/* City tag */}
      <div className="flex items-center gap-2">
        <MapPin className="h-3.5 w-3.5 text-brand-primary" strokeWidth={2.5} />
        <span className="font-roboto text-[11px] font-bold uppercase tracking-[2px] text-brand-primary">
          {city}
        </span>
      </div>

      {/* Name */}
      <h3 className="font-montserrat -mt-1 text-[17px] font-bold uppercase tracking-wide text-white sm:text-[19px]">
        {dealer.name}
      </h3>

      {/* Details */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-start gap-3">
          <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-white/30" strokeWidth={1.5} />
          <p className="font-roboto text-[13px] leading-relaxed text-white/60">{dealer.address}</p>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="h-4 w-4 shrink-0 text-white/30" strokeWidth={1.5} />
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {dealer.phones.map((p) => (
              <a
                key={p}
                href={`tel:${p.replace(/[\s-]/g, "")}`}
                onClick={(e) => e.stopPropagation()}
                className="font-roboto text-[13px] font-semibold text-white transition-colors hover:text-brand-primary"
              >
                {p}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="h-4 w-4 shrink-0 text-white/30" strokeWidth={1.5} />
          <span className="font-roboto text-[13px] text-white/50">Mon – Sat, 11:00 am – 8:00 pm</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-1 flex flex-wrap gap-2">
        <FlipButton
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          variant="light"
          icon={<Navigation className="h-3 w-3" strokeWidth={2.5} />}
          className="rounded-[3px] px-3 py-1.5 text-[11px] tracking-wider hover:bg-brand-primary"
        >
          Directions
        </FlipButton>
        <FlipButton
          href="/book-a-test-ride"
          onClick={(e) => e.stopPropagation()}
          variant="primary"
          icon={<CalendarCheck className="h-3 w-3" strokeWidth={2.5} />}
          className="rounded-[3px] px-3 py-1.5 text-[11px] tracking-wider"
        >
          Test Ride
        </FlipButton>
        <FlipButton
          href={`https://wa.me/${whatsappNum}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          variant="outline"
          icon={<MessageCircle className="h-3 w-3" strokeWidth={2.5} />}
          className="rounded-[3px] border-white/20 px-3 py-1.5 text-[11px] tracking-wider text-white/70 hover:border-[#25D366] hover:bg-transparent hover:text-[#25D366]"
        >
          WhatsApp
        </FlipButton>
      </div>
    </article>
  );
}

export default function DealersDirectory() {
  const [search, setSearch] = useState("");
  const [activeDealer, setActiveDealer] = useState<Dealer | null>(null);

  const allDealers = useMemo(() => Object.values(dealersByCity).flat(), []);

  const filteredDealers = useMemo(() => {
    if (!search.trim()) return allDealers;
    const q = search.toLowerCase();
    return allDealers.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.address.toLowerCase().includes(q) ||
        Object.keys(dealersByCity).some(
          (city) =>
            city.toLowerCase().includes(q) && dealersByCity[city as City].includes(d)
        )
    );
  }, [search, allDealers]);

  const handleCardClick = useCallback((dealer: Dealer) => {
    setActiveDealer((prev) => (prev?.name === dealer.name ? null : dealer));
  }, []);

  return (
    <section className="bg-[#050505] py-10 lg:py-16" id="find-dealer">
      {/* Section Header - Full width */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 mb-8 lg:mb-12 text-center lg:text-left">
        <p className="font-roboto mb-2 text-[11px] font-bold uppercase tracking-[3px] text-brand-primary">
          Find Your Nearest Showroom
        </p>
        <h2 className="font-montserrat mb-6 text-[32px] font-black italic uppercase leading-none tracking-tight text-white sm:text-[44px]">
          Dealer Locations
        </h2>
      </div>

      {/* Main Layout: List + Map */}
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-start lg:gap-10">
        
        {/* Left Panel: Search + Normal List (scrolls with page) */}
        <div className="flex w-full flex-col lg:w-[45%] xl:w-[40%]">
          {/* Search Bar */}
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search by city, area or dealer name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="font-roboto w-full rounded-[4px] border border-white/10 bg-[#0a0a0a] py-3 pl-10 pr-10 text-[14px] text-white placeholder-white/30 outline-none transition-colors focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="mb-6 font-roboto text-[12px] text-white/30">
            {filteredDealers.length} dealer{filteredDealers.length !== 1 ? "s" : ""} found
          </div>

          {/* Dealer list */}
          <div className="flex flex-col gap-4">
            {filteredDealers.length > 0 ? (
              filteredDealers.map((d, idx) => (
                <DealerCard
                  key={`${d.name}-${idx}`}
                  dealer={d}
                  isActive={activeDealer?.name === d.name}
                  onClick={handleCardClick}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center rounded-[8px] border border-white/5 bg-[#0a0a0a]">
                <MapPin className="mb-4 h-10 w-10 text-white/10" strokeWidth={1} />
                <p className="font-roboto text-[14px] text-white/30">No dealers found for &quot;{search}&quot;</p>
                <button onClick={() => setSearch("")} className="mt-3 font-roboto text-[13px] text-brand-primary hover:underline">
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Sticky Map */}
        <div className="relative w-full overflow-hidden rounded-[16px] border border-white/10 lg:sticky lg:top-24 lg:h-[calc(100vh-140px)] h-[400px]">
          {/* Map instruction overlay */}
          {!activeDealer && (
            <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
              <div className="rounded-full bg-[#0a0a0a]/90 px-4 py-2 font-roboto text-[12px] text-white/50 backdrop-blur-md">
                Click a dealer card to zoom in
              </div>
            </div>
          )}
          <DynamicMap dealers={filteredDealers} activeDealer={activeDealer} />
        </div>
      </div>
    </section>
  );
}
