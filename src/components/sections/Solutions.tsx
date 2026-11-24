"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./Solutions.module.css";

type SolutionItem = {
  title: string;
  desc: ReactNode;
};

const solutions: SolutionItem[] = [
  {
    title: "Advanced LFP Battery",
    desc: "Lithium Iron Phosphate technology enables fast charging and delivers over 3,000+ charge cycles for long-lasting use.",
  },
  {
    title: "Efficient Motor Performance",
    desc: "Optimised power delivery and torque ensure smooth acceleration and efficient energy use.",
  },
  {
    title: "Cruise Control",
    desc: "Maintain a steady speed with cruise control for a more relaxed and convenient riding experience.",
  },
  {
    title: "Digital LED Meter",
    desc: (
      <>
        Monitor speed, battery status,
        <br />
        riding modes and distance
        <br />
        at a glance.
      </>
    ),
  },
  {
    title: "Disc Brakes",
    desc: "Enjoy controlled braking and responsive stopping.",
  },
  {
    title: "Water-Resistant Battery",
    desc: "Designed with an IP rating that provides protection against water and moisture exposure.",
  },
];

const ease = [0.23, 1, 0.32, 1] as const;

export default function Solutions() {
  const reduced = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="solutions-heading">
      <div className={styles.inner}>
        <motion.h2
          id="solutions-heading"
          className={styles.heading}
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.65, ease }}
        >
          Advanced Features <span>&amp; Technology</span>
        </motion.h2>

        <div className={styles.showroom}>
          <motion.div
            className={styles.lineup}
            initial={reduced ? false : { opacity: 0, scale: 0.82 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, ease, delay: 0.08 }}
          >
            <Image
              src="/assets/images/bikelineup.png"
              alt="ELFA electric lineup: silver EV-1 scooter, front-facing motorcycle, and red EV-125 motorcycle"
              width={1536}
              height={1024}
              className={styles.image}
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1199px) 90vw, 896px"
            />
          </motion.div>

          <div className={styles.solutions}>
            {solutions.map((solution, index) => {
              const fromLeft = index % 2 === 0;
              return (
                <motion.article
                  key={solution.title}
                  className={styles.solution}
                  initial={
                    reduced
                      ? false
                      : { opacity: 0, y: 18, x: fromLeft ? -28 : 28 }
                  }
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.6,
                    ease,
                    delay: 0.2 + index * 0.1,
                  }}
                >
                  <div className={styles.connector} aria-hidden="true" />
                  <h3>{solution.title}</h3>
                  <p>{solution.desc}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
