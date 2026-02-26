import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export async function GET(request: NextRequest) {
  if (!convexUrl) {
    return NextResponse.json({ error: "Convex not configured" }, { status: 500 });
  }

  const convex = new ConvexHttpClient(convexUrl);
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || undefined;
  const cursor = searchParams.get("cursor") || undefined;
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : undefined;

  try {
    const result = await (convex.query as any)("enquiries:listEnquiries", {
      search,
      cursor,
      limit,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!convexUrl) {
    return NextResponse.json(
      { error: "Convex not configured" },
      { status: 500 }
    );
  }

  const convex = new ConvexHttpClient(convexUrl);
  const body = await request.json();

  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

  try {
    const result = await (convex.mutation as any)("enquiries:submitEnquiry", {
      name: body.name,
      email: body.email,
      message: body.message,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}
