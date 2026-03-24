"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight } from "lucide-react";

export interface ChapterNavItem {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle?: string;
}

interface ChapterNavigationProps {
  items: ChapterNavItem[];
  activeId?: string;
  onNavigate?: (id: string) => void;
}

export default function ChapterNavigation({ items, activeId, onNavigate }: ChapterNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 监听滚动，更新当前激活的章节
  const [activeSection, setActiveSection] = useState<string | undefined>(() => activeId);

  // 同步外部 activeId 变化 - 使用 setTimeout 避免同步调用 setState
  useEffect(() => {
    if (activeId && activeId !== activeSection) {
      const timeoutId = setTimeout(() => {
        setActiveSection(activeId);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [activeId, activeSection]);

  // 监听滚动，更新当前激活的章节
  useEffect(() => {
    if (typeof window === 'undefined') return; // SSR保护

    const handleScroll = () => {
      const sections = items.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          if (activeSection !== items[i].id) {
            setActiveSection(items[i].id);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初始化
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, activeSection]);

  // 监听滚动，更新当前激活的章节（重复代码移除，只保留一个）
  useEffect(() => {
    if (typeof window === 'undefined') return; // SSR保护

    const handleScroll = () => {
      const sections = items.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          if (activeSection !== items[i].id) {
            setActiveSection(items[i].id);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初始化
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, activeSection]);

  const handleNavigate = (id: string) => {
    if (typeof window === 'undefined') return; // SSR保护
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      onNavigate?.(id);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* 浮动按钮 */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full glass-panel border border-white/10 shadow-2xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* 侧边栏 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 遮罩层 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* 侧边栏面板 */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 glass-panel z-50 rounded-l-2xl border-l border-white/10 overflow-y-auto"
            >
              <div className="p-6">
                {/* 标题 */}
                <div className="mb-6 pb-4 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white">章节导航</h3>
                  <p className="text-sm text-gray-400 mt-1">点击跳转到对应章节</p>
                </div>

                {/* 章节列表 */}
                <nav className="space-y-2">
                  {items.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className={cn(
                          "w-full p-3 rounded-xl text-left transition-all duration-200",
                          "border",
                          isActive
                            ? "bg-gradient-to-r from-primary-500/20 to-primary-500/10 border-primary-500/30"
                            : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                        )}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold",
                              isActive
                                ? "bg-primary-500 text-white"
                                : "bg-white/10 text-gray-400"
                            )}
                          >
                            {item.chapterNumber}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p
                              className={cn(
                                "font-medium text-sm truncate",
                                isActive ? "text-white" : "text-gray-300"
                              )}
                            >
                              {item.title}
                            </p>
                            {item.subtitle && (
                              <p className="text-xs text-gray-500 truncate">{item.subtitle}</p>
                            )}
                          </div>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                            >
                              <ChevronRight className="w-4 h-4 text-primary-400" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </nav>

                {/* 进度提示 */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>进度</span>
                    <span>
                      {items.findIndex((i) => i.id === activeSection) + 1} / {items.length} 章节
                    </span>
                  </div>
                  <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          ((items.findIndex((i) => i.id === activeSection) + 1) / items.length) * 100
                        }%`,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
