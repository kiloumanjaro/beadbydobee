"use client";

import { useState } from "react";
import { ExpandableLogo } from "@/components/expandable-logo";
import { TabNavigation } from "@/components/tab-navigation";
import AboutContent from "@/components/about-content";
import BraceletContent from "@/components/bracelet-content";
import KeychainContent from "@/components/keychain-content";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [activeTab, setActiveTab] = useState("keychains");

  const handleCreateClick = () => {
    if (activeTab === "keychains") {
      router.push("/design");
    } else if (activeTab === "bracelets") {
      router.push("/customize");
    } else if (activeTab === "about") {
      router.push("/contact");
    }
  };

  const getButtonText = () => {
    if (activeTab === "keychains") return "Choose";
    if (activeTab === "bracelets") return "Create";
    if (activeTab === "about") return "Contact";
    return "Action";
  };

  const getButtonVariant = () => {
    return activeTab === "about" ? "default" : "ghost";
  };

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
      className="font-sans bg-cover bg-bottom h-[100dvh] overflow-hidden"
      style={{
        backgroundImage:
          activeTab === "about"
            ? "url('/about.png')"
            : "url('/background.png')",
      }}
    >
      <header className="absolute w-full h-[100px] flex items-center justify-center">
        <ExpandableLogo isHome={isHome} />
      </header>

      <main className="relative flex-1">
        <div className="relative">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          {renderContent()}
        </div>
      </main>
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
        <Button
          onClick={handleCreateClick}
          variant={getButtonVariant()}
          size="lg"
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
}
