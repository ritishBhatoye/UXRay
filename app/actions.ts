"use server";

import { analyzeComponent, Platform } from "@/lib/analyze";

export async function analyzeComponentAction(code: string, platform: Platform) {
  return await analyzeComponent(code, platform);
}
