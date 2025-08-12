"use client";

import { useState } from "react";
import { ExpandableSocialCard } from "@/components/expandable-card";
import { TabNavigation } from "@/components/tab-navigation";

export default function Home() {
  const [activeTab, setActiveTab] = useState("keychains");
  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Us</h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to our handcrafted jewelry collection. We specialize in
              creating unique, high-quality bracelets and keychains that reflect
              your personal style. Each piece is carefully crafted with
              attention to detail and made to last.
            </p>
          </div>
        );
      case "bracelets":
        return (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Bracelets</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900">
                  Leather Bracelet
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Handcrafted genuine leather
                </p>
                <p className="text-lg font-bold text-gray-900 mt-2">$24.99</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900">Beaded Bracelet</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Natural stone beads
                </p>
                <p className="text-lg font-bold text-gray-900 mt-2">$19.99</p>
              </div>
            </div>
          </div>
        );
      case "keychains":
        return (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Keychains</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900">Metal Keychain</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Durable stainless steel
                </p>
                <p className="text-lg font-bold text-gray-900 mt-2">$12.99</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900">Wooden Keychain</h3>
                <p className="text-sm text-gray-600 mt-1">Engraved hardwood</p>
                <p className="text-lg font-bold text-gray-900 mt-2">$15.99</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="font-sans grid grid-rows-[50px_1fr] items-center justify-items-center p-8 pb-20 gap-18 h-screen bg-cover bg-bottom"
      style={{ backgroundImage: "url('/sky.jpg')" }}
    >
      <ExpandableSocialCard />
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="h-80 bg-red-600 px-10"> {renderContent()}</div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full flex items-center justify-center bg-white hover:bg-[#383838] text-[#545253] font-semibold text-sm h-10 px-10"
            href={"/customize"}
          >
            Create
          </a>
        </div>
      </main>
    </div>
  );
}
