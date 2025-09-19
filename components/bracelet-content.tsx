"use client";
import ModelViewer from "./ModelViewer";
import StickerPeel from "./StickerPeel/StickerPeel";

export default function BraceletContent() {
  return (
    <div className="flex flex-col gap-5 items-center">
      <ModelViewer
        width={700}
        height={700}
        url="/models/bracelet.glb"
        defaultRotationX={0}
        defaultRotationY={0}
        autoRotate
        showScreenshotButton={false}
        enableManualZoom={false}
        autoFrame
      />
      <StickerPeel
        imageSrc="/stickers/sticker1.png"
        width={120}
        rotate={30}
        peelBackHoverPct={20}
        peelBackActivePct={40}
        shadowIntensity={0}
        lightingIntensity={0.1}
        initialPosition={{ x: 550, y: 510 }}
      />
      <StickerPeel
        imageSrc="/stickers/sticker2.png"
        width={140}
        rotate={30}
        peelBackHoverPct={20}
        peelBackActivePct={40}
        shadowIntensity={0}
        lightingIntensity={0.1}
        initialPosition={{ x: -550, y: 480 }}
      />
      <StickerPeel
        imageSrc="/stickers/sticker3.png"
        width={180}
        rotate={-20}
        peelBackHoverPct={10}
        peelBackActivePct={15}
        shadowIntensity={0}
        lightingIntensity={0.1}
        initialPosition={{ x: 600, y: 210 }}
      />
      <StickerPeel
        imageSrc="/stickers/sticker4.png"
        width={100}
        rotate={30}
        peelBackHoverPct={20}
        peelBackActivePct={40}
        shadowIntensity={0}
        lightingIntensity={0.1}
        initialPosition={{ x: -280, y: 420 }}
      />
      <StickerPeel
        imageSrc="/stickers/sticker5.png"
        width={100}
        rotate={30}
        peelBackHoverPct={20}
        peelBackActivePct={40}
        shadowIntensity={0}
        lightingIntensity={0.1}
        initialPosition={{ x: -620, y: 60 }}
      />
      <StickerPeel
        imageSrc="/stickers/sticker6.png"
        width={120}
        rotate={0}
        peelBackHoverPct={20}
        peelBackActivePct={40}
        shadowIntensity={0}
        lightingIntensity={0.1}
        initialPosition={{ x: 250, y: 455 }}
      />
      <StickerPeel
        imageSrc="/stickers/sticker7.png"
        width={80}
        rotate={-80}
        peelBackHoverPct={20}
        peelBackActivePct={30}
        shadowIntensity={0}
        lightingIntensity={0.1}
        initialPosition={{ x: 460, y: 60 }}
      />
      <StickerPeel
        imageSrc="/stickers/sticker8.png"
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
