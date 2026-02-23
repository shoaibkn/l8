"use client";
import { useState } from "react";
import { ChevronRight, Dot, GripVertical, Quote } from "lucide-react";
import { Button } from "./ui/button";
import TextReveal from "./ui/text-reveal";
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

export default function CaseStudy() {
  return (
    <section className="grid md:grid-cols-2 justify-between bg-accent/90 h-fit">
      {/*Primary Text*/}
      <div className="flex flex-col pt-8">
        <div className="flex flex-row gap-4 relative right-2 text-xs font-mono tracking-tighter items-center align-middle leading-4  md:px-12 px-6">
          <span className="flex flex-row items-center">
            <Dot className="" size={36} />
            <span className="relative right-2">05</span>
          </span>
          <h4 className="uppercase text-muted-foreground relative right-2">
            why delay hurts
          </h4>
        </div>

        <div className="flex flex-col gap-6 py-18">
          <h1 className="md:pl-12 pl-6 font-display w-full wrap-break-word leading-[clamp(2rem,4vw,6rem)] uppercase text-primary text-[clamp(2rem,4vw,8rem)] font-semibold tracking-tighter">
            case study
          </h1>

          <p className="md:px-12 px-6 text-muted-foreground">
            LocalRent Co. partnered with Effica to streamline order intake and
            customer support across 18 locations.
          </p>
        </div>

        <div className="flex flex-col w-full pr-8  md:pl-12 pl-6 pb-12">
          <div className="flex flex-row w-full justify-between border-0.5 p-4 text-xs font-mono text-muted-foreground uppercase tracking-tighter border-b">
            <span>Date:</span>
            <span className="text-primary">mar 25</span>
          </div>
          <div className="flex flex-row w-full justify-between border-0.5 p-4 text-xs font-mono text-muted-foreground uppercase tracking-tighter border-b">
            <span>industry:</span>
            <span className="text-primary">retail & ecommerce</span>
          </div>
          <div className="flex flex-row w-full justify-between border-0.5 p-4 text-xs font-mono text-muted-foreground uppercase tracking-tighter border-b">
            <span>challenge:</span>
            <span className="text-primary">
              Manual order management & customer support delays
            </span>
          </div>
        </div>

        <div className="flex flex-row justify-end md:pl-12 pl-6 py-6">
          <TextRollButton
            className="uppercase bg-primary/5 rounded-none w-full md:w-1/2 h-18 flex flex-row justify-between px-6 font-display border-0.5 border-b  isolate z-50 relative border-black"
            variant={"link"}
          >
            Start Ai Journey
          </TextRollButton>
        </div>

        {/*Stats*/}
        <div className="grid md:grid-cols-2 bg-primary text-primary-foreground font-display  md:pl-12 pl-6">
          <div className="h-48 flex flex-col justify-between p-6 items-end">
            <div className="uppercase tracking-tighter text-xs text-muted-foreground w-24 text-right">
              hours saved monthly
            </div>
            <div className="flex flex-row justify-between items-end w-full">
              <span className="text-6xl">50+</span>
              <GripVertical className="text-muted-foreground" />
            </div>
          </div>

          <div className="h-48 flex flex-col justify-between p-6 items-end">
            <div className="uppercase tracking-tighter text-xs text-muted-foreground w-24 text-right">
              increase in retention
            </div>
            <div className="flex flex-row justify-between items-end w-full">
              <span className="text-6xl">+15%</span>
              <GripVertical className="text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
      {/*Image with text*/}
      <div className="md:p-16 p-8 bg-[url('https://framerusercontent.com/images/tTnUarcDGbJHyHnu6aahGScqPHw.jpg')] bg-cover bg-center bg-no-repeat w-full h-full min-h-[500px]">
        <Quote
          className="transform rotate-180 mb-4"
          fill="white"
          size={64}
          stroke="none"
        />
        <TextReveal
          mode="opacity"
          duration={5}
          startOpacity={0.2}
          stagger={0.05}
          className="text-primary-foreground text-[clamp(3rem,4vw,8rem)] tracking-tighter leading-[clamp(3rem,4vw,8rem)] break-normal uppercase font-display font-bold"
        >
          They didn’t overwhelm us with jargon or endless options. Just a clear
          plan, executed quickly. We saw measurable results in the first month.
        </TextReveal>
      </div>
    </section>
  );
}
