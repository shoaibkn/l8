"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { TextLoop } from "./motion-primitives/text-loop";

function TextRollButton({
  children,
  className,
  variant,
  style,
}: {
  children: string;
  className?: string;
  variant?: string;
  style?: React.CSSProperties;
}) {
  const [cycleTrigger, setCycleTrigger] = useState(0);

  return (
    <Button
      className={className}
      variant={variant as any}
      style={style}
      onMouseEnter={() => setCycleTrigger((t) => t + 1)}
    >
      <TextLoop 
        cycleTrigger={cycleTrigger} 
        transition={{ duration: 0.2 }}
      >
        <span>{children}</span>
        <span>{children}</span>
      </TextLoop>
      <ChevronRight />
    </Button>
  );
}

export default function NoSales() {
  return (
    <section className="bg-primary/10">
      {/*https://framerusercontent.com/images/VulBQhVJJgXCyTIKKvhsZMa5TU.png?width=2244&height=715*/}
      <div className="md:px-12 px-6 pt-24 bg-[url('https://framerusercontent.com/images/VulBQhVJJgXCyTIKKvhsZMa5TU.png')] bg-contain bg-bottom bg-no-repeat w-full h-full min-h-[800px] md:grid md:grid-cols-2 flex flex-col">
        <div>
          <h1 className="font-display text-right w-full wrap-break-word leading-[clamp(3rem,5vw,8rem)] uppercase text-[clamp(3rem,5vw,8rem)] font-semibold tracking-tighter">
            No salespeople. No bots. You'll speak directly with us.
          </h1>
        </div>
        <div className="w-full flex flex-col md:pt-96 pt-48 md:col-span-2 lg:col-span-1">
          <TextRollButton
            className="uppercase bg-primary/5 rounded-none w-full md:w-1/2 h-18 flex flex-row  justify-between px-6 font-display border-0.5 border-b isolate z-50 relative"
            variant={"outline"}
            style={{
              backgroundImage:
                "linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6, #22c55e, #eab308, #f97316, #ef4444)",
              backgroundSize: "100% 2px",
              backgroundPosition: "bottom",
              backgroundRepeat: "no-repeat",
            }}
          >
            Start Ai Journey
          </TextRollButton>
          <div className="flex flex-row text-xs text-muted-foreground uppercase tracking-tighter p-6">
            DEDICATED TO YOUR GROWTH worldwide
          </div>
        </div>
      </div>
    </section>
  );
}
