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

import { Check } from "lucide-react";
import Image from "next/image";
import { FadeIn } from "@/components/motion/FadeIn";

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className="relative flex flex-col rounded-[24px] border border-white/10 bg-white/10 backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transform-gpu"
    >
      <div className="mb-8 border-b border-white/10 pb-6">
        <h3 className="font-roboto text-[16px] font-bold uppercase tracking-widest text-white mb-4">
          {plan.title}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="font-montserrat text-[48px] font-black tracking-tighter text-white">
            {formatRs(plan.perMonth)}
          </span>
          <span className="font-roboto text-[15px] font-medium text-white/50 uppercase tracking-widest">/mo</span>
        </div>
      </div>

      <div className="flex-1 space-y-4 mb-10">
        <div className="flex items-center gap-3">
          <Check className="h-5 w-5 shrink-0 text-brand-primary" />
          <div className="flex flex-1 items-center justify-between font-roboto text-[15px]">
            <span className="text-white/60">Term Length</span>
            <span className="font-bold text-white">{plan.badge ?? `${plan.months} Months`}</span>
          </div>
        </div>
        {plan.details.map((d) => {
          if (d.label === "Monthly Installment" || d.label === "Total Months") return null;
          return (
            <div key={d.label} className="flex items-center gap-3">
              <Check className="h-5 w-5 shrink-0 text-brand-primary" />
              <div className="flex flex-1 items-center justify-between font-roboto text-[15px]">
                <span className="text-white/60">{d.label}</span>
                <span className="font-bold text-white">{d.value}</span>
              </div>
            </div>
          );
        })}
        {plan.total > 0 && (
          <div className="flex items-center gap-3 pt-4 mt-2 border-t border-white/10">
            <Check className="h-5 w-5 shrink-0 text-brand-primary" />
            <div className="flex flex-1 items-center justify-between font-roboto text-[15px]">
              <span className="text-white/80 font-bold uppercase text-[12px] tracking-widest">Total Cost</span>
              <span className="font-bold text-brand-primary">{formatRs(plan.total)}</span>
            </div>
          </div>
        )}
      </div>

      <FlipButton
        type="button"
        onClick={() => {
          document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' });
        }}
        variant="outline"
        className="w-full rounded-[8px] h-[52px] text-[15px] font-bold border-white/20 text-white hover:bg-white hover:text-black"
      >
        Apply Online
      </FlipButton>
    </div>
  );
}

function OptionHeading({ children }: { children: string }) {
  return (
    <div className="mb-10 text-center relative">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <span className="relative bg-[#080808] px-6 font-roboto text-[13px] font-bold uppercase tracking-[0.2em] text-brand-primary">
        {children}
      </span>
    </div>
  );
}

export default function FinancingPlans() {
  const [provider, setProvider] = useState<ProviderId>("asaan-ghar");
  const [tmfOption, setTmfOption] = useState<"with" | "without">("with");
  const [partner, setPartner] = useState("");

  const plans = useMemo(() => {
    if (provider === "tmf") {
      return tmfOption === "with" ? tmfWithAdvance : tmfWithoutAdvance;
    }
    return ev125Plans[provider];
  }, [provider, tmfOption]);

  const switchProvider = (id: ProviderId) => {
    setProvider(id);
    if (id === "tmf") setTmfOption("with");
  };

  const inputClass =
    "font-roboto h-[48px] w-full rounded-[6px] border border-[#d0d0d0] bg-bg-primary px-4 text-[15px] text-text-secondary outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary";

  return (
    <>
      <section className="relative w-full py-20 lg:py-32 overflow-hidden">
        {/* Background Image & Dark Overlay for Glass Effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/hero5.jpeg"
            alt="Background"
            fill
            className="object-cover object-center grayscale  opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/70 to-[#050505]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 sm:px-6">
          <FadeIn variant="fadeInUp" speed="normal" className="mb-16 text-center">
            <h2 className="font-montserrat text-[32px] sm:text-[48px] font-black uppercase italic tracking-tight text-white mb-4">
              Choose Your <span className="text-brand-primary">Plan</span>
            </h2>
            <p className="font-roboto max-w-xl mx-auto text-[16px] text-white/60">
              Select one of our trusted financing partners to view all available installment plans for the EV-125 and EV-1.
            </p>
          </FadeIn>

          <div className="mb-16 flex flex-wrap justify-center gap-4">
            {PROVIDERS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => switchProvider(p.id)}
                className={`font-roboto rounded-full border px-8 py-3 text-[14px] font-bold uppercase tracking-widest transition-all duration-300 ${provider === p.id
                  ? "border-brand-primary bg-brand-primary text-black shadow-[0_0_20px_rgba(0,200,83,0.3)]"
                  : "border-white/20 bg-black/40 text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/10"
                  }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <FadeIn variant="fadeInUp" speed="slow">
            {provider === "tmf" ? (
              <div className="flex flex-col gap-24">
                <div>
                  <OptionHeading>Option 1: With Advance</OptionHeading>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {tmfWithAdvance.map((plan) => (
                      <PlanCard key={`with-${plan.id}`} plan={plan} />
                    ))}
                  </div>
                </div>
                <div>
                  <OptionHeading>Option 2: Without Advance</OptionHeading>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {tmfWithoutAdvance.map((plan) => (
                      <PlanCard key={`without-${plan.id}`} plan={plan} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
                {plans.map((plan) => (
                  <PlanCard key={`${provider}-${plan.id}`} plan={plan} />
                ))}
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      <section id="get-started" className="bg-[#050505] pb-14 pt-16 lg:pb-24 lg:pt-20">
        <div className="mx-auto w-full max-w-container px-4 sm:px-6">
          <h2 className="font-montserrat mb-4 text-center text-[36px] font-black italic tracking-tighter text-brand-primary sm:text-[48px] lg:text-[60px]">
            Get Started with ELFA
          </h2>
          <p className="font-roboto mx-auto mb-12 max-w-[720px] text-center text-[16px] leading-relaxed text-white/60">
            Ready to take the first step towards owning your EV bike? Fill out the form below, and
            let’s make it happen!
          </p>

          <div
            className="grid grid-cols-1 gap-8 rounded-3xl border border-white/10 bg-[#080808]/60 backdrop-blur-xl p-8 sm:p-12 lg:grid-cols-[1.45fr_1fr] lg:gap-16 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden"
          >
            {/* Subtle top ambient glow line */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />

            <form
              className="flex flex-col gap-4 relative z-10"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Name*" required className={inputClass} />
                <input
                  type="text"
                  name="surname"
                  placeholder="Surname*"
                  required
                  className={inputClass}
                />
              </div>

              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[16px]">
                  🇵🇰
                </span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone*"
                  required
                  className={`${inputClass} pl-12`}
                />
              </div>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`${inputClass} pl-12`}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="city" placeholder="City*" required className={inputClass} />
                <input
                  type="text"
                  name="cnic"
                  placeholder="Enter 13-digit CNIC*"
                  required
                  maxLength={13}
                  className={inputClass}
                />
              </div>
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
                className="w-full mt-4 rounded-xl h-[56px] text-[16px] font-bold shadow-[0_0_20px_rgba(0,200,83,0.3)] hover:shadow-[0_0_30px_rgba(0,200,83,0.5)] transition-all"
              >
                Submit Now
              </FlipButton>
            </form>

            <div className="flex flex-col justify-center relative z-10 lg:pl-10 lg:border-l lg:border-white/10">
              <h3 className="font-montserrat mb-8 text-[24px] font-bold tracking-tight text-white sm:text-[32px]">
                Contact Information
              </h3>
              <ul className="flex flex-col gap-6 text-[16px] text-white/80">
                <li className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-primary" />
                  <span className="font-roboto leading-relaxed">
                    C3i GA-70-A3, Korangi Creek Industrial Park Korangi, Karachi, Sindh
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="h-5 w-5 shrink-0 text-brand-primary" />
                  <a href="https://wa.me/923114863532" className="font-roboto hover:text-brand-primary transition-colors">
                    +(92) 311-486-3532
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <Headphones className="h-5 w-5 shrink-0 text-brand-primary" />
                  <a href="tel:02137173532" className="font-roboto hover:text-brand-primary transition-colors">
                    021-37173532
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="h-5 w-5 shrink-0 text-brand-primary" />
                  <a href="mailto:info@elfaelectric.com" className="font-roboto hover:text-brand-primary transition-colors">
                    info@elfaelectric.com
                  </a>
                </li>
              </ul>
              <div className="mt-12 flex flex-wrap gap-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all duration-300 hover:bg-brand-primary hover:border-brand-primary hover:text-black hover:scale-110"
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
