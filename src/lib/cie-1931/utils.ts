/**
 * CIE 1931 色度学核心算法
 *
 * 基于 CIE 15: Colorimetry 标准和 IEC 61966-2-1 sRGB 规范
 */

/**
 * 将 CIE xy 色品坐标转换为近似 RGB 颜色
 *
 * @param x - CIE x 色品坐标 (0-1)
 * @param y - CIE y 色品坐标 (0-1)
 * @returns RGB 值数组 [r, g, b]，范围 0-1
 *
 * @remarks
 * 使用 xyY -> XYZ -> sRGB 转换流程：
 * 1. xyY -> XYZ: X = (x/y)×Y, Z = ((1-x-y)/y)×Y
 * 2. XYZ -> 线性 sRGB: 使用 3×3 变换矩阵
 * 3. 线性 sRGB -> gamma 校正: sRGB EOTF (0.0031308 阈值, 1/2.4 指数)
 * 4. 色域外处理: 裁剪负值，归一化超限值以保持色调
 */
export function xyToRgb(x: number, y: number): [number, number, number] {
  // xyY -> XYZ 转换（使用 Y=1.0 固定亮度）
  const Y = 1.0;
  const X = (x / y) * Y;
  const Z = ((1 - x - y) / y) * Y;

  // XYZ -> 线性 sRGB 转换矩阵 (列主序，IEC 61966-2-1)
  let r = 3.2404542 * X - 1.5371385 * Y - 0.4985314 * Z;
  let g = -0.9692660 * X + 1.8760108 * Y + 0.0415560 * Z;
  let b = 0.0556434 * X - 0.2040259 * Y + 1.0572252 * Z;

  // 色域外处理：先裁剪负值以保持色调
  r = Math.max(0, r);
  g = Math.max(0, g);
  b = Math.max(0, b);

  // 归一化超限值（缩放到 [0,1] 范围）
  const maxComponent = Math.max(r, g, b);
  if (maxComponent > 1.0) {
    const scale = 1.0 / maxComponent;
    r *= scale;
    g *= scale;
    b *= scale;
  }

  // sRGB Gamma 校正 (EOTF)
  const gammaCorrect = (c: number): number => {
    return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  };

  return [gammaCorrect(r), gammaCorrect(g), gammaCorrect(b)];
}

/**
 * 将 RGB 值转换为 CSS 颜色字符串
 *
 * @param r - 红色分量 (0-1)
 * @param g - 绿色分量 (0-1)
 * @param b - 蓝色分量 (0-1)
 * @returns CSS rgb() 颜色字符串
 */
export function rgbToCss(r: number, g: number, b: number): string {
  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}

/**
 * 判断点是否在光谱轨迹内部
 *
 * @param x - CIE x 色品坐标
 * @param y - CIE y 色品坐标
 * @param locus - 光谱轨迹数据 [[nm, x, y], ...]
 * @returns 是否在光谱轨迹内部
 *
 * @remarks
 * 使用射线法判断点是否在多边形内部
 */
export function isInsideSpectralLocus(
  x: number,
  y: number,
  locus: [number, number, number][]
): boolean {
  let inside = false;
  for (let i = 0, j = locus.length - 1; i < locus.length; j = i++) {
    const xi = locus[i][1], yi = locus[i][2];
    const xj = locus[j][1], yj = locus[j][2];
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  return inside;
}

/**
 * 判断点是否在三角形内部（重心坐标法）
 *
 * @param px - 测试点 x 坐标
 * @param py - 测试点 y 坐标
 * @param p1 - 三角形顶点 1
 * @param p2 - 三角形顶点 2
 * @param p3 - 三角形顶点 3
 * @returns 是否在三角形内部
 */
export function pointInTriangle(
  px: number,
  py: number,
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number }
): boolean {
  const area = 0.5 * (-p2.y * p3.x + p1.y * (-p2.x + p3.x) + p1.x * (p2.y - p3.y) + p2.x * p3.y);
  const s = 1 / (2 * area) * (p1.y * p3.x - p1.x * p3.y + (p3.y - p1.y) * px + (p1.x - p3.x) * py);
  const t = 1 / (2 * area) * (p1.x * p2.y - p1.y * p2.x + (p1.y - p2.y) * px + (p2.x - p1.x) * py);
  return s >= 0 && t >= 0 && 1 - s - t >= 0;
}

/**
 * 判断点是否在 sRGB 色域内
 *
 * @param x - CIE x 色品坐标
 * @param y - CIE y 色品坐标
 * @param primaries - sRGB 原色坐标 { red, green, blue }
 * @returns 是否在 sRGB 色域内
 */
export function isInsideSRGBGamut(
  x: number,
  y: number,
  primaries: { red: { x: number; y: number }; green: { x: number; y: number }; blue: { x: number; y: number } }
): boolean {
  return pointInTriangle(x, y, primaries.red, primaries.green, primaries.blue);
}

/**
 * 将波长转换为近似的 HSL 颜色（用于光谱轨迹边界线）
 *
 * @param nm - 波长 (nm)
 * @returns CSS hsl() 颜色字符串
 *
 * @remarks
 * 基于波长到色相的平滑映射，用于绘制光谱轨迹边界线
 */
export function wavelengthToHsl(nm: number): string {
  if (nm < 380) return 'hsl(280, 100%, 50%)';
  if (nm < 420) return `hsl(${260 + (nm - 380) * 0.5}, 100%, ${50 + (nm - 380) * 0.1}%)`;
  if (nm < 450) return `hsl(${240 + (nm - 420) * 0.67}, 100%, ${55 + (nm - 420) * 0.17}%)`;
  if (nm < 490) return `hsl(${220 - (nm - 450) * 1.25}, 100%, ${55 + (nm - 450) * 0.25}%)`;
  if (nm < 510) return `hsl(${180 - (nm - 490) * 2}, 100%, ${50 + (nm - 490) * 0.5}%)`;
  if (nm < 550) return `hsl(${140 - (nm - 510) * 2.5}, 100%, ${55 - (nm - 510) * 0.25}%)`;
  if (nm < 580) return `hsl(${60 - (nm - 550) * 1.33}, 100%, ${55 - (nm - 550) * 0.17}%)`;
  if (nm < 620) return `hsl(${35 - (nm - 580) * 0.5}, 100%, ${55 - (nm - 580) * 0.125}%)`;
  if (nm < 700) return `hsl(${10 - (nm - 620) * 0.25}, 100%, ${50 - (nm - 620) * 0.0625}%)`;
  return 'hsl(0, 100%, 50%)';
}

/**
 * 坐标转换：CIE 色品坐标 -> 画布像素坐标
 *
 * @param cx - CIE x 色品坐标
 * @param cy - CIE y 色品坐标
 * @param config - 画布配置
 * @returns 画布像素坐标 [px, py]
 */
export function cieToCanvas(
  cx: number,
  cy: number,
  config: { width: number; height: number; padding: number; xMin: number; xMax: number; yMin: number; yMax: number }
): [number, number] {
  const { padding, width, height, xMin, xMax, yMin, yMax } = config;
  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;

  const px = padding + ((cx - xMin) / (xMax - xMin)) * plotWidth;
  const py = (height - padding) - ((cy - yMin) / (yMax - yMin)) * plotHeight;

  return [px, py];
}

/**
 * 坐标转换：画布像素坐标 -> CIE 色品坐标
 *
 * @param px - 画布 x 像素坐标
 * @param py - 画布 y 像素坐标
 * @param config - 画布配置
 * @returns CIE 色品坐标 [cx, cy]
 */
export function canvasToCie(
  px: number,
  py: number,
  config: { width: number; height: number; padding: number; xMin: number; xMax: number; yMin: number; yMax: number }
): [number, number] {
  const { padding, width, height, xMin, xMax, yMin, yMax } = config;
  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;

  const cx = xMin + ((px - padding) / plotWidth) * (xMax - xMin);
  const cy = yMax - ((py - padding) / plotHeight) * (yMax - yMin);

  return [cx, cy];
}