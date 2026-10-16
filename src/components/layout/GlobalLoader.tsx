"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import { PRELOADER } from "./preloader-config";

const LoaderReadyContext = createContext(true);
export const useLoaderReady = () => useContext(LoaderReadyContext);

type LoaderPhase = "intro" | "revealing" | "done";

export default function GlobalLoader({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<LoaderPhase>("intro");
  const completed = useRef(false);
  const reveal = useCallback(() => {
    if (!completed.current) setPhase("revealing");
  }, []);
  const finish = useCallback(() => {
    if (completed.current) return;
    completed.current = true;
    try { sessionStorage.setItem(PRELOADER.sessionKey, "1"); } catch { /* Private storage may be unavailable. */ }
    setPhase("done");
  }, []);

  useEffect(() => {
    let cancelled = false;
    let skip = window.__elfaPreloader?.skip;
    if (skip === undefined) {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      try { skip = navigation?.type !== "reload" && sessionStorage.getItem(PRELOADER.sessionKey) === "1"; } catch { skip = false; }
    }
    const remaining = (window.__elfaPreloader?.deadline ?? Date.now() + PRELOADER.fallbackMs) - Date.now();
    if (skip || remaining <= 0) {
      queueMicrotask(() => { if (!cancelled) finish(); });
      return () => { cancelled = true; };
    }
    const timeout = window.setTimeout(finish, remaining);
    return () => { cancelled = true; window.clearTimeout(timeout); };
  }, [finish]);

  const isLoading = phase !== "done";
  useEffect(() => {
    if (!isLoading || window.__elfaPreloader?.skip) return;
    // Preserve the native scrollbar and page width while preventing movement.
    const { scrollX, scrollY } = window;
    const preventScroll = (event: Event) => event.preventDefault();
    const preventScrollKeys = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
        event.preventDefault();
      }
    };
    const restorePosition = () => {
      if (window.scrollX !== scrollX || window.scrollY !== scrollY) {
        window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
      }
    };
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventScrollKeys);
    window.addEventListener("scroll", restorePosition);
    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventScrollKeys);
      window.removeEventListener("scroll", restorePosition);
    };
  }, [isLoading]);

  return (
    <LoaderReadyContext value={phase !== "intro"}>
      {isLoading && <LoadingScreen sessionBound onReveal={reveal} onComplete={finish} />}
      <div className="flex min-h-screen w-full flex-col" aria-busy={isLoading}
        onFocusCapture={event => { if (isLoading) event.target.blur(); }}
        onKeyDownCapture={event => { if (isLoading && ["Tab", "Enter", " "].includes(event.key)) event.preventDefault(); }}
        onClickCapture={event => { if (isLoading) { event.preventDefault(); event.stopPropagation(); } }}>
        {children}
      </div>
    </LoaderReadyContext>
  );
}
