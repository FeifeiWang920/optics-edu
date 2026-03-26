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

  // 获取进度条颜色 - 基于经验法则阈值
  const getProgressColor = (deltaE: number) => {
    if (deltaE <= 1.0) return 'bg-emerald-500';      // 无法察觉
    if (deltaE <= 2.0) return 'bg-green-500';        // 专业者察觉
    if (deltaE <= 3.0) return 'bg-yellow-500';       // 普通人察觉
    if (deltaE <= 6.0) return 'bg-orange-500';       // 明显差异
    return 'bg-red-500';                             // 显著差异
  };

  // 获取感知描述的文字颜色
  const getPerceptualColor = (deltaE: number) => {
    if (deltaE <= 1.0) return 'text-emerald-500';
    if (deltaE <= 2.0) return 'text-green-500';
    if (deltaE <= 3.0) return 'text-yellow-500';
    if (deltaE <= 6.0) return 'text-orange-500';
    return 'text-red-500';
  };

  // 获取质量等级标签
  const getQualityLabel = (deltaE: number): { text: string; color: string } => {
    if (deltaE < 0.5) return { text: '优秀', color: 'text-emerald-400 bg-emerald-400/10' };
    if (deltaE < 1.0) return { text: '良好', color: 'text-green-400 bg-green-400/10' };
    if (deltaE < 2.0) return { text: '一般', color: 'text-yellow-400 bg-yellow-400/10' };
    if (deltaE < 4.0) return { text: '较差', color: 'text-orange-400 bg-orange-400/10' };
    return { text: '不可接受', color: 'text-red-400 bg-red-400/10' };
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

          {/* 色差评级说明 */}
          <div className="glass-card p-4 rounded-xl space-y-3">
            <p className="text-sm text-muted-foreground">色差评级标准</p>
            <div className="grid grid-cols-5 gap-2 text-center">
              <div className="p-2 rounded bg-emerald-500/10">
                <p className="text-xs text-emerald-400 font-medium">≤1.0</p>
                <p className="text-[10px] text-gray-500">无法察觉</p>
              </div>
              <div className="p-2 rounded bg-green-500/10">
                <p className="text-xs text-green-400 font-medium">1.0-2.0</p>
                <p className="text-[10px] text-gray-500">专业者察觉</p>
              </div>
              <div className="p-2 rounded bg-yellow-500/10">
                <p className="text-xs text-yellow-400 font-medium">2.0-3.0</p>
                <p className="text-[10px] text-gray-500">普通人察觉</p>
              </div>
              <div className="p-2 rounded bg-orange-500/10">
                <p className="text-xs text-orange-400 font-medium">3.0-6.0</p>
                <p className="text-[10px] text-gray-500">明显差异</p>
              </div>
              <div className="p-2 rounded bg-red-500/10">
                <p className="text-xs text-red-400 font-medium">&gt;6.0</p>
                <p className="text-[10px] text-gray-500">显著差异</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-500">
              参考：CIE 15:2018、ISO 11664-6:2014；适用于 ΔE*00 (CIEDE2000)，ΔE*94/76 阈值有所不同
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
                {/* 参考光源与白点说明 */}
                <div className="mt-3 p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
                  {/* 参考光源 */}
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 font-medium">参考光源</p>
                    <p className="text-xs text-gray-300">
                      <span className="text-primary-400 font-medium">D65</span>
                      <span className="text-gray-500"> — 标准日光，色温约6500K，模拟北半球正午平均日光</span>
                    </p>
                    <p className="text-[10px] text-gray-500 leading-relaxed">
                      颜色转换需要指定&quot;在什么光照下观察&quot;。同一物体在不同光源下看起来颜色不同（同色异谱现象）。
                      CIELAB 使用 D65 作为默认参考光源，这是印刷、显示行业的国际标准。
                    </p>
                  </div>

                  {/* 白点 */}
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 font-medium">白点 (White Point)</p>
                    <p className="text-xs text-gray-300">
                      <span className="text-gray-400 font-mono">XYZ = (0.950, 1.000, 1.089)</span>
                    </p>
                    <p className="text-[10px] text-gray-500 leading-relaxed">
                      白点是&quot;完美漫反射体&quot;在特定光源下的 XYZ 三刺激值，代表该光源下的&quot;纯白&quot;。
                      CIELAB 公式中，所有颜色都与这个白点比较：L*=100 表示与白点一样亮，a*=b*=0 表示与白点一样不偏色。
                      更换白点会改变整个颜色空间的数值。
                    </p>
                  </div>

                  {/* 转换流程 */}
                  <div className="pt-2 border-t border-white/5">
                    <p className="text-[10px] text-gray-600">
                      转换流程：sRGB → XYZ(D65) → CIELAB(D65白点)
                    </p>
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
  // 进度条最大值设为 6（覆盖可接受范围）
  const progressPercent = Math.min((value / 6) * 100, 100);

  // 获取质量等级
  const getQualityInfo = (deltaE: number): { label: string; bgClass: string } => {
    if (deltaE <= 1.0) return { label: '无法察觉', bgClass: 'bg-emerald-500/20 text-emerald-400' };
    if (deltaE <= 2.0) return { label: '专业者察觉', bgClass: 'bg-green-500/20 text-green-400' };
    if (deltaE <= 3.0) return { label: '普通人察觉', bgClass: 'bg-yellow-500/20 text-yellow-400' };
    if (deltaE <= 6.0) return { label: '明显差异', bgClass: 'bg-orange-500/20 text-orange-400' };
    return { label: '显著差异', bgClass: 'bg-red-500/20 text-red-400' };
  };

  const quality = getQualityInfo(value);

  return (
    <div className="glass-card p-4 rounded-xl space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-secondary-500">{name}</span>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded ${quality.bgClass}`}>
            {quality.label}
          </span>
          <span className={`text-sm font-bold ${perceptualColor}`}>{value.toFixed(2)}</span>
        </div>
      </div>
      <div className="h-2 bg-background/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`h-full ${progressColor} rounded-full`}
        />
      </div>
    </div>
  );
}

// 辅助函数：数值转十六进制
function toHex(n: number): string {
  const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}
