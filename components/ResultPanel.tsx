"use client";

interface ResultPanelProps {
  feedback: string;
  error?: string;
  isAnalyzing: boolean;
}

export default function ResultPanel({
  feedback,
  error,
  isAnalyzing,
}: ResultPanelProps) {
  if (isAnalyzing) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Analyzing your component...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-semibold mb-2">Error</h3>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <p>Paste your code and click "Analyze UX" to get started</p>
      </div>
    );
  }

  return (
    <div className="prose prose-sm max-w-none">
      <div
        className="whitespace-pre-wrap"
        dangerouslySetInnerHTML={{
          __html: formatMarkdown(feedback),
        }}
      />
    </div>
  );
}

function formatMarkdown(text: string): string {
  return text
    .replace(
      /^### (.+)$/gm,
      '<h3 class="text-lg font-bold mt-6 mb-3 text-gray-900">$1</h3>',
    )
    .replace(
      /^## (.+)$/gm,
      '<h2 class="text-xl font-bold mt-8 mb-4 text-gray-900">$1</h2>',
    )
    .replace(
      /^# (.+)$/gm,
      '<h1 class="text-2xl font-bold mt-8 mb-4 text-gray-900">$1</h1>',
    )
    .replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 bg-gray-100 rounded text-sm font-mono">$1</code>',
    )
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, '</p><p class="mb-3">')
    .replace(/^(.+)$/gm, '<p class="mb-3">$1</p>')
    .replace(/<\/p><p class="mb-3"><h/g, "</p><h")
    .replace(/<\/h[1-6]><\/p>/g, "</h3>");
}
