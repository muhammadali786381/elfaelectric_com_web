"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const bolt = "/assets/images/boltblackwhite.png";

export default function SpinningBolt() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="flex w-full items-center justify-center bg-bg-primary px-4 py-16 sm:py-20 lg:pb-34 lg:pt-26">
      <div className="mx-auto flex items-center justify-center" style={{ perspective: 1000 }}>
        <motion.div
          className="relative isolate mx-auto aspect-[2/3] w-16 origin-center sm:w-20 lg:w-24"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: reduceMotion ? 0 : -360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src={bolt}
            alt="ELFA Bolt"
            fill
            sizes="(min-width: 1024px) 96px, (min-width: 640px) 80px, 64px"
            className="object-contain"
          />

          {/* Moving highlights and shadows inside the bolt */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              maskImage: `url("${bolt}")`,
              WebkitMaskImage: `url("${bolt}")`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskPosition: "center",
              WebkitMaskPosition: "center",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              backgroundImage:
                "linear-gradient(115deg, #111 0%, #777 20%, #fff 35%, #444 50%, #111 65%, #fff 80%, #111 100%)",
              backgroundSize: "300% 100%",
              mixBlendMode: "soft-light",
              opacity: 0.85,
            }}
            animate={{
              backgroundPosition: reduceMotion
                ? "50% 50%"
                : ["0% 50%", "100% 50%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
