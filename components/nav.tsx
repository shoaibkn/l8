"use client";

import { useState } from "react";
import { links } from "@/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { TextRoll } from "./motion-primitives/text-roll";

function NavLink({ href, label }: { href: string; label: string }) {
  const [hoverKey, setHoverKey] = useState(0);

  return (
    <Link
      href={href}
      className="font-mono text-sm tracking-tighter text-primary-foreground w-fit uppercase"
      onMouseEnter={() => setHoverKey((k) => k + 1)}
    >
      <TextRoll key={hoverKey} duration={0.1}>
        {label}
      </TextRoll>
    </Link>
  );
}

export default function Nav() {
  const isMobile = useIsMobile();

  return (
    <nav className="bg-primary w-full min-h-screen md:min-h-[400px] px-6 md:px-12 flex flex-col justify-end pb-6">
      <div className="flex flex-col gap-4 pt-24">
        {links.map((link, index) => (
          <NavLink key={index} href={link.href} label={link.label} />
        ))}
      </div>
      <div className="mt-8 text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full flex flex-row justify-center md:justify-end">
        <Link
          href="mailto:hello@lumin8.in"
          className="text-[clamp(2.5rem,4vw,8rem)] tracking-tighter font-bold font-display uppercase "
        >
          hello@lumin8.in
        </Link>
      </div>
      <div className="text-right ">
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
