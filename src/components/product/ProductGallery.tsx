"use client";

import CarouselStacked from "@/components/ui/carousel-07";
import { motion } from "motion/react";

type Props = {
  shortName: string;
  buyHref?: string;
  images: string[];
};

/**
 * Product gallery — centered title + interactive stacked photo carousel.
 */
export default function ProductGallery({ shortName, images }: Props) {
  const slides = images.map((image) => ({ image }));

  return (
    <section className="bg-[#050505] py-8 lg:py-12">
      <div className="mx-auto w-full max-w-[1150px] px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="font-montserrat text-[28px] font-bold italic leading-none text-brand-primary sm:text-[36px] lg:text-[42px]">
            {shortName}
          </p>
          <h2 className="font-montserrat mt-2 text-[32px] font-bold uppercase leading-tight tracking-wide text-white sm:text-[44px] lg:text-[56px] lg:leading-[1.05]">
            Product Gallery
          </h2>
        </motion.div>

        <div className="mt-8 sm:mt-10">
          <CarouselStacked slides={slides} />
        </div>
      </div>
    </section>
  );
}
