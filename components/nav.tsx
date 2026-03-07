"use client";

import { useEffect, useState, useRef } from "react";
import { links, navContent } from "@/constants";
import Link from "next/link";
import { TextRoll } from "./motion-primitives/text-roll";
import gsap from "gsap";

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const [hoverKey, setHoverKey] = useState(0);

  return (
    <Link
      href={href}
      className="font-mono text-sm tracking-tighter text-primary-foreground w-fit uppercase"
      onMouseEnter={() => setHoverKey((k) => k + 1)}
      onClick={onClick}
    >
      <TextRoll key={hoverKey} duration={0.1}>
        {label}
      </TextRoll>
    </Link>
  );
}

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.fromTo(
      navRef.current,
      { yPercent: -100 },
      { yPercent: 0, duration: 0.5, ease: "power3.out" },
    );
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.href;

    gsap.to(navRef.current, {
      yPercent: -100,
      duration: 0.45,
      ease: "power3.inOut",
      onComplete: () => {
        window.location.href = href;
      },
    });
  };

  return (
    <nav
      ref={navRef}
      className="bg-primary w-full h-[calc(80lvh)] md:min-h-100 px-6 md:px-12 flex flex-col justify-end pb-6"
    >
      <div className="flex flex-col gap-4 pt-24">
        {links.map((link, index) => (
          <NavLink
            key={index}
            href={link.href}
            label={link.label}
            onClick={handleLinkClick}
          />
        ))}
      </div>
      <div className="mt-8 text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full flex flex-row justify-center md:justify-end">
        <Link
          href={`mailto:${navContent.email}`}
          className="text-[clamp(2.5rem,4vw,8rem)] tracking-tighter font-bold font-display uppercase "
        >
          {navContent.email}
        </Link>
      </div>
      <div className="text-right ">
        <Link
          href={`tel:${navContent.phone}`}
          className="uppercase font-display font-semibold tracking-tighter text-[clamp(1rem,1vw,2rem)] text-primary-foreground/50 hover:bg-primary-foreground/50 hover:text-primary"
        >
          {navContent.phone}
        </Link>
      </div>
    </nav>
  );
}
