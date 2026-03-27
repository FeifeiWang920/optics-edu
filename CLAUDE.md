# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此仓库中工作时提供指导。

@AGENTS.md

## 项目概述

**optics-edu** 是一个光学理论基础学习平台，涵盖视觉科学、光的相互作用、光度学和色度学等光学工程核心概念，以车灯光学为典型应用示例。

## 开发命令

```bash
npm run dev      # 启动开发服务器 (http://localhost:3000)
npm run build    # 生产环境构建
npm run start    # 启动生产服务器
npm run lint     # 运行 ESLint 检查
```

## 技术栈

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**，路径别名 `@/*` → `./src/*`
- **Tailwind CSS 4**，自定义主题（暗色模式、毛玻璃效果）
- **Framer Motion** 动画库
- **Lucide React** 图标库

## 项目架构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx           # 首页（课程介绍 + 可见光谱）
│   ├── vision/            # 人眼视觉与感知
│   ├── interactions/      # 光的物理作用原理（反射/折射/TIR/菲涅尔/散射/色散）
│   ├── photometry/        # 光度学（光通量/发光强度/照度/亮度）
│   └── color/             # 色度学（CIE 1931/色温/色差/同色异谱）
└── components/            # 交互式可视化组件
    ├── SpectrumSlider.tsx       # 可见光谱滑块
    ├── BlindSpotTest.tsx        # 盲点测试交互
    ├── MachBandDemo.tsx         # 马赫带效应演示
    ├── RayTracer.tsx            # 折射/全反射仿真器
    ├── CIE1931Explorer.tsx      # CIE 1931 色度图探索
    ├── BlackbodySlider.tsx      # 黑体辐射滑块
    ├── PhotometryVisualizer.tsx # 光度学可视化
    └── ColorMixer.tsx           # 颜色混合器
```

## 设计模式

- **页面组件**：默认为服务端组件，包含教学内容，导入交互式客户端组件
- **交互组件**：使用 `"use client"` 指令，结合 SVG + Framer Motion 实现物理可视化
- **样式规范**：使用 Tailwind 工具类，配合 `globals.css` 中定义的自定义类：
  - `.glass-panel` - 毛玻璃容器，带背景模糊
  - `.glass-card` - 可交互毛玻璃卡片，带悬停状态
  - `.text-gradient` - 渐变文字效果（primary→secondary→accent）
- **颜色变量**：使用主题变量如 `text-primary-500`、`text-secondary-500`、`text-accent-500`
- **语言**：所有界面文字使用中文

## Next.js 16 注意事项

本项目使用 Next.js 16，与早期版本相比可能有破坏性变更。实现功能时请查阅 `node_modules/next/dist/docs/` 中的最新 API 文档。