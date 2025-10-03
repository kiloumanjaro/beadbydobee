import { GoogleGenerativeAI } from "@google/generative-ai";
import { BEAD_CATALOG, getBeadCatalogForAI } from "./bead-metadata";

export interface AIDesignRequest {
  prompt: string;
  braceletSize: number; // number of beads (5, 10, 15, 20, 30)
}

export interface AIDesignResponse {
  success: boolean;
  design?: {
    beadSelections: { [key: number]: string };
    explanation: string;
  };
  error?: string;
}

// System prompt for Gemini
const createSystemPrompt = (braceletSize: number) => `
You are an expert bracelet designer helping users create custom bead bracelets based on their desired vibe, mood, or theme.

AVAILABLE BEADS:
${getBeadCatalogForAI()}

TASK:
Create a bracelet design with exactly ${braceletSize} beads based on the user's prompt.

RULES:
1. Select beads that match the requested vibe/mood/theme
2. Create harmonious color combinations
3. Consider pattern and flow (gradients, alternating, symmetrical, etc.)
4. Use variety but maintain cohesion
5. Return ONLY valid JSON in this exact format:

{
  "beadSelections": {
    "0": "/beads/blue-calm.png",
    "1": "/beads/white-pure.png",
    ...
  },
  "explanation": "A concise 2-3 sentence explanation of the design choices and how they match the vibe"
}

The "beadSelections" object must have keys from 0 to ${
  braceletSize - 1
}, each with a valid bead filename from the catalog.
`;

export async function generateBraceletDesign(
  request: AIDesignRequest
): Promise<AIDesignResponse> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        success: false,
        error:
          "Gemini API key not configured. Please add GEMINI_API_KEY to .env.local",
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = createSystemPrompt(request.braceletSize);
    const fullPrompt = `${systemPrompt}\n\nUSER REQUEST: ${request.prompt}\n\nRESPONSE (JSON only):`;

    const result = await model.generateContent(fullPrompt);
    const responseText = result.response.text();

    // Extract JSON from response (handle markdown code blocks)
    let jsonText = responseText.trim();
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```\n?/g, "");
    }

    const parsedResponse = JSON.parse(jsonText);

    // Validate response structure
    if (!parsedResponse.beadSelections || !parsedResponse.explanation) {
      return {
        success: false,
        error: "Invalid response format from AI",
      };
    }

    // Validate that all slots are filled
    const selections = parsedResponse.beadSelections;
    const expectedSlots = request.braceletSize;
    const actualSlots = Object.keys(selections).length;

    if (actualSlots !== expectedSlots) {
      return {
        success: false,
        error: `AI returned ${actualSlots} beads but expected ${expectedSlots}`,
      };
    }

    // Validate all bead filenames exist in catalog
    const validFilenames = BEAD_CATALOG.map((b) => b.filename);
    for (const filename of Object.values(selections)) {
      if (!validFilenames.includes(filename as string)) {
        return {
          success: false,
          error: `Invalid bead filename: ${filename}`,
        };
      }
    }

    return {
      success: true,
      design: {
        beadSelections: selections,
        explanation: parsedResponse.explanation,
      },
    };
  } catch (error) {
    console.error("Gemini API error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to generate design",
    };
  }
}

// Helper function to create example prompts
export const EXAMPLE_PROMPTS = [
  "Create a calming ocean-themed bracelet",
  "I want something bold and passionate",
  "Design a romantic sunset gradient",
  "Make a mystical and dreamy bracelet",
  "Create an energetic summer vibe",
  "I want elegant and sophisticated",
  "Design something cheerful and bright",
  "Create a bohemian free-spirited design",
];
