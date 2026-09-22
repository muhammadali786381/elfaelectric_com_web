"use client";

import Script from "next/script";

/** Same embed as https://elfaelectric.com — Call Center Studio Click2Connect */
const CLICK2CONNECT_SRC =
  "https://elfa.callcenterstudio.com/click2connects/click2connect.js?widget_key=ahRzfm11c3RlcmktaGl6bWV0bGVyaXIhCxIUQ2xpY2syQ29ubmVjdFBhY2thZ2UYgID6qIyF7AsMogEZZWxmYS5jYWxsY2VudGVyc3R1ZGlvLmNvbQ";

declare global {
  interface Window {
    startWidget?: (data?: Record<string, unknown>) => void;
  }
}

/** Loads the Contact Us chat pill (bottom-right) used on the live WordPress site. */
export default function Click2Connect() {
  return (
    <Script
      src={CLICK2CONNECT_SRC}
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window.startWidget === "function") {
          window.startWidget();
        }
      }}
    />
  );
}
