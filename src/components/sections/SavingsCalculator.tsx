"use client";

import { useState } from "react";

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

  return (
    <div
      className="rounded-xl p-6 sm:p-8 lg:p-10"
      style={{ backgroundImage: "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)" }}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Inputs */}
        <div>
          <h3 className="font-montserrat text-[24px] font-bold text-white sm:text-[28px]">
            Calculate Your Savings
          </h3>
          <p className="font-roboto mb-6 text-[14px] italic text-white/70">{config.label}</p>

          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <label className="font-montserrat text-[16px] font-semibold text-white sm:text-[18px]">
                Daily Mileage (km)
              </label>
              <span className="font-montserrat rounded-lg bg-[#fcfcfc] px-3 py-1.5 text-[14px] font-semibold text-[#212121]">
                {mileage} km
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={150}
              value={mileage}
              onChange={(e) => setMileage(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-black/40 accent-[#61ce70]"
            />
          </div>

          <div className="mb-6">
            <label className="font-montserrat mb-2 block text-[16px] font-semibold text-white sm:text-[18px]">
              Petrol Price (Rs. per liter)
            </label>
            <input
              type="number"
              value={petrolPrice}
              onChange={(e) => setPetrolPrice(Number(e.target.value))}
              className="font-roboto h-[49px] w-full rounded-lg bg-[#fcfcfc] px-4 text-[16px] text-[#212121] outline-none"
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
              className="font-roboto h-[49px] w-full rounded-lg bg-[#fcfcfc] px-4 text-[16px] text-[#212121] outline-none"
            />
          </div>
        </div>

        {/* Results */}
        <div>
          <h3 className="font-montserrat mb-6 text-[24px] font-bold text-white sm:text-[28px]">
            Your Annual Savings
          </h3>

          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-white/15 py-4">
              <span className="font-montserrat text-[15px] font-semibold text-white sm:text-[16px]">
                Annual Cost of Petrol
              </span>
              <span className="font-montserrat text-[18px] font-bold text-white sm:text-[20px]">
                {fmt(petrolCost)}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-white/15 py-4">
              <span className="font-montserrat text-[15px] font-semibold text-white sm:text-[16px]">
                Cost of Running ELFA {config.id === "ev125" ? "EV-125" : "EV-1"}
              </span>
              <span className="font-montserrat text-[18px] font-bold text-white sm:text-[20px]">
                {fmt(elfaCost)}
              </span>
            </div>
            <div className="flex items-center justify-between py-4">
              <span className="font-montserrat text-[15px] font-semibold text-white sm:text-[16px]">
                Annual Savings
              </span>
              <span className="font-montserrat text-[18px] font-bold text-white sm:text-[20px]">
                {fmt(savings)}
              </span>
            </div>
          </div>

          <a
            href="/contact-us"
            className="font-montserrat mt-4 flex h-[52px] w-full items-center justify-center rounded-lg bg-[#fcfcfc] text-[16px] font-semibold text-[#212121] transition-opacity hover:opacity-90"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SavingsCalculator() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <h2 className="font-montserrat mb-8 text-center text-[36px] font-bold text-[#212121] sm:text-[42px] lg:text-[50px]">
        ELFA Savings Calculator
      </h2>

      <div className="mx-auto flex w-full max-w-[1140px] flex-col gap-5 px-4 sm:px-6">
        {calculators.map((config) => (
          <CalculatorCard key={config.id} config={config} />
        ))}
      </div>
    </section>
  );
}
