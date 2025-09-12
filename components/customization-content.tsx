"use client";

import { useState } from "react";
import { ChevronDown, Settings, Code, Upload, Ruler } from "lucide-react";

interface CustomizationOptionsProps {
  selectedSize: "small" | "medium" | "large" | "xl";
  codeVisbility: boolean;
  codeContent: string;
  braceletDesign: { [key: number]: string };
  onSizeChange: (size: "small" | "medium" | "large" | "xl") => void;
  onGenerateCode: () => void;
  onImportCode: () => void;
  onCopyCode: () => void;
  importCode: string;
  importError: string;
  setImportCode: (val: string) => void;
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
  braceletDesign,
  onSizeChange,
  onGenerateCode,
  onImportCode,
  onCopyCode,
  importCode,
  importError,
  setImportCode,
}: CustomizationOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [customSize, setCustomSize] = useState<string>("");

  const handleCustomSizeApply = () => {
    const size = Number.parseInt(customSize);
    if (size < 3 || size > 50) {
      return;
    }

    // Find closest predefined size or keep current
    let newSize: "small" | "medium" | "large" | "xl" = selectedSize;
    if (size <= 5) newSize = "small";
    else if (size <= 10) newSize = "medium";
    else if (size <= 15) newSize = "large";
    else newSize = "xl";

    onSizeChange(newSize);
    setCustomSize("");
    setActiveOption(null);
    setIsOpen(false);
  };

  const renderOptionContent = () => {
    switch (activeOption) {
      case "size":
        return (
          <div className="p-4 space-y-3">
            <h3 className="font-medium text-gray-800">Select Bracelet Size</h3>
            <div className="grid grid-cols-2 gap-2">
              {SIZE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onSizeChange(option.id);
                    setActiveOption(null);
                    setIsOpen(false);
                  }}
                  className={`p-3 text-sm rounded-lg border transition-colors ${
                    selectedSize === option.id
                      ? "bg-[#8AB5D5] text-white border-[#8AB5D5]"
                      : "bg-white text-gray-700 border-gray-200 hover:border-[#8AB5D5]"
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs opacity-75">{option.beads} beads</div>
                </button>
              ))}
            </div>
          </div>
        );

      case "generate":
        return (
          <div className="flex-row w-full bg-red-600">
            <div className="flex flex-row items-center gap-3">
              <button
                onClick={onGenerateCode}
                disabled={Object.keys(braceletDesign).length === 0}
                className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                  Object.keys(braceletDesign).length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                Generate Code
              </button>

              {codeVisbility && codeContent && (
                <div className="flex flex-row items-center gap-2 p-0 bg-white rounded-lg border w-96">
                  <div className="text-sm font-medium text-gray-700">Code </div>
                  <div className="relative flex-1 overflow-hidden text-ellipsis whitespace-nowrap ">
                    <div className="p-2 bg-gray-100 rounded text-sm font-mono text-center max-h-9">
                      {codeContent}
                    </div>
                    {/* Gradient overlay to blur/fade out overflowing text */}
                    <div className="pointer-events-none absolute top-0 right-0 h-full w-6 bg-gradient-to-l from-gray-100 to-transparent" />
                  </div>
                  <button
                    onClick={onCopyCode}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                  >
                    Copy
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case "import":
        return (
          <div className="p-4 space-y-3">
            <h3 className="font-medium text-gray-800">Import Design</h3>
            <div className="flex flex-col gap-3 w-80">
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
              {importError && (
                <div className="text-xs text-red-600 text-center">
                  {importError}
                </div>
              )}
            </div>
          </div>
        );

      case "custom":
        return (
          <div className="p-4 space-y-3">
            <h3 className="font-medium text-gray-800">Custom Size</h3>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Main dropdown button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-[#8AB5D5] transition-colors"
      >
        <Settings className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Options</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {activeOption ? (
            <div>
              <div className="flex items-center justify-between p-3 border-b border-gray-200">
                <button
                  onClick={() => setActiveOption(null)}
                  className="text-sm text-[#8AB5D5] hover:text-[#7AA4C4]"
                >
                  ← Back
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setActiveOption(null);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>
              {renderOptionContent()}
            </div>
          ) : (
            <div className="p-2">
              <button
                onClick={() => setActiveOption("size")}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Ruler className="w-4 h-4 text-gray-600" />
              </button>

              <button
                onClick={() => setActiveOption("generate")}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Code className="w-4 h-4 text-gray-600" />
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    Generate Code
                  </div>
                  <div className="text-xs text-gray-500">
                    Create shareable design code
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveOption("import")}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Upload className="w-4 h-4 text-gray-600" />
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    Impors
                  </div>
                  <div className="text-xs text-gray-500">
                    Load design from code
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveOption("custom")}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4 text-gray-600" />
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    Custom Size
                  </div>
                  <div className="text-xs text-gray-500">
                    Set custom number of beads
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { SIZE_OPTIONS };
