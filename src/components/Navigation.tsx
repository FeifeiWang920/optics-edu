"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Lightbulb, Layers, Zap, Eye, Palette } from "lucide-react";

const navItems = [
  { name: "Introduction", path: "/", icon: Lightbulb },
  { name: "Vision", path: "/vision", icon: Eye },
  { name: "Interactions", path: "/interactions", icon: Layers },
  { name: "Photometry", path: "/photometry", icon: Zap },
  { name: "Color", path: "/color", icon: Palette },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-panel px-6 py-3 border border-white/10">
      <ul className="flex items-center space-x-8">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <li key={item.path} className="relative">
              <Link
                href={item.path}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-primary-400" : "text-gray-400 hover:text-white"
                }`}
              >
                <item.icon size={18} className={isActive ? "text-primary-400" : ""} />
                <span>{item.name}</span>
              </Link>
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute -bottom-4 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
