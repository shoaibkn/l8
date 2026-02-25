import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

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

    if (result.success) {
      await (convex.action as any)("enquiries:sendEnquiryEmails", {
        enquiryId: result.enquiryId,
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}
