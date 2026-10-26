"use client";

import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import styles from "./FlipButton.module.css";

const DURATION = 0.25;
const STAGGER = 0.025;

interface FlipButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onDragEnter" | "onDragLeave" | "onDragOver" | "onDrop"> {
  children: string;
  href?: string;
  className?: string;
  variant?: "primary" | "dark" | "outline" | "glass" | "light";
  shape?: "pill" | "cut";
  icon?: React.ReactNode;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  animateLabel?: boolean;
}

const MotionLink = motion.create(Link);

export default function FlipButton({
  children,
  href,
  className = "",
  variant = "primary",
  shape = "pill",
  icon,
  target,
  rel,
  animateLabel = false,
  ...props
}: FlipButtonProps) {
  const reducedMotion = useReducedMotion();
  const baseClasses =
    "relative inline-flex items-center justify-center gap-2 px-8 py-3 text-xs md:text-sm font-bold uppercase tracking-[0.1em] transition-colors duration-300 rounded-full group";

  const variants = {
    primary:
      "bg-brand-primary text-bg-primary hover:bg-brand-secondary hover:shadow-[0_0_20px_rgba(97,206,112,0.4)]",
    dark: "bg-zinc-950 text-white hover:bg-zinc-900 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    light: "bg-white text-zinc-950 hover:bg-zinc-100",
    outline:
      "border border-white/25 bg-transparent text-white hover:border-white hover:bg-white hover:text-black",
    glass:
      "backdrop-blur-md bg-white/5 border border-white/10 text-white hover:bg-white/10",
  };

  const combinedClasses = cn(baseClasses, variants[variant], className, shape === "cut" && styles.cut, shape === "cut" && variant === "outline" && styles.cutOutline);

  const label = (
    <>
        {/* Layer 1: visible at rest, slides UP on hover */}
        <span className="flex items-center">
          {children.split("").map((l, i) => (
            <motion.span
              key={i}
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block"
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          ))}
        </span>

        {/* Layer 2: hidden below, slides UP into view on hover */}
        <span
          className="absolute inset-0 flex items-center pointer-events-none"
          aria-hidden="true"
        >
          {children.split("").map((l, i) => (
            <motion.span
              key={i}
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block"
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          ))}
        </span>
    </>
  );

  const content = (
    <>
      {shape === "cut" && variant === "outline" && (
        <svg className={styles.outline} viewBox="0 0 200 50" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 0.5 0.5 H 187.5 L 199.5 12.5 V 49.5 H 12.5 L 0.5 37.5 Z" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
      )}
      {icon && <span className="relative shrink-0">{icon}</span>}
      <span className="relative overflow-hidden" style={{ lineHeight: 1 }}>
        {animateLabel ? (
          <AnimatePresence initial={false} mode="wait">
            <motion.span key={children} className="block"
              initial={{ opacity: 0, transform: reducedMotion ? "none" : "translateY(100%)" }}
              animate={{ opacity: 1, transform: "translateY(0%)" }}
              exit={{ opacity: 0, transform: reducedMotion ? "none" : "translateY(-100%)" }}
              transition={{ duration: reducedMotion ? 0.1 : 0.25, ease: [0.16, 1, 0.3, 1] }}>
              {label}
            </motion.span>
          </AnimatePresence>
        ) : label}
      </span>
    </>
  );

  if (href) {
    return (
      <MotionLink
        href={href}
        target={target}
        rel={rel}
        initial="initial"
        whileHover="hovered"
        whileTap="hovered"
        className={combinedClasses}
        {...(props as Omit<React.ComponentProps<typeof MotionLink>, "href">)}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      initial="initial"
      whileHover="hovered"
      whileTap="hovered"
      className={combinedClasses}
      {...props}
    >
      {content}
    </motion.button>
  );
}
