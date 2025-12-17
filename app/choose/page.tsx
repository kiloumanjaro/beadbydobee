"use client";

import { useState } from "react";
import { ExpandableLogo } from "@/components/expandable-logo";
import AIChatbot from "@/components/ai-chatbot";
import PopularContent from "@/components/popular-content";
import ProductsContent from "@/components/products-content";

export default function Home() {
  const [currentView, setCurrentView] = useState<"popular" | "products">("popular");

  const handleAIDesignGenerated = (design: {
    beadSelections: { [key: number]: string };
    explanation: string;
  }) => {
    // Design generation handled within AIChatbot component
  };

  const handleViewProducts = () => {
    setCurrentView("products");
  };

  const handleBackToPopular = () => {
    setCurrentView("popular");
  };

  return (
    <main className={`min-h-screen bg-[#f5f5f5] ${
      currentView === "popular" 
        ? "flex items-center justify-center p-8" 
        : "p-8 pt-24"
    }`}>
      <header className="absolute top-0 w-full h-[100px] flex items-center justify-center">
        <ExpandableLogo isHome={false} />
      </header>

      {currentView === "popular" ? (
        <PopularContent onViewProducts={handleViewProducts} />
      ) : (
        <ProductsContent onBack={handleBackToPopular} />
      )}

      {/* AI Chatbot */}
      <AIChatbot braceletSize={5} onDesignGenerated={handleAIDesignGenerated} />
    </main>
  );
}
