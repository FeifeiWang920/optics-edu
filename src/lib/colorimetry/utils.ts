/**
 * 色度学计算工具函数
 *
 * 参考标准:
 * - CIE 15:2018 Colorimetry (第 4 版)
 * - CIEDE2000: CIE Technical Report 142
 * - sRGB: IEC 61966-2-1:1999
 */

import type { CIELABColor, CIEXYZ, RGBColor, ColorDifferenceResult } from './types';
import { ILLUMINANT_D65 } from './data';

// ============================================================================
// 常量定义
// ============================================================================

/**
 * CIE 1931 标准观察者参考白 (D65)
 */
const REFERENCE_WHITE = ILLUMINANT_D65;

/**
 * CIE94 默认参数 (图形艺术行业)
 */
const CIE94_DEFAULT_PARAMS = {
  kL: 1,
  kC: 1,
  kH: 1,
  K1: 0.045, // 图形艺术
  K2: 0.015, // 图形艺术
};

/**
 * CIE94 纺织行业参数
 */
const CIE94_TEXTILE_PARAMS = {
  kL: 1,
  kC: 1,
  kH: 1,
  K1: 0.048,
  K2: 0.014,
};

/**
 * CIEDE2000 参数
 */
const CIEDE2000_DEFAULT_PARAMS = {
  kL: 1,
  kC: 1,
  kH: 1,
};

/**
 * 色差感知描述阈值 - 基于 CIE 标准和行业实践
 *
 * 注意：不同色差公式的阈值不能直接比较
 * - ΔE*76: 数值偏大，1 JND ≈ 2.3
 * - ΔE*94: 数值中等，1 JND ≈ 1.0
 * - ΔE*00: 最精确，1 JND ≈ 1.0
 *
 * 参考标准：
 * - CIE 15:2018 色度学第4版
 * - ISO 11664-6:2014 CIEDE2000
 * - 汽车行业通用规范
 */
const DELTA_E_PERCEPTUAL_THRESHOLDS = [
  { deltaE: 1.0, description: '无法察觉 (imperceptible)', level: 'excellent', visible: false, acceptable: true },
  { deltaE: 2.0, description: '专业观察者才能察觉', level: 'excellent', visible: true, acceptable: true },
  { deltaE: 3.0, description: '普通观察者可以察觉', level: 'good', visible: true, acceptable: true },
  { deltaE: 6.0, description: '明显差异 (apparent)', level: 'fair', visible: true, acceptable: true },
  { deltaE: Infinity, description: '显著差异 (significant)', level: 'poor', visible: true, acceptable: false },
];

// ============================================================================
// XYZ 与 CIELAB 转换
// ============================================================================

/**
 * CIE XYZ 转 CIELAB
 *
 * 公式来源：CIE 15:2018 第 9.2 节
 *
 * @param x - X 三刺激值
 * @param y - Y 三刺激值
 * @param z - Z 三刺激值
 * @param whitePoint - 参考白点 (默认 D65)
 * @returns CIELAB 颜色值
 */
export function xyzToCIELAB(
  x: number,
  y: number,
  z: number,
  whitePoint: CIEXYZ = REFERENCE_WHITE,
): CIELABColor {
  const xn = x / whitePoint.x;
  const yn = y / whitePoint.y;
  const zn = z / whitePoint.z;

  const fx = f(xn);
  const fy = f(yn);
  const fz = f(zn);

  const L = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const b = 200 * (fy - fz);

  return { L, a, b };
}

/**
 * CIELAB 转 CIE XYZ
 *
 * @param lab - CIELAB 颜色值
 * @param whitePoint - 参考白点 (默认 D65)
 * @returns CIE XYZ 三刺激值
 */
export function cielabToXYZ(lab: CIELABColor, whitePoint: CIEXYZ = REFERENCE_WHITE): CIEXYZ {
  const fy = (lab.L + 16) / 116;
  const fx = lab.a / 500 + fy;
  const fz = fy - lab.b / 200;

  const xn = whitePoint.x * finv(fx);
  const yn = whitePoint.y * finv(fy);
  const zn = whitePoint.z * finv(fz);

  return { x: xn, y: yn, z: zn };
}

/**
 * CIE 辅助函数 f(t)
 */
function f(t: number): number {
  const delta = 6 / 29;
  const kappa = 24389 / 27;

  if (t > Math.pow(delta, 3)) {
    return Math.pow(t, 1 / 3);
  } else {
    return (kappa * t + 16) / 116;
  }
}

/**
 * CIE 辅助函数 f 的反函数
 */
function finv(t: number): number {
  const delta = 6 / 29;

  if (t > delta) {
    return t * t * t;
  } else {
    return (116 * t - 16) / (24389 / 27);
  }
}

// ============================================================================
// CIELAB 与 LCH 转换
// ============================================================================

/**
 * CIELAB 转 LCH (极坐标表示)
 *
 * L: 明度 (0-100)
 * C: 彩度 (饱和度)
 * H: 色相角 (度)
 */
export function labToLCH(lab: CIELABColor): { L: number; C: number; H: number } {
  const C = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
  let H = (Math.atan2(lab.b, lab.a) * 180) / Math.PI;

  if (H < 0) {
    H += 360;
  }

  return { L: lab.L, C, H };
}

/**
 * LCH 转 CIELAB
 */
export function lchToLab(lch: { L: number; C: number; H: number }): CIELABColor {
  const H_rad = (lch.H * Math.PI) / 180;
  const a = lch.C * Math.cos(H_rad);
  const b = lch.C * Math.sin(H_rad);

  return { L: lch.L, a, b };
}

// ============================================================================
// 色差计算 - CIE 1976 (Delta E*76)
// ============================================================================

/**
 * CIE 1976 色差公式 (Delta E*ab)
 *
 * 公式来源：CIE 15:2018 第 9.3 节
 *
 * ΔE*ab = √[(ΔL*)² + (Δa*)² + (Δb*)²]
 *
 * @param lab1 - 第一个 CIELAB 颜色
 * @param lab2 - 第二个 CIELAB 颜色
 * @returns 色差值
 */
export function calculateDeltaE76(lab1: CIELABColor, lab2: CIELABColor): number {
  const dL = lab2.L - lab1.L;
  const da = lab2.a - lab1.a;
  const db = lab2.b - lab1.b;

  return Math.sqrt(dL * dL + da * da + db * db);
}

// ============================================================================
// 色差计算 - CIE 1994 (Delta E*94)
// ============================================================================

/**
 * CIE 1994 色差公式
 *
 * 公式来源：CIE 15:2018 第 9.4 节
 *
 * 提供两种参数设置：
 * - 图形艺术 (默认): K1=0.045, K2=0.015
 * - 纺织行业：K1=0.048, K2=0.014
 *
 * @param lab1 - 第一个 CIELAB 颜色
 * @param lab2 - 第二个 CIELAB 颜色
 * @param useTextileParams - 是否使用纺织行业参数
 * @returns 色差值
 */
export function calculateDeltaE94(
  lab1: CIELABColor,
  lab2: CIELABColor,
  useTextileParams: boolean = false,
): number {
  const params = useTextileParams ? CIE94_TEXTILE_PARAMS : CIE94_DEFAULT_PARAMS;

  // 计算差值
  const dL = lab2.L - lab1.L;
  const da = lab2.a - lab1.a;
  const db = lab2.b - lab1.b;

  // 计算彩度
  const C1 = Math.sqrt(lab1.a * lab1.a + lab1.b * lab1.b);
  const C2 = Math.sqrt(lab2.a * lab2.a + lab2.b * lab2.b);
  const dC = C2 - C1;

  // 计算色相差
  const dHab = Math.sqrt(Math.max(0, da * da + db * db - dC * dC));

  // 计算加权因子
  const kL = params.kL;
  const kC = params.kC;
  const kH = params.kH;
  const K1 = params.K1;
  const K2 = params.K2;

  const SL = 1;
  const SC = 1 + K1 * C1;
  const SH = 1 + K2 * C1;

  // 计算 Delta E94
  const dE94 = Math.sqrt(
    Math.pow(dL / (kL * SL), 2) +
      Math.pow(dC / (kC * SC), 2) +
      Math.pow(dHab / (kH * SH), 2),
  );

  return dE94;
}

/**
 * CIE 1994 色差计算 (返回详细结果)
 */
export function calculateDeltaE94Full(
  lab1: CIELABColor,
  lab2: CIELABColor,
  useTextileParams: boolean = false,
): {
  deltaE: number;
  deltaL: number;
  deltaC: number;
  deltaH: number;
  method: 'CIE94';
  perceptualNote: string;
} {
  const params = useTextileParams ? CIE94_TEXTILE_PARAMS : CIE94_DEFAULT_PARAMS;

  const dL = lab2.L - lab1.L;
  const da = lab2.a - lab1.a;
  const db = lab2.b - lab1.b;

  const C1 = Math.sqrt(lab1.a * lab1.a + lab1.b * lab1.b);
  const C2 = Math.sqrt(lab2.a * lab2.a + lab2.b * lab2.b);
  const dC = C2 - C1;
  const dHab = Math.sqrt(Math.max(0, da * da + db * db - dC * dC));

  const kL = params.kL;
  const kC = params.kC;
  const kH = params.kH;
  const K1 = params.K1;
  const K2 = params.K2;

  const SL = 1;
  const SC = 1 + K1 * C1;
  const SH = 1 + K2 * C1;

  const deltaE = Math.sqrt(
    Math.pow(dL / (kL * SL), 2) +
      Math.pow(dC / (kC * SC), 2) +
      Math.pow(dHab / (kH * SH), 2),
  );

  return {
    deltaE,
    deltaL: dL,
    deltaC: dC,
    deltaH: dHab,
    method: 'CIE94',
    perceptualNote: getPerceptualNote(deltaE),
  };
}

// ============================================================================
// 色差计算 - CIEDE2000 (Delta E*00) - 完整实现
// ============================================================================

/**
 * CIEDE2000 色差公式 - 完整实现
 *
 * 公式来源：CIE Technical Report 142, "CIE 142-2001 Improvement to industrial
 * colour-difference estimation"
 *
 * 这是最精确的色差公式，考虑了人眼感知的非线性特性
 *
 * @param lab1 - 第一个 CIELAB 颜色
 * @param lab2 - 第二个 CIELAB 颜色
 * @param params - CIEDE2000 参数 (默认 kL=kC=kH=1)
 * @returns 色差值
 */
export function calculateDeltaE00(
  lab1: CIELABColor,
  lab2: CIELABColor,
  params: { kL?: number; kC?: number; kH?: number } = CIEDE2000_DEFAULT_PARAMS,
): number {
  const kL = params.kL ?? CIEDE2000_DEFAULT_PARAMS.kL;
  const kC = params.kC ?? CIEDE2000_DEFAULT_PARAMS.kC;
  const kH = params.kH ?? CIEDE2000_DEFAULT_PARAMS.kH;

  // Step 1: 计算 LCH 值
  const L1 = lab1.L;
  const a1 = lab1.a;
  const b1 = lab1.b;
  const L2 = lab2.L;
  const a2 = lab2.a;
  const b2 = lab2.b;

  const C1 = Math.sqrt(a1 * a1 + b1 * b1);
  const C2 = Math.sqrt(a2 * a2 + b2 * b2);

  // Step 2: 计算平均彩度
  const C_bar = (C1 + C2) / 2;

  // Step 3: 计算 G 因子 (彩度增强因子)
  // 注意: 25^7 = 6103515625, 不是 25 * C_bar^7
  const C_bar_7 = Math.pow(C_bar, 7);
  const G = 0.5 * (1 - Math.sqrt(C_bar_7 / (C_bar_7 + 6103515625)));

  // Step 4: 计算修正后的 a' 值
  const a1_prime = a1 * (1 + G);
  const a2_prime = a2 * (1 + G);

  // Step 5: 计算修正后的彩度 C'
  const C1_prime = Math.sqrt(a1_prime * a1_prime + b1 * b1);
  const C2_prime = Math.sqrt(a2_prime * a2_prime + b2 * b2);

  // Step 6: 计算修正后的色相角 h'
  const h1_prime = calculateHPrime(a1_prime, b1);
  const h2_prime = calculateHPrime(a2_prime, b2);

  // Step 7: 计算 Delta L', Delta C', Delta H'
  const DeltaL_prime = L2 - L1;
  const DeltaC_prime = C2_prime - C1_prime;

  // Step 8: 计算 Delta h' (色相差)
  let Deltah_prime: number;
  if (C1_prime * C2_prime === 0) {
    Deltah_prime = 0;
  } else {
    const h_diff = h2_prime - h1_prime;

    if (Math.abs(h_diff) <= 180) {
      Deltah_prime = h_diff;
    } else {
      Deltah_prime = h_diff > 0 ? h_diff - 360 : h_diff + 360;
    }
  }

  // Step 9: 计算 H' (平均色相角)
  let H_prime: number;
  if (C1_prime * C2_prime === 0) {
    H_prime = h1_prime + h2_prime;
  } else {
    const h_diff = h2_prime - h1_prime;
    const h_sum = h1_prime + h2_prime;

    if (Math.abs(h_diff) <= 180) {
      H_prime = h_sum / 2;
    } else {
      H_prime = h_sum < 360 ? (h_sum + 360) / 2 : (h_sum - 360) / 2;
    }
  }

  // Step 10: 计算 Delta H' (三角函数式色相差)
  const DeltaH_prime = 2 * Math.sqrt(C1_prime * C2_prime) * Math.sin((Deltah_prime * Math.PI) / 360);

  // Step 11: 计算 T (色相调整因子)
  const H_prime_deg = H_prime;
  const T =
    1 -
    0.17 * Math.cos((H_prime_deg - 30) * (Math.PI / 180)) +
    0.24 * Math.cos(2 * H_prime_deg * (Math.PI / 180)) +
    0.32 * Math.cos((3 * H_prime_deg + 6) * (Math.PI / 180)) -
    0.20 * Math.cos((4 * H_prime_deg - 63) * (Math.PI / 180));

  // Step 12: 计算 SL, SC, SH (加权函数)
  const DeltaTheta = 30 * Math.exp(-Math.pow((H_prime_deg - 275) / 25, 2));
  const C_bar_prime = (C1_prime + C2_prime) / 2;
  const C_bar_prime_7 = Math.pow(C_bar_prime, 7);
  const RC = Math.sqrt(C_bar_prime_7 / (C_bar_prime_7 + 6103515625));
  // 注意：使用平均明度 L_bar = (L1 + L2) / 2，不是 L1 + L2
  const L_bar = (L1 + L2) / 2;
  const SL =
    1 +
    (0.015 * Math.pow(L_bar - 50, 2)) / Math.sqrt(20 + Math.pow(L_bar - 50, 2));
  const SC = 1 + 0.045 * C_bar_prime;
  const SH = 1 + 0.015 * C_bar_prime * T;

  // Step 13: 计算 RT (旋转项，处理蓝区异常)
  const RT = -2 * RC * Math.sin((2 * DeltaTheta * Math.PI) / 180);

  // Step 14: 计算最终的 Delta E00
  const dE00 = Math.sqrt(
    Math.pow(DeltaL_prime / (kL * SL), 2) +
      Math.pow(DeltaC_prime / (kC * SC), 2) +
      Math.pow(DeltaH_prime / (kH * SH), 2) +
      RT * (DeltaC_prime / (kC * SC)) * (DeltaH_prime / (kH * SH)),
  );

  return dE00;
}

/**
 * 计算修正后的色相角 h'
 */
function calculateHPrime(a_prime: number, b: number): number {
  if (a_prime === 0 && b === 0) {
    return 0;
  }

  let h = (Math.atan2(b, a_prime) * 180) / Math.PI;

  if (h < 0) {
    h += 360;
  }

  return h;
}

/**
 * CIEDE2000 色差计算 (返回详细结果)
 */
export function calculateDeltaE00Full(
  lab1: CIELABColor,
  lab2: CIELABColor,
  params: { kL?: number; kC?: number; kH?: number } = CIEDE2000_DEFAULT_PARAMS,
): {
  deltaE: number;
  deltaL: number;
  deltaC: number;
  deltaH: number;
  method: 'CIEDE2000';
  perceptualNote: string;
} {
  const kL = params.kL ?? CIEDE2000_DEFAULT_PARAMS.kL;
  const kC = params.kC ?? CIEDE2000_DEFAULT_PARAMS.kC;
  const kH = params.kH ?? CIEDE2000_DEFAULT_PARAMS.kH;

  const L1 = lab1.L;
  const a1 = lab1.a;
  const b1 = lab1.b;
  const L2 = lab2.L;
  const a2 = lab2.a;
  const b2 = lab2.b;

  const C1 = Math.sqrt(a1 * a1 + b1 * b1);
  const C2 = Math.sqrt(a2 * a2 + b2 * b2);
  const C_bar = (C1 + C2) / 2;
  // 注意: 25^7 = 6103515625, 不是 25 * C_bar^7
  const C_bar_7 = Math.pow(C_bar, 7);
  const G = 0.5 * (1 - Math.sqrt(C_bar_7 / (C_bar_7 + 6103515625)));

  const a1_prime = a1 * (1 + G);
  const a2_prime = a2 * (1 + G);

  const C1_prime = Math.sqrt(a1_prime * a1_prime + b1 * b1);
  const C2_prime = Math.sqrt(a2_prime * a2_prime + b2 * b2);

  const h1_prime = calculateHPrime(a1_prime, b1);
  const h2_prime = calculateHPrime(a2_prime, b2);

  const DeltaL_prime = L2 - L1;
  const DeltaC_prime = C2_prime - C1_prime;

  let Deltah_prime: number;
  if (C1_prime * C2_prime === 0) {
    Deltah_prime = 0;
  } else {
    const h_diff = h2_prime - h1_prime;
    if (Math.abs(h_diff) <= 180) {
      Deltah_prime = h_diff;
    } else {
      Deltah_prime = h_diff > 0 ? h_diff - 360 : h_diff + 360;
    }
  }

  let H_prime: number;
  if (C1_prime * C2_prime === 0) {
    H_prime = h1_prime + h2_prime;
  } else {
    const h_diff = h2_prime - h1_prime;
    const h_sum = h1_prime + h2_prime;
    if (Math.abs(h_diff) <= 180) {
      H_prime = h_sum / 2;
    } else {
      H_prime = h_sum < 360 ? (h_sum + 360) / 2 : (h_sum - 360) / 2;
    }
  }

  const DeltaH_prime = 2 * Math.sqrt(C1_prime * C2_prime) * Math.sin((Deltah_prime * Math.PI) / 360);

  const T =
    1 -
    0.17 * Math.cos((H_prime - 30) * (Math.PI / 180)) +
    0.24 * Math.cos(2 * H_prime * (Math.PI / 180)) +
    0.32 * Math.cos((3 * H_prime + 6) * (Math.PI / 180)) -
    0.20 * Math.cos((4 * H_prime - 63) * (Math.PI / 180));

  const DeltaTheta = 30 * Math.exp(-Math.pow((H_prime - 275) / 25, 2));
  const C_bar_prime = (C1_prime + C2_prime) / 2;
  const C_bar_prime_7 = Math.pow(C_bar_prime, 7);
  const RC = Math.sqrt(C_bar_prime_7 / (C_bar_prime_7 + 6103515625));
  // 注意：使用平均明度 L_bar = (L1 + L2) / 2，不是 L1 + L2
  const L_bar = (L1 + L2) / 2;
  const SL =
    1 +
    (0.015 * Math.pow(L_bar - 50, 2)) / Math.sqrt(20 + Math.pow(L_bar - 50, 2));
  const SC = 1 + 0.045 * C_bar_prime;
  const SH = 1 + 0.015 * C_bar_prime * T;
  const RT = -2 * RC * Math.sin((2 * DeltaTheta * Math.PI) / 180);

  const deltaE = Math.sqrt(
    Math.pow(DeltaL_prime / (kL * SL), 2) +
      Math.pow(DeltaC_prime / (kC * SC), 2) +
      Math.pow(DeltaH_prime / (kH * SH), 2) +
      RT * (DeltaC_prime / (kC * SC)) * (DeltaH_prime / (kH * SH)),
  );

  return {
    deltaE,
    deltaL: DeltaL_prime,
    deltaC: DeltaC_prime,
    deltaH: DeltaH_prime,
    method: 'CIEDE2000',
    perceptualNote: getPerceptualNote(deltaE),
  };
}

// ============================================================================
// RGB 与 XYZ 转换
// ============================================================================

/**
 * sRGB 转 CIE XYZ
 *
 * 公式来源：IEC 61966-2-1:1999
 * 使用 D65 标准光源作为参考白
 *
 * @param r - 红色通道 (0-1)
 * @param g - 绿色通道 (0-1)
 * @param b - 蓝色通道 (0-1)
 * @returns CIE XYZ 三刺激值
 */
export function rgbToXYZ(r: number, g: number, b: number): CIEXYZ {
  // 确保输入在有效范围内
  const rClamped = clamp(r, 0, 1);
  const gClamped = clamp(g, 0, 1);
  const bClamped = clamp(b, 0, 1);

  // 1. 应用 sRGB 电光转换函数 (EOTF)
  const rLinear = sRGBToLinear(rClamped);
  const gLinear = sRGBToLinear(gClamped);
  const bLinear = sRGBToLinear(bClamped);

  // 2. 应用转换矩阵 (sRGB -> XYZ, D65 白点)
  // 矩阵来源：IEC 61966-2-1:1999
  const x = rLinear * 0.4124564 + gLinear * 0.3575761 + bLinear * 0.1804375;
  const y = rLinear * 0.2126729 + gLinear * 0.7151522 + bLinear * 0.0721750;
  const z = rLinear * 0.0193339 + gLinear * 0.1191920 + bLinear * 0.9503041;

  return { x, y, z };
}

/**
 * CIE XYZ 转 sRGB
 *
 * @param xyz - CIE XYZ 三刺激值
 * @returns RGB 颜色值 (0-1)
 */
export function xyzToRgb(xyz: CIEXYZ): RGBColor {
  // 1. 应用逆转换矩阵 (XYZ -> sRGB, D65 白点)
  const rLinear = xyz.x * 3.2404542 + xyz.y * -1.5371385 + xyz.z * -0.4985314;
  const gLinear = xyz.x * -0.9692660 + xyz.y * 1.8760108 + xyz.z * 0.0415560;
  const bLinear = xyz.x * 0.0556434 + xyz.y * -0.2040259 + xyz.z * 1.0572252;

  // 2. 应用 sRGB 逆电光转换函数 (Gamma 校正)
  const r = linearToSRGB(rLinear);
  const g = linearToSRGB(gLinear);
  const b = linearToSRGB(bLinear);

  return {
    r: clamp(r, 0, 1),
    g: clamp(g, 0, 1),
    b: clamp(b, 0, 1),
  };
}

/**
 * sRGB 电光转换函数 (将非线性 sRGB 转换为线性光)
 */
function sRGBToLinear(value: number): number {
  if (value <= 0.04045) {
    return value / 12.92;
  } else {
    return Math.pow((value + 0.055) / 1.055, 2.4);
  }
}

/**
 * sRGB 逆电光转换函数 (Gamma 校正)
 */
function linearToSRGB(value: number): number {
  if (value <= 0.0031308) {
    return value * 12.92;
  } else {
    return 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
  }
}

/**
 * 限制数值在指定范围内
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// ============================================================================
// 色差感知描述
// ============================================================================

/**
 * 获取色差的感知描述
 *
 * @param deltaE - 色差值
 * @returns 感知描述字符串
 */
export function getPerceptualNote(deltaE: number): string {
  for (const threshold of DELTA_E_PERCEPTUAL_THRESHOLDS) {
    if (deltaE < threshold.deltaE) {
      return threshold.description;
    }
  }
  return '完全不同的颜色';
}

/**
 * 获取色差的完整感知信息
 */
export function getPerceptualInfo(deltaE: number): {
  description: string;
  level: 'excellent' | 'good' | 'fair' | 'poor' | 'unacceptable';
  visible: boolean;
  acceptable: boolean;
} {
  for (const threshold of DELTA_E_PERCEPTUAL_THRESHOLDS) {
    if (deltaE < threshold.deltaE) {
      return {
        description: threshold.description,
        level: threshold.level as 'excellent' | 'good' | 'fair' | 'poor' | 'unacceptable',
        visible: threshold.visible,
        acceptable: threshold.acceptable,
      };
    }
  }
  return {
    description: '完全不同的颜色',
    level: 'unacceptable',
    visible: true,
    acceptable: false,
  };
}

// ============================================================================
// CIE/ISO 专业评级标准
// ============================================================================

/**
 * CIE/ISO 专业评级标准
 *
 * 基于 CIE 15:2018、ISO 11664-6:2014 等国际标准文献
 * 用于印刷、纺织、汽车等行业的质量控制和公差设定
 *
 * 注：不同行业和应用场景的阈值可能有所不同
 * - 印刷行业 (ISO 12647): ΔE*00 < 2.0 通常被视为可接受
 * - 纺织行业 (AATCC): ΔE*00 < 1.0 为优等品
 * - 汽车行业: 外观件通常要求 ΔE*00 < 1.0
 */
const CIE_ISO_PROFESSIONAL_RATINGS = [
  { maxDeltaE: 0.5, grade: '优等 (Grade A)', description: '极严格的容差，用于高端印刷和精密匹配', application: '高端印刷、实验室标准' },
  { maxDeltaE: 1.0, grade: '一等品 (Grade B)', description: '严格的商业容差，肉眼几乎不可察觉', application: '汽车外观件、品牌标志' },
  { maxDeltaE: 2.0, grade: '合格品 (Grade C)', description: '可接受的商业容差，专业观察者能察觉', application: '一般印刷、纺织品' },
  { maxDeltaE: 4.0, grade: '边缘合格 (Grade D)', description: '较宽松的容差，明显可见但不严重', application: '包装材料、非关键部件' },
  { maxDeltaE: Infinity, grade: '不合格 (Fail)', description: '超出可接受范围', application: '需返工或报废' },
];

/**
 * 获取 CIE/ISO 专业评级
 *
 * @param deltaE - 色差值 (建议使用 ΔE*00)
 * @returns 专业评级信息
 */
export function getProfessionalRating(deltaE: number): {
  grade: string;
  description: string;
  application: string;
} {
  for (const rating of CIE_ISO_PROFESSIONAL_RATINGS) {
    if (deltaE <= rating.maxDeltaE) {
      return {
        grade: rating.grade,
        description: rating.description,
        application: rating.application,
      };
    }
  }
  return {
    grade: '不合格 (Fail)',
    description: '严重色差',
    application: '需立即处理',
  };
}

// ============================================================================
// 完整色差计算 (返回详细结果)
// ============================================================================

/**
 * 计算色差的完整结果
 */
export function calculateColorDifference(
  lab1: CIELABColor,
  lab2: CIELABColor,
  method: 'CIE76' | 'CIE94' | 'CIEDE2000' = 'CIEDE2000',
): ColorDifferenceResult {
  let deltaE: number;
  let deltaL: number | undefined;
  let deltaC: number | undefined;
  let deltaH: number | undefined;

  switch (method) {
    case 'CIE76':
      deltaE = calculateDeltaE76(lab1, lab2);
      deltaL = lab2.L - lab1.L;
      break;
    case 'CIE94':
      const result94 = calculateDeltaE94Full(lab1, lab2);
      deltaE = result94.deltaE;
      deltaL = result94.deltaL;
      deltaC = result94.deltaC;
      deltaH = result94.deltaH;
      break;
    case 'CIEDE2000':
      const result00 = calculateDeltaE00Full(lab1, lab2);
      deltaE = result00.deltaE;
      deltaL = result00.deltaL;
      deltaC = result00.deltaC;
      deltaH = result00.deltaH;
      break;
  }

  return {
    deltaE,
    deltaL,
    deltaC,
    deltaH,
    method,
    perceptualNote: getPerceptualNote(deltaE),
  };
}

// ============================================================================
// 辅助计算函数
// ============================================================================

/**
 * 计算光谱功率分布的 XYZ 三刺激值
 *
 * @param spd - 光谱功率分布数据
 * @param cmf - 色匹配函数数据
 * @param illuminant - 光源 SPD (可选)
 * @returns XYZ 三刺激值
 */
export function calculateXYZFromSpectrum(
  spd: { wavelength: number; power: number }[],
  cmf: { wavelength: number; xbar: number; ybar: number; zbar: number }[],
  illuminant?: { wavelength: number; power: number }[],
): CIEXYZ {
  let X = 0;
  let Y = 0;
  let Z = 0;
  let kSum = 0;

  for (const sample of spd) {
    const { wavelength, power } = sample;

    // 查找对应的 CMF 值
    const cmfMatch = cmf.find((c) => c.wavelength === wavelength);
    if (!cmfMatch) continue;

    // 如果有光源数据，需要考虑光源 SPD
    let illuminantPower = 1;
    if (illuminant) {
      const illumMatch = illuminant.find((i) => i.wavelength === wavelength);
      illuminantPower = illumMatch ? illumMatch.power : 0;
    }

    const effectivePower = power * illuminantPower;

    X += cmfMatch.xbar * effectivePower;
    Y += cmfMatch.ybar * effectivePower;
    Z += cmfMatch.zbar * effectivePower;
    kSum += cmfMatch.ybar * illuminantPower;
  }

  // 归一化
  const k = 100 / kSum;

  return {
    x: k * X,
    y: k * Y,
    z: k * Z,
  };
}

/**
 * 计算 xy 色品坐标
 */
export function xyFromXYZ(xyz: CIEXYZ): { x: number; y: number } {
  const sum = xyz.x + xyz.y + xyz.z;
  if (sum === 0) {
    return { x: 0, y: 0 };
  }
  return {
    x: xyz.x / sum,
    y: xyz.y / sum,
  };
}

/**
 * 从 xyY 计算 XYZ
 */
export function xyYToXYZ(xyY: { x: number; y: number; Y: number }): CIEXYZ {
  const { x, y, Y } = xyY;
  if (y === 0) {
    return { x: 0, y: 0, z: 0 };
  }
  return {
    x: (x * Y) / y,
    y: Y,
    z: ((1 - x - y) * Y) / y,
  };
}

/**
 * 计算相关色温 (CCT) 使用 Robertson 方法
 *
 * @param uv - CIE 1960 UCS 色品坐标
 * @returns 相关色温 (K)
 */
export function calculateCCT(uv: { u: number; v: number }): number | null {
  // Robertson 方法的简化实现
  // 这里使用 McCamy 近似公式作为替代
  const xy = uvToXY(uv);
  const n = (xy.x - 0.3320) / (0.1858 - xy.y);
  const CCT = 449 * Math.pow(n, 3) + 3525 * Math.pow(n, 2) + 6823.3 * n + 5520.33;

  // McCamy 公式有效范围：2000K - 10000K
  if (CCT < 2000 || CCT > 10000) {
    return null;
  }

  return CCT;
}

/**
 * CIE 1960 UCS 转 CIE 1931 xy
 */
function uvToXY(uv: { u: number; v: number }): { x: number; y: number } {
  const u = uv.u;
  const v = uv.v;
  const x = (3 * u) / (2 * u - 8 * v + 4);
  const y = v / (2 * u - 8 * v + 4);
  return { x, y };
}

/**
 * CIE 1931 xy 转 CIE 1960 UCS
 */
export function xyToUV(xy: { x: number; y: number }): { u: number; v: number } {
  const x = xy.x;
  const y = xy.y;
  const u = (4 * x) / (-2 * x + 12 * y + 3);
  const v = (6 * y) / (-2 * x + 12 * y + 3);
  return { u, v };
}

/**
 * 将十六进制颜色代码转为 RGB
 */
export function hexToRgb(hex: string): RGBColor | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;

  return {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  };
}

/**
 * 将 RGB 转为十六进制颜色代码
 */
export function rgbToHex(rgb: RGBColor): string {
  const toHex = (n: number): string => {
    const val = Math.round(n * 255);
    const hex = val.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}
