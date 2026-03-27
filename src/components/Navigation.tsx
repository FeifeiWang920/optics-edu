"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Layers, Zap, Eye, Palette, Menu, X } from "lucide-react";

const navItems = [
  { name: "首页", path: "/", icon: Lightbulb },
  { name: "人眼视觉", path: "/vision", icon: Eye },
  { name: "光的作用原理", path: "/interactions", icon: Layers },
  { name: "光度学", path: "/photometry", icon: Zap },
  { name: "色度学", path: "/color", icon: Palette },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll behavior - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 100;

      // Hide when scrolling down past threshold, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-panel px-6 py-3 border border-white/10"
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <ul className="flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path} className="relative">
                <Link
                  href={item.path}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200 focus-ring rounded-lg px-2 py-1 ${
                    isActive
                      ? "text-primary-400"
                      : "text-secondary hover:text-white"
                  }`}
                >
                  <item.icon
                    size={18}
                    className={isActive ? "text-primary-400" : ""}
                    aria-hidden="true"
                  />
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
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="glass-panel p-3 rounded-xl touch-target flex items-center justify-center focus-ring"
          aria-label={isMobileMenuOpen ? "关闭菜单" : "打开菜单"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Menu size={24} className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.nav
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 left-4 right-4 glass-panel rounded-2xl p-4 z-50 md:hidden"
            >
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors touch-target ${
                          isActive
                            ? "bg-primary-500/20 text-primary-400"
                            : "text-secondary hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <item.icon size={20} aria-hidden="true" />
                        <span className="font-medium">{item.name}</span>
                        {isActive && (
                          <motion.div
                            layoutId="active-mobile-nav"
                            className="ml-auto w-2 h-2 rounded-full bg-primary-500"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
