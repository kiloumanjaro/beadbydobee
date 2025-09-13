"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  RotateCcw,
  Settings,
  Code,
  Upload,
  Ruler,
} from "lucide-react";
import { Button } from "./ui/button";

interface CustomizationOptionsProps {
  selectedSize: "small" | "medium" | "large" | "xl";
  codeVisbility: boolean;
  codeContent: string;
  setCodeContent: (val: string) => void;
  braceletDesign: { [key: number]: string };
  onSizeChange: (size: "small" | "medium" | "large" | "xl") => void;
  onGenerateCode: () => void;
  onImportCode: () => void;
  onCopyCode: () => void;
  importCode: string;
  importError: string;
  setImportCode: (val: string) => void;
  copiedCode: boolean;
  setCopiedCode: (val: boolean) => void;
}

const SIZE_OPTIONS = [
  { id: "small", label: "S", beads: 5 },
  { id: "medium", label: "M", beads: 10 },
  { id: "large", label: "L", beads: 15 },
  { id: "xl", label: "XL", beads: 20 },
] as const;

export default function CustomizationOptions({
  selectedSize,
  codeVisbility,
  codeContent,
  setCodeContent,
  braceletDesign,
  onSizeChange,
  onGenerateCode,
  onImportCode,
  onCopyCode,
  importCode,
  importError,
  setImportCode,
  copiedCode,
  setCopiedCode,
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

  const renderOptionContent = () => {
    switch (activeOption) {
      case "size":
        return (
          <div className="flex gap-1">
            {SIZE_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => onSizeChange(option.id)}
                className={`w-11 py-2 rounded-sm text-sm font-medium transition-all duration-200 ${
                  selectedSize === option.id
                    ? "bg-gradient-to-b from-[#8AB5D5] to-[#6EA6BF] text-white shadow-sm text-shadow-sm"
                    : "text-[#727272] hover:bg-gray-50"
                }`}
              >
                <div className="flex flex-col items-center gap-1 ">
                  <span>{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        );

      case "generate":
        return (
          <div className="flex flex-row items-center w-full bg-white">
            <div className="flex flex-row items-center gap-3">
              {/* Input field */}
              <div className="relative flex-1 overflow-hidden">
                <input
                  type="text"
                  value={codeContent}
                  readOnly
                  className="w-full px-3 h-9 text-sm border border-gray-300 bg-gray-100 rounded-sm whitespace-nowrap font-mono overflow-hidden disabled:cursor-not-allowed focus:outline-none focus:ring-0"
                />
              </div>
              <div className="flex flex-row items-center gap-1.5">
                {/* Copy or Generate */}
                {codeVisbility && codeContent ? (
                  <Button
                    onClick={onCopyCode}
                    variant={!copiedCode ? "default" : "secondary"}
                    size="full"
                    disabled={copiedCode}
                  >
                    {copiedCode ? "Copied" : "Copy"}
                  </Button>
                ) : (
                  <Button
                    onClick={onGenerateCode}
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
                    setCodeContent("");
                    setCopiedCode(false);
                  }}
                  variant={codeContent ? "destructive" : "secondary"}
                  size="icon"
                  disabled={!codeContent}
                >
                  <RotateCcw className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        );

      case "import":
        return (
          <div className="flex gap-2 w-full">
            <input
              type="text"
              placeholder="Paste design code here..."
              value={importCode}
              onChange={(e) => {
                setImportCode(e.target.value);
              }}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:border-[#8AB5D5]"
            />
            <button
              onClick={onImportCode}
              className="px-4 py-2 bg-gradient-to-b from-[#8AB5D5] to-[#6EA6BF] hover:bg-[#6d97b6] text-white text-shadow-sm text-sm font-medium rounded-md transition-colors"
            >
              Import
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative flex flex-row bg-gradient-to-b from-[#ffffff] to-[#f3f3f3] w-base gap-4 h-13 items-center px-3 rounded-md shadow-sm">
      {/* Main dropdown button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-3 pl-3 py-2 items-center"
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
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-2">
            <button
              onClick={() => setActiveOption("size")}
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Ruler className="w-4 h-4 text-gray-600" />
              <div className="text-sm font-medium text-gray-800">Sizes</div>
            </button>

            <button
              onClick={() => setActiveOption("generate")}
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Code className="w-4 h-4 text-gray-600" />
              <div className="text-sm font-medium text-gray-800">
                Generate Code
              </div>
            </button>

            <button
              onClick={() => setActiveOption("import")}
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Upload className="w-4 h-4 text-gray-600" />
              <div className="text-sm font-medium text-gray-800">Impors</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export { SIZE_OPTIONS };
