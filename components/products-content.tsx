"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Filter,
  Search,
  Check,
  ChevronsUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import ProductCard from "@/components/product-card";
import { cn } from "@/lib/utils";

interface ProductsContentProps {
  onBack: () => void;
}

export default function ProductsContent({ onBack }: ProductsContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "bracelet" | "keychain"
  >("all");
  const [sortBy, setSortBy] = useState<"price-low" | "price-high">("price-low");
  const [categoryOpen, setCategoryOpen] = useState(false);

  const categories = [
    { value: "all", label: "Both" },
    { value: "bracelet", label: "Bracelets" },
    { value: "keychain", label: "Keychains" },
  ];

  // Sample product data
  const products = [
    {
      id: "1",
      name: "Rainbow Harmony Bracelet",
      price: 24.99,
      originalPrice: 29.99,
      image:
        "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
      isNew: false,
      isPopular: true,
      category: "bracelet" as const,
      description:
        "Vibrant hand-beaded bracelet featuring rainbow colors, perfect for adding a pop of color to any outfit.",
    },
    {
      id: "2",
      name: "Sunset Dreams Bracelet",
      price: 22.99,
      image:
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
      isNew: true,
      isPopular: false,
      category: "bracelet" as const,
      description:
        "Warm-toned beaded bracelet inspired by golden sunsets, crafted with premium glass beads.",
    },
    {
      id: "3",
      name: "Ocean Waves Keychain",
      price: 16.99,
      originalPrice: 19.99,
      image:
        "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
      isNew: false,
      isPopular: true,
      category: "keychain" as const,
      description:
        "Cool blue and turquoise beaded keychain that captures the essence of ocean waves.",
    },
    {
      id: "4",
      name: "Mystic Forest Bracelet",
      price: 27.99,
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=500&auto=format",
      isNew: false,
      isPopular: true,
      category: "bracelet" as const,
      description:
        "Earthy green and brown beaded bracelet with natural stone accents, inspired by mystical forests.",
    },
    {
      id: "5",
      name: "Starlight Keychain",
      price: 14.99,
      image:
        "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=500&auto=format",
      isNew: true,
      isPopular: false,
      category: "keychain" as const,
      description:
        "Shimmering silver and white beaded keychain with star-shaped charms for a celestial touch.",
    },
    {
      id: "6",
      name: "Vintage Rose Bracelet",
      price: 31.99,
      originalPrice: 36.99,
      image:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=500&auto=format",
      isNew: false,
      isPopular: true,
      category: "bracelet" as const,
      description:
        "Elegant vintage-inspired bracelet with delicate rose-colored beads and antique gold accents.",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
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
      {/* Filters & Search */}

      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <ButtonGroup className="flex-1 max-w-md">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10"
            />
            <Button
              variant="outline"
              aria-label="Search"
              className="h-10 w-10 items-center justify-center border-none"
            >
              <Search className="text-[#727272]" />
            </Button>
          </ButtonGroup>

          {/* Category Filter */}
          <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
            <PopoverTrigger asChild>
              <Button
                role="combobox"
                aria-expanded={categoryOpen}
                className="w-[140px] h-10 justify-between"
              >
                {categories.find(
                  (category) => category.value === selectedCategory
                )?.label || "Select category..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[140px] p-0">
              <Command>
                <CommandList>
                  <CommandGroup>
                    {categories.map((category) => (
                      <CommandItem
                        key={category.value}
                        value={category.value}
                        onSelect={(currentValue) => {
                          setSelectedCategory(
                            currentValue as "all" | "bracelet" | "keychain"
                          );
                          setCategoryOpen(false);
                        }}
                      >
                        {category.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            selectedCategory === category.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Sort */}
          <Button
            onClick={() => {
              setSortBy(sortBy === "price-low" ? "price-high" : "price-low");
            }}
            className="h-10 w-10 justify-center items-center"
            aria-label={`Sort ${
              sortBy === "price-low" ? "low to high" : "high to low"
            }`}
          >
            {sortBy === "price-low" ? (
              <ArrowUp className="h-4 w-4 transition-transform duration-300" />
            ) : (
              <ArrowDown className="h-4 w-4 transition-transform duration-300" />
            )}
          </Button>
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
