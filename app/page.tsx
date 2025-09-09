"use client";

import { useState, useRef } from "react";
import { ExpandableLogo } from "@/components/expandable-logo";
import { TabNavigation } from "@/components/tab-navigation";
import AboutContent from "@/components/about-content";
import BraceletContent from "@/components/bracelet-content";
import KeychainContent from "@/components/keychain-content";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ModelViewer from "@/components/ModelViewer";

export default function Home() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeTab, setActiveTab] = useState("keychains");
  const aboutSectionRef = useRef<HTMLDivElement | null>(null);
  const handleSeeMore = () => {
    aboutSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return <AboutContent onPress={handleSeeMore} />;
      case "bracelets":
        return <BraceletContent />;
      case "keychains":
        return <KeychainContent />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div
        className="font-sans bg-cover bg-bottom h-screen"
        style={{
          backgroundImage:
            activeTab === "about"
              ? "url('/about.png')" // background when on About
              : "url('/background.png')", // default background
        }}
      >
        <main className="relative flex-1">
          <ExpandableLogo isHome={isHome} />
          <div className="relative">
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            {renderContent()}
          </div>
        </main>
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
    </div>
  );
}
