"use client";

import type React from "react";

import { useRef, useState, useEffect } from "react";

interface BeadsEditorProps {
  length: number;
}

export default function BeadsEditor({ length }: BeadsEditorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
            className="flex-shrink-0 w-32 h-32 bg-[#D9D9D9] rounded-xl shadow-sm hover:bg-gray-100 transition-colors duration-200 select-none"
          >
            <div className="w-full h-full flex items-center justify-center text-gray-600 font-medium">
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
