import type { Metadata } from "next";
import "@/app/globals.css";
export const metadata: Metadata = {
  title: "Admin Login - L8",
  description: "Admin login page",
};

export default function AdminLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
