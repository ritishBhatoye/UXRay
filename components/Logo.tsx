"use client";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12 group">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl animate-gradient-rotate opacity-90 group-hover:opacity-100 transition-opacity"></div>

        {/* Inner content */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Animated sparkle effect */}
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"></div>
          </div>

          {/* Logo icon - UX letters with code brackets */}
          <div className="relative z-10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Left bracket */}
              <path
                d="M8 10 L5 10 L5 30 L8 30"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="animate-pulse-slow"
              />

              {/* Right bracket */}
              <path
                d="M32 10 L35 10 L35 30 L32 30"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="animate-pulse-slow"
              />

              {/* U letter */}
              <path
                d="M12 13 L12 22 Q12 26 16 26 Q20 26 20 22 L20 13"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* X letter */}
              <path
                d="M24 13 L30 26 M30 13 L24 26"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Glow effect on hover */}
        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300"></div>
      </div>

      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          ExpoNext UX Copilot
        </h1>
        <p className="text-sm text-gray-600">
          AI-powered analysis for React Native & Next.js
        </p>
      </div>
    </div>
  );
}
