# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Overview

**optics-edu** is an educational platform for automotive lighting optics fundamentals. It teaches optical engineering concepts relevant to headlight design, including vision science, light interactions, photometry, and colorimetry.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Next.js 16** (App Router) with **React 19**
- **TypeScript** with path alias `@/*` → `./src/*`
- **Tailwind CSS 4** with custom theme (dark mode, glass effects)
- **Framer Motion** for animations
- **Lucide React** for icons

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home (课程介绍 + 可见光谱)
│   ├── vision/            # 人眼视觉与感知
│   ├── interactions/      # 光的物理作用原理 (反射/折射/TIR/菲涅尔/散射/色散)
│   ├── photometry/        # 光度学 (光通量/发光强度/照度/亮度)
│   └── color/             # 色度学 (CIE 1931/色温/色差/同色异谱)
└── components/            # Interactive visualization components
    ├── SpectrumSlider.tsx       # 可见光谱滑块
    ├── BlindSpotTest.tsx        # 盲点测试交互
    ├── MachBandDemo.tsx         # 马赫带效应演示
    ├── RayTracer.tsx            # 折射/全反射仿真器
    ├── CIE1931Explorer.tsx      # CIE 1931 色度图探索
    ├── BlackbodySlider.tsx      # 黑体辐射滑块
    ├── PhotometryVisualizer.tsx # 光度学可视化
    └── ColorMixer.tsx           # 颜色混合器
```

## Design Patterns

- **Page components**: Server components by default, contain educational content + import interactive client components
- **Interactive components**: Use `"use client"` directive, combine SVG + Framer Motion for physics visualizations
- **Styling**: Use Tailwind utilities with custom classes defined in `globals.css`:
  - `.glass-panel` - Frosted glass container with backdrop blur
  - `.glass-card` - Interactive glass card with hover state
  - `.text-gradient` - Gradient text effect (primary→secondary→accent)
- **Colors**: Use theme variables like `text-primary-500`, `text-secondary-500`, `text-accent-500`
- **Language**: All UI text in Chinese (中文)

## Next.js 16 Notes

This project uses Next.js 16 which may have breaking changes from earlier versions. Check `node_modules/next/dist/docs/` for current API documentation when implementing features.