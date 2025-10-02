import { NextRequest, NextResponse } from "next/server";
import { generateBraceletDesign, AIDesignRequest } from "@/lib/gemini-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, braceletSize } = body as AIDesignRequest;

    // Validate input
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid prompt" },
        { status: 400 }
      );
    }

    if (!braceletSize || ![5, 10, 15, 20, 30].includes(braceletSize)) {
      return NextResponse.json(
        { success: false, error: "Invalid bracelet size" },
        { status: 400 }
      );
    }

    // Call Gemini service
    const result = await generateBraceletDesign({
      prompt,
      braceletSize,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
