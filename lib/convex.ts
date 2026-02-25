import { ConvexHttpClient } from "convex/browser";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
}

export const convexClient = new ConvexHttpClient(convexUrl);

export async function submitEnquiry(name: string, email: string, message?: string) {
  const result = await convexClient.mutation("enquiries:submitEnquiry", {
    name,
    email,
    message,
  });
  
  if (result.success) {
    await convexClient.action("enquiries:sendEnquiryEmails", {
      enquiryId: result.enquiryId,
    });
  }
  
  return result;
}
