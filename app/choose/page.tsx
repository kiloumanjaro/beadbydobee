import Stack from "@/components/image-stack";
import { Button } from "@/components/ui/button";

export default function Home() {
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
    <main className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-8">
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

        {/* Product Code Badge */}
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-[#e8eef5] text-[#8b9aab] text-sm font-mono tracking-wider rounded">
            HT-DHJ-GW-001
          </span>
        </div>

        {/* Product Description */}
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-3xl font-medium text-[#1a1a1a] text-balance">
            Engineered for unpredictable spring days,
          </h1>
          <p className="text-lg text-[#9ca3af] leading-relaxed text-pretty">
            this lightweight down jacket delivers just the right amount of
            warmth without overheating.
          </p>
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          className="bg-[#2a2a2a] hover:bg-[#1a1a1a] text-white px-8 py-6 text-base rounded-full"
        >
          View Collection
        </Button>
      </div>
    </main>
  );
}
