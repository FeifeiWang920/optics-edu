"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { STOCKMAN_SHARPE_LMS_10NM } from "@/lib/colorimetry/data";
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
  height: 400,
  paddingLeft: 60,
  paddingRight: 30,
  paddingTop: 30,
  paddingBottom: 50,
  wavelengthMin: 380,
  wavelengthMax: 780,
};

// 颜色配置
const CURVE_COLORS: Record<"L" | "M" | "S", CurveColor> = {
  L: { stroke: "#ef4444", fill: "#ef4444", label: "L 视锥 (长波)" },
  M: { stroke: "#22c55e", fill: "#22c55e", label: "M 视锥 (中波)" },
  S: { stroke: "#3b82f6", fill: "#3b82f6", label: "S 视锥 (短波)" },
};

/** LMS 数据归一化到 0-1 范围 */
interface NormalizedLMSData {
  wavelength: number;
  l: number;
  m: number;
  s: number;
}

function normalizeLMSData(data: typeof STOCKMAN_SHARPE_LMS_10NM): NormalizedLMSData[] {
  const maxL = Math.max(...data.map((d) => d.l));
  const maxM = Math.max(...data.map((d) => d.m));
  const maxS = Math.max(...data.map((d) => d.s));
  const globalMax = Math.max(maxL, maxM, maxS);

  return data.map((d) => ({
    wavelength: d.wavelength,
    l: d.l / globalMax,
    m: d.m / globalMax,
    s: d.s / globalMax,
  }));
}

export default function LMSSensitivityChart() {
  // 创建坐标转换函数
  const wavelengthToX = useMemo(() => createWavelengthToX(CHART_CONFIG), []);
  const valueToY = useMemo(() => createValueToY(CHART_CONFIG, true), []);

  // 归一化数据
  const normalizedData = useMemo(() => normalizeLMSData(STOCKMAN_SHARPE_LMS_10NM), []);

  // 准备曲线数据
  const lCurve = useMemo(
    () => normalizedData.map((d) => ({ wavelength: d.wavelength, value: d.l })),
    [normalizedData],
  );
  const mCurve = useMemo(
    () => normalizedData.map((d) => ({ wavelength: d.wavelength, value: d.m })),
    [normalizedData],
  );
  const sCurve = useMemo(
    () => normalizedData.map((d) => ({ wavelength: d.wavelength, value: d.s })),
    [normalizedData],
  );

  // 生成路径
  const lPath = useMemo(
    () => generateSmoothPath(lCurve, wavelengthToX, valueToY),
    [lCurve, wavelengthToX, valueToY],
  );
  const mPath = useMemo(
    () => generateSmoothPath(mCurve, wavelengthToX, valueToY),
    [mCurve, wavelengthToX, valueToY],
  );
  const sPath = useMemo(
    () => generateSmoothPath(sCurve, wavelengthToX, valueToY),
    [sCurve, wavelengthToX, valueToY],
  );

  // 生成填充区域路径
  const lAreaPath = useMemo(() => generateAreaPath(lPath, CHART_CONFIG, 380, 700), [lPath]);
  const mAreaPath = useMemo(() => generateAreaPath(mPath, CHART_CONFIG, 380, 700), [mPath]);
  const sAreaPath = useMemo(() => generateAreaPath(sPath, CHART_CONFIG, 380, 700), [sPath]);

  // 绘图区域尺寸
  const plotDim = getPlotDimensions(CHART_CONFIG);

  // X 轴刻度
  const xTicks = [380, 420, 460, 500, 540, 580, 620, 660, 700, 740, 780];

  // Y 轴刻度
  const yTicks = [0, 0.2, 0.4, 0.6, 0.8, 1];

  // 网格线
  const gridLines = yTicks.map((tick) => ({
    y: valueToY(tick),
    value: tick,
  }));

  return (
    <div className="glass-panel p-6 space-y-4">
      <div className="flex justify-between items-baseline flex-wrap gap-2">
        <h3 className="text-xl font-bold text-white">LMS 视锥光谱响应曲线</h3>
        <div className="text-xs text-gray-400">Stockman & Sharpe (2000) 10° 标准观察者</div>
      </div>
      <p className="text-sm text-gray-400">
        人眼三种视锥细胞（L-长波、M-中波、S-短波）对不同波长光的相对敏感度响应曲线。
        数据已归一化到 0-1 范围以便比较。
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
            x={15}
            y={CHART_CONFIG.height / 2}
            textAnchor="middle"
            fill="#d1d5db"
            fontSize="12"
            transform={`rotate(-90 15 ${CHART_CONFIG.height / 2})`}
          >
            归一化响应
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
            {/* S 视锥曲线 */}
            <motion.path
              d={sPath}
              fill="none"
              stroke={CURVE_COLORS.S.stroke}
              strokeWidth="2.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0 }}
            />
            <motion.path
              d={sAreaPath}
              fill={`${CURVE_COLORS.S.fill}20`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {/* M 视锥曲线 */}
            <motion.path
              d={mPath}
              fill="none"
              stroke={CURVE_COLORS.M.stroke}
              strokeWidth="2.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.path
              d={mAreaPath}
              fill={`${CURVE_COLORS.M.fill}20`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            />

            {/* L 视锥曲线 */}
            <motion.path
              d={lPath}
              fill="none"
              stroke={CURVE_COLORS.L.stroke}
              strokeWidth="2.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
            />
            <motion.path
              d={lAreaPath}
              fill={`${CURVE_COLORS.L.fill}20`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
            />
          </g>
        </svg>

        {/* 图例 */}
        <div className="flex flex-wrap justify-center gap-4 px-4 py-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 rounded" style={{ backgroundColor: CURVE_COLORS.L.stroke }} />
            <span className="text-sm text-gray-300">{CURVE_COLORS.L.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 rounded" style={{ backgroundColor: CURVE_COLORS.M.stroke }} />
            <span className="text-sm text-gray-300">{CURVE_COLORS.M.label}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 rounded" style={{ backgroundColor: CURVE_COLORS.S.stroke }} />
            <span className="text-sm text-gray-300">{CURVE_COLORS.S.label}</span>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p>
          <strong>数据来源：</strong>Stockman, A. & Sharpe, L.T. (2000). {'"The spectral sensitivities of the middle- and long-wavelength-sensitive cone photoreceptors."'} Vision Research, 40(13), 1711-1737.
        </p>
        <p>
          <strong>说明：</strong>L 视锥对长波（红色）敏感，峰值约 560nm；M 视锥对中波（绿色）敏感，峰值约 530nm；S 视锥对短波（蓝色）敏感，峰值约 420nm。
        </p>
      </div>
    </div>
  );
}
