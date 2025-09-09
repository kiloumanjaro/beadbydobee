"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ExpandableLogoProps {
  isHome: boolean;
}

export function ExpandableLogo({ isHome }: ExpandableLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "absolute left-1/2 -translate-x-1/2 h-13 z-20 top-7 flex rounded-3xl items-center justify-between pl-6 pr-2 py-1.5 transition-all duration-300 ease-in-out cursor-pointer",
        // Frosted glass styling
        isHome
          ? "bg-white/20 backdrop-blur-md border border-white/30 shadow-lg text-white"
          : "bg-white text-[#323232] shadow-sm",
        isHovered ? "w-96" : "w-60"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className=" text-xl font-medium transition-all duration-300 drop-shadow-sm">
        {isHovered ? (
          <span>
            beadby<span className="font-bold">dobee</span>
          </span>
        ) : (
          <span>
            beadby<span className="font-bold">dobee</span>
          </span>
        )}
      </span>

      <div className="bg-white w-14 h-full rounded-2xl"></div>
    </div>
  );
}
