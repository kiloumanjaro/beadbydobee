"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import BeadsEditor from "@/components/beads-editor";
import CustomizationOptions, {
  SIZE_OPTIONS,
} from "@/components/customization-options";
import {
  encodeDesign,
  decodeDesign,
  type BraceletDesign,
} from "@/lib/converter";
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

  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [importCode, setImportCode] = useState<string>("");
  const showGeneratedCode = Boolean(generatedCode);
  const [importError, setImportError] = useState<string>("");
  const [copied, setCopied] = useState(false);
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

      // Keep existing selections that fit in the new size
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

  const handleGenerateCode = () => {
    const design: BraceletDesign = {
      beadSelections,
      length: slots,
      createdAt: new Date().toISOString(),
    };
    const code = encodeDesign(design);
    setGeneratedCode(code);
  };

  const handleImportCode = () => {
    if (!importCode.trim()) {
      setImportError("Please enter a design code");
      return;
    }

    try {
      const decoded = decodeDesign(importCode.trim());
      if (!decoded) {
        setImportError(
          "The design code you entered is invalid. Please check the code and try again."
        );
        return;
      }

      // Update the design
      setBeadSelections(decoded.beadSelections);

      // Update size based on length
      const sizeOption = SIZE_OPTIONS.find(
        (option) => option.beads === decoded.length
      );
      if (sizeOption) {
        setSelectedSize(sizeOption.id);
      }

      // Clear states
      setImportCode("");
      setImportError("");
      setGeneratedCode("");
    } catch (error) {
      console.error("Error decoding design:", error);
      setImportError(
        "The design code you entered is invalid. Please check the code and try again."
      );
      return;
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy code:", error);
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
    // Save bead selections to localStorage
    localStorage.setItem(
      "braceletDesign",
      JSON.stringify({
        beadSelections,
        length: slots,
        size: selectedSize, // Save the selected size
        createdAt: new Date().toISOString(),
      })
    );

    // Save bead selections to localStorage
    localStorage.setItem(
      "braceletDesign",
      JSON.stringify({
        beadSelections,
        length: slots,
        size: selectedSize, // Save the selected size
        createdAt: new Date().toISOString(),
      })
    );

    // Navigate to confirm page
    router.push("/confirm");
  };

  return (
    <div className="flex flex-col h-screen bg-[#EFEFEF]">
      <header className="absolute w-full h-[100px] flex items-center justify-center">
        <CustomizationOptions
          selectedSize={selectedSize}
          codeVisibility={showGeneratedCode}
          codeContent={generatedCode}
          setCodeContent={setGeneratedCode}
          braceletDesign={beadSelections}
          onSizeChange={handleSizeChange}
          onGenerateCode={handleGenerateCode}
          onImportCode={handleImportCode}
          onCopyCode={handleCopyCode}
          importCode={importCode}
          importError={importError}
          setImportCode={setImportCode}
          copiedCode={copied}
          setCopiedCode={setCopied}
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
