"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

export type LoaderTone = "forest" | "midnight";

export default function LoadingScreen({ tone = "midnight", still = false, onComplete }: {
  tone?: LoaderTone;
  still?: boolean;
  onComplete?: () => void;
}) {
  const [exiting, setExiting] = useState(false);
  const [imageState, setImageState] = useState<"pending" | "ready" | "unavailable">("pending");

  useEffect(() => {
    // A slow or failed image must never hold the site indefinitely.
    const fallback = window.setTimeout(() => {
      setImageState((state) => state === "pending" ? "unavailable" : state);
    }, 1000);
    return () => window.clearTimeout(fallback);
  }, []);

  useEffect(() => {
    if (still || imageState === "pending") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // A brief brand intro, not a simulated download or progress percentage.
    const hold = reduced ? 500 : 1150;
    const exitTimer = window.setTimeout(() => setExiting(true), hold);
    const completeTimer = window.setTimeout(() => onComplete?.(), hold + (reduced ? 200 : 650));
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [still, onComplete, imageState]);

  return (
    <div className={styles.screen} data-tone={tone} data-ready={imageState !== "pending"} data-exiting={exiting} data-still={still} role="status" aria-label="Loading ELFA Electric">
      <div className={styles.panels} aria-hidden="true">
        {[0, 1, 2, 3, 4].map((panel) => <div key={panel} className={styles.panel} />)}
      </div>
      <div className={styles.composition} aria-hidden="true">
        <div className={styles.logo} hidden={imageState === "unavailable"}>
          <Image src="/assets/images/logo-full.png" alt="" width={1024} height={250}
            sizes="230px" loading="eager" fetchPriority="high" className={styles.logoImage}
            onLoad={() => setImageState((state) => state === "pending" ? "ready" : state)}
            onError={() => setImageState("unavailable")} />
        </div>
        <div className={styles.titleMask}>
          <p className={styles.title}>MOVE <span>SMARTER</span></p>
        </div>
      </div>
    </div>
  );
}
