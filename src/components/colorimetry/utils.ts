/**
 * 色度学曲线图表共享工具函数
 */

/** 图表配置接口 */
export interface ChartConfig {
  width: number;
  height: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  wavelengthMin: number;
  wavelengthMax: number;
  yMax?: number;
}

/** 曲线数据点 */
export interface CurveDataPoint {
  wavelength: number;
  value: number;
}

/** 曲线颜色配置 */
export interface CurveColor {
  stroke: string;
  fill: string;
  label: string;
  description?: string;
}

/**
 * 根据图表配置生成波长到 X 坐标的转换函数
 */
export function createWavelengthToX(config: ChartConfig) {
  const plotWidth = config.width - config.paddingLeft - config.paddingRight;
  const scale = plotWidth / (config.wavelengthMax - config.wavelengthMin);

  return function wavelengthToX(wavelength: number): number {
    return config.paddingLeft + (wavelength - config.wavelengthMin) * scale;
  };
}

/**
 * 根据图表配置生成值到 Y 坐标的转换函数
 * @param config 图表配置
 * @param normalize 是否归一化到 0-1（默认为 false，使用 yMax）
 */
export function createValueToY(config: ChartConfig, normalize = false) {
  const plotHeight = config.height - config.paddingTop - config.paddingBottom;

  return function valueToY(value: number): number {
    const normalizedValue = normalize ? value : value / (config.yMax ?? 1);
    return config.paddingTop + (1 - normalizedValue) * plotHeight;
  };
}

/**
 * 生成平滑曲线路径
 * @param data 曲线数据点数组
 * @param xFn 波长到 X 坐标的转换函数
 * @param yFn 值到 Y 坐标的转换函数
 * @returns SVG 路径字符串
 */
export function generateSmoothPath(
  data: CurveDataPoint[],
  xFn: (w: number) => number,
  yFn: (v: number) => number,
): string {
  if (data.length === 0) return "";

  const points = data.map((d) => [xFn(d.wavelength), yFn(d.value)] as [number, number]);
  let path = `M ${points[0][0]} ${points[0][1]}`;

  for (let i = 1; i < points.length; i++) {
    const curr = points[i];
    path += ` L ${curr[0]} ${curr[1]}`;
  }

  return path;
}

/**
 * 生成填充区域路径
 * @param curvePath 曲线路径
 * @param config 图表配置
 * @param xMin 最小波长（用于填充区域左边界）
 * @param xMax 最大波长（用于填充区域右边界）
 * @returns SVG 填充区域路径字符串
 */
export function generateAreaPath(
  curvePath: string,
  config: ChartConfig,
  xMin = config.wavelengthMin,
  xMax = config.wavelengthMax,
): string {
  const wavelengthToX = createWavelengthToX(config);
  const baseY = config.height - config.paddingBottom;

  // 获取曲线起始和结束点的 X 坐标
  const startX = wavelengthToX(xMin);
  const endX = wavelengthToX(xMax);

  return `${curvePath} L ${endX} ${baseY} L ${startX} ${baseY} Z`;
}

/**
 * 获取图表的绘图区域尺寸
 */
export function getPlotDimensions(config: ChartConfig) {
  return {
    width: config.width - config.paddingLeft - config.paddingRight,
    height: config.height - config.paddingTop - config.paddingBottom,
    left: config.paddingLeft,
    top: config.paddingTop,
    right: config.width - config.paddingRight,
    bottom: config.height - config.paddingBottom,
  };
}
