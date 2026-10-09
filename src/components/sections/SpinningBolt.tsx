"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function SpinningBolt() {
  return (
    <section className="relative flex w-full items-center justify-center bg-bg-primary pt-24 pb-8 lg:pt-32 lg:pb-28">
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative flex items-center justify-center perspective-[1000px]"
      >
        <Image
          src="/assets/images/levrix-mark-chrome.png"
          alt="ELFA Bolt"
          width={80}
          height={80}
          className="h-auto w-12 sm:w-16 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
        />
      </motion.div>
    </section>
  );
}
