import { NextResponse } from "next/server";
import { BLOG_PER_PAGE } from "@/lib/blog/types";
import { getBlogPosts } from "@/lib/blog/wordpress";

/** ISR for the API route response cache */
export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? "1");
  const perPage = Number(searchParams.get("perPage") ?? String(BLOG_PER_PAGE));

  if (!Number.isFinite(page) || page < 1) {
    return NextResponse.json({ error: "Invalid page" }, { status: 400 });
  }

  try {
    const result = await getBlogPosts(page, perPage);
    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("[api/blogs]", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 502 },
    );
  }
}
