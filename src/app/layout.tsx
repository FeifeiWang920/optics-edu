import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Optics Fundamentals",
  description: "光学理论基础学习平台，涵盖视觉科学、光度学、色度学等光学工程核心概念。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground flex flex-col relative overflow-x-hidden">
        {/* Subtle background ambient light effects */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_80%,rgba(139,92,246,0.08),transparent_50%)]" />
        <Navigation />
        <main className="flex-grow pt-28 pb-12 px-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
