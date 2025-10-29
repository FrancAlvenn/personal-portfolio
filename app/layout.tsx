// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import Navbar from "@/components/Navbar"; // ← Client navbar
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // Core SEO
  title: {
    default: "Franc Alvenn Dela Cruz | Web Developer Portfolio",
    template: "%s | Franc Alvenn Dela Cruz",
  },
  description:
    "Portfolio of Franc Alvenn Dela Cruz — Web Developer & Designer crafting clean, modern, and responsive web experiences using React, Next.js, and Tailwind CSS.",
  keywords: [
    "Franc Alvenn Dela Cruz",
    "Web Developer",
    "Frontend Developer",
    "Full-Stack Developer",
    "React Developer",
    "Next.js",
    "Tailwind CSS",
    "JavaScript",
    "TypeScript",
    "Portfolio",
    "Freelance Developer",
    "Philippines Web Developer",
  ],
  authors: [{ name: "Franc Alvenn Dela Cruz", url: "https://franc-alvenn-dela-cruz.vercel.app" }],
  creator: "Franc Alvenn Dela Cruz",
  publisher: "Franc Alvenn Dela Cruz",

  // Canonical URL
  alternates: {
    canonical: "https://franc-alvenn-dela-cruz.vercel.app",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph (Facebook, LinkedIn, WhatsApp, iMessage, etc.)
  openGraph: {
    title: "Franc Alvenn Dela Cruz | Web Developer Portfolio",
    description:
      "Explore my projects, designs, and creations as a Web Developer passionate about building elegant digital experiences.",
    url: "https://franc-alvenn-dela-cruz.vercel.app",
    siteName: "Franc Alvenn Dela Cruz | Portfolio",
    images: [
      {
        url: "https://franc-alvenn-dela-cruz.vercel.app/profile.png",
        width: 1200,
        height: 630,
        alt: "Franc Alvenn Dela Cruz - Web Developer Portfolio Preview",
      },
      {
        url: "https://franc-alvenn-dela-cruz.vercel.app/profile.png",
        width: 600,
        height: 600,
        alt: "Franc Alvenn Dela Cruz - Profile",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter / X Cards
  twitter: {
    card: "summary_large_image",
    title: "Franc Alvenn Dela Cruz | Web Developer Portfolio",
    description:
      "Full-stack developer, designer, and creator. Building digital experiences with code and creativity.",
    images: [
      "https://franc-alvenn-dela-cruz.vercel.app/profile.png",
    ],
    creator: "@francalvenn",
    site: "@francalvenn",
  },

  // Icons & Favicons
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  // Manifest (PWA support)
  manifest: "/site.webmanifest",

  // Theme color
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],

  // Viewport
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
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