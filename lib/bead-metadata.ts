// Bead metadata for AI-powered design generation
// Naming convention: {color}-{vibe}.png

export interface BeadMetadata {
  id: string;
  filename: string;
  color: string;
  vibe: string[];
  description: string;
}

export const BEAD_CATALOG: BeadMetadata[] = [
  {
    id: "blue-calm",
    filename: "/beads/blue-calm.png",
    color: "blue",
    vibe: ["calm", "peaceful", "serene", "ocean", "tranquil"],
    description: "Calming blue bead with ocean vibes",
  },
  {
    id: "red-passionate",
    filename: "/beads/red-passionate.png",
    color: "red",
    vibe: ["passionate", "energetic", "bold", "love", "vibrant"],
    description: "Bold red bead full of passion and energy",
  },
  {
    id: "pink-romantic",
    filename: "/beads/pink-romantic.png",
    color: "pink",
    vibe: ["romantic", "soft", "sweet", "gentle", "feminine"],
    description: "Soft pink bead with romantic charm",
  },
  {
    id: "green-natural",
    filename: "/beads/green-natural.png",
    color: "green",
    vibe: ["natural", "fresh", "growth", "harmony", "balanced"],
    description: "Fresh green bead representing nature and growth",
  },
  {
    id: "purple-mystical",
    filename: "/beads/purple-mystical.png",
    color: "purple",
    vibe: ["mystical", "spiritual", "creative", "magical", "dreamy"],
    description: "Mystical purple bead for creative spirits",
  },
  {
    id: "yellow-cheerful",
    filename: "/beads/yellow-cheerful.png",
    color: "yellow",
    vibe: ["cheerful", "happy", "sunny", "optimistic", "bright"],
    description: "Bright yellow bead radiating cheerfulness",
  },
  {
    id: "orange-energetic",
    filename: "/beads/orange-energetic.png",
    color: "orange",
    vibe: ["energetic", "enthusiastic", "warm", "adventurous", "fun"],
    description: "Energetic orange bead for adventurous souls",
  },
  {
    id: "black-elegant",
    filename: "/beads/black-elegant.png",
    color: "black",
    vibe: ["elegant", "sophisticated", "mysterious", "powerful", "classic"],
    description: "Elegant black bead with timeless sophistication",
  },
  {
    id: "white-pure",
    filename: "/beads/white-pure.png",
    color: "white",
    vibe: ["pure", "clean", "minimalist", "peaceful", "fresh"],
    description: "Pure white bead with minimalist elegance",
  },
  {
    id: "gold-luxurious",
    filename: "/beads/gold-luxurious.png",
    color: "gold",
    vibe: ["luxurious", "glamorous", "wealthy", "precious", "confident"],
    description: "Luxurious gold bead for a touch of glamour",
  },
  {
    id: "silver-modern",
    filename: "/beads/silver-modern.png",
    color: "silver",
    vibe: ["modern", "sleek", "futuristic", "cool", "sophisticated"],
    description: "Modern silver bead with sleek appeal",
  },
  {
    id: "turquoise-bohemian",
    filename: "/beads/turquoise-bohemian.png",
    color: "turquoise",
    vibe: ["bohemian", "free-spirited", "artistic", "unique", "wanderlust"],
    description: "Bohemian turquoise bead for free spirits",
  },
  {
    id: "coral-playful",
    filename: "/beads/coral-playful.png",
    color: "coral",
    vibe: ["playful", "fun", "lively", "tropical", "youthful"],
    description: "Playful coral bead with tropical vibes",
  },
  {
    id: "lavender-dreamy",
    filename: "/beads/lavender-dreamy.png",
    color: "lavender",
    vibe: ["dreamy", "relaxing", "gentle", "whimsical", "soothing"],
    description: "Dreamy lavender bead for gentle souls",
  },
  {
    id: "rose-gold-chic",
    filename: "/beads/rose-gold-chic.png",
    color: "rose-gold",
    vibe: ["chic", "trendy", "feminine", "elegant", "modern"],
    description: "Chic rose gold bead combining elegance and trend",
  },
  // Placeholder beads - replace with actual bead data
  {
    id: "bead1",
    filename: "/beads/bead1.png",
    color: "mixed",
    vibe: ["versatile", "unique"],
    description: "Versatile bead design",
  },
  {
    id: "bead2",
    filename: "/beads/bead2.png",
    color: "mixed",
    vibe: ["versatile", "unique"],
    description: "Versatile bead design",
  },
  {
    id: "bead3",
    filename: "/beads/bead3.png",
    color: "mixed",
    vibe: ["versatile", "unique"],
    description: "Versatile bead design",
  },
  {
    id: "bead4",
    filename: "/beads/bead4.png",
    color: "mixed",
    vibe: ["versatile", "unique"],
    description: "Versatile bead design",
  },
  {
    id: "bead5",
    filename: "/beads/bead5.png",
    color: "mixed",
    vibe: ["versatile", "unique"],
    description: "Versatile bead design",
  },
];

// Get all bead filenames for the editor
export const getAllBeadFilenames = (): string[] => {
  return BEAD_CATALOG.map((bead) => bead.filename);
};

// Search beads by vibe/mood
export const findBeadsByVibe = (vibe: string): BeadMetadata[] => {
  const lowerVibe = vibe.toLowerCase();
  return BEAD_CATALOG.filter((bead) =>
    bead.vibe.some((v) => v.includes(lowerVibe))
  );
};

// Get bead by filename
export const getBeadByFilename = (filename: string): BeadMetadata | undefined => {
  return BEAD_CATALOG.find((bead) => bead.filename === filename);
};

// Create a catalog description for Gemini
export const getBeadCatalogForAI = (): string => {
  return BEAD_CATALOG.map(
    (bead, index) =>
      `${index + 1}. ${bead.id}: ${bead.description} (Vibes: ${bead.vibe.join(", ")})`
  ).join("\n");
};
