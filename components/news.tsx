import { news } from "@/constants";
import { ArrowUpRight, Dot } from "lucide-react";
import Link from "next/link";
import NewsContainer from "./news-container";

export default function News() {
  return (
    <section className="bg-primary/20 h-fit px-6 md:px-12 py-12">
      <div className="grid grid-cols-4">
        <div></div>
        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-row gap-4 relative text-xs font-mono tracking-tighter items-center right-4 leading-4">
            <span className="flex flex-row items-center">
              <Dot className="" size={36} />
              <span className="relative right-2">07</span>
            </span>
            <h4 className="uppercase relative right-2">why us?</h4>
          </div>
          <h1 className="font-display py-12 text-left w-full wrap-break-word leading-[clamp(3rem,6vw,9rem)] uppercase text-[clamp(3rem,6vw,9rem)] font-semibold tracking-tighter">
            news
          </h1>
        </div>
        <div></div>

        <div className="flex flex-row w-full justify-end h-96 py-24">
          <Link
            href="/blog"
            className="text-lg font-display font-medium flex flex-row items-center gap-4"
          >
            All articles
            <span className="bg-primary/50 h-fit">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-4">
        {news.map((blog) => (
          <NewsContainer key={blog.title} {...blog} height="full" />
        ))}
      </div>
    </section>
  );
}
