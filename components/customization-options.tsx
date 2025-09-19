"use client";

import { useState } from "react";
import {
  ChevronDown,
  RotateCcw,
  Settings,
  Code,
  Upload,
  Ruler,
} from "lucide-react";
import { Button } from "./ui/button";
import { encodeDesign, type BraceletDesign } from "@/lib/converter";

interface CustomizationOptionsProps {
  selectedSize: "small" | "medium" | "large" | "xl" | "2x";
  braceletDesign: { [key: number]: string };
  onSizeChange: (size: "small" | "medium" | "large" | "xl" | "2x") => void;
  onImportCode: () => void;
  importCode: string;
  importError: string;
  setImportCode: (val: string) => void;
  beadSlots: 5 | 10 | 15 | 20 | 30;
}

const SIZE_OPTIONS = [
  { id: "small", label: "S", beads: 5 },
  { id: "medium", label: "M", beads: 10 },
  { id: "large", label: "L", beads: 15 },
  { id: "xl", label: "XL", beads: 20 },
  { id: "2x", label: "2X", beads: 30 },
] as const;

export default function CustomizationOptions({
  selectedSize,
  braceletDesign,
  onSizeChange,
  onImportCode,
  importCode,
  setImportCode,
  beadSlots,
}: CustomizationOptionsProps) {
  // useEffect(() => {
  //   localStorage.clear();
  // }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [activeOption, setActiveOption] = useState<
    "size" | "generate" | "import"
  >("size");

  const getActiveIcon = () => {
    switch (activeOption) {
      case "size":
        return <Ruler className="w-4.5 h-4.5 text-gray-600" />;
      case "generate":
        return <Code className="w-4.5 h-4.5 text-gray-600" />;
      case "import":
        return <Upload className="w-4.5 h-4.5 text-gray-600" />;
      default:
        return <Settings className="w-4.5 h-4.5 text-gray-600" />;
    }
  };

  const [generatedCode, setGeneratedCode] = useState<string>("");
  const showGeneratedCode = Boolean(generatedCode);
  const [copied, setCopied] = useState(false);

  const handleGenerateCode = () => {
    const design: BraceletDesign = {
      beadSelections: braceletDesign,
      length: beadSlots,
      createdAt: new Date().toISOString(),
    };
    const code = encodeDesign(design);
    setGeneratedCode(code);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  const renderOptionContent = () => {
    switch (activeOption) {
      case "size":
        const selectedBeads =
          SIZE_OPTIONS.find((option) => option.id === selectedSize)?.beads ?? 0;
        return (
          <div className="flex gap-2 items-center">
            {/* Input field */}
            <input
              type="text"
              placeholder={`${selectedBeads} beads`}
              value={`${selectedBeads} beads`}
              readOnly
              className="w-full text-center text-[#727272] px-3 py-2 text-sm border border-gray-300 bg-gray-100 rounded-sm whitespace-nowrap  overflow-hidden focus:outline-none"
            />

            {/* Size Options */}
            <div className="flex h-9 gap-1">
              {SIZE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => onSizeChange(option.id)}
                  className={`w-11 h-full rounded-sm text-sm transition-all duration-200 ${
                    selectedSize === option.id
                      ? "bg-gradient-to-b from-[#8AB5D5] to-[#6EA6BF] text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-200 hover:text-gray-800"
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span>{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case "generate":
        return (
          <div className="flex flex-row items-center w-full gap-2">
            {/* Input field */}
            <div className="relative flex-1 overflow-hidden">
              <input
                type="text"
                placeholder="Generate design code"
                value={generatedCode}
                readOnly
                className="w-full px-3 py-2 text-sm text-[#727272] border border-gray-300 bg-gray-100 rounded-sm whitespace-nowrap  overflow-hidden focus:outline-none"
              />
            </div>

            {/* Copy or Generate */}
            {showGeneratedCode && generatedCode ? (
              <Button
                onClick={handleCopyCode}
                variant={!copied ? "default" : "secondary"}
                size="full"
                disabled={copied}
              >
                {copied ? "Copied" : "Copy"}
              </Button>
            ) : (
              <Button
                onClick={handleGenerateCode}
                disabled={Object.keys(braceletDesign).length === 0}
                variant="default"
                size="full"
              >
                Generate
              </Button>
            )}
            {/* Reset button */}
            <Button
              onClick={() => {
                setGeneratedCode("");
                setCopied(false);
              }}
              variant={generatedCode ? "destructive" : "secondary"}
              size="icon"
              disabled={!generatedCode}
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        );

      case "import":
        return (
          <div className="flex gap-2 w-full">
            {/* Input field */}
            <input
              type="text"
              placeholder="Paste design code here..."
              value={importCode}
              onChange={(e) => {
                setImportCode(e.target.value);
              }}
              className="flex-1 px-3 py-2 text-sm text-[#727272] border border-gray-300 bg-gray-100 rounded-sm focus:outline-none focus:border-[#8AB5D5]"
            />

            {/* Import Button */}
            <Button
              onClick={onImportCode}
              disabled={!importCode.trim()} // disable only if empty or whitespace
              variant={!importCode.trim() ? "secondary" : "default"}
              size="full"
            >
              Import
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative flex flex-row bg-gradient-to-b from-[#ffffff] to-[#f3f3f3] w-md gap-2 h-13 items-center px-3 rounded-sm shadow-sm">
      {/* Main dropdown button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex gap-3 px-3 h-9 items-center rounded-sm rounded-b-none transition-colors ${
          isOpen
            ? "bg-[#efefef] border border-[#eae9e5]"
            : "bg-transparent border border-transparent hover:bg-gray-100"
        }`}
      >
        {getActiveIcon()}
        <ChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div className="flex-1">{renderOptionContent()}</div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-11 left-3 w-18 bg-[#f3f3f3] border border-t-0 border-b-gray-200 rounded-b-sm ">
          <div className="p-2">
            <button
              onClick={() => {
                setActiveOption("size");
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center gap-3 p-3 text-left hover:bg-white rounded-sm transition-colors"
            >
              <Ruler className="w-4.5 h-4.5 text-gray-600" />
            </button>

            <button
              onClick={() => {
                setActiveOption("generate");
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center gap-3 p-3 text-left hover:bg-white rounded-sm transition-colors"
            >
              <Code className="w-4.5 h-4.5 text-gray-600" />
            </button>

            <button
              onClick={() => {
                setActiveOption("import");
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center gap-3 p-3 text-left hover:bg-white rounded-sm transition-colors"
            >
              <Upload className="w-4.5 h-4.5 text-gray-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export { SIZE_OPTIONS };
