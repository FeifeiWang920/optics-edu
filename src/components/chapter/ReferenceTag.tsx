"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Book, FileText } from "lucide-react";

interface ReferenceTagProps {
  type: "feynman" | "cie";
  reference: string;
  size?: "sm" | "md";
}

export default function ReferenceTag({ type, reference, size = "sm" }: ReferenceTagProps) {
  const isFeynman = type === "feynman";
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";
  const iconSize = size === "sm" ? 12 : 16;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md",
        "bg-gradient-to-r border",
        isFeynman
          ? "from-purple-500/20 to-purple-500/10 text-purple-300 border-purple-500/30"
          : "from-cyan-500/20 to-cyan-500/10 text-cyan-300 border-cyan-500/30",
        sizeClasses
      )}
      title={isFeynman ? "费曼物理学讲义" : "CIE 标准文档"}
    >
      {isFeynman ? (
        <Book size={iconSize} className="shrink-0" />
      ) : (
        <FileText size={iconSize} className="shrink-0" />
      )}
      <span className="font-medium truncate max-w-[200px]">{reference}</span>
    </motion.div>
  );
}
