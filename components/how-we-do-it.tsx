"use client";

import { useState } from "react";
import { ChevronRight, Dot, Plus } from "lucide-react";
import HowWeDoItContainer from "./how-we-do-it-container";
import { Button } from "./ui/button";
import { TextRoll } from "./motion-primitives/text-roll";
import { howWeDoItSectionContent } from "@/constants";

function TextRollButton({
  children,
  className,
  variant,
  style,
}: {
  children: string;
  className?: string;
  variant?: "link";
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

export default function HowWeDoIt() {
  return (
    <>
      <div className="flex absolute flex-row justify-between w-full">
        <Plus size={12} className="relative md:left-10.5 left-4.5 top-10.5" />
        <Plus size={12} className="relative md:right-10.5 right-4.5 top-10.5" />
      </div>
      <section className="bg-primary/20 h-fit w-full px-6 md:px-12 py-12">
        <div className="md:grid md:grid-cols-2 h-fit border-0.5 border-b  isolate z-50 relative border-0.5 border-primary/10 py-12">
          <div className="flex flex-col  justify-between md:justify-start gap-4">
            <div className="flex flex-row gap-4 relative right-2 pb-12 text-xs font-mono tracking-tighter items-center align-middle leading-4">
              <span className="flex flex-row items-center">
                <Dot className="" size={36} />
                <span className="relative right-2">
                  {howWeDoItSectionContent.sectionNumber}
                </span>
              </span>
              <h4 className="text-muted-foreground relative right-2">
                {howWeDoItSectionContent.sectionLabel}
              </h4>
            </div>
            {/*main Heading*/}
            <div className="flex flex-col h-fit gap-4 pb-24 justify-between md:justify-start">
              <span className="font-display wrap-break-word leading-[clamp(4rem,8vw,8rem)] uppercase text-primary/50 text-[clamp(4rem,8vw,8rem)] font-semibold tracking-tighter">
                {howWeDoItSectionContent.titlePrefix}{" "}
                <span className="text-primary">
                  {howWeDoItSectionContent.titleHighlight}
                </span>
              </span>
              <p className="font-display text-muted-foreground">
                {howWeDoItSectionContent.description}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <HowWeDoItContainer />
          </div>
        </div>
        <TextRollButton
          className="uppercase bg-primary/5 rounded-none w-full md:w-1/4 h-18 flex flex-row justify-between px-6 font-display border-0.5 border-b  isolate z-50 relative border-black"
          variant={"link"}
          style={{
            backgroundImage:
              "linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6, #22c55e, #eab308, #f97316, #ef4444)",
            backgroundSize: "100% 2px",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
          }}
        >
          {howWeDoItSectionContent.ctaLabel}
        </TextRollButton>
      </section>
    </>
  );
}
