"use client";

import { useState, useRef } from "react";
import { ExpandableLogo } from "@/components/expandable-logo";
import { TabNavigation } from "@/components/tab-navigation";
import AboutContent from "@/components/about-content";
import BraceletContent from "@/components/bracelet-content";
import KeychainContent from "@/components/keychain-content";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ModelViewer from "@/components/ModelViewer";

export default function Home() {
  const pathname = usePathname();
  const router = useRouter(); // ✅ router hook
  const isHome = pathname === "/";
  const [activeTab, setActiveTab] = useState("keychains");
  const aboutSectionRef = useRef<HTMLDivElement | null>(null);

  const handleCreateClick = () => {
    if (activeTab === "keychains") {
      router.push("/design");
    } else if (activeTab === "bracelets") {
      router.push("/customize");
    } else if (activeTab === "about") {
      router.push("/contacts");
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
    <>
      <div
        className="font-sans bg-cover bg-bottom h-screen"
        style={{
          backgroundImage:
            activeTab === "about"
              ? "url('/about.png')" // background when on About
              : "url('/background.png')", // default background
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
        <div className="absolute bottom-25 left-1/2 -translate-x-1/2">
          <Button
            onClick={handleCreateClick}
            variant={getButtonVariant()}
            size="lg"
          >
            {getButtonText()}
          </Button>
        </div>
      </div>

      <div
        className={`relative h-screen bg-[#EFEFEF] flex justify-center items-center ${
          activeTab === "about" ? "block" : "hidden"
        }`}
        ref={aboutSectionRef}
      >
        <Image
          src="/grass.webp"
          alt="Description of image"
          width={1920}
          height={1080}
          className="w-[1200px] h-[650px] rounded-3xl object-cover"
        />
        {/* ModelViewer on top */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <ModelViewer
            url="/babi.glb"
            width={700}
            height={700}
            defaultRotationX={0}
            defaultRotationY={0}
            autoRotate
            showScreenshotButton={false}
            enableManualZoom={false}
            autoFrame
          />
        </div>
      </div>
    </>
  );
}
