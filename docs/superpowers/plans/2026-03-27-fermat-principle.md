# 费马原理专题章节 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在光的作用原理页面中插入费马原理深度讲解章节，包含理论推导、交互式演示和车灯光学应用

**Architecture:** 新增 FermatPrincipleExplorer 交互组件（SVG + React State），在 interactions/page.tsx 中插入独立章节，包含理论左栏和交互演示右栏的双栏布局

**Tech Stack:** React + TypeScript + Tailwind CSS + SVG

---

## File Structure

### New Files
- `src/components/FermatPrincipleExplorer.tsx` - 费马原理交互探索组件，包含光程对比器和折射路径求解器

### Modified Files
- `src/app/interactions/page.tsx` - 在TIR和菲涅尔章节之间插入费马原理章节

---

## Task 1: Create FermatPrincipleExplorer Component

**Files:**
- Create: `src/components/FermatPrincipleExplorer.tsx`
- Modify: `src/app/interactions/page.tsx` (import statement only)

- [ ] **Step 1: Create FermatPrincipleExplorer.tsx with component structure**

```typescript
"use client";

import { useState, useMemo } from "react";

export default function FermatPrincipleExplorer() {
  // State for light path demonstration
  const [pointAX, setPointAX] = useState(50);  // Starting point A x-coordinate
  const [pointBX, setPointBX] = useState(250); // Ending point B x-coordinate
  const [interfaceY, setInterfaceY] = useState(150); // Interface y-coordinate
  const [n1, setN1] = useState(1.0);  // Refractive index medium 1
  const [n2, setN2] = useState(1.5);  // Refractive index medium 2

  // Calculate optimal path using Snell's law (result of Fermat's principle)
  const optimalPath = useMemo(() => {
    // Implementation will calculate intersection point that minimizes OPL
    // Returns { intersectionX, opticalPathLength, angleIncident, angleRefracted }
  }, [pointAX, pointBX, interfaceY, n1, n2]);

  return (
    <div className="glass-card p-4 rounded-xl space-y-4">
      {/* Controls */}
      {/* SVG Visualization */}
    </div>
  );
}
```

- [ ] **Step 2: Add interactive controls for point positions and refractive indices**

```typescript
// Add to component:
<div className="space-y-3">
  <div className="flex items-center justify-between">
    <span className="text-xs text-gray-400">介质1折射率 n₁</span>
    <span className="text-sm font-mono text-primary-300">{n1.toFixed(2)}</span>
  </div>
  <input
    type="range"
    min="1.0"
    max="2.0"
    step="0.01"
    value={n1}
    onChange={(e) => setN1(parseFloat(e.target.value))}
    className="w-full accent-primary-400"
  />

  <div className="flex items-center justify-between">
    <span className="text-xs text-gray-400">介质2折射率 n₂</span>
    <span className="text-sm font-mono text-secondary-300">{n2.toFixed(2)}</span>
  </div>
  <input
    type="range"
    min="1.0"
    max="2.0"
    step="0.01"
    value={n2}
    onChange={(e) => setN2(parseFloat(e.target.value))}
    className="w-full accent-secondary-400"
  />
</div>
```

- [ ] **Step 3: Implement OPL calculation for arbitrary path**

```typescript
// Function to calculate optical path length
const calculateOPL = (intersectionX: number) => {
  const pointA = { x: pointAX, y: 50 };
  const pointB = { x: pointBX, y: 250 };
  const interfacePoint = { x: intersectionX, y: interfaceY };

  // Distance in medium 1 (above interface)
  const d1 = Math.sqrt(
    Math.pow(interfacePoint.x - pointA.x, 2) +
    Math.pow(interfacePoint.y - pointA.y, 2)
  );

  // Distance in medium 2 (below interface)
  const d2 = Math.sqrt(
    Math.pow(pointB.x - interfacePoint.x, 2) +
    Math.pow(pointB.y - interfacePoint.y, 2)
  );

  // Optical path length = n1*d1 + n2*d2
  return n1 * d1 + n2 * d2;
};

// Find optimal path by minimizing OPL
const findOptimalPath = () => {
  let minOPL = Infinity;
  let optimalX = pointAX;

  for (let x = Math.min(pointAX, pointBX); x <= Math.max(pointAX, pointBX); x += 1) {
    const opl = calculateOPL(x);
    if (opl < minOPL) {
      minOPL = opl;
      optimalX = x;
    }
  }

  return { intersectionX: optimalX, opticalPathLength: minOPL };
};
```

- [ ] **Step 4: Add SVG visualization for light path demonstration**

```typescript
// Add SVG to component:
<div className="relative aspect-[4/3] max-w-[320px] mx-auto">
  <svg viewBox="0 0 300 300" className="w-full">
    {/* Background - Medium 1 (air) */}
    <rect x="0" y="0" width="300" height="150" fill="rgba(59,130,246,0.05)" />

    {/* Background - Medium 2 (glass/plastic) */}
    <rect x="0" y="150" width="300" height="150" fill="rgba(59,130,246,0.15)" />

    {/* Interface line */}
    <line x1="0" y1="150" x2="300" y2="150" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />

    {/* Labels */}
    <text x="10" y="30" fill="#888" fontSize="10">介质1 (n₁)</text>
    <text x="10" y="280" fill="#888" fontSize="10">介质2 (n₂)</text>

    {/* Point A */}
    <circle cx={pointAX} cy="50" r="6" fill="#f59e0b" />
    <text x={pointAX - 15} y="40" fill="#f59e0b" fontSize="10">A</text>

    {/* Point B */}
    <circle cx={pointBX} cy="250" r="6" fill="#3b82f6" />
    <text x={pointBX - 15} y="270" fill="#3b82f6" fontSize="10">B</text>

    {/* Incident ray */}
    <line x1={pointAX} y1="50" x2={optimalPath.intersectionX} y2="150" stroke="#f59e0b" strokeWidth="2.5" />
    <polygon points={`${optimalPath.intersectionX-5},145 ${optimalPath.intersectionX+5},145 ${optimalPath.intersectionX},150`} fill="#f59e0b" />

    {/* Refracted ray */}
    <line x1={optimalPath.intersectionX} y1="150" x2={pointBX} y2="250" stroke="#3b82f6" strokeWidth="2.5" />
    <polygon points={`${pointBX-5},245 ${pointBX-5},255 ${pointBX},250`} fill="#3b82f6" />

    {/* Normal line */}
    <line x1={optimalPath.intersectionX} y1="100" x2={optimalPath.intersectionX} y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4,2" />

    {/* Angle arcs */}
    {/* Implementation for showing θ₁ and θ₂ */}
  </svg>
</div>
```

- [ ] **Step 5: Display OPL comparison (actual vs straight line)**

```typescript
// Calculate straight-line OPL for comparison
const straightLineOPL = calculateStraightLineOPL();
const actualOPL = optimalPath.opticalPathLength;
const savings = ((straightLineOPL - actualOPL) / straightLineOPL * 100).toFixed(2);

// Add display:
<div className="mt-4 p-3 bg-black/30 rounded-lg space-y-2">
  <div className="flex justify-between text-xs">
    <span className="text-gray-400">实际光程 (费马路径):</span>
    <span className="text-green-400 font-mono">{actualOPL.toFixed(2)}</span>
  </div>
  <div className="flex justify-between text-xs">
    <span className="text-gray-400">直线路径光程:</span>
    <span className="text-gray-500 font-mono">{straightLineOPL.toFixed(2)}</span>
  </div>
  <div className="flex justify-between text-xs">
    <span className="text-gray-400">光程节约:</span>
    <span className="text-primary-400 font-mono">{savings}%</span>
  </div>
</div>
```

- [ ] **Step 6: Add draggable points for interactive exploration**

```typescript
// Add drag handlers for Point A and Point B
const handleMouseDown = (point: 'A' | 'B') => (e: React.MouseEvent) => {
  // Implement drag logic
};

// Make points draggable in SVG:
<circle
  cx={pointAX}
  cy="50"
  r="8"
  fill="#f59e0b"
  cursor="grab"
  onMouseDown={handleMouseDown('A')}
/>
<circle
  cx={pointBX}
  cy="250"
  r="8"
  fill="#3b82f6"
  cursor="grab"
  onMouseDown={handleMouseDown('B')}
/>
```

- [ ] **Step 7: Import component in page.tsx**

```typescript
// Add import at top of page.tsx:
import FermatPrincipleExplorer from "@/components/FermatPrincipleExplorer";
```

- [ ] **Step 8: Commit component creation**

```bash
git add src/components/FermatPrincipleExplorer.tsx
git commit -m "feat: add FermatPrincipleExplorer interactive component"
```

---

## Task 2: Insert Fermat's Principle Section in Page

**Files:**
- Modify: `src/app/interactions/page.tsx`

- [ ] **Step 1: Insert import statement for new component**

```typescript
// Add to imports at line 1-3:
import RayTracer from "@/components/RayTracer";
import PhaseFunctionVisualizer from "@/components/PhaseFunctionVisualizer";
import FermatPrincipleExplorer from "@/components/FermatPrincipleExplorer";  // ADD THIS
import { Zap, TriangleAlert, Droplets, Sigma, Lightbulb } from "lucide-react";  // ADD Lightbulb
```

- [ ] **Step 2: Insert Fermat Principle section after TIR section**

Find the closing `</section>` of TIR section (around line 226), then insert:

```tsx
      {/* Fermat's Principle */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-3"><Lightbulb className="text-primary-400" /> 费马原理（Fermat's Principle）</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Theory */}
          <div className="space-y-5 text-gray-300 text-sm leading-relaxed">
            <p>
              <strong className="text-white">费马原理</strong>是几何光学的第一性原理，它指出：光线从一点传播到另一点时，会选择使<strong>光程</strong>取stationary值（通常为极小值）的路径。
            </p>

            <div className="p-5 bg-primary-500/5 rounded-xl border border-primary-500/10 space-y-3">
              <h4 className="font-bold text-white">费马原理的数学表述</h4>
              <div className="font-mono text-center p-3 bg-black/40 rounded-lg text-primary-300">
                δ∫<sub>A</sub><sup>B</sup> n(s) ds = 0
              </div>
              <p className="text-xs text-gray-400">
                光程（Optical Path Length）: L = ∫n ds = c·t，表示光在介质中传播的"等效真空距离"
              </p>
            </div>

            <div className="p-4 bg-secondary-500/5 rounded-xl border border-secondary-500/10 space-y-3">
              <h4 className="font-bold text-secondary-400 text-xs uppercase tracking-widest">从费马原理推导斯涅尔定律</h4>
              <p className="text-xs text-gray-400">
                使用变分法（欧拉-拉格朗日方程），从光程极值条件可严格导出折射定律。这说明斯涅尔定律不是经验规律，而是费马原理的必然结果。
              </p>
              <div className="font-mono text-xs text-center p-2 bg-black/40 rounded text-secondary-300">
                n₁·sin θ₁ = n₂·sin θ₂
              </div>
            </div>

            <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/10 space-y-3">
              <h4 className="font-bold text-purple-400 text-xs uppercase tracking-widest">物理意义的深层理解</h4>
              <p className="text-xs text-gray-400">
                <strong>Stationary</strong>不仅限于极小值——在椭圆反射镜中，从一个焦点发出的光线经反射后汇聚到另一焦点，所有路径光程相等（拐点）。这与量子力学的费曼路径积分有深刻联系：光实际上"探索"了所有可能路径，相邻路径相位相消，只有stationary路径附近相位相干叠加。
              </p>
            </div>

            <div className="p-3 bg-black/40 rounded font-mono text-xs space-y-1 border border-white/5">
              <p className="text-green-400">程函方程（Eikonal）: |∇S|² = n²</p>
              <p className="text-gray-500">几何光学是波动光学在 λ→0 时的极限</p>
            </div>
          </div>

          {/* Right: Interactive Explorer */}
          <div>
            <p className="text-xs text-gray-500 mb-3">👆 费马原理探索器 — 拖动A、B点观察光程最小化路径</p>
            <FermatPrincipleExplorer />
          </div>
        </div>

        {/* Applications */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary-500 rounded-full" />
            车灯光学应用
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 space-y-2">
              <h4 className="font-bold text-primary-400 text-xs uppercase">自由曲面设计</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                现代车灯反射镜和透镜采用自由曲面设计，通过<strong>逆向费马原理</strong>——从目标配光反推表面形状。给定光源位置和目标照度分布，数值求解使所有光线光程stationary的曲面方程。
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 space-y-2">
              <h4 className="font-bold text-secondary-400 text-xs uppercase">光线追迹的本质</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                光学仿真软件（ASAP、LightTools）中的光线追迹，本质是数值求解费马原理的离散形式。每条光线代表一条stationary光程路径，大量光线统计得到配光分布。
              </p>
            </div>
          </div>
        </div>
      </section>
```

- [ ] **Step 3: Verify section placement**

确保插入位置在TIR section的 `</section>` 之后，菲涅尔方程 section的 `<div className="grid grid-cols-1 md:grid-cols-2 gap-8">` 之前。

- [ ] **Step 4: Build and test**

```bash
npm run build
```

Expected: Build successful with no errors

- [ ] **Step 5: Commit the section insertion**

```bash
git add src/app/interactions/page.tsx
git commit -m "feat: add Fermat's Principle section to interactions page"
```

---

## Task 3: Polish and Final Review

**Files:**
- Review: `src/components/FermatPrincipleExplorer.tsx`
- Review: `src/app/interactions/page.tsx`

- [ ] **Step 1: Test interactive features in browser**

Run: `npm run dev`

Navigate to: `http://localhost:3000/interactions`

Verify:
- [ ] Fermat Principle section renders correctly
- [ ] Sliders for n1 and n2 work
- [ ] SVG visualization updates when sliders change
- [ ] OPL comparison displays correct values
- [ ] Component is responsive on mobile

- [ ] **Step 2: Final build verification**

```bash
npm run build
```

Expected:
```
✓ Generating static pages
✓ Finalizing page optimization
Route (app)
├ ○ /
├ ○ /interactions
...
```

- [ ] **Step 3: Final commit**

```bash
git add .
git commit -m "feat: complete Fermat's Principle chapter with interactive explorer"
```

---

## Spec Coverage Verification

| Spec Requirement | Task | Status |
|-----------------|------|--------|
| 费马原理数学表述 δ∫n ds = 0 | Task 2 Step 2 | ✓ |
| 光程概念讲解 | Task 2 Step 2 | ✓ |
| Stationary含义（极值/拐点） | Task 2 Step 2 | ✓ |
| 程函方程 | Task 2 Step 2 | ✓ |
| 变分法推导斯涅尔定律 | Task 2 Step 2 | ✓ |
| 与量子力学路径积分的联系 | Task 2 Step 2 | ✓ |
| 光程对比器交互演示 | Task 1 Steps 3-6 | ✓ |
| 折射路径求解器 | Task 1 Step 4 | ✓ |
| 自由曲面设计应用 | Task 2 Step 2 | ✓ |
| 光线追迹本质 | Task 2 Step 2 | ✓ |

---

## Design Document Reference

Full design spec: `docs/superpowers/specs/2026-03-27-fermat-principle-design.md`

---

## Notes for Implementation

1. **SVG Coordinate System**: Use 300x300 viewBox with origin at top-left
2. **Drag Implementation**: Use onMouseDown/ onMouseMove/ onMouseUp pattern
3. **Performance**: useMemo for expensive OPL calculations
4. **Accessibility**: Include aria-labels for interactive elements
5. **Color Scheme**: Follow existing page colors (primary-500, secondary-500)
