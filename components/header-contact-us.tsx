"use client";

import { Plus } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";
import { headerContactUsContent } from "@/constants";

export default function HeaderContactUs() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={headerContactUsContent.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="hidden md:flex flex-row justify-end gap-4 hover:gap-3 transition-all items-center absolute right-8 top-6 cursor-pointer z-[101] w-fit"
    >
      <span className={`text-xs text-right transition-all duration-300 w-42`}>
        <p className="text-muted-foreground">
          {headerContactUsContent.line1}
        </p>
        <p className="">{headerContactUsContent.line2}</p>
      </span>
      <div
        className={`flex flex-row-reverse items-center transition-all duration-300 ${isHovered ? "-translate-x-1" : ""}`}
      >
        <Button
          size="icon-lg"
          className="relative right-2 w-12 h-12 rounded-full hover:bg-primary"
        >
          <Plus
            className={`transition-all duration-700 ${isHovered ? "rotate-[360deg]" : ""}`}
            size={96}
          />
        </Button>
        <Avatar className="w-12 h-12 -mr-2">
          <AvatarImage
            className="border-4 border-primary-foreground"
            src={headerContactUsContent.avatarSrc}
            alt={headerContactUsContent.avatarAlt}
          />
        </Avatar>
      </div>
    </Link>
  );
}
