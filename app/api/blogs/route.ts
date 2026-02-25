import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export async function GET() {
  if (!convexUrl) {
    return NextResponse.json({ error: "Convex not configured" }, { status: 500 });
  }

  const convex = new ConvexHttpClient(convexUrl);

  try {
    const blogs = await (convex.query as any)("blogs:listPublishedBlogs");
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!convexUrl) {
    return NextResponse.json({ error: "Convex not configured" }, { status: 500 });
  }

  const convex = new ConvexHttpClient(convexUrl);
  const body = await request.json();

  if (!body.title || !body.slug || !body.date) {
    return NextResponse.json({ error: "Title, slug, and date are required" }, { status: 400 });
  }

  try {
    console.log("Received body:", body);
    
    const blogData: any = {
      title: body.title,
      slug: body.slug,
      date: body.date,
      published: body.published ?? false,
    };

    if (body.author) {
      blogData.author = body.author;
    }
    if (body.coverImage) {
      console.log("Saving coverImage:", body.coverImage);
      blogData.coverImage = body.coverImage;
    }
    if (body.content) {
      blogData.content = body.content;
    }
    if (body.contentHtml) {
      blogData.contentHtml = body.contentHtml;
    }
    if (body.images && body.images.length > 0) {
      blogData.images = body.images;
    }

    console.log("Saving blogData:", blogData);

    const result = await (convex.mutation as any)("blogs:createBlog", blogData);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
