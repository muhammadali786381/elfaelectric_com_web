"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./Solutions.module.css";

const solutions = [
  {
    title: "Lithium Iron Phosphate Battery",
    desc: "Proven LFP technology — faster charging, greater durability, higher capacity, and long-lasting performance built for daily use.",
  },
  {
    title: "Efficient Motor Power",
    desc: "Optimized for extended range and responsive torque, with enhanced energy efficiency that lowers your running cost per kilometre.",
  },
  {
    title: "App Tracking",
    desc: "Monitor location, live statistics, and remotely kill the engine — safety and oversight in the palm of your hand.",
  },
  {
    title: "Advanced Features",
    desc: "High-build body, alloy rims, and tubeless tyres engineered for Pakistan's roads — every detail optimised for durability.",
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
          Solutions <span>we offer.</span>
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
