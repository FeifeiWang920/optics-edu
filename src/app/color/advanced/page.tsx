import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ChapterNavigation, { type ChapterNavItem } from "@/components/chapter/ChapterNavigation";
import DifficultyBadge from "@/components/chapter/DifficultyBadge";
import { Chapter01Rainbow } from "./chapters/chapter-01-rainbow";
import { Chapter02Eye } from "./chapters/chapter-02-eye";
import { Chapter03Matching } from "./chapters/chapter-03-matching";
import { Chapter04CIE1931 } from "./chapters/chapter-04-cie1931";
import { Chapter05Diagram } from "./chapters/chapter-05-diagram";
import { Chapter06DeltaE } from "./chapters/chapter-06-delta-e";
import { Chapter07Metamerism } from "./chapters/chapter-07-metamerism";
import { Chapter08Automotive } from "./chapters/chapter-08-automotive";

const chapterItems: ChapterNavItem[] = [
  { id: "chapter-1", chapterNumber: 1, title: "从彩虹说起", subtitle: "光的物理本质与可见光谱" },
  { id: "chapter-2", chapterNumber: 2, title: "人眼的精密设计", subtitle: "视网膜与三色视觉系统" },
  { id: "chapter-3", chapterNumber: 3, title: "颜色匹配实验", subtitle: "格拉斯曼定律与加色混合" },
  { id: "chapter-4", chapterNumber: 4, title: "CIE 1931 标准系统", subtitle: "国际照明委员会的色度学基石" },
  { id: "chapter-5", chapterNumber: 5, title: "读懂色品图", subtitle: "CIE 1931 xy 色度图的全面解析" },
  { id: "chapter-6", chapterNumber: 6, title: "均匀色空间与色差", subtitle: "从 CIE 1976 到 CIEDE2000" },
  { id: "chapter-7", chapterNumber: 7, title: "同色异谱与色适应", subtitle: "光源变化下的颜色感知" },
  { id: "chapter-8", chapterNumber: 8, title: "车灯中的色度学实践", subtitle: "从理论到工程应用" },
];

const chapterOverview = [
  { number: 1, title: "从彩虹说起", difficulty: "beginner" as const },
  { number: 2, title: "人眼的精密设计", difficulty: "intermediate" as const },
  { number: 3, title: "颜色匹配实验", difficulty: "intermediate" as const },
  { number: 4, title: "CIE 1931 标准系统", difficulty: "advanced" as const },
  { number: 5, title: "读懂色品图", difficulty: "intermediate" as const },
  { number: 6, title: "均匀色空间与色差", difficulty: "advanced" as const },
  { number: 7, title: "同色异谱与色适应", difficulty: "advanced" as const },
  { number: 8, title: "车灯中的色度学实践", difficulty: "intermediate" as const },
];

export default function ColorimetryAdvancedPage() {
  return (
    <div className="min-h-screen">
      {/* Header - 粘性头部 */}
      <header className="sticky top-0 z-30 glass-panel border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/color"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm">返回色度学主页</span>
            </Link>
            <div className="h-6 w-px bg-white/10" />
            <h1 className="text-xl font-bold text-gradient">色度学深度解析</h1>
          </div>
        </div>
      </header>

      {/* Hero Section - 页面介绍 */}
      <section className="relative overflow-hidden">
        {/* 渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-500/10" />
        <div className="absolute inset-0 backdrop-blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 py-16 space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-gradient">色度学深度解析</h1>
            <p className="text-xl text-gray-400 max-w-3xl">
              从费曼物理学讲义到 CIE 国际标准，系统学习色度学的完整知识体系
            </p>
          </div>

          {/* 8 个章节概览 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {chapterOverview.map((chapter) => (
              <div
                key={chapter.number}
                className="glass-panel p-4 rounded-xl border border-white/10 hover:border-primary-500/30 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-gray-500">CH{chapter.number}</span>
                  <DifficultyBadge difficulty={chapter.difficulty} />
                </div>
                <p className="text-sm font-medium text-white truncate">{chapter.title}</p>
              </div>
            ))}
          </div>

          {/* 学习路径提示 */}
          <div className="glass-card p-6 rounded-xl border-l-4 border-l-primary-500">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📚</span>
              <div className="space-y-2">
                <p className="text-white font-medium">学习建议</p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  本教程共 8 个章节，建议按顺序学习。入门章节（绿色）适合快速上手，
                  进阶章节（黄色）深入原理，高级章节（红色）探讨专业应用。
                  每个章节包含交互式可视化组件，动手操作效果更佳。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Navigation - 浮动章节导航 */}
      <ChapterNavigation items={chapterItems} />

      {/* Main Content - 8 个章节内容 */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        <section id="chapter-1">
          <Chapter01Rainbow />
        </section>
        <section id="chapter-2">
          <Chapter02Eye />
        </section>
        <section id="chapter-3">
          <Chapter03Matching />
        </section>
        <section id="chapter-4">
          <Chapter04CIE1931 />
        </section>
        <section id="chapter-5">
          <Chapter05Diagram />
        </section>
        <section id="chapter-6">
          <Chapter06DeltaE />
        </section>
        <section id="chapter-7">
          <Chapter07Metamerism />
        </section>
        <section id="chapter-8">
          <Chapter08Automotive />
        </section>
      </main>

      {/* Footer - 参考资料和版权信息 */}
      <footer className="glass-panel border-t border-white/10 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
          {/* 参考资料 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              参考资料
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-xl space-y-2">
                <p className="text-white font-medium text-sm">费曼物理学讲义</p>
                <p className="text-gray-400 text-xs">The Feynman Lectures on Physics, Vol. I, Chapter 35: Color Vision</p>
              </div>
              <div className="glass-card p-4 rounded-xl space-y-2">
                <p className="text-white font-medium text-sm">CIE 15:2018</p>
                <p className="text-gray-400 text-xs">Colorimetry, 4th Edition. CIE Central Bureau, Vienna, 2018.</p>
              </div>
              <div className="glass-card p-4 rounded-xl space-y-2">
                <p className="text-white font-medium text-sm">Stockman & Sharpe (2000)</p>
                <p className="text-gray-400 text-xs">The spectral sensitivities of the middle- and long-wavelength-sensitive cones</p>
              </div>
              <div className="glass-card p-4 rounded-xl space-y-2">
                <p className="text-white font-medium text-sm">ECE R48 / FMVSS 108</p>
                <p className="text-gray-400 text-xs">车辆灯光系统安装与颜色规范</p>
              </div>
            </div>
          </div>

          {/* 版权信息 */}
          <div className="pt-6 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
              <p>© 2026 光学理论基础学习平台。仅供学习交流使用。</p>
              <div className="flex items-center gap-4">
                <span>基于 Next.js 16 + React 19 构建</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
