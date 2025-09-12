"use client";

interface SizeSelectorProps {
  selectedSize: "small" | "medium" | "large" | "xl";
  onSizeChange: (size: "small" | "medium" | "large" | "xl") => void;
}

const SIZE_OPTIONS = [
  { id: "small", label: "S", beads: 5 },
  { id: "medium", label: "M", beads: 10 },
  { id: "large", label: "L", beads: 15 },
  { id: "xl", label: "XL", beads: 20 },
] as const;

export default function SizeSelector({
  selectedSize,
  onSizeChange,
}: SizeSelectorProps) {
  return (
    <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
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
}

export { SIZE_OPTIONS };
