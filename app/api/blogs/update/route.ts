import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export async function POST(request: NextRequest) {
  if (!convexUrl) {
    return NextResponse.json({ error: "Convex not configured" }, { status: 500 });
  }

  const convex = new ConvexHttpClient(convexUrl);
  const body = await request.json();

  if (!body.id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const blogData: any = {
      id: body.id,
    };

    if (body.title) blogData.title = body.title;
    if (body.slug) blogData.slug = body.slug;
    if (body.author) blogData.author = body.author;
    if (body.coverImage) blogData.coverImage = body.coverImage;
    if (body.content) blogData.content = body.content;
    if (body.contentHtml) blogData.contentHtml = body.contentHtml;
    if (body.images && body.images.length > 0) blogData.images = body.images;
    if (body.date) blogData.date = body.date;
    if (body.published !== undefined) blogData.published = body.published;

    const result = await (convex.mutation as any)("blogs:updateBlog", blogData);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}
