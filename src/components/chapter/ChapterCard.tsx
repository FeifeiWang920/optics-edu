"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Clock, Calculator } from "lucide-react";
import DifficultyBadge from "./DifficultyBadge";
import ReferenceTag from "./ReferenceTag";

interface ChapterCardProps {
  chapterNumber: number;
  title: string;
  subtitle: string;
  feynmanRef?: string;
  cieRef?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: number;
  children: ReactNode;
  interactive?: ReactNode;
  mathDetail?: ReactNode;
}

export default function ChapterCard({
  chapterNumber,
  title,
  subtitle,
  feynmanRef,
  cieRef,
  difficulty,
  estimatedTime,
  children,
  interactive,
  mathDetail,
}: ChapterCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showMath, setShowMath] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel overflow-hidden"
    >
      {/* 卡片头部 */}
      <div className="border-b border-white/10">
        <div className="p-6">
          {/* 标题区域 */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-primary-500/30 text-primary-400 font-bold text-sm">
                  CH{chapterNumber}
                </span>
                <h2 className="text-2xl font-bold text-white">{title}</h2>
              </div>
              <p className="text-gray-400 text-sm ml-11">{subtitle}</p>
            </div>
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </motion.button>
          </div>

          {/* 元信息区域 */}
          <div className="flex flex-wrap items-center gap-3 ml-11">
            <DifficultyBadge difficulty={difficulty} />
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs">
              <Clock size={12} />
              <span>{estimatedTime} 分钟</span>
            </div>
            {feynmanRef && <ReferenceTag type="feynman" reference={feynmanRef} />}
            {cieRef && <ReferenceTag type="cie" reference={cieRef} />}
          </div>
        </div>
      </div>

      {/* 卡片内容 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0">
              {/* 主要内容 */}
              <div className="prose prose-invert max-w-none mt-4">
                {children}
              </div>

              {/* 交互组件区域 */}
              {interactive && (
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20">
                  {interactive}
                </div>
              )}

              {/* 数学推导展开区域 */}
              {mathDetail && (
                <div className="mt-4">
                  <motion.button
                    onClick={() => setShowMath(!showMath)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg",
                      "bg-gradient-to-r from-accent-500/10 to-accent-500/5",
                      "border border-accent-500/20",
                      "text-accent-400 hover:text-accent-300",
                      "transition-colors duration-200"
                    )}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Calculator size={16} />
                    <span className="text-sm font-medium">
                      {showMath ? "收起数学推导" : "展开数学推导"}
                    </span>
                    {showMath ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {showMath && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 p-4 rounded-xl bg-surface border border-border">
                          {mathDetail}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
