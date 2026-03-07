"use client";

import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { motion } from "motion/react";
import gsap from "gsap";
import { Button } from "./ui/button";
import { TextRoll } from "./motion-primitives/text-roll";
import Nav from "./nav";
import Image from "next/image";
import { headerContent } from "@/constants";

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
      document.documentElement.setAttribute("data-menu-open", "true");
    } else {
      document.body.classList.remove("menu-open");
      document.documentElement.setAttribute("data-menu-open", "false");
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (isMenuOpen) {
      const navElement = navContainerRef.current?.querySelector("nav");

      if (!navElement) {
        setIsMenuOpen(false);
        return;
      }

      gsap.to(navElement, {
        yPercent: -100,
        duration: 0.45,
        ease: "power3.inOut",
        onComplete: () => setIsMenuOpen(false),
      });
    } else {
      setIsMenuOpen(true);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-100 grid md:grid-cols-2 py-4 px-6 md:px-12 mix-blend-difference text-white">
        <div className="flex flex-row justify-between w-full items-center">
          {/*<h1 className="tracking-tighter text-xl font-display uppercase font-semibold">
            Lumin<span className="font-black">8</span>
          </h1>*/}
          <Image src="/logo.svg" alt={headerContent.logoAlt} width={96} height={24} />
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
              {headerContent.menuLabel}
            </TextRoll>
          </Button>
        </div>
      </nav>
      {isMenuOpen && (
        <div ref={navContainerRef} className="fixed top-0 left-0 w-full z-90">
          <Nav />
        </div>
      )}
    </>
  );
}
