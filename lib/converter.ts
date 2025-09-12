export interface BraceletDesign {
  beadSelections: { [key: number]: string };
  length: number;
  createdAt: string;
}

// Encode: Convert JSON object → Base64 string
export function encodeDesign(design: BraceletDesign): string {
  const json = JSON.stringify(design);
  return btoa(json); // Browser-safe Base64 encode
}

// Decode: Convert Base64 string → JSON object
export function decodeDesign(encoded: string): BraceletDesign {
  const json = atob(encoded);
  return JSON.parse(json) as BraceletDesign;
}
