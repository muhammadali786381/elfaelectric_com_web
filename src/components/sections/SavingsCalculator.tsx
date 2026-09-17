"use client";

import { useState } from "react";

const PETROL_PRICE = 280; // PKR per litre (default)
const KM_PER_LITRE = 45;
const KWH_COST = 50; // PKR per kWh (approx)
const KM_PER_KWH = 80; // ELFA efficiency

export default function SavingsCalculator() {
  const [kmPerDay, setKmPerDay] = useState(30);
  const [petrolPrice, setPetrolPrice] = useState(PETROL_PRICE);

  // Annual savings calc
  const kmPerYear = kmPerDay * 365;
  const petrolCostPerYear = (kmPerYear / KM_PER_LITRE) * petrolPrice;
  const electricCostPerYear = (kmPerYear / KM_PER_KWH) * KWH_COST;
  const annualSavings = petrolCostPerYear - electricCostPerYear;
  const monthlySavings = annualSavings / 12;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(Math.round(n));

  const savingPct = Math.round((annualSavings / petrolCostPerYear) * 100);

  return (
    <section className="bg-gray-50 py-20 lg:py-28" id="calculator">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-red-600 text-sm font-bold uppercase tracking-widest mb-3">
            Smart Choice
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            ELFA Savings Calculator
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            See how much you save by switching from petrol to ELFA Electric.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Input panel */}
            <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100">
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-wide mb-7">
                Calculate Your Savings
              </h3>

              {/* KM per day */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Daily Distance
                  </label>
                  <span className="text-red-600 font-black text-lg">
                    {kmPerDay} km
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={200}
                  value={kmPerDay}
                  onChange={(e) => setKmPerDay(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between mt-1 text-xs text-gray-400">
                  <span>5 km</span>
                  <span>200 km</span>
                </div>
              </div>

              {/* Petrol price */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Petrol Price per Litre
                  </label>
                  <span className="text-red-600 font-black text-lg">
                    PKR {petrolPrice}
                  </span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={500}
                  step={5}
                  value={petrolPrice}
                  onChange={(e) => setPetrolPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between mt-1 text-xs text-gray-400">
                  <span>PKR 200</span>
                  <span>PKR 500</span>
                </div>
              </div>

              {/* Assumptions */}
              <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-500 space-y-1">
                <p className="font-semibold text-gray-600 mb-2">Assumptions:</p>
                <p>• Petrol bike: {KM_PER_LITRE} km/litre average</p>
                <p>• ELFA: {KM_PER_KWH} km/kWh efficiency</p>
                <p>• Electricity: PKR {KWH_COST}/kWh</p>
              </div>
            </div>

            {/* Results panel */}
            <div className="p-8 lg:p-10 bg-gradient-to-br from-gray-950 to-gray-900 text-white">
              <h3 className="text-lg font-black text-white uppercase tracking-wide mb-7">
                Your Annual Savings
              </h3>

              {/* Big savings number */}
              <div className="mb-6 bg-red-600 rounded-2xl p-6 text-center">
                <p className="text-red-200 text-xs uppercase tracking-widest mb-1">
                  You save per year
                </p>
                <p className="text-4xl font-black text-white">{fmt(annualSavings)}</p>
                <p className="text-red-200 text-sm mt-1">{savingPct}% less than petrol</p>
              </div>

              {/* Breakdown */}
              <div className="space-y-3">
                {[
                  {
                    label: "Monthly Savings",
                    value: fmt(monthlySavings),
                    color: "text-green-400",
                  },
                  {
                    label: "Annual Petrol Cost",
                    value: fmt(petrolCostPerYear),
                    color: "text-red-400",
                    sub: "without ELFA",
                  },
                  {
                    label: "Annual Electricity Cost",
                    value: fmt(electricCostPerYear),
                    color: "text-blue-400",
                    sub: "with ELFA",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3"
                  >
                    <div>
                      <p className="text-gray-300 text-sm font-medium">{row.label}</p>
                      {row.sub && (
                        <p className="text-gray-500 text-xs">{row.sub}</p>
                      )}
                    </div>
                    <p className={`font-black text-lg ${row.color}`}>{row.value}</p>
                  </div>
                ))}
              </div>

              <p className="text-gray-600 text-xs text-center mt-5">
                * Calculations are estimates based on average usage
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
