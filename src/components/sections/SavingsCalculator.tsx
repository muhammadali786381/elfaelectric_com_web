"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";

type CalculatorConfig = {
  id: string;
  label: string;
  kmPerLitrePetrol: number;
  kmPerUnitElfa: number;
};

// km/kWh derived from each bike's own spec sheet: battery capacity (V x Ah)
// against its rated range — EV-125 is 72V/30Ah (2.16kWh) for 100+ km,
// EV-1 is 64V/30Ah (1.92kWh) for 75 km.
const calculators: CalculatorConfig[] = [
  { id: "ev125", label: "EV-125 vs Petrol Bike", kmPerLitrePetrol: 45, kmPerUnitElfa: 46 },
  { id: "ev1", label: "EV-1 vs Petrol Bike", kmPerLitrePetrol: 40, kmPerUnitElfa: 39 },
];

const fmt = (n: number) => `Rs. ${Math.round(n).toLocaleString("en-US")}`;

function CalculatorCard({ config }: { config: CalculatorConfig }) {
  const [mileage, setMileage] = useState(50);
  const [petrolPrice, setPetrolPrice] = useState(386);
  const [unitCost, setUnitCost] = useState(55);

  const annualKm = mileage * 365;
  const petrolCost = (annualKm / config.kmPerLitrePetrol) * petrolPrice;
  const elfaCost = (annualKm / config.kmPerUnitElfa) * unitCost;
  const savings = petrolCost - elfaCost;

  // Range progress % for green/white track split
  const mileagePct = ((mileage - 5) / (150 - 5)) * 100;

  return (
    <div
      className="rounded-[12px] p-6 sm:py-8  lg:px-30 lg:py-10 "
      style={{ backgroundImage: "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)" }}
    >
      {/* Equal columns; stretch so bottoms of left inputs + Contact Us align */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
        {/* Left — inputs */}
        <div className="flex min-w-0 flex-col">
          <h3 className="font-montserrat text-[24px] font-bold text-white sm:text-[28px]">
            Calculate Your Savings
          </h3>
          <p className="font-roboto mb-6 text-[14px] italic text-white/70">{config.label}</p>

          <div className="mb-6">
            <label className="font-montserrat mb-3 block text-[16px] font-semibold text-white sm:text-[18px]">
              Daily Mileage (km)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={5}
                max={150}
                value={mileage}
                onChange={(e) => setMileage(Number(e.target.value))}
                className="savings-range h-2.5 w-full min-w-0 flex-1 cursor-pointer appearance-none rounded-full"
                style={{
                  background: `linear-gradient(to right, #61ce70 0%, #61ce70 ${mileagePct}%, #ffffff ${mileagePct}%, #ffffff 100%)`,
                }}
              />
              <span className="font-montserrat shrink-0 rounded-[6px] bg-white px-3 py-1.5 text-[14px] font-semibold text-[#212121]">
                {mileage} km
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="font-montserrat mb-2 block text-[16px] font-semibold text-white sm:text-[18px]">
              Petrol Price (Rs. per liter)
            </label>
            <input
              type="number"
              value={petrolPrice}
              onChange={(e) => setPetrolPrice(Number(e.target.value))}
              className="font-roboto h-[49px] w-full rounded-[8px] border-0 bg-white px-4 text-[16px] text-black outline-none"
            />
          </div>

          <div>
            <label className="font-montserrat mb-2 block text-[16px] font-semibold text-white sm:text-[18px]">
              Electricity Unit Cost (Rs.)
            </label>
            <input
              type="number"
              value={unitCost}
              onChange={(e) => setUnitCost(Number(e.target.value))}
              className="font-roboto h-[49px] w-full rounded-[8px] border-0 bg-white px-4 text-[16px] text-black outline-none"
            />
          </div>
        </div>

        {/* Right — results; Contact Us pinned to bottom */}
        <div className="flex min-w-0 flex-col">
          <h3 className="font-montserrat mb-6 text-[24px] font-bold text-white sm:text-[28px]">
            Your Annual Savings
          </h3>

          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-white/20 py-4">
              <span className="font-montserrat text-[15px] font-semibold text-white sm:text-[16px]">
                Annual Cost of Petrol
              </span>
              <span className="font-montserrat text-[18px] font-bold text-white sm:text-[20px]">
                {fmt(petrolCost)}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-white/20 py-4">
              <span className="font-montserrat text-[15px] font-semibold text-white sm:text-[16px]">
                Cost of Running ELFA {config.id === "ev125" ? "EV-125" : "EV-1"}
              </span>
              <span className="font-montserrat text-[18px] font-bold text-white sm:text-[20px]">
                {fmt(elfaCost)}
              </span>
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="font-montserrat text-[16px] font-bold text-white sm:text-[18px]">
                Annual Savings
              </span>
              <span className="font-montserrat text-[22px] font-bold text-white sm:text-[26px]">
                {fmt(savings)}
              </span>
            </div>
          </div>

          <a
            href="/contact-us"
            className="font-montserrat mt-auto flex h-[52px] w-full items-center justify-center rounded-[8px] bg-white text-[16px] font-semibold text-black transition-opacity hover:opacity-90"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SavingsCalculator() {
  const [active, setActive] = useState<string>(calculators[0].id);
  const activeConfig = calculators.find((c) => c.id === active) ?? calculators[0];

  return (
    <section className="bg-white py-16 lg:py-20 lg:px-30">
      <h2 className="font-montserrat mb-8 text-center text-[36px] font-bold text-[#212121] sm:text-[42px] lg:text-[50px]">
        ELFA Savings Calculator
      </h2>

      <div className="mb-8 flex flex-wrap justify-center gap-5">
        {calculators.map((config) => (
          <button
            key={config.id}
            type="button"
            onClick={() => setActive(config.id)}
            aria-pressed={active === config.id}
            className={`font-roboto inline-flex h-10 items-center gap-2 rounded-[3px] px-5 text-[16px] font-normal transition-colors ${
              active === config.id ? "bg-[#61ce70] text-white" : "bg-[#212121] text-white hover:bg-black"
            }`}
          >
            <Calculator className="h-4 w-4" strokeWidth={2} />
            {config.id === "ev125" ? "EV-125 BIKE" : "EV-1 Scooty"}
          </button>
        ))}
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <CalculatorCard key={activeConfig.id} config={activeConfig} />
      </div>
    </section>
  );
}
