"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import type { ProductAdvancedFeature } from "@/data/products/types";
import { STORE_BADGES } from "@/data/products/types";
import { ease, duration } from "@/components/motion/FadeIn";

const HOLD_MS = 4500;
type SlideState = "active" | "outgoing" | "waiting";

/** Measure rendered lines so the cube reveal follows responsive text wrapping. */
function RollingText({ text, state, delay = 0, reduced }: {
  text: string;
  state: SlideState;
  delay?: number;
  reduced: boolean;
}) {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState([text]);

  useLayoutEffect(() => {
    const element = measureRef.current;
    if (!element) return;
    const measure = () => {
      const next: string[] = [];
      let top: number | undefined;
      for (const word of Array.from(element.children) as HTMLElement[]) {
        const wordTop = (word.firstElementChild as HTMLElement).offsetTop;
        if (wordTop !== top) {
          top = wordTop;
          next.push(word.textContent?.trim() ?? "");
        } else next[next.length - 1] += ` ${word.textContent?.trim()}`;
      }
      setLines(current => current.join("\n") === next.join("\n") ? current : next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    document.fonts.addEventListener("loadingdone", measure);
    return () => {
      observer.disconnect();
      document.fonts.removeEventListener("loadingdone", measure);
    };
  }, [text]);

  return (
    <span className="relative block">
      <span className="sr-only">{text}</span>
      <span ref={measureRef} aria-hidden="true" className="invisible pointer-events-none absolute inset-x-0 top-0 block">
        {text.split(" ").map((word, index) => (
          <span key={index}><span className="inline-block">{word}</span>{" "}</span>
        ))}
      </span>
      {lines.map((line, index) => (
        <span key={index} aria-hidden="true" className="block overflow-hidden [perspective:800px]">
          <motion.span
            initial={false}
            animate={{
              transform: reduced ? "none" : state === "active"
                ? "translateY(0%) rotateX(0deg)"
                : state === "outgoing" ? "translateY(-100%) rotateX(85deg)" : "translateY(100%) rotateX(-85deg)",
              opacity: state === "active" ? 1 : 0,
            }}
            transition={{ duration: reduced ? 0.15 : state === "active" ? duration.fast : 0.4, ease, delay: state === "active" && !reduced ? delay + Math.min(index * 0.055, 0.3) : 0 }}
            className="block origin-center [backface-visibility:hidden]"
          >{line}</motion.span>
        </span>
      ))}
    </span>
  );
}

export default function ProductAdvancedFeatures({ features }: { features: ProductAdvancedFeature[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.25, once: false });
  const [reduced, setReduced] = useState(true);
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState(0);
  const [hold, setHold] = useState(0);
  const activeRef = useRef(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const paused = hovered || focused || !visible || !inView || reduced;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  // Stable timeout loop — only restarts on pause/resume or manual slide pick.
  useEffect(() => {
    if (features.length < 2 || paused) return;

    let cancelled = false;
    let timeoutId = 0;

    const tick = () => {
      timeoutId = window.setTimeout(() => {
        if (cancelled) return;
        const current = activeRef.current;
        const next = (current + 1) % features.length;
        activeRef.current = next;
        setLeaving(current);
        setActive(next);
        tick();
      }, HOLD_MS);
    };

    tick();

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [features.length, paused, hold]);

  const go = (direction: 1 | -1) => {
    const current = activeRef.current;
    const next = (current + direction + features.length) % features.length;
    activeRef.current = next;
    setLeaving(current);
    setActive(next);
    setHold((value) => value + 1);
  };

  if (!features.length) return null;
  const stateFor = (index: number): SlideState =>
    index === active ? "active" : index === leaving ? "outgoing" : "waiting";

  const pauseOnMouse = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") setHovered(true);
  };
  const resumeOnMouse = () => setHovered(false);

  return (
    <section
      ref={sectionRef}
      aria-label="Advanced features"
      aria-roledescription="carousel"
      className="bg-[#050505] pb-8 pt-20 sm:pb-10 sm:pt-28 lg:pb-12 lg:pt-32"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6">
        <div className="mb-14 text-center sm:mb-16 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, transform: reduced ? "none" : "translateY(30px)" }}
            whileInView={{ opacity: 0.2, transform: "translateY(0px)" }}
            whileHover={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0.15 : 0.8, ease }}
            className="font-montserrat cursor-default text-[40px] font-black italic uppercase leading-[1.1] tracking-tighter text-white sm:text-[56px] lg:text-[80px]"
          >
            Advanced Features
          </motion.h2>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div
            className="relative grid aspect-[21/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111]"
            onPointerEnter={pauseOnMouse}
            onPointerLeave={resumeOnMouse}
          >
            {features.map((feature, index) => {
              const state = stateFor(index);
              return (
                <motion.div
                  key={feature.image}
                  aria-hidden={index !== active}
                  initial={false}
                  animate={{
                    transform: reduced
                      ? "none"
                      : state === "active"
                        ? "translateY(0%)"
                        : state === "outgoing"
                          ? "translateY(-100%)"
                          : "translateY(100%)",
                    opacity: reduced ? Number(index === active) : 1,
                  }}
                  transition={{
                    duration: state === "waiting" ? 0 : reduced ? 0.15 : duration.fast,
                    ease,
                  }}
                  className={`relative h-full w-full [grid-area:1/1] ${index === active ? "z-[1]" : "z-0"}`}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    loading="eager"
                    className="object-cover"
                    sizes="(min-width: 1024px) 650px, (min-width: 640px) 90vw, 100vw"
                  />
                </motion.div>
              );
            })}
          </div>

          <div className="flex min-w-0 flex-col items-start justify-center self-stretch">
            <div
              className="grid w-full"
              aria-live={paused || reduced ? "polite" : "off"}
              onPointerEnter={pauseOnMouse}
              onPointerLeave={resumeOnMouse}
              onFocusCapture={() => setFocused(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setFocused(false);
                }
              }}
            >
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  inert={index !== active}
                  aria-hidden={index !== active}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${features.length}`}
                  className={`min-w-0 [grid-area:1/1] ${index === active ? "pointer-events-auto" : "pointer-events-none"}`}
                >
                  <h3 className="font-montserrat mb-4 text-[28px] font-bold uppercase leading-[1.2] tracking-tight text-white sm:mb-5 sm:text-[36px]">
                    <RollingText text={feature.title} state={stateFor(index)} reduced={reduced} />
                  </h3>
                  {feature.bullets?.length ? (
                    <ul className="space-y-4 font-roboto text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
                      {feature.bullets.map((bullet, row) => (
                        <li key={bullet.label} className="flex items-start gap-3">
                          <span
                            className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary ${index === active ? "opacity-100" : "opacity-0"}`}
                          />
                          <span className="min-w-0 flex-1">
                            <RollingText
                              text={`${bullet.label}: ${bullet.text}`}
                              state={stateFor(index)}
                              delay={0.12 + row * 0.08}
                              reduced={reduced}
                            />
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {feature.description ? (
                    <p className="font-roboto text-[16px] leading-relaxed text-white/70 sm:text-[18px]">
                      <RollingText
                        text={feature.description}
                        state={stateFor(index)}
                        delay={0.12}
                        reduced={reduced}
                      />
                    </p>
                  ) : null}
                  {feature.showStoreBadges ? (
                    <div className={`mt-6 flex flex-wrap gap-3 ${index === active ? "visible" : "invisible"}`}>
                      <a
                        href="https://play.google.com/store/apps/details?id=com.elfaelectric.webapp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative h-12 w-[150px] focus-visible:outline-2 focus-visible:outline-brand-primary"
                      >
                        <Image
                          src={STORE_BADGES.googlePlay}
                          alt="Get it on Google Play"
                          fill
                          className="object-contain"
                          sizes="150px"
                        />
                      </a>
                      <a
                        href="https://apps.apple.com/pk/app/elfa-electric/id6744618877"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative h-12 w-[150px] focus-visible:outline-2 focus-visible:outline-brand-primary"
                      >
                        <Image
                          src={STORE_BADGES.appStore}
                          alt="Download on the App Store"
                          fill
                          className="object-contain"
                          sizes="150px"
                        />
                      </a>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            {features.length > 1 && (
              <div className="mt-8 flex items-center gap-5">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous feature"
                  className="group grid h-9 w-9 place-items-center text-brand-primary transition-colors hover:text-brand-secondary active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                >
                  <ArrowLeft size={22} strokeWidth={2} className="transition-transform duration-300 ease-out group-hover:-translate-x-1.5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next feature"
                  className="group grid h-9 w-9 place-items-center text-brand-primary transition-colors hover:text-brand-secondary active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                >
                  <ArrowRight size={22} strokeWidth={2} className="transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
