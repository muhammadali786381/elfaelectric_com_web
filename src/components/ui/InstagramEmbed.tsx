"use client";

import { useEffect, useRef } from "react";

interface InstagramEmbedProps {
  url: string;
}

export default function InstagramEmbed({ url }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const processEmbed = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    if (window.instgrm) {
      setTimeout(processEmbed, 100);
    } else {
      const script = document.createElement("script");
      script.async = true;
      script.src = "//www.instagram.com/embed.js";
      script.onload = () => setTimeout(processEmbed, 100);
      document.body.appendChild(script);
    }
  }, [url]);

  // Extract the base URL for the post (e.g. https://www.instagram.com/p/ID/)
  // The url might be a full reel url or an embed url. Let's make sure it's the base post URL.
  let postUrl = url;
  if (url.includes("/embed")) {
    postUrl = url.split("/embed")[0] + "/";
  }

  return (
    <div ref={containerRef} className="flex h-full w-full items-center justify-center bg-black overflow-y-auto overflow-x-hidden">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={postUrl}
        data-instgrm-version="14"
        style={{
          background: "#000",
          border: "0",
          borderRadius: "3px",
          boxShadow: "none",
          margin: "auto",
          maxWidth: "400px",
          minWidth: "320px",
          width: "calc(100% - 2px)"
        }}
      >
      </blockquote>
    </div>
  );
}

// Extend Window interface for instgrm
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}
