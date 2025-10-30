// app/api/contentful/blog-posts/[slug]/route.ts
import { createClient } from "contentful";
import { NextResponse } from "next/server";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT ?? "master",
});

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }  // ← params is a Promise!
) {
  const params = await context.params;  // ← Await it
  const slug = params.slug;

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  try {
    const res = await client.getEntries({
      content_type: "personalBlog",
      "fields.slug": slug,
      limit: 1,
    });

    if (res.items.length === 0) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json(res.items[0]);
  } catch (error) {
    console.error("Contentful fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}