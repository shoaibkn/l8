import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export async function POST(request: NextRequest) {
  if (!convexUrl) {
    return NextResponse.json({ error: "Convex not configured" }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const convex = new ConvexHttpClient(convexUrl);
    
    // Generate upload URL from Convex
    const uploadResult = await (convex.action as any)("storage:generateUploadUrl");
    const uploadUrl = uploadResult.uploadUrl;

    if (!uploadUrl) {
      return NextResponse.json({ error: "Failed to get upload URL" }, { status: 500 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload the file to Convex storage
    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      body: buffer,
      headers: {
        "Content-Type": file.type,
      },
    });

    const responseText = await uploadResponse.text();
    console.log("Upload response body:", responseText);

    if (!uploadResponse.ok) {
      return NextResponse.json({ error: "Upload failed: " + responseText }, { status: 500 });
    }

    // Parse the response to get storage ID
    let storageId = null;
    
    try {
      const responseJson = JSON.parse(responseText);
      // The response has storageId directly
      storageId = responseJson.storageId;
      console.log("Extracted storageId:", storageId);
    } catch (e) {
      console.log("Could not parse response as JSON");
    }

    // If we have a storage ID, use Convex's getUrl to get the actual URL
    let publicUrl = null;
    if (storageId) {
      try {
        const urlResult = await (convex.action as any)("storage:getFileUrlFromId", { storageId });
        publicUrl = urlResult.url;
        console.log("Got public URL:", publicUrl);
      } catch (e) {
        console.error("Error getting file URL:", e);
      }
    }

    return NextResponse.json({ 
      success: true, 
      storageId,
      url: publicUrl 
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
