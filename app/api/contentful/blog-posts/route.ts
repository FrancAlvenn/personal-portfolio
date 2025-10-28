// app/api/contentful/blog-posts/route.ts
import { createClient } from "contentful";
import { NextResponse } from "next/server";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT || "master",
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 10;
  const category = searchParams.get("category");
  const published = searchParams.get("published") === "false" ? false : true;

  try {
    const res = await client.getEntries({
      content_type: "personalBlog",
      order: "-fields.publishedDate" as any,
      limit,
      "fields.published": published,
      ...(category && { "fields.category": category }),
    });

    return NextResponse.json(res.items);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog posts", details: error }, { status: 500 });
  }
}