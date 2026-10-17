"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { useEffect } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string | null;
  sourceUrl?: string;
  sourceLabel?: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl, sourceUrl, sourceLabel }: VideoModalProps) {
  useEffect(() => {
    if (!isOpen || !videoUrl) return;

    // Preserve the page's overflow rules so sticky elements still use the
    // viewport after closing the modal or navigating away.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, videoUrl]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen || !videoUrl) return null;

  const isVertical = 
    videoUrl.includes("instagram.com") || 
    videoUrl.includes("tiktok.com") || 
    videoUrl.includes("isShort=1") || 
    videoUrl.includes("vertical=1");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          data-native-cursor
          aria-modal="true"
          aria-label="Video player"
          className="fixed inset-0 z-[10001] flex flex-col items-center justify-center gap-3 bg-black/90 p-4 backdrop-blur-md sm:p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative overflow-hidden rounded-[32px] bg-black shadow-2xl border border-white/10 mx-auto ${
              isVertical
                ? "aspect-[9/16] w-[min(400px,43.875dvh,calc(100vw-2rem))] shrink-0"
                : "aspect-video w-full max-w-[1200px] lg:max-h-[85vh]"
            }`}
          >
            <button
              type="button"
              aria-label="Close video player"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/80"
            >
              <X className="h-6 w-6" />
            </button>

            <iframe
              src={videoUrl}
              title="Video player"
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded px-3 text-sm text-white/80 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
            >
              Watch on {sourceLabel || "original site"}
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
