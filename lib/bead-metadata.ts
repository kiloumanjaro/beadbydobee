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
    id: "black-disco_ball",
    filename: "/beads/black-disco_ball.png",
    color: "black",
    vibe: ["party", "disco", "glam", "nightlife", "sparkling"],
    description: "Black disco ball bead for party vibes",
  },
  {
    id: "blue_black-evil_eye",
    filename: "/beads/blue_black-evil_eye.png",
    color: "blue",
    vibe: ["protection", "mystical", "spiritual", "traditional", "lucky"],
    description: "Blue and black evil eye bead for protection",
  },
  {
    id: "blue-flower_charm",
    filename: "/beads/blue-flower_charm.png",
    color: "blue",
    vibe: ["floral", "nature", "delicate", "pretty", "spring"],
    description: "Blue flower charm bead",
  },
  {
    id: "blue-smiley_face",
    filename: "/beads/blue-smiley_face.png",
    color: "blue",
    vibe: ["happy", "cheerful", "fun", "positive", "playful"],
    description: "Blue smiley face bead",
  },
  {
    id: "dark_pink-flower_charm",
    filename: "/beads/dark_pink-flower_charm.png",
    color: "dark pink",
    vibe: ["floral", "nature", "romantic", "feminine", "elegant"],
    description: "Dark pink flower charm bead",
  },
  {
    id: "dark_pink-popstar",
    filename: "/beads/dark_pink-popstar.png",
    color: "dark pink",
    vibe: ["star", "celebrity", "glam", "trendy", "bold"],
    description: "Dark pink popstar bead",
  },
  {
    id: "gold-ocean",
    filename: "/beads/gold-ocean.png",
    color: "gold",
    vibe: ["ocean", "beach", "wave", "nautical", "luxurious"],
    description: "Gold ocean wave bead",
  },
  {
    id: "gold-rockstar",
    filename: "/beads/gold-rockstar.png",
    color: "gold",
    vibe: ["star", "rock", "music", "edgy", "cool"],
    description: "Gold rockstar bead",
  },
  {
    id: "green-smiley_face",
    filename: "/beads/green-smiley_face.png",
    color: "green",
    vibe: ["happy", "cheerful", "fun", "positive", "playful"],
    description: "Green smiley face bead",
  },
  {
    id: "light_pink-popstar",
    filename: "/beads/light_pink-popstar.png",
    color: "light pink",
    vibe: ["star", "celebrity", "sweet", "trendy", "cute"],
    description: "Light pink popstar bead",
  },
  {
    id: "light_pink-smiley_face",
    filename: "/beads/light_pink-smiley_face.png",
    color: "light pink",
    vibe: ["happy", "cheerful", "fun", "sweet", "playful"],
    description: "Light pink smiley face bead",
  },
  {
    id: "mint_green-popstar",
    filename: "/beads/mint_green-popstar.png",
    color: "mint green",
    vibe: ["star", "celebrity", "fresh", "trendy", "cool"],
    description: "Mint green popstar bead",
  },
  {
    id: "orange-popstar",
    filename: "/beads/orange-popstar.png",
    color: "orange",
    vibe: ["star", "celebrity", "energetic", "vibrant", "bold"],
    description: "Orange popstar bead",
  },
  {
    id: "orange-smiley_face",
    filename: "/beads/orange-smiley_face.png",
    color: "orange",
    vibe: ["happy", "cheerful", "fun", "energetic", "playful"],
    description: "Orange smiley face bead",
  },
  {
    id: "pink-flower_charm",
    filename: "/beads/pink-flower_charm.png",
    color: "pink",
    vibe: ["floral", "nature", "romantic", "feminine", "delicate"],
    description: "Pink flower charm bead",
  },
  {
    id: "purple-disco_ball",
    filename: "/beads/purple-disco_ball.png",
    color: "purple",
    vibe: ["party", "disco", "glam", "nightlife", "sparkling"],
    description: "Purple disco ball bead for party vibes",
  },
  {
    id: "red-smiley_face",
    filename: "/beads/red-smiley_face.png",
    color: "red",
    vibe: ["happy", "cheerful", "fun", "bold", "playful"],
    description: "Red smiley face bead",
  },
  {
    id: "silver-coquette",
    filename: "/beads/silver-coquette.png",
    color: "silver",
    vibe: ["elegant", "chic", "sophisticated", "trendy", "feminine"],
    description: "Silver coquette bead",
  },
  {
    id: "yellow-flower_charm",
    filename: "/beads/yellow-flower_charm.png",
    color: "yellow",
    vibe: ["floral", "nature", "sunny", "cheerful", "spring"],
    description: "Yellow flower charm bead",
  },
  {
    id: "yellow-popstar",
    filename: "/beads/yellow-popstar.png",
    color: "yellow",
    vibe: ["star", "celebrity", "bright", "cheerful", "trendy"],
    description: "Yellow popstar bead",
  },
  {
    id: "yellow-smiley_face",
    filename: "/beads/yellow-smiley_face.png",
    color: "yellow",
    vibe: ["happy", "cheerful", "fun", "sunny", "playful"],
    description: "Yellow smiley face bead",
  },
  {
    id: "black-dot",
    filename: "/beads/black-dot.png",
    color: "black",
    vibe: ["minimal", "simple", "classic", "basic", "versatile"],
    description: "Black dot bead",
  },
  {
    id: "black-shiney_seed",
    filename: "/beads/black-shiney_seed.png",
    color: "black",
    vibe: ["shiny", "glossy", "sleek", "modern", "elegant"],
    description: "Black shiny seed bead",
  },
  {
    id: "brown-round_painted_pearl",
    filename: "/beads/brown-round_painted_pearl.png",
    color: "brown",
    vibe: ["pearl", "earthy", "natural", "warm", "elegant"],
    description: "Brown round painted pearl bead",
  },
  {
    id: "gold-glass_like_seed",
    filename: "/beads/gold-glass_like_seed.png",
    color: "gold",
    vibe: ["glass", "shimmering", "luxurious", "elegant", "sparkly"],
    description: "Gold glass-like seed bead",
  },
  {
    id: "green-glass_like_seed",
    filename: "/beads/green-glass_like_seed.png",
    color: "green",
    vibe: ["glass", "fresh", "natural", "elegant", "sparkly"],
    description: "Green glass-like seed bead",
  },
  {
    id: "light_pink-shiny_seed",
    filename: "/beads/light_pink-shiny_seed.png",
    color: "light pink",
    vibe: ["shiny", "glossy", "feminine", "delicate", "sweet"],
    description: "Light pink shiny seed bead",
  },
  {
    id: "pink-round_painted_pearl",
    filename: "/beads/pink-round_painted_pearl.png",
    color: "pink",
    vibe: ["pearl", "elegant", "feminine", "romantic", "luxurious"],
    description: "Pink round painted pearl bead",
  },
  {
    id: "pink-shiny_seed",
    filename: "/beads/pink-shiny_seed.png",
    color: "pink",
    vibe: ["shiny", "glossy", "feminine", "playful", "bright"],
    description: "Pink shiny seed bead",
  },
  {
    id: "transparent-glasslike_seed",
    filename: "/beads/transparent-glasslike_seed.png",
    color: "transparent",
    vibe: ["glass", "clear", "minimal", "modern", "sparkly"],
    description: "Transparent glass-like seed bead",
  },
  {
    id: "white-letter_a",
    filename: "/beads/white-letter_a.png",
    color: "white",
    vibe: ["letter", "personalized", "custom", "alphabet", "text"],
    description: "White letter A bead",
  },
  {
    id: "white-letter_b",
    filename: "/beads/white-letter_b.png",
    color: "white",
    vibe: ["letter", "personalized", "custom", "alphabet", "text"],
    description: "White letter B bead",
  },
  {
    id: "white-letter_c",
    filename: "/beads/white-letter_c.png",
    color: "white",
    vibe: ["letter", "personalized", "custom", "alphabet", "text"],
    description: "White letter C bead",
  },
  {
    id: "white-letter_d",
    filename: "/beads/white-letter_d.png",
    color: "white",
    vibe: ["letter", "personalized", "custom", "alphabet", "text"],
    description: "White letter D bead",
  },
  {
    id: "white-letter_e",
    filename: "/beads/white-letter_e.png",
    color: "white",
    vibe: ["letter", "personalized", "custom", "alphabet", "text"],
    description: "White letter E bead",
  },
  {
    id: "white-letter_f",
    filename: "/beads/white-letter_f.png",
    color: "white",
    vibe: ["letter", "personalized", "custom", "alphabet", "text"],
    description: "White letter F bead",
  },
  {
    id: "white-multicolored_pearl_shines",
    filename: "/beads/white-multicolored_pearl_shines.png",
    color: "white",
    vibe: ["pearl", "multicolored", "iridescent", "sparkly", "elegant"],
    description: "White multicolored pearl shines bead",
  },
  {
    id: "white-shiny_seed",
    filename: "/beads/white-shiny_seed.png",
    color: "white",
    vibe: ["shiny", "glossy", "clean", "bright", "classic"],
    description: "White shiny seed bead",
  },
  {
    id: "yellow-round_glass_like_pearl",
    filename: "/beads/yellow-round_glass_like_pearl.png",
    color: "yellow",
    vibe: ["glass", "pearl", "sunny", "elegant", "bright"],
    description: "Yellow round glass-like pearl bead",
  },
  // Generic placeholder beads
  // {
  //   id: "bead1",
  //   filename: "/beads/bead1.png",
  //   color: "mixed",
  //   vibe: ["versatile", "unique"],
  //   description: "Versatile bead design",
  // },
  // {
  //   id: "bead2",
  //   filename: "/beads/bead2.png",
  //   color: "mixed",
  //   vibe: ["versatile", "unique"],
  //   description: "Versatile bead design",
  // },
  // {
  //   id: "bead3",
  //   filename: "/beads/bead3.png",
  //   color: "mixed",
  //   vibe: ["versatile", "unique"],
  //   description: "Versatile bead design",
  // },
  // {
  //   id: "bead4",
  //   filename: "/beads/bead4.png",
  //   color: "mixed",
  //   vibe: ["versatile", "unique"],
  //   description: "Versatile bead design",
  // },
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
export const getBeadByFilename = (
  filename: string
): BeadMetadata | undefined => {
  return BEAD_CATALOG.find((bead) => bead.filename === filename);
};

// Create a catalog description for Gemini
export const getBeadCatalogForAI = (): string => {
  return BEAD_CATALOG.map(
    (bead, index) =>
      `${index + 1}. ${bead.id}: ${bead.description} (Vibes: ${bead.vibe.join(
        ", "
      )})`
  ).join("\n");
};
