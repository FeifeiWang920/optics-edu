"use client";

import { useState, useEffect } from "react";

// CIE 1931 2-degree standard observer spectral locus data (from reference implementation)
const SPECTRAL_LOCUS: [number, number, number][] = [
  [380, 0.17411, 0.00496],
  [385, 0.17401, 0.00498],
  [390, 0.17380, 0.00492],
  [395, 0.17356, 0.00492],
  [400, 0.17334, 0.00480],
  [405, 0.17302, 0.00478],
  [410, 0.17258, 0.00480],
  [415, 0.17209, 0.00483],
  [420, 0.17141, 0.00510],
  [425, 0.17030, 0.00579],
  [430, 0.16888, 0.00690],
  [435, 0.16690, 0.00855],
  [440, 0.16441, 0.01086],
  [445, 0.16111, 0.01379],
  [450, 0.15664, 0.01771],
  [455, 0.15099, 0.02274],
  [460, 0.14396, 0.02970],
  [465, 0.13550, 0.03988],
  [470, 0.12412, 0.05780],
  [475, 0.10960, 0.08684],
  [480, 0.09129, 0.13270],
  [485, 0.06871, 0.20072],
  [490, 0.04539, 0.29498],
  [495, 0.02346, 0.41270],
  [500, 0.00817, 0.53842],
  [505, 0.00386, 0.65482],
  [510, 0.01387, 0.75019],
  [515, 0.03885, 0.81202],
  [520, 0.07430, 0.83380],
  [525, 0.11416, 0.82621],
  [530, 0.15472, 0.80586],
  [535, 0.19288, 0.78163],
  [540, 0.22962, 0.75433],
  [545, 0.26578, 0.72432],
  [550, 0.30160, 0.69231],
  [555, 0.33736, 0.65885],
  [560, 0.37310, 0.62445],
  [565, 0.40873, 0.58961],
  [570, 0.44406, 0.55472],
  [575, 0.47878, 0.52020],
  [580, 0.51249, 0.48659],
  [585, 0.54479, 0.45443],
  [590, 0.57515, 0.42423],
  [595, 0.60293, 0.39650],
  [600, 0.62704, 0.37249],
  [605, 0.64823, 0.35140],
  [610, 0.66576, 0.33401],
  [615, 0.68008, 0.31975],
  [620, 0.69151, 0.30834],
  [625, 0.70061, 0.29930],
  [630, 0.70792, 0.29203],
  [635, 0.71403, 0.28593],
  [640, 0.71903, 0.28094],
  [645, 0.72303, 0.27695],
  [650, 0.72599, 0.27401],
  [655, 0.72827, 0.27173],
  [660, 0.72997, 0.27003],
  [665, 0.73109, 0.26891],
  [670, 0.73199, 0.26801],
  [675, 0.73272, 0.26728],
  [680, 0.73342, 0.26658],
  [685, 0.73405, 0.26595],
  [690, 0.73439, 0.26561],
  [695, 0.73459, 0.26541],
  [700, 0.73469, 0.26531],
  [705, 0.73469, 0.26531],
  [710, 0.73469, 0.26531],
  [715, 0.73469, 0.26531],
  [720, 0.73469, 0.26531],
  [725, 0.73469, 0.26531],
  [730, 0.73469, 0.26531],
  [735, 0.73469, 0.26531],
  [740, 0.73469, 0.26531],
  [745, 0.73469, 0.26531],
  [750, 0.73469, 0.26531],
  [755, 0.73469, 0.26531],
  [760, 0.73469, 0.26531],
  [765, 0.73469, 0.26531],
  [770, 0.73469, 0.26531],
  [775, 0.73469, 0.26531],
  [780, 0.73469, 0.26531],
];

// Planckian locus data
const PLANCKIAN_LOCUS: [number, number, number][] = [
  [1000, 0.6528, 0.3444],
  [1500, 0.5857, 0.3931],
  [2000, 0.5267, 0.4133],
  [2500, 0.4770, 0.4137],
  [3000, 0.4369, 0.4041],
  [3500, 0.4053, 0.3907],
  [4000, 0.3804, 0.3768],
  [4500, 0.3608, 0.3636],
  [5000, 0.3451, 0.3516],
  [5500, 0.3325, 0.3411],
  [6000, 0.3221, 0.3318],
  [6500, 0.3135, 0.3237],
  [7000, 0.3064, 0.3166],
  [8000, 0.2952, 0.3049],
  [9000, 0.2869, 0.2956],
  [10000, 0.2807, 0.2883],
  [15000, 0.2622, 0.2660],
];

// Canvas dimensions
const CANVAS_W = 520;
const CANVAS_H = 500;
const PAD = 50;

// CIE coordinate range
const X_MIN = 0, X_MAX = 0.8, Y_MIN = 0, Y_MAX = 0.9;

// sRGB primaries in xy
const SRGB_RED = { x: 0.64, y: 0.33 };
const SRGB_GREEN = { x: 0.30, y: 0.60 };
const SRGB_BLUE = { x: 0.15, y: 0.06 };

// Check if point is inside the spectral locus
function isInsideLocus(x: number, y: number, locus: [number, number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = locus.length - 1; i < locus.length; j = i++) {
    const xi = locus[i][1], yi = locus[i][2];
    const xj = locus[j][1], yj = locus[j][2];
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  return inside;
}

// CIE 1931 chromaticity diagram color rendering
// Uses XYZ to sRGB matrix conversion with proper gamma correction
// Based on CIE 15: Colorimetry standard and reference implementations
function xyToApproxRgb(x: number, y: number): [number, number, number] {
  // Convert CIE xy chromaticity to XYZ using the correct formula
  // xyY -> XYZ: X = (x/y) * Y, Z = ((1-x-y)/y) * Y
  // Using Y = 1.0 (constant luminance) for the chromaticity diagram visualization
  const Y = 1.0;
  const X = (x / y) * Y;
  const Z = ((1 - x - y) / y) * Y;

  // XYZ to linear sRGB conversion matrix (column-major order)
  // These coefficients are from the sRGB specification (IEC 61966-2-1)
  let r = 3.2404542 * X - 1.5371385 * Y - 0.4985314 * Z;
  let g = -0.9692660 * X + 1.8760108 * Y + 0.0415560 * Z;
  let b = 0.0556434 * X - 0.2040259 * Y + 1.0572252 * Z;

  // Handle out-of-gamut colors with improved algorithm
  // First handle negative components (clip to 0) to preserve hue
  r = Math.max(0, r);
  g = Math.max(0, g);
  b = Math.max(0, b);

  // Then normalize positive values that exceed 1.0
  // This preserves hue and creates smoother transitions at gamut boundaries
  const maxComponent = Math.max(r, g, b);
  if (maxComponent > 1.0) {
    const scale = 1.0 / maxComponent;
    r *= scale;
    g *= scale;
    b *= scale;
  }

  // Apply sRGB gamma correction (EOTF) per IEC 61966-2-1
  const gammaCorrect = (c: number): number => {
    return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  };

  return [gammaCorrect(r), gammaCorrect(g), gammaCorrect(b)];
}

// Get color for wavelength using standard spectral locus colors
// Based on CIE 1931 2° standard observer data
function wlToHsl(nm: number): string {
  // More accurate spectral color mapping based on wavelength
  if (nm < 380) return "hsl(280, 100%, 50%)";
  if (nm < 420) return `hsl(${260 + (nm - 380) * 0.5}, 100%, ${50 + (nm - 380) * 0.1}%)`;
  if (nm < 450) return `hsl(${240 + (nm - 420) * 0.67}, 100%, ${55 + (nm - 420) * 0.17}%)`;
  if (nm < 490) return `hsl(${220 - (nm - 450) * 1.25}, 100%, ${55 + (nm - 450) * 0.25}%)`;
  if (nm < 510) return `hsl(${180 - (nm - 490) * 2}, 100%, ${50 + (nm - 490) * 0.5}%)`;
  if (nm < 550) return `hsl(${140 - (nm - 510) * 2.5}, 100%, ${55 - (nm - 510) * 0.25}%)`;
  if (nm < 580) return `hsl(${60 - (nm - 550) * 1.33}, 100%, ${55 - (nm - 550) * 0.17}%)`;
  if (nm < 620) return `hsl(${35 - (nm - 580) * 0.5}, 100%, ${55 - (nm - 580) * 0.125}%)`;
  if (nm < 700) return `hsl(${10 - (nm - 620) * 0.25}, 100%, ${50 - (nm - 620) * 0.0625}%)`;
  return "hsl(0, 100%, 50%)";
}

// Convert CIE (x,y) to canvas pixel coordinates
function cieToCanvas(cx: number, cy: number): [number, number] {
  const px = PAD + (cx - X_MIN) / (X_MAX - X_MIN) * (CANVAS_W - PAD * 2);
  const py = (CANVAS_H - PAD) - (cy - Y_MIN) / (Y_MAX - Y_MIN) * (CANVAS_H - PAD * 2);
  return [px, py];
}

// Generate the CIE gamut image (用于初始化)
function generateCIEGamutImage(): string | null {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Light gray background
  ctx.fillStyle = "#e8e8e8";
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  const imageData = ctx.createImageData(CANVAS_W, CANVAS_H);
  const data = imageData.data;

  const plotLeft = PAD;
  const plotRight = CANVAS_W - PAD;
  const plotTop = PAD;
  const plotBottom = CANVAS_H - PAD;
  const plotWidth = plotRight - plotLeft;
  const plotHeight = plotBottom - plotTop;

  for (let py = 0; py < CANVAS_H; py++) {
    for (let px = 0; px < CANVAS_W; px++) {
      const idx = (py * CANVAS_W + px) * 4;

      if (px >= plotLeft && px < plotRight && py >= plotTop && py < plotBottom) {
        const cx = X_MIN + ((px - plotLeft) / plotWidth) * (X_MAX - X_MIN);
        const cy = Y_MAX - ((py - plotTop) / plotHeight) * (Y_MAX - Y_MIN);

        if (isInsideLocus(cx, cy, SPECTRAL_LOCUS)) {
          const [r, g, b] = xyToApproxRgb(cx, cy);

          data[idx] = Math.round(r * 255);
          data[idx + 1] = Math.round(g * 255);
          data[idx + 2] = Math.round(b * 255);
          data[idx + 3] = 255;
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
}

export default function CIE1931Explorer() {
  const [point, setPoint] = useState({ x: 0.3127, y: 0.3290, label: "D65 白光" });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setImageUrl(generateCIEGamutImage());
    }
  }, []);

  const handleSVGClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width * CANVAS_W;
    const py = (e.clientY - rect.top) / rect.height * CANVAS_H;

    const plotLeft = PAD, plotRight = CANVAS_W - PAD;
    const plotTop = PAD, plotBottom = CANVAS_H - PAD;

    if (px >= plotLeft && px <= plotRight && py >= plotTop && py <= plotBottom) {
      const cx = X_MIN + ((px - plotLeft) / (plotRight - plotLeft)) * (X_MAX - X_MIN);
      const cy = Y_MAX - ((py - plotTop) / (plotBottom - plotTop)) * (Y_MAX - Y_MIN);
      setPoint({ x: Math.round(cx * 10000) / 10000, y: Math.round(cy * 10000) / 10000, label: "自定义点" });
    }
  };

  const xTicks = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];
  const yTicks = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

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
      <p className="text-xs text-gray-500">
        基于 CIE 1931 2° 标准色度观察者数据（CIE 15:2004）。点击图表可读取色品坐标。
      </p>

      <div className="relative rounded-xl overflow-hidden border border-white/10 cursor-crosshair" style={{ background: "#e8e8e8" }}>
        <svg
          viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          className="w-full"
          onClick={handleSVGClick}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background */}
          <rect x="0" y="0" width={CANVAS_W} height={CANVAS_H} fill="#e8e8e8"/>

          {/* Color gamut image */}
          {imageUrl && (
            <image href={imageUrl} x="0" y="0" width={CANVAS_W} height={CANVAS_H}/>
          )}

          {/* Grid lines */}
          {xTicks.slice(1, -1).map(x => {
            const [px, py0] = cieToCanvas(x, Y_MIN);
            const [, py1] = cieToCanvas(x, Y_MAX);
            return <line key={`gx${x}`} x1={px} y1={py0} x2={px} y2={py1} stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>;
          })}
          {yTicks.slice(1, -1).map(y => {
            const [px0, py] = cieToCanvas(X_MIN, y);
            const [px1] = cieToCanvas(X_MAX, y);
            return <line key={`gy${y}`} x1={px0} y1={py} x2={px1} y2={py} stroke="rgba(0,0,0,0.1)" strokeWidth="0.5"/>;
          })}

          {/* Axes */}
          <line x1={PAD} y1={CANVAS_H - PAD} x2={CANVAS_W - PAD} y2={CANVAS_H - PAD} stroke="rgba(0,0,0,0.5)" strokeWidth="1"/>
          <line x1={PAD} y1={CANVAS_H - PAD} x2={PAD} y2={PAD} stroke="rgba(0,0,0,0.5)" strokeWidth="1"/>

          {/* Axis labels */}
          {xTicks.map(x => {
            const [px, py] = cieToCanvas(x, 0);
            return <text key={`tx${x}`} x={px} y={py + 16} textAnchor="middle" fill="#444" fontSize="10">{x}</text>;
          })}
          {yTicks.map(y => {
            const [px, py] = cieToCanvas(0, y);
            return <text key={`ty${y}`} x={px - 10} y={py + 4} textAnchor="end" fill="#444" fontSize="10">{y}</text>;
          })}
          <text x={CANVAS_W / 2} y={CANVAS_H - 10} textAnchor="middle" fill="#333" fontSize="11">x</text>
          <text x={14} y={CANVAS_H / 2} textAnchor="middle" fill="#333" fontSize="11" transform={`rotate(-90 14 ${CANVAS_H / 2})`}>y</text>

          {/* Spectral locus outline */}
          {SPECTRAL_LOCUS.slice(0, -1).map(([nm, x, y], i) => {
            const [px1, py1] = cieToCanvas(x, y);
            const [px2, py2] = cieToCanvas(SPECTRAL_LOCUS[i + 1][1], SPECTRAL_LOCUS[i + 1][2]);
            return <line key={nm} x1={px1} y1={py1} x2={px2} y2={py2} stroke={wlToHsl(nm)} strokeWidth="1.5"/>;
          })}

          {/* Purple boundary line */}
          {(() => {
            const [px1, py1] = cieToCanvas(SPECTRAL_LOCUS[0][1], SPECTRAL_LOCUS[0][2]);
            const [px2, py2] = cieToCanvas(SPECTRAL_LOCUS[SPECTRAL_LOCUS.length - 1][1], SPECTRAL_LOCUS[SPECTRAL_LOCUS.length - 1][2]);
            return <line x1={px1} y1={py1} x2={px2} y2={py2} stroke="#8866aa" strokeWidth="1" strokeDasharray="4,2" opacity="0.8"/>;
          })()}

          {/* sRGB gamut triangle - 显示色域边界 */}
          {(() => {
            const [redX, redY] = cieToCanvas(SRGB_RED.x, SRGB_RED.y);
            const [greenX, greenY] = cieToCanvas(SRGB_GREEN.x, SRGB_GREEN.y);
            const [blueX, blueY] = cieToCanvas(SRGB_BLUE.x, SRGB_BLUE.y);
            return (
              <g opacity="0.6">
                <line x1={redX} y1={redY} x2={greenX} y2={greenY} stroke="#2ecc71" strokeWidth="1" strokeDasharray="2,2"/>
                <line x1={greenX} y1={greenY} x2={blueX} y2={blueY} stroke="#2ecc71" strokeWidth="1" strokeDasharray="2,2"/>
                <line x1={blueX} y1={blueY} x2={redX} y2={redY} stroke="#2ecc71" strokeWidth="1" strokeDasharray="2,2"/>
                {/* sRGB 标签 */}
                <text x={greenX + 8} y={greenY - 5} fill="#2ecc71" fontSize="8" fontWeight="bold">sRGB 色域</text>
              </g>
            );
          })()}

          {/* Wavelength labels */}
          {[420, 460, 490, 520, 550, 580, 620, 700].map(nm => {
            const entry = SPECTRAL_LOCUS.find(([w]) => w === nm);
            if (!entry) return null;
            const [px, py] = cieToCanvas(entry[1], entry[2]);
            const isLeft = nm < 510;
            const isBottom = nm >= 650;
            const offsetX = isLeft ? -14 : 6;
            const offsetY = isBottom ? 14 : -4;
            return (
              <g key={`wl${nm}`}>
                <circle cx={px} cy={py} r="1.5" fill={wlToHsl(nm)}/>
                <text x={px + offsetX} y={py + offsetY} fill={wlToHsl(nm)} fontSize="9" fontWeight="500" textAnchor={isLeft ? "end" : "start"}>{nm}</text>
              </g>
            );
          })}

          {/* Planckian locus */}
          {PLANCKIAN_LOCUS.slice(0, -1).map(([cct, x, y], i) => {
            const [px1, py1] = cieToCanvas(x, y);
            const [px2, py2] = cieToCanvas(PLANCKIAN_LOCUS[i + 1][1], PLANCKIAN_LOCUS[i + 1][2]);
            return <line key={cct} x1={px1} y1={py1} x2={px2} y2={py2} stroke="#333" strokeWidth="1.5"/>;
          })}

          {/* CCT labels */}
          {[[3000, 0.4369, 0.4041], [4000, 0.3804, 0.3768], [6000, 0.3221, 0.3318], [10000, 0.2807, 0.2883]].map(([cct, x, y]) => {
            const [px, py] = cieToCanvas(x as number, y as number);
            return <text key={cct} x={px + 4} y={py + 12} fill="#333" fontSize="8">{cct}K</text>;
          })}

          {/* Reference points */}
          {[
            { x: 0.3127, y: 0.3290, label: "D65", desc: "标准日光" },
            { x: 0.3333, y: 0.3333, label: "E", desc: "等能白" },
          ].map(({ x, y, label, desc }) => {
            const [px, py] = cieToCanvas(x, y);
            return (
              <g key={label}>
                <circle cx={px} cy={py} r="4" fill="none" stroke="#000" strokeWidth="1.5"/>
                <circle cx={px} cy={py} r="1.5" fill="#000"/>
                <text x={px + 8} y={py - 2} fill="#000" fontSize="9" fontWeight="bold">{label}</text>
                <text x={px + 8} y={py + 9} fill="#555" fontSize="7">{desc}</text>
              </g>
            );
          })}

          {/* Selected point */}
          {(() => {
            const [px, py] = cieToCanvas(point.x, point.y);
            return (
              <g>
                <circle cx={px} cy={py} r="7" fill="none" stroke="#0066cc" strokeWidth="2"/>
                <circle cx={px} cy={py} r="2.5" fill="#0066cc"/>
              </g>
            );
          })()}
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-gradient-to-r from-purple-500 via-green-500 to-red-500 rounded"/>
          <span className="text-gray-400">光谱轨迹（纯单色光 380-780nm）</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-gray-800 rounded"/>
          <span className="text-gray-400">普朗克轨迹（黑体辐射色温曲线）</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 border-2 border-green-400 border-dashed"/>
          <span className="text-gray-400">sRGB 显示色域边界</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-blue-400"/>
          <span className="text-gray-400">可显示颜色 vs 超出色域颜色（需压缩）</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 italic">
        注：绿色区域的分界线是 sRGB 显示色域的边界。520nm 等高饱和度光谱色超出 sRGB 色域，被压缩到可显示范围内，这会在边界处产生视觉过渡。使用广色域显示器可显示更多颜色。
      </p>
    </div>
  );
}