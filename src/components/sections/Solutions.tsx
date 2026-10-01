"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const solutions = [
  {
    num: "01",
    title: "Lithium Iron Phosphate Battery",
    desc: "Proven LFP technology — faster charging, greater durability, higher capacity, and long-lasting performance built for daily use.",
  },
  {
    num: "02",
    title: "Efficient Motor Power",
    desc: "Optimized for extended range and responsive torque, with enhanced energy efficiency that lowers your running cost per kilometre.",
  },
  {
    num: "03",
    title: "App Tracking",
    desc: "Monitor location, live statistics, and remotely kill the engine — safety and oversight in the palm of your hand.",
  },
  {
    num: "04",
    title: "Advance Features",
    desc: "High-build body, alloy rims, and tubeless tyres engineered for Pakistan's roads — every detail optimised for durability.",
  },
];

export default function Solutions() {
  return (
    <section className="relative overflow-hidden bg-[#050505] pt-16 pb-0 lg:py-20 min-h-[auto] lg:max-h-[90vh] flex flex-col justify-center">
      {/* Floating bike — right-pinned, fades out at bottom */}
      <div
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-[40%] lg:block"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 40%, transparent 92%), linear-gradient(to left, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 40%, transparent 92%), linear-gradient(to left, black 55%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
          className="relative h-full w-full"
        >
          <Image
            src="/assets/images/solutions.webp"
            alt="ELFA EV-1 Scooty"
            fill
            className="object-contain object-right-top opacity-50"
            sizes="40vw"
          />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="font-roboto mb-4 text-[11px] font-bold uppercase tracking-[3px] text-brand-primary"
        >
          What We've Built
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1], delay: 0.05 }}
          className="font-montserrat mb-10 text-[28px] font-bold leading-tight tracking-tight text-white sm:text-[38px] lg:text-[44px] lg:mb-12"
        >
          Solutions We Offer
        </motion.h2>

        {/* Feature list — staggered rows, max width keeps clear of bike */}
        <div className="w-full lg:max-w-[52%]">
          {solutions.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                ease: [0.23, 1, 0.32, 1],
                delay: i * 0.07,
              }}
            >
              {/* Full-width rule */}
              <div className="h-px w-full bg-white/10" />

              <div className="flex items-start gap-6 py-5">
                {/* Number */}
                <span className="font-montserrat shrink-0 text-[11px] font-bold tabular-nums tracking-widest text-white/25 mt-1">
                  {s.num}
                </span>

                {/* Text */}
                <div className="flex flex-col">
                  <h3 className="font-montserrat mb-1.5 text-[16px] font-semibold leading-snug text-white sm:text-[18px]">
                    {s.title}
                  </h3>
                  <p className="font-roboto text-[14px] leading-relaxed text-white/55">
                    {s.desc}
                  </p>
                </div>

                {/* Brand-primary tick on the far right */}
                <div className="ml-auto shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-primary opacity-70" />
              </div>
            </motion.div>
          ))}

          {/* Closing rule */}
          <div className="h-px w-full bg-white/10" />
        </div>

        {/* Mobile-only image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mt-10 flex justify-center lg:hidden"
        >
          <Image
            src="/assets/images/solutions.webp"
            alt="ELFA EV-1 Scooty"
            width={500}
            height={662}
            className="h-auto w-full max-w-[420px] object-contain opacity-90"
          />
        </motion.div>
      </div>
    </section>
  );
}
