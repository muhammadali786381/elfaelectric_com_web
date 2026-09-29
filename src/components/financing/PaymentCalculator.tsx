"use client";

import { useMemo, useState } from "react";

type ProviderId = "asaan-ghar" | "qist-baazar" | "wasl" | "tmf";
type TmfOption = "with-advance" | "without-advance";

type PlanNumbers = {
  downPayment: number;
  monthly: number;
  months: number;
  total: number;
};

/** Scraped from https://elfaelectric.com/financing-partners/ Payment Calculator */
const PLAN_DATA: Record<
  Exclude<ProviderId, "tmf">,
  Record<string, PlanNumbers>
> & {
  tmf: Record<string, Record<TmfOption, PlanNumbers>>;
} = {
  "asaan-ghar": {
    "1": { downPayment: 52268, monthly: 17646, months: 24, total: 475772 },
    "2": { downPayment: 52268, monthly: 21535, months: 18, total: 439898 },
    "3": { downPayment: 52268, monthly: 29607, months: 12, total: 407552 },
    "4": { downPayment: 52268, monthly: 49364, months: 6, total: 348452 },
  },
  "qist-baazar": {
    "1": { downPayment: 99900, monthly: 14000, months: 24, total: 435900 },
    "2": { downPayment: 99900, monthly: 17400, months: 18, total: 413100 },
    "3": { downPayment: 87900, monthly: 24000, months: 12, total: 375900 },
  },
  wasl: {
    "1": { downPayment: 70000, monthly: 17700, months: 24, total: 494800 },
    "2": { downPayment: 70000, monthly: 21500, months: 18, total: 457000 },
    "3": { downPayment: 70000, monthly: 29400, months: 12, total: 431300 },
  },
  tmf: {
    "1": {
      "with-advance": { downPayment: 54000, monthly: 11250, months: 24, total: 343575 },
      "without-advance": { downPayment: 0, monthly: 17987, months: 24, total: 431688 },
    },
    "2": {
      "with-advance": { downPayment: 54000, monthly: 15000, months: 18, total: 337000 },
      "without-advance": { downPayment: 0, monthly: 21594, months: 18, total: 388692 },
    },
    "3": {
      "with-advance": { downPayment: 54000, monthly: 22500, months: 12, total: 324000 },
      "without-advance": { downPayment: 0, monthly: 29025, months: 12, total: 348300 },
    },
  },
};

const PROVIDERS: { id: ProviderId; label: string }[] = [
  { id: "asaan-ghar", label: "ASAAN GHAR" },
  { id: "qist-baazar", label: "QIST BAAZAR" },
  { id: "wasl", label: "WASL" },
  { id: "tmf", label: "TMF" },
];

function formatRs(n: number) {
  return `Rs. ${n.toLocaleString("en-PK")}`;
}

const selectClass =
  "font-roboto h-14 w-full cursor-pointer rounded-xl border border-white/10 bg-black/40 px-4 text-[15px] font-medium text-white outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors hover:border-white/20";

export default function PaymentCalculator() {
  const [provider, setProvider] = useState<ProviderId>("asaan-ghar");
  const [plan, setPlan] = useState("1");
  const [tmfOption, setTmfOption] = useState<TmfOption>("with-advance");

  const planIds = useMemo(() => {
    if (provider === "tmf") return Object.keys(PLAN_DATA.tmf);
    return Object.keys(PLAN_DATA[provider]);
  }, [provider]);

  const summary = useMemo((): PlanNumbers | null => {
    if (provider === "tmf") {
      return PLAN_DATA.tmf[plan]?.[tmfOption] ?? null;
    }
    return PLAN_DATA[provider][plan] ?? null;
  }, [provider, plan, tmfOption]);

  function onProviderChange(next: ProviderId) {
    setProvider(next);
    setPlan("1");
    if (next === "tmf") setTmfOption("with-advance");
  }

  const cards = summary
    ? [
      { label: "Down Payment", value: formatRs(summary.downPayment) },
      { label: "Monthly Payment", value: formatRs(summary.monthly) },
      { label: "Payment Period", value: `${summary.months} Months` },
      { label: "Total Amount", value: formatRs(summary.total) },
    ]
    : [];

  return (
    <section className="bg-[#050505] py-16 lg:py-24">
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 sm:px-6">
      <div
        className="relative mt-10 rounded-[24px] border border-white/10 bg-[#080808]/80    backdrop-blur-2xl p-8 sm:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent" />

        <h2 className="font-montserrat mb-8 text-center text-[32px] sm:text-[40px] font-black uppercase italic tracking-tight text-white">
          Payment <span className="text-brand-primary">Calculator</span>
        </h2>

        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6">
          <label className="flex flex-col gap-2">
            <span className="font-roboto text-[13px] font-medium text-white/60 uppercase tracking-widest">
              Select Provider
            </span>
            <select
              value={provider}
              onChange={(e) => onProviderChange(e.target.value as ProviderId)}
              className={selectClass}
              aria-label="Select Provider"
            >
              {PROVIDERS.map((p) => (
                <option key={p.id} value={p.id} className="bg-black text-white">
                  {p.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-roboto text-[13px] font-medium text-white/60 uppercase tracking-widest">
              Select Plan
            </span>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className={selectClass}
              aria-label="Select Plan"
            >
              {planIds.map((id) => (
                <option key={id} value={id} className="bg-black text-white">
                  Plan {id}
                </option>
              ))}
            </select>
          </label>

          {provider === "tmf" ? (
            <label className="flex flex-col gap-2 sm:col-span-2 sm:max-w-md mx-auto w-full">
              <span className="font-roboto text-[13px] font-medium text-white/60 uppercase tracking-widest text-center">
                TMF Option
              </span>
              <select
                value={tmfOption}
                onChange={(e) => setTmfOption(e.target.value as TmfOption)}
                className={selectClass}
                aria-label="TMF Option"
              >
                <option value="with-advance" className="bg-black text-white">With Advance</option>
                <option value="without-advance" className="bg-black text-white">Without Advance</option>
              </select>
            </label>
          ) : null}
        </div>

        <div className="border-t border-white/10 pt-8 mt-4">
          <h3 className="font-montserrat mb-6 text-center text-[18px] font-semibold text-white/80 uppercase tracking-widest sm:text-[20px]">
            Payment Summary
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <div
                key={card.label}
                className="flex flex-col items-center justify-center rounded-[16px] border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm transition-all hover:bg-white/10 hover:-translate-y-1"
              >
                <div className="font-montserrat text-[24px] sm:text-[26px] font-bold text-brand-primary text-center leading-tight">
                  {card.value}
                </div>
                <div className="font-roboto mt-3 text-[12px] font-medium text-white/50 uppercase tracking-wider text-center">
                  {card.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
