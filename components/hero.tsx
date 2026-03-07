"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import HeaderContactUs from "./header-contact-us";
import ReviewAvatars from "./review-avatars";
import { TextRoll } from "./ui/text-roll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroContent } from "@/constants";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

function AnimatedButton({
  children,
  className,
  variant,
  url,
}: {
  children: string;
  className?: string;
  variant?: "ghost" | "outline" | "default" | "secondary";
  url: string;
}) {
  const [hoverKey, setHoverKey] = useState(0);

  return (
    <Button
      className={className}
      variant={variant}
      onMouseEnter={() => setHoverKey((k) => k + 1)}
      asChild
    >
      <Link href={url}>
        <TextRoll key={hoverKey} duration={0.1}>
          {children}
        </TextRoll>
      </Link>
    </Button>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const mobileImageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const reviewAvatarsRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
        },
      );

      gsap.fromTo(
        headingRef.current,
        { y: "20vh", clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          clipPath: "inset(0 0 0% 0)",
        },
      );

      gsap.fromTo(
        reviewAvatarsRef.current,
        { y: "15vh", opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.8,
        },
      );

      gsap.fromTo(
        subTextRef.current,
        { y: "-10vh", opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 1.2,
        },
      );

      gsap.fromTo(
        buttonsRef.current,
        { y: "20vh", opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 1.6,
        },
      );

      const trigger = {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };

      gsap.to(imageRef.current, {
        yPercent: 20,
        scale: 1.1,
        scrollTrigger: trigger,
      });

      gsap.to(mobileImageRef.current, {
        yPercent: 20,
        scale: 1.1,
        scrollTrigger: trigger,
      });

      gsap.to(headingRef.current, {
        yPercent: -30,
        scrollTrigger: trigger,
      });

      gsap.to(textRef.current, {
        yPercent: -15,
        scrollTrigger: trigger,
      });

      gsap.to(buttonsRef.current, {
        yPercent: -40,
        scrollTrigger: trigger,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-[calc(100lvh)] w-full relative overflow-hidden flex flex-col justify-between bg-primary/10"
    >
      <HeaderContactUs />
      <div className="absolute inset-0 z-100 bg-[url('https://www.transparenttextures.com/patterns/beige-paper.png')] opacity-80 pointer-events-none mix-blend-overlay" />
      <div className="flex flex-row gap-0 justify-between w-screen h-full overflow-hidden">
        {/*Image Desktop*/}
        <div className="md:block hidden w-2/5 h-full absolute overflow-hidden">
          <div
            ref={imageRef}
            className="absolute inset-0 h-full will-change-transform"
          >
            <Image
              src={heroContent.imageSrc}
              alt={heroContent.imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/*Hero Info*/}
        <div
          ref={textRef}
          className="md:w-1/2 w-3/5 md:right-0 absolute flex flex-col justify-center items-start h-full will-change-transform gap-24 pt-48"
        >
          {/*<div
            ref={reviewAvatarsRef}
            className="pl-6 md:px-0 absolute md:top-64 opacity-0"
          >
            <ReviewAvatars />
          </div>*/}
        </div>
      </div>

      <div className="absolute w-dvw h-[calc(100lvh)] flex flex-col justify-center md:text-center text-left pl-6 md:pl-0 gap-12 md:gap-0">
        <div className="grid md:grid-cols-4">
          <div></div>
          <div></div>
          <div
            ref={reviewAvatarsRef}
            className="md:px-0 opacity-0 md:w-full w-1/2 justify-start"
          >
            <ReviewAvatars />
          </div>
        </div>
        <h1
          ref={headingRef}
          className="md:text-[clamp(4rem,10vw,16rem)] md:px-9 text-left md:leading-[clamp(8rem,8vw,16rem)] leading-[clamp(3rem,2.5vw,4rem)] text-[clamp(3rem,2.5vw,4rem)] tracking-tighter font-bold font-display mix-blend-difference text-white will-change-transform"
          style={{ clipPath: "inset(0 0 100% 0)" }}
        >
          {heroContent.heading}
        </h1>
        <div className="grid md:grid-cols-4">
          <div></div>
          <div></div>
          <div ref={subTextRef} className="col-span-2 opacity-0">
            <h3 className="font-display tracking-tighter text-left w-full md:px-0 text-[clamp(1.5rem,4vw,5rem)] font-bold">
              {heroContent.subheading}
            </h3>
            <span className="w-full wrap-normal text-left md:text-lg text-sm font-medium text-muted-foreground flex flex-row flex-wrap">
              {heroContent.description} -
              <p className="text-primary">{heroContent.descriptionHighlight}</p>
            </span>
          </div>
        </div>
        <div
          ref={buttonsRef}
          className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1 md:px-12 px-6 z-10 relative bottom-0 will-change-transform opacity-0"
        >
          <AnimatedButton className="md:h-20 h-14 rounded-full" url="/contact">
            {heroContent.primaryCta}
          </AnimatedButton>
          <AnimatedButton
            className="md:h-20 h-14 rounded-full"
            variant="secondary"
            url="#path"
          >
            {heroContent.secondaryCta}
          </AnimatedButton>
        </div>
      </div>
      {/*Image Mobile*/}
      <div className="w-1/2 h-full absolute md:hidden right-0 -z-10 overflow-hidden">
        <div
          ref={mobileImageRef}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={heroContent.imageSrc}
            alt={heroContent.imageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div
        ref={buttonsRef}
        className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1 md:px-12 px-6 z-10 relative md:bottom-12 bottom-6 will-change-transform opacity-0"
      >
        <AnimatedButton className="md:h-20 h-14 rounded-full" url="/contact">
          {heroContent.primaryCta}
        </AnimatedButton>
        <AnimatedButton
          className="md:h-20 h-14 rounded-full"
          variant="secondary"
          url="#path"
        >
          {heroContent.secondaryCta}
        </AnimatedButton>
      </div>
      {/*<div className="w-full flex flex-row md:justify-end pb-24">
        <div className="md:w-1/2 w-3/5">
          <ClientProgressiveBlurSlider />
        </div>
      </div>*/}
    </section>
  );
}
