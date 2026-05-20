"use client";

import { Heart, ShoppingCart, Link as LinkIcon, Watch } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  isPopular?: boolean;
  category: "bracelet" | "keychain";
  description?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  isNew = false,
  isPopular = false,
  category,
  description,
}: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [showText, setShowText] = useState(false);
  const textTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get the category icon
  const CategoryIcon = category === "keychain" ? LinkIcon : Watch;

  const handleButtonMouseEnter = () => {
    // Clear any pending timeout
    if (textTimeoutRef.current) {
      clearTimeout(textTimeoutRef.current);
      textTimeoutRef.current = null;
    }
    setIsButtonHovered(true);
    setShowText(true);
  };

  const handleButtonMouseLeave = () => {
    setIsButtonHovered(false);
    setShowText(false);
  };

  return (
    <div className="bg-[#e2e2e2] border border-[#727272]/20 p-2 rounded-lg  transition-all duration-300 overflow-hidden group">
      {/* Product Info Header */}
      <div className="pb-3.5 p-1.5 flex-col flex items-center justify-between">
        {/* Price */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="text-sm text-[#727272]">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        {/* Category Icon and Name */}
        <h3 className="font-medium text-base text-[#727272] truncate">
          {name}
        </h3>
      </div>

      {/* Image Container */}
      <div className="relative border border-[#cccccc] rounded-lg overflow-hidden bg-gradient-to-b from-[#ffffff] to-[#f3f3f3] h-72">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-300"
        />

        {/* Description Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 p-4 flex flex-col">
          {description && (
            <p className="text-gray-700 text-sm leading-relaxed flex-1">
              {description}
            </p>
          )}

          {/* Cart Button */}
          <Button
            variant="default"
            className="ml-auto mt-auto flex items-center justify-center overflow-hidden"
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
            style={{
              padding: "0.5rem",
              paddingRight: isButtonHovered ? "1rem" : "0.5rem",
              paddingLeft: isButtonHovered ? "1rem" : "0.5rem",
              minWidth: "2.5rem",
              height: "2.5rem",
              transition: isButtonHovered
                ? "all 0.3s ease-in-out"
                : "all 0.5s ease-in-out",
            }}
          >
            <ShoppingCart className="w-5 h-5 flex-shrink-0" />
            {showText && (
              <span className=" flex flex-row gap-1 leading-tight text-xs">
                <span>Buy</span>
                <span>Now</span>
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
