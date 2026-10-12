"use client";

import Image from "next/image";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  title: string;
  images?: string[];
};

export default function ProductColorCarousel({ title }: Props) {
  const images = [
    "/assets/images/products/ev-125/blackcompress.png",
    "/assets/images/products/ev-125/silvercompress.png",
    "/assets/images/products/ev-125/redbikecompress.png",
  ];

  const [pos1, setPos1] = React.useState(45);
  const [pos2, setPos2] = React.useState(55);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const [dragging, setDragging] = React.useState<1 | 2 | null>(null);

  const handlePointerDown = (e: React.PointerEvent, handleIndex: 1 | 2) => {
    e.preventDefault();
    setDragging(handleIndex);
  };

  const handlePointerMove = React.useCallback((e: PointerEvent) => {
    if (!dragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let newPos = (x / rect.width) * 100;
    
    if (dragging === 1) {
      newPos = Math.max(0, Math.min(newPos, pos2));
      setPos1(newPos);
    } else {
      newPos = Math.max(pos1, Math.min(newPos, 100));
      setPos2(newPos);
    }
  }, [dragging, pos1, pos2]);

  const handlePointerUp = React.useCallback(() => {
    setDragging(null);
  }, []);

  React.useEffect(() => {
    if (dragging !== null) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);
    }
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [dragging, handlePointerMove, handlePointerUp]);

  return (
    <section className="relative w-full overflow-hidden bg-[#050505] py-24 lg:py-36">
      {/* Background Image fading smoothly via mask */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
        }}
      >
        <Image
          src="/assets/images/products-bg.jpeg"
          alt="Colors Background"
          fill
          priority
          className="object-cover object-center opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-[#050505]/40" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center px-6">
        <h2 className="font-montserrat mb-16 text-center text-[36px] font-black italic uppercase leading-none tracking-tighter text-white sm:text-[48px] lg:text-[72px]">
          {title}
        </h2>
        
        {/* The Slider Container */}
        <div 
          className="relative aspect-[4/3] w-full max-w-[900px] overflow-hidden lg:aspect-[16/9]" 
          ref={containerRef} 
          style={{ touchAction: 'none' }}
        >
          {/* Base Image (Left) */}
          <Image src={images[0]} alt="Black Variant" fill className="object-contain pointer-events-none" />

          {/* Middle Image */}
          <div 
            className="absolute inset-0 select-none pointer-events-none"
            style={{ clipPath: `polygon(${pos1}% 0, 100% 0, 100% 100%, ${pos1}% 100%)` }}
          >
            <Image src={images[1]} alt="Silver Variant" fill className="object-contain" />
          </div>

          {/* Right Image */}
          <div 
            className="absolute inset-0 select-none pointer-events-none"
            style={{ clipPath: `polygon(${pos2}% 0, 100% 0, 100% 100%, ${pos2}% 100%)` }}
          >
            <Image src={images[2]} alt="Red Variant" fill className="object-contain" />
          </div>

          {/* Handle 1 */}
          <div
            className="absolute inset-y-0 w-0.5 bg-brand-primary/80 cursor-ew-resize select-none touch-none hover:bg-brand-primary transition-colors z-20"
            style={{ left: `calc(${pos1}% - 1px)` }}
            onPointerDown={(e) => handlePointerDown(e, 1)}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-transform active:scale-95">
              <ChevronLeft className="h-4 w-4 text-black/70 -mr-0.5" strokeWidth={3} />
              <ChevronRight className="h-4 w-4 text-black/70 -ml-0.5" strokeWidth={3} />
            </div>
          </div>

          {/* Handle 2 */}
          <div
            className="absolute inset-y-0 w-0.5 bg-brand-primary/80 cursor-ew-resize select-none touch-none hover:bg-brand-primary transition-colors z-20"
            style={{ left: `calc(${pos2}% - 1px)` }}
            onPointerDown={(e) => handlePointerDown(e, 2)}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-transform active:scale-95">
              <ChevronLeft className="h-4 w-4 text-black/70 -mr-0.5" strokeWidth={3} />
              <ChevronRight className="h-4 w-4 text-black/70 -ml-0.5" strokeWidth={3} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
