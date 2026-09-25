"use client";

import Image from "next/image";
import { ImageComparisonSlider } from "@/components/ui/image-comparison-slider-horizontal";

type Props = {
  title: string;
  images: string[];
};

export default function ProductColorCarousel({ title, images }: Props) {
  // We need at least 2 images to compare. If there's only 1, we just duplicate it.
  const leftImage = images[0] || "";
  const rightImage = images[1] || images[0] || "";

  return (
    <section className="relative w-full overflow-hidden bg-[#050505] py-24 lg:py-36">
      {/* Background Image with Dark Gradients */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/products-bg.jpeg"
          alt="Colors Background"
          fill
          priority
          className="object-cover object-center opacity-30 mix-blend-luminosity"
        />
        {/* Gradients to fade smoothly into the hero above and sections below */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-[#050505]/40" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center px-6">
        <h2 className="font-montserrat mb-16 text-center text-[36px] font-black italic uppercase leading-none tracking-tighter text-white sm:text-[48px] lg:text-[72px]">
          {title}
        </h2>
        
        {/* The Slider Container */}
        <div className="relative aspect-[4/3] w-full max-w-[900px] overflow-hidden lg:aspect-[16/9]">
           <ImageComparisonSlider
             leftImage={leftImage}
             rightImage={rightImage}
             altLeft="Color Variant 1"
             altRight="Color Variant 2"
             className="w-full h-full"
           />
        </div>
      </div>
    </section>
  );
}
