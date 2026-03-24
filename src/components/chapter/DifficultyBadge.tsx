"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DifficultyBadgeProps {
  difficulty: "beginner" | "intermediate" | "advanced";
  size?: "sm" | "md";
}

const difficultyConfig = {
  beginner: {
    label: "入门",
    color: "bg-green-500/20 text-green-400 border-green-500/30",
    gradient: "from-green-500/20 to-green-500/10",
  },
  intermediate: {
    label: "进阶",
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    gradient: "from-yellow-500/20 to-yellow-500/10",
  },
  advanced: {
    label: "高级",
    color: "bg-red-500/20 text-red-400 border-red-500/30",
    gradient: "from-red-500/20 to-red-500/10",
  },
};

export default function DifficultyBadge({ difficulty, size = "sm" }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        "bg-gradient-to-br",
        config.gradient,
        config.color,
        sizeClasses
      )}
    >
      <span className="flex items-center gap-1">
        {difficulty === "beginner" && (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
            <circle cx="10" cy="10" r="3" />
          </svg>
        )}
        {difficulty === "intermediate" && (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
            <circle cx="10" cy="10" r="3" />
            <circle cx="10" cy="10" r="1.5" />
          </svg>
        )}
        {difficulty === "advanced" && (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
            <circle cx="10" cy="10" r="3" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="10" cy="10" r="0.5" />
          </svg>
        )}
        {config.label}
      </span>
    </motion.div>
  );
}
