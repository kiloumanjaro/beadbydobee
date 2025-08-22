"use client";
import ModelViewer from "./ModelViewer";

export default function KeychainContent() {
  return (
    <div className="flex flex-col gap-5 items-center">
      {/* <div className="w-[1000] h-[400] bg-red-500" /> */}
      <ModelViewer
        width={700}
        height={700}
        url="/bracelet4.glb"
        defaultRotationX={0}
        defaultRotationY={0}
        autoRotate
        showScreenshotButton={false}
        enableManualZoom={false}
        autoFrame
      />
      <div className="flex absolute bottom-24 gap-4 items-center flex-col sm:flex-row">
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
