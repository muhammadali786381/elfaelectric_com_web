"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/components/cart/CartContext";

/** Flying product thumbnail → floating cart button (bottom-left). */
export default function CartFlyAnimation() {
  const { fly, clearFly, openCart } = useCart();

  // Floating cart FAB: left ~50px center, bottom ~118px from bottom (above WhatsApp)
  const targetLeft = 50;
  const targetTop =
    typeof window !== "undefined" ? window.innerHeight - 118 : 700;

  return (
    <AnimatePresence>
      {fly ? (
        <motion.img
          key={`${fly.image}-${fly.from.x}-${fly.from.y}`}
          src={fly.image}
          alt=""
          className="pointer-events-none fixed z-[80] rounded-xl object-contain shadow-lg"
          initial={{
            left: fly.from.x,
            top: fly.from.y,
            width: Math.min(fly.from.w * 0.45, 160),
            height: Math.min(fly.from.h * 0.45, 160),
            x: "-50%",
            y: "-50%",
            opacity: 1,
            scale: 1,
          }}
          animate={{
            left: targetLeft,
            top: targetTop,
            width: 36,
            height: 36,
            opacity: 0.4,
            scale: 0.4,
          }}
          exit={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => {
            clearFly();
            openCart();
          }}
        />
      ) : null}
    </AnimatePresence>
  );
}
