"use client";

import { Button } from "./ui/button";

interface WarningPopupProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

export default function WarningPopup({
  isVisible,
  message,
  onClose,
}: WarningPopupProps) {
  return (
    <div
      className={`fixed inset-0 bg-gray-800/20 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-gradient-to-b from-[#ffffff] to-[#f3f3f3] rounded-lg pb-5 pt-8 px-8 max-w-md mx-4 shadow-sm transform transition-all duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-lg font-semibold text-[#323232]">
            Invalid Design Code
          </h3>
        </div>

        <p className="text-[#727272] text-base mb-6">{message}</p>

        <div className="flex justify-end">
          <Button onClick={onClose} variant="default">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
