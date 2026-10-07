"use client";

import { useEffect } from "react";

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
  useEffect(() => {
    // Check if the script is already in the document
    let script = document.querySelector(`script[src="${CLICK2CONNECT_SRC}"]`) as HTMLScriptElement;

    if (!script) {
      // Create and inject the script
      script = document.createElement("script");
      script.type = "text/javascript";
      script.src = CLICK2CONNECT_SRC;
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        // Once loaded, initialize the widget just like the raw HTML snippet
        if (typeof window.startWidget === "function") {
          window.startWidget();
        }
      };
    } else {
      // If it already exists (e.g. strict mode or navigating back), just call it if available
      if (typeof window.startWidget === "function") {
        window.startWidget();
      }
    }
  }, []);

  return null;
}
