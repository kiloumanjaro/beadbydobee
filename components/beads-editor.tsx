"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BeadsEditorProps {
  length: number;
  onSelectionChange?: (selections: { [key: number]: string }) => void;
}

// Sample bead images - you can replace these with your actual image URLs
const BEAD_IMAGES = [
  "/beads/bead1.png",
  "/beads/bead2.png",
  "/beads/bead3.png",
  "/beads/bead4.png",
  "/beads/bead5.png",
  "/placeholder-fs8gh.png",
  "/placeholder-8kspz.png",
  "/placeholder-ml7bv.png",
  "/placeholder-lwtyj.png",
  "/placeholder-29eb6.png",
  "/placeholder-3x8ky.png",
  "/placeholder-81j0q.png",
  "/placeholder-hyp5g.png",
  "/placeholder-bqzcp.png",
  "/placeholder-j6xuj.png",
  "/placeholder-tr51z.png",
  "/placeholder-4tzde.png",
  "/placeholder-b78f9.png",
  "/placeholder-6pnvc.png",
  "/placeholder-rnqmq.png",
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
];

export default function BeadsEditor({
  length,
  onSelectionChange,
}: BeadsEditorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number | null>(null);
  const [beadSelections, setBeadSelections] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(beadSelections);
    }
  }, [beadSelections, onSelectionChange]);

  useEffect(() => {
    if (!scrollRef.current || length === 0) return;

    // Calculate the middle index (for 11 boxes, middle is index 5 which is the 6th box)
    const middleIndex = Math.floor((length - 1) / 2);

    // Box width (128px) + gap (16px) = 144px per box
    const boxWidth = 128 + 16; // w-32 (128px) + gap-4 (16px)
    const containerWidth = scrollRef.current.clientWidth;

    // Calculate scroll position to center the middle box
    const scrollPosition =
      middleIndex * boxWidth - containerWidth / 2 + boxWidth / 2;

    scrollRef.current.scrollLeft = Math.max(0, scrollPosition);
  }, [length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  const handleBoxClick = (index: number, e: React.MouseEvent) => {
    // Prevent opening modal if user was dragging
    if (isDragging) return;

    setSelectedBoxIndex(index);
    setIsModalOpen(true);
  };

  const handleBeadSelect = (imageUrl: string) => {
    if (selectedBoxIndex !== null) {
      setBeadSelections((prev) => ({
        ...prev,
        [selectedBoxIndex]: imageUrl,
      }));
    }
    setIsModalOpen(false);
    setSelectedBoxIndex(null);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !scrollRef.current) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, startX, scrollLeft]);

  return (
    <>
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto py-8 scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
      >
        <div className="flex gap-4 px-6" style={{ width: "max-content" }}>
          {Array.from({ length }, (_, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-32 h-32 bg-[#D9D9D9] rounded-xl hover:bg-gray-100 transition-colors duration-200 select-none cursor-pointer relative overflow-hidden"
              onClick={(e) => handleBoxClick(index, e)}
            >
              {beadSelections[index] && (
                <img
                  src={beadSelections[index] || "/placeholder.svg"}
                  alt={`Bead ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                  draggable={false}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[60vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Select a Bead for Position{" "}
              {selectedBoxIndex !== null ? selectedBoxIndex + 1 : ""}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 p-4">
            {BEAD_IMAGES.map((imageUrl, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all duration-200 hover:scale-105"
                onClick={() => handleBeadSelect(imageUrl)}
              >
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt={`Bead option ${index + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {selectedBoxIndex !== null && beadSelections[selectedBoxIndex] && (
            <div className="px-4 pb-4">
              <Button
                variant="outline"
                onClick={() => {
                  if (selectedBoxIndex !== null) {
                    setBeadSelections((prev) => {
                      const newSelections = { ...prev };
                      delete newSelections[selectedBoxIndex];
                      return newSelections;
                    });
                  }
                  setIsModalOpen(false);
                  setSelectedBoxIndex(null);
                }}
                className="w-full"
              >
                Clear Selection
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
