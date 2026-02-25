import NewsContainer from "@/components/news-container";
import { news } from "@/constants";
import { ArrowUpRight, Dot } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  return (
    <main className="z-100">
      <section className="bg-primary/20 min-h-screen py-12 px-6 md:px-12">
        <h1 className="font-display mx-auto justify-center items-center align-middle py-24 text-center w-full wrap-break-word leading-[clamp(3rem,8vw,9rem)] uppercase text-[clamp(3rem,8vw,9rem)] font-semibold tracking-tighter">
          News & Updates
        </h1>
        <div className="grid md:grid-cols-4">
          {news.map((blog, index) => (
            <NewsContainer key={index} {...blog} height="full" />
          ))}
        </div>
      </section>
    </main>
  );
}
