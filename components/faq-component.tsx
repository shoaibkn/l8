"use client";

import { Plus, Minus } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

export default function FAQComponent({
  id,
  question,
  answer,
}: {
  id: string;
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const handleClick = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!answerRef.current || !iconRef.current) return;

    if (isOpen) {
      gsap.to(answerRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(iconRef.current, {
        rotation: 180,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    } else {
      gsap.to(answerRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(iconRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col">
      {/*Question*/}
      <div
        className="border-t p-4 flex flex-row justify-between items-center cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex flex-row items-center gap-4 ">
          <span className="font-mono bg-primary/10 rounded-full w-10 h-10 flex flex-row justify-center items-center text-xs">
            {id}
          </span>
          <h3 className="font-medium text-base text-primary/70">{question}</h3>
        </div>
        <span
          ref={iconRef}
          className="relative w-5 h-5 flex items-center justify-center"
        >
          <Plus
            strokeWidth={1}
            className={`absolute text-muted-foreground ${isOpen ? "opacity-0" : "opacity-100"}`}
          />
          <Minus
            strokeWidth={1}
            className={`absolute text-muted-foreground ${isOpen ? "opacity-100" : "opacity-0"}`}
          />
        </span>
      </div>
      {/*Answer*/}
      <div ref={answerRef} className="overflow-hidden h-0 opacity-0 border-t">
        <div className="px-18 py-4">
          <p className="text-xs text-muted-foreground font-mono tracking-tighter ">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
