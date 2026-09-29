"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import Script from "next/script";

/** Digistartup form from live Elementor popup #1425 on /our-locations/ */
export const DEALERSHIP_FORM_SRC =
  "https://app.digistartupgroup.com/widget/form/0Q8IEKRUvKZhcX8b6jxl";

/** Trimmed vs live 457 — cuts empty space under the submit button */

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function DealershipApplyModal({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/86 p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dealership-apply-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[800px] px-4 overflow-y-auto overflow-x-hidden max-h-[95vh] rounded-[14px] border-4 border-[#464646] bg-[#111] shadow-[2px_8px_23px_3px_rgba(0,0,0,0.58)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-brand-primary text-bg-primary transition-opacity hover:opacity-90"
        >
          <X className="h-5 w-5" strokeWidth={2.5} />
        </button>

        <div className="px-4 pt-5 sm:px-5 sm:pt-6">
          <h2
            id="dealership-apply-title"
            className="font-montserrat mb-3 pr-10 text-center text-[26px] font-bold uppercase leading-[1.1] text-white sm:mb-4 sm:text-[34px]"
          >
            Apply for Dealership
          </h2>
        </div>

        <div className="w-full h-[600px] sm:h-[400px] overflow-y-auto overflow-x-hidden rounded-b-[10px]">
          <iframe
            src="https://app.digistartup.io/widget/form/0Q8IEKRUvKZhcX8b6jxl"
            style={{ width: "100%", height: "100%", border: "none", borderRadius: "0px" }}
            scrolling="yes"
            id="inline-0Q8IEKRUvKZhcX8b6jxl"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Apply for Dealership"
            data-height="404"
            data-layout-iframe-id="inline-0Q8IEKRUvKZhcX8b6jxl"
            data-form-id="0Q8IEKRUvKZhcX8b6jxl"
            data-cookie-consent="true"
            data-cookie-consent-provider="auto"
            title="Apply for Dealership"
          />
          <Script src="https://app.digistartup.io/js/form_embed.js" strategy="afterInteractive" />
        </div>
      </div>
    </div>
  );
}
