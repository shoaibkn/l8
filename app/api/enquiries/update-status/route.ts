import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export async function POST(request: NextRequest) {
  if (!convexUrl) {
    return NextResponse.json({ error: "Convex not configured" }, { status: 500 });
  }

  const convex = new ConvexHttpClient(convexUrl);
  const body = await request.json();

  if (!body.id || !body.status) {
    return NextResponse.json({ error: "ID and status are required" }, { status: 400 });
  }

  try {
    const result = await (convex.mutation as any)("enquiries:updateEnquiryStatus", {
      id: body.id,
      status: body.status,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating enquiry:", error);
    return NextResponse.json({ error: "Failed to update enquiry" }, { status: 500 });
  }
}
