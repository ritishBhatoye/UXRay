"use client";

import { Platform } from "@/lib/analyze";

interface EditorProps {
  code: string;
  platform: Platform;
  onCodeChange: (code: string) => void;
  onPlatformChange: (platform: Platform) => void;
}

export default function Editor({
  code,
  platform,
  onCodeChange,
  onPlatformChange,
}: EditorProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <label htmlFor="platform" className="text-sm font-medium text-gray-700">
          Platform
        </label>
        <select
          id="platform"
          value={platform}
          onChange={(e) => onPlatformChange(e.target.value as Platform)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Expo">Expo</option>
          <option value="Next.js">Next.js</option>
          <option value="Both">Both</option>
        </select>
      </div>

      <textarea
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        placeholder="Paste your React component or Expo screen here..."
        className="flex-1 w-full p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        spellCheck={false}
      />
    </div>
  );
}
