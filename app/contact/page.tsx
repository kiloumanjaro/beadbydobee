"use client";

import ModelViewer from "@/components/ModelViewer";
import { ExpandableLogo } from "@/components/expandable-logo";
import Image from "next/image";

export default function Contact() {
  return (
    <div className="relative h-screen w-screen">
      {/* Background Image */}
      <Image
        src="/grass.webp"
        alt="Background"
        fill
        priority
        className="object-contain"
      />

      {/* Overlay content */}
      <header className="absolute top-0 w-full h-[100px] flex items-center justify-center">
        <ExpandableLogo isHome={false} />
      </header>

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
  );
}
