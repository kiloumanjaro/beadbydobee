"use client";

import ModelViewer from "@/components/ModelViewer";
import { ExpandableLogo } from "@/components/expandable-logo";
import GlareHover from "@/components/GlareHover";

export default function Contact() {
  return (
    <div
      className="relative h-[100dvh] overflow-hidden bg-cover bg-bottom"
      style={{
        backgroundImage: "url('/grass.webp')",
      }}
    >
      <header className="absolute top-0 w-full h-[100px] flex items-center justify-center">
        <ExpandableLogo isHome={false} />
      </header>
      <div className="flex-1">
        <GlareHover
          glareColor="#ffffff"
          width="80px"
          height="80px"
          glareOpacity={0.3}
          glareAngle={-30}
          glareSize={300}
          transitionDuration={800}
          playOnce={false}
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </GlareHover>
      </div>

      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <ModelViewer
          url="/models/babi.glb"
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
