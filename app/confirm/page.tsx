"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ExpandableLogo } from "@/components/expandable-logo";
import BraceletPreview from "@/components/bracelet-preview";
import { usePathname } from "next/navigation";
import { encodeDesign } from "@/lib/converter";

interface BraceletDesign {
  beadSelections: { [key: number]: string };
  length: number;
  createdAt: string;
}

export default function Confirm() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const router = useRouter();
  const [braceletDesign, setBraceletDesign] = useState<BraceletDesign | null>(
    null
  );

  useEffect(() => {
    // Load bracelet design from localStorage
    const savedDesign = localStorage.getItem("braceletDesign");
    if (savedDesign) {
      try {
        const design = JSON.parse(savedDesign);
        setBraceletDesign(design);
      } catch (error) {
        console.error("Error parsing saved design:", error);
        router.push("/customize");
      }
    } else {
      // No saved design, redirect to customize
      router.push("/customize");
    }
  }, [router]);

  const handleBackToCustomize = () => {
    router.push("/customize");
  };

  const handleConfirmOrder = () => {
    if (braceletDesign) {
      const encoded = encodeDesign(braceletDesign);
      alert("Encoded design string:\n" + encoded);
    }
    localStorage.removeItem("braceletDesign");
    router.push("/customize");
  };

  if (!braceletDesign) {
    return (
      <div className="flex flex-col h-screen pb-28 bg-[#EFEFEF]">
        <div className="flex h-[100px]">
          <header className="flex flex-1 items-center justify-center">
            <ExpandableLogo isHome={isHome} />
          </header>
        </div>
        <main className="flex flex-1 items-center justify-center">
          <p className="text-[#323232]">Loading your design...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen relative overflow-hidden pb-28 bg-[#EFEFEF]">
      <div className="flex h-[100px]">
        <header className="flex flex-1 items-center justify-center">
          <ExpandableLogo isHome={isHome} />
        </header>
      </div>

      <main className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 overflow-hidden">
        <BraceletPreview
          length={braceletDesign.length}
          radius={500}
          boxSize={100}
          beadSelections={braceletDesign.beadSelections}
          onCustomize={handleBackToCustomize}
          onConfirm={handleConfirmOrder}
        />
      </main>
    </div>
  );
}
