/**
 * 色度学基础模块索引
 *
 * @module colorimetry
 */

// 类型导出
export type {
  ChapterData,
  ColorMatchingFunction,
  LMSResponse,
  SpectralPowerDistribution,
  CIEXYZ,
  CIELABColor,
  CIELUVColor,
  CIExyY,
  ColorDifferenceResult,
  CIE94Params,
  CIEDE2000Params,
  MacAdamEllipse,
  RGBColor,
  ColorGamut,
  StandardIlluminant,
  IlluminantData,
  BlackbodyRadiation,
  ColorTemperatureRange,
  SpectralLocusPoint,
  MetamericPair,
  WavelengthRange,
  PerceptualDescription,
} from './types';

// 数据导出
export {
  CIE_1931_CMF_10NM,
  CIE_1931_CMF_5NM,
  STOCKMAN_SHARPE_LMS_10NM,
  MACADAM_ELLIPSES,
  SPECTRAL_LOCUS,
  ILLUMINANT_D65,
  ILLUMINANT_D50,
  DAYLIGHT_D65_SPD,
  getCMFatWavelength,
  getLMSatWavelength,
} from './data';

// 工具函数导出
export {
  // XYZ 与 CIELAB 转换
  xyzToCIELAB,
  cielabToXYZ,
  // CIELAB 与 LCH 转换
  labToLCH,
  lchToLab,
  // 色差计算
  calculateDeltaE76,
  calculateDeltaE94,
  calculateDeltaE94Full,
  calculateDeltaE00,
  calculateDeltaE00Full,
  // RGB 与 XYZ 转换
  rgbToXYZ,
  xyzToRgb,
  // 色差感知
  getPerceptualNote,
  getPerceptualInfo,
  calculateColorDifference,
  // 辅助计算
  calculateXYZFromSpectrum,
  xyFromXYZ,
  xyYToXYZ,
  calculateCCT,
  xyToUV,
  hexToRgb,
  rgbToHex,
} from './utils';
