"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import LoadingScreen, { type LoaderTone } from "@/components/layout/LoadingScreen";
import styles from "./preview.module.css";

export default function LoaderPreview() {
  const [tone, setTone] = useState<LoaderTone>("midnight");
  const [mode, setMode] = useState<"still" | "play" | "done">("still");
  const [take, setTake] = useState(0);
  const finish = useCallback(() => setMode("done"), []);
  return (
    <main className={styles.preview}>
      <div className={styles.destination} inert={mode !== "done"}><h1>Ready to ride.</h1><Link href="/">Explore ELFA</Link></div>
      {mode !== "done" && <LoadingScreen key={take} tone={tone} still={mode === "still"} onComplete={finish} />}
      <div className={styles.controls} aria-label="Loader preview controls">
        <button aria-pressed={tone === "forest"} onClick={() => { setTone("forest"); setMode("still"); setTake(take + 1); }}>Forest green</button>
        <button aria-pressed={tone === "midnight"} onClick={() => { setTone("midnight"); setMode("still"); setTake(take + 1); }}>Midnight green</button>
        <button onClick={() => { setMode("play"); setTake(take + 1); }}>Replay animation</button>
        <button onClick={() => { setMode("still"); setTake(take + 1); }}>Still preview</button>
      </div>
    </main>
  );
}
