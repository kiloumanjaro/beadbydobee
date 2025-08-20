"use client";

import { useState, useRef } from "react";
import { ExpandableLogo } from "@/components/expandable-logo";
import { TabNavigation } from "@/components/tab-navigation";
import AboutContent from "@/components/about-content";
import BraceletContent from "@/components/bracelet-content";
import KeychainContent from "@/components/keychain-content";
import Image from "next/image";
import ModelViewer from "@/components/ModelViewer";

export default function Home() {
  const [activeTab, setActiveTab] = useState("keychains");
  const aboutSectionRef = useRef<HTMLDivElement | null>(null);
  const renderContent = () => (
    <div>
      <div className={activeTab === "about" ? "block" : "hidden"}>
        <AboutContent />
      </div>
      <div className={activeTab === "bracelets" ? "block" : "hidden"}>
        <BraceletContent />
      </div>
      <div className={activeTab === "keychains" ? "block" : "hidden"}>
        <KeychainContent />
      </div>
    </div>
  );

  const handleSeeMore = () => {
    aboutSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="relative">
      <div
        className="font-sans grid grid-rows-[100px_1fr] h-screen bg-cover bg-bottom"
        style={{
          backgroundImage:
            activeTab === "about"
              ? "url('/about.png')" // background when on About
              : "url('/background.png')", // default background
        }}
      >
        <header className="flex items-center justify-center">
          <ExpandableLogo />
        </header>

        <main className="flex flex-col gap-3 pt-14 items-center">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="bg-red-500 px-10"> {renderContent()}</div>
          {activeTab == "about" && (
            <button
              onClick={handleSeeMore}
              className="px-6 py-2 bg-white text-sm font-medium text-[#323232] rounded-full shadow-sm"
            >
              See More
            </button>
          )}
        </main>
      </div>

      <div
        ref={aboutSectionRef}
        className={`relative h-screen bg-[#EFEFEF] flex justify-center items-center ${
          activeTab === "about" ? "block" : "hidden"
        }`}
      >
        {/* Background Image */}
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
            width={1000}
            height={600}
            showScreenshotButton={false}
            defaultRotationX={0}
            autoRotate
            defaultRotationY={0}
            enableManualZoom={false}
          />
        </div>
      </div>
    </div>
  );
}
