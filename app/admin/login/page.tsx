"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      router.push("/admin");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <main>
      <div className="flex flex-row w-full absolute border my-6 px-6 md:px-12 items-end justify-end">
        <Button
          className="rounded-none w-1/4 border-none"
          variant={"outline"}
          asChild
        >
          <Link href="/">
            <LogOut /> Back to Site
          </Link>
        </Button>
      </div>
      <div className="min-h-screen bg-background grid md:grid-cols-4 px-6 md:px-12">
        <div className="w-full my-auto col-span-2">
          <h1 className="text-2xl font-display text-left tracking-tighter mb-24">
            Admin Login
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-full">
              <Input
                type="password"
                className="w-full rounded-none"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full rounded-none" size={"lg"}>
              Login
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
