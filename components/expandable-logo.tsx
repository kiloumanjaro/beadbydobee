"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface ExpandableLogoProps {
  isHome: boolean;
}

export function ExpandableLogo({ isHome }: ExpandableLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [showIcon, setShowIcon] = useState(true);
  const router = useRouter();
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const iconTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navItems = [
    { label: "Create", route: "/customize" },
    { label: "Designs", route: "/choose" },
    { label: "Contact", route: "/contact" },
  ];

  const handleNavigation = (route: string) => {
    router.push(route);
    setActiveItem(route); // Set the clicked item as active
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleMouseEnter = () => {
    // Clear any pending timeouts
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (iconTimeoutRef.current) {
      clearTimeout(iconTimeoutRef.current);
      iconTimeoutRef.current = null;
    }
    setIsHovered(true);
    setShowIcon(false);
  };

  const handleMouseLeave = () => {
    // Add delay before closing to prevent rapid flickering
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      setHoveredItem(null);
      // Show icon immediately, CSS will handle the delayed fade-in
      setShowIcon(true);
    }, 200); // Slightly longer to feel more deliberate
  };

  return (
    <div
      className={cn(
        "h-13 z-1 flex rounded-full items-center pl-6 pr-2 cursor-pointer transition-all duration-500 ease-in-out",
        isHome
          ? "bg-white/20 backdrop-blur-md border border-white/30 shadow-lg text-white"
          : "bg-gradient-to-b from-[#ffffff] to-[#f3f3f3] text-[#727272] shadow-sm",
        isHovered ? "gap-10" : "gap-2"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className={cn(
          "text-xl font-medium drop-shadow-xs cursor-pointer transition-colors duration-200",
          isHome
            ? "text-white hover:text-gray-200"
            : "text-[#727272] hover:text-[#333333]"
        )}
        onClick={handleLogoClick}
      >
        beadby<span className="font-bold">dobee</span>
      </span>

      <div
        className={cn(
          "flex h-full items-center gap-1 overflow-hidden transition-all duration-500 ease-in-out",
          isHovered ? "opacity-100 max-w-xl" : "opacity-0 max-w-0"
        )}
      >
        {navItems.map((item, index) => (
          <div
            className="h-full py-2"
            key={item.label}
            onMouseEnter={() => setHoveredItem(item.label)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleNavigation(item.route)}
          >
            <button
              className={cn(
                "px-4 h-full justify-center text-sm border rounded-3xl whitespace-nowrap",
                "transition-all duration-500 ease-in-out",
                (activeItem === item.label && !hoveredItem) ||
                  hoveredItem === item.label
                  ? "border-gray-300 bg-gray-100 text-[#727272]"
                  : isHome
                  ? "border-transparent bg-transparent text-white"
                  : "border-transparent bg-transparent text-[#727272]",
                // Stagger and slide-in effect
                isHovered
                  ? `opacity-100 translate-x-0 delay-[${index * 80}ms]`
                  : `opacity-0 translate-x-2 delay-[${(2 - index) * 80}ms]`
              )}
            >
              {item.label}
            </button>
          </div>
        ))}
      </div>
      {showIcon && (
        <div
          className={cn(
            "h-10 flex border border-gray-300 bg-gray-100 text-[#727272] px-2.5 rounded-full self-center items-center justify-center overflow-hidden",
            "transition-all duration-500 ease-in-out delay-200"
          )}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 28.246 28.516"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 14.251c0 5.236 3.021 9.857 7.15 12.127 1.436.807 2.625-1.107 1.04-2.023C4.757 22.44 2.337 18.64 2.337 14.25c0-6.453 5.14-11.621 11.594-11.621A11.588 11.588 0 0 1 25.565 14.25c0 .82.63 1.217 1.23 1.217.561 0 1.095-.41 1.095-1.217C27.89 6.622 21.56.306 13.93.306 6.317.306 0 6.622 0 14.25Z"
              fill="#727272"
            ></path>
            <path
              d="M5.523 14.251c0 3.049 1.668 5.606 3.665 6.89 1.38.93 2.57-.915 1.408-1.708a6.174 6.174 0 0 1-2.817-5.182c0-3.445 2.735-6.18 6.153-6.18 3.418 0 6.056 2.721 6.18 6.18.027.629.505 1.121 1.134 1.121.629 0 1.121-.492 1.121-1.12 0-4.622-3.814-8.436-8.435-8.436-4.594 0-8.409 3.814-8.409 8.435Z"
              fill="#727272"
            ></path>
            <path
              d="M13.412 24.15c-.014.533.615.71.957.369l2.092-2.092 2.338 5.77c.11.26.383.382.629.287l1.353-.547c.246-.11.342-.397.219-.657l-2.447-5.687 2.94-.11c.519-.027.765-.533.396-.916l-7.465-7.683c-.356-.356-.875-.15-.889.355Z"
              fill="#727272"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
}
