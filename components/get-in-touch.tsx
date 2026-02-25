"use client";

import { useState } from "react";
import { links } from "@/constants";
import { ChevronRight, Dot, GripVertical, Plus } from "lucide-react";
import Link from "next/link";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TextRoll } from "./motion-primitives/text-roll";
import Image from "next/image";

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
      <TextRoll key={hoverKey} duration={0.05}>
        {children}
      </TextRoll>
      <ChevronRight />
    </Button>
  );
}

export default function GetInTouch() {
  return (
    <section className=" bg-primary/10 z-50 h-screen bg-[url('https://framerusercontent.com/images/VulBQhVJJgXCyTIKKvhsZMa5TU.png')] bg-contain bg-bottom bg-no-repeat pointer-events-auto relative">
      <div className="flex absolute flex-row justify-between w-full text-primary border-t mt-8 border-primary/10">
        <Plus size={12} className="relative md:left-10.5 left-4.5 bottom-1.5" />
        <Plus
          size={12}
          className="relative md:right-10.5 right-4.5 bottom-1.5"
        />
      </div>
      <div className="px-6 md:px-12 pt-48 md:grid md:grid-cols-4 flex flex-col h-full">
        <div className="flex flex-row gap-4 relative right-2 text-xs font-mono tracking-tighter items-center h-fit align-middle leading-4  ">
          <span className="flex flex-row items-center">
            <Dot className="" size={36} />
            <span className="relative right-2">10</span>
          </span>
          <h4 className="uppercase text-muted-foreground relative right-2">
            Ready to Start?
          </h4>
        </div>
        <div className="col-span-3 flex md:flex-row flex-col justify-between">
          <div>
            <h1 className="font-display w-full wrap-break-word leading-[clamp(2rem,6vw,6rem)] uppercase text-primary text-[clamp(2rem,6vw,8rem)] font-semibold tracking-tighter">
              GET IN TOUCH
            </h1>
            <p className="text-muted-foreground md:w-1/3">
              Whether you have questions or just want to explore options, we’re
              here.
            </p>
          </div>
          <div className="text-right flex flex-col gap-2 font-display text-sm font-medium">
            {links.map((link, index) => (
              <Link key={index} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden md:block"></div>
        <div className="w-full border-b border-primary/40 h-fit focus-within:border-primary">
          <Label className="px-4 text-muted-foreground py-2 text-xs font-mono tracking-tighter uppercase">
            Name
          </Label>
          <div className="flex flex-row justify-between">
            <Input
              type="text"
              placeholder="your name"
              className="px-4 py-2 w-full h-12 rounded-none border-0 bg-transparent placeholder:uppercase placeholder:tracking-tighter focus-visible:ring-0"
            />
            <GripVertical
              className="relative top-4 text-muted-foreground"
              strokeWidth={1}
            />
          </div>
        </div>
        <div className="w-full border-b border-primary/40 h-fit pt-18 focus-within:border-primary">
          <Label className="px-4 text-muted-foreground py-2 text-xs font-mono tracking-tighter uppercase">
            Email
          </Label>
          <div className="flex flex-row justify-between">
            <Input
              type="email"
              placeholder="email@address.com"
              className="px-4 py-2 w-full h-12 rounded-none border-0 bg-transparent placeholder:uppercase placeholder:tracking-tighter focus-visible:ring-0"
            />
            <GripVertical
              className="relative top-4 text-muted-foreground"
              strokeWidth={1}
            />
          </div>
        </div>
        <TextRollButton
          className="uppercase bg-primary/5 rounded-none w-full h-16 mt-38 flex flex-row justify-between px-6 font-display border-0.5 border-b  isolate z-50 relative border-black"
          variant={"link"}
        >
          Let&apos;s talk
        </TextRollButton>
        <Image src="/logo-black.svg" alt="Logo" width={180} height={64} />
        <div className="flex flex-col gap-1 text-right w-full items-end ">
          <Link
            href="tel:+918279497847"
            className="hover:bg-primary hover:text-primary-foreground w-fit"
          >
            (+91) 827 949 7847
          </Link>
          <Link
            href="mailto:hello@lumin8.in"
            className="hover:bg-primary hover:text-primary-foreground w-fit font-display uppercase text-xl font-bold tracking-tighter"
          >
            hello@lumin8.in
          </Link>
        </div>
        <div className="hidden md:block"></div>
        <div className="text-right">Back to top</div>
      </div>
    </section>
  );
}
