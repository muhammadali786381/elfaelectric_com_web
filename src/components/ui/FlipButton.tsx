"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DURATION = 0.25;
const STAGGER = 0.025;

interface FlipButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onDragEnter" | "onDragLeave" | "onDragOver" | "onDrop"> {
  children: string;
  href?: string;
  className?: string;
  variant?: "primary" | "dark" | "outline" | "glass" | "light";
  icon?: React.ReactNode;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
}

const MotionLink = motion.create(Link);

export default function FlipButton({
  children,
  href,
  className = "",
  variant = "primary",
  icon,
  target,
  rel,
  ...props
}: FlipButtonProps) {
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

  const combinedClasses = cn(baseClasses, variants[variant], className);

  /**
   * Inner content — both text layers live inside a single
   * `overflow-hidden` wrapper so the bottom copy is clipped
   * until hover slides it up.
   */
  const Content = () => (
    <>
      {icon && <span className="relative shrink-0">{icon}</span>}

      {/* Clip container — this is what prevents the overflow */}
      <span className="relative overflow-hidden" style={{ lineHeight: 1 }}>
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
        {...(props as any)}
      >
        <Content />
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
      <Content />
    </motion.button>
  );
}
