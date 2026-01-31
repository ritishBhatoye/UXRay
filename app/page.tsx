"use client";

import { useState } from "react";
import Editor from "@/components/Editor";
import ResultPanel from "@/components/ResultPanel";
import { analyzeComponentAction } from "./actions";
import { Platform } from "@/lib/analyze";

export default function Home() {
  const [code, setCode] = useState("");
  const [platform, setPlatform] = useState<Platform>("Expo");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError("Please provide code to analyze");
      return;
    }

    setIsAnalyzing(true);
    setError(undefined);
    setFeedback("");

    try {
      const result = await analyzeComponentAction(code, platform);

      if (result.error) {
        setError(result.error);
      } else {
        setFeedback(result.feedback);
      }
    } catch (err) {
      setError("Failed to analyze component. Please try again.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            ExpoNext UX Copilot
          </h1>
          <p className="mt-2 text-gray-600">
            AI-powered UX, accessibility, and performance analysis for Expo and
            Next.js
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col">
            <Editor
              code={code}
              platform={platform}
              onCodeChange={setCode}
              onPlatformChange={setPlatform}
            />
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !code.trim()}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze UX"}
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 overflow-auto">
            <ResultPanel
              feedback={feedback}
              error={error}
              isAnalyzing={isAnalyzing}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
