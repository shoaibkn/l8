"use client";
import { useState } from "react";
import { ChevronRight, Dot } from "lucide-react";
import { Button } from "./ui/button";
import { TextRoll } from "./motion-primitives/text-roll";

function TextRollButton({
  children,
  className,
  variant,
}: {
  children: string;
  className?: string;
  variant?: string;
}) {
  const [hoverKey, setHoverKey] = useState(0);

  return (
    <Button
      className={className}
      variant={variant as any}
      onMouseEnter={() => setHoverKey((k) => k + 1)}
    >
      <TextRoll key={hoverKey} duration={0.1}>
        {children}
      </TextRoll>
      <ChevronRight />
    </Button>
  );
}

export default function ContactUs() {
  return (
    <section className="bg-accent px-6 md:px-12 grid md:grid-cols-4 py-36 md:gap-0 gap-6">
      <div className="flex flex-row gap-4 relative right-2 text-xs font-mono tracking-tighter items-center h-fit align-middle leading-4  ">
        <span className="flex flex-row items-center">
          <Dot className="" size={36} />
          <span className="relative right-2">09</span>
        </span>
        <h4 className="uppercase text-muted-foreground relative right-2">
          Contact us directly
        </h4>
      </div>
      <div className="flex flex-col gap-12">
        <h1 className="font-display w-full wrap-break-word leading-[clamp(2rem,3vw,6rem)] uppercase text-primary text-[clamp(2rem,3vw,8rem)] font-semibold tracking-tighter">
          Still unsure?
        </h1>
        <TextRollButton
          className="uppercase bg-primary/5 rounded-none w-full h-18 flex flex-row justify-between px-6 font-display border-0.5 border-b  isolate z-50 relative border-black"
          variant={"link"}
        >
          Ask a question
        </TextRollButton>
      </div>
      <div></div>
      <div>
        My role is to make sure every client feels supported from day one.
      </div>
    </section>
  );
}
