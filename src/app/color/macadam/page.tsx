"use client";

import { ArrowLeft, BookOpen, Microscope, Lightbulb, Target, Award } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import MacAdamEllipses from "@/components/colorimetry/MacAdamEllipses";
import ColorMatchingApparatus from "@/components/colorimetry/ColorMatchingApparatus";
import MacAdamDataTable from "@/components/colorimetry/MacAdamDataTable";
import MacAdamVisualizations from "@/components/colorimetry/MacAdamVisualizations";

export default function MacAdamDeepDivePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 glass-panel border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/color/advanced"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm">返回色度学课程</span>
            </Link>
            <div className="h-6 w-px bg-white/10" />
            <h1 className="text-xl font-bold text-gradient">MacAdam 椭圆深度解析</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-500/10" />
        <div className="absolute inset-0 backdrop-blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 py-12 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-sm font-medium">
                深度解析
              </span>
              <span className="text-gray-500 text-sm">JOSA 1942, Vol. 32</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gradient">
              MacAdam 椭圆深度解析
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl">
              人眼色觉差异感知的里程碑实验
            </p>
          </div>

          {/* 快速导航 */}
          <div className="flex flex-wrap gap-3">
            {[
              { id: "background", label: "实验背景", icon: BookOpen },
              { id: "method", label: "实验方法", icon: Microscope },
              { id: "principle", label: "实验原理", icon: Lightbulb },
              { id: "conclusion", label: "实验结论", icon: Target },
              { id: "significance", label: "科学意义", icon: Award },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-primary-500/30 hover:bg-white/10 transition-all"
              >
                <item.icon size={16} className="text-primary-400" />
                <span className="text-sm text-gray-300">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-12">
        {/* 实验背景 */}
        <section id="background" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary-500/20">
                <BookOpen className="w-6 h-6 text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">实验背景</h2>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                1942年，David L. MacAdam 在美国柯达研究实验室进行了一项开创性的颜色视觉研究。
                这项研究的动机源于当时色度学的一个核心问题：
                <strong className="text-primary-400">CIE 1931 色品图上的距离无法准确预测人眼感知的颜色差异</strong>。
              </p>
              <p>
                MacAdam 注意到，在色品图的不同区域，人眼对颜色变化的敏感度差异巨大。例如，
                在绿色区域，人眼极其敏感，微小的色度变化就能被察觉；而在蓝色区域，
                人眼相对迟钝，需要较大的物理变化才能产生相同的感知差异。
              </p>

              <div className="bg-white/5 p-6 rounded-xl border-l-4 border-l-primary-500 mt-6">
                <p className="text-primary-300 font-medium mb-3">核心研究问题</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>人眼对不同色区的颜色差异感知是否相同？</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>如何在色品图上量化颜色差异的感知阈值？</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>这种非均匀性对工业颜色匹配有何影响？</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 实验方法 */}
        <section id="method" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-8 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-secondary-500/20">
                <Microscope className="w-6 h-6 text-secondary-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">实验方法</h2>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                MacAdam 设计了一个精密的分光光度计匹配实验。被试（包括 MacAdam 本人和另外两名观察者）
                需要调节测试光的颜色，使其与参考光在视觉上完全匹配。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white/5 p-5 rounded-xl">
                  <h3 className="text-secondary-400 font-medium mb-3">实验设置</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• 2° 视场（匹配 CIE 1931 标准观察者）</li>
                    <li>• 标准光源（使用单色光合成）</li>
                    <li>• 暗适应环境</li>
                    <li>• 24 个参考色点（覆盖可见光谱）</li>
                  </ul>
                </div>
                <div className="bg-white/5 p-5 rounded-xl">
                  <h3 className="text-secondary-400 font-medium mb-3">匹配流程</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• 显示参考色（固定）</li>
                    <li>• 被试调节测试色匹配</li>
                    <li>• 记录 50 次独立匹配结果</li>
                    <li>• 统计分析匹配点的分布</li>
                  </ul>
                </div>
              </div>

              <p className="mt-4">
                每位被试对 24 个参考色各进行 50 次颜色匹配。这些匹配点并非完全重合，
                而是形成一个统计分布——这就是后来著名的<strong className="text-secondary-400">MacAdam 椭圆</strong>的数据基础。
              </p>
            </div>
          </motion.div>
        </section>

        {/* 实验装置图 */}
        <section className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="glass-card p-8 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/20">
                <Microscope className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">实验装置</h2>
            </div>

            <ColorMatchingApparatus />
          </motion.div>
        </section>

        {/* 交互式可视化 */}
        <section className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-card p-8 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-accent-500/20">
                <Target className="w-6 h-6 text-accent-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">MacAdam 椭圆可视化</h2>
            </div>

            <div className="mb-6">
              <MacAdamEllipses showDeepDiveLink={false} />
            </div>

            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-accent-400 font-medium mb-3">可视化说明</h3>
              <p className="text-sm text-gray-400 mb-4">
                上图展示了 MacAdam 椭圆在 CIE 1931 色品图上的分布。为了便于观察，椭圆被放大了 10 倍显示。
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg text-center">
                  <p className="text-emerald-400 font-medium text-xs">绿色区域</p>
                  <p className="text-gray-500 text-[10px] mt-1">椭圆小且圆<br />人眼最敏感</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg text-center">
                  <p className="text-blue-400 font-medium text-xs">蓝色区域</p>
                  <p className="text-gray-500 text-[10px] mt-1">椭圆大且扁<br />人眼最不敏感</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-center">
                  <p className="text-red-400 font-medium text-xs">红色区域</p>
                  <p className="text-gray-500 text-[10px] mt-1">椭圆沿光谱<br />方向拉长</p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg text-center">
                  <p className="text-yellow-400 font-medium text-xs">白色区域</p>
                  <p className="text-gray-500 text-[10px] mt-1">椭圆相对圆<br />各向较均匀</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 实验数据表 */}
        <section className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="glass-card p-8 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary-500/20">
                <BookOpen className="w-6 h-6 text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">实验数据</h2>
            </div>

            <MacAdamDataTable />
          </motion.div>
        </section>

        {/* 数据可视化分析 */}
        <section className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-8 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-secondary-500/20">
                <Target className="w-6 h-6 text-secondary-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">数据分析</h2>
            </div>

            <MacAdamVisualizations />
          </motion.div>
        </section>

        {/* 实验原理 */}
        <section id="principle" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-8 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-accent-500/20">
                <Lightbulb className="w-6 h-6 text-accent-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">实验原理</h2>
            </div>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                MacAdam 使用统计方法分析了匹配点的分布。他发现，在色品图上，
                匹配点的分布可以用椭圆来近似描述。这个椭圆被称为<strong className="text-accent-400">颜色匹配椭圆</strong>或<strong className="text-accent-400">色差椭圆</strong>。
              </p>

              <div className="bg-white/5 p-6 rounded-xl">
                <h3 className="text-accent-400 font-medium mb-4">为什么是椭圆？</h3>
                <p className="text-gray-400 mb-4">
                  椭圆是二维高斯分布的等概率轮廓。假设人眼的颜色匹配误差在 x 和 y 方向上服从正态分布，
                  那么等概率线就是椭圆。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-black/20 p-4 rounded-lg">
                    <p className="text-accent-300 mb-2 font-medium">短轴方向</p>
                    <p className="text-gray-500">人眼最敏感的方向，微小的色度变化就能被察觉</p>
                  </div>
                  <div className="bg-black/20 p-4 rounded-lg">
                    <p className="text-accent-300 mb-2 font-medium">长轴方向</p>
                    <p className="text-gray-500">人眼最不敏感的方向，需要较大的变化才能察觉</p>
                  </div>
                </div>
              </div>

              <p>
                椭圆的大小、形状和方向因参考色而异。MacAdam 发现，在色品图的不同区域，
                椭圆的特性差异显著：紫-蓝区域的椭圆小而圆（高灵敏度），绿色区域的椭圆大而扁（低灵敏度）。
              </p>

              {/* 数学公式 */}
              <div className="bg-gradient-to-br from-accent-500/10 to-accent-500/5 p-6 rounded-xl border border-accent-500/20">
                <h3 className="text-accent-400 font-medium mb-4">椭圆方程</h3>
                <div className="font-mono text-sm text-gray-300 space-y-2">
                  <p>g₁₁(Δx)² + 2g₁₂(Δx)(Δy) + g₂₂(Δy)² = 1</p>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  其中 g₁₁, g₁₂, g₂₂ 是椭圆参数矩阵的元素。半长轴 a = 1/√λ₁，半短轴 b = 1/√λ₂，
                  λ₁ 和 λ₂ 是矩阵 G 的特征值。
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 实验结论 */}
        <section id="conclusion" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="glass-card p-8 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-green-500/20">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">实验结论</h2>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                MacAdam 的研究得出了几个重要结论，这些结论深刻影响了后来的色度学发展。
              </p>

              <div className="space-y-4 mt-6">
                {[
                  {
                    num: "1",
                    title: "CIE 1931 色品图不均匀",
                    desc: "色品图上的几何距离与人眼感知的色差不成正比。绿色区域 0.01 的 xy 距离可能比蓝色区域 0.05 的距离更容易被察觉。",
                  },
                  {
                    num: "2",
                    title: "椭圆参数高度可变",
                    desc: "椭圆的大小可相差 20 倍以上，长轴与短轴的比率可达 10:1。这说明人眼对不同方向的颜色变化敏感度差异巨大。",
                  },
                  {
                    num: "3",
                    title: "存在个体差异",
                    desc: "不同观察者的椭圆大小和形状有所不同，但整体趋势一致。这为建立\"标准观察者\"提供了依据。",
                  },
                  {
                    num: "4",
                    title: "光谱色与非光谱色不同",
                    desc: "光谱轨迹上的颜色（纯色）与白光混合色的椭圆特性存在系统性差异。",
                  },
                ].map((item) => (
                  <div key={item.num} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-green-500/20 text-green-400 font-bold">
                      {item.num}
                    </span>
                    <div>
                      <p className="text-green-300 font-medium">{item.title}</p>
                      <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* 科学意义 */}
        <section id="significance" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-8 rounded-2xl border-l-4 border-l-blue-500"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/20">
                <Award className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">科学意义与影响</h2>
            </div>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                MacAdam 的这项工作被公认为色度学史上最重要的实验之一，其影响延续至今。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "对均匀色空间的推动",
                    desc: "MacAdam 椭圆直接推动了 CIE 1960 UCS、CIE 1976 L*a*b* 和 CIE 1976 L*u*v* 等均匀色空间的建立。",
                  },
                  {
                    title: "工业颜色容差标准",
                    desc: "现代工业中的颜色容差（如纺织、印刷、涂料）都基于 MacAdam 的研究。",
                  },
                  {
                    title: "色差公式的发展",
                    desc: "从简单的 ΔE*ab 到复杂的 CIEDE2000，每一个改进都试图更好地模拟 MacAdam 椭圆所揭示的人眼感知特性。",
                  },
                  {
                    title: "显示技术校准",
                    desc: "现代显示器的色域设计、校准标准都考虑了人眼在不同色区的敏感度差异。",
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-white/5 p-5 rounded-xl">
                    <h3 className="text-blue-400 font-medium mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl mt-6">
                <p className="text-blue-300 font-medium mb-2">关键引用</p>
                <p className="text-gray-400 text-sm italic">
                  "Visual Sensitivities to Color Differences in Daylight" — D.L. MacAdam,
                  Journal of the Optical Society of America, Vol. 32, No. 5, pp. 247-274, 1942
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  这篇论文被引用超过 4000 次，是色度学领域最具影响力的文献之一。
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 返回按钮 */}
        <div className="flex justify-center pt-8">
          <Link
            href="/color/advanced"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30 text-primary-400 hover:text-primary-300 hover:border-primary-500/50 transition-all"
          >
            <ArrowLeft size={18} />
            <span>返回色度学课程</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-white/10 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© 2026 光学理论基础学习平台。仅供学习交流使用。</p>
            <div className="flex items-center gap-4">
              <span>参考：JOSA 1942, Vol. 32</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
