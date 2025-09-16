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

interface CustomizationOptionsProps {
  selectedSize: "small" | "medium" | "large" | "xl" | "2x";
  codeVisibility: boolean;
  codeContent: string;
  setCodeContent: (val: string) => void;
  braceletDesign: { [key: number]: string };
  onSizeChange: (size: "small" | "medium" | "large" | "xl" | "2x") => void;
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
  { id: "2x", label: "2X", beads: 30 },
] as const;

export default function CustomizationOptions({
  selectedSize,
  codeVisibility,
  codeContent,
  setCodeContent,
  braceletDesign,
  onSizeChange,
  onGenerateCode,
  onImportCode,
  onCopyCode,
  importCode,
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
                value={codeContent}
                readOnly
                className="w-full px-3 py-2 text-sm text-[#727272] border border-gray-300 bg-gray-100 rounded-sm whitespace-nowrap  overflow-hidden focus:outline-none"
              />
            </div>

            {/* Copy or Generate */}
            {codeVisibility && codeContent ? (
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
