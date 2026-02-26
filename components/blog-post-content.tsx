"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Dot } from "lucide-react";

interface BlogPostContentProps {
  coverImage: string | null;
  title: string;
  author: string | null;
  date: string;
  contentHtml: string;
}

export default function BlogPostContent({
  coverImage,
  title,
  author,
  date,
  contentHtml,
}: BlogPostContentProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(imageRef.current, { opacity: 0, y: 100 });
      gsap.set(dateRef.current, { opacity: 0, x: -50 });

      const contentElements = contentRef.current?.children;
      if (contentElements && contentElements.length > 0) {
        gsap.set(contentElements, { opacity: 0, y: 30 });
      }

      gsap.to(imageRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(dateRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      });

      if (contentElements && contentElements.length > 0) {
        gsap.to(contentElements, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.5,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <article className="grid grid-cols-4">
      <div
        ref={imageRef}
        className="gap-4 text-muted-foreground mb-4 sticky top-16 self-start border"
      >
        {coverImage && (
          <Image
            src={coverImage}
            alt={title}
            width={800}
            height={450}
            className="w-full h-auto transition-transform duration-500 ease-out group-hover:scale-105"
          />
        )}
        <div className="text-xs font-mono uppercase tracking-tighter px-4 py-6 flex flex-col">
          {author && <span>By {author}</span>}
        </div>
      </div>

      <div></div>
      <div className="col-span-2 flex flex-col gap-1">
        <div
          ref={dateRef}
          className="flex flex-row gap-4 relative right-2 text-xs font-mono tracking-tighter items-center align-middle leading-4"
        >
          <span className="flex flex-row items-center relative right-2">
            <Dot size={36} />
          </span>
          <h4 className="text-muted-foreground relative right-8">{date}</h4>
        </div>
        <div
          ref={contentRef}
          className="prose prose-xs prose-p:tracking-tight prose-h2:tracking-tight prose-h2:font-display prose-h3:font-display prose-h3:font-medium prose-h2:font-medium prose-h3:tracking-tight max-w-none prose-h1:font-display prose-h1:uppercase prose-h1:tracking-tighter prose-h1:text-[clamp(3rem,4.5vw,10rem)] prose-h1:leading-[clamp(3rem,4.5vw,10rem)] prose-blockquote:border-l-primary prose-h1:text-primary prose-blockquote:border prose-blockquote:pl-6 prose-blockquote:text-muted-foreground prose-blockquote:not-italic"
          dangerouslySetInnerHTML={{ __html: contentHtml || "" }}
        />
      </div>
    </article>
  );
}
