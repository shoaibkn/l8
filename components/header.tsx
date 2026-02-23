"use client";

import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { motion } from "motion/react";
import gsap from "gsap";
import { Button } from "./ui/button";
import { TextRoll } from "./motion-primitives/text-roll";
import Nav from "./nav";

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const menuKey = useRef(0);

  useEffect(() => {
    if (isMenuOpen && navContainerRef.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(
        navContainerRef.current,
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", scale: 0.95, opacity: 0 },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", scale: 1, opacity: 1, duration: 0.6, ease: "expo.out" }
      );
      
      tl.from(navContainerRef.current.querySelectorAll("a"), {
        y: 30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out"
      }, "-=0.3");
    }
  }, [menuKey.current]);

  const toggleMenu = () => {
    if (isMenuOpen) {
      if (navContainerRef.current) {
        gsap.to(navContainerRef.current, {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          scale: 0.95,
          opacity: 0,
          duration: 0.4,
          ease: "power3.in",
          onComplete: () => setIsMenuOpen(false),
        });
      }
    } else {
      menuKey.current += 1;
      setIsMenuOpen(true);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-100 grid md:grid-cols-2 py-4 px-6 md:px-12 mix-blend-difference text-white">
        <div className="flex flex-row justify-between w-full items-center">
          <h1 className="font-bold font-display text-xl">Lumin8</h1>
          <Button
            variant="link"
            className="flex flex-row gap-1 items-center align-middle cursor-pointer p-0 md:p-2 md:relative md:left-16 mix-blend-difference text-white"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={toggleMenu}
          >
            <motion.div
              animate={{ rotate: isHovered || isMenuOpen ? 45 : 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
            >
              <Plus size={16} />
            </motion.div>
            <TextRoll
              key={isHovered || isMenuOpen ? "roll-active" : "roll-inactive"}
              duration={0.1}
              className="text-sm font-bold font-mono tracking-tighter"
            >
              MENU
            </TextRoll>
          </Button>
        </div>
      </nav>
      {isMenuOpen && (
        <div
          ref={navContainerRef}
          className="fixed top-0 left-0 w-full z-90"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", opacity: 0 }}
        >
          <Nav />
        </div>
      )}
    </>
  );
}
