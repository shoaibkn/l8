import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not set");
}

export const convexClient = new ConvexHttpClient(convexUrl);

export async function submitEnquiry(name: string, email: string, message?: string) {
  const result = await convexClient.mutation(api.enquiries.submitEnquiry, {
    name,
    email,
    message,
  });
  
  return result;
}
