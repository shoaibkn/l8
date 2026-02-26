import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export async function POST(request: NextRequest) {
  if (!convexUrl) {
    return NextResponse.json({ error: "Convex not configured" }, { status: 500 });
  }

  const convex = new ConvexHttpClient(convexUrl);
  const body = await request.json();

  if (!body.id || body.notes === undefined) {
    return NextResponse.json({ error: "ID and notes are required" }, { status: 400 });
  }

  try {
    const result = await (convex.mutation as any)("enquiries:updateEnquiryNotes", {
      id: body.id,
      notes: body.notes,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating notes:", error);
    return NextResponse.json({ error: "Failed to update notes" }, { status: 500 });
  }
}
