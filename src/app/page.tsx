"use client";

import SpectrumSlider from "@/components/SpectrumSlider";
import { ArrowRight, Zap, Eye, Layers, FlaskConical, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section - Clean and Professional */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-6 pt-20">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-slate-500/5 blur-[100px] rounded-full" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase bg-white/5 border border-white/10 text-slate-400">
              光学理论基础学习平台
            </span>
          </motion.div>

          {/* Title - Professional and Clean */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              <span className="text-white">光学基础</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-secondary max-w-xl mx-auto leading-relaxed mb-10"
          >
            探索光的奥秘，从人眼感知到物理原理。
            涵盖视觉科学、光度学、色度学等光学核心理论。
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
            <Link
              href="/vision"
              className="group px-6 py-3 bg-white text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-2 touch-target"
            >
              从人眼视觉开始
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/interactions"
              className="px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 hover:border-white/30 transition-colors touch-target"
            >
              光的物理原理
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Course Map */}
      <section className="px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">课程学习路径</h2>
            <p className="text-tertiary text-base">按顺序学习，构建完整知识体系</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                num: "01",
                title: "人眼视觉",
                sub: "感知基础",
                desc: "锥杆细胞、盲点、视觉适应",
                href: "/vision",
                icon: Eye,
              },
              {
                num: "02",
                title: "光的作用原理",
                sub: "物理基础",
                desc: "反射、折射、全反射、菲涅尔公式",
                href: "/interactions",
                icon: Layers,
              },
              {
                num: "03",
                title: "光度学",
                sub: "量化基础",
                desc: "光通量、发光强度、照度、亮度",
                href: "/photometry",
                icon: Zap,
              },
              {
                num: "04",
                title: "色度学",
                sub: "颜色科学",
                desc: "CIE 1931、色温、色差、同色异谱",
                href: "/color",
                icon: FlaskConical,
              },
            ].map((item, index) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="group block p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl font-bold text-slate-600 group-hover:text-slate-500 transition-colors">
                      {item.num}
                    </span>
                    <item.icon className="text-slate-500 group-hover:text-slate-400 transition-colors" size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-tertiary uppercase tracking-wider mb-1">{item.sub}</p>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-secondary">{item.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Light */}
      <section className="px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">什么是光？</h2>
            <div className="h-px w-20 bg-slate-600" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-5"
            >
              <p className="text-base text-secondary leading-relaxed">
                光是一种<strong className="text-white">电磁辐射</strong>，以电磁波的形式在空间中传播能量。从物理学角度，光同时具备<strong className="text-white">波动性</strong>（产生干涉、衍射）和<strong className="text-white">粒子性</strong>（光电效应、光子动量）。
              </p>
              <p className="text-base text-secondary leading-relaxed">
                在工程应用中，光学设计主要使用<strong className="text-white">几何光学</strong>（光线追迹），将光视为无数条笔直传播的光线，研究其在界面处的反射与折射行为。
              </p>

              {/* Spectrum bar */}
              <div className="mt-6 p-5 rounded-lg border border-white/10 bg-white/[0.02]">
                <h4 className="text-sm font-semibold text-white mb-4">电磁波谱</h4>
                <div className="space-y-2">
                  {[
                    { name: "无线电波", range: "1m ~ 10km", note: "通信" },
                    { name: "微波", range: "1mm ~ 1m", note: "雷达" },
                    { name: "红外线", range: "780nm ~ 1mm", note: "热成像" },
                    { name: "可见光", range: "380nm ~ 780nm", note: "人眼可感知", highlight: true },
                    { name: "紫外线", range: "10nm ~ 380nm", note: "消毒" },
                    { name: "X射线", range: "0.01nm ~ 10nm", note: "医学成像" },
                  ].map((wave) => (
                    <div key={wave.name} className={`flex items-center gap-3 text-sm py-2 ${wave.highlight ? 'text-white' : 'text-tertiary'}`}>
                      <span className="w-16 font-medium">{wave.name}</span>
                      <span className="font-mono text-xs flex-1">{wave.range}</span>
                      <span className="text-xs">{wave.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Wave-Particle Duality */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-lg border border-white/10 bg-white/[0.02]"
            >
              <h4 className="text-sm font-semibold text-white mb-6">光的二象性</h4>

              {/* Wave visualization */}
              <div className="mb-6">
                <p className="text-xs text-tertiary uppercase tracking-wider mb-3">波动性</p>
                <svg viewBox="0 0 400 80" className="w-full" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M 0 40 Q 25 20 50 40 Q 75 60 100 40 Q 125 20 150 40 Q 175 60 200 40 Q 225 20 250 40 Q 275 60 300 40 Q 325 20 350 40 Q 375 60 400 40"
                    stroke="#60a5fa"
                    strokeWidth="2"
                    fill="none"
                  />
                  <line x1="0" y1="40" x2="400" y2="40" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4,4" />
                </svg>
              </div>

              {/* Particle visualization */}
              <div>
                <p className="text-xs text-tertiary uppercase tracking-wider mb-3">粒子性</p>
                <div className="flex items-center justify-between px-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-400" style={{ opacity: 1 - i * 0.15 }} />
                      {i < 4 && <div className="w-12 h-px bg-blue-400/30" />}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-tertiary mt-3 text-center">光子流</p>
              </div>

              <p className="text-sm text-secondary mt-6 text-center">
                光既是波也是粒子，两种模型在不同场景下各有优势
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Spectrum */}
      <section className="px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">可见光谱</h2>
            <p className="text-secondary text-base max-w-lg mx-auto">
              380nm 至 780nm 的电磁波能够刺激人眼视网膜，引起视觉反应
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SpectrumSlider />
          </motion.div>
        </div>
      </section>

      {/* Geometric vs Wave Optics */}
      <section className="px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">几何光学与波动光学</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-lg border border-white/10 bg-white/[0.02]"
            >
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-blue-400" size={22} />
                <h3 className="text-xl font-semibold text-white">几何光学</h3>
              </div>
              <p className="text-secondary leading-relaxed mb-4">
                将光视为无数条从光源射出的光线，追踪每一条光线在反射镜、透镜、棱镜上的反射和折射路径。
              </p>
              <ul className="space-y-2 text-sm text-tertiary">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-400" />
                  反射镜设计
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-400" />
                  配光镜与透镜阵列
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-400" />
                  光线追迹仿真
                </li>
              </ul>

              {/* 像差分析按钮 */}
              <a
                href="https://optics-aberrations-viewer.minime.top/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 hover:border-blue-400 text-blue-300 hover:text-blue-200 text-sm font-medium rounded-lg transition-all group"
              >
                <span>像差分析与可视化</span>
                <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-lg border border-white/10 bg-white/[0.02]"
            >
              <div className="flex items-center gap-3 mb-4">
                <Layers className="text-slate-400" size={22} />
                <h3 className="text-xl font-semibold text-white">波动光学</h3>
              </div>
              <p className="text-secondary leading-relaxed mb-4">
                研究光的波动特性，包括干涉、衍射、偏振等现象。
              </p>
              <ul className="space-y-2 text-sm text-tertiary">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-slate-400" />
                  干涉镀膜
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-slate-400" />
                  衍射光栅
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-slate-400" />
                  偏振分析
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto text-center"
        >
          <div className="p-8 rounded-lg border border-white/10 bg-white/[0.02]">
            <h2 className="text-2xl font-bold mb-3 text-white">准备开始学习？</h2>
            <p className="text-secondary mb-6">
              从人眼视觉出发，逐步揭开光的奥秘。
            </p>
            <Link
              href="/vision"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-colors"
            >
              开始学习
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
