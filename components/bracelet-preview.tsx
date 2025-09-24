"use client";

import type React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";

interface BraceletPreviewProps {
  length: number;
  radius?: number;
  boxSize?: number;
  beadSelections?: { [key: number]: string };
  onCustomize: () => void;
  onConfirm: () => void;
}

export default function BraceletPreview({
  length,
  radius = 550,
  boxSize = 100,
  beadSelections = {},
  onCustomize,
  onConfirm,
}: BraceletPreviewProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, rotation: 0 });
  const [momentum, setMomentum] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastAngleRef = useRef(0);
  const lastTimeRef = useRef(0);

  // Calculate angle from center point
  const getAngleFromCenter = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return 0;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  }, []);

  // Handle drag start
  const handleDragStart = useCallback(
    (clientX: number, clientY: number) => {
      const angle = getAngleFromCenter(clientX, clientY);
      setIsDragging(true);
      setDragStart({ x: clientX, y: clientY, rotation });
      setMomentum(0);
      lastAngleRef.current = angle;
      lastTimeRef.current = Date.now();

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    },
    [rotation, getAngleFromCenter]
  );

  // Handle drag move
  const handleDragMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDragging) return;

      const currentAngle = getAngleFromCenter(clientX, clientY);
      const angleDiff = currentAngle - lastAngleRef.current;

      // Handle angle wrap-around
      let normalizedDiff = angleDiff;
      if (angleDiff > 180) normalizedDiff -= 360;
      if (angleDiff < -180) normalizedDiff += 360;

      const newRotation = rotation + normalizedDiff;
      setRotation(newRotation);

      // Calculate momentum for smooth spinning
      const currentTime = Date.now();
      const timeDiff = currentTime - lastTimeRef.current;
      if (timeDiff > 0) {
        setMomentum((normalizedDiff / timeDiff) * 16); // Normalize to 60fps
      }

      lastAngleRef.current = currentAngle;
      lastTimeRef.current = currentTime;
    },
    [isDragging, rotation, getAngleFromCenter]
  );

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);

    // Apply momentum for smooth deceleration
    if (Math.abs(momentum) > 0.1) {
      const animate = () => {
        setMomentum((prev) => {
          const newMomentum = prev * 0.95; // Deceleration factor
          if (Math.abs(newMomentum) < 0.1) return 0;

          setRotation((current) => current + newMomentum);
          animationRef.current = requestAnimationFrame(animate);
          return newMomentum;
        });
      };
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [momentum]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX, e.clientY);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handleDragMove(e.clientX, e.clientY);
    },
    [handleDragMove]
  );

  const handleMouseUp = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleDragStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleDragMove(touch.clientX, touch.clientY);
    },
    [handleDragMove]
  );

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // Add global event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Generate boxes positioned in a circle
  const boxes = Array.from({ length }, (_, index) => {
    const angle = (index / length) * 360;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;

    const selectedBead = beadSelections[index];

    return (
      <div
        key={index}
        className="absolute bg-[#D9D9D9] rounded-lg transition-colors hover:bg-gray-400 overflow-hidden"
        style={{
          width: `${boxSize}px`,
          height: `${boxSize}px`,
          left: `calc(50% + ${x}px - ${boxSize / 2}px)`,
          top: `calc(50% + ${y}px - ${boxSize / 2}px)`,
          transform: `rotate(${angle}deg)`,
        }}
      >
        {selectedBead && (
          <img
            src={selectedBead || "/placeholder.svg"}
            alt={`Bead ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
            style={{ transform: `rotate(-${angle}deg)` }}
          />
        )}
      </div>
    );
  });

  const containerSize = (radius + boxSize) * 2 + 20;

  return (
    <>
      <main className="absolute top-1/4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8 z-2">
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-row items-center gap-3">
            <span className="text-3xl font-bold text-[#323232]">
              Curated Piece
            </span>
            <Button
              variant="secondary"
              onClick={onCustomize}
              size="icon"
              className="size-8 px-3 shadow-none"
            >
              <Undo2 className="w-0.5 h-0.5 text-[#727272]" />
            </Button>
          </div>

          <p className="w-80 text-center text-[#323232]">
            Review and confirm your custom bracelet design before placing your
            order
          </p>
        </div>

        <div className="flex gap-4 items-center flex-row sm:flex-row">
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Button onClick={onConfirm} variant="default" size="lg">
              Confirm
            </Button>
          </div>
        </div>
      </main>
      <div
        ref={containerRef}
        className={`relative select-none z-1 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          width: containerSize,
          height: containerSize,
          transform: `rotate(${rotation}deg)`,
          transition: isDragging ? "none" : "transform 0.1s ease-out",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {boxes}
      </div>
    </>
  );
}
