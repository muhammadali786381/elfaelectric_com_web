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

Video dialogs use the native cursor so embedded players remain usable. The site's custom cursor returns when the dialog closes.

## Getting Started

The live preloader reveals white “ELFA ELECTRIC” upward letter by letter at the viewport centre. It shares the homepage hero’s Russo One font (400), tight tracking and 12° forward slant, using the shared font definition in `src/lib/fonts.ts`. The underline spans the full text width and grows from its centre immediately after the final letter finishes, then fades out at full width over 160ms as the panels start opening. It does not shrink. Two horizontal panels meet seamlessly, with no centre gap, then open simultaneously in opposite directions. The gap remains configurable with `--loader-gap` in `src/app/globals.css` (default `0px`). The overlay wrapper stays transparent; only the panels have opaque backgrounds.

The intro runs on the first visit in a tab and on every full reload, while normal client-side navigation skips it. It lasts about 2.4 seconds with a four-second fallback. Reduced motion uses a static brand name and a brief fade. Hero entrances start as the panels open. The original scrollbar stays visible and keeps its normal colours; temporary input and position guards lock scrolling without changing overflow styles or page width.

Loader colours in `src/app/globals.css` use `--loader-background` (60% of the current brand primary mixed with black for a darker shade), plus white `--loader-text` and `--loader-line`. Wording, timing, easing and replay settings are in `src/components/layout/preloader-config.ts`; the underline start time is derived from the last letter's completion. The root-layout bootstrap prevents repeat-visit flashes without changing hydrated markup.

Open `/loader-preview` in development for a still frame or replay; this review route is unavailable in production. Reload the page to replay the live intro in the same tab. Run bootstrap regression checks with `npx tsx --test src/components/layout/preloader-config.test.ts`.

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
