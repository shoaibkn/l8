"use client";
import { useState } from "react";
import { ChevronRight, Dot, GripVertical, Quote } from "lucide-react";
import { Button } from "./ui/button";
import TextReveal from "./ui/text-reveal";
import { TextRoll } from "./motion-primitives/text-roll";
import { caseStudyContent } from "@/constants";

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

export default function CaseStudy() {
  return (
    <section className="grid md:grid-cols-2 justify-between bg-accent/90 h-fit">
      {/*Primary Text*/}
      <div className="flex flex-col pt-8">
        <div className="flex flex-row gap-4 relative right-2 text-xs font-mono tracking-tighter items-center align-middle leading-4  md:px-12 px-6">
          <span className="flex flex-row items-center">
            <Dot className="" size={36} />
            <span className="relative right-2">
              {caseStudyContent.sectionNumber}
            </span>
          </span>
          <h4 className="uppercase text-muted-foreground relative right-2">
            {caseStudyContent.sectionLabel}
          </h4>
        </div>

        <div className="flex flex-col gap-6 py-18">
          <h1 className="md:pl-12 pl-6 font-display w-full wrap-break-word leading-[clamp(2rem,4vw,6rem)] uppercase text-primary text-[clamp(2rem,4vw,8rem)] font-semibold tracking-tighter">
            {caseStudyContent.title}
          </h1>

          <p className="md:px-12 px-6 text-muted-foreground">
            {caseStudyContent.summary}
          </p>
        </div>

        <div className="flex flex-col w-full pr-8  md:pl-12 pl-6 pb-12">
          {caseStudyContent.details.map((detail) => (
            <div
              key={detail.label}
              className="flex flex-row w-full justify-between border-0.5 p-4 text-xs font-mono text-muted-foreground uppercase tracking-tighter border-b"
            >
              <span>{detail.label}</span>
              <span className="text-primary">{detail.value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-end md:pl-12 px-6 md:px-0 pb-12">
          <TextRollButton
            className="uppercase bg-primary/5 rounded-none w-full md:w-1/2 h-18 flex flex-row justify-between px-6 font-display border-0.5 border-b  isolate z-50 relative border-black"
            variant={"link"}
            style={{
              backgroundImage:
                "linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6, #22c55e, #eab308, #f97316, #ef4444)",
              backgroundSize: "100% 2px",
              backgroundPosition: "bottom",
              backgroundRepeat: "no-repeat",
            }}
          >
            {caseStudyContent.ctaLabel}
          </TextRollButton>
        </div>

        {/*Stats*/}
        <div className="grid md:grid-cols-2 bg-primary text-primary-foreground font-display  md:pl-12 pl-6">
          {caseStudyContent.stats.map((stat) => (
            <div
              key={stat.label}
              className="h-48 flex flex-col justify-between p-6 items-end"
            >
              <div className="uppercase tracking-tighter text-xs text-muted-foreground w-24 text-right">
                {stat.label}
              </div>
              <div className="flex flex-row justify-between items-end w-full">
                <span className="text-6xl">{stat.value}</span>
                <GripVertical className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/*Image with text*/}
      <div
        className="md:p-16 p-8 bg-cover bg-center bg-no-repeat w-full h-full min-h-[500px]"
        style={{ backgroundImage: `url(${caseStudyContent.imageSrc})` }}
      >
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
          {caseStudyContent.quote}
        </TextReveal>
      </div>
    </section>
  );
}
