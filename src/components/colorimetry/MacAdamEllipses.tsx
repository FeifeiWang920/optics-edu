'use client';

import { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { MACADAM_ELLIPSES, SPECTRAL_LOCUS } from '@/lib/colorimetry/data';

/**
 * MacAdam 椭圆可视化组件
 *
 * 在 CIE 1931 xy 色品图上显示 MacAdam 椭圆，展示人眼对颜色差异的感知阈值
 */
export default function MacAdamEllipses() {
  // SVG 配置
  const svgWidth = 600;
  const svgHeight = 500;
  const padding = { top: 40, right: 40, bottom: 60, left: 60 };

  // 色品图坐标映射 (xy -> SVG 坐标)
  const mapX = useCallback((x: number) => padding.left + x * (svgWidth - padding.left - padding.right), [padding.left, padding.right, svgWidth]);
  const mapY = useCallback((y: number) => svgHeight - padding.bottom - y * (svgHeight - padding.top - padding.bottom), [padding.top, padding.bottom, svgHeight]);

  // 生成光谱轨迹路径
  const spectralPath = useMemo(() => {
    const points = SPECTRAL_LOCUS.map((point, i) => {
      const x = mapX(point.x);
      const y = mapY(point.y);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    });

    // 闭合路径（连接到紫色线）
    const purpleLineEnd = SPECTRAL_LOCUS[SPECTRAL_LOCUS.length - 1];

    // 紫色线（连接 380nm 和 780nm 的直线）
    points.push(`L ${mapX(purpleLineEnd.x).toFixed(2)} ${mapY(purpleLineEnd.y).toFixed(2)}`);
    points.push('Z');

    return points.join(' ');
  }, [mapX, mapY]);

  // 生成椭圆路径
  const ellipsePaths = useMemo(() => {
    return MACADAM_ELLIPSES.map((ellipse, index) => {
      const cx = mapX(ellipse.center.x);
      const cy = mapY(ellipse.center.y);
      const a = ellipse.semiMajor * (svgWidth - padding.left - padding.right);
      const b = ellipse.semiMinor * (svgHeight - padding.top - padding.bottom);
      const theta = (ellipse.angle * Math.PI) / 180;

      // 使用参数方程生成椭圆路径
      const points: string[] = [];
      const numPoints = 64;

      for (let i = 0; i <= numPoints; i++) {
        const t = (i / numPoints) * 2 * Math.PI;

        // 旋转椭圆
        const x = a * Math.cos(t);
        const y = b * Math.sin(t);

        const xr = x * Math.cos(theta) - y * Math.sin(theta);
        const yr = x * Math.sin(theta) + y * Math.cos(theta);

        const px = cx + xr;
        const py = cy - yr; // SVG y 轴向下

        if (i === 0) {
          points.push(`M ${px.toFixed(2)} ${py.toFixed(2)}`);
        } else {
          points.push(`L ${px.toFixed(2)} ${py.toFixed(2)}`);
        }
      }

      points.push('Z');

      return {
        path: points.join(' '),
        ellipse,
        index,
      };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [mapX, mapY]); // padding 和 svg 尺寸已经通过 mapX/mapY 的 useCallback 间接包含

  // 生成光谱轨迹上的波长标签
  const wavelengthLabels = useMemo(() => {
    const labelWavelengths = [400, 450, 500, 550, 600, 650, 700, 750];
    return labelWavelengths
      .map((wl) => {
        const point = SPECTRAL_LOCUS.find((p) => p.wavelength === wl);
        if (!point) return null;

        // 计算标签位置（稍微偏离轨迹）
        const x = mapX(point.x);
        const y = mapY(point.y);

        // 根据位置调整偏移方向
        let offsetX = 0;
        let offsetY = 0;

        if (wl < 500) {
          offsetX = -12;
          offsetY = 5;
        } else if (wl < 600) {
          offsetX = 5;
          offsetY = -10;
        } else {
          offsetX = 8;
          offsetY = 5;
        }

        return {
          x: x + offsetX,
          y: y + offsetY,
          wavelength: wl,
          color: point.color,
        };
      })
      .filter(Boolean) as Array<{ x: number; y: number; wavelength: number; color: string }>;
  }, [mapX, mapY]);

  return (
    <div className="glass-panel p-6 rounded-2xl space-y-4">
      <div className="flex items-center gap-2 text-primary-500">
        <Info className="w-5 h-5" />
        <h2 className="text-xl font-semibold">MacAdam 椭圆</h2>
      </div>

      <p className="text-sm text-muted-foreground">
        MacAdam 椭圆表示人眼刚刚能察觉的颜色差异范围。椭圆内的颜色对人眼来说无法区分，
        椭圆大小和方向随色品位置变化，反映了人眼对不同颜色区域的敏感度差异。
      </p>

      {/* CIE 1931 色品图 */}
      <div className="flex justify-center">
        <svg
          width={svgWidth}
          height={svgHeight}
          className="max-w-full h-auto"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        >
          {/* 背景 */}
          <rect
            x={padding.left}
            y={padding.top}
            width={svgWidth - padding.left - padding.right}
            height={svgHeight - padding.top - padding.bottom}
            fill="#0a0a0f"
            rx={4}
          />

          {/* 光谱轨迹填充 */}
          <defs>
            <linearGradient id="spectralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              {SPECTRAL_LOCUS.map((point, i) => (
                <stop
                  key={i}
                  offset={`${(i / (SPECTRAL_LOCUS.length - 1)) * 100}%`}
                  stopColor={point.color}
                />
              ))}
            </linearGradient>

            {/* 网格线定义 */}
            <pattern id="grid" width="0.1" height="0.1" patternUnits="userSpaceOnUse">
              <path d="M 0.1 0 L 0 0 0 0.1" fill="none" stroke="#333" strokeWidth="0.5" />
            </pattern>
          </defs>

          {/* 网格线 */}
          <g opacity={0.3}>
            {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8].map((x) => (
              <line
                key={`vx${x}`}
                x1={mapX(x)}
                y1={mapY(0)}
                x2={mapX(x)}
                y2={mapY(0.9)}
                stroke="#333"
                strokeWidth={1}
              />
            ))}
            {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((y) => (
              <line
                key={`hz${y}`}
                x1={mapX(0)}
                y1={mapY(y)}
                x2={mapX(0.8)}
                y2={mapY(y)}
                stroke="#333"
                strokeWidth={1}
              />
            ))}
          </g>

          {/* 光谱轨迹 */}
          <motion.path
            d={spectralPath}
            fill="url(#spectralGradient)"
            fillOpacity={0.3}
            stroke="#ffffff"
            strokeWidth={2}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* 光谱轨迹边界线 */}
          <path
            d={spectralPath}
            fill="none"
            stroke="#ffffff"
            strokeWidth={2}
            strokeLinejoin="round"
          />

          {/* MacAdam 椭圆 */}
          {ellipsePaths.map(({ path, ellipse, index }) => (
            <motion.path
              key={index}
              d={path}
              fill="#3b82f6"
              fillOpacity={0.3}
              stroke="#60a5fa"
              strokeWidth={1.5}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: index * 0.1,
                duration: 0.4,
                ease: 'easeOut',
              }}
              style={{ transformOrigin: `${mapX(ellipse.center.x)}px ${mapY(ellipse.center.y)}px` }}
            />
          ))}

          {/* 椭圆中心点 */}
          {MACADAM_ELLIPSES.map((ellipse, index) => (
            <circle
              key={`center${index}`}
              cx={mapX(ellipse.center.x)}
              cy={mapY(ellipse.center.y)}
              r={3}
              fill="#60a5fa"
              stroke="#ffffff"
              strokeWidth={1}
            />
          ))}

          {/* 波长标签 */}
          {wavelengthLabels.map((label) => (
            <g key={`label${label.wavelength}`}>
              <text
                x={label.x}
                y={label.y}
                fontSize={11}
                fill={label.color}
                textAnchor="middle"
                style={{ textShadow: '0 0 3px #000, 0 0 6px #000' }}
              >
                {label.wavelength}nm
              </text>
            </g>
          ))}

          {/* 坐标轴标签 */}
          <text
            x={svgWidth / 2}
            y={svgHeight - 15}
            fontSize={12}
            fill="#999"
            textAnchor="middle"
          >
            x 色品坐标
          </text>

          <text
            x={15}
            y={svgHeight / 2}
            fontSize={12}
            fill="#999"
            textAnchor="middle"
            transform={`rotate(-90, 15, ${svgHeight / 2})`}
          >
            y 色品坐标
          </text>

          {/* 坐标轴刻度 */}
          {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8].map((x) => (
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
                fill="#666"
                textAnchor="middle"
              >
                {x.toFixed(1)}
              </text>
            </g>
          ))}

          {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((y) => (
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
                fill="#666"
                textAnchor="end"
              >
                {y.toFixed(1)}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* 图例 */}
      <div className="glass-card p-4 rounded-xl">
        <h3 className="text-sm font-medium text-secondary-500 mb-3">图例说明</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500/30 border border-blue-400" />
            <span className="text-muted-foreground">MacAdam 椭圆（1 阶阈值）</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ background: 'url(#spectralGradient)' }} />
            <span className="text-muted-foreground">可见光谱轨迹</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500" />
            <span className="text-muted-foreground">椭圆中心点</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-r from-violet-600 via-green-500 to-red-600" />
            <span className="text-muted-foreground">光谱色（波长：nm）</span>
          </div>
        </div>
      </div>

      {/* 说明信息 */}
      <div className="glass-card p-4 rounded-xl space-y-2 text-sm">
        <p className="text-muted-foreground">
          <strong className="text-primary-500">说明：</strong>
          MacAdam 椭圆由 David MacAdam 于 1942 年提出，表示在 CIE 色品图上人眼刚好能区分颜色差异的区域。
        </p>
        <p className="text-muted-foreground">
          <strong className="text-secondary-500">椭圆特性：</strong>
          椭圆大小和方向随颜色区域变化——绿色区域椭圆较小（人眼敏感），蓝色区域椭圆较大（人眼较不敏感）。
          此图显示的是 1 阶 MacAdam 椭圆，表示标准观察者的刚好可觉差（JND, Just Noticeable Difference）。
        </p>
      </div>
    </div>
  );
}
