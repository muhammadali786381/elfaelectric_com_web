export type VideoLink = string | {
  url: string;
  thumbnail?: string;
  thumbnailPosition?: string;
};

export type ReelPlatform = "youtube" | "instagram" | "linkedin" | "tiktok" | "other";

export interface SocialReel {
  url: string;
  platform: ReelPlatform;
  embedUrl: string | null;
  thumbnail?: string;
  thumbnailPosition?: string;
  thumbnailFallback?: string;
}

/** Resolve platform behavior from the URL; post data only needs a URL and optional thumbnail. */
export function resolveSocialReel(link: VideoLink): SocialReel | null {
  const entry: Exclude<VideoLink, string> = typeof link === "string" ? { url: link } : link;
  const { url, thumbnail, thumbnailPosition } = entry;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;

  const host = parsed.hostname.toLowerCase();
  const isHost = (domain: string) => host === domain || host.endsWith(`.${domain}`);
  const reel: SocialReel = { url, thumbnail, thumbnailPosition, platform: "other", embedUrl: null };

  if (isHost("youtube.com") || isHost("youtu.be") || isHost("youtube-nocookie.com")) {
    reel.platform = "youtube";
    const parts = parsed.pathname.split("/").filter(Boolean);
    const id = isHost("youtu.be") ? parts[0]
      : parsed.searchParams.get("v") || (["shorts", "embed", "live"].includes(parts[0]) ? parts[1] : null);
    if (id && /^[\w-]{11}$/.test(id)) {
      const isShort = parts[0] === "shorts" || parsed.searchParams.get("isShort") === "1";
      reel.embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1${isShort ? "&isShort=1" : ""}`;
      reel.thumbnail = thumbnail || `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
      reel.thumbnailFallback = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }
  } else if (isHost("instagram.com")) {
    reel.platform = "instagram";
  } else if (isHost("linkedin.com") || isHost("lnkd.in")) {
    reel.platform = "linkedin";
  } else if (isHost("tiktok.com")) {
    reel.platform = "tiktok";
    const id = parsed.pathname.match(/\/(?:video|player\/v1|embed\/v2)\/(\d+)/)?.[1];
    // Short/share links without a post ID open on TikTok instead of a broken iframe.
    if (id) reel.embedUrl = `https://www.tiktok.com/player/v1/${id}?autoplay=1`;
  }

  return reel;
}
