import type { VideoLink } from "@/lib/social-reels";

// Add posts here. Platform icons and actions are detected automatically.
// Supply thumbnails for Instagram, LinkedIn and TikTok; YouTube supplies its own.
export const dummyVideoLinks: VideoLink[] = [
  { url: "https://youtube.com/shorts/8Bo9COEhjP8?si=ZG29A7BBLbYyiZwe" },
  { url: "https://youtube.com/shorts/7vc4GGQWmJg?si=P6ICD3oaK3U_bW7g" },
  { 
    url: "https://www.instagram.com/reel/DcavEQNMdCz/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    thumbnail: "/assets/images/instathumbnails/carousalreels1.png"
  },
  { url: "https://youtube.com/shorts/hjUuk5SL2C4?si=d3Jc83ffY8iJ62Zg" },
  {
    url: "https://www.linkedin.com/posts/evtechglobal_elfaelectric-futurebankingsummit2026-bankalhabib-activity-7511693033495744513-dEH6",
    thumbnail: "/assets/images/linkedinthumnails/thumb1.png",
    thumbnailPosition: "center top",
  },
  {
    url: "https://www.tiktok.com/@elfaelectric/video/7691662720969493767",
    thumbnail: "/assets/images/tiktok-thumbnails/7691662720969493767.jpg",
    thumbnailPosition: "center 24%",
  },
];

// Both export names use this same list.
export { dummyVideoLinks as videoLinks };
