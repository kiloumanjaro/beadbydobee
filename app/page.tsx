"use client";

import { useState } from "react";
import { ExpandableLogo } from "@/components/expandable-logo";
import { TabNavigation } from "@/components/tab-navigation";
import AboutContent from "@/components/about-content";
import BraceletContent from "@/components/bracelet-content";
import KeychainContent from "@/components/keychain-content";

export default function Home() {
  const [activeTab, setActiveTab] = useState("keychains");
  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return <AboutContent />;
      case "bracelets":
        return <BraceletContent />;
      case "keychains":
        return <KeychainContent />;
      default:
        return null;
    }
  };

  return (
    <div
      className="font-sans grid grid-rows-[100px_1fr] items-center h-screen bg-cover bg-bottom"
      style={{
        backgroundImage:
          activeTab === "about"
            ? "url('/about10.png')" // background when on About
            : "url('/sky.jpg')", // default background
      }}
    >
      <header className="flex items-center justify-center">
        <ExpandableLogo />
      </header>

      <main className="flex flex-col gap-8 items-center justify-center">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="h-80 px-10"> {renderContent()}</div>
      </main>
    </div>
  );
}
