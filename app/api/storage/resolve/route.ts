import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export async function POST(request: NextRequest) {
  if (!convexUrl) {
    return NextResponse.json({ error: "Convex not configured" }, { status: 500 });
  }

  const convex = new ConvexHttpClient(convexUrl);
  const body = await request.json();

  try {
    const result = await (convex.action as any)("storage:resolveBlogImages", {
      coverImage: body.coverImage,
      images: body.images,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error resolving images:", error);
    return NextResponse.json({ 
      coverImage: body.coverImage, 
      images: body.images || [] 
    });
  }
}
