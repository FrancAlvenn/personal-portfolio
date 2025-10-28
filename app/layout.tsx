// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import Navbar from "@/components/Navbar"; // ← Client navbar
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Name - Portfolio",
  description: "Full-stack developer, designer, and creator.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          html { scroll-behavior: smooth; }
        `}</style>
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <Navbar /> {/* ← Client Component */}
          <main className="pt-16 md:pt-20">{children}</main>
        </Providers>
      </body>
    </html>
  );
}