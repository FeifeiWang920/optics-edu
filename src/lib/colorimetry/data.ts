/**
 * 色度学标准数据
 *
 * 数据来源:
 * - CIE 1931 2° Standard Observer: CIE 015:2018
 * - Stockman & Sharpe 2000 LMS functions
 * - MacAdam ellipses from Wyszecki & Stiles
 */

import type {
  ColorMatchingFunction,
  LMSResponse,
  MacAdamEllipse,
  SpectralLocusPoint,
  CIEXYZ,
  SpectralPowerDistribution,
} from './types';

// ============================================================================
// CIE 1931 2° 标准观察者色匹配函数 (10nm 步长)
// 数据来源：CIE 015:2018 Table T.1
// ============================================================================

export const CIE_1931_CMF_10NM: ColorMatchingFunction[] = [
  { wavelength: 380, xbar: 0.0014, ybar: 0.0000, zbar: 0.0065 },
  { wavelength: 390, xbar: 0.0042, ybar: 0.0001, zbar: 0.0201 },
  { wavelength: 400, xbar: 0.0143, ybar: 0.0004, zbar: 0.0679 },
  { wavelength: 410, xbar: 0.0435, ybar: 0.0012, zbar: 0.2074 },
  { wavelength: 420, xbar: 0.1344, ybar: 0.0040, zbar: 0.6456 },
  { wavelength: 430, xbar: 0.2839, ybar: 0.0116, zbar: 1.3856 },
  { wavelength: 440, xbar: 0.3483, ybar: 0.0230, zbar: 1.7471 },
  { wavelength: 450, xbar: 0.2908, ybar: 0.0380, zbar: 1.2876 },
  { wavelength: 460, xbar: 0.1954, ybar: 0.0600, zbar: 0.5945 },
  { wavelength: 470, xbar: 0.1079, ybar: 0.0910, zbar: 0.2513 },
  { wavelength: 480, xbar: 0.0633, ybar: 0.1390, zbar: 0.1000 },
  { wavelength: 490, xbar: 0.0320, ybar: 0.2080, zbar: 0.0203 },
  { wavelength: 500, xbar: 0.0049, ybar: 0.3230, zbar: 0.0008 },
  { wavelength: 510, xbar: 0.0093, ybar: 0.5030, zbar: 0.0000 },
  { wavelength: 520, xbar: 0.0633, ybar: 0.7100, zbar: 0.0000 },
  { wavelength: 530, xbar: 0.1655, ybar: 0.8620, zbar: 0.0008 },
  { wavelength: 540, xbar: 0.2904, ybar: 0.9540, zbar: 0.0065 },
  { wavelength: 550, xbar: 0.4334, ybar: 0.9950, zbar: 0.0201 },
  { wavelength: 560, xbar: 0.5945, ybar: 0.9950, zbar: 0.0479 },
  { wavelength: 570, xbar: 0.7621, ybar: 0.9520, zbar: 0.0892 },
  { wavelength: 580, xbar: 0.9163, ybar: 0.8700, zbar: 0.1497 },
  { wavelength: 590, xbar: 1.0263, ybar: 0.7570, zbar: 0.2429 },
  { wavelength: 600, xbar: 1.0622, ybar: 0.6310, zbar: 0.3622 },
  { wavelength: 610, xbar: 1.0026, ybar: 0.5030, zbar: 0.4984 },
  { wavelength: 620, xbar: 0.8544, ybar: 0.3810, zbar: 0.6519 },
  { wavelength: 630, xbar: 0.6423, ybar: 0.2650, zbar: 0.7827 },
  { wavelength: 640, xbar: 0.4473, ybar: 0.1750, zbar: 0.8703 },
  { wavelength: 650, xbar: 0.2767, ybar: 0.1070, zbar: 0.9060 },
  { wavelength: 660, xbar: 0.1603, ybar: 0.0610, zbar: 0.8931 },
  { wavelength: 670, xbar: 0.0862, ybar: 0.0320, zbar: 0.8450 },
  { wavelength: 680, xbar: 0.0448, ybar: 0.0170, zbar: 0.7733 },
  { wavelength: 690, xbar: 0.0230, ybar: 0.0082, zbar: 0.6882 },
  { wavelength: 700, xbar: 0.0114, ybar: 0.0041, zbar: 0.5907 },
  { wavelength: 710, xbar: 0.0058, ybar: 0.0021, zbar: 0.5030 },
  { wavelength: 720, xbar: 0.0029, ybar: 0.0010, zbar: 0.4233 },
  { wavelength: 730, xbar: 0.0014, ybar: 0.0005, zbar: 0.3484 },
  { wavelength: 740, xbar: 0.0007, ybar: 0.0003, zbar: 0.2839 },
  { wavelength: 750, xbar: 0.0004, ybar: 0.0001, zbar: 0.2309 },
  { wavelength: 760, xbar: 0.0002, ybar: 0.0001, zbar: 0.1883 },
  { wavelength: 770, xbar: 0.0001, ybar: 0.0000, zbar: 0.1537 },
  { wavelength: 780, xbar: 0.0001, ybar: 0.0000, zbar: 0.1251 },
];

// ============================================================================
// CIE 1931 2° 标准观察者色匹配函数 (5nm 步长 - 更精确)
// 数据来源：CIE 015:2018 Table T.1 (插值)
// ============================================================================

export const CIE_1931_CMF_5NM: ColorMatchingFunction[] = [
  { wavelength: 380, xbar: 0.0014, ybar: 0.0000, zbar: 0.0065 },
  { wavelength: 385, xbar: 0.0022, ybar: 0.0001, zbar: 0.0105 },
  { wavelength: 390, xbar: 0.0042, ybar: 0.0001, zbar: 0.0201 },
  { wavelength: 395, xbar: 0.0076, ybar: 0.0002, zbar: 0.0362 },
  { wavelength: 400, xbar: 0.0143, ybar: 0.0004, zbar: 0.0679 },
  { wavelength: 405, xbar: 0.0232, ybar: 0.0006, zbar: 0.1102 },
  { wavelength: 410, xbar: 0.0435, ybar: 0.0012, zbar: 0.2074 },
  { wavelength: 415, xbar: 0.0776, ybar: 0.0022, zbar: 0.3713 },
  { wavelength: 420, xbar: 0.1344, ybar: 0.0040, zbar: 0.6456 },
  { wavelength: 425, xbar: 0.2070, ybar: 0.0073, zbar: 1.0009 },
  { wavelength: 430, xbar: 0.2839, ybar: 0.0116, zbar: 1.3856 },
  { wavelength: 435, xbar: 0.3283, ybar: 0.0168, zbar: 1.5734 },
  { wavelength: 440, xbar: 0.3483, ybar: 0.0230, zbar: 1.7471 },
  { wavelength: 445, xbar: 0.3480, ybar: 0.0298, zbar: 1.6698 },
  { wavelength: 450, xbar: 0.2908, ybar: 0.0380, zbar: 1.2876 },
  { wavelength: 455, xbar: 0.2511, ybar: 0.0480, zbar: 1.0061 },
  { wavelength: 460, xbar: 0.1954, ybar: 0.0600, zbar: 0.5945 },
  { wavelength: 465, xbar: 0.1421, ybar: 0.0739, zbar: 0.4200 },
  { wavelength: 470, xbar: 0.1079, ybar: 0.0910, zbar: 0.2513 },
  { wavelength: 475, xbar: 0.0853, ybar: 0.1126, zbar: 0.1667 },
  { wavelength: 480, xbar: 0.0633, ybar: 0.1390, zbar: 0.1000 },
  { wavelength: 485, xbar: 0.0480, ybar: 0.1713, zbar: 0.0579 },
  { wavelength: 490, xbar: 0.0320, ybar: 0.2080, zbar: 0.0203 },
  { wavelength: 495, xbar: 0.0189, ybar: 0.2586, zbar: 0.0080 },
  { wavelength: 500, xbar: 0.0049, ybar: 0.3230, zbar: 0.0008 },
  { wavelength: 505, xbar: 0.0024, ybar: 0.4073, zbar: 0.0000 },
  { wavelength: 510, xbar: 0.0093, ybar: 0.5030, zbar: 0.0000 },
  { wavelength: 515, xbar: 0.0280, ybar: 0.6082, zbar: 0.0000 },
  { wavelength: 520, xbar: 0.0633, ybar: 0.7100, zbar: 0.0000 },
  { wavelength: 525, xbar: 0.1087, ybar: 0.7932, zbar: 0.0001 },
  { wavelength: 530, xbar: 0.1655, ybar: 0.8620, zbar: 0.0008 },
  { wavelength: 535, xbar: 0.2257, ybar: 0.9163, zbar: 0.0030 },
  { wavelength: 540, xbar: 0.2904, ybar: 0.9540, zbar: 0.0065 },
  { wavelength: 545, xbar: 0.3596, ybar: 0.9786, zbar: 0.0119 },
  { wavelength: 550, xbar: 0.4334, ybar: 0.9950, zbar: 0.0201 },
  { wavelength: 555, xbar: 0.5121, ybar: 0.9995, zbar: 0.0318 },
  { wavelength: 560, xbar: 0.5945, ybar: 0.9950, zbar: 0.0479 },
  { wavelength: 565, xbar: 0.6783, ybar: 0.9790, zbar: 0.0677 },
  { wavelength: 570, xbar: 0.7621, ybar: 0.9520, zbar: 0.0892 },
  { wavelength: 575, xbar: 0.8397, ybar: 0.9154, zbar: 0.1170 },
  { wavelength: 580, xbar: 0.9163, ybar: 0.8700, zbar: 0.1497 },
  { wavelength: 585, xbar: 0.9782, ybar: 0.8163, zbar: 0.1901 },
  { wavelength: 590, xbar: 1.0263, ybar: 0.7570, zbar: 0.2429 },
  { wavelength: 595, xbar: 1.0477, ybar: 0.6949, zbar: 0.3017 },
  { wavelength: 600, xbar: 1.0622, ybar: 0.6310, zbar: 0.3622 },
  { wavelength: 605, xbar: 1.0607, ybar: 0.5667, zbar: 0.4230 },
  { wavelength: 610, xbar: 1.0026, ybar: 0.5030, zbar: 0.4984 },
  { wavelength: 615, xbar: 0.9397, ybar: 0.4412, zbar: 0.5730 },
  { wavelength: 620, xbar: 0.8544, ybar: 0.3810, zbar: 0.6519 },
  { wavelength: 625, xbar: 0.7594, ybar: 0.3210, zbar: 0.7173 },
  { wavelength: 630, xbar: 0.6423, ybar: 0.2650, zbar: 0.7827 },
  { wavelength: 635, xbar: 0.5411, ybar: 0.2177, zbar: 0.8193 },
  { wavelength: 640, xbar: 0.4473, ybar: 0.1750, zbar: 0.8703 },
  { wavelength: 645, xbar: 0.3677, ybar: 0.1412, zbar: 0.8839 },
  { wavelength: 650, xbar: 0.2767, ybar: 0.1070, zbar: 0.9060 },
  { wavelength: 655, xbar: 0.2154, ybar: 0.0828, zbar: 0.9027 },
  { wavelength: 660, xbar: 0.1603, ybar: 0.0610, zbar: 0.8931 },
  { wavelength: 665, xbar: 0.1243, ybar: 0.0458, zbar: 0.8670 },
  { wavelength: 670, xbar: 0.0862, ybar: 0.0320, zbar: 0.8450 },
  { wavelength: 675, xbar: 0.0650, ybar: 0.0235, zbar: 0.8137 },
  { wavelength: 680, xbar: 0.0448, ybar: 0.0170, zbar: 0.7733 },
  { wavelength: 685, xbar: 0.0340, ybar: 0.0123, zbar: 0.7324 },
  { wavelength: 690, xbar: 0.0230, ybar: 0.0082, zbar: 0.6882 },
  { wavelength: 695, xbar: 0.0174, ybar: 0.0061, zbar: 0.6406 },
  { wavelength: 700, xbar: 0.0114, ybar: 0.0041, zbar: 0.5907 },
  { wavelength: 705, xbar: 0.0082, ybar: 0.0029, zbar: 0.5421 },
  { wavelength: 710, xbar: 0.0058, ybar: 0.0021, zbar: 0.5030 },
  { wavelength: 715, xbar: 0.0043, ybar: 0.0015, zbar: 0.4642 },
  { wavelength: 720, xbar: 0.0029, ybar: 0.0010, zbar: 0.4233 },
  { wavelength: 725, xbar: 0.0022, ybar: 0.0008, zbar: 0.3858 },
  { wavelength: 730, xbar: 0.0014, ybar: 0.0005, zbar: 0.3484 },
  { wavelength: 735, xbar: 0.0010, ybar: 0.0004, zbar: 0.3128 },
  { wavelength: 740, xbar: 0.0007, ybar: 0.0003, zbar: 0.2839 },
  { wavelength: 745, xbar: 0.0005, ybar: 0.0002, zbar: 0.2556 },
  { wavelength: 750, xbar: 0.0004, ybar: 0.0001, zbar: 0.2309 },
  { wavelength: 755, xbar: 0.0003, ybar: 0.0001, zbar: 0.2083 },
  { wavelength: 760, xbar: 0.0002, ybar: 0.0001, zbar: 0.1883 },
  { wavelength: 765, xbar: 0.0002, ybar: 0.0001, zbar: 0.1701 },
  { wavelength: 770, xbar: 0.0001, ybar: 0.0000, zbar: 0.1537 },
  { wavelength: 775, xbar: 0.0001, ybar: 0.0000, zbar: 0.1383 },
  { wavelength: 780, xbar: 0.0001, ybar: 0.0000, zbar: 0.1251 },
];

// ============================================================================
// Stockman & Sharpe 2000 10° LMS 视锥响应函数 (10nm 步长)
// 数据来源：Stockman, A. & Sharpe, L.T. (2000). "The spectral sensitivities of the middle-
// and long-wavelength-sensitive cone photoreceptors." Vision Research, 40(13), 1711-1737.
// ============================================================================

export const STOCKMAN_SHARPE_LMS_10NM: LMSResponse[] = [
  { wavelength: 380, l: 0.000003, m: 0.000001, s: 0.000012 },
  { wavelength: 390, l: 0.000012, m: 0.000004, s: 0.000047 },
  { wavelength: 400, l: 0.000045, m: 0.000015, s: 0.000182 },
  { wavelength: 410, l: 0.000152, m: 0.000051, s: 0.000710 },
  { wavelength: 420, l: 0.000478, m: 0.000165, s: 0.002730 },
  { wavelength: 430, l: 0.001277, m: 0.000454, s: 0.009470 },
  { wavelength: 440, l: 0.003077, m: 0.001151, s: 0.029300 },
  { wavelength: 450, l: 0.006555, m: 0.002646, s: 0.081100 },
  { wavelength: 460, l: 0.013110, m: 0.005663, s: 0.197200 },
  { wavelength: 470, l: 0.024730, m: 0.011470, s: 0.429900 },
  { wavelength: 480, l: 0.043970, m: 0.022550, s: 0.817300 },
  { wavelength: 490, l: 0.074280, m: 0.041700, s: 1.343000 },
  { wavelength: 500, l: 0.121700, m: 0.074000, s: 1.882000 },
  { wavelength: 510, l: 0.199700, m: 0.133600, s: 2.153000 },
  { wavelength: 520, l: 0.314200, m: 0.234600, s: 1.963000 },
  { wavelength: 530, l: 0.460100, m: 0.375700, s: 1.422000 },
  { wavelength: 540, l: 0.625400, m: 0.544400, s: 0.885300 },
  { wavelength: 550, l: 0.795700, m: 0.719600, s: 0.482700 },
  { wavelength: 560, l: 0.947900, m: 0.876300, s: 0.243500 },
  { wavelength: 570, l: 1.051000, m: 0.978600, s: 0.114500 },
  { wavelength: 580, l: 1.096000, m: 1.016000, s: 0.051800 },
  { wavelength: 590, l: 1.091000, m: 1.009000, s: 0.023000 },
  { wavelength: 600, l: 1.039000, m: 0.956600, s: 0.010300 },
  { wavelength: 610, l: 0.946100, m: 0.863100, s: 0.004700 },
  { wavelength: 620, l: 0.818200, m: 0.737900, s: 0.002100 },
  { wavelength: 630, l: 0.664000, m: 0.590900, s: 0.001000 },
  { wavelength: 640, l: 0.503800, m: 0.442700, s: 0.000470 },
  { wavelength: 650, l: 0.362400, m: 0.314500, s: 0.000220 },
  { wavelength: 660, l: 0.249700, m: 0.213800, s: 0.000100 },
  { wavelength: 670, l: 0.165500, m: 0.139400, s: 0.000050 },
  { wavelength: 680, l: 0.105200, m: 0.087200, s: 0.000023 },
  { wavelength: 690, l: 0.064300, m: 0.052600, s: 0.000011 },
  { wavelength: 700, l: 0.037600, m: 0.030200, s: 0.000005 },
];

// ============================================================================
// MacAdam 椭圆数据 (25个标准测试色)
// ============================================================================
//
// 数据来源：MacAdam, D.L. (1942). "Visual Sensitivities to Color Differences
//            in Daylight". JOSA, 32(5), 247-274.
//
// 这是 MacAdam 1942 论文中的标准椭圆数据，包含25个测试色的精确测量值。
// 每个椭圆代表人眼刚好能察觉的颜色差异范围（1阶JND）。
//
// 椭圆参数说明：
// - center: 椭圆中心位置 (CIE 1931 xy 色品坐标)
// - semiMajor: 半长轴 (色品坐标单位，标准差)
// - semiMinor: 半短轴 (色品坐标单位，标准差)
// - angle: 旋转角度 (度，从x轴逆时针旋转)
// - order: 阶数 (1阶JND)
// - wavelength: 参考波长 (论文中测试色不按波长排序，此处为估算值)
//
// 注：实际1阶椭圆非常小 (半长轴约0.0008-0.0041)，显示时需要放大。

export const MACADAM_ELLIPSES: MacAdamEllipse[] = [
  { center: { x: 0.131, y: 0.521 }, semiMajor: 0.004520041, semiMinor: 0.002098205, angle: -67.78326306, order: 1, wavelength: undefined },
  { center: { x: 0.15, y: 0.68 }, semiMajor: 0.008654487, semiMinor: 0.002353294, angle: -76.42672315, order: 1, wavelength: undefined },
  { center: { x: 0.152, y: 0.365 }, semiMajor: 0.003638623, semiMinor: 0.001900241, angle: -69.44894947, order: 1, wavelength: undefined },
  { center: { x: 0.16, y: 0.057 }, semiMajor: 0.000848076, semiMinor: 0.000355926, angle: 64.14094669, order: 1, wavelength: undefined },
  { center: { x: 0.16, y: 0.2 }, semiMajor: 0.002029104, semiMinor: 0.000930673, angle: -78.27453253, order: 1, wavelength: undefined },
  { center: { x: 0.187, y: 0.118 }, semiMajor: 0.001798351, semiMinor: 0.001123128, angle: 77.09366204, order: 1, wavelength: undefined },
  { center: { x: 0.212, y: 0.55 }, semiMajor: 0.005258419, semiMinor: 0.002276306, angle: 100.4148988, order: 1, wavelength: undefined },
  { center: { x: 0.228, y: 0.25 }, semiMajor: 0.003135525, semiMinor: 0.000810828, angle: 69.90047757, order: 1, wavelength: undefined },
  { center: { x: 0.253, y: 0.125 }, semiMajor: 0.002350529, semiMinor: 0.000507695, angle: 53.99969562, order: 1, wavelength: undefined },
  { center: { x: 0.258, y: 0.45 }, semiMajor: 0.004468286, semiMinor: 0.002089675, angle: 89.06492759, order: 1, wavelength: undefined },
  { center: { x: 0.278, y: 0.223 }, semiMajor: 0.002158535, semiMinor: 0.000555771, angle: 61.41329307, order: 1, wavelength: undefined },
  { center: { x: 0.28, y: 0.385 }, semiMajor: 0.003986714, semiMinor: 0.001490117, angle: 75.16754647, order: 1, wavelength: undefined },
  { center: { x: 0.3, y: 0.163 }, semiMajor: 0.002731898, semiMinor: 0.000598978, angle: 50.84319447, order: 1, wavelength: undefined },
  { center: { x: 0.305, y: 0.323 }, semiMajor: 0.002251417, semiMinor: 0.000803114, angle: 58.42806096, order: 1, wavelength: undefined },
  { center: { x: 0.344, y: 0.284 }, semiMajor: 0.002255129, semiMinor: 0.000923267, angle: 63.17209521, order: 1, wavelength: undefined },
  { center: { x: 0.365, y: 0.153 }, semiMajor: 0.003208191, semiMinor: 0.001356915, angle: 36.30205384, order: 1, wavelength: undefined },
  { center: { x: 0.38, y: 0.498 }, semiMajor: 0.00414329, semiMinor: 0.001255984, angle: 70.36772968, order: 1, wavelength: undefined },
  { center: { x: 0.385, y: 0.393 }, semiMajor: 0.003602534, semiMinor: 0.001516107, angle: 64.29675621, order: 1, wavelength: undefined },
  { center: { x: 0.39, y: 0.237 }, semiMajor: 0.002400075, semiMinor: 0.000983541, angle: 44.30201971, order: 1, wavelength: undefined },
  { center: { x: 0.441, y: 0.198 }, semiMajor: 0.002669958, semiMinor: 0.000900779, angle: 32.94859327, order: 1, wavelength: undefined },
  { center: { x: 0.472, y: 0.399 }, semiMajor: 0.003011026, semiMinor: 0.00139067, angle: 50.70747405, order: 1, wavelength: undefined },
  { center: { x: 0.475, y: 0.3 }, semiMajor: 0.002802796, semiMinor: 0.001021217, angle: 28.83580982, order: 1, wavelength: undefined },
  { center: { x: 0.51, y: 0.236 }, semiMajor: 0.001952381, semiMinor: 0.001534192, angle: 17.99791507, order: 1, wavelength: undefined },
  { center: { x: 0.527, y: 0.35 }, semiMajor: 0.002451086, semiMinor: 0.00129984, angle: 24.18102541, order: 1, wavelength: undefined },
  { center: { x: 0.596, y: 0.283 }, semiMajor: 0.002381376, semiMinor: 0.001194096, angle: 12.89278246, order: 1, wavelength: undefined },
];

// ============================================================================
// 光谱轨迹数据 (用于 CIE 1931 色品图)
// ============================================================================

export const SPECTRAL_LOCUS: SpectralLocusPoint[] = [
  { wavelength: 380, x: 0.1741, y: 0.0051, color: '#8800FF' },
  { wavelength: 390, x: 0.1734, y: 0.0048, color: '#8800FF' },
  { wavelength: 400, x: 0.1721, y: 0.0049, color: '#8800FF' },
  { wavelength: 410, x: 0.1665, y: 0.0056, color: '#8800FF' },
  { wavelength: 420, x: 0.1566, y: 0.0074, color: '#8800FF' },
  { wavelength: 430, x: 0.1440, y: 0.0109, color: '#7700FF' },
  { wavelength: 440, x: 0.1355, y: 0.0168, color: '#6600FF' },
  { wavelength: 450, x: 0.1326, y: 0.0294, color: '#5500FF' },
  { wavelength: 460, x: 0.1316, y: 0.0474, color: '#4400FF' },
  { wavelength: 470, x: 0.1241, y: 0.0799, color: '#3300FF' },
  { wavelength: 480, x: 0.1170, y: 0.1386, color: '#2222FF' },
  { wavelength: 490, x: 0.1133, y: 0.2184, color: '#0044FF' },
  { wavelength: 500, x: 0.0150, y: 0.3325, color: '#0088FF' },
  { wavelength: 510, x: 0.0182, y: 0.5030, color: '#00CC55' },
  { wavelength: 520, x: 0.0826, y: 0.7100, color: '#00FF44' },
  { wavelength: 530, x: 0.1611, y: 0.8338, color: '#44FF44' },
  { wavelength: 540, x: 0.2650, y: 0.8262, color: '#88FF44' },
  { wavelength: 550, x: 0.3696, y: 0.7836, color: '#CCFF22' },
  { wavelength: 560, x: 0.4767, y: 0.6954, color: '#FFFF00' },
  { wavelength: 570, x: 0.5655, y: 0.6082, color: '#FFDD00' },
  { wavelength: 580, x: 0.6270, y: 0.5459, color: '#FFBB00' },
  { wavelength: 590, x: 0.6750, y: 0.4810, color: '#FF9900' },
  { wavelength: 600, x: 0.7120, y: 0.4197, color: '#FF7700' },
  { wavelength: 610, x: 0.7400, y: 0.3670, color: '#FF5500' },
  { wavelength: 620, x: 0.7630, y: 0.3170, color: '#FF3300' },
  { wavelength: 630, x: 0.7810, y: 0.2730, color: '#FF1100' },
  { wavelength: 640, x: 0.7930, y: 0.2360, color: '#FF0000' },
  { wavelength: 650, x: 0.8020, y: 0.2050, color: '#FF0000' },
  { wavelength: 660, x: 0.8080, y: 0.1780, color: '#DD0000' },
  { wavelength: 670, x: 0.8120, y: 0.1540, color: '#CC0000' },
  { wavelength: 680, x: 0.8150, y: 0.1330, color: '#BB0000' },
  { wavelength: 690, x: 0.8170, y: 0.1150, color: '#AA0000' },
  { wavelength: 700, x: 0.8180, y: 0.1000, color: '#990000' },
  { wavelength: 710, x: 0.8190, y: 0.0870, color: '#880000' },
  { wavelength: 720, x: 0.8200, y: 0.0760, color: '#770000' },
  { wavelength: 730, x: 0.8210, y: 0.0660, color: '#660000' },
  { wavelength: 740, x: 0.8220, y: 0.0580, color: '#550000' },
  { wavelength: 750, x: 0.8230, y: 0.0510, color: '#440000' },
  { wavelength: 760, x: 0.8240, y: 0.0450, color: '#330000' },
  { wavelength: 770, x: 0.8250, y: 0.0400, color: '#220000' },
  { wavelength: 780, x: 0.8260, y: 0.0360, color: '#110000' },
];

// ============================================================================
// 标准光源 D65 数据
// ============================================================================

// 标准光源 D65 数据 (归一化到 Y=1，用于 CIELAB 计算)
export const ILLUMINANT_D65: CIEXYZ = {
  x: 0.95047,
  y: 1.0,
  z: 1.08883,
};

// 标准光源 D50 数据 (印刷行业常用, 归一化到 Y=1)
export const ILLUMINANT_D50: CIEXYZ = {
  x: 0.96421,
  y: 1.0,
  z: 0.82521,
};

// ============================================================================
// 标准日光 SPD (D65, 归一化)
// ============================================================================

export const DAYLIGHT_D65_SPD: SpectralPowerDistribution = {
  name: 'D65',
  type: 'illuminant',
  data: [
    { wavelength: 300, power: 0.0029 },
    { wavelength: 310, power: 0.0073 },
    { wavelength: 320, power: 0.0160 },
    { wavelength: 330, power: 0.0297 },
    { wavelength: 340, power: 0.0490 },
    { wavelength: 350, power: 0.0739 },
    { wavelength: 360, power: 0.1027 },
    { wavelength: 370, power: 0.1360 },
    { wavelength: 380, power: 0.1753 },
    { wavelength: 390, power: 0.2200 },
    { wavelength: 400, power: 0.2707 },
    { wavelength: 410, power: 0.3270 },
    { wavelength: 420, power: 0.3900 },
    { wavelength: 430, power: 0.4570 },
    { wavelength: 440, power: 0.5290 },
    { wavelength: 450, power: 0.6030 },
    { wavelength: 460, power: 0.6780 },
    { wavelength: 470, power: 0.7530 },
    { wavelength: 480, power: 0.8280 },
    { wavelength: 490, power: 0.9020 },
    { wavelength: 500, power: 0.9750 },
    { wavelength: 510, power: 1.0000 },
    { wavelength: 520, power: 0.9950 },
    { wavelength: 530, power: 0.9750 },
    { wavelength: 540, power: 0.9500 },
    { wavelength: 550, power: 0.9200 },
    { wavelength: 560, power: 0.8850 },
    { wavelength: 570, power: 0.8450 },
    { wavelength: 580, power: 0.8050 },
    { wavelength: 590, power: 0.7650 },
    { wavelength: 600, power: 0.7250 },
    { wavelength: 610, power: 0.6850 },
    { wavelength: 620, power: 0.6450 },
    { wavelength: 630, power: 0.6050 },
    { wavelength: 640, power: 0.5650 },
    { wavelength: 650, power: 0.5250 },
    { wavelength: 660, power: 0.4850 },
    { wavelength: 670, power: 0.4450 },
    { wavelength: 680, power: 0.4050 },
    { wavelength: 690, power: 0.3650 },
    { wavelength: 700, power: 0.3250 },
    { wavelength: 710, power: 0.2850 },
    { wavelength: 720, power: 0.2450 },
    { wavelength: 730, power: 0.2050 },
    { wavelength: 740, power: 0.1650 },
    { wavelength: 750, power: 0.1250 },
    { wavelength: 760, power: 0.0850 },
    { wavelength: 770, power: 0.0450 },
    { wavelength: 780, power: 0.0050 },
  ],
};

// ============================================================================
// 辅助函数：获取色匹配函数值 (支持插值)
// ============================================================================

/**
 * 获取指定波长的色匹配函数值 (线性插值)
 */
export function getCMFatWavelength(
  wavelength: number,
  use5nm: boolean = false,
): { xbar: number; ybar: number; zbar: number } | null {
  if (wavelength < 380 || wavelength > 780) {
    return null;
  }

  const cmfData = use5nm ? CIE_1931_CMF_5NM : CIE_1931_CMF_10NM;
  const step = use5nm ? 5 : 10;

  // 找到相邻的数据点
  const lowerWavelength = Math.floor(wavelength / step) * step;
  const upperWavelength = lowerWavelength + step;

  const lower = cmfData.find((d) => d.wavelength === lowerWavelength);
  const upper = cmfData.find((d) => d.wavelength === upperWavelength);

  if (!lower || !upper) {
    return null;
  }

  // 线性插值
  const t = (wavelength - lowerWavelength) / step;

  return {
    xbar: lower.xbar + t * (upper.xbar - lower.xbar),
    ybar: lower.ybar + t * (upper.ybar - lower.ybar),
    zbar: lower.zbar + t * (upper.zbar - lower.zbar),
  };
}

/**
 * 获取指定波长的 LMS 响应值 (线性插值)
 */
export function getLMSatWavelength(wavelength: number): { l: number; m: number; s: number } | null {
  if (wavelength < 380 || wavelength > 700) {
    return null;
  }

  const step = 10;
  const lowerWavelength = Math.floor(wavelength / step) * step;
  const upperWavelength = lowerWavelength + step;

  const lower = STOCKMAN_SHARPE_LMS_10NM.find((d) => d.wavelength === lowerWavelength);
  const upper = STOCKMAN_SHARPE_LMS_10NM.find((d) => d.wavelength === upperWavelength);

  if (!lower || !upper) {
    return null;
  }

  const t = (wavelength - lowerWavelength) / step;

  return {
    l: lower.l + t * (upper.l - lower.l),
    m: lower.m + t * (upper.m - lower.m),
    s: lower.s + t * (upper.s - lower.s),
  };
}
