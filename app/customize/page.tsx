"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import BeadsEditor from "@/components/beads-editor";
import CustomizationOptions, {
  SIZE_OPTIONS,
} from "@/components/customization-options";
import { decodeDesign, type BraceletDesign } from "@/lib/converter";
import WarningPopup from "@/components/warning-popup";

export default function Customize() {
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<
    "small" | "medium" | "large" | "xl" | "2x"
  >("medium");

  const slots =
    SIZE_OPTIONS.find((option) => option.id === selectedSize)?.beads || 5;

  const [beadSelections, setBeadSelections] = useState<{
    [key: number]: string;
  }>({});

  const [importCode, setImportCode] = useState<string>("");
  const [importError, setImportError] = useState<string>("");

  const isWarningVisible = Boolean(importError);

  useEffect(() => {
    const savedDesign = localStorage.getItem("braceletDesign");
    if (savedDesign) {
      try {
        const design = JSON.parse(savedDesign);
        if (design.beadSelections) {
          setBeadSelections(design.beadSelections);
        }
        if (design.size) {
          setSelectedSize(design.size);
        }
      } catch (error) {
        console.error("Error parsing saved design:", error);
        // Clear invalid data
        localStorage.removeItem("braceletDesign");
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(beadSelections).length > 0 || selectedSize !== "medium") {
      const design: BraceletDesign = {
        beadSelections,
        length: slots,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "braceletDesign",

        JSON.stringify({
          ...design,
          size: selectedSize,
        })
      );
    }
  }, [beadSelections, selectedSize, slots]);

  const handleSizeChange = (
    size: "small" | "medium" | "large" | "xl" | "2x"
  ) => {
    const newSlots =
      SIZE_OPTIONS.find((option) => option.id === size)?.beads || 5;

    setBeadSelections((prevSelections) => {
      const newSelections: { [key: number]: string } = {};
      Object.entries(prevSelections).forEach(([slotIndex, color]) => {
        const index = Number.parseInt(slotIndex);
        if (index < newSlots) {
          newSelections[index] = color;
        }
      });

      return newSelections;
    });

    setSelectedSize(size);
  };

  const handleBeadSelectionChange = (selections: { [key: number]: string }) => {
    setBeadSelections(selections);
  };

  const handleImportCode = () => {
    if (!importCode.trim()) {
      setImportError("Please enter a design code");
      return;
    }

    try {
      const decoded = decodeDesign(importCode.trim());
      if (
        !decoded ||
        typeof decoded !== "object" ||
        !decoded.beadSelections ||
        typeof decoded.length !== "number"
      ) {
        setImportError(
          "The design code you entered is invalid. Please check the code and try again."
        );
        return;
      }
      setBeadSelections(decoded.beadSelections);

      const sizeOption = SIZE_OPTIONS.find(
        (option) => option.beads === decoded.length
      );
      if (sizeOption) {
        setSelectedSize(sizeOption.id);
      }
      setImportCode("");
      setImportError("");
    } catch (error) {
      console.error("Error decoding design:", error);
      setImportError(
        "The design code you entered is invalid. Please check the code and try again."
      );
      return;
    }
  };

  const isAllSlotsFilled = () => {
    const totalSlots = slots;
    return Object.keys(beadSelections).length === totalSlots;
  };

  const handleCreate = () => {
    if (!isAllSlotsFilled()) {
      return;
    }

    localStorage.setItem(
      "braceletDesign",
      JSON.stringify({
        beadSelections,
        length: slots,
        size: selectedSize,
        createdAt: new Date().toISOString(),
      })
    );

    router.push("/confirm");
  };

  return (
    <div className="font-sans flex flex-col h-[100dvh] overflow-hidden bg-[#EFEFEF]">
      <header className="absolute w-full h-[100px] flex items-center justify-center">
        <CustomizationOptions
          selectedSize={selectedSize}
          braceletDesign={beadSelections}
          onSizeChange={handleSizeChange}
          onImportCode={handleImportCode}
          importCode={importCode}
          importError={importError}
          setImportCode={setImportCode}
          beadSlots={slots}
        />
      </header>

      <main className="flex flex-1 flex-col gap-15 items-center justify-center ">
        <p className="w-72 text-center text-[#323232]">
          Click and choose the beads of your choice to complete your bracelet
        </p>

        <BeadsEditor
          length={slots}
          onSelectionChange={handleBeadSelectionChange}
          initialSelections={beadSelections}
        />

        <div className="relative flex flex-col justify-center items-center w-sm">
          <Button
            onClick={handleCreate}
            disabled={!isAllSlotsFilled()}
            variant={isAllSlotsFilled() ? "default" : "secondary"}
            size="lg"
          >
            Create
          </Button>

          {!isAllSlotsFilled() && (
            <div className="absolute top-full mt-5 text-xs text-[#e0505a] text-center max-w-sm">
              Please fill the {slots - Object.keys(beadSelections).length}{" "}
              remaining beads before creating your bracelet
            </div>
          )}
        </div>

        <WarningPopup
          isVisible={isWarningVisible}
          message={
            importError ||
            "The design code you entered is invalid. Please check the code and try again."
          }
          onClose={() => {
            setImportError("");
          }}
        />
      </main>
    </div>
  );
}
