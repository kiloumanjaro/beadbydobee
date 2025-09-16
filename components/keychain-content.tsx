"use client";
import ModelViewer from "./ModelViewer";

export default function KeychainContent() {
  return (
    <div className="flex flex-col gap-5 items-center pt-32">
      <ModelViewer
        width={600}
        height={520}
        url="/keychain3.glb"
        defaultRotationX={0}
        defaultRotationY={0}
        autoRotate
        showScreenshotButton={false}
        enableManualZoom={false}
        autoFrame
      />
    </div>
  );
}
