"use client";

import { projects } from "@/constants";
import { Dot } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";

export default function MoreProjects() {
  const descriptionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    descriptionRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === index) {
        gsap.to(el, {
          height: "auto",
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        });
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    });

    if (imageRef.current && projectRefs.current[index]) {
      const projectRect = projectRefs.current[index]!.getBoundingClientRect();
      const containerRect =
        imageRef.current.parentElement?.getBoundingClientRect();

      if (containerRect) {
        const top = projectRect.top - containerRect.top;

        gsap.to(imageRef.current, {
          top: top,
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
        });
      }
    }

    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    descriptionRefs.current.forEach((el) => {
      if (!el) return;
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    });

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }

    setHoveredIndex(null);
  };

  return (
    <section className="grid md:grid-cols-4 items-start px-6 md:px-12 py-24 bg-accent">
      <div className="flex w-full flex-row gap-4 relative right-4 text-xs font-mono tracking-tighter items-center align-middle leading-4">
        <span className="flex flex-row items-center">
          <Dot className="" size={36} />
        </span>
        <h4 className="uppercase text-muted-foreground relative right-2">
          more projects
        </h4>
      </div>
      {/*Projects*/}
      <div className="relative grid grid-cols-3 col-span-3">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => {
              projectRefs.current[index] = el;
            }}
            className="overflow-visible col-span-2 py-2"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex flex-row items-start gap-1 cursor-pointer py-1">
              <h4 className="text-2xl tracking-tighter font-semibold">
                {project.name}
              </h4>
              <span className="font-mono text-xs text-muted-foreground tracking-tighter">
                {project.year}
              </span>
            </div>
            {/*Description*/}
            <div
              ref={(el) => {
                descriptionRefs.current[index] = el;
              }}
              className="overflow-hidden h-0 opacity-0"
            >
              <p className="text-muted-foreground tracking-tighter pb-2">
                {project.description}
              </p>
            </div>
          </div>
        ))}
        {/*Image container - positioned absolutely relative to projects list */}
        <div
          ref={imageRef}
          className="absolute right-0 w-72 h-40 overflow-hidden rounded-lg opacity-0 pointer-events-none"
          style={{ top: 0 }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="absolute inset-0"
              style={{ opacity: hoveredIndex === index ? 1 : 0 }}
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
