"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function RayTracer() {
  const [angle, setAngle] = useState(30);
  const [n1, setN1] = useState(1.0); // Air
  const [n2, setN2] = useState(1.5); // PMMA

  // Calculate refraction angle (Snell's Law: n1 * sin(t1) = n2 * sin(t2))
  const theta1Rad = (angle * Math.PI) / 180;
  const sinTheta2 = (n1 * Math.sin(theta1Rad)) / n2;

  let theta2Rad = 0;
  let isTIR = false;

  if (sinTheta2 > 1) {
    isTIR = true;
  } else {
    theta2Rad = Math.asin(sinTheta2);
  }

  const theta2Deg = (theta2Rad * 180) / Math.PI;

  // 计算光线坐标
  // 入射光线：从介质1（上方）射向界面中心
  // 入射光在法线左侧（x < 200），斜向下方射向界面中心
  const incidentStartX = 200 - 100 * Math.tan(theta1Rad);
  const incidentStartY = 112.5 - 100;

  // 折射光线：从界面中心射入介质2（下方），跨越法线到右侧
  // 折射光在法线右侧（x > 200），偏向法线（θ₂ < θ₁）
  const refractedEndX = 200 + 100 * Math.tan(theta2Rad);
  const refractedEndY = 112.5 + 100;

  return (
    <div className="flex flex-col gap-6">
      <div className="relative aspect-video bg-black/40 rounded-xl overflow-hidden border border-white/10">
        <svg viewBox="0 0 400 225" className="w-full h-full">
          {/* Horizontal Interface */}
          <line x1="0" y1="112.5" x2="400" y2="112.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

          {/* Vertical Normal */}
          <line x1="200" y1="0" x2="200" y2="225" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />

          {/* Labels */}
          <text x="10" y="30" className="fill-gray-500 text-[10px] uppercase tracking-widest leading-none">介质1 (n₁) - 入射面</text>
          <text x="10" y="210" className="fill-gray-500 text-[10px] uppercase tracking-widest leading-none">介质2 (n₂) - 透射面</text>

          {/* Incident Ray */}
          <line
            x1={incidentStartX}
            y1={incidentStartY}
            x2={200}
            y2={112.5}
            stroke="#f59e0b"
            strokeWidth="2"
          />

          {/* Reflected Ray */}
          <line
             x1={200}
             y1={112.5}
             x2={200 + 100 * Math.tan(theta1Rad)}
             y2={112.5 - 100}
             stroke="rgba(255, 255, 255, 0.2)"
             strokeWidth="1"
             strokeDasharray="4 2"
          />

          {/* Refracted or TIR Ray */}
          {!isTIR ? (
            <line
              x1={200}
              y1={112.5}
              x2={refractedEndX}
              y2={refractedEndY}
              stroke="#3b82f6"
              strokeWidth="2.5"
            />
          ) : (
            <line
              x1={200}
              y1={112.5}
              x2={200 - 100 * Math.tan(theta1Rad)}
              y2={112.5 - 100}
              stroke="#ef4444"
              strokeWidth="2.5"
            />
          )}

          {/* Angles */}
          <text x={incidentStartX + 20} y={incidentStartY + 80} className="fill-amber-400 text-[10px]">θ₁={angle}°</text>
          {!isTIR && (
             <text x={refractedEndX + 10} y={refractedEndY - 10} className="fill-blue-400 text-[10px]">θ₂={theta2Deg.toFixed(1)}°</text>
          )}
          {isTIR && (
             <text x="50%" y="150" textAnchor="middle" className="fill-red-500 font-bold text-sm tracking-widest uppercase opacity-80">全内反射 (TIR)!</text>
          )}
        </svg>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>入射角 θ₁</span>
            <span>{angle}°</span>
          </div>
          <input
            type="range" min="0" max="89" value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase">介质 1 (n₁)</label>
              <select
                value={n1}
                onChange={(e) => setN1(parseFloat(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs"
              >
                <option value={1.0}>空气 (1.0)</option>
                <option value={1.492}>PMMA 亚克力 (1.492)</option>
                <option value={1.586}>PC 聚碳酸酯 (1.586)</option>
                <option value={1.333}>水 (1.333)</option>
              </select>
           </div>
           <div className="space-y-2">
              <label className="text-[10px] text-gray-500 uppercase">介质 2 (n₂)</label>
              <select
                value={n2}
                onChange={(e) => setN2(parseFloat(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs"
              >
                <option value={1.0}>空气 (1.0)</option>
                <option value={1.492}>PMMA 亚克力 (1.492)</option>
                <option value={1.586}>PC 聚碳酸酯 (1.586)</option>
                <option value={1.333}>水 (1.333)</option>
              </select>
           </div>
        </div>

        <div className="glass-card p-4 text-[11px] text-gray-400 space-y-2">
           <p className="font-bold text-white flex gap-2 items-center">
              💡 <span className="text-secondary-400 uppercase tracking-tighter">物理直觉</span>
           </p>
           <p>
              当 <strong>n₁ &lt; n₂</strong>（如空气到PMMA）时，折射角 &lt; 入射角，光线靠近法线；<br/>
              当 <strong>n₁ &gt; n₂</strong> 且入射角超过临界角时，发生<strong>全反射 (TIR)</strong>。
           </p>
        </div>
      </div>
    </div>
  );
}