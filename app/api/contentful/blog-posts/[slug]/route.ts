// app/api/contentful/blog-posts/route.ts
import { createClient } from "contentful";
import { NextResponse } from "next/server";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT ?? "master",
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : 10;
  const published = searchParams.get("published") !== "false";
  const category = searchParams.get("category");

  const query: any = {
    content_type: "personalBlog",
    order: "-fields.publishedDate",
    limit,
    "fields.published": published,
  };
  if (category) query["fields.category"] = category;

  const res = await client.getEntries(query);
  return NextResponse.json(res.items);
}