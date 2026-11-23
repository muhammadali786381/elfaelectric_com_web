import type { BurjTerm, BurjPlan, FinancingNumbers } from "./financing-plans";

// Verified against https://elfaelectric.com/scooty-instalment/ on 2026-10-28.
export const waslScootyRegions = [
  { id: "sindh", name: "Sindh", plans: [
    { id: "1", months: 24, downPayment: 78780, monthly: 12000 },
    { id: "2", months: 12, downPayment: 78780, monthly: 20000 },
  ] },
  { id: "punjab", name: "Punjab", plans: [
    { id: "1", months: 24, downPayment: 78780, monthly: 12000 },
    { id: "2", months: 12, downPayment: 78780, monthly: 19500 },
  ] },
] as const;

// Round only for display; multiplying rounded installments changes published totals.
export const burjScootyPlans: Record<BurjTerm, Record<BurjPlan, FinancingNumbers>> = {
  "12": {
    "A": {
      "downPayment": 36814.5,
      "monthly": 19673.59452792678,
      "months": 12,
      "total": 272897.6343351214
    },
    "B": {
      "downPayment": 49086,
      "monthly": 18674.158498925102,
      "months": 12,
      "total": 273175.90198710124
    },
    "C": {
      "downPayment": 61357.5,
      "monthly": 17655.45763351153,
      "months": 12,
      "total": 273222.9916021384
    },
    "D": {
      "downPayment": 61357.5,
      "monthly": 17612.73560899408,
      "months": 12,
      "total": 272710.32730792894
    }
  },
  "18": {
    "A": {
      "downPayment": 36814.5,
      "monthly": 13999.56517090329,
      "months": 18,
      "total": 288806.6730762592
    },
    "B": {
      "downPayment": 49086,
      "monthly": 13176.061337320742,
      "months": 18,
      "total": 286255.10407177336
    },
    "C": {
      "downPayment": 61357.5,
      "monthly": 12352.557503738197,
      "months": 18,
      "total": 283703.5350672875
    },
    "D": {
      "downPayment": 108857.5,
      "monthly": 9103.307384558344,
      "months": 18,
      "total": 272717.0329220502
    }
  },
  "24": {
    "A": {
      "downPayment": 36814.5,
      "monthly": 11189.50296831377,
      "months": 24,
      "total": 305362.5712395305
    },
    "B": {
      "downPayment": 49086,
      "monthly": 10531.296911354137,
      "months": 24,
      "total": 301837.1258724993
    },
    "C": {
      "downPayment": 61357.5,
      "monthly": 9873.090854394502,
      "months": 24,
      "total": 298311.68050546804
    },
    "D": {
      "downPayment": 143857.5,
      "monthly": 5368.948909679418,
      "months": 24,
      "total": 272712.27383230603
    }
  },
  "36": {
    "A": {
      "downPayment": 36814.5,
      "monthly": 8640.05552012682,
      "months": 36,
      "total": 347856.4987245655
    },
    "B": {
      "downPayment": 49086,
      "monthly": 8131.81696011936,
      "months": 36,
      "total": 341831.410564297
    },
    "C": {
      "downPayment": 61357.5,
      "monthly": 7623.578400111899,
      "months": 36,
      "total": 335806.3224040284
    },
    "D": {
      "downPayment": 182357.5,
      "monthly": 2509.91261670493,
      "months": 36,
      "total": 272714.3542013775
    }
  }
};
