// EV-125 WASL terms supplied for Sindh and Punjab.
export const waslEv125Regions = [
  {
    id: "sindh",
    name: "Sindh",
    plans: [
      { id: "1", months: 24, downPayment: 101505, monthly: 15500 },
      { id: "2", months: 12, downPayment: 101505, monthly: 25500 },
    ],
  },
  {
    id: "punjab",
    name: "Punjab",
    plans: [
      { id: "1", months: 24, downPayment: 101505, monthly: 15000 },
      { id: "2", months: 12, downPayment: 101505, monthly: 25000 },
    ],
  },
] as const;

export type WaslEv125Region = (typeof waslEv125Regions)[number]["id"];
