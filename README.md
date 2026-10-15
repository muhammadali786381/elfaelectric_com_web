This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Social carousel posts

Add posts to `dummyVideoLinks` in `src/data/video-links.ts`. Each entry accepts a URL string or `{ url, thumbnail }`; no carousel component changes are needed. The `videoLinks` export is an alias of this same list.

```ts
{ url: "https://www.youtube.com/watch?v=VIDEO_ID" }, // automatic thumbnail
{ url: "https://www.instagram.com/reel/POST_ID/", thumbnail: "/assets/images/my-instagram-post.jpg" },
{ url: "https://www.linkedin.com/posts/POST_ID", thumbnail: "/assets/images/my-linkedin-post.jpg" },
{ url: "https://www.tiktok.com/@ACCOUNT/video/VIDEO_ID", thumbnail: "/assets/images/my-tiktok-post.jpg" },
```

Paths starting with `/assets/` refer to files under `public/assets/`. Instagram, LinkedIn, and TikTok thumbnails can be supplied this way. YouTube thumbnails are generated automatically; an explicit thumbnail overrides them. Without a thumbnail, a platform icon appears.

Thumbnails fill the card. Add `thumbnailPosition: "center top"` (or a percentage such as `"center 24%"`) to an entry to keep faces or text in view when cropping a portrait image.

Platform icons and actions are detected from the URL. YouTube watch, Shorts, embed, and short links play in the modal. TikTok video links use TikTok's official player, with a “Watch on TikTok” link available if playback is restricted. TikTok short links without a video ID, Instagram, LinkedIn, and other links open externally. Invalid URLs are skipped.

Run parser regression checks with `npx tsx --test src/lib/social-reels.test.ts`.

## Getting Started

Loader concept review: open `/loader-preview` during development to compare forest and midnight green and replay the logo/tagline reveal with the five-panel exit. This preview is unavailable in production. The proposed visual is in `src/components/layout/LoadingScreen.tsx`; the existing live loader remains in `GlobalLoader.tsx` pending design review.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
