"use client";

import Image from "next/image";
import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

type Props = {
  image: string;
  title: string;
  productName: string;
};

export default function ScootyShowcase({ image, title, productName }: Props) {
  return (
    <section className="relative w-full overflow-hidden bg-[#050505] py-20 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/products-bg.jpeg"
          alt="Showcase Background"
          fill
          className="object-cover object-center opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-[#050505]/30" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-8">
        
        {/* Left: Scooty Image */}
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: 0.2 }}
          className="relative w-full max-w-[700px] mx-auto aspect-[4/3] lg:max-w-none"
        >
          <Image
            src={image}
            alt={productName}
            fill
            className="object-contain drop-shadow-2xl lg:object-left"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        {/* Right: Heading */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:pl-10">
          <motion.h2
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="font-montserrat mb-6 text-[32px] font-black italic uppercase leading-none tracking-tighter text-white sm:text-[44px] lg:text-[60px] xl:text-[72px]"
          >
            {title}
          </motion.h2>
        </div>
        
      </div>
    </section>
  );
}
