// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Briefcase, BookOpen, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const createPageUrl = (page: string): string => {
  const routes: Record<string, string> = {
    Home: "/",
    Projects: "/projects",
    Blog: "/blog",
    About: "/about",
  };
  return routes[page] || "/";
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: createPageUrl("Home"), icon: Home },
    { name: "Projects", path: createPageUrl("Projects"), icon: Briefcase },
    { name: "Blog", path: createPageUrl("Blog"), icon: BookOpen },
    { name: "About", path: createPageUrl("About"), icon: Home },
    { name: "Contact", path: "/", hash: "#contact", icon: Mail },
  ];

  // Safe hash check — only on client
  const currentHash = typeof window !== "undefined" ? window.location.hash : "";

  const isActive = (path: string, hash?: string) => {
    if (hash) {
      return pathname === path && currentHash === hash;
    }
    return pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-lg shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex gap-2">
            <Image src="/icon.png" alt="Logo" width={32} height={32}></Image>
            <Link
              href={createPageUrl("Home")}
              className="font-bold text-xl md:text-2xl text-gray-900 hover:text-gray-700 transition-colors"
            >
              FDC
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.hash ? `${item.path}${item.hash}` : item.path}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.path, item.hash)
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.hash ? `${item.path}${item.hash}` : item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path, item.hash)
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}