'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Info } from 'lucide-react';
import {
  calculateDeltaE76,
  calculateDeltaE94,
  calculateDeltaE00,
  rgbToXYZ,
  xyzToCIELAB,
  hexToRgb,
  getPerceptualInfo,
} from '@/lib/colorimetry/utils';
import type { CIELABColor } from '@/lib/colorimetry/types';

/**
 * 色差计算器组件
 *
 * 支持两种颜色输入（RGB/HEX），计算并显示三种色差结果：
 * - ΔE*ab (CIE 1976)
 * - ΔE*94 (CIE 1994)
 * - ΔE*00 (CIE 2000)
 */
export default function ColorDifferenceCalculator() {
  const [color1, setColor1] = useState('#FF5733');
  const [color2, setColor2] = useState('#33FF57');
  const [showDetails, setShowDetails] = useState(false);

  // 解析颜色并计算 CIELAB 值
  const labColors = useMemo(() => {
    const parseColor = (hex: string): CIELABColor | null => {
      const rgb = hexToRgb(hex);
      if (!rgb) return null;

      const xyz = rgbToXYZ(rgb.r, rgb.g, rgb.b);
      return xyzToCIELAB(xyz.x, xyz.y, xyz.z);
    };

    const lab1 = parseColor(color1);
    const lab2 = parseColor(color2);

    if (!lab1 || !lab2) return null;

    return { lab1, lab2 };
  }, [color1, color2]);

  // 计算色差
  const deltaEResults = useMemo(() => {
    if (!labColors) return null;

    const { lab1, lab2 } = labColors;

    const dE76 = calculateDeltaE76(lab1, lab2);
    const dE94 = calculateDeltaE94(lab1, lab2);
    const dE00 = calculateDeltaE00(lab1, lab2);

    return {
      dE76: {
        value: dE76,
        ...getPerceptualInfo(dE76),
      },
      dE94: {
        value: dE94,
        ...getPerceptualInfo(dE94),
      },
      dE00: {
        value: dE00,
        ...getPerceptualInfo(dE00),
      },
    };
  }, [labColors]);

  // 获取进度条颜色
  const getProgressColor = (deltaE: number) => {
    if (deltaE < 2) return 'bg-green-500';
    if (deltaE < 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // 获取感知描述的文字颜色
  const getPerceptualColor = (deltaE: number) => {
    if (deltaE < 2) return 'text-green-500';
    if (deltaE < 5) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="glass-panel p-6 rounded-2xl space-y-6">
      <div className="flex items-center gap-2 text-primary-500">
        <Info className="w-5 h-5" />
        <h2 className="text-xl font-semibold">色差计算器</h2>
      </div>

      {/* 颜色输入区域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 颜色 1 */}
        <ColorInput
          label="颜色 1"
          value={color1}
          onChange={setColor1}
          labColor={labColors?.lab1}
        />

        {/* 颜色 2 */}
        <ColorInput
          label="颜色 2"
          value={color2}
          onChange={setColor2}
          labColor={labColors?.lab2}
        />
      </div>

      {/* 色差结果 */}
      {deltaEResults && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-secondary-500">色差结果</h3>

          {/* CIE 1976 */}
          <DeltaEResult
            name="ΔE*ab (CIE 1976)"
            value={deltaEResults.dE76.value}
            description={deltaEResults.dE76.description}
            progressColor={getProgressColor(deltaEResults.dE76.value)}
            perceptualColor={getPerceptualColor(deltaEResults.dE76.value)}
          />

          {/* CIE 1994 */}
          <DeltaEResult
            name="ΔE*94 (CIE 1994)"
            value={deltaEResults.dE94.value}
            description={deltaEResults.dE94.description}
            progressColor={getProgressColor(deltaEResults.dE94.value)}
            perceptualColor={getPerceptualColor(deltaEResults.dE94.value)}
          />

          {/* CIE 2000 */}
          <DeltaEResult
            name="ΔE*00 (CIE 2000)"
            value={deltaEResults.dE00.value}
            description={deltaEResults.dE00.description}
            progressColor={getProgressColor(deltaEResults.dE00.value)}
            perceptualColor={getPerceptualColor(deltaEResults.dE00.value)}
          />

          {/* 主要感知描述 */}
          <div className="glass-card p-4 rounded-xl">
            <p className="text-sm text-muted-foreground">感知描述</p>
            <p className={`text-lg font-medium ${getPerceptualColor(deltaEResults.dE00.value)}`}>
              {deltaEResults.dE00.description}
            </p>
          </div>
        </div>
      )}

      {/* CIELAB 数值详情 */}
      {labColors && (
        <div className="space-y-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary-500 transition-colors"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`}
            />
            显示 CIELAB 数值详情
          </button>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="glass-card p-4 rounded-xl grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-primary-500 mb-2">颜色 1 CIELAB</h4>
                    <div className="space-y-1 text-sm">
                      <p>L*: {labColors.lab1.L.toFixed(2)}</p>
                      <p>a*: {labColors.lab1.a.toFixed(2)}</p>
                      <p>b*: {labColors.lab1.b.toFixed(2)}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-secondary-500 mb-2">颜色 2 CIELAB</h4>
                    <div className="space-y-1 text-sm">
                      <p>L*: {labColors.lab2.L.toFixed(2)}</p>
                      <p>a*: {labColors.lab2.a.toFixed(2)}</p>
                      <p>b*: {labColors.lab2.b.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

// 颜色输入组件
interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  labColor?: CIELABColor;
}

function ColorInput({ label, value, onChange, labColor }: ColorInputProps) {
  return (
    <div className="glass-card p-4 rounded-xl space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-secondary-500">{label}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
              onChange(val);
            }
          }}
          className="w-24 px-2 py-1 text-sm bg-background/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="#RRGGBB"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* 颜色预览 */}
        <div
          className="w-16 h-16 rounded-xl border-2 border-border shadow-inner"
          style={{ backgroundColor: value }}
        />

        {/* RGB 输入滑块 */}
        <div className="flex-1 space-y-2">
          <RGBSliders value={value} onChange={onChange} />
        </div>
      </div>

      {/* CIELAB 值 */}
      {labColor && (
        <div className="pt-2 border-t border-border">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>L*: {labColor.L.toFixed(1)}</span>
            <span>a*: {labColor.a.toFixed(1)}</span>
            <span>b*: {labColor.b.toFixed(1)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// RGB 滑块组件
interface RGBSlidersProps {
  value: string;
  onChange: (value: string) => void;
}

function RGBSliders({ value, onChange }: RGBSlidersProps) {
  const rgb = hexToRgb(value) || { r: 0, g: 0, b: 0 };

  const r = Math.round(rgb.r * 255);
  const g = Math.round(rgb.g * 255);
  const b = Math.round(rgb.b * 255);

  const handleRChange = (newR: number) => {
    const newHex = `#${toHex(newR)}${toHex(g)}${toHex(b)}`;
    onChange(newHex);
  };

  const handleGChange = (newG: number) => {
    const newHex = `#${toHex(r)}${toHex(newG)}${toHex(b)}`;
    onChange(newHex);
  };

  const handleBChange = (newB: number) => {
    const newHex = `#${toHex(r)}${toHex(g)}${toHex(newB)}`;
    onChange(newHex);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="w-6 text-xs text-red-500 font-medium">R</span>
        <input
          type="range"
          min={0}
          max={255}
          value={r}
          onChange={(e) => handleRChange(Number(e.target.value))}
          className="flex-1 h-2 bg-red-900/30 rounded-lg appearance-none cursor-pointer accent-red-500"
        />
        <span className="w-8 text-xs text-right tabular-nums">{r}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-6 text-xs text-green-500 font-medium">G</span>
        <input
          type="range"
          min={0}
          max={255}
          value={g}
          onChange={(e) => handleGChange(Number(e.target.value))}
          className="flex-1 h-2 bg-green-900/30 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
        <span className="w-8 text-xs text-right tabular-nums">{g}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-6 text-xs text-blue-500 font-medium">B</span>
        <input
          type="range"
          min={0}
          max={255}
          value={b}
          onChange={(e) => handleBChange(Number(e.target.value))}
          className="flex-1 h-2 bg-blue-900/30 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <span className="w-8 text-xs text-right tabular-nums">{b}</span>
      </div>
    </div>
  );
}

// 色差结果组件
interface DeltaEResultProps {
  name: string;
  value: number;
  description: string;
  progressColor: string;
  perceptualColor: string;
}

function DeltaEResult({
  name,
  value,
  description,
  progressColor,
  perceptualColor,
}: DeltaEResultProps) {
  // 进度条最大值设为 15（足够显示明显差异）
  const progressPercent = Math.min((value / 15) * 100, 100);

  return (
    <div className="glass-card p-4 rounded-xl space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-secondary-500">{name}</span>
        <span className={`text-sm font-bold ${perceptualColor}`}>{value.toFixed(2)}</span>
      </div>
      <div className="h-2 bg-background/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`h-full ${progressColor} rounded-full`}
        />
      </div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

// 辅助函数：数值转十六进制
function toHex(n: number): string {
  const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}
