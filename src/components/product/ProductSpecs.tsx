"use client";

import Image from "next/image";
import type { ProductSpecGroup } from "@/data/products/types";
import { motion } from "motion/react";

export default function ProductSpecs({ groups }: { groups: ProductSpecGroup[] }) {
  return (
    <section className="bg-[#050505] py-24 lg:py-32">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-6">
        
        <div className="mb-20 flex flex-col items-center justify-center text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 0.2, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-montserrat text-[40px] font-black italic uppercase leading-[0.9] tracking-tighter text-white sm:text-[56px] lg:text-[80px]"
          >
            Specifications
          </motion.h2>
        </div>

        <div className="grid w-full grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="group relative flex flex-col items-start gap-4 transition-all duration-300"
            >
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <Image src={g.icon} alt="" fill className="object-contain" sizes="64px" />
              </div>

              <h3 className="font-montserrat text-left text-[22px] font-bold tracking-wide text-white">
                {g.title}
              </h3>

              <ul className="font-roboto mt-2 flex w-full flex-col gap-3 text-[15px] font-medium text-white/70">
                {g.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary"
                      aria-hidden
                    />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
