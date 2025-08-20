"use client";
import ModelViewer from "./ModelViewer";

export default function BraceletContent() {
  return (
    <div className="flex flex-col gap-5 items-center">
      {/* <div className="w-[1000] h-[400] bg-red-500" /> */}
      <ModelViewer
        url="/bracelet3.glb"
        width={1000}
        height={400}
        defaultRotationX={0}
        defaultRotationY={0}
        autoRotate
        defaultZoom={0.5}
        maxZoomDistance={0.5}
        showScreenshotButton={false}
        enableManualZoom={false}
      />
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <a
          className="rounded-full flex items-center justify-center bg-white hover:bg-[#DFDDDE] text-[#545253] font-semibold text-sm h-10 px-10"
          href={"/customize"}
        >
          Create
        </a>
      </div>
    </div>
  );
}
