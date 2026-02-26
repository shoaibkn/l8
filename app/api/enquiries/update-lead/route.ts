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
    const result = await (convex.mutation as any)("enquiries:updateLeadDetails", {
      id: body.id,
      source: body.source,
      value: body.value,
      followUpDate: body.followUpDate,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating lead details:", error);
    return NextResponse.json({ error: "Failed to update lead details" }, { status: 500 });
  }
}
