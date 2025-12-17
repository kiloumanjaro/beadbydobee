"use client";
import { useState, useEffect } from "react";
import ModelViewer from "./ModelViewer";
import StickerPeel from "./StickerPeel/StickerPeel";

export default function KeychainContent() {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const [viewportSize, setViewportSize] = useState({
    width: 1920,
    height: 1080,
  });

  useEffect(() => {
    const handleResize = () => {
      // Update viewport size
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Update screen size breakpoint
      if (window.innerWidth < 640) {
        setScreenSize("mobile");
      } else if (window.innerWidth < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define sticker configs for each breakpoint (visibility + positioning)
  const positionConfigs = {
    mobile: {
      visible: ["sticker2", "sticker5", "sticker4", "sticker1"],
      positions: {
        sticker1: { xPercent: -48, yPercent: -4.89 }, // Blue Ball
        sticker5: { xPercent: 46.58, yPercent: 22.89 }, //Star
        sticker2: { xPercent: 32.96, yPercent: 84.56 }, // Letter A
        sticker4: { xPercent: -46.29, yPercent: 64.56 }, // Heart
      },
    },
    tablet: {
      visible: [
        "sticker1",
        "sticker2",
        "sticker3",
        "sticker4",
        "sticker5",
        "sticker6",
        "sticker7",
        "sticker8",
      ],
      positions: {
        sticker1: { xPercent: 28.65, yPercent: 47.22 }, // Blue Ball
        sticker2: { xPercent: -34.65, yPercent: 80.44 }, // Letter A
        sticker3: { xPercent: 31.25, yPercent: 19.44 }, // Big Heart
        sticker4: { xPercent: -2.58, yPercent: 65.89 }, // Heart
        sticker5: { xPercent: -32.29, yPercent: 8.56 }, // Star
        sticker6: { xPercent: 13.02, yPercent: 42.13 }, // Letter B
        sticker7: { xPercent: 23.96, yPercent: 5.56 }, // Pearl
        sticker8: { xPercent: -22.92, yPercent: 22.44 }, // Big Star
      },
    },
    desktop: {
      visible: [
        "sticker1",
        "sticker2",
        "sticker3",
        "sticker4",
        "sticker5",
        "sticker6",
        "sticker7",
        "sticker8",
      ],
      positions: {
        sticker1: { xPercent: 39.65, yPercent: 75.22 }, // Blue Ball
        sticker2: { xPercent: -36.65, yPercent: 68.44 }, // Letter A
        sticker3: { xPercent: 36.25, yPercent: 28.44 }, // Big Heart
        sticker4: { xPercent: -17.58, yPercent: 55.89 }, // Heart
        sticker5: { xPercent: -40.29, yPercent: 5.56 }, // Star
        sticker6: { xPercent: 18.02, yPercent: 60.13 }, // Letter B
        sticker7: { xPercent: 22.96, yPercent: 5.56 }, // Pearl
        sticker8: { xPercent: -27.92, yPercent: 19.44 }, // Big Star
      },
    },
  };

  const currentConfig = positionConfigs[screenSize];
  const containerSize = viewportSize;
  const visibleStickers = currentConfig.visible;

  // Helper to convert percent to pixels
  const toPixels = (xPercent: number, yPercent: number) => ({
    x: (containerSize.width * xPercent) / 100,
    y: (containerSize.height * yPercent) / 100,
  });

  // Helper to get sticker position safely
  const getStickerPosition = (stickerKey: string) => {
    const positions = currentConfig.positions as Record<
      string,
      { xPercent: number; yPercent: number }
    >;
    return positions[stickerKey] || { xPercent: 0, yPercent: 0 };
  };

  return (
    <div className="flex flex-col gap-5  w-screen h-screen items-center">
      <div className="flex w-full h-full justify-center items-center ">
        <ModelViewer
          width={600}
          height={520}
          url="/models/keychain.glb"
          defaultRotationX={0}
          defaultRotationY={0}
          autoRotate
          showScreenshotButton={false}
          enableManualZoom={false}
          autoFrame
        />
      </div>

      {/* Sticker 1 */}
      {visibleStickers.includes("sticker1") && (
        <StickerPeel
          imageSrc="/stickers/sticker1.png"
          width={120}
          rotate={30}
          peelBackHoverPct={20}
          peelBackActivePct={40}
          shadowIntensity={0}
          lightingIntensity={0.1}
          initialPosition={(() => {
            const pos = getStickerPosition("sticker1");
            return toPixels(pos.xPercent, pos.yPercent);
          })()}
        />
      )}

      {/* Sticker 2 */}
      {visibleStickers.includes("sticker2") && (
        <StickerPeel
          imageSrc="/stickers/sticker2.png"
          width={140}
          rotate={30}
          peelBackHoverPct={20}
          peelBackActivePct={40}
          shadowIntensity={0}
          lightingIntensity={0.1}
          initialPosition={(() => {
            const pos = getStickerPosition("sticker2");
            return toPixels(pos.xPercent, pos.yPercent);
          })()}
        />
      )}

      {/* Sticker 3 */}
      {visibleStickers.includes("sticker3") && (
        <StickerPeel
          imageSrc="/stickers/sticker3.png"
          width={180}
          rotate={-20}
          peelBackHoverPct={10}
          peelBackActivePct={15}
          shadowIntensity={0}
          lightingIntensity={0.1}
          initialPosition={(() => {
            const pos = getStickerPosition("sticker3");
            return toPixels(pos.xPercent, pos.yPercent);
          })()}
        />
      )}

      {/* Sticker 4 */}
      {visibleStickers.includes("sticker4") && (
        <StickerPeel
          imageSrc="/stickers/sticker4.png"
          width={100}
          rotate={30}
          peelBackHoverPct={20}
          peelBackActivePct={40}
          shadowIntensity={0}
          lightingIntensity={0.1}
          initialPosition={(() => {
            const pos = getStickerPosition("sticker4");
            return toPixels(pos.xPercent, pos.yPercent);
          })()}
        />
      )}

      {/* Sticker 5 */}
      {visibleStickers.includes("sticker5") && (
        <StickerPeel
          imageSrc="/stickers/sticker5.png"
          width={100}
          rotate={30}
          peelBackHoverPct={20}
          peelBackActivePct={40}
          shadowIntensity={0}
          lightingIntensity={0.1}
          initialPosition={(() => {
            const pos = getStickerPosition("sticker5");
            return toPixels(pos.xPercent, pos.yPercent);
          })()}
        />
      )}

      {/* Sticker 6 */}
      {visibleStickers.includes("sticker6") && (
        <StickerPeel
          imageSrc="/stickers/sticker6.png"
          width={120}
          rotate={0}
          peelBackHoverPct={20}
          peelBackActivePct={40}
          shadowIntensity={0}
          lightingIntensity={0.1}
          initialPosition={(() => {
            const pos = getStickerPosition("sticker6");
            return toPixels(pos.xPercent, pos.yPercent);
          })()}
        />
      )}

      {/* Sticker 7 */}
      {visibleStickers.includes("sticker7") && (
        <StickerPeel
          imageSrc="/stickers/sticker7.png"
          width={80}
          rotate={-80}
          peelBackHoverPct={20}
          peelBackActivePct={30}
          shadowIntensity={0}
          lightingIntensity={0.1}
          initialPosition={(() => {
            const pos = getStickerPosition("sticker7");
            return toPixels(pos.xPercent, pos.yPercent);
          })()}
        />
      )}

      {/* Sticker 8 */}
      {visibleStickers.includes("sticker8") && (
        <StickerPeel
          imageSrc="/stickers/sticker8.png"
          width={200}
          rotate={-80}
          peelBackHoverPct={20}
          peelBackActivePct={30}
          shadowIntensity={0}
          lightingIntensity={0.1}
          initialPosition={(() => {
            const pos = getStickerPosition("sticker8");
            return toPixels(pos.xPercent, pos.yPercent);
          })()}
        />
      )}
    </div>
  );
}
