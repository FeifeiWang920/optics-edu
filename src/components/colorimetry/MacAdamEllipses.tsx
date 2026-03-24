'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { MACADAM_ELLIPSES } from '@/lib/colorimetry/data';
import {
  generateCIEChromaticityDataURL,
  CANVAS_CONFIG,
  cieToCanvas,
  SPECTRAL_LOCUS,
} from '@/lib/cie-1931';

/**
 * MacAdam 椭圆可视化组件
 *
 * 在 CIE 1931 xy 色品图上显示 MacAdam 椭圆，展示人眼对颜色差异的感知阈值
 * 注意：椭圆被放大10倍以便观察，实际1阶JND非常小
 */
export default function MacAdamEllipses() {
  const [bgImageUrl, setBgImageUrl] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(10); // 默认放大10倍

  // 生成色品图背景
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = generateCIEChromaticityDataURL({
        width: 600,
        height: 560,
        padding: 40,
      });
      setBgImageUrl(url);
    }
  }, []);

  // 坐标转换：CIE xy -> SVG 坐标
  const config = useMemo(
    () => ({
      width: 600,
      height: 560,
      padding: 40,
      xMin: CANVAS_CONFIG.xMin,
      xMax: CANVAS_CONFIG.xMax,
      yMin: CANVAS_CONFIG.yMin,
      yMax: CANVAS_CONFIG.yMax,
    }),
    []
  );

  const mapX = useCallback(
    (x: number) => {
      const { padding, width, xMin, xMax } = config;
      return padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    },
    [config]
  );

  const mapY = useCallback(
    (y: number) => {
      const { padding, height, yMin, yMax } = config;
      return height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);
    },
    [config]
  );

  // 生成光谱轨迹路径
  const spectralPath = useMemo(() => {
    const points = SPECTRAL_LOCUS.map((point, i) => {
      const x = mapX(point.x);
      const y = mapY(point.y);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    });

    // 闭合路径
    points.push('Z');
    return points.join(' ');
  }, [mapX, mapY]);

  // 生成椭圆路径（放大以便观察）
  const ellipsePaths = useMemo(() => {
    return MACADAM_ELLIPSES.map((ellipse, index) => {
      const cx = mapX(ellipse.center.x);
      const cy = mapY(ellipse.center.y);

      // 转换为像素距离并应用缩放
      const plotWidth = config.width - 2 * config.padding;
      const plotHeight = config.height - 2 * config.padding;
      const xScale = plotWidth / (config.xMax - config.xMin);
      const yScale = plotHeight / (config.yMax - config.yMin);

      // 放大椭圆以便观察
      const a = ellipse.semiMajor * xScale * zoomLevel;
      const b = ellipse.semiMinor * yScale * zoomLevel;
      const theta = (ellipse.angle * Math.PI) / 180;

      // 使用参数方程生成椭圆路径
      const points: string[] = [];
      const numPoints = 64;

      for (let i = 0; i <= numPoints; i++) {
        const t = (i / numPoints) * 2 * Math.PI;

        // 未旋转的椭圆坐标
        const x = a * Math.cos(t);
        const y = b * Math.sin(t);

        // 旋转后的坐标
        const xr = x * Math.cos(theta) - y * Math.sin(theta);
        const yr = x * Math.sin(theta) + y * Math.cos(theta);

        const px = cx + xr;
        const py = cy + yr;

        if (i === 0) {
          points.push(`M ${px.toFixed(2)} ${py.toFixed(2)}`);
        } else {
          points.push(`L ${px.toFixed(2)} ${py.toFixed(2)}`);
        }
      }

      points.push('Z');

      return {
        path: points.join(' '),
        cx,
        cy,
        ellipse,
        index,
      };
    });
  }, [mapX, mapY, config, zoomLevel]);

  // 波长标签位置
  const wavelengthLabels = useMemo(() => {
    const labelWavelengths = [380, 420, 460, 500, 540, 580, 620, 660, 700, 780];
    return labelWavelengths
      .map((wl) => {
        const point = SPECTRAL_LOCUS.find(
          (p) => Math.abs(p.wavelength - wl) < 5
        );
        if (!point) return null;

        const x = mapX(point.x);
        const y = mapY(point.y);

        // 根据位置调整偏移
        let offsetX = 0;
        let offsetY = 0;

        if (wl < 420) {
          offsetX = -15;
          offsetY = -10;
        } else if (wl < 500) {
          offsetX = -12;
          offsetY = 5;
        } else if (wl < 580) {
          offsetX = 8;
          offsetY = -8;
        } else if (wl < 660) {
          offsetX = 10;
          offsetY = 5;
        } else {
          offsetX = 8;
          offsetY = 10;
        }

        return {
          x: x + offsetX,
          y: y + offsetY,
          wavelength: wl,
        };
      })
      .filter(Boolean) as Array<{ x: number; y: number; wavelength: number }>;
  }, [mapX, mapY]);

  return (
    <div className="glass-panel p-6 rounded-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary-500">
          <Info className="w-5 h-5" />
          <h2 className="text-xl font-semibold">MacAdam 椭圆</h2>
        </div>

        {/* 缩放控制 */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">放大倍数:</span>
          <div className="flex gap-1">
            {[5, 10, 20].map((zoom) => (
              <button
                key={zoom}
                onClick={() => setZoomLevel(zoom)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  zoomLevel === zoom
                    ? 'bg-primary-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {zoom}×
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-400">
        MacAdam 椭圆表示人眼刚刚能察觉的颜色差异范围（1阶JND）。
        椭圆被放大{displayZoomLevel(zoomLevel)}以便观察，实际大小仅为色品图坐标单位的千分之几。
      </p>

      {/* CIE 1931 色品图 + MacAdam 椭圆 */}
      <div className="flex justify-center">
        <div className="relative">
          <svg
            width={config.width}
            height={config.height}
            className="max-w-full h-auto rounded-lg overflow-hidden"
            viewBox={`0 0 ${config.width} ${config.height}`}
          >
            {/* 背景色品图 */}
            {bgImageUrl && (
              <image
                href={bgImageUrl}
                x="0"
                y="0"
                width={config.width}
                height={config.height}
                preserveAspectRatio="none"
              />
            )}

            {/* 光谱轨迹边界线 */}
            <path
              d={spectralPath}
              fill="none"
              stroke="#ffffff"
              strokeWidth={2}
              strokeLinejoin="round"
            />

            {/* MacAdam 椭圆 */}
            {ellipsePaths.map(({ path, cx, cy, index }) => (
              <motion.g key={index}>
                {/* 椭圆填充 */}
                <motion.path
                  d={path}
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  stroke="#60a5fa"
                  strokeWidth={1.5}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
              </motion.g>
            ))}

            {/* 椭圆中心点 */}
            {MACADAM_ELLIPSES.map((ellipse, index) => (
              <motion.circle
                key={`center${index}`}
                cx={mapX(ellipse.center.x)}
                cy={mapY(ellipse.center.y)}
                r={3}
                fill="#60a5fa"
                stroke="#ffffff"
                strokeWidth={1}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 + 0.2, duration: 0.2 }}
              />
            ))}

            {/* 波长标签 */}
            {wavelengthLabels.map((label) => (
              <text
                key={`label${label.wavelength}`}
                x={label.x}
                y={label.y}
                fontSize={10}
                fill="#ffffff"
                textAnchor="middle"
                style={{ textShadow: '0 0 4px #000' }}
              >
                {label.wavelength}nm
              </text>
            ))}

            {/* 坐标轴标签 */}
            <text
              x={config.width / 2}
              y={config.height - 10}
              fontSize={12}
              fill="#999"
              textAnchor="middle"
            >
              x 色品坐标
            </text>

            <text
              x={15}
              y={config.height / 2}
              fontSize={12}
              fill="#999"
              textAnchor="middle"
              transform={`rotate(-90, 15, ${config.height / 2})`}
            >
              y 色品坐标
            </text>

            {/* 坐标轴刻度 */}
            {[0, 0.2, 0.4, 0.6, 0.8].map((x) => (
              <g key={`tickx${x}`}>
                <line
                  x1={mapX(x)}
                  y1={mapY(0)}
                  x2={mapX(x)}
                  y2={mapY(0) + 5}
                  stroke="#666"
                  strokeWidth={1}
                />
                <text
                  x={mapX(x)}
                  y={mapY(0) + 18}
                  fontSize={10}
                  fill="#999"
                  textAnchor="middle"
                >
                  {x.toFixed(1)}
                </text>
              </g>
            ))}

            {[0.2, 0.4, 0.6, 0.8].map((y) => (
              <g key={`tickY${y}`}>
                <line
                  x1={mapX(0)}
                  y1={mapY(y)}
                  x2={mapX(0) - 5}
                  y2={mapY(y)}
                  stroke="#666"
                  strokeWidth={1}
                />
                <text
                  x={mapX(0) - 10}
                  y={mapY(y) + 3}
                  fontSize={10}
                  fill="#999"
                  textAnchor="end"
                >
                  {y.toFixed(1)}
                </text>
              </g>
            ))}
          </svg>

          {/* 说明标签 */}
          <div className="absolute top-2 right-2 glass-card px-3 py-1.5 rounded-lg text-xs">
            <span className="text-blue-400 font-medium">椭圆已放大{displayZoomLevel(zoomLevel)}</span>
          </div>
        </div>
      </div>

      {/* 图例 */}
      <div className="glass-card p-4 rounded-xl">
        <h3 className="text-sm font-medium text-secondary-500 mb-3">图例说明</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500/30 border border-blue-400" />
            <span className="text-gray-400">MacAdam 椭圆（1 阶 JND）</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500" />
            <span className="text-gray-400">椭圆中心点（标准测试色）</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-r from-violet-600 via-green-500 to-red-600" />
            <span className="text-gray-400">光谱轨迹</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-700" />
            <span className="text-gray-400">色品图背景（sRGB 色域）</span>
          </div>
        </div>
      </div>

      {/* 说明信息 */}
      <div className="glass-card p-4 rounded-xl space-y-3 text-sm">
        <p className="text-gray-400">
          <strong className="text-primary-500">MacAdam 椭圆：</strong>
          由 David MacAdam 于 1942 年通过精密的颜色匹配实验测定，表示在 CIE 色品图上人眼刚好能区分颜色差异的区域。
          实际 1 阶椭圆非常小（约 0.002-0.005 色品坐标单位），图中已放大{displayZoomLevel(zoomLevel)}以便观察。
        </p>
        <p className="text-gray-400">
          <strong className="text-secondary-500">椭圆特性：</strong>
          椭圆大小和方向随颜色区域变化——绿色区域（520-560nm）椭圆最小，表示人眼对绿色变化最敏感；
          蓝色和红色区域椭圆较大，表示人眼对这些颜色变化较不敏感。
        </p>
        <p className="text-gray-400">
          <strong className="text-accent-500">应用意义：</strong>
          MacAdam 椭圆是评估色差公式均匀性的重要工具，也是车灯颜色容差标准制定的参考依据。
        </p>
      </div>
    </div>
  );
}

// 显示放大倍数
function displayZoomLevel(zoom: number): string {
  return `${zoom}倍`;
}
