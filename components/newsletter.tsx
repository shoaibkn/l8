"use client";

import { useState } from "react";
import { ChevronRight, GripVertical } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { TextRoll } from "./motion-primitives/text-roll";
import { newsletterContent } from "@/constants";

function TextRollButton({
  children,
  className,
  variant,
  style,
}: {
  children: string;
  className?: string;
  variant?: "ghost" | "default" | "secondary" | "outline" | "link";
  style?: React.CSSProperties;
}) {
  const [hoverKey, setHoverKey] = useState(0);

  return (
    <Button
      className={className}
      variant={variant}
      style={style}
      onMouseEnter={() => setHoverKey((k) => k + 1)}
    >
      <TextRoll key={hoverKey} duration={0.1}>
        {children}
      </TextRoll>
      <ChevronRight />
    </Button>
  );
}

export default function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="bg-primary text-primary-foreground items-center grid md:grid-cols-4 h-fit px-6 md:px-12 py-8 md:py-20 gap-6 md:gap-0">
      <h1 className="text-[clamp(3rem,4vw,8rem)] font-medium">
        {newsletterContent.title}
      </h1>
      <p className="text-muted-foreground text-xs">
        {newsletterContent.description}
      </p>
      <div className="w-full border-b border-primary-foreground/40 h-fit focus-within:border-primary">
        <Label className="px-4 text-muted-foreground py-2 text-xs font-mono tracking-tighter uppercase">
          {newsletterContent.inputLabel}
        </Label>
        <div className="flex flex-row justify-between">
          <Input
            type="text"
            placeholder={newsletterContent.inputPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 w-full h-12 rounded-none border-0 bg-transparent placeholder:uppercase placeholder:tracking-tighter focus-visible:ring-0"
          />
          <GripVertical
            className="relative top-4 text-muted-foreground"
            strokeWidth={1}
          />
        </div>
      </div>
      <TextRollButton
        className="uppercase text-primary-foreground rounded-none w-full h-18 flex flex-row justify-between px-6 font-display border-0.5 border-b  isolate z-50 relative border-primary-foreground"
        variant={"link"}
        style={{
          backgroundImage:
            "linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6, #22c55e, #eab308, #f97316, #ef4444)",
          backgroundSize: "100% 2px",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
      >
        {newsletterContent.ctaLabel}
      </TextRollButton>
    </section>
  );
}
