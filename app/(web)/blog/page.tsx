"use client";

import { useEffect, useRef, useState } from "react";
import NewsContainer from "@/components/news-container";
import gsap from "gsap";

interface Blog {
  _id: string;
  date: string;
  title: string;
  coverImage: string;
  slug: string;
}

async function getBlogs() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/blogs`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    async function fetchBlogs() {
      const data = await getBlogs();
      setBlogs(data);
      setLoaded(true);
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (!loaded || !headingRef.current || !gridRef.current || animated.current) return;
    animated.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      ).fromTo(
        gridRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [loaded]);

  if (!loaded) {
    return (
      <main className="z-100">
        <section className="bg-primary/20 min-h-screen py-12 px-6 md:px-12">
          <h1 className="font-display mx-auto justify-center items-center align-middle py-24 text-center w-full wrap-break-word leading-[clamp(3rem,8vw,9rem)] uppercase text-[clamp(3rem,8vw,9rem)] font-semibold tracking-tighter">
            News & Updates
          </h1>
        </section>
      </main>
    );
  }

  return (
    <main className="z-100" ref={containerRef}>
      <section className="bg-primary/20 min-h-screen py-12 px-6 md:px-12">
        <h1
          ref={headingRef}
          className="font-display mx-auto justify-center items-center align-middle py-24 text-center w-full wrap-break-word leading-[clamp(3rem,8vw,9rem)] uppercase text-[clamp(3rem,8vw,9rem)] font-semibold tracking-tighter"
        >
          News & Updates
        </h1>
        <div ref={gridRef} className="grid md:grid-cols-4">
          {blogs.length > 0 ? (
            blogs.map((blog) =>
              blog.coverImage ? (
                <NewsContainer
                  key={blog._id}
                  date={blog.date}
                  title={blog.title}
                  image={blog.coverImage}
                  slug={blog.slug}
                  link={`/blog/${blog.slug}`}
                  height="full"
                />
              ) : null
            )
          ) : (
            <div className="col-span-4 text-center py-12 text-muted-foreground">
              No blogs yet. Check back soon!
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
