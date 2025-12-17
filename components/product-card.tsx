"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  isPopular?: boolean;
  category: "bracelet" | "keychain";
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
}: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              New
            </span>
          )}
          {isPopular && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              Popular
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorited
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
            }`}
          />
        </button>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="secondary" size="sm">
            Quick View
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <span className="text-xs uppercase tracking-wide text-gray-500 mb-1 block">
          {category}
        </span>

        {/* Product Name */}
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 leading-tight">
          {name}
        </h3>



        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button className="w-full" size="sm">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}