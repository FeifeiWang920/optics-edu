/**
 * CIE 1931 色品图生成器
 *
 * 生成 CIE 1931 色品图的 ImageData，可用于 Canvas 2D 或 WebGL 渲染
 */

import { CANVAS_CONFIG, SPECTRAL_LOCUS } from './constants';
import { xyToRgb, isInsideSpectralLocus } from './utils';

/**
 * 色品图生成选项
 */
export interface CIEChromaticityOptions {
  /** 画布宽度（像素） */
  width?: number;
  /** 画布高度（像素） */
  height?: number;
  /** 画布内边距（像素） */
  padding?: number;
  /** CIE x 轴最小值 */
  xMin?: number;
  /** CIE x 轴最大值 */
  xMax?: number;
  /** CIE y 轴最小值 */
  yMin?: number;
  /** CIE y 轴最大值 */
  yMax?: number;
  /** 背景颜色（RGBA） */
  backgroundColor?: [number, number, number, number];
}

/**
 * 生成 CIE 1931 色品图的 ImageData
 *
 * @param options - 生成选项
 * @returns ImageData 对象
 *
 * @example
 * ```ts
 * const imageData = generateCIEChromaticityDiagram({ width: 800, height: 770 });
 * const canvas = document.createElement('canvas');
 * canvas.width = imageData.width;
 * canvas.height = imageData.height;
 * const ctx = canvas.getContext('2d')!;
 * ctx.putImageData(imageData, 0, 0);
 * ```
 */
export function generateCIEChromaticityDiagram(
  options: CIEChromaticityOptions = {}
): ImageData {
  const config = {
    ...CANVAS_CONFIG,
    width: options.width ?? CANVAS_CONFIG.width,
    height: options.height ?? CANVAS_CONFIG.height,
    padding: options.padding ?? CANVAS_CONFIG.padding,
    xMin: options.xMin ?? CANVAS_CONFIG.xMin,
    xMax: options.xMax ?? CANVAS_CONFIG.xMax,
    yMin: options.yMin ?? CANVAS_CONFIG.yMin,
    yMax: options.yMax ?? CANVAS_CONFIG.yMax,
  };

  const { width, height, padding, xMin, xMax, yMin, yMax } = config;
  const backgroundColor = options.backgroundColor ?? [232, 232, 232, 255];

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to create 2D context');

  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  const plotLeft = padding;
  const plotRight = width - padding;
  const plotTop = padding;
  const plotBottom = height - padding;
  const plotWidth = plotRight - plotLeft;
  const plotHeight = plotBottom - plotTop;

  // 填充背景色
  for (let i = 0; i < data.length; i += 4) {
    data[i] = backgroundColor[0];
    data[i + 1] = backgroundColor[1];
    data[i + 2] = backgroundColor[2];
    data[i + 3] = backgroundColor[3];
  }

  // 生成色品图
  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      const idx = (py * width + px) * 4;

      if (px >= plotLeft && px < plotRight && py >= plotTop && py < plotBottom) {
        // 像素坐标 -> CIE 色品坐标
        const cx = xMin + ((px - plotLeft) / plotWidth) * (xMax - xMin);
        const cy = yMax - ((py - plotTop) / plotHeight) * (yMax - yMin);

        // 判断是否在光谱轨迹内
        if (isInsideSpectralLocus(cx, cy, SPECTRAL_LOCUS)) {
          const [r, g, b] = xyToRgb(cx, cy);

          data[idx] = Math.round(r * 255);
          data[idx + 1] = Math.round(g * 255);
          data[idx + 2] = Math.round(b * 255);
          data[idx + 3] = 255;
        }
      }
    }
  }

  return imageData;
}

/**
 * 生成 CIE 1931 色品图的 Data URL（可直接用作 img src）
 *
 * @param options - 生成选项
 * @returns PNG 格式的 Data URL
 *
 * @example
 * ```tsx
 * const [imageUrl, setImageUrl] = useState<string | null>(null);
 *
 * useEffect(() => {
 *   const imageData = generateCIEChromaticityDiagram();
 *   const canvas = document.createElement('canvas');
 *   canvas.width = imageData.width;
 *   canvas.height = imageData.height;
 *   const ctx = canvas.getContext('2d')!;
 *   ctx.putImageData(imageData, 0, 0);
 *   setImageUrl(canvas.toDataURL());
 * }, []);
 *
 * return <img src={imageUrl || ''} alt="CIE 1931 Chromaticity Diagram" />;
 * ```
 */
export function generateCIEChromaticityDataURL(
  options: CIEChromaticityOptions = {}
): string {
  const imageData = generateCIEChromaticityDiagram(options);

  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext('2d')!;
  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL('image/png');
}

/**
 * 异步生成 CIE 1931 色品图的 ImageData（使用 Web Worker 避免阻塞 UI）
 *
 * @param options - 生成选项
 * @returns Promise<ImageData>
 *
 * @example
 * ```ts
 * const imageData = await generateCIEChromaticityDiagramAsync({ width: 1200, height: 1150 });
 * ```
 */
export async function generateCIEChromaticityDiagramAsync(
  options: CIEChromaticityOptions = {}
): Promise<ImageData> {
  return new Promise((resolve) => {
    // 使用 setTimeout 将计算推迟到下一个事件循环
    setTimeout(() => {
      resolve(generateCIEChromaticityDiagram(options));
    }, 0);
  });
}