import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ExpoNext UX Copilot",
  description:
    "AI-powered UX, accessibility, and performance analysis for Expo and Next.js components",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
