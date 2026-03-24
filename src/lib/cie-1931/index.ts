/**
 * CIE 1931 色品图库 - 统一导出
 *
 * @example
 * // 导入组件
 * import CIE1931Explorer from '@/lib/cie-1931';
 *
 * // 导入工具函数
 * import { xyToRgb, wavelengthToHsl } from '@/lib/cie-1931';
 *
 * // 导入常量
 * import { SPECTRAL_LOCUS, CANVAS_CONFIG } from '@/lib/cie-1931';
 *
 * // 导入生成器
 * import { generateCIEChromaticityDataURL } from '@/lib/cie-1931/generator';
 */

// React 组件
export { default } from './Explorer';
export type { CIE1931ExplorerProps } from './Explorer';

// 常量
export {
  SPECTRAL_LOCUS,
  PLANCKIAN_LOCUS,
  SRGB_PRIMARIES,
  WHITEPOINTS,
  CANVAS_CONFIG,
} from './constants';

// 工具函数
export {
  xyToRgb,
  rgbToCss,
  isInsideSpectralLocus,
  pointInTriangle,
  isInsideSRGBGamut,
  wavelengthToHsl,
  cieToCanvas,
  canvasToCie,
} from './utils';

// 生成器函数
export {
  generateCIEChromaticityDiagram,
  generateCIEChromaticityDataURL,
  generateCIEChromaticityDiagramAsync,
} from './generator';

export type { CIEChromaticityOptions } from './generator';