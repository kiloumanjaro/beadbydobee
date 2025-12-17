"use client";

import Stack from "@/components/image-stack";
import { Button } from "@/components/ui/button";

interface PopularContentProps {
  onViewProducts: () => void;
}

export default function PopularContent({ onViewProducts }: PopularContentProps) {
  const images = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
    },
  ];

  return (
    <div className="flex flex-col items-center max-w-2xl">
      {/* Card Stack */}
      <div className="mb-12">
        <Stack
          randomRotation={false}
          sensitivity={180}
          sendToBackOnClick={false}
          cardDimensions={{ width: 200, height: 200 }}
          cardsData={images}
        />
      </div>

      {/* Product Description */}
      <div className="flex flex-col items-center gap-3">
        <span className="text-2xl font-bold text-[#323232] text-center flex items-center gap-3">
          dobee does it all
          <img src="/bee.png" alt="bee" className="w-6 h-6 inline-block" />
        </span>
        <p className="text-center w-md text-base text-[#9ca3af] leading-relaxed ">
          Your style, your way. Check out the personalized bracelets and
          keychains we've made for our customers!
        </p>
      </div>

      <div className="mt-10">
        <Button variant="default" size="lg" onClick={onViewProducts}>
          View
        </Button>
      </div>
    </div>
  );
}