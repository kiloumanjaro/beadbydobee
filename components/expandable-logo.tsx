"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface ExpandableLogoProps {
  isHome: boolean;
}

export function ExpandableLogo({ isHome }: ExpandableLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>("Contacts"); // Set "Contacts" as the initial active item
  const router = useRouter();

  const navItems = [
    { label: "Create", route: "/customize" },
    { label: "Designs", route: "/designs" },
    { label: "Contacts", route: "/contacts" }, // Add Contacts to the list
  ];

  const handleNavigation = (route: string) => {
    router.push(route);
    setActiveItem(route); // Set the clicked item as active
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <div
      className={cn(
        "h-13 z-1 gap-10 flex rounded-full items-center pl-6 pr-2 cursor-pointer",
        isHome
          ? "bg-white/20 backdrop-blur-md border border-white/30 shadow-lg text-white"
          : "bg-gradient-to-b from-[#ffffff] to-[#f3f3f3] text-[#727272] shadow-sm"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredItem(null);
      }}
    >
      <span
        className={cn(
          "text-xl font-medium drop-shadow-xs cursor-pointer",
          isHome ? "text-white" : "text-[#727272]"
        )}
        onClick={handleLogoClick}
      >
        beadby<span className="font-bold">dobee</span>
      </span>

      <div
        className={cn(
          "flex h-full items-center",
          isHovered ? "opacity-100" : "opacity-0 w-0"
        )}
      >
        {navItems.map((item) => (
          <div
            className="h-full py-2"
            key={item.label}
            onMouseEnter={() => setHoveredItem(item.label)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleNavigation(item.route)}
          >
            <button
              className={cn(
                "px-4 h-full justify-center text-sm border rounded-3xl",
                (activeItem === item.label && !hoveredItem) ||
                  hoveredItem === item.label
                  ? "border-gray-300 bg-gray-100 text-[#727272]"
                  : isHome
                  ? "border-transparent bg-transparent text-white"
                  : "border-transparent bg-transparent text-[#727272]"
              )}
            >
              {item.label}
            </button>
          </div>
        ))}
      </div>

      {!isHovered && (
        <div
          className={cn(
            "h-10 flex border border-gray-300 bg-gray-100 text-[#727272] px-2.5 rounded-full self-center items-center justify-center"
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
