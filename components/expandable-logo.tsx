"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function ExpandableLogo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "absolute left-1/2 -translate-x-1/2 z-20 top-7 flex bg-white rounded-full items-center justify-between shadow-sm pl-8 pr-2 py-1.5 transition-all duration-300 ease-in-out cursor-pointer",
        isHovered ? "w-96" : "w-60"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="text-[#323232] text-xl transition-all duration-300">
        {isHovered ? (
          <span>
            beadby<span className="font-semibold">dobee</span>
          </span>
        ) : (
          <span>
            beadby<span className="font-semibold">dobee</span>
          </span>
        )}
      </span>

      <div
        className={cn(
          "flex bg-[#393738] text-white rounded-full h-10 items-center justify-center transition-all duration-300",
          isHovered ? "px-5" : "px-2.5"
        )}
      >
        {isHovered ? (
          <div className="text-sm">Instagram</div>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 28.246 28.516"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 14.251c0 5.236 3.021 9.857 7.15 12.127 1.436.807 2.625-1.107 1.04-2.023C4.757 22.44 2.337 18.64 2.337 14.25c0-6.453 5.14-11.621 11.594-11.621A11.588 11.588 0 0 1 25.565 14.25c0 .82.63 1.217 1.23 1.217.561 0 1.095-.41 1.095-1.217C27.89 6.622 21.56.306 13.93.306 6.317.306 0 6.622 0 14.25Z"
              fill="#fcffff"
            ></path>
            <path
              d="M5.523 14.251c0 3.049 1.668 5.606 3.665 6.89 1.38.93 2.57-.915 1.408-1.708a6.174 6.174 0 0 1-2.817-5.182c0-3.445 2.735-6.18 6.153-6.18 3.418 0 6.056 2.721 6.18 6.18.027.629.505 1.121 1.134 1.121.629 0 1.121-.492 1.121-1.12 0-4.622-3.814-8.436-8.435-8.436-4.594 0-8.409 3.814-8.409 8.435Z"
              fill="#fcffff"
            ></path>
            <path
              d="M13.412 24.15c-.014.533.615.71.957.369l2.092-2.092 2.338 5.77c.11.26.383.382.629.287l1.353-.547c.246-.11.342-.397.219-.657l-2.447-5.687 2.94-.11c.519-.027.765-.533.396-.916l-7.465-7.683c-.356-.356-.875-.15-.889.355Z"
              fill="#6f7177"
            ></path>
          </svg>
        )}
      </div>
    </div>
  );
}
