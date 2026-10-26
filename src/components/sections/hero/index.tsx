"use client";

import Image, { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import FlipButton from "@/components/ui/FlipButton";
import { heroFont } from "@/lib/fonts";
import { useLoaderReady } from "@/components/layout/GlobalLoader";
import { productCardData } from "@/components/sections/ProductShowcase";

const imageSizes = "(max-width: 1024px) 90vw, 55vw";
const scootySrc = "/assets/images/hero/White ELFA EV-1 Side Profile-2.png";
const { props: scootyPreload } = getImageProps({ src: scootySrc, alt: "", fill: true, sizes: imageSizes });
const sweepDuration = 0.9;
const revealMask = "linear-gradient(90deg, black 45%, transparent 55%)";
const concealMask = "linear-gradient(90deg, transparent 45%, black 55%)";

type WaveTextProps = {
  children: string;
  offset?: number;
  className?: string;
};

function WaveText({
  children,
  offset = 0,
  className = "",
}: WaveTextProps) {
  const reducedMotion = useReducedMotion();
  const ready = useLoaderReady();

  const stagger = 0.1;
  const pulseDuration = 0.9;
  const cycleDuration = 3.5;

  const restingShadow = [
    "0px 0px 0px rgba(97,206,112,0)",
    "0px 0px 0px rgba(97,206,112,0)",
    "0px 0px 0px rgba(255,255,255,0)",
  ].join(", ");

  const activeShadow = [
    "-5px 1.5px 1.5px rgba(97,206,112,0.6)",
    "5px -1.5px 1.5px rgba(97,206,112,1)",
    "0px 0px 10px rgba(255,255,255,0.25)",
  ].join(", ");

  return (
    <span
      aria-hidden="true"
      className={`block whitespace-nowrap ${className}`}
    >
      {Array.from(children).map((letter, index) =>
        letter === " " ? (
          <span
            key={index}
            className="inline-block w-[0.3em]"
          >
            {"\u00A0"}
          </span>
        ) : (
          <motion.span
            key={index}
            className="inline-block origin-bottom"
            initial={false}
            animate={
              reducedMotion || !ready
                ? { y: 0, scale: 1, textShadow: restingShadow }
                : {
                  y: [0, -3, 0],
                  scale: [1, 1.04, 1],
                  textShadow: [
                    restingShadow,
                    activeShadow,
                    restingShadow,
                  ],
                }
            }
            transition={{
              duration: pulseDuration,
              times: [0, 0.5, 1],
              ease: "easeInOut",
              delay: 0.4 + (offset + index) * stagger,
              repeat: Infinity,
              repeatDelay: cycleDuration - pulseDuration,
            }}
          >
            {letter}
          </motion.span>
        ),
      )}
    </span>
  );
}

export default function Hero() {
  const ready = useLoaderReady();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.2 });
  const reducedMotion = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [sweeping, setSweeping] = useState(false);
  const product = productCardData[selected];
  const isBike = product.id === "ev125";
  const duration = 0.8;
  const ease = [0.16, 1, 0.3, 1] as const;
  const textVariants = {
    enter: { opacity: 0, transform: reducedMotion ? "none" : "translateY(100%)" },
    visible: { opacity: 1, transform: "translateY(0%)" },
    exit: { opacity: 0, transform: reducedMotion ? "none" : "translateY(-100%)" },
  };

  useEffect(() => {
    if (!ready || !inView || focused || hovered || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) {
        setSelected(index => (index + 1) % productCardData.length);
        setSweeping(true);
      }
    }, 4000);
    return () => window.clearInterval(timer);
  }, [ready, inView, focused, hovered, reducedMotion]);

  return (
    <section ref={sectionRef} data-hero-ready={ready} data-hero-product={product.id}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-[#050505] pt-20 lg:flex-row lg:items-center lg:pt-0">
      <link rel="preload" as="image" href={scootyPreload.src} imageSrcSet={scootyPreload.srcSet} imageSizes={scootyPreload.sizes} />
      {/* Background with user-provided image and gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/hero/Emerald light trails over charcoal studio floor.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Gradients adjusted to let the background show through more clearly */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent lg:w-[60%]" />
        <div className="absolute inset-0 top-auto bottom-0 h-40 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
      </div>

      {/* Content - centered on mobile, left on desktop */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 pt-4 pb-8 text-center sm:px-10 lg:h-full lg:w-[50%] lg:flex-none lg:items-start lg:pb-32 lg:pl-16 lg:text-left xl:pl-24 2xl:pl-[100px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration, ease }}
          className="font-roboto mb-3 h-5 overflow-hidden text-[11px] font-bold uppercase tracking-[3px] text-brand-primary lg:text-[13px]"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div key={product.id} variants={textVariants} initial="enter" animate="visible" exit="exit"
              transition={{ duration: reducedMotion ? 0.1 : 0.3, ease }}>
              THE NEW {product.name}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <h1
          aria-label="Move into the future."
          className={`${heroFont.className} mb-7 flex flex-col items-center font-normal not-italic uppercase tracking-[-0.025em] text-white text-[34px] min-[400px]:text-[42px] sm:text-[58px] lg:text-[76px] xl:text-[96px] 2xl:text-[112px] lg:items-start`}
          style={{ transform: "skewX(-12deg)", transformOrigin: "left center" }}
        >
          <WaveText className="text-[0.76em] leading-[0.9]">
            MOVE INTO
          </WaveText>
          <span className="mt-1 flex items-baseline whitespace-nowrap leading-[0.9]">
            <WaveText offset={"MOVE INTO".length}>
              THE FUTURE
            </WaveText>
          </span>
        </h1>

        <div className="font-roboto mb-8 grid min-h-[3.25em] w-full max-w-[380px] overflow-hidden text-[15px] font-medium leading-relaxed text-white/70 sm:text-[17px] lg:text-[19px]">
          <AnimatePresence initial={false}>
            <motion.p key={product.id} className="col-start-1 row-start-1"
              variants={textVariants} initial="enter" animate={ready ? "visible" : "enter"} exit="exit"
              transition={{ duration: reducedMotion ? 0.1 : 0.45, ease }}>
              {isBike
                ? "Designed to perform on rough and challenging roads."
                : "Engineered to thrive on challenging local roads!"}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration, delay: 0.4, ease }}
          className="flex w-full max-w-[300px] flex-col items-stretch gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:gap-4 lg:mx-0"
        >
          <FlipButton
            href={product.exploreHref}
            variant="primary"
            shape="cut"
            animateLabel
            className="rounded-none h-12 sm:h-[50px] px-6 sm:px-8 text-[13px] w-full sm:w-52 sm:shrink-0"
          >
            {isBike ? "Explore Bikes" : "Explore EV-1"}
          </FlipButton>
          <FlipButton
            href="/book-a-test-ride"
            variant="outline"
            shape="cut"
            icon={<Calendar className="h-[14px] w-[14px]" strokeWidth={2} />}
            className="rounded-none h-12 sm:h-[50px] px-6 sm:px-8 text-[13px] border-white/20 text-white hover:border-brand-primary hover:bg-brand-primary hover:text-bg-primary w-full sm:w-auto"
          >
            Book a test ride
          </FlipButton>
        </motion.div>

      </div>

      {/* Product Image - Right side on desktop */}
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        className="relative z-10 flex flex-1 items-center justify-center px-4 pb-20 sm:px-10 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[55%] lg:items-end lg:pb-[60px] lg:pr-4">
        <motion.div
          initial={{ opacity: 0, x: "20vw" }}
          animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: "20vw" }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 50,
            damping: 15
          }}
          className="relative aspect-[4/3] w-[90%] max-w-[500px] lg:aspect-auto lg:h-[80%] lg:w-[130%] lg:max-w-none lg:translate-x-[-5%]"
        >
          {productCardData.map(model => {
            const active = model.id === product.id;
            const modelIsBike = model.id === "ev125";
            return (
          <motion.div key={model.id} data-hero-vehicle={model.id} aria-hidden={!active}
            className="absolute inset-0" initial={false}
            animate={{ maskPosition: isBike ? "0% 0%" : "100% 0%" }}
            transition={{ duration: sweepDuration, ease: "linear" }}
            style={{
              maskImage: modelIsBike ? revealMask : concealMask,
              maskSize: "300% 100%",
              maskRepeat: "no-repeat",
              visibility: active || sweeping ? "visible" : "hidden",
              pointerEvents: sweeping ? "none" : "auto",
            }}>
          {/* Hit area centered on the bike */}
          {modelIsBike && <div className="peer absolute inset-x-[15%] inset-y-[20%] z-50 cursor-crosshair rounded-full" />}

          {/* Bike (Default State) */}
          <div className="absolute inset-0 transition-opacity duration-700 ease-in-out opacity-100 peer-hover:opacity-0 pointer-events-none">
            <Image
              src={modelIsBike
                ? "/assets/images/hero/ELFA EV-125 motorcycle with soft ground shadow-1.png"
                : scootySrc}
              alt={model.name}
              fill
              preload={modelIsBike}
              loading={modelIsBike ? undefined : "eager"}
              className="object-contain object-center lg:object-right-bottom drop-shadow-2xl"
              sizes={imageSizes}
            />
          </div>

          {/* Red Bike (Hover State) */}
          {modelIsBike && <div className="absolute inset-0 transition-opacity duration-700 ease-in-out opacity-0 peer-hover:opacity-100 pointer-events-none">
            <Image
              src="/assets/images/hero/Metallic red ELFA EV-125 motorcycle.png"
              alt="EV-125 Red Bike"
              fill
              loading="eager"
              className="object-contain object-center lg:object-right-bottom drop-shadow-2xl"
              sizes={imageSizes}
            />
          </div>}
          </motion.div>
            );
          })}

          {sweeping && (
            <motion.div data-hero-sweep aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[60] overflow-hidden"
              initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: sweepDuration, times: [0, 0.5, 1], ease: "easeInOut" }}
              onAnimationComplete={() => setSweeping(false)}
              style={{ maskImage: "radial-gradient(ellipse at 50% 60%, black 35%, transparent 75%)" }}>
              <div className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(97,206,112,0.65), transparent 75%)" }} />
              <motion.div className="absolute -inset-12"
                initial={{ transform: isBike ? "translateX(-70%)" : "translateX(70%)" }}
                animate={{ transform: isBike ? "translateX(70%)" : "translateX(-70%)" }}
                transition={{ duration: sweepDuration, ease: "linear" }}
                style={{ background: "linear-gradient(105deg, transparent 28%, rgba(97,206,112,0.2) 40%, rgba(97,206,112,0.8) 47%, rgba(235,255,240,0.95) 50%, rgba(97,206,112,0.8) 53%, rgba(97,206,112,0.2) 60%, transparent 72%)" }} />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom Specs Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration, delay: 0.6, ease }}
        className="absolute bottom-4 left-0 right-0 z-20 flex w-full items-center justify-center px-2 lg:bottom-10"
      >
        <div className="flex w-full max-w-[1200px] flex-wrap items-center justify-center gap-y-2 divide-x divide-white/10 lg:flex-nowrap">
          {product.specs.map((spec, index) => (
            <div key={spec.label} className="w-1/2 lg:w-1/4">
              <div className="flex flex-col items-center justify-center gap-1 px-2 text-center lg:px-4">
                <div className="mb-0.5 h-[2px] w-5 bg-brand-primary lg:mb-1 lg:w-6" />
                <div className="grid overflow-hidden">
                  <AnimatePresence initial={false}>
                    <motion.div key={product.id} className="col-start-1 row-start-1 flex flex-col gap-1"
                      variants={textVariants} initial="enter" animate="visible" exit="exit"
                      transition={{ duration: reducedMotion ? 0.1 : 0.4, delay: reducedMotion ? 0 : index * 0.04, ease }}>
                      <span className="font-montserrat whitespace-nowrap text-[11px] font-bold tracking-widest text-white sm:text-[13px] lg:text-[14px]">
                        {(spec.icon === "speed" ? `Up to ${spec.value}` : spec.value.replace(" W", " Watt")).toUpperCase()}
                      </span>
                      <span className="font-roboto whitespace-nowrap text-[8.5px] font-medium uppercase tracking-[1px] text-white/50 sm:text-[9.5px] lg:text-[11px]">
                        {spec.icon === "battery" ? "BATTERY CAPACITY" : spec.label}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
