"use client";

import { cn } from "@/lib/utils";
import { useResponsiveSpacing } from "@/hooks/use-responsive-spacing";

const tabs = [
  { id: "about", label: "About Us" },
  { id: "bracelets", label: "Bracelets" },
  { id: "keychains", label: "Keychains" },
];

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const { spacing } = useResponsiveSpacing();

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 ${spacing.tabNav} z-10 inline-flex bg-[#DFDDDE] rounded-full p-[3px]`}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-6 py-2 text-xs font-medium rounded-full transition-all duration-200",
            activeTab === tab.id
              ? "bg-white shadow-sm text-[#4b494a]"
              : "text-[#969495]"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
