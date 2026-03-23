"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Approximate CIE 1931 spectral locus points (wavelength → xy chromaticity)
// Data based on CIE 1931 2-degree standard observer
const SPECTRAL_LOCUS: [number, number, number][] = [
  [380, 0.1741, 0.0050],
  [390, 0.1738, 0.0102],
  [400, 0.1733, 0.0177],
  [410, 0.1726, 0.0297],
  [420, 0.1714, 0.0578],
  [430, 0.1689, 0.1168],
  [440, 0.1644, 0.2178],
  [450, 0.1566, 0.3620],
  [460, 0.1440, 0.4931],
  [470, 0.1241, 0.5923],
  [480, 0.0913, 0.6546],
  [490, 0.0454, 0.6936],
  [500, 0.0082, 0.7072],
  [510, 0.0139, 0.7067],
  [520, 0.0743, 0.7037],
  [530, 0.1547, 0.6916],
  [540, 0.2296, 0.6741],
  [550, 0.3016, 0.6529],
  [560, 0.3731, 0.6245],
  [570, 0.4441, 0.5547],
  [580, 0.5125, 0.4866],
  [590, 0.5752, 0.4242],
  [600, 0.6270, 0.3725],
  [610, 0.6658, 0.3340],
  [620, 0.6915, 0.3083],
  [630, 0.7079, 0.2920],
  [640, 0.7190, 0.2812],
  [650, 0.7260, 0.2742],
  [660, 0.7300, 0.2700],
  [670, 0.7320, 0.2680],
  [680, 0.7334, 0.2666],
  [690, 0.7344, 0.2656],
  [700, 0.7347, 0.2653],
  [710, 0.7347, 0.2653],
  [720, 0.7347, 0.2653],
  [730, 0.7347, 0.2653],
  [740, 0.7347, 0.2653],
  [750, 0.7347, 0.2653],
  [760, 0.7347, 0.2653],
  [770, 0.7347, 0.2653],
  [780, 0.7347, 0.2653],
];

// SVG canvas using xRange [0,0.8] yRange [0,0.9]
const SVG_W = 350;
const SVG_H = 350;
const PAD = 30;
const X_MIN = 0, X_MAX = 0.8, Y_MIN = 0, Y_MAX = 0.9;

function toSVG(cx: number, cy: number): [number, number] {
  const sx = PAD + (cx - X_MIN) / (X_MAX - X_MIN) * (SVG_W - PAD * 2);
  const sy = (SVG_H - PAD) - (cy - Y_MIN) / (Y_MAX - Y_MIN) * (SVG_H - PAD * 2);
  return [sx, sy];
}

// Wavelength to approximate RGB color for spectral locus coloring
function wlToColor(nm: number): string {
  if (nm < 380) return "#8800ff";
  if (nm < 420) return `hsl(${280 + (nm - 380) / 40 * 40},100%,45%)`;   // violet
  if (nm < 460) return `hsl(${240 + (nm - 420) / 40 * 30},100%,50%)`;   // blue
  if (nm < 490) return `hsl(${210 + (nm - 460) / 30 * 30},100%,50%)`;   // cyan
  if (nm < 530) return `hsl(${180 - (nm - 490) / 40 * 60},100%,45%)`;   // green
  if (nm < 570) return `hsl(${120 - (nm - 530) / 40 * 60},100%,45%)`;   // yellow-green to yellow
  if (nm < 600) return `hsl(${60 - (nm - 570) / 30 * 30},100%,50%)`;    // yellow to orange
  if (nm < 640) return `hsl(${30 - (nm - 600) / 40 * 30},100%,45%)`;    // orange to red
  return "#ff0000";
}

// Key automotive lighting chromaticity regions (simplified outlines)
const AUTO_REGIONS = [
  { name: "白色（前照灯）", color: "#ffffff", points: [[0.310,0.348],[0.380,0.348],[0.380,0.300],[0.310,0.300]] },
  { name: "琥珀色（转向灯）", color: "#f59e0b", points: [[0.544,0.452],[0.598,0.402],[0.586,0.386],[0.556,0.398]] },
  { name: "红色（制动灯）", color: "#ef4444", points: [[0.690,0.310],[0.720,0.258],[0.665,0.258],[0.640,0.340]] },
];

export default function CIE1931Explorer() {
  const [point, setPoint] = useState({ x: 0.3127, y: 0.3290, label: "D65 白光" });
  const [hoveredWl, setHoveredWl] = useState<number | null>(null);

  const handleSVGClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width * SVG_W;
    const py = (e.clientY - rect.top) / rect.height * SVG_H;
    // Convert to CIE coordinates
    const cx = X_MIN + (px - PAD) / (SVG_W - PAD * 2) * (X_MAX - X_MIN);
    const cy = Y_MIN + ((SVG_H - PAD) - py) / (SVG_H - PAD * 2) * (Y_MAX - Y_MIN);
    if (cx >= 0 && cx <= X_MAX && cy >= 0 && cy <= Y_MAX) {
      setPoint({ x: Math.round(cx * 1000) / 1000, y: Math.round(cy * 1000) / 1000, label: "自定义点" });
    }
  };

  // Build the spectral locus path
  const locusPoints = SPECTRAL_LOCUS.map(([, x, y]) => toSVG(x, y));
  const locusPathD = locusPoints.map(([sx, sy], i) => `${i === 0 ? "M" : "L"} ${sx.toFixed(1)} ${sy.toFixed(1)}`).join(" ") + " Z";

  // Tick marks
  const xTicks = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7];
  const yTicks = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];

  return (
    <div className="glass-panel p-6 space-y-5">
      <div className="flex justify-between items-baseline flex-wrap gap-2">
        <h3 className="text-xl font-bold text-white">CIE 1931 色品图</h3>
        <div className="flex gap-4 text-[10px] font-mono text-primary-400">
          <span>x = {point.x.toFixed(4)}</span>
          <span>y = {point.y.toFixed(4)}</span>
          <span className="text-gray-500">{point.label}</span>
        </div>
      </div>
      <p className="text-xs text-gray-500">基于 CIE 1931 标准色度观察者光谱轨迹数据绘制。点击图表可读取色品坐标。</p>

      <div className="relative bg-black/40 rounded-xl overflow-hidden border border-white/5 cursor-crosshair">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full"
          onClick={handleSVGClick}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Correct CIE gamut gradient: white center, spectral colors at edges */}
            <radialGradient id="cieCenter" cx="39%" cy="63%" r="65%" fx="39%" fy="62%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95"/>
              <stop offset="30%" stopColor="#ffffff" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
            </radialGradient>
            <linearGradient id="cieBlueGreen" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4400ff" stopOpacity="0.6"/>
              <stop offset="50%" stopColor="#00cc44" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#ffff00" stopOpacity="0.4"/>
            </linearGradient>
            <linearGradient id="cieRedOrange" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ff2200" stopOpacity="0.7"/>
              <stop offset="50%" stopColor="#ff8800" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
            </linearGradient>
            <clipPath id="cieClip">
              <path d={locusPathD}/>
            </clipPath>
          </defs>

          {/* Grid lines */}
          {xTicks.map(x => {
            const [sx, sy0] = toSVG(x, Y_MIN);
            const [, sy1] = toSVG(x, Y_MAX);
            return <line key={`gx${x}`} x1={sx} y1={sy0} x2={sx} y2={sy1} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>;
          })}
          {yTicks.map(y => {
            const [sx0, sy] = toSVG(X_MIN, y);
            const [sx1, ] = toSVG(X_MAX, y);
            return <line key={`gy${y}`} x1={sx0} y1={sy} x2={sx1} y2={sy} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>;
          })}

          {/* Axes */}
          {(() => { const [sx,sy] = toSVG(0, 0); const [sx2] = toSVG(0.8, 0); const [,sy2] = toSVG(0, 0.85); return (<>
            <line x1={sx} y1={sy} x2={sx2} y2={sy} stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
            <line x1={sx} y1={sy} x2={sx} y2={sy2} stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
          </>); })()}

          {/* Axis labels */}
          {xTicks.map(x => { const [sx, sy] = toSVG(x, 0); return <text key={`tx${x}`} x={sx} y={sy+12} textAnchor="middle" fill="#555" fontSize="9">{x}</text>; })}
          {yTicks.map(y => { const [sx, sy] = toSVG(0, y); return <text key={`ty${y}`} x={sx-6} y={sy+3} textAnchor="end" fill="#555" fontSize="9">{y}</text>; })}
          <text x={SVG_W / 2} y={SVG_H - 4} textAnchor="middle" fill="#666" fontSize="10">x（色品坐标）</text>
          <text x={12} y={SVG_H / 2} textAnchor="middle" fill="#666" fontSize="10" transform={`rotate(-90 12 ${SVG_H/2})`}>y（色品坐标）</text>

          {/* Gamut fill — layered gradients clipped to locus */}
          <rect x="0" y="0" width={SVG_W} height={SVG_H} fill="url(#cieBlueGreen)" clipPath="url(#cieClip)"/>
          <rect x="0" y="0" width={SVG_W} height={SVG_H} fill="url(#cieRedOrange)" clipPath="url(#cieClip)"/>
          <rect x="0" y="0" width={SVG_W} height={SVG_H} fill="url(#cieCenter)" clipPath="url(#cieClip)"/>

          {/* Spectral locus outline with color-coded segments */}
          {SPECTRAL_LOCUS.slice(0, -1).map(([nm, x, y], i) => {
            const [sx1, sy1] = toSVG(x, y);
            const [sx2, sy2] = toSVG(SPECTRAL_LOCUS[i + 1][1], SPECTRAL_LOCUS[i + 1][2]);
            return <line key={nm} x1={sx1} y1={sy1} x2={sx2} y2={sy2} stroke={wlToColor(nm)} strokeWidth="2.5"/>;
          })}
          {/* Purple line (closing line 380-780) */}
          {(() => {
            const [sx1, sy1] = toSVG(SPECTRAL_LOCUS[0][1], SPECTRAL_LOCUS[0][2]);
            const [sx2, sy2] = toSVG(SPECTRAL_LOCUS[SPECTRAL_LOCUS.length - 1][1], SPECTRAL_LOCUS[SPECTRAL_LOCUS.length - 1][2]);
            return <line x1={sx1} y1={sy1} x2={sx2} y2={sy2} stroke="#9933ff" strokeWidth="1.5" strokeDasharray="4,2" opacity="0.7"/>;
          })()}

          {/* Wavelength labels */}
          {[460, 490, 520, 560, 590, 620, 660].map(nm => {
            const entry = SPECTRAL_LOCUS.find(([w]) => w === nm);
            if (!entry) return null;
            const [sx, sy] = toSVG(entry[1], entry[2]);
            return (
              <g key={`wl${nm}`}>
                <circle cx={sx} cy={sy} r="2.5" fill={wlToColor(nm)}/>
                <text x={sx + 5} y={sy + 3} fill={wlToColor(nm)} fontSize="8">{nm}</text>
              </g>
            );
          })}

          {/* Automotive regulation zones */}
          {AUTO_REGIONS.map(({ name, color, points }) => {
            const d = points.map(([x, y]: number[], i: number) => {
              const [sx, sy] = toSVG(x, y);
              return `${i === 0 ? "M" : "L"} ${sx} ${sy}`;
            }).join(" ") + " Z";
            return (
              <g key={name}>
                <path d={d} fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" strokeDasharray="4,2"/>
              </g>
            );
          })}

          {/* Key reference points */}
          {[
            { x: 0.3127, y: 0.3290, label: "D65（标准日光）", color: "#ffffff" },
            { x: 0.3333, y: 0.3333, label: "E（等能白）", color: "#cccccc" },
          ].map(({ x, y, label, color }) => {
            const [sx, sy] = toSVG(x, y);
            return (
              <g key={label}>
                <circle cx={sx} cy={sy} r="4" fill="none" stroke={color} strokeWidth="1.5"/>
                <circle cx={sx} cy={sy} r="1.5" fill={color}/>
                <text x={sx + 6} y={sy - 4} fill={color} fontSize="8">{label}</text>
              </g>
            );
          })}

          {/* Planckian locus (CCT curve) — approximate key points */}
          {[
            [1500, 0.585, 0.393], [2000, 0.527, 0.413], [2500, 0.477, 0.413],
            [3000, 0.437, 0.404], [4000, 0.380, 0.377], [5000, 0.345, 0.352],
            [6500, 0.3127, 0.3290], [8000, 0.292, 0.309], [10000, 0.279, 0.292],
          ].map(([cct, x, y], i, arr) => {
            if (i === 0) return null;
            const [sx1, sy1] = toSVG(arr[i-1][1], arr[i-1][2]);
            const [sx2, sy2] = toSVG(x, y);
            return <line key={cct} x1={sx1} y1={sy1} x2={sx2} y2={sy2} stroke="#fbbf24" strokeWidth="1" strokeDasharray="3,2" opacity="0.6"/>;
          })}
          {/* CCT labels */}
          {[[3000, 0.437, 0.404], [6500, 0.3127, 0.329]].map(([cct, x, y]) => {
            const [sx, sy] = toSVG(x as number, y as number);
            return <text key={cct} x={sx + 4} y={sy + 3} fill="#fbbf24" fontSize="7.5" opacity="0.7">{cct}K</text>;
          })}

          {/* Selected point */}
          {(() => {
            const [sx, sy] = toSVG(point.x, point.y);
            return (
              <motion.g animate={{ cx: sx, cy: sy }}>
                <circle cx={sx} cy={sy} r="6" fill="none" stroke="#3b82f6" strokeWidth="1.5"/>
                <circle cx={sx} cy={sy} r="2.5" fill="#3b82f6"/>
              </motion.g>
            );
          })()}
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-1 bg-white rounded opacity-70"/>
          <span className="text-gray-400">光谱轨迹（纯单色光）</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-1 bg-yellow-400 rounded opacity-60" style={{borderStyle:"dashed", borderTop:"2px dashed"}}/>
          <span className="text-gray-400">普朗克轨迹（色温曲线）</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-3 border border-dashed border-amber-400 opacity-60"/>
          <span className="text-gray-400">车灯法规色度区域</span>
        </div>
      </div>
    </div>
  );
}
