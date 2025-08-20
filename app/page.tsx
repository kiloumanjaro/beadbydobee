"use client";

import { useState, useRef } from "react";
import { ExpandableLogo } from "@/components/expandable-logo";
import { TabNavigation } from "@/components/tab-navigation";
import AboutContent from "@/components/about-content";
import BraceletContent from "@/components/bracelet-content";
import KeychainContent from "@/components/keychain-content";
import Image from "next/image";

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
    <div className="relative">
      <div className="font-sans grid grid-rows-[100px_100px_1fr]  bg-red-500">
        <header className="flex bg-red-400 items-center justify-center">
          <ExpandableLogo />
        </header>

        <div className="flex flex-col bg-blue-400  items-center justify-center">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <main className="items-center">{renderContent()}</main>
      </div>
    </div>
  );
}
