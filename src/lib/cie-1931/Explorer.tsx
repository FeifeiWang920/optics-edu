/**
 * CIE 1931 色品图 React 组件
 *
 * 提供交互式 CIE 1931 色品图组件，支持点击读取坐标、显示参考点和轨迹
 */

'use client';

import { useState, useEffect } from 'react';
import { SPECTRAL_LOCUS, PLANCKIAN_LOCUS, SRGB_PRIMARIES, WHITEPOINTS, CANVAS_CONFIG } from './constants';
import {
  xyToRgb,
  wavelengthToHsl,
  cieToCanvas,
  canvasToCie,
  isInsideSRGBGamut,
} from './utils';
import { generateCIEChromaticityDataURL } from './generator';

export interface CIE1931ExplorerProps {
  /** 组件宽度（CSS 值，如 '520px' 或 '100%'） */
  width?: string;
  /** 点击回调，返回选中的色品坐标 */
  onPointSelect?: (point: { x: number; y: number; label: string }) => void;
  /** 是否显示光谱轨迹波长标签 */
  showWavelengthLabels?: boolean;
  /** 是否显示普朗克轨迹 */
  showPlanckianLocus?: boolean;
  /** 是否显示 sRGB 色域三角形 */
  showSRGBGamut?: boolean;
  /** 是否显示参考白点 */
  showWhitePoints?: boolean;
  /** 自定义参考点 */
  customPoints?: Array<{ x: number; y: number; label: string; desc?: string }>;
  /** 画布配置覆盖 */
  canvasConfig?: Partial<typeof CANVAS_CONFIG>;
}

export default function CIE1931Explorer({
  width = '100%',
  onPointSelect,
  showWavelengthLabels = true,
  showPlanckianLocus = true,
  showSRGBGamut = true,
  showWhitePoints = true,
  customPoints = [],
  canvasConfig,
}: CIE1931ExplorerProps) {
  const [point, setPoint] = useState({ x: 0.3127, y: 0.3290, label: 'D65 白光' });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [hoverPoint, setHoverPoint] = useState<{ x: number; y: number } | null>(null);

  const config = { ...CANVAS_CONFIG, ...canvasConfig };
  const { width: canvasW, height: canvasH, padding, xMin, xMax, yMin, yMax } = config;

  // 生成色品图背景
  useEffect(() => {
    setImageUrl(generateCIEChromaticityDataURL(canvasConfig));
  }, [canvasConfig]);

  // 坐标转换函数
  const getPointFromEvent = (e: React.MouseEvent<SVGSVGElement>): { x: number; y: number } | null => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();

    // 获取点击位置相对于 SVG 的坐标
    const svgX = e.clientX - rect.left;
    const svgY = e.clientY - rect.top;

    // 转换为画布像素坐标（考虑 viewBox）
    const px = (svgX / rect.width) * canvasW;
    const py = (svgY / rect.height) * canvasH;

    // 检查是否在绘图区域内
    if (px < padding || px > canvasW - padding || py < padding || py > canvasH - padding) {
      return null;
    }

    // 转换为 CIE 色品坐标
    const [cx, cy] = canvasToCie(px, py, config);

    return {
      x: Math.round(cx * 10000) / 10000,
      y: Math.round(cy * 10000) / 10000,
    };
  };

  // 处理 SVG 点击
  const handleSVGClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const newPoint = getPointFromEvent(e);
    if (newPoint) {
      const pointWithLabel = { ...newPoint, label: '自定义点' };
      setPoint(pointWithLabel);
      onPointSelect?.(pointWithLabel);
    }
  };

  // 处理鼠标移动（显示悬停坐标）
  const handleSVGMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const newPoint = getPointFromEvent(e);
    setHoverPoint(newPoint);
  };

  // 处理鼠标离开
  const handleSVGMouseLeave = () => {
    setHoverPoint(null);
  };

  const xTicks = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];
  const yTicks = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
  const wavelengthLabels = [420, 460, 490, 520, 550, 580, 620, 700];
  const cctLabels = [[3000, 0.4369, 0.4041], [4000, 0.3804, 0.3768], [6000, 0.3221, 0.3318], [10000, 0.2807, 0.2883]] as const;

  return (
    <div className="glass-panel p-6 space-y-5">
      {/* 标题和信息栏 */}
      <div className="flex justify-between items-baseline flex-wrap gap-2">
        <h3 className="text-xl font-bold text-white">CIE 1931 色品图</h3>
        <div className="flex gap-4 text-[10px] font-mono text-primary-400">
          <span>x = {(hoverPoint?.x ?? point.x).toFixed(4)}</span>
          <span>y = {(hoverPoint?.y ?? point.y).toFixed(4)}</span>
          <span className="text-gray-500">{hoverPoint ? '悬停' : point.label}</span>
        </div>
      </div>

      {/* 说明文字 */}
      <p className="text-xs text-gray-500">
        基于 CIE 1931 2° 标准色度观察者数据（CIE 15:2004）。点击图表可读取色品坐标。
      </p>

      {/* 色品图 SVG */}
      <div
        className="relative rounded-xl overflow-hidden border border-white/10 cursor-crosshair"
        style={{ background: '#e8e8e8', width }}
      >
        <svg
          viewBox={`0 0 ${canvasW} ${canvasH}`}
          className="w-full"
          onClick={handleSVGClick}
          onMouseMove={handleSVGMouseMove}
          onMouseLeave={handleSVGMouseLeave}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 背景 */}
          <rect x="0" y="0" width={canvasW} height={canvasH} fill="#e8e8e8" />

          {/* 色品图图像 */}
          {imageUrl && <image href={imageUrl} x="0" y="0" width={canvasW} height={canvasH} />}

          {/* 网格线 */}
          {xTicks.slice(1, -1).map((x) => {
            const [px, py0] = cieToCanvas(x, yMin, config);
            const [, py1] = cieToCanvas(x, yMax, config);
            return (
              <line
                key={`gx${x}`}
                x1={px}
                y1={py0}
                x2={px}
                y2={py1}
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="0.5"
              />
            );
          })}
          {yTicks.slice(1, -1).map((y) => {
            const [px0, py] = cieToCanvas(xMin, y, config);
            const [px1] = cieToCanvas(xMax, y, config);
            return (
              <line
                key={`gy${y}`}
                x1={px0}
                y1={py}
                x2={px1}
                y2={py}
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="0.5"
              />
            );
          })}

          {/* 坐标轴 */}
          <line
            x1={padding}
            y1={canvasH - padding}
            x2={canvasW - padding}
            y2={canvasH - padding}
            stroke="rgba(0,0,0,0.5)"
            strokeWidth="1"
          />
          <line
            x1={padding}
            y1={canvasH - padding}
            x2={padding}
            y2={padding}
            stroke="rgba(0,0,0,0.5)"
            strokeWidth="1"
          />

          {/* 坐标轴标签 */}
          {xTicks.map((x) => {
            const [px, py] = cieToCanvas(x, 0, config);
            return (
              <text
                key={`tx${x}`}
                x={px}
                y={py + 16}
                textAnchor="middle"
                fill="#444"
                fontSize="10"
              >
                {x}
              </text>
            );
          })}
          {yTicks.map((y) => {
            const [px, py] = cieToCanvas(0, y, config);
            return (
              <text
                key={`ty${y}`}
                x={px - 10}
                y={py + 4}
                textAnchor="end"
                fill="#444"
                fontSize="10"
              >
                {y}
              </text>
            );
          })}
          <text x={canvasW / 2} y={canvasH - 10} textAnchor="middle" fill="#333" fontSize="11">
            x
          </text>
          <text x={14} y={canvasH / 2} textAnchor="middle" fill="#333" fontSize="11" transform={`rotate(-90 14 ${canvasH / 2})`}>
            y
          </text>

          {/* 光谱轨迹轮廓 */}
          {SPECTRAL_LOCUS.slice(0, -1).map(([nm, x, y], i) => {
            const [px1, py1] = cieToCanvas(x, y, config);
            const [px2, py2] = cieToCanvas(SPECTRAL_LOCUS[i + 1][1], SPECTRAL_LOCUS[i + 1][2], config);
            return (
              <line key={nm} x1={px1} y1={py1} x2={px2} y2={py2} stroke={wavelengthToHsl(nm)} strokeWidth="1.5" />
            );
          })}

          {/* 紫色边界线 */}
          {(() => {
            const [px1, py1] = cieToCanvas(SPECTRAL_LOCUS[0][1], SPECTRAL_LOCUS[0][2], config);
            const [px2, py2] = cieToCanvas(
              SPECTRAL_LOCUS[SPECTRAL_LOCUS.length - 1][1],
              SPECTRAL_LOCUS[SPECTRAL_LOCUS.length - 1][2],
              config
            );
            return (
              <line
                x1={px1}
                y1={py1}
                x2={px2}
                y2={py2}
                stroke="#8866aa"
                strokeWidth="1"
                strokeDasharray="4,2"
                opacity="0.8"
              />
            );
          })()}

          {/* sRGB 色域三角形 */}
          {showSRGBGamut && (() => {
            const [redX, redY] = cieToCanvas(SRGB_PRIMARIES.red.x, SRGB_PRIMARIES.red.y, config);
            const [greenX, greenY] = cieToCanvas(SRGB_PRIMARIES.green.x, SRGB_PRIMARIES.green.y, config);
            const [blueX, blueY] = cieToCanvas(SRGB_PRIMARIES.blue.x, SRGB_PRIMARIES.blue.y, config);
            return (
              <g opacity="0.6">
                <line x1={redX} y1={redY} x2={greenX} y2={greenY} stroke="#2ecc71" strokeWidth="1" strokeDasharray="2,2" />
                <line x1={greenX} y1={greenY} x2={blueX} y2={blueY} stroke="#2ecc71" strokeWidth="1" strokeDasharray="2,2" />
                <line x1={blueX} y1={blueY} x2={redX} y2={redY} stroke="#2ecc71" strokeWidth="1" strokeDasharray="2,2" />
                <text x={greenX + 8} y={greenY - 5} fill="#2ecc71" fontSize="8" fontWeight="bold">
                  sRGB 色域
                </text>
              </g>
            );
          })()}

          {/* 波长标签 */}
          {showWavelengthLabels &&
            wavelengthLabels.map((nm) => {
              const entry = SPECTRAL_LOCUS.find(([w]) => w === nm);
              if (!entry) return null;
              const [px, py] = cieToCanvas(entry[1], entry[2], config);
              const isLeft = nm < 510;
              const isBottom = nm >= 650;
              const offsetX = isLeft ? -14 : 6;
              const offsetY = isBottom ? 14 : -4;
              return (
                <g key={`wl${nm}`}>
                  <circle cx={px} cy={py} r="1.5" fill={wavelengthToHsl(nm)} />
                  <text
                    x={px + offsetX}
                    y={py + offsetY}
                    fill={wavelengthToHsl(nm)}
                    fontSize="9"
                    fontWeight="500"
                    textAnchor={isLeft ? 'end' : 'start'}
                  >
                    {nm}
                  </text>
                </g>
              );
            })}

          {/* 普朗克轨迹 */}
          {showPlanckianLocus &&
            PLANCKIAN_LOCUS.slice(0, -1).map(([cct, x, y], i) => {
              const [px1, py1] = cieToCanvas(x, y, config);
              const [px2, py2] = cieToCanvas(PLANCKIAN_LOCUS[i + 1][1], PLANCKIAN_LOCUS[i + 1][2], config);
              return (
                <line key={cct} x1={px1} y1={py1} x2={px2} y2={py2} stroke="#333" strokeWidth="1.5" />
              );
            })}

          {/* 色温标签 */}
          {showPlanckianLocus &&
            cctLabels.map(([cct, x, y]) => {
              const [px, py] = cieToCanvas(x as number, y as number, config);
              return (
                <text key={cct} x={px + 4} y={py + 12} fill="#333" fontSize="8">
                  {cct}K
                </text>
              );
            })}

          {/* 参考白点 */}
          {showWhitePoints &&
            Object.entries(WHITEPOINTS).map(([key, { x, y, name, desc }]) => {
              const [px, py] = cieToCanvas(x, y, config);
              return (
                <g key={key}>
                  <circle cx={px} cy={py} r="4" fill="none" stroke="#000" strokeWidth="1.5" />
                  <circle cx={px} cy={py} r="1.5" fill="#000" />
                  <text x={px + 8} y={py - 2} fill="#000" fontSize="9" fontWeight="bold">
                    {name}
                  </text>
                  <text x={px + 8} y={py + 9} fill="#555" fontSize="7">
                    {desc}
                  </text>
                </g>
              );
            })}

          {/* 自定义参考点 */}
          {customPoints.map(({ x, y, label, desc }, index) => {
            const [px, py] = cieToCanvas(x, y, config);
            return (
              <g key={`custom-${index}`}>
                <circle cx={px} cy={py} r="4" fill="none" stroke="#0066cc" strokeWidth="1.5" />
                <circle cx={px} cy={py} r="1.5" fill="#0066cc" />
                <text x={px + 8} y={py - 2} fill="#0066cc" fontSize="9" fontWeight="bold">
                  {label}
                </text>
                {desc && <text x={px + 8} y={py + 9} fill="#555" fontSize="7">{desc}</text>}
              </g>
            );
          })}

          {/* 当前选中点 */}
          {(() => {
            const [px, py] = cieToCanvas(point.x, point.y, config);
            return (
              <g>
                <circle cx={px} cy={py} r="7" fill="none" stroke="#0066cc" strokeWidth="2" />
                <circle cx={px} cy={py} r="2.5" fill="#0066cc" />
              </g>
            );
          })()}

          {/* 鼠标悬停点 */}
          {hoverPoint && (() => {
            const [px, py] = cieToCanvas(hoverPoint.x, hoverPoint.y, config);
            return (
              <g opacity="0.6">
                <circle cx={px} cy={py} r="5" fill="none" stroke="#ff6600" strokeWidth="1.5" />
                <circle cx={px} cy={py} r="1.5" fill="#ff6600" />
              </g>
            );
          })()}
        </svg>
      </div>

      {/* 图例说明 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-gradient-to-r from-purple-500 via-green-500 to-red-500 rounded" />
          <span className="text-gray-400">光谱轨迹（纯单色光 380-780nm）</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-gray-800 rounded" />
          <span className="text-gray-400">普朗克轨迹（黑体辐射色温曲线）</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 border-2 border-green-400 border-dashed" />
          <span className="text-gray-400">sRGB 显示色域边界</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-blue-400" />
          <span className="text-gray-400">可显示颜色 vs 超出色域颜色（需压缩）</span>
        </div>
      </div>

      <p className="text-xs text-gray-500 italic">
        注：绿色区域的分界线是 sRGB 显示色域的边界。520nm 等高饱和度光谱色超出 sRGB 色域，被压缩到可显示范围内，这会在边界处产生视觉过渡。使用广色域显示器可显示更多颜色。
      </p>
    </div>
  );
}