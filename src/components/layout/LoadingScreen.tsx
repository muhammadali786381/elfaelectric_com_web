"use client";

import { useEffect, type CSSProperties } from "react";
import { useAnimate, type AnimationSequence } from "framer-motion";
import { PRELOADER } from "./preloader-config";
import { heroFont } from "@/lib/fonts";
import styles from "./LoadingScreen.module.css";

type LoadingScreenProps = {
  still?: boolean;
  sessionBound?: boolean;
  onReveal?: () => void;
  onComplete?: () => void;
};

export default function LoadingScreen({ still = false, sessionBound = false, onReveal, onComplete }: LoadingScreenProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    if (still || !scope.current) return;
    let cancelled = false;
    let completed = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = scope.current;
    const finish = () => {
      if (cancelled || completed) return;
      completed = true;
      onComplete?.();
    };
    const sequence: AnimationSequence = [];

    if (reduced) {
      sequence.push([root, { opacity: [1, 0] }, {
        at: PRELOADER.reducedHold, duration: PRELOADER.reducedFade,
      }]);
    } else {
      const text = root.querySelector<HTMLElement>("[data-loader-text]")!;
      const letters = root.querySelectorAll<HTMLElement>("[data-loader-letter]");
      const line = root.querySelector<HTMLElement>("[data-loader-line]")!;
      const blinds = root.querySelectorAll<HTMLElement>("[data-loader-blind]");

      letters.forEach((letter, index) => {
        sequence.push([letter, { opacity: [0, 1], transform: ["translateY(100%)", "translateY(0%)"] }, {
          at: PRELOADER.textEnterAt + index * PRELOADER.letterStagger,
          duration: PRELOADER.textEnterDuration, ease: [...PRELOADER.entranceEasing],
        }]);
      });
      sequence.push([line, { transform: ["scaleX(0)", "scaleX(1)"] }, {
        at: PRELOADER.lineStart, duration: PRELOADER.lineDuration,
        ease: [...PRELOADER.entranceEasing],
      }]);
      sequence.push([text, { opacity: [1, 0] }, {
        at: PRELOADER.textFadeAt, duration: PRELOADER.textFadeDuration,
      }]);
      sequence.push([line, { opacity: [1, 0] }, {
        at: PRELOADER.lineExitAt, duration: PRELOADER.lineExitDuration,
        ease: [...PRELOADER.entranceEasing],
      }]);
      blinds.forEach((blind, index) => {
        sequence.push([blind, { transform: ["translateY(0%)", `translateY(${index === 0 ? "-100%" : "100%"})`] }, {
          at: PRELOADER.panelStart, duration: PRELOADER.panelDuration,
          ease: [...PRELOADER.panelEasing],
        }]);
      });
    }

    const revealTimer = window.setTimeout(() => {
      if (!cancelled) onReveal?.();
    }, (reduced ? PRELOADER.reducedHold : PRELOADER.panelStart) * 1000);
    const fallback = window.setTimeout(finish, PRELOADER.fallbackMs);
    const controls = animate(sequence);
    // Cancellation guards prevent Strict Mode's discarded run completing.
    controls.then(finish, finish);
    return () => {
      cancelled = true;
      window.clearTimeout(revealTimer);
      window.clearTimeout(fallback);
      controls.stop();
    };
  }, [animate, scope, still, onReveal, onComplete]);

  return (
    <div ref={scope} className={styles.screen} data-elfa-loader data-loader-session={sessionBound ? "" : undefined}
      data-still={still} aria-hidden="true" style={{ "--loader-fallback": `${PRELOADER.fallbackMs}ms` } as CSSProperties}>
      <div className={`${styles.blind} ${styles.topBlind}`} data-loader-blind />
      <div className={`${styles.blind} ${styles.bottomBlind}`} data-loader-blind />
      <div className={styles.brand}>
        <p className={`${heroFont.className} ${styles.name}`} data-loader-text>
          {Array.from(PRELOADER.label).map((letter, index) => (
            <span className={styles.letterWindow} key={index}>
              <span className={styles.letter} data-loader-letter>{letter === " " ? "\u00a0" : letter}</span>
            </span>
          ))}
        </p>
        <div className={styles.line} data-loader-line />
      </div>
    </div>
  );
}
