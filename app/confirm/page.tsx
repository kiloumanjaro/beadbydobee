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

      // Build JotForm link
      const jotformUrl = `https://form.jotform.com/252652123536049?productId=${encodeURIComponent(
        encoded
      )}`;

      // Clear localStorage so user starts fresh next time
      localStorage.removeItem("braceletDesign");

      // Open JotForm in a new tab
      window.open(jotformUrl, "_blank");
    }
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
    <div className="font-sans flex flex-col h-[100dvh] overflow-hidden bg-[#EFEFEF] overscroll-none">
      <header className="absolute w-full h-[100px] flex items-center justify-center">
        <ExpandableLogo isHome={isHome} />
      </header>

      <div className="flex-1 relative overflow-hidden">
        <main className="absolute bottom-10 left-1/2 -translate-x-1/2 translate-y-1/2 overflow-hidden">
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
    </div>
  );
}
