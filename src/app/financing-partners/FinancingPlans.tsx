"use client";

import { useMemo, useState } from "react";
import { MapPin, Phone, Headphones, Mail } from "lucide-react";
import FlipButton from "@/components/ui/FlipButton";

const SPARK =
  "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)";

type Detail = { label: string; value: string };

type Plan = {
  id: string;
  title: string;
  months: number;
  badge?: string;
  details: Detail[];
  perMonth: number;
  downPayment: number;
  total: number;
};

type ProviderId = "asaan-ghar" | "qist-baazar" | "wasl" | "tmf";

const PROVIDERS: { id: ProviderId; label: string }[] = [
  { id: "asaan-ghar", label: "ASAAN GHAR" },
  { id: "qist-baazar", label: "QIST BAAZAR" },
  { id: "wasl", label: "WASL" },
  { id: "tmf", label: "TMF" },
];

function formatRs(n: number) {
  return `Rs. ${n.toLocaleString("en-PK")}`;
}

/** Scraped from https://elfaelectric.com/financing-partners/ */
const ev125Plans: Record<ProviderId, Plan[]> = {
  "asaan-ghar": [
    {
      id: "1",
      title: "Plan 1",
      months: 24,
      downPayment: 52268,
      perMonth: 17646,
      total: 475772,
      details: [
        { label: "Down Payment", value: "Rs. 52,268" },
        { label: "Financing Amount", value: "Rs. 2,96,183" },
        { label: "Monthly Installment", value: "Rs. 17,646" },
        { label: "Total Months", value: "24" },
      ],
    },
    {
      id: "2",
      title: "Plan 2",
      months: 18,
      downPayment: 52268,
      perMonth: 21535,
      total: 439898,
      details: [
        { label: "Down Payment", value: "Rs. 52,268" },
        { label: "Financing Amount", value: "Rs. 2,96,183" },
        { label: "Monthly Installment", value: "Rs. 21,535" },
        { label: "Total Months", value: "18" },
      ],
    },
    {
      id: "3",
      title: "Plan 3",
      months: 12,
      downPayment: 52268,
      perMonth: 29607,
      total: 407552,
      details: [
        { label: "Down Payment", value: "Rs. 52,268" },
        { label: "Financing Amount", value: "Rs. 2,96,183" },
        { label: "Monthly Installment", value: "Rs. 29,607" },
        { label: "Total Months", value: "12" },
      ],
    },
    {
      id: "4",
      title: "Plan 4",
      months: 6,
      downPayment: 52268,
      perMonth: 49364,
      total: 348452,
      details: [
        { label: "Down Payment", value: "Rs. 52,268" },
        { label: "Financing Amount", value: "Rs. 2,96,183" },
        { label: "Monthly Installment", value: "Rs. 49,364" },
        { label: "Total Months", value: "6" },
      ],
    },
  ],
  "qist-baazar": [
    {
      id: "1",
      title: "Plan 1",
      months: 24,
      downPayment: 99900,
      perMonth: 14000,
      total: 435900,
      details: [
        { label: "Down Payment", value: "Rs. 99,900" },
        { label: "Monthly Installment", value: "Rs. 14,000" },
        { label: "Total Months", value: "24" },
      ],
    },
    {
      id: "2",
      title: "Plan 2",
      months: 18,
      downPayment: 99900,
      perMonth: 17400,
      total: 413100,
      details: [
        { label: "Down Payment", value: "Rs. 99,900" },
        { label: "Monthly Installment", value: "Rs. 17,400" },
        { label: "Total Months", value: "18" },
      ],
    },
    {
      id: "3",
      title: "Plan 3",
      months: 12,
      downPayment: 87900,
      perMonth: 24000,
      total: 375900,
      details: [
        { label: "Down Payment", value: "Rs. 87,900" },
        { label: "Monthly Installment", value: "Rs. 24,000" },
        { label: "Total Months", value: "12" },
      ],
    },
  ],
  wasl: [
    {
      id: "1",
      title: "Plan 1",
      months: 24,
      downPayment: 70000,
      perMonth: 17700,
      total: 494800,
      details: [
        { label: "Registration", value: "Free" },
        { label: "Down Payment", value: "Rs. 70,000" },
        { label: "Monthly Installment", value: "Rs. 17,700" },
        { label: "Total Months", value: "24" },
      ],
    },
    {
      id: "2",
      title: "Plan 2",
      months: 18,
      downPayment: 70000,
      perMonth: 21500,
      total: 457000,
      details: [
        { label: "Registration", value: "Free" },
        { label: "Down Payment", value: "Rs. 70,000" },
        { label: "Monthly Installment", value: "Rs. 21,500" },
        { label: "Total Months", value: "18" },
      ],
    },
    {
      id: "3",
      title: "Plan 3",
      months: 12,
      downPayment: 70000,
      perMonth: 29400,
      total: 431300,
      details: [
        { label: "Registration", value: "Rs. 8,500" },
        { label: "Down Payment", value: "Rs. 70,000" },
        { label: "Monthly Installment", value: "Rs. 29,400" },
        { label: "Total Months", value: "12" },
      ],
    },
  ],
  tmf: [], // handled separately via tmfWith / tmfWithout
};

const tmfWithAdvance: Plan[] = [
  {
    id: "1",
    title: "Plan 1",
    months: 24,
    downPayment: 54000,
    perMonth: 11250,
    total: 343575,
    details: [
      { label: "Advance 20%", value: "Rs. 54,000" },
      { label: "Advance (after one year)", value: "Rs. 19,575" },
      { label: "Monthly Installment", value: "Rs. 11,250" },
      { label: "Total Months", value: "24" },
    ],
  },
  {
    id: "2",
    title: "Plan 2",
    months: 18,
    downPayment: 54000,
    perMonth: 15000,
    total: 337000,
    details: [
      { label: "Advance 20%", value: "Rs. 54,000" },
      { label: "Advance (after one year)", value: "Rs. 13,000" },
      { label: "Monthly Installment", value: "Rs. 15,000" },
      { label: "Total Months", value: "18" },
    ],
  },
  {
    id: "3",
    title: "Plan 3",
    months: 12,
    downPayment: 54000,
    perMonth: 22500,
    total: 324000,
    details: [
      { label: "Advance 20%", value: "Rs. 54,000" },
      { label: "Advance", value: "Rs. 0000" },
      { label: "Monthly Installment", value: "Rs. 22,500" },
      { label: "Total Months", value: "12" },
    ],
  },
];

const tmfWithoutAdvance: Plan[] = [
  {
    id: "1",
    title: "Plan 1",
    months: 24,
    downPayment: 0,
    perMonth: 17987,
    total: 431688,
    details: [
      { label: "Monthly Installment", value: "Rs. 17,987" },
      { label: "Total Months", value: "24" },
    ],
  },
  {
    id: "2",
    title: "Plan 2",
    months: 18,
    downPayment: 0,
    perMonth: 21594,
    total: 388692,
    details: [
      { label: "Monthly Installment", value: "Rs. 21,594" },
      { label: "Total Months", value: "18" },
    ],
  },
  {
    id: "3",
    title: "Plan 3",
    months: 12,
    downPayment: 0,
    perMonth: 29025,
    total: 348300,
    details: [
      { label: "Monthly Installment", value: "Rs. 29,025" },
      { label: "Total Months", value: "12" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61565976712052",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/elfaelectric",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/evtechglobal/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "TikTok",
    href: "#",
    path: "M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-col rounded-[10px] border p-[25px] text-left transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_8px_15px_rgba(0,0,0,0.1)] ${
        selected ? "border-2 border-brand-primary" : "border border-[#e0e0e0]"
      }`}
      style={{ backgroundImage: SPARK }}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="font-montserrat mt-2 mb-0 text-[20.8px] font-bold leading-tight text-text-inverse">
          {plan.title}
        </h3>
        <span className="shrink-0 rounded-[20px] bg-brand-primary px-3 py-1 text-[13.6px] font-medium leading-[1.6] text-text-inverse">
          {plan.badge ?? `${plan.months} Months`}
        </span>
      </div>

      <div className="flex flex-1 flex-col">
        {plan.details.map((d) => (
          <div
            key={d.label}
            className="font-roboto mb-2.5 flex items-center justify-between gap-3 py-2 text-[16px] leading-[1.6] text-text-inverse last:mb-0"
          >
            <span>{d.label}</span>
            <span className="font-medium">{d.value}</span>
          </div>
        ))}
      </div>

      <div className="font-roboto mt-[15px] w-full rounded-[10px] bg-brand-primary px-3 py-3 text-center text-[16px] font-medium text-text-inverse">
        {formatRs(plan.perMonth)} Per Month
      </div>
    </button>
  );
}

function OptionHeading({ children }: { children: string }) {
  return (
    <div className="mb-8">
      <h3 className="font-montserrat mb-3 text-center text-[22px] font-semibold text-text-primary sm:text-[26px]">
        {children}
      </h3>
      <div className="mx-auto h-px w-full bg-brand-primary" />
    </div>
  );
}

export default function FinancingPlans() {
  const [provider, setProvider] = useState<ProviderId>("asaan-ghar");
  const [tmfOption, setTmfOption] = useState<"with" | "without">("with");
  const [selectedPlanId, setSelectedPlanId] = useState("1");
  const [partner, setPartner] = useState("");

  const plans = useMemo(() => {
    if (provider === "tmf") {
      return tmfOption === "with" ? tmfWithAdvance : tmfWithoutAdvance;
    }
    return ev125Plans[provider];
  }, [provider, tmfOption]);

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) ?? plans[0];

  const switchProvider = (id: ProviderId) => {
    setProvider(id);
    setSelectedPlanId("1");
    if (id === "tmf") setTmfOption("with");
  };

  const selectTmfPlan = (option: "with" | "without", planId: string) => {
    setTmfOption(option);
    setSelectedPlanId(planId);
  };

  const inputClass =
    "font-roboto h-[48px] w-full rounded-[6px] border border-[#d0d0d0] bg-bg-primary px-4 text-[15px] text-text-secondary outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary";

  return (
    <>
      <section className="bg-bg-primary py-10 lg:py-14">
        <div className="mx-auto w-full max-w-container px-4 sm:px-6">
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {PROVIDERS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => switchProvider(p.id)}
                className={`font-roboto rounded-[10px] border-2 border-brand-primary px-[30px] py-3 text-[16px] font-medium transition-colors sm:text-[18px] ${
                  provider === p.id
                    ? "bg-brand-primary text-text-inverse"
                    : "bg-bg-primary text-text-primary hover:bg-brand-primary hover:text-text-inverse"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {provider === "tmf" ? (
            <div className="flex flex-col gap-12">
              <div>
                <OptionHeading>Option-1 (With Advance)</OptionHeading>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {tmfWithAdvance.map((plan) => (
                    <PlanCard
                      key={`with-${plan.id}`}
                      plan={plan}
                      selected={tmfOption === "with" && selectedPlanId === plan.id}
                      onSelect={() => selectTmfPlan("with", plan.id)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <OptionHeading>Option-2 (Without Advance)</OptionHeading>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {tmfWithoutAdvance.map((plan) => (
                    <PlanCard
                      key={`without-${plan.id}`}
                      plan={plan}
                      selected={tmfOption === "without" && selectedPlanId === plan.id}
                      onSelect={() => selectTmfPlan("without", plan.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <PlanCard
                  key={`${provider}-${plan.id}`}
                  plan={plan}
                  selected={selectedPlanId === plan.id}
                  onSelect={() => setSelectedPlanId(plan.id)}
                />
              ))}
            </div>
          )}

          {selectedPlan && (
            <div
              className="mt-12 rounded-[10px] border border-[#e0e0e0] p-6 sm:p-8"
              style={{ backgroundImage: SPARK }}
            >
              <h2 className="font-montserrat mb-6 text-center text-[28px] font-semibold text-brand-primary sm:text-[32px]">
                Payment Calculator
              </h2>
              <div className="mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="font-roboto text-[14px] text-text-inverse">Select Provider</span>
                  <select
                    value={provider}
                    onChange={(e) => switchProvider(e.target.value as ProviderId)}
                    className="font-roboto h-11 rounded-[4px] border border-bg-inverse/20 bg-bg-primary px-3 text-[15px] text-text-primary outline-none"
                  >
                    {PROVIDERS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-roboto text-[14px] text-text-inverse">Select Plan</span>
                  <select
                    value={
                      provider === "tmf" ? `${tmfOption}-${selectedPlanId}` : selectedPlanId
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      if (provider === "tmf") {
                        const [opt, id] = val.split("-") as ["with" | "without", string];
                        selectTmfPlan(opt, id);
                      } else {
                        setSelectedPlanId(val);
                      }
                    }}
                    className="font-roboto h-11 rounded-[4px] border border-bg-inverse/20 bg-bg-primary px-3 text-[15px] text-text-primary outline-none"
                  >
                    {provider === "tmf" ? (
                      <>
                        {tmfWithAdvance.map((p) => (
                          <option key={`with-${p.id}`} value={`with-${p.id}`}>
                            Option-1 · {p.title}
                          </option>
                        ))}
                        {tmfWithoutAdvance.map((p) => (
                          <option key={`without-${p.id}`} value={`without-${p.id}`}>
                            Option-2 · {p.title}
                          </option>
                        ))}
                      </>
                    ) : (
                      plans.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title}
                        </option>
                      ))
                    )}
                  </select>
                </label>
              </div>

              <div className="mt-8">
                <h3 className="font-montserrat mb-5 text-center text-[24px] font-semibold text-text-inverse sm:text-[28px]">
                  Payment Summary
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                  {[
                    { label: "Down Payment", value: formatRs(selectedPlan.downPayment) },
                    { label: "Monthly Payment", value: formatRs(selectedPlan.perMonth) },
                    { label: "Payment Period", value: `${selectedPlan.months} Months` },
                    { label: "Total Amount", value: formatRs(selectedPlan.total) },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[8px] bg-bg-primary px-3 py-4 text-center shadow-sm sm:px-4"
                    >
                      <p className="font-montserrat text-[18px] font-bold text-brand-primary sm:text-[22px]">
                        {item.value}
                      </p>
                      <p className="font-roboto mt-1 text-[12px] text-text-secondary sm:text-[13px]">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-bg-secondary pb-14 pt-4 lg:pb-20 lg:pt-6">
        <div className="mx-auto w-full max-w-container px-4 sm:px-6">
          <h2 className="font-montserrat mb-3 text-center text-[32px] font-bold text-brand-primary sm:text-[44px] lg:text-[55px]">
            Get Started with ELFA
          </h2>
          <p className="font-roboto mx-auto mb-8 max-w-[720px] text-center text-[15px] leading-relaxed text-text-primary">
            Ready to take the first step towards owning your EV bike? Fill out the form below, and
            let’s make it happen!
          </p>

          <div
            className="grid grid-cols-1 gap-8 rounded-[15px] border-2 border-brand-primary p-5 sm:p-8 lg:grid-cols-[1.45fr_1fr] lg:gap-10"
            style={{ backgroundImage: SPARK }}
          >
            <form
              className="flex flex-col gap-3.5"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input type="text" name="name" placeholder="Name*" required className={inputClass} />
              <input
                type="text"
                name="surname"
                placeholder="Surname*"
                required
                className={inputClass}
              />
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[16px]">
                  🇵🇰
                </span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone*"
                  required
                  className={`${inputClass} pl-11`}
                />
              </div>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`${inputClass} pl-10`}
                />
              </div>
              <input type="text" name="city" placeholder="City*" required className={inputClass} />
              <input
                type="text"
                name="cnic"
                placeholder="Enter 13-digit CNIC*"
                required
                maxLength={13}
                className={inputClass}
              />
              <select
                name="partner"
                value={partner}
                onChange={(e) => setPartner(e.target.value)}
                required
                className={inputClass}
              >
                <option value="" disabled>
                  Our finance partners*
                </option>
                {PROVIDERS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
              <FlipButton
                type="submit"
                variant="primary"
                className="w-full mt-1 rounded-[6px] h-[48px] text-[15px]"
              >
                Submit Now
              </FlipButton>
            </form>

            <div className="flex flex-col justify-center">
              <h3 className="font-montserrat mb-5 text-[22px] font-medium text-text-inverse sm:text-[28px]">
                Contact Information
              </h3>
              <ul className="flex flex-col gap-4 text-[15px] text-text-inverse">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
                  <span className="font-roboto">
                    C3i GA-70-A3, Korangi Creek Industrial Park Korangi, Karachi, Sindh
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
                  <a href="https://wa.me/923114863532" className="font-roboto hover:text-brand-primary">
                    +(92) 311-486-3532
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Headphones className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
                  <a href="tel:02137173532" className="font-roboto hover:text-brand-primary">
                    021-37173532
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
                  <a href="mailto:info@elfaelectric.com" className="font-roboto hover:text-brand-primary">
                    info@elfaelectric.com
                  </a>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-brand-primary transition-colors hover:bg-brand-primary hover:text-text-inverse"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
