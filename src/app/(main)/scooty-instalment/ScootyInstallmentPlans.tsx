"use client";

import { useMemo, useState } from "react";
import Script from "next/script";
import { MapPin, Phone, Headphones, Mail, Check } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import PaymentCalculator from "@/components/financing/PaymentCalculator";
import { BURJ_TERMS, defaultFinancingSelection, formatFinancingAmount as formatRs, type BurjTerm } from "@/data/financing-plans";
import { burjScootyPlans, waslScootyRegions } from "@/data/scooty-financing-plans";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProviderId = "wasl" | "burj";
type WaslRegionId = "sindh" | "punjab";

const PROVIDERS: { id: ProviderId; label: string }[] = [
  { id: "wasl", label: "WASL" },
  { id: "burj", label: "BURJ" },
];


const selectTriggerClass =
  "font-roboto mb-10 h-14 w-full rounded-xl border border-brand-primary/50 bg-black/40 px-4 text-[15px] font-medium text-white shadow-none hover:border-brand-primary hover:bg-black/50 focus-visible:border-brand-primary focus-visible:ring-brand-primary/40 data-[size=default]:h-14 dark:bg-black/40 dark:hover:bg-black/50 [&_svg]:text-white/60";

const selectItemClass =
  "font-roboto cursor-pointer rounded-lg py-2.5 pl-3 text-[15px] !text-white focus:bg-brand-primary/20 focus:!text-white focus:**:!text-white data-highlighted:bg-brand-primary/20 data-highlighted:!text-white data-highlighted:**:!text-white";

type PlanCardData = {
  id: string;
  title: string;
  months: number;
  downPayment: number;
  perMonth: number;
};

const burjPlans: PlanCardData[] = BURJ_TERMS.flatMap(term =>
  Object.entries(burjScootyPlans[term]).map(([id, numbers]) => ({
    id: `${term}-${id.toLowerCase()}`,
    title: id === "D" ? "Plan D (0% Mark-up)" : `Plan ${id}`,
    months: numbers.months,
    downPayment: numbers.downPayment,
    perMonth: numbers.monthly,
  })),
);

const regionalPlans = waslScootyRegions.map(region => ({
  ...region,
  plans: region.plans.map(plan => ({ ...plan, title: `Plan ${plan.id}`, perMonth: plan.monthly })),
}));

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/ElfaElectric",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/elfaelectric/",
    path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M21.5 6.517c0-.78-.175-1.5-.472-2.153a5.556 5.556 0 0 0-1.32-1.9 5.556 5.556 0 0 0-1.9-1.32C17.155 1.176 16.43 1 15.65 1H8.35c-.78 0-1.5.176-2.153.473a5.556 5.556 0 0 0-1.9 1.32 5.556 5.556 0 0 0-1.32 1.9C2.675 5.016 2.5 5.736 2.5 6.516v7.296c0 .78.175 1.5.472 2.153a5.556 5.556 0 0 0 1.32 1.9 5.556 5.556 0 0 0 1.9 1.32c.654.297 1.374.473 2.154.473h7.296c.78 0 1.5-.176 2.153-.473a5.556 5.556 0 0 0 1.9-1.32 5.556 5.556 0 0 0 1.32-1.9c.297-.654.473-1.374.473-2.154V6.517z M12 17.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z M17.5 7.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/elfa-electric-bike/posts/?feedView=all",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@elfaelectric?_t=8phf78o94P9&_r=1",
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.41-5.46.02-1.96.9-3.92 2.45-5.12 1.18-.95 2.71-1.43 4.23-1.43V15c-1.41.01-2.73.74-3.51 1.89-.69 1-.84 2.3-.43 3.42.33.91 1.05 1.63 1.93 2.01 1.25.54 2.72.33 3.75-.54.91-.77 1.36-1.97 1.34-3.17.03-6.21.01-12.43.02-18.63z",
  },
];

function ScootyPlanCard({ plan }: { plan: PlanCardData }) {
  return (
    <div className="relative flex flex-col rounded-[24px] border border-white/10 bg-white/10 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl transition-all duration-500 transform-gpu hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] sm:p-8">
      <div className="mb-8 border-b border-white/10 pb-6">
        <h4 className="font-roboto mb-4 text-[16px] font-bold uppercase tracking-widest text-white">
          {plan.title}
        </h4>
        <div className="flex items-baseline gap-2">
          <span className="font-montserrat text-[32px] font-black tracking-tighter text-white sm:text-[40px] lg:text-[48px]">
            {formatRs(plan.perMonth)}
          </span>
          <span className="font-roboto text-[12px] font-medium uppercase tracking-widest text-white/50 sm:text-[15px]">
            /mo
          </span>
        </div>
      </div>

      <div className="mb-2 flex-1 space-y-4">
        <div className="flex items-center gap-3">
          <Check className="h-5 w-5 shrink-0 text-brand-primary" />
          <div className="font-roboto flex flex-1 items-center justify-between text-[15px]">
            <span className="text-white/60">Term Length</span>
            <span className="font-bold text-white">{plan.months} Months</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Check className="h-5 w-5 shrink-0 text-brand-primary" />
          <div className="font-roboto flex flex-1 items-center justify-between text-[15px]">
            <span className="text-white/60">Down Payment</span>
            <span className="font-bold text-white">{formatRs(plan.downPayment)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScootyInstallmentPlans() {
  const [provider, setProvider] = useState<ProviderId>("wasl");
  const [waslRegion, setWaslRegion] = useState<WaslRegionId>("sindh");
  const [burjTerm, setBurjTerm] = useState<BurjTerm>(12);

  const activeWaslRegion = useMemo(
    () => regionalPlans.find((region) => region.id === waslRegion) ?? regionalPlans[0],
    [waslRegion],
  );

  const burjTermPlans = useMemo(
    () => burjPlans.filter((plan) => plan.months === burjTerm),
    [burjTerm],
  );

  return (
    <>
      <section className="relative bg-bg-primary py-16 lg:py-24">
        <div className="mx-auto w-full max-w-container px-4 sm:px-6">
          <FadeIn>
            <h2 className="font-montserrat mb-10 text-center text-[36px] font-black tracking-tighter sm:text-[48px]">
              <span className="text-brand-primary">
                {provider === "wasl" ? "WASL" : "BURJ"}
              </span>{" "}
              <span className="text-white">Plans</span>
            </h2>

            <div className="mb-12 flex flex-wrap justify-center gap-4">
              {PROVIDERS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setProvider(p.id);
                    if (p.id === "wasl") setWaslRegion("sindh");
                    if (p.id === "burj") setBurjTerm(12);
                  }}
                  className={`font-roboto rounded-full border px-8 py-3 text-[14px] font-bold uppercase tracking-widest transition-all duration-300 ${
                    provider === p.id
                      ? "border-brand-primary bg-brand-primary text-black shadow-[0_0_20px_rgba(0,200,83,0.3)]"
                      : "border-white/20 bg-black/40 text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/10"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {provider === "wasl" ? (
              <div className="mx-auto w-full max-w-[464px] md:max-w-[960px]">
                <Select
                  value={waslRegion}
                  items={regionalPlans.map((region) => ({
                    value: region.id,
                    label: region.name,
                  }))}
                  onValueChange={(value) => {
                    if (value == null) return;
                    setWaslRegion(value as WaslRegionId);
                  }}
                >
                  <SelectTrigger
                    id="scooty-wasl-region"
                    size="default"
                    aria-label="WASL region"
                    className={selectTriggerClass}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    align="start"
                    className="rounded-xl border border-white/10 bg-[#111] text-white shadow-[0_16px_40px_rgba(0,0,0,0.55)] ring-white/10"
                  >
                    {regionalPlans.map((region) => (
                      <SelectItem
                        key={region.id}
                        value={region.id}
                        className={selectItemClass}
                      >
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <h3 className="font-montserrat mb-8 border-b border-brand-primary/40 pb-5 text-center text-[24px] font-semibold text-white sm:text-[28px]">
                  {activeWaslRegion.name}
                </h3>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {activeWaslRegion.plans.map((plan) => (
                    <ScootyPlanCard
                      key={`${activeWaslRegion.id}-${plan.id}`}
                      plan={{
                        id: `${activeWaslRegion.id}-${plan.id}`,
                        title: plan.title,
                        months: plan.months,
                        downPayment: plan.downPayment,
                        perMonth: plan.perMonth,
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="mx-auto w-full max-w-[464px] md:max-w-[960px]">
                <Select
                  value={String(burjTerm)}
                  items={BURJ_TERMS.map((term) => ({
                    value: String(term),
                    label: `${term} Months Financing`,
                  }))}
                  onValueChange={(value) => {
                    if (value == null) return;
                    setBurjTerm(Number(value) as BurjTerm);
                  }}
                >
                  <SelectTrigger
                    id="scooty-burj-term"
                    size="default"
                    aria-label="Financing term"
                    className={selectTriggerClass}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    align="start"
                    className="rounded-xl border border-white/10 bg-[#111] text-white shadow-[0_16px_40px_rgba(0,0,0,0.55)] ring-white/10"
                  >
                    {BURJ_TERMS.map((term) => (
                      <SelectItem
                        key={term}
                        value={String(term)}
                        className={selectItemClass}
                      >
                        {term} Months Financing
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <h3 className="font-montserrat mb-8 border-b border-brand-primary/40 pb-5 text-center text-[24px] font-semibold text-white sm:text-[28px]">
                  {burjTerm} Months Financing
                </h3>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {burjTermPlans.map((plan) => (
                    <ScootyPlanCard key={`burj-${plan.id}`} plan={plan} />
                  ))}
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      <PaymentCalculator
        key={`${provider}-${waslRegion}-${burjTerm}`}
        product="ev-1"
        initialSelection={{ ...defaultFinancingSelection(provider), region: waslRegion, burjTerm }}
      />

      <section id="get-started" className="bg-[#050505] pb-14 pt-16 lg:pb-24 lg:pt-20">
        <div className="mx-auto w-full max-w-container px-4 sm:px-6">
          <h2 className="font-montserrat mb-4 text-center text-[36px] font-black italic tracking-tighter text-white sm:text-[48px] lg:text-[60px]">
            Get Started with ELFA
          </h2>
          <p className="font-roboto mx-auto mb-12 max-w-[720px] text-center text-[16px] leading-relaxed text-white/60">
            Ready to take the first step towards owning your EV bike? Fill out the form below, and
            let’s make it happen!
          </p>

          <div className="relative grid grid-cols-1 gap-8 overflow-hidden rounded-3xl border border-white/10 bg-[#080808]/60 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-12 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />

            <div className="relative z-10 w-full" style={{ height: "100%" }}>
              <iframe
                src="https://app.digistartup.io/widget/form/gRQ9EuVKch15UDsuAgMT"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "0px",
                  overflow: "hidden",
                }}
                scrolling="no"
                id="inline-gRQ9EuVKch15UDsuAgMT"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Installments Plans | EV1"
                data-height="475"
                data-layout-iframe-id="inline-gRQ9EuVKch15UDsuAgMT"
                data-form-id="gRQ9EuVKch15UDsuAgMT"
                data-cookie-consent="true"
                data-cookie-consent-provider="auto"
                title="Installments Plans | EV1"
              />
              <Script src="https://app.digistartup.io/js/form_embed.js" strategy="afterInteractive" />
            </div>

            <div className="relative z-10 flex flex-col justify-center lg:border-l lg:border-white/10 lg:pl-10">
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
                  <a
                    href="https://wa.me/923114863532"
                    className="font-roboto transition-colors hover:text-brand-primary"
                  >
                    +(92) 311-486-3532
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <Headphones className="h-5 w-5 shrink-0 text-brand-primary" />
                  <a
                    href="tel:02137173532"
                    className="font-roboto transition-colors hover:text-brand-primary"
                  >
                    021-37173532
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="h-5 w-5 shrink-0 text-brand-primary" />
                  <a
                    href="mailto:info@elfaelectric.com"
                    className="font-roboto transition-colors hover:text-brand-primary"
                  >
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
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:scale-110 hover:border-brand-primary hover:bg-brand-primary hover:text-black"
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
