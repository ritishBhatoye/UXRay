import OpenAI from "openai";
import { SYSTEM_PROMPT, buildUserPrompt } from "./aiPrompt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

export type Platform = "Expo" | "Next.js" | "Both";

export interface AnalysisResult {
  feedback: string;
  error?: string;
}

export async function analyzeComponent(
  code: string,
  platform: Platform,
): Promise<AnalysisResult> {
  if (!code.trim()) {
    return {
      feedback: "",
      error: "Please provide code to analyze",
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      feedback: "",
      error:
        "OPENAI_API_KEY is not configured. Please add it to your .env file.",
    };
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(code, platform) },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const feedback = completion.choices[0]?.message?.content || "";

    if (!feedback) {
      return {
        feedback: "",
        error: "No feedback received from AI",
      };
    }

    return { feedback };
  } catch (error) {
    console.error("Analysis error:", error);
    return {
      feedback: "",
      error:
        error instanceof Error ? error.message : "Failed to analyze component",
    };
  }
}
