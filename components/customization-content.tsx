"use client";

import { useState, useEffect } from "react";
import { Settings, Code, Upload, Ruler } from "lucide-react";
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
        return <Ruler className="w-4 h-4 text-gray-600" />;
      case "generate":
        return <Code className="w-4 h-4 text-gray-600" />;
      case "import":
        return <Upload className="w-4 h-4 text-gray-600" />;
      default:
        return <Settings className="w-4 h-4 text-gray-600" />;
    }
  };

  const renderOptionContent = () => {
    switch (activeOption) {
      case "size":
        return (
          <div className="flex gap-2 ">
            {SIZE_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => onSizeChange(option.id)}
                className={`px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                  selectedSize === option.id
                    ? "bg-[#8AB5D5] text-white shadow-sm"
                    : "text-[#323232] hover:bg-gray-50"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <span>{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        );

      case "generate":
        return (
          <div className="flex-row w-full bg-white">
            <div className="flex flex-row items-center gap-3">
              {/* Input field */}
              <div className="relative flex-1 overflow-hidden">
                <input
                  type="text"
                  value={codeContent}
                  readOnly
                  className="w-full px-3 py-2 text-sm border border-gray-300 bg-gray-100 rounded-lg whitespace-nowrap font-mono overflow-hidden disabled:cursor-not-allowed focus:outline-none focus:ring-0"
                />
              </div>

              {/* Reset button */}
              <Button
                onClick={() => {
                  setCodeContent("");
                  setCopiedCode(false);
                }}
                variant="destructive" // red button from shadcn/ui
                size="sm"
                disabled={!codeContent} // disable if there's no text
              >
                Reset
              </Button>

              {/* Copy or Generate */}
              {codeVisbility && codeContent ? (
                <Button
                  onClick={onCopyCode}
                  variant="secondary"
                  size="sm"
                  disabled={copiedCode}
                >
                  {copiedCode ? "Copied" : "Copy"}
                </Button>
              ) : (
                <Button
                  onClick={onGenerateCode}
                  disabled={Object.keys(braceletDesign).length === 0}
                  variant="default"
                  size="default"
                >
                  Generate Code
                </Button>
              )}
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
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8AB5D5]"
            />
            <button
              onClick={onImportCode}
              className="px-4 py-2 bg-[#8AB5D5] hover:bg-[#7AA4C4] text-white text-sm font-medium rounded-lg transition-colors"
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
    <div className="relative flex flex-row bg-white w-md gap-3 h-14 items-center px-3 rounded-xl">
      {/* Main dropdown button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-[#8AB5D5] transition-colors"
      >
        {getActiveIcon()}
      </button>
      <div>{renderOptionContent()}</div>
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
