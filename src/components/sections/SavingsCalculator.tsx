"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, type Variants } from "motion/react";

import { Badge } from "@/components/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Slider } from "@/components/ui/slider";
import FlipButton from "@/components/ui/FlipButton";

// ── Model data ──────────────────────────────────────────────────────────────
type ModelConfig = {
  id: string;
  label: string;
  short: string;
  kmPerLitrePetrol: number;
  kmPerUnitElfa: number;
};

const models: ModelConfig[] = [
  { id: "ev125", label: "EV-125 BIKE", short: "EV-125", kmPerLitrePetrol: 45, kmPerUnitElfa: 46 },
  { id: "ev1", label: "EV-1 Scooty", short: "EV-1", kmPerLitrePetrol: 40, kmPerUnitElfa: 39 },
];

const animVariant: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)", scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      delay: i * 0.03,
      type: "spring",
      damping: 22,
      stiffness: 280,
    },
  }),
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(4px)",
    scale: 0.98,
    transition: { duration: 0.14 },
  },
};

type SliderPatternProps = {
  value: number;
  setValue: (val: number) => void;
};

function SliderPattern({ value, setValue }: SliderPatternProps) {
  const max = 200;
  const skipInterval = 50;
  const ticks = Array.from({ length: 5 }, (_, i) => i * 50);

  return (
    <div className="mx-auto grid w-full gap-4">
      <Slider
        value={[value]}
        onValueChange={(val) =>
          setValue(Array.isArray(val) ? (val[0] ?? 0) : val)
        }
        max={max}
        min={5}
        step={5}
        className="cursor-grab active:cursor-grabbing **:data-[slot=slider-thumb]:h-6 **:data-[slot=slider-thumb]:w-6 **:data-[slot=slider-thumb]:border-4 **:data-[slot=slider-thumb]:border-solid **:data-[slot=slider-thumb]:border-bg-primary **:data-[slot=slider-thumb]:bg-brand-primary **:data-[slot=slider-thumb]:ring-0 **:data-[slot=slider-thumb]:hover:ring-0 **:data-[slot=slider-thumb]:focus-visible:ring-0 **:data-[slot=slider-thumb]:active:ring-0 **:data-[slot=slider-track]:h-2.5 **:data-[slot=slider-track]:bg-white/10"
      />
      <span
        aria-hidden="true"
        className="flex w-full items-center justify-between gap-1 px-3 text-xs font-medium text-white/50"
      >
        {ticks.map((tick) => (
          <span
            key={tick}
            className="flex w-0 flex-col items-center justify-center gap-2"
          >
            <span
              className={cn(
                "w-px bg-white/30",
                tick % skipInterval === 0 ? "h-2" : "h-1",
              )}
            />
            <span
              className={cn(
                "text-white/70",
                tick % skipInterval !== 0 && "opacity-0",
              )}
            >
              {tick}
              {tick === max && "+"}
            </span>
          </span>
        ))}
      </span>
    </div>
  );
}

export default function SavingsCalculator({
  productId,
}: {
  productId?: "ev125" | "ev1";
}) {
  const locked = Boolean(productId);
  const [activeId, setActiveId] = useState<string>(productId ?? models[0].id);
  const model = models.find((m) => m.id === (locked ? productId : activeId)) ?? models[0];

  const [dailyKm, setDailyKm] = useState(50);
  const [petrolPrice, setPetrolPrice] = useState(386);
  const [elecCost, setElecCost] = useState(55);

  const annualKm = dailyKm * 365;
  const petrolAnnual = (annualKm / model.kmPerLitrePetrol) * petrolPrice;
  const elfaAnnual = (annualKm / model.kmPerUnitElfa) * elecCost;
  const savings = Math.max(0, Math.round(petrolAnnual - elfaAnnual));

  const fmt = (n: number) => `Rs. ${Math.round(n).toLocaleString("en-US")}`;
  const savingsChars = String(savings).split("");

  return (
    <section className="relative overflow-hidden bg-bg-primary py-20 ">
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/4 rounded-full opacity-10"
        style={{ background: "radial-gradient(ellipse, var(--color-brand-primary) 0%, transparent 70%)" }}
      />

      <div
        aria-label="Savings Calculator"
        className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 sm:px-6"
      >
        <div className="flex flex-col items-start gap-4">
          <Badge variant="outline" className="h-7 px-3 text-brand-primary border-brand-primary/20 bg-brand-primary/5 uppercase tracking-wider font-roboto">
            Calculate your savings
          </Badge>
          <h2 className="font-montserrat max-w-xl text-4xl font-bold tracking-tighter text-white sm:text-[44px]">
            See what you save
            <br />
            <span className="text-brand-primary">With ELFA.</span>
          </h2>
        </div>

        {/* Model Toggle */}
        {!locked && (
          <div className="flex">
            <div className="inline-flex gap-1 rounded-full border border-white/10 bg-white/5 p-1">
              {models.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveId(m.id)}
                  className={`font-roboto relative rounded-full px-5 py-2 text-[12px] font-semibold uppercase tracking-[1px] transition-all duration-300 ${activeId === m.id
                      ? "bg-brand-primary text-bg-primary shadow-[0_0_16px_rgba(97,206,112,0.4)]"
                      : "text-white/50 hover:text-white/80"
                    }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex w-full flex-col gap-2 rounded-[2rem] bg-white/[0.02] p-1 shadow-lg border border-white/[0.06] lg:flex-row backdrop-blur-md">
          <div className="flex flex-1 flex-col gap-12 p-8 lg:p-10">
            <div className="flex flex-col gap-10">
              <p className="font-roboto text-[16px] leading-relaxed text-white/50">
                Adjust your daily routine to see how much you could save with an electric bike compared to petrol.
              </p>

              <div className="flex flex-col gap-8">
                <div className="font-montserrat flex items-center justify-center gap-2 text-5xl font-bold tracking-tight text-white">
                  <span>{dailyKm}</span>
                  <span className="text-white/40 text-2xl">km / day</span>
                </div>
                <SliderPattern
                  value={dailyKm}
                  setValue={setDailyKm}
                />
              </div>
            </div>

            <div className="h-px w-full bg-white/[0.06]" />

            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-roboto text-[14px] font-medium text-white/80">
                Average petrol price per litre?
              </p>
              <InputGroup className="h-11 w-fit border-white/10 bg-white/5 text-white shadow-none">
                <InputGroupAddon>
                  <InputGroupText className="font-medium text-white/40">
                    Rs
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  type="number"
                  value={petrolPrice}
                  onChange={(e) => setPetrolPrice(Number(e.target.value) || 0)}
                  min={0}
                  aria-label="Petrol Price"
                  className="w-16 text-[16px] font-montserrat font-bold tracking-tight focus-visible:ring-brand-primary/50"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText className="text-[13px] font-medium text-white/40">
                    / Ltr
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-roboto text-[14px] font-medium text-white/80">
                Average electricity cost per unit?
              </p>
              <InputGroup className="h-11 w-fit border-white/10 bg-white/5 text-white shadow-none">
                <InputGroupAddon>
                  <InputGroupText className="font-medium text-white/40">
                    Rs
                  </InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  type="number"
                  value={elecCost}
                  onChange={(e) => setElecCost(Number(e.target.value) || 0)}
                  min={0}
                  aria-label="Electricity Cost"
                  className="w-16 text-[16px] font-montserrat font-bold tracking-tight focus-visible:ring-brand-primary/50"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText className="text-[13px] font-medium text-white/40">
                    / Unit
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-between gap-8 rounded-[1.8rem] bg-[#050505] border border-white/5 p-8 lg:w-[28rem] lg:p-10">
            <div className="flex w-full flex-col items-center gap-2 text-center">
              <h3 className="font-roboto font-medium tracking-wide text-white/80">
                Annual Cost Savings
              </h3>
              <div className="font-montserrat mt-2 flex items-baseline gap-1 text-[56px] leading-none font-bold tracking-tighter text-brand-primary">
                <span className="text-3xl text-brand-primary/80 mr-1">Rs</span>
                <AnimatePresence mode="popLayout">
                  {savingsChars.map((char, idx) => (
                    <motion.span
                      key={`${savings}-${idx}`}
                      variants={animVariant}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      custom={idx}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
              <p className="mt-4 font-roboto text-[13px] text-white/40">
                Net savings with {model.label} over 1 year
              </p>
              <FlipButton
                href="/products"
                variant="primary"
                className="mt-8 w-full rounded-md h-12 text-[14px]"
              >
                Buy Now
              </FlipButton>
            </div>

            <div className="flex w-full flex-col gap-4 font-roboto text-[14px]">
              <p className="text-[11px] font-semibold tracking-widest text-white/30 uppercase">
                Breakdown
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Annual Kilometers</span>
                <span className="font-medium text-white">{Math.round(annualKm).toLocaleString()} km</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Petrol Cost (1 Year)</span>
                <span className="font-medium text-white">{fmt(petrolAnnual)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">ELFA Cost (1 Year)</span>
                <span className="font-medium text-brand-primary">{fmt(elfaAnnual)}</span>
              </div>
              <div className="-mx-2 my-1 h-px bg-white/10" />
              <div className="flex items-center justify-between font-bold">
                <span className="text-white/90">Total Annual Savings</span>
                <span className="text-brand-primary">{fmt(savings)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
