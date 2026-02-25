"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import HeaderContactUs from "./header-contact-us";
import ReviewAvatars from "./review-avatars";
import { TextRoll } from "./ui/text-roll";
import { ClientProgressiveBlurSlider } from "./client-slider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AnimatedButton({
  children,
  className,
  variant,
}: {
  children: string;
  className?: string;
  variant?: "ghost" | "outline" | "default" | "secondary";
}) {
  const [hoverKey, setHoverKey] = useState(0);

  return (
    <Button
      className={className}
      variant={variant}
      onMouseEnter={() => setHoverKey((k) => k + 1)}
    >
      <TextRoll key={hoverKey} duration={0.1}>
        {children}
      </TextRoll>
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
        }
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
              src="https://framerusercontent.com/images/VRwQ9uHPGoSubtzvWBwjE2utUDU.jpg"
              alt="Hero Image"
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
          <div
            ref={reviewAvatarsRef}
            className="pl-6 md:px-0 absolute top-64 opacity-0"
          >
            <ReviewAvatars />
          </div>

          {/*<div className="pl-6 md:pl-0">
            <h3 className="font-display tracking-tighter text-left w-full md:px-0 text-[clamp(1.5rem,4vw,5rem)] font-bold">
              FOR YOUR BUSINESS
            </h3>
            <span className="w-full wrap-normal text-left md:px-0 md:text-lg text-sm font-medium text-muted-foreground">
              We help businesses apply AI where it actually matters —
              <p className="text-primary">without the noise</p>
            </span>
          </div>*/}
        </div>
      </div>

      <div className="absolute w-dvw h-screen flex flex-col justify-center md:text-center text-left pl-6 md:pl-0">
        <h1
          ref={headingRef}
          className="text-[clamp(4rem,12vw,16rem)] tracking-tighter font-bold font-display md:text-nowrap mix-blend-difference text-white will-change-transform"
          style={{ clipPath: "inset(0 0 100% 0)" }}
        >
          A CLEAR AI PLAN
        </h1>
        <div className="grid md:grid-cols-4">
          <div></div>
          <div></div>
          <div ref={subTextRef} className="col-span-2 opacity-0">
            <h3 className="font-display tracking-tighter text-left w-full md:px-0 text-[clamp(1.5rem,4vw,5rem)] font-bold">
              FOR YOUR BUSINESS
            </h3>
            <span className="w-full wrap-normal text-left md:text-lg text-sm font-medium text-muted-foreground flex flex-row flex-wrap">
              We help businesses apply AI where it actually matters —
              <p className="text-primary">without the noise</p>
            </span>
          </div>
        </div>
      </div>
      {/*Image Mobile*/}
      <div className="w-1/2 h-full absolute md:hidden right-0 -z-10 overflow-hidden">
        <div
          ref={mobileImageRef}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="https://framerusercontent.com/images/VRwQ9uHPGoSubtzvWBwjE2utUDU.jpg"
            alt="Hero Image"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div
        ref={buttonsRef}
        className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-1 md:px-12 px-6 z-10 relative bottom-36 will-change-transform opacity-0"
      >
        <AnimatedButton className="md:h-20 h-14 rounded-full">
          SCHEDULE A FREE ASSESSMENT
        </AnimatedButton>
        <AnimatedButton
          className="md:h-20 h-14 rounded-full"
          variant="secondary"
        >
          SEE HOW IT WORKS
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
