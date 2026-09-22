"use client";

import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";

type Props = {
  shortName: string;
  buyHref?: string;
  images: string[];
};

/**
 * Product gallery — centered title + 3D cylindrical photo carousel.
 * Layout title matches live EV-125; media uses the Framer Motion 3D carousel.
 */
export default function ProductGallery({ shortName, images }: Props) {
  return (
    <section className="bg-white py-[70px]">
      <div className="mx-auto w-full max-w-[1150px] px-4 sm:px-6">
        <div className="text-center">
          <p className="font-montserrat text-[28px] font-bold italic leading-none text-[#61ce70] sm:text-[36px] lg:text-[42px]">
            {shortName}
          </p>
          <h2 className="font-montserrat mt-2 text-[32px] font-bold uppercase leading-tight tracking-wide text-[#212121] sm:text-[44px] lg:text-[56px] lg:leading-[1.05]">
            Product Gallery
          </h2>
        </div>

        <div className="mt-8 sm:mt-10">
          <ThreeDPhotoCarousel images={images} />
        </div>
      </div>
    </section>
  );
}
