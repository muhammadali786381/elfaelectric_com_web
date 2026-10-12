"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, type Variants } from "motion/react";

import { Badge } from "@/components/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import FlipButton from "@/components/ui/FlipButton";

type ModelConfig = {
  id: string;
  label: string;
  short: string;
  kmPerLitrePetrol: number;
  kmPerUnitElfa: number;
  buyHref: string;
  /** Icon when label text is white (inactive) */
  iconLight: string;
  /** Icon when label text is black (active on green) */
  iconDark: string;
};

const models: ModelConfig[] = [
  {
    id: "ev125",
    label: "EV-125 BIKE",
    short: "EV-125",
    kmPerLitrePetrol: 45,
    kmPerUnitElfa: 46,
    buyHref: "/product/elfaev125",
    iconLight: "/bike1.png",
    iconDark: "/bikeblack.png",
  },
  {
    id: "ev1",
    label: "EV-1 Scooty",
    short: "EV-1",
    kmPerLitrePetrol: 40,
    kmPerUnitElfa: 39,
    buyHref: "/product/ev1-scooty",
    iconLight: "/scooty1.png",
    iconDark: "/scootyblack.png",
  },
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
  const min = 5;
  const max = 200;
  const pct = ((value - min) / (max - min)) * 100;
  const ticks = [0, 50, 100, 150, 200];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className="mx-auto grid w-full gap-3 sm:gap-4">
      {/* Pill capsule track */}
      <div className="relative h-12 sm:h-14 w-full rounded-full bg-white/[0.07] border border-white/10 shadow-inner overflow-hidden">
        {/* Growing green fill with embedded bolt */}
        <div
          className="absolute inset-y-0 left-0 rounded-full flex items-center justify-end pr-3"
          style={{
            width: `max(56px, ${pct}%)`,
            background: "#61ce70",
            transition: "width 0ms",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-8 w-8 text-white shrink-0"
            aria-hidden
          >
            <path
              d="M13 2 4.5 13.5H11L10 22l9.5-11.5H13.5L13 2z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        {/* Invisible range input for interaction */}
        <input
          type="range"
          min={min}
          max={max}
          step={5}
          value={value}
          onChange={handleChange}
          className="absolute inset-0 h-full w-full opacity-0 cursor-grab active:cursor-grabbing"
          aria-label="Daily km"
          style={{ zIndex: 20 }}
        />
      </div>

      {/* Tick labels */}
      <span
        aria-hidden="true"
        className="flex w-full items-center justify-between gap-1 px-1 text-xs font-medium text-white/40"
      >
        {ticks.map((tick) => (
          <span key={tick} className="flex flex-col items-center gap-1">
            <span className="h-1 w-px bg-white/20" />
            <span>{tick === max ? `${tick}+` : tick}</span>
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
  const model =
    models.find((m) => m.id === (locked ? productId : activeId)) ?? models[0];

  const [dailyKm, setDailyKm] = useState(50);
  const [petrolPrice, setPetrolPrice] = useState(386);
  const [elecCost, setElecCost] = useState(55);

  const annualKm = dailyKm * 365;
  const petrolAnnual = (annualKm / model.kmPerLitrePetrol) * petrolPrice;
  const elfaAnnual = (annualKm / model.kmPerUnitElfa) * elecCost;
  const savings = Math.max(0, Math.round(petrolAnnual - elfaAnnual));

  const fmt = (n: number) => `Rs. ${Math.round(n).toLocaleString("en-US")}`;
  const savingsChars = Math.round(savings).toLocaleString("en-US").split("");

  return (
    <section className="relative overflow-hidden bg-bg-primary py-8 sm:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[14%] top-22 h-[500px] w-[600px] rounded-full opacity-[0.08]"
      // style={{
      //   background:
      //     "radial-gradient(circle, var(--color-brand-primary) 0%, transparent 70%)",
      // }}
      />

      <div
        aria-label="Savings Calculator"
        className="mx-auto flex w-full max-w-5xl flex-col gap-6 sm:gap-8 px-4 sm:px-6"
      >
        <div className="flex w-full flex-col gap-2 rounded-[2rem] bg-white/[0.02] p-1 shadow-lg border border-white/[0.06] lg:flex-row backdrop-blur-md">
          <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 lg:p-8">
            <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
              <h3 className="font-montserrat text-lg font-bold text-white sm:text-xl">
                Calculate Savings
              </h3>
              {!locked && (
                <div className="relative inline-flex h-10 sm:h-12 shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md">
                  {models.map((m) => {
                    const active = activeId === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setActiveId(m.id)}
                        className={cn(
                          "relative flex h-full items-center justify-center gap-2 rounded-full px-4 sm:px-5 transition-all duration-500 ease-out",
                          active
                            ? "bg-brand-primary text-black shadow-sm"
                            : "text-white/50 hover:bg-white/5 hover:text-white",
                        )}
                      >
                        <Image
                          src={active ? m.iconDark : m.iconLight}
                          alt=""
                          width={24}
                          height={24}
                          className={cn(
                            "h-5 w-5 object-contain transition-transform duration-500",
                            active && "scale-110"
                          )}
                          aria-hidden
                        />
                        <span className="font-roboto whitespace-nowrap text-[11px] font-bold uppercase tracking-widest sm:text-[12px]">
                          {m.short}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center flex-1 py-8 sm:py-10 lg:py-12 gap-5 lg:gap-6">
              <div className="font-montserrat flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                <span>{dailyKm}</span>
                <span className="text-lg text-white/40 sm:text-xl lg:text-2xl">
                  km / day
                </span>
              </div>
              <SliderPattern value={dailyKm} setValue={setDailyKm} />
            </div>

            <div className="flex flex-col gap-4 sm:gap-5 border-t border-white/[0.06] pt-5 sm:pt-6">
              <div className="flex flex-row items-center justify-between gap-2 sm:gap-3">
                <p className="font-roboto text-[13px] sm:text-[14px] font-medium text-white/80 max-w-[140px] sm:max-w-none leading-tight">
                  Average petrol price per litre?
                </p>
                <InputGroup className="h-10 sm:h-11 w-fit border-white/10 bg-white/5 text-white shadow-none">
                  <InputGroupAddon>
                    <InputGroupText className="font-medium text-white/40">
                      Rs
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    type="number"
                    value={petrolPrice}
                    onChange={(e) =>
                      setPetrolPrice(Number(e.target.value) || 0)
                    }
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

              <div className="flex flex-row items-center justify-between gap-2 sm:gap-3">
                <p className="font-roboto text-[13px] sm:text-[14px] font-medium text-white/80 max-w-[140px] sm:max-w-none leading-tight">
                  Average electricity cost per unit?
                </p>
                <InputGroup className="h-10 sm:h-11 w-fit border-white/10 bg-white/5 text-white shadow-none">
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
          </div>

          <div className="flex w-full flex-col items-center justify-between gap-6 rounded-[1.8rem] border border-white/5 bg-[#050505] p-6 lg:w-[28rem] lg:p-8">
            <div className="flex w-full flex-col items-center gap-2 text-center">
              <h3 className="font-roboto font-medium tracking-wide text-white/80 text-[14px] sm:text-[16px]">
                Annual Cost Savings
              </h3>
              <div className="font-montserrat mt-2 flex items-baseline gap-1 text-[42px] sm:text-[48px] lg:text-[56px] font-bold leading-none tracking-tighter text-brand-primary">
                <span className="mr-1 text-2xl sm:text-3xl text-brand-primary/80">Rs</span>
                <AnimatePresence mode="popLayout">
                  {savingsChars.map((char, idx) => (
                    <motion.span
                      key={`${savings}-${idx}-${char}`}
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
                href={model.buyHref}
                variant="primary"
                className="mt-6 sm:mt-8 h-10 sm:h-12 w-full rounded-md text-[13px] sm:text-[14px]"
              >
                Buy Now
              </FlipButton>
            </div>

            <div className="flex w-full flex-col gap-3 sm:gap-4 font-roboto text-[13px] sm:text-[14px]">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-white/30">
                Breakdown
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Annual Kilometers</span>
                <span className="font-medium text-white">
                  {Math.round(annualKm).toLocaleString("en-US")} km
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Petrol Cost (1 Year)</span>
                <span className="font-medium text-white">{fmt(petrolAnnual)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">ELFA Cost (1 Year)</span>
                <span className="font-medium text-brand-primary">
                  {fmt(elfaAnnual)}
                </span>
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
