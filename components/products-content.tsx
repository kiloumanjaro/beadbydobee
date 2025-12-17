"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import ProductCard from "@/components/product-card";

interface ProductsContentProps {
  onBack: () => void;
}

export default function ProductsContent({ onBack }: ProductsContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "bracelet" | "keychain">("all");
  const [sortBy, setSortBy] = useState<"price-low" | "price-high">("price-low");

  // Sample product data
  const products = [
    {
      id: "1",
      name: "Rainbow Harmony Bracelet",
      price: 24.99,
      originalPrice: 29.99,
      image: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
      isNew: false,
      isPopular: true,
      category: "bracelet" as const,
    },
    {
      id: "2",
      name: "Sunset Dreams Bracelet",
      price: 22.99,
      image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
      isNew: true,
      isPopular: false,
      category: "bracelet" as const,
    },
    {
      id: "3",
      name: "Ocean Waves Keychain",
      price: 16.99,
      originalPrice: 19.99,
      image: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
      isNew: false,
      isPopular: true,
      category: "keychain" as const,
    },
    {
      id: "4",
      name: "Mystic Forest Bracelet",
      price: 27.99,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=500&auto=format",
      isNew: false,
      isPopular: true,
      category: "bracelet" as const,
    },
    {
      id: "5",
      name: "Starlight Keychain",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=500&auto=format",
      isNew: true,
      isPopular: false,
      category: "keychain" as const,
    },
    {
      id: "6",
      name: "Vintage Rose Bracelet",
      price: 31.99,
      originalPrice: 36.99,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=500&auto=format",
      isNew: false,
      isPopular: true,
      category: "bracelet" as const,
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return a.price - b.price;
    }
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Our Products</h1>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as "all" | "bracelet" | "keychain")}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="bracelet">Bracelets</option>
            <option value="keychain">Keychains</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {sortedProducts.length} of {products.length} products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* No Results */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No products found</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}