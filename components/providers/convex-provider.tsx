"use client";

import { ReactNode } from "react";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "";

const convex = new ConvexReactClient(convexUrl);

const useAuth = () => {
  return {
    isLoading: false,
    isAuthenticated: true,
    fetchAccessToken: async () => null,
  };
};

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProviderWithAuth client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithAuth>
  );
}
