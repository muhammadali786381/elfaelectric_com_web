import assert from "node:assert/strict";
import { test } from "node:test";
import { resolveSocialReel } from "./social-reels";

test("YouTube URL variants resolve to the same playable video", () => {
  const id = "8Bo9COEhjP8";
  for (const url of [
    `https://www.youtube.com/watch?v=${id}&feature=share`,
    `https://m.youtube.com/watch?v=${id}`,
    `https://youtu.be/${id}?si=share`,
    `https://www.youtube.com/embed/${id}`,
    `https://www.youtube-nocookie.com/embed/${id}`,
    `https://www.youtube.com/live/${id}`,
  ]) {
    const reel = resolveSocialReel(url);
    assert.equal(reel?.platform, "youtube");
    assert.equal(reel?.embedUrl, `https://www.youtube.com/embed/${id}?autoplay=1`);
    assert.ok(reel?.thumbnail?.includes(`/vi/${id}/`));
  }
});

test("YouTube Shorts retain portrait playback and custom thumbnails override defaults", () => {
  const reel = resolveSocialReel({
    url: "https://youtube.com/shorts/7vc4GGQWmJg?si=share",
    thumbnail: "/assets/images/custom.jpg",
  });
  assert.equal(reel?.thumbnail, "/assets/images/custom.jpg");
  assert.ok(reel?.embedUrl?.includes("isShort=1"));
});

test("Instagram reels and feed posts open externally with supplied thumbnails", () => {
  for (const path of ["reel/post-id/", "p/post-id/"]) {
    const reel = resolveSocialReel({ url: `https://www.instagram.com/${path}`, thumbnail: "/instagram.jpg" });
    assert.equal(reel?.platform, "instagram");
    assert.equal(reel?.embedUrl, null);
    assert.equal(reel?.thumbnail, "/instagram.jpg");
  }
});

test("LinkedIn posts and shortened links open externally", () => {
  for (const url of ["https://www.linkedin.com/posts/another-post", "https://lnkd.in/share-id"]) {
    const reel = resolveSocialReel({ url, thumbnail: "/linkedin.jpg" });
    assert.equal(reel?.platform, "linkedin");
    assert.equal(reel?.url, url);
    assert.equal(reel?.embedUrl, null);
  }
});

test("TikTok video links use the official player and retain their custom thumbnail", () => {
  const reel = resolveSocialReel({
    url: "https://www.tiktok.com/@another-account/video/7691662720969493767?is_from_webapp=1",
    thumbnail: "/tiktok.jpg",
    thumbnailPosition: "center 24%",
  });
  assert.equal(reel?.platform, "tiktok");
  assert.equal(reel?.embedUrl, "https://www.tiktok.com/player/v1/7691662720969493767?autoplay=1");
  assert.equal(reel?.thumbnail, "/tiktok.jpg");
  assert.equal(reel?.thumbnailPosition, "center 24%");
});

test("TikTok share links and unsupported video URLs fall back to external navigation", () => {
  for (const url of ["https://vm.tiktok.com/share-id/", "https://youtube.com/@account", "https://example.com/post"]) {
    assert.equal(resolveSocialReel(url)?.embedUrl, null);
  }
});

test("Invalid URLs are skipped and lookalike domains are never embedded", () => {
  for (const url of ["", "not a URL", "javascript:alert(1)", "data:text/html,hello"]) {
    assert.equal(resolveSocialReel(url), null);
  }
  assert.equal(resolveSocialReel("https://youtube.com.example.com/watch?v=8Bo9COEhjP8")?.platform, "other");
});
