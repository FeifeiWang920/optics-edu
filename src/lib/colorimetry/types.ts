/**
 * 色度学基础数据类型定义
 * 参考标准：CIE 15:2018, CIE 015:2018
 */

// ============================================================================
// 章节数据结构
// ============================================================================

export interface ChapterData {
  id: string;
  title: string;
  subtitle: string;
  feynmanRef?: string;
  cieRef?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // 分钟
}

// ============================================================================
// 色匹配函数与视锥响应
// ============================================================================

/**
 * CIE 1931 2° 标准观察者色匹配函数
 * 波长范围：380-780nm，步长：1nm 或 10nm
 */
export interface ColorMatchingFunction {
  wavelength: number; // nm
  xbar: number;
  ybar: number;
  zbar: number;
}

/**
 * LMS 视锥响应数据 (Stockman & Sharpe 2000)
 * L: 长波敏感视锥 (红)
 * M: 中波敏感视锥 (绿)
 * S: 短波敏感视锥 (蓝)
 */
export interface LMSResponse {
  wavelength: number; // nm
  l: number;
  m: number;
  s: number;
}

/**
 * 光谱功率分布 (Spectral Power Distribution)
 */
export interface SpectralPowerDistribution {
  name: string;
  data: { wavelength: number; power: number }[];
  type: 'illuminant' | 'emitter' | 'reflector';
}

// ============================================================================
// CIE XYZ 与 CIELAB 颜色空间
// ============================================================================

/**
 * CIE XYZ 三刺激值
 */
export interface CIEXYZ {
  x: number;
  y: number;
  z: number;
}

/**
 * CIELAB (L*a*b*) 颜色空间
 * L*: 明度 (0-100)
 * a*: 红绿轴 (负值=绿，正值=红)
 * b*: 黄蓝轴 (负值=蓝，正值=黄)
 */
export interface CIELABColor {
  L: number;
  a: number;
  b: number;
}

/**
 * CIELUV 颜色空间
 */
export interface CIELUVColor {
  L: number;
  u: number;
  v: number;
}

/**
 * CIE xy 色品坐标
 */
export interface CIExyY {
  x: number;
  y: number;
  Y: number;
}

// ============================================================================
// 色差计算相关
// ============================================================================

/**
 * 色差计算结果
 */
export interface ColorDifferenceResult {
  deltaE: number;
  deltaL?: number;
  deltaC?: number;
  deltaH?: number;
  method: 'CIE76' | 'CIE94' | 'CIEDE2000' | 'CMC';
  perceptualNote: string;
}

/**
 * CIE94 色差计算参数
 */
export interface CIE94Params {
  kL: number; // 明度权重
  kC: number; // 彩度权重
  kH: number; // 色相权重
  K1: number; // 彩度因子
  K2: number; // 色相因子
}

/**
 * CIEDE2000 色差计算参数
 */
export interface CIEDE2000Params {
  kL: number; // 明度权重 (通常=1)
  kC: number; // 彩度权重 (通常=1)
  kH: number; // 色相权重 (通常=1)
}

// ============================================================================
// MacAdam 椭圆
// ============================================================================

/**
 * MacAdam 椭圆参数
 * 描述人眼对颜色差异的感知阈值
 */
export interface MacAdamEllipse {
  center: { x: number; y: number }; // 椭圆中心 (xy 色品坐标)
  semiMajor: number; // 半长轴
  semiMinor: number; // 半短轴
  angle: number; // 旋转角度 (度)
  order: number; // 椭圆阶数 (表示可感知差异的倍数)
}

// ============================================================================
// RGB 与色域
// ============================================================================

/**
 * RGB 颜色值 (归一化到 0-1)
 */
export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

/**
 * 色域定义
 */
export interface ColorGamut {
  name: string;
  primaries: {
    red: CIEXYZ;
    green: CIEXYZ;
    blue: CIEXYZ;
  };
  whitePoint: CIEXYZ;
}

// ============================================================================
// 标准光源
// ============================================================================

/**
 * 标准光源类型
 */
export type StandardIlluminant =
  | 'A'      // 白炽灯 (2856K)
  | 'B'      // 直射阳光 (4874K，已废弃)
  | 'C'      // 平均日光 (6774K)
  | 'D50'    // 色温 5003K (印刷行业)
  | 'D55'    // 色温 5503K
  | 'D65'    // 平均日光 (6504K，最常用)
  | 'D75'    // 色温 7504K
  | 'E'      // 等能光源
  | 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6'   // 荧光灯
  | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12'; // 荧光灯

/**
 * 标准光源数据
 */
export interface IlluminantData {
  name: StandardIlluminant;
  description: string;
  correlatedColorTemperature: number; // 相关色温 (K)
  xy: { x: number; y: number };
  XYZ: CIEXYZ;
}

// ============================================================================
// 色温与黑体辐射
// ============================================================================

/**
 * 黑体辐射数据
 */
export interface BlackbodyRadiation {
  temperature: number; // 色温 (K)
  chromaticity: { x: number; y: number };
  XYZ: CIEXYZ;
}

/**
 * 色温范围
 */
export interface ColorTemperatureRange {
  min: number; // 最小色温 (K)
  max: number; // 最大色温 (K)
}

// ============================================================================
// 光谱轨迹
// ============================================================================

/**
 * 光谱轨迹点
 */
export interface SpectralLocusPoint {
  wavelength: number; // nm
  x: number;
  y: number;
  color: string; // 对应的近似 RGB 颜色
}

// ============================================================================
// 同色异谱
// ============================================================================

/**
 * 同色异谱对
 * 两种不同光谱在特定光源下呈现相同颜色
 */
export interface MetamericPair {
  name1: string;
  name2: string;
  spectrum1: SpectralPowerDistribution;
  spectrum2: SpectralPowerDistribution;
  matchingXYZ: CIEXYZ;
  illuminant: StandardIlluminant;
}

// ============================================================================
// 工具类型
// ============================================================================

/**
 * 波长范围配置
 */
export interface WavelengthRange {
  min: number; // 380
  max: number; // 780
  step: number; // 1 或 10
}

/**
 * 颜色感知描述
 */
export interface PerceptualDescription {
  deltaE: number;
  description: string;
  visible: boolean;
  acceptable: boolean;
}
