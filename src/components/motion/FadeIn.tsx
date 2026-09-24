"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

/** CSS `ease` approx — Motion rejects the string `"ease"` */
export const ease = [0.25, 0.1, 0.25, 1] as const;

export const duration = {
  normal: 1.25,
  slow: 2,
  fast: 0.75,
} as const;

type Variant = "fadeIn" | "fadeInLeft" | "fadeInRight" | "fadeInUp" | "fadeOut";

const presets: Record<
  Variant,
  { initial: Record<string, number | string>; animate: Record<string, number | string> }
> = {
  fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  /** From left → place (px only — % x can skew flex/grid card heights) */
  fadeInLeft: { initial: { opacity: 0, x: -96 }, animate: { opacity: 1, x: 0 } },
  /** From right → place */
  fadeInRight: { initial: { opacity: 0, x: 96 }, animate: { opacity: 1, x: 0 } },
  fadeInUp: { initial: { opacity: 0, y: 72 }, animate: { opacity: 1, y: 0 } },
  fadeOut: { initial: { opacity: 0, scale: 0.96 }, animate: { opacity: 1, scale: 1 } },
};

type FadeInProps = {
  children: ReactNode;
  variant?: Variant;
  speed?: keyof typeof duration;
  delay?: number;
  className?: string;
  /** `animate` on mount (hero slides); default is whileInView */
  immediate?: boolean;
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "animate" | "whileInView" | "transition">;

export function FadeIn({
  children,
  variant = "fadeIn",
  speed = "normal",
  delay = 0,
  className,
  immediate = false,
  ...rest
}: FadeInProps) {
  const v = presets[variant];
  const transition = { duration: duration[speed], delay, ease };

  if (immediate) {
    return (
      <motion.div
        className={className}
        initial={v.initial}
        animate={v.animate}
        transition={transition}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once: true, amount: 0.2 }}
      transition={transition}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
