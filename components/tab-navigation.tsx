"use client";

import { cn } from "@/lib/utils";

const tabs = [
  { id: "about", label: "About" },
  { id: "bracelets", label: "Bracelets" },
  { id: "keychains", label: "Keychains" },
];

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="inline-flex bg-[#DFDDDE] rounded-full p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-6 py-2 text-sm font-medium rounded-full transition-all duration-200",
            activeTab === tab.id ? "bg-white text-[#545253]" : "text-gray-600"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
