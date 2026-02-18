"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  mode?: "slide" | "opacity";
  startOpacity?: number;
  duration?: number;
  stagger?: number;
}

export default function TextReveal({
  children,
  className,
  mode = "slide",
  startOpacity = 0,
  duration = 0,
  stagger = 0.01,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = containerRef.current?.querySelectorAll(".char");

      if (chars) {
        const animationProps =
          mode === "opacity"
            ? { opacity: startOpacity }
            : { opacity: 0, y: 20 };

        const animationTo =
          mode === "opacity" ? { opacity: 1 } : { opacity: 1, y: 0 };

        const animationDuration = mode === "opacity" ? 0.01 : duration;

        gsap.fromTo(chars, animationProps, {
          ...animationTo,
          duration: animationDuration,
          stagger: {
            each: stagger,
            from: "start",
          },
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 100%",
            end: "top 1%",
            scrub: 0.5,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [mode, startOpacity, duration, stagger]);

  const text = typeof children === "string" ? children : "";

  const parts = text.split(/(\s+)/);

  return (
    <div ref={containerRef} className={className}>
      {parts.map((part, index) => {
        if (/\s+/.test(part)) {
          return (
            <span key={index} className="char">
              {part}
            </span>
          );
        }
        return (
          <span key={index} className="char inline-block">
            {part.split("").map((char, charIndex) => (
              <span key={charIndex} className="whitespace-pre">
                {char}
              </span>
            ))}
          </span>
        );
      })}
      {typeof children !== "string" && children}
    </div>
  );
}
