// app/api/contentful/projects/route.ts
import { createClient } from "contentful";
import { NextResponse } from "next/server";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT ?? "master",
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined;
  const featured = searchParams.get("featured") === "true";
  const category = searchParams.get("category");

  const query: any = {
    content_type: "personalProjects",
    order: "-fields.completionDate",
  };
  if (limit) query.limit = limit;
  if (featured) query["fields.featured"] = true;
  if (category) query["fields.category"] = category;

  const res = await client.getEntries(query);
  return NextResponse.json(res.items);
}