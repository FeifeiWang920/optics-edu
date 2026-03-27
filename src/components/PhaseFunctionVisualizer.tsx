"use client";

import { useState, useMemo } from "react";

export default function PhaseFunctionVisualizer() {
  const [g, setG] = useState(0.85);
  const [showHG, setShowHG] = useState(true);
  const [showCS, setShowCS] = useState(false);

  // Generate phase function data
  const data = useMemo(() => {
    const points = [];
    const angles = [];
    for (let i = 0; i <= 180; i += 3) {
      const theta = (i * Math.PI) / 180;
      const cosTheta = Math.cos(theta);

      // Henyey-Greenstein
      const hg = showHG ? (1 - g * g) / (2 * Math.pow(1 + g * g - 2 * g * cosTheta, 1.5)) : 0;

      // Cornette-Shanks (simplified α = g for visualization)
      const alpha = g;
      const cs = showCS ? (3 / (2 + alpha)) * ((1 + cosTheta * cosTheta) / (2 * Math.pow(1 + alpha * cosTheta, 1.5))) : 0;

      angles.push(i);
      points.push({
        angle: i,
        hg: hg,
        cs: cs,
        cosTheta: cosTheta
      });
    }
    return { points, maxHG: Math.max(...points.map(p => p.hg)) };
  }, [g, showHG, showCS]);

  // Scale factor for visualization
  const scale = 80;

  return (
    <div className="glass-card p-4 rounded-xl space-y-4">
      {/* Controls */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">各向异性因子 g</span>
          <span className="text-sm font-mono text-purple-300">{g.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="-0.95"
          max="0.95"
          step="0.05"
          value={g}
          onChange={(e) => setG(parseFloat(e.target.value))}
          className="w-full accent-purple-400"
        />
        <div className="flex gap-4 text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showHG}
              onChange={(e) => setShowHG(e.target.checked)}
              className="accent-purple-400"
            />
            <span className="text-purple-400">HG 函数</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showCS}
              onChange={(e) => setShowCS(e.target.checked)}
              className="accent-indigo-400"
            />
            <span className="text-indigo-400">C-S 双参数</span>
          </label>
        </div>
      </div>

      {/* Polar Plot */}
      <div className="relative aspect-square max-w-[280px] mx-auto">
        <svg viewBox="0 0 200 200" className="w-full">
          {/* Background grid */}
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <circle cx="100" cy="100" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

          {/* Axes */}
          <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

          {/* Labels */}
          <text x="100" y="15" textAnchor="middle" fill="#888" fontSize="8">0° (前向)</text>
          <text x="100" y="195" textAnchor="middle" fill="#888" fontSize="8">180° (后向)</text>
          <text x="10" y="103" textAnchor="middle" fill="#888" fontSize="8">90°</text>
          <text x="190" y="103" textAnchor="middle" fill="#888" fontSize="8">90°</text>

          {/* Incident direction arrow */}
          <line x1="100" y1="180" x2="100" y2="140" stroke="#666" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
              <polygon points="0 0, 6 2, 0 4" fill="#666" />
            </marker>
          </defs>

          {/* HG Phase function */}
          {showHG && (
            <path
              d={data.points.map((p, i) => {
                const r = (p.hg / data.maxHG) * scale;
                const angleRad = ((p.angle - 90) * Math.PI) / 180;
                const x = 100 + r * Math.cos(angleRad);
                const y = 100 + r * Math.sin(angleRad);
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="rgba(168,85,247,0.15)"
              stroke="#a855f7"
              strokeWidth="2"
            />
          )}

          {/* CS Phase function */}
          {showCS && (
            <path
              d={data.points.map((p, i) => {
                const r = (p.cs / data.maxHG) * scale; // normalize to same scale
                const angleRad = ((p.angle - 90) * Math.PI) / 180;
                const x = 100 + r * Math.cos(angleRad);
                const y = 100 + r * Math.sin(angleRad);
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ')}
              fill="rgba(99,102,241,0.1)"
              stroke="#6366f1"
              strokeWidth="1.5"
              strokeDasharray="4,2"
            />
          )}

          {/* Center dot */}
          <circle cx="100" cy="100" r="2" fill="#fff" />
        </svg>
      </div>

      {/* Legend */}
      <div className="text-xs space-y-1">
        <p className="text-gray-400">
          <span className="inline-block w-3 h-3 rounded-full bg-purple-500 mr-2" />
          HG 函数: 单参数描述散射方向
        </p>
        {g > 0.8 && <p className="text-purple-300 text-[10px]">⚡ 强前向散射: 光主要沿原方向传播</p>}
        {g < 0.5 && g > 0 && <p className="text-yellow-300 text-[10px]">↔️ 中等各向异性: 散射方向较分散</p>}
        {g <= 0 && <p className="text-blue-300 text-[10px]">🔄 各向同性或后向散射</p>}
      </div>
    </div>
  );
}
