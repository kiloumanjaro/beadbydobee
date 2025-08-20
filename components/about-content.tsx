"use client";

import Image from "next/image";
import { useRef } from "react";
import ModelViewer from "@/components/ModelViewer";

export default function AboutContent() {
  const aboutSectionRef = useRef<HTMLDivElement | null>(null);
  const handleSeeMore = () => {
    aboutSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="flex-col flex items-center">
      <div className="flex flex-col gap-8 items-center">
        <div className="px-6 pb-3 bg-white rounded-xl shadow-sm">
          <Image
            src="/logo.jpeg"
            alt="Description of image"
            width={160}
            height={106}
          />
        </div>
        <span className="w-2xs text-[#323232] text-lg text-center">
          <span className="font-semibold">beadbydobee</span> is a custom
          keychain and bracelet business
        </span>

        <button
          onClick={handleSeeMore}
          className="px-6 py-2 bg-white text-sm font-medium text-[#323232] rounded-full shadow-sm"
        >
          See More
        </button>
      </div>

      <div className="relative" ref={aboutSectionRef}>
        Background Image
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
