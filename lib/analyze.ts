import OpenAI from "openai";
import { SYSTEM_PROMPT, buildUserPrompt } from "./aiPrompt";

export type Platform = "Expo" | "Next.js" | "Both";

export interface AnalysisResult {
  feedback: string;
  error?: string;
}

// Free fallback using Groq API (free tier available)
async function analyzeWithGroq(
  code: string,
  platform: Platform,
): Promise<AnalysisResult> {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY || ""}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: buildUserPrompt(code, platform) },
          ],
          temperature: 0.3,
          max_tokens: 2000,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Groq API error: ${response.statusText}. ${errorData.error?.message || ""}`,
      );
    }

    const data = await response.json();
    const feedback = data.choices?.[0]?.message?.content || "";

    if (!feedback) {
      return {
        feedback: "",
        error: "No feedback received from AI",
      };
    }

    return { feedback };
  } catch (error) {
    console.error("Groq analysis error:", error);
    throw error;
  }
}

// OpenAI analysis
async function analyzeWithOpenAI(
  code: string,
  platform: Platform,
): Promise<AnalysisResult> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
  });

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

  try {
    // Priority: OpenAI > Groq > Error
    if (process.env.OPENAI_API_KEY) {
      return await analyzeWithOpenAI(code, platform);
    } else if (process.env.GROQ_API_KEY) {
      console.log("Using Groq API");
      return await analyzeWithGroq(code, platform);
    } else {
      return {
        feedback: "",
        error:
          "No API key configured. Please add GROQ_API_KEY (free at https://console.groq.com) or OPENAI_API_KEY to your .env file.",
      };
    }
  } catch (error) {
    console.error("Analysis error:", error);
    return {
      feedback: "",
      error:
        error instanceof Error ? error.message : "Failed to analyze component",
    };
  }
}
