import type { WaslEv125Region } from "./wasl-ev125-plans";

export const FINANCING_PROVIDERS = [
  { id: "asaan-ghar", label: "ASAAN GHAR" },
  { id: "qist-baazar", label: "QIST BAAZAR" },
  { id: "wasl", label: "WASL" },
  { id: "tmf", label: "TMF" },
  { id: "burj", label: "BURJ" },
] as const;

export type ProviderId = (typeof FINANCING_PROVIDERS)[number]["id"];
export type TmfOption = "with-advance" | "without-advance";
export const BURJ_TERMS = [12, 18, 24, 36] as const;
export type BurjTerm = (typeof BURJ_TERMS)[number];
export type BurjPlan = "A" | "B" | "C" | "D";

export type FinancingNumbers = {
  downPayment: number;
  monthly: number;
  months: number;
  total: number;
};

export type FinancingSelection = {
  provider: ProviderId;
  plan: string;
  tmfOption: TmfOption;
  region: WaslEv125Region;
  burjTerm: BurjTerm;
};

export function defaultFinancingSelection(provider: ProviderId = "asaan-ghar"): FinancingSelection {
  return { provider, plan: provider === "burj" ? "A" : "1", tmfOption: "with-advance", region: "sindh", burjTerm: 12 };
}

export function formatFinancingAmount(amount: number) {
  return `Rs. ${amount.toLocaleString("en-PK", { maximumFractionDigits: 0 })}`;
}

// Live calculator values, verified 2026-10-27: https://elfaelectric.com/financing-partners/
// Retain precision until display; rounded monthly payments produce different totals.
export const burjEv125Plans: Record<BurjTerm, Record<BurjPlan, FinancingNumbers>> = {
  12: {
    A: { downPayment: 47040.75, monthly: 25138.481896795325, months: 12, total: 348702.5327615439 },
    B: { downPayment: 62721, monthly: 23861.42474862652, months: 12, total: 349058.0969835182 },
    C: { downPayment: 78401.25, monthly: 22559.751420598066, months: 12, total: 349118.2670471768 },
    D: { downPayment: 78401.25, monthly: 22504.687690893647, months: 12, total: 348457.5022907237 },
  },
  18: {
    A: { downPayment: 47040.75, monthly: 17888.333273931978, months: 18, total: 369030.7489307756 },
    B: { downPayment: 62721, monthly: 16836.078375465393, months: 18, total: 365770.41075837705 },
    C: { downPayment: 78401.25, monthly: 15783.823476998805, months: 18, total: 362510.0725859785 },
    D: { downPayment: 143401.25, monthly: 11392.562812538225, months: 18, total: 348467.380625688 },
  },
  24: {
    A: { downPayment: 47040.75, monthly: 14297.698237289816, months: 24, total: 390185.50769495557 },
    B: { downPayment: 62721, monthly: 13456.657164508062, months: 24, total: 385680.7719481935 },
    C: { downPayment: 78401.25, monthly: 12615.61609172631, months: 24, total: 381176.0362014314 },
    D: { downPayment: 190901.25, monthly: 6564.744829633656, months: 24, total: 348455.12591120775 },
  },
  36: {
    A: { downPayment: 47040.75, monthly: 11040.070942384269, months: 36, total: 444483.30392583366 },
    B: { downPayment: 62721, monthly: 10390.65500459696, months: 36, total: 436784.58016549057 },
    C: { downPayment: 78401.25, monthly: 9741.239066809649, months: 36, total: 429085.85640514735 },
    D: { downPayment: 242401.25, monthly: 2946.1353532533512, months: 36, total: 348462.1227171206 },
  },
};
