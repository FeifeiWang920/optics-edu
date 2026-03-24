"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { CIE_1931_CMF_10NM } from "@/lib/colorimetry/data";
import {
  type ChartConfig,
  type CurveColor,
  generateSmoothPath,
  generateAreaPath,
  createWavelengthToX,
  createValueToY,
  getPlotDimensions,
} from "./utils";

// 图表配置
const CHART_CONFIG: ChartConfig = {
  width: 800,
  height: 450,
  paddingLeft: 70,
  paddingRight: 30,
  paddingTop: 30,
  paddingBottom: 50,
  wavelengthMin: 380,
  wavelengthMax: 780,
  yMax: 1.1, // Y 轴最大值（略大于 1 以容纳 x̄ 的峰值）
};

// 颜色配置
const CURVE_COLORS: Record<"x" | "y" | "z", CurveColor> = {
  x: { stroke: "#ef4444", fill: "#ef4444", label: "x̄(λ)", description: "X 色匹配函数" },
  y: { stroke: "#22c55e", fill: "#22c55e", label: "ȳ(λ)", description: "Y 色匹配函数" },
  z: { stroke: "#3b82f6", fill: "#3b82f6", label: "z̄(λ)", description: "Z 色匹配函数" },
};

export default function ColorMatchingCurves() {
  // 创建坐标转换函数
  const wavelengthToX = useMemo(() => createWavelengthToX(CHART_CONFIG), []);
  const valueToY = useMemo(() => createValueToY(CHART_CONFIG), []);

  // 准备曲线数据
  const xCurve = useMemo(
    () => CIE_1931_CMF_10NM.map((d) => ({ wavelength: d.wavelength, value: d.xbar })),
    [],
  );
  const yCurve = useMemo(
    () => CIE_1931_CMF_10NM.map((d) => ({ wavelength: d.wavelength, value: d.ybar })),
    [],
  );
  const zCurve = useMemo(
    () => CIE_1931_CMF_10NM.map((d) => ({ wavelength: d.wavelength, value: d.zbar })),
    [],
  );

  // 生成路径
  const xPath = useMemo(
    () => generateSmoothPath(xCurve, wavelengthToX, valueToY),
    [xCurve, wavelengthToX, valueToY],
  );
  const yPath = useMemo(
    () => generateSmoothPath(yCurve, wavelengthToX, valueToY),
    [yCurve, wavelengthToX, valueToY],
  );
  const zPath = useMemo(
    () => generateSmoothPath(zCurve, wavelengthToX, valueToY),
    [zCurve, wavelengthToX, valueToY],
  );

  // 生成填充区域路径
  const xAreaPath = useMemo(() => generateAreaPath(xPath, CHART_CONFIG), [xPath]);
  const yAreaPath = useMemo(() => generateAreaPath(yPath, CHART_CONFIG), [yPath]);
  const zAreaPath = useMemo(() => generateAreaPath(zPath, CHART_CONFIG), [zPath]);

  // 绘图区域尺寸
  const plotDim = getPlotDimensions(CHART_CONFIG);

  // X 轴刻度
  const xTicks = [380, 420, 460, 500, 540, 580, 620, 660, 700, 740, 780];

  // Y 轴刻度
  const yTicks = [0, 0.2, 0.4, 0.6, 0.8, 1.0];

  // 网格线
  const gridLines = yTicks.map((tick) => ({
    y: valueToY(tick),
    value: tick,
  }));

  return (
    <div className="glass-panel p-6 space-y-4">
      <div className="flex justify-between items-baseline flex-wrap gap-2">
        <h3 className="text-xl font-bold text-white">CIE 1931 色匹配函数曲线</h3>
        <div className="text-xs text-gray-400">CIE 015:2018 2° 标准观察者</div>
      </div>
      <p className="text-sm text-gray-400">
        CIE 1931 标准色度系统的三条色匹配函数曲线 x̄(λ)、ȳ(λ)、z̄(λ)，用于将光谱功率分布
        转换为 CIE XYZ 三刺激值。ȳ(λ) 与明视觉光谱光视效率函数 V(λ) 一致。
      </p>

      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gray-900/50">
        <svg
          viewBox={`0 0 ${CHART_CONFIG.width} ${CHART_CONFIG.height}`}
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 背景 */}
          <rect
            x={plotDim.left}
            y={plotDim.top}
            width={plotDim.width}
            height={plotDim.height}
            fill="rgba(255,255,255,0.02)"
          />

          {/* 网格线 */}
          {gridLines.map(({ y, value }) => (
            <g key={`grid-${value}`}>
              <line
                x1={plotDim.left}
                y1={y}
                x2={plotDim.right}
                y2={y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <text
                x={plotDim.left - 10}
                y={y + 4}
                textAnchor="end"
                fill="#9ca3af"
                fontSize="11"
              >
                {value.toFixed(1)}
              </text>
            </g>
          ))}

          {/* Y 轴 */}
          <line
            x1={plotDim.left}
            y1={plotDim.top}
            x2={plotDim.left}
            y2={plotDim.bottom}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.5"
          />

          {/* X 轴 */}
          <line
            x1={plotDim.left}
            y1={plotDim.bottom}
            x2={plotDim.right}
            y2={plotDim.bottom}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.5"
          />

          {/* X 轴刻度标签 */}
          {xTicks.map((tick) => (
            <g key={`xtick-${tick}`}>
              <line
                x1={wavelengthToX(tick)}
                y1={plotDim.bottom}
                x2={wavelengthToX(tick)}
                y2={plotDim.bottom + 5}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />
              <text
                x={wavelengthToX(tick)}
                y={plotDim.bottom + 20}
                textAnchor="middle"
                fill="#9ca3af"
                fontSize="11"
              >
                {tick}
              </text>
            </g>
          ))}

          {/* 坐标轴标签 */}
          <text
            x={CHART_CONFIG.width / 2}
            y={CHART_CONFIG.height - 5}
            textAnchor="middle"
            fill="#d1d5db"
            fontSize="12"
          >
            波长 (nm)
          </text>
          <text
            x={20}
            y={CHART_CONFIG.height / 2}
            textAnchor="middle"
            fill="#d1d5db"
            fontSize="12"
            transform={`rotate(-90 20 ${CHART_CONFIG.height / 2})`}
          >
            色匹配函数值
          </text>

          {/* 曲线路径 - 使用 Framer Motion 实现绘制动画 */}
          <defs>
            <clipPath id="chartArea">
              <rect
                x={plotDim.left}
                y={plotDim.top}
                width={plotDim.width}
                height={plotDim.height}
              />
            </clipPath>
          </defs>

          <g clipPath="url(#chartArea)">
            {/* z̄ 曲线 */}
            <motion.path
              d={zPath}
              fill="none"
              stroke={CURVE_COLORS.z.stroke}
              strokeWidth="2.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0 }}
            />
            <motion.path
              d={zAreaPath}
              fill={`${CURVE_COLORS.z.fill}15`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {/* ȳ 曲线 */}
            <motion.path
              d={yPath}
              fill="none"
              stroke={CURVE_COLORS.y.stroke}
              strokeWidth="2.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.path
              d={yAreaPath}
              fill={`${CURVE_COLORS.y.fill}15`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            />

            {/* x̄ 曲线 */}
            <motion.path
              d={xPath}
              fill="none"
              stroke={CURVE_COLORS.x.stroke}
              strokeWidth="2.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
            />
            <motion.path
              d={xAreaPath}
              fill={`${CURVE_COLORS.x.fill}15`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
            />
          </g>

          {/* 峰值标记 */}
          <g>
            {/* ȳ 峰值 */}
            <circle
              cx={wavelengthToX(555)}
              cy={valueToY(0.995)}
              r="4"
              fill={CURVE_COLORS.y.stroke}
              opacity="0.8"
            />
            <text
              x={wavelengthToX(555)}
              y={valueToY(0.995) - 10}
              textAnchor="middle"
              fill={CURVE_COLORS.y.stroke}
              fontSize="10"
              fontWeight="500"
            >
              555nm
            </text>

            {/* x̄ 峰值 */}
            <circle
              cx={wavelengthToX(590)}
              cy={valueToY(1.0263)}
              r="4"
              fill={CURVE_COLORS.x.stroke}
              opacity="0.8"
            />
            <text
              x={wavelengthToX(590)}
              y={valueToY(1.0263) - 10}
              textAnchor="middle"
              fill={CURVE_COLORS.x.stroke}
              fontSize="10"
              fontWeight="500"
            >
              590nm
            </text>

            {/* z̄ 峰值 */}
            <circle
              cx={wavelengthToX(440)}
              cy={valueToY(1.7471)}
              r="4"
              fill={CURVE_COLORS.z.stroke}
              opacity="0.8"
            />
            <text
              x={wavelengthToX(440)}
              y={valueToY(1.7471) - 10}
              textAnchor="middle"
              fill={CURVE_COLORS.z.stroke}
              fontSize="10"
              fontWeight="500"
            >
              440nm
            </text>
          </g>
        </svg>

        {/* 图例 */}
        <div className="flex flex-wrap justify-center gap-4 px-4 py-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 rounded" style={{ backgroundColor: CURVE_COLORS.x.stroke }} />
            <span className="text-sm text-gray-300">{CURVE_COLORS.x.label} {CURVE_COLORS.x.description}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 rounded" style={{ backgroundColor: CURVE_COLORS.y.stroke }} />
            <span className="text-sm text-gray-300">{CURVE_COLORS.y.label} {CURVE_COLORS.y.description}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 rounded" style={{ backgroundColor: CURVE_COLORS.z.stroke }} />
            <span className="text-sm text-gray-300">{CURVE_COLORS.z.label} {CURVE_COLORS.z.description}</span>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p>
          <strong>数据来源：</strong>CIE 015:2018 Table T.1 - CIE 1931 2° Standard Observer
        </p>
        <p>
          <strong>说明：</strong>三刺激值 X、Y、Z 通过光谱功率分布 S(λ) 与色匹配函数加权积分得到：
          X = k∫S(λ)x̄(λ)dλ，Y = k∫S(λ)ȳ(λ)dλ，Z = k∫S(λ)z̄(λ)dλ。
          其中 Y 值同时表示颜色的亮度信息。
        </p>
      </div>
    </div>
  );
}
