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
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
      document.documentElement.setAttribute("data-menu-open", "true");
    } else {
      document.body.classList.remove("menu-open");
      document.documentElement.setAttribute("data-menu-open", "false");
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen && navContainerRef.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        navContainerRef.current,
        {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          scale: 0.95,
          opacity: 0,
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "expo.out",
        },
      );

      tl.fromTo(
        navContainerRef.current.querySelector("nav"),
        { y: "-100%" },
        { y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );

      tl.from(
        navContainerRef.current.querySelectorAll("a"),
        {
          y: 30,
          opacity: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.3",
      );
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
          {/*<h1 className="tracking-tighter text-xl font-display uppercase font-semibold">
            Lumin<span className="font-black">8</span>
          </h1>*/}
          <>
            <svg
              width="94"
              height="25"
              viewBox="0 0 94 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M90.944 10.912C91.6693 11.616 92.2453 12.448 92.672 13.408C93.0987 14.368 93.312 15.4027 93.312 16.512C93.312 17.5787 93.1093 18.5813 92.704 19.52C92.2987 20.4587 91.744 21.28 91.04 21.984C90.336 22.688 89.5147 23.2427 88.576 23.648C87.6373 24.0533 86.6347 24.256 85.568 24.256H85.536C84.4693 24.256 83.4667 24.0533 82.528 23.648C81.5893 23.2427 80.768 22.688 80.064 21.984C79.36 21.28 78.8053 20.4587 78.4 19.52C77.9947 18.5813 77.792 17.5787 77.792 16.512C77.792 15.4027 77.9947 14.368 78.4 13.408C78.8267 12.448 79.4133 11.616 80.16 10.912C79.7333 10.3573 79.392 9.728 79.136 9.024C78.88 8.32 78.752 7.584 78.752 6.816C78.752 5.87733 78.9227 5.00267 79.264 4.192C79.6267 3.36 80.1173 2.63467 80.736 2.016C81.3547 1.39733 82.0693 0.906666 82.88 0.543999C83.712 0.181333 84.5973 0 85.536 0C86.4747 0 87.3493 0.181333 88.16 0.543999C88.992 0.906666 89.7173 1.39733 90.336 2.016C90.9547 2.63467 91.4347 3.36 91.776 4.192C92.1387 5.00267 92.32 5.87733 92.32 6.816C92.32 7.584 92.192 8.32 91.936 9.024C91.7013 9.728 91.3707 10.3573 90.944 10.912ZM85.568 19.424C86.3787 19.4027 87.0613 19.1147 87.616 18.56C88.1707 18.0053 88.448 17.3227 88.448 16.512C88.448 15.7013 88.1707 15.0187 87.616 14.464C87.0613 13.888 86.3787 13.6 85.568 13.6H85.536C84.7253 13.6 84.032 13.888 83.456 14.464C82.9013 15.0187 82.624 15.7013 82.624 16.512C82.624 17.3227 82.9013 18.0053 83.456 18.56C84.032 19.1147 84.7253 19.4027 85.536 19.424H85.568ZM85.568 8.736C86.1013 8.736 86.5493 8.55467 86.912 8.192C87.296 7.808 87.488 7.34933 87.488 6.816C87.488 6.26133 87.296 5.80267 86.912 5.44C86.5493 5.056 86.0907 4.864 85.536 4.864C85.0027 4.864 84.544 5.056 84.16 5.44C83.7973 5.80267 83.616 6.26133 83.616 6.816C83.616 7.34933 83.7973 7.808 84.16 8.192C84.544 8.55467 85.0027 8.736 85.536 8.736H85.568Z"
                fill="white"
              />
              <path
                d="M71.96 16.192V0H76.792V24.256H71.16L61.432 8.096V24.256H56.6V0H62.264L71.96 16.192Z"
                fill="white"
              />
              <path d="M50.768 24.256V0H55.6V24.256H50.768Z" fill="white" />
              <path
                d="M40.072 24.256H34.856L29.992 12.128V24.256H25.16V0H30.376L37.48 17.728L44.552 0H49.768V24.256H44.936V12.128L40.072 24.256Z"
                fill="white"
              />
              <path
                d="M24.16 8.008C24.16 9.288 23.9147 10.4933 23.424 11.624C22.9547 12.7333 22.2933 13.7147 21.44 14.568C20.608 15.4 19.6267 16.0613 18.496 16.552C17.3867 17.0213 16.192 17.256 14.912 17.256C13.632 17.256 12.4267 17.0213 11.296 16.552C10.1867 16.0613 9.20533 15.4 8.352 14.568C7.52 13.7147 6.85867 12.7333 6.368 11.624C5.89867 10.4933 5.664 9.288 5.664 8.008V0H10.496V8.008C10.496 8.6267 10.6133 9.2027 10.848 9.736C11.0827 10.2693 11.392 10.7387 11.776 11.144C12.1813 11.528 12.6507 11.8373 13.184 12.072C13.7173 12.3067 14.2933 12.424 14.912 12.424C15.5093 12.424 16.0747 12.3067 16.608 12.072C17.1627 11.8373 17.632 11.528 18.016 11.144C18.4213 10.7387 18.7413 10.2693 18.976 9.736C19.2107 9.2027 19.328 8.6267 19.328 8.008V0L24.16 3.8147e-06V8.008Z"
                fill="white"
              />
              <path
                d="M0 24.256V0H4.832V19.392H13.664V24.256H0Z"
                fill="white"
              />
            </svg>
          </>
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
