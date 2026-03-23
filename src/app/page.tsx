"use client";

import SpectrumSlider from "@/components/SpectrumSlider";
import { ArrowRight, Zap, Eye, Aperture, Layers, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[130px] -z-10 rounded-full" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block mb-6 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-400 tracking-widest uppercase">
            车灯光学工程师培训系列
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tight">
            <span className="text-gradient">光学基础</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            车灯不仅是照明工具，更是一套精密的<strong>光学工程系统</strong>。本课程从人眼的感知原理出发，经由光的物理性质，最终建立完整的车灯光学设计知识体系。
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/vision" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all shadow-xl shadow-white/5 flex items-center gap-2">
              从人眼视觉开始 <ArrowRight size={20} />
            </Link>
            <Link href="/interactions" className="px-8 py-3 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all">
              光的物理原理
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Course Map */}
      <section className="glass-panel p-10">
        <h2 className="text-3xl font-bold mb-2">课程学习路径</h2>
        <p className="text-gray-500 text-sm mb-8">按顺序学习，构建完整知识体系</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { num: "01", title: "人眼视觉", sub: "感知基础", desc: "锥杆细胞、盲点、视觉适应。理解\"终端用户\"的局限", href: "/vision", color: "border-l-primary-500", icon: Eye },
            { num: "02", title: "光的作用原理", sub: "物理基础", desc: "反射、折射、全反射、散射、菲涅尔公式", href: "/interactions", color: "border-l-secondary-500", icon: Layers },
            { num: "03", title: "光度学", sub: "量化基础", desc: "光通量、发光强度、照度、亮度与平方反比定律", href: "/photometry", color: "border-l-accent-500", icon: Zap },
            { num: "04", title: "色度学", sub: "颜色科学", desc: "CIE 1931、色温、色差ΔE和同色异谱效应", href: "/color", color: "border-l-purple-500", icon: FlaskConical },
          ].map((item) => (
            <Link key={item.num} href={item.href} className={`group glass-panel p-6 space-y-3 border-l-4 ${item.color} hover:bg-white/5 transition-all`}>
              <div className="flex items-start justify-between">
                <span className="text-4xl font-black text-white/10 group-hover:text-white/20 transition-colors">{item.num}</span>
                <item.icon className="text-gray-600 group-hover:text-gray-400 transition-colors" size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{item.sub}</p>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* What is Light - Expanded */}
      <section className="space-y-8">
        <h2 className="text-4xl font-bold">什么是光？</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              光是一种<strong>电磁辐射</strong>，它以电磁波的形式在空间中传播能量。从物理学角度，光同时具备<strong>波动性</strong>（产生干涉、衍射）和<strong>粒子性</strong>（光电效应、光子动量），这种二象性是现代量子物理的基础。
            </p>
            <p>
              在工程应用中，车灯光学设计主要使用<strong>几何光学</strong>（光线追迹），将光视为无数条笔直传播的光线，研究其在界面处的反射与折射行为，而忽略波动效应。
            </p>
            <div className="p-5 bg-primary-500/5 rounded-xl border border-primary-500/20 space-y-3">
              <h4 className="font-bold text-white">电磁波谱（从低频到高频）</h4>
              <div className="space-y-1.5">
                {[
                  ["无线电波", "1m ~ 10km", "通信用"],
                  ["微波", "1mm ~ 1m", "雷达、微波炉"],
                  ["红外线", "780nm ~ 1mm", "热成像、遥控"],
                  ["可见光 ⭐", "380nm ~ 780nm", "人眼可感知"],
                  ["紫外线", "10nm ~ 380nm", "消毒、荧光"],
                  ["X射线", "0.01nm ~ 10nm", "医学成像"],
                ].map(([name, range, note]) => (
                  <div key={String(name)} className={`flex items-center gap-3 text-xs p-2 rounded-lg ${name.includes("⭐") ? "bg-white/10 border border-white/20 text-white" : "text-gray-500"}`}>
                    <span className="w-24 font-bold shrink-0">{String(name)}</span>
                    <span className="font-mono text-primary-400/70">{String(range)}</span>
                    <span className="text-gray-600">{String(note)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* SVG Diagram: Wave + Particle duality */}
          <div className="glass-panel p-6 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">光的二象性示意</h4>
            <svg viewBox="0 0 400 200" className="w-full" xmlns="http://www.w3.org/2000/svg">
              {/* Wave */}
              <text x="10" y="20" fill="#888" fontSize="10">波动性（波）</text>
              <path d="M 10 60 Q 40 20 70 60 Q 100 100 130 60 Q 160 20 190 60 Q 220 100 250 60 Q 280 20 310 60 Q 340 100 370 60" 
                stroke="#3b82f6" strokeWidth="2" fill="none" />
              <line x1="10" y1="60" x2="380" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4,4"/>
              <text x="10" y="105" fill="#555" fontSize="8">振幅</text>
              <line x1="30" y1="95" x2="30" y2="65" stroke="#555" strokeWidth="1"/>
              <line x1="28" y1="95" x2="32" y2="95" stroke="#555" strokeWidth="1"/>
              <line x1="28" y1="65" x2="32" y2="65" stroke="#555" strokeWidth="1"/>
              <text x="15" y="115" fill="#555" fontSize="8">λ（波长）</text>
              <line x1="10" y1="120" x2="70" y2="120" stroke="#555" strokeWidth="1"/>
              <line x1="10" y1="118" x2="10" y2="122" stroke="#555" strokeWidth="1"/>
              <line x1="70" y1="118" x2="70" y2="122" stroke="#555" strokeWidth="1"/>
              {/* Particle */}
              <text x="10" y="145" fill="#888" fontSize="10">粒子性（光子）</text>
              <circle cx="30" cy="175" r="5" fill="#8b5cf6" opacity="0.8"/>
              <circle cx="75" cy="175" r="5" fill="#8b5cf6" opacity="0.8"/>
              <circle cx="130" cy="175" r="5" fill="#8b5cf6" opacity="0.7"/>
              <circle cx="195" cy="175" r="5" fill="#8b5cf6" opacity="0.6"/>
              <circle cx="270" cy="175" r="5" fill="#8b5cf6" opacity="0.5"/>
              <circle cx="355" cy="175" r="5" fill="#8b5cf6" opacity="0.4"/>
              {[30, 75, 130, 195, 270].map((x) => (
                <line key={x} x1={x} y1="175" x2={x + 30} y2="175" stroke="#8b5cf6" strokeWidth="1" opacity="0.4" markerEnd="url(#arrow)"/>
              ))}
              <defs>
                <marker id="arrow" markerWidth="4" markerHeight="4" refX="4" refY="2" orient="auto">
                  <path d="M 0 0 L 4 2 L 0 4 z" fill="#8b5cf6" opacity="0.5"/>
                </marker>
              </defs>
            </svg>
            <p className="text-[10px] text-gray-500 italic text-center">光的传播可以用波（具有波长λ和频率f）或粒子（光子流）来描述，两种模型在不同场景下各有优势</p>
          </div>
        </div>
      </section>

      {/* Interactive Spectrum */}
      <section className="space-y-8">
        <div>
          <h2 className="text-4xl font-bold mb-2">可见光谱</h2>
          <p className="text-gray-400 leading-relaxed max-w-3xl">
            在整个电磁波谱中，只有<strong>380nm 到 780nm</strong>之间的电磁波能够刺激人眼的视网膜，引起视觉反应。这段极窄的范围被称为<strong>可见光</strong>。不同波长对应我们感知到的不同颜色。
          </p>
        </div>
        <SpectrumSlider />
      </section>

      {/* Geometric Optics Explained */}
      <section className="glass-panel p-10 overflow-hidden relative">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary-500/10 blur-[80px] rounded-full" />
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold">几何光学 vs 波动光学</h2>
            <p className="text-gray-400 leading-relaxed">
              车灯设计绝大多数工作基于<strong>几何光学</strong>：我们将光视为无数条从光源射出的<em>光线</em>，追踪每一条光线在反射镜、透镜、棱镜上的反射和折射路径，最终控制出光方向和光形分布。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary-500/5 rounded-xl border border-primary-500/10 space-y-2">
                <h4 className="font-bold text-white">几何光学适用于：</h4>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                  <li>反射镜设计（近光灯、远光灯）</li>
                  <li>配光镜（透镜阵列、棱镜）</li>
                  <li>导光条与全内反射棱镜</li>
                  <li>光线追迹仿真（如 LightTools、OptisWorks）</li>
                </ul>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <h4 className="font-bold text-white">波动光学适用于：</h4>
                <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                  <li>干涉镀膜（增透膜、反射膜）</li>
                  <li>衍射光栅（颜色效果）</li>
                  <li>偏振分析</li>
                  <li>散射与雾气建模</li>
                </ul>
              </div>
            </div>
          </div>
          {/* SVG Geometric vs Wave */}
          <div className="flex-1 w-full space-y-4">
            <svg viewBox="0 0 300 180" className="w-full" xmlns="http://www.w3.org/2000/svg">
              <text x="5" y="14" fill="#aaa" fontSize="10" fontWeight="bold">几何光学：光线模型</text>
              {/* Light source */}
              <circle cx="40" cy="90" r="6" fill="#f59e0b" opacity="0.9"/>
              {/* Rays */}
              <line x1="46" y1="80" x2="140" y2="40" stroke="#f59e0b" strokeWidth="1.5" opacity="0.8"/>
              <line x1="46" y1="90" x2="145" y2="90" stroke="#f59e0b" strokeWidth="1.5" opacity="0.8"/>
              <line x1="46" y1="100" x2="140" y2="140" stroke="#f59e0b" strokeWidth="1.5" opacity="0.8"/>
              {/* Lens */}
              <ellipse cx="145" cy="90" rx="6" ry="50" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeWidth="1.5"/>
              {/* Refracted rays */}
              <line x1="145" y1="40" x2="240" y2="90" stroke="#f59e0b" strokeWidth="1.5" opacity="0.5" strokeDasharray="4,2"/>
              <line x1="145" y1="90" x2="240" y2="90" stroke="#f59e0b" strokeWidth="1.5" opacity="0.5" strokeDasharray="4,2"/>
              <line x1="145" y1="140" x2="240" y2="90" stroke="#f59e0b" strokeWidth="1.5" opacity="0.5" strokeDasharray="4,2"/>
              <circle cx="240" cy="90" r="3" fill="#f59e0b" opacity="0.6"/>
              <text x="243" y="93" fill="#f59e0b" fontSize="8" opacity="0.8">焦点</text>
              <text x="5" y="168" fill="#555" fontSize="8">光线在透镜处弯折汇聚到焦点（折射定律）</text>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
