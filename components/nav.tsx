"use client";

import { useState, useRef } from "react";
import { links } from "@/constants";
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
  const linksRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.href;

    const tl = gsap.timeline({
      onComplete: () => {
        window.location.href = href;
      },
    });

    tl.to(linksRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
    })
      .to(emailRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.3,
      })
      .to(phoneRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.3,
      })
      .to(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.4,
      });
  };

  return (
    <nav
      ref={navRef}
      className="bg-primary w-full min-h-screen md:min-h-100 px-6 md:px-12 flex flex-col justify-end pb-6"
    >
      <div ref={linksRef} className="flex flex-col gap-4 pt-24">
        {links.map((link, index) => (
          <NavLink
            key={index}
            href={link.href}
            label={link.label}
            onClick={handleLinkClick}
          />
        ))}
      </div>
      <div
        ref={emailRef}
        className="mt-8 text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full flex flex-row justify-center md:justify-end"
      >
        <Link
          href="mailto:hello@lumin8.in"
          className="text-[clamp(2.5rem,4vw,8rem)] tracking-tighter font-bold font-display uppercase "
        >
          hello@lumin8.in
        </Link>
      </div>
      <div ref={phoneRef} className="text-right ">
        <Link
          href="tel:+918279497847"
          className="uppercase font-display font-semibold tracking-tighter text-[clamp(1rem,1vw,2rem)] text-primary-foreground/50 hover:bg-primary-foreground/50 hover:text-primary"
        >
          +918279497847
        </Link>
      </div>
    </nav>
  );
}
