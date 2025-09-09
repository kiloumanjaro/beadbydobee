"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExpandableLogo } from "@/components/expandable-logo";
import BeadsEditor from "@/components/beads-editor";
import { usePathname } from "next/navigation";

export default function Customize() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const router = useRouter();
  const [beadSelections, setBeadSelections] = useState<{
    [key: number]: string;
  }>({});

  const handleBeadSelectionChange = (selections: { [key: number]: string }) => {
    setBeadSelections(selections);
  };

  const isAllSlotsFilled = () => {
    const totalSlots = 20;
    return Object.keys(beadSelections).length === totalSlots;
  };

  const getEmptySlots = () => {
    const totalSlots = 20;
    const filledSlots = Object.keys(beadSelections).map(Number);
    const emptySlots = [];
    for (let i = 0; i < totalSlots; i++) {
      if (!filledSlots.includes(i)) {
        emptySlots.push(i + 1); // Convert to 1-based indexing for display
      }
    }
    return emptySlots;
  };

  const handleCreate = () => {
    if (!isAllSlotsFilled()) {
      return;
    }
    // Save bead selections to localStorage
    localStorage.setItem(
      "braceletDesign",
      JSON.stringify({
        beadSelections,
        length: 20,
        createdAt: new Date().toISOString(),
      })
    );

    // Navigate to confirm page
    router.push("/confirm");
  };

  return (
    <div className="flex flex-col h-screen pb-28 bg-[#EFEFEF]">
      <div className="flex h-[100px]">
        <header className="flex flex-1 items-center justify-center">
          <ExpandableLogo isHome={isHome} />
        </header>
      </div>

      <main className="flex flex-1 flex-col gap-7 items-center justify-center">
        <p className="w-72 text-center text-[#323232]">
          Click and choose the beads of your choice to complete your bracelet
        </p>
        <BeadsEditor
          length={20}
          onSelectionChange={handleBeadSelectionChange}
        />

        <div className="flex flex-col items-center gap-2">
          <div className="text-sm text-[#323232]">
            {Object.keys(beadSelections).length} of 20 beads selected
          </div>
          {!isAllSlotsFilled() && (
            <div className="text-xs text-red-600 text-center max-w-xs">
              Please fill all bead positions before creating your bracelet
              {getEmptySlots().length <= 5 && (
                <div className="mt-1">
                  Missing positions: {getEmptySlots().join(", ")}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className={`rounded-lg flex items-center justify-center font-semibold text-sm h-10 px-10 transition-colors duration-200 ${
              isAllSlotsFilled()
                ? "bg-[#8AB5D5] hover:bg-[#383838] text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleCreate}
            disabled={!isAllSlotsFilled()}
          >
            Create
          </button>
        </div>
      </main>
    </div>
  );
}
