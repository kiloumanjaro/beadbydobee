"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import BeadsEditor from "@/components/beads-editor";
import CustomizationOptions, {
  SIZE_OPTIONS,
} from "@/components/customization-options";
import { encodeDesign, decodeDesign } from "@/lib/converter";
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
  const [showGeneratedCode, setShowGeneratedCode] = useState<boolean>(false);
  const [importError, setImportError] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

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
    if (importError) {
      setShowWarning(true);
    }
  }, [importError]);

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
    const design = {
      beadSelections,
      length: slots,
      createdAt: new Date().toISOString(),
    };
    const code = encodeDesign(design);
    setGeneratedCode(code);
    setShowGeneratedCode(true);
  };

  const handleImportCode = () => {
    if (!importCode.trim()) {
      setImportError("Please enter a design code");
      return;
    }

    try {
      const decoded = decodeDesign(importCode.trim());

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
      setShowGeneratedCode(false);
    } catch (error) {
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

    // Navigate to confirm page
    router.push("/confirm");
  };

  return (
    <div className="flex flex-col h-screen pb-28 bg-[#EFEFEF]">
      <div className="flex h-[100px]">
        <header className="flex flex-1 items-center justify-center">
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
      </div>

      <main className="flex flex-1 flex-col gap-7 items-center justify-center bg-red-500">
        <p className="w-72 text-center text-[#323232]">
          Click and choose the beads of your choice to complete your bracelet
        </p>

        <BeadsEditor
          length={slots}
          onSelectionChange={handleBeadSelectionChange}
          initialSelections={beadSelections}
        />

        <div className="flex flex-col items-center gap-2 h-14">
          <div className="text-sm text-[#323232]">
            {Object.keys(beadSelections).length} of {slots} beads selected
          </div>
          {!isAllSlotsFilled() && (
            <div className="text-xs text-red-600 text-center max-w-xs">
              Please fill all bead positions before creating your bracelet
            </div>
          )}
        </div>

        <div className="flex gap-4 items-center flex-col">
          <Button
            onClick={handleCreate}
            disabled={!isAllSlotsFilled()}
            variant={isAllSlotsFilled() ? "default" : "secondary"}
            size="lg"
          >
            Create
          </Button>
        </div>
      </main>

      <WarningPopup
        isVisible={showWarning}
        message={
          importError ||
          "The design code you entered is invalid. Please check the code and try again."
        }
        onClose={() => {
          setShowWarning(false);
          setImportError("");
        }}
      />
    </div>
  );
}
