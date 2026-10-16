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
    const root = document.documentElement;
    const body = document.body;
    const saved = [root, body].flatMap(element => ["overflow-x", "overflow-y"].map(property => ({
      element, property, value: element.style.getPropertyValue(property), priority: element.style.getPropertyPriority(property),
    })));
    for (const { element, property } of saved) element.style.setProperty(property, "hidden");
    return () => {
      for (const { element, property, value, priority } of saved) {
        if (value) element.style.setProperty(property, value, priority);
        else element.style.removeProperty(property);
      }
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
