"use client";
import ModelViewer from "./ModelViewer";
import StickerPeel from "./StickerPeel/StickerPeel";

export default function BraceletContent() {
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
      <StickerPeel
        imageSrc="/bead.png" // 👈 from public/
        width={120}
        rotate={30}
        peelBackHoverPct={20}
        peelBackActivePct={40}
        shadowIntensity={0}
        lightingIntensity={0.1}
        initialPosition={{ x: 550, y: 510 }}
      />
      <StickerPeel
        imageSrc="/bead3.png" // 👈 from public/
        width={140}
        rotate={30}
        peelBackHoverPct={20}
        peelBackActivePct={40}
        shadowIntensity={0}
        lightingIntensity={0.1}
        initialPosition={{ x: -550, y: 480 }}
      />
      <StickerPeel
        imageSrc="/bead9.png" // 👈 from public/
        width={180}
        rotate={-20}
        peelBackHoverPct={10}
        peelBackActivePct={15}
        shadowIntensity={0}
        lightingIntensity={0.1}
        initialPosition={{ x: 600, y: 210 }}
      />
      <StickerPeel
        imageSrc="/bead6.png"
        width={100}
        rotate={30}
        peelBackHoverPct={20}
        peelBackActivePct={40}
        shadowIntensity={0}
        lightingIntensity={0.1}
        initialPosition={{ x: -280, y: 420 }}
      />
      <StickerPeel
        imageSrc="/bead7.png"
        width={100}
        rotate={30}
        peelBackHoverPct={20}
        peelBackActivePct={40}
        shadowIntensity={0}
        lightingIntensity={0.1}
        initialPosition={{ x: -620, y: 60 }}
      />
      <StickerPeel
        imageSrc="/bead2.png"
        width={120}
        rotate={0}
        peelBackHoverPct={20}
        peelBackActivePct={40}
        shadowIntensity={0}
        lightingIntensity={0.1}
        initialPosition={{ x: 250, y: 455 }}
      />
      <StickerPeel
        imageSrc="/bead10.png"
        width={80}
        rotate={-80}
        peelBackHoverPct={20}
        peelBackActivePct={30}
        shadowIntensity={0}
        lightingIntensity={0.1}
        initialPosition={{ x: 460, y: 60 }}
      />
      <StickerPeel
        imageSrc="/bead11.png"
        width={200}
        rotate={-80}
        peelBackHoverPct={20}
        peelBackActivePct={30}
        shadowIntensity={0}
        lightingIntensity={0.1}
        initialPosition={{ x: -440, y: 210 }}
      />
    </div>
  );
}
