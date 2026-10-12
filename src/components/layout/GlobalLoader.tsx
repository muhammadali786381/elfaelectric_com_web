"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function GlobalLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Prevent scrolling while loading screen is active
    document.body.style.overflow = "hidden";
    
    // Smooth scroll to top if not already there
    window.scrollTo(0, 0);

    const loaderTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1600); // Trigger exit animations at 1.6s

    const scrollTimer = setTimeout(() => {
      document.body.style.overflow = "";
    }, 2800); // Unlock scroll after panels finish retracting (~2.8s)

    return () => {
      clearTimeout(loaderTimer);
      clearTimeout(scrollTimer);
      document.body.style.overflow = "";
    };
  }, []);

  const letters = "MOVE SMARTER".split("");
  // Delays to create the symmetrical staircase: [0, 0.12, 0.24, 0.12, 0]
  const panelDelays = [0, 0.12, 0.24, 0.12, 0];

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="global-loading-screen"
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-end pb-[40px] sm:pb-[60px]"
            // Parent waits for children's exit animations
          >
            {/* 5 Vertical Panels */}
            <div className="absolute inset-0 flex h-full w-full pointer-events-none">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 1 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0, transition: { duration: 0.3 } }
                      : { 
                          scaleY: 0, 
                          transition: { 
                            duration: 0.8, 
                            ease: [0.76, 0, 0.24, 1], 
                            delay: panelDelays[i] + 0.15 // Wait for wordmark to fade
                          } 
                        }
                  }
                  className="h-full w-1/5 origin-top bg-brand-primary"
                />
              ))}
            </div>

            {/* Wordmark Container */}
            <motion.div 
              className="relative z-10 flex flex-col items-center pointer-events-none"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <div className="flex overflow-visible pb-1">
                {letters.map((letter, i) => (
                  <motion.span
                    key={i}
                    // Scale, blur, and opacity
                    initial={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0.001, scale: 2, filter: "blur(10px)" }
                    }
                    animate={
                      shouldReduceMotion
                        ? { opacity: 1 }
                        : { opacity: 1, scale: 1, filter: "blur(0px)" }
                    }
                    transition={{
                      type: "spring",
                      duration: 0.6,
                      bounce: 0.1,
                      delay: 0.15 + i * 0.07,
                    }}
                    className="inline-block font-montserrat text-[28px] xs:text-[32px] sm:text-[48px] md:text-[64px] font-black tracking-tight text-[#050505]"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </div>

              {/* Horizontal line beneath the wordmark */}
              <motion.div
                initial={{ scaleX: 0, backgroundColor: "rgba(0,0,0,0.15)" }}
                animate={{ scaleX: 1, backgroundColor: "#050505" }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.5, // Line finishes alongside text
                }}
                className="mt-2 h-[2px] w-[280px] origin-left sm:w-[400px]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main site content - homepage stationary underneath */}
      <div className="flex min-h-screen w-full flex-col">
        {children}
      </div>
    </>
  );
}
