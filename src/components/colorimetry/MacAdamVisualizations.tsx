'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Info, BarChart3, PieChart, Activity } from 'lucide-react';
import { MACADAM_ELLIPSES } from '@/lib/colorimetry/data';
import {
  CANVAS_CONFIG,
  generateCIEChromaticityDataURL,
} from '@/lib/cie-1931';

/**
 * MacAdam 椭圆数据可视化组件
 *
 * 包含：
 * 1. 椭圆大小分布热力图（在CIE色品图上）
 * 2. 长轴/短轴比率变化图
 * 3. 色区灵敏度对比
 */

export default function MacAdamVisualizations() {
  const [activeTab, setActiveTab] = useState<'heatmap' | 'ratio' | 'sensitivity'>('heatmap');
  const [bgImageUrl, setBgImageUrl] = useState<string | null>(null);

  // 生成色品图背景
  useState(() => {
    if (typeof window !== 'undefined') {
      const url = generateCIEChromaticityDataURL({
        width: 500,
        height: 460,
        padding: 30,
      });
      setBgImageUrl(url);
    }
  });

  // 处理数据
  const data = useMemo(() => {
    return MACADAM_ELLIPSES.map((ellipse, index) => {
      const area = Math.PI * ellipse.semiMajor * ellipse.semiMinor;
      const aspectRatio = ellipse.semiMajor / ellipse.semiMinor;

      // 估算色区
      let region = '其他';
      let regionColor = '#9ca3af';
      if (ellipse.center.y > 0.5) {
        region = '绿色区';
        regionColor = '#10b981';
      } else if (ellipse.center.y > 0.3 && ellipse.center.x < 0.3) {
        region = '蓝色区';
        regionColor = '#3b82f6';
      } else if (ellipse.center.x > 0.5) {
        region = '红色区';
        regionColor = '#ef4444';
      } else if (ellipse.center.x > 0.35) {
        region = '黄色区';
        regionColor = '#eab308';
      }

      return {
        id: index + 1,
        x: ellipse.center.x,
        y: ellipse.center.y,
        area: area * 1000000,
        aspectRatio,
        region,
        regionColor,
      };
    });
  }, []);

  // 坐标转换
  const mapX = (x: number) => {
    const padding = 30;
    const width = 500;
    return padding + ((x - CANVAS_CONFIG.xMin) / (CANVAS_CONFIG.xMax - CANVAS_CONFIG.xMin)) * (width - 2 * padding);
  };

  const mapY = (y: number) => {
    const padding = 30;
    const height = 460;
    return height - padding - ((y - CANVAS_CONFIG.yMin) / (CANVAS_CONFIG.yMax - CANVAS_CONFIG.yMin)) * (height - 2 * padding);
  };

  // 计算面积范围用于颜色映射
  const maxArea = Math.max(...data.map(d => d.area));
  const minArea = Math.min(...data.map(d => d.area));

  // 获取热力图颜色
  const getHeatmapColor = (area: number) => {
    const ratio = (area - minArea) / (maxArea - minArea);
    // 从绿色(小面积/高灵敏度)到红色(大面积/低灵敏度)
    if (ratio < 0.33) return '#10b981'; // 绿色
    if (ratio < 0.66) return '#eab308'; // 黄色
    return '#ef4444'; // 红色
  };

  // 按色区分组统计
  const regionStats = useMemo(() => {
    const stats: Record<string, { count: number; avgArea: number; color: string }> = {};
    data.forEach(d => {
      if (!stats[d.region]) {
        stats[d.region] = { count: 0, avgArea: 0, color: d.regionColor };
      }
      stats[d.region].count++;
      stats[d.region].avgArea += d.area;
    });
    Object.keys(stats).forEach(key => {
      stats[key].avgArea /= stats[key].count;
    });
    return stats;
  }, [data]);

  return (
    <div className="glass-panel p-6 rounded-2xl space-y-6">
      <div className="flex items-center gap-2 text-primary-500">
        <Info className="w-5 h-5" />
        <h3 className="text-lg font-semibold">数据可视化分析</h3>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-2">
        {[
          { key: 'heatmap', label: '热力图', icon: PieChart },
          { key: 'ratio', label: '轴比分析', icon: Activity },
          { key: 'sensitivity', label: '色区对比', icon: BarChart3 },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === tab.key
                ? 'bg-primary-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* 热力图 */}
      {activeTab === 'heatmap' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="flex justify-center">
            <svg
              width="500"
              height="460"
              viewBox="0 0 500 460"
              className="max-w-full h-auto rounded-xl bg-black/20"
            >
              {/* 背景色品图 */}
              <rect x="0" y="0" width="500" height="460" fill="#1a1a2e" rx="8" />

              {/* 坐标轴 */}
              <line x1="30" y1="430" x2="470" y2="430" stroke="#374151" strokeWidth="1" />
              <line x1="30" y1="430" x2="30" y2="30" stroke="#374151" strokeWidth="1" />

              {/* 网格线 */}
              {[0.2, 0.4, 0.6].map(x => (
                <line
                  key={`gridX${x}`}
                  x1={mapX(x)}
                  y1="30"
                  x2={mapX(x)}
                  y2="430"
                  stroke="#374151"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              ))}
              {[0.2, 0.4, 0.6].map(y => (
                <line
                  key={`gridY${y}`}
                  x1="30"
                  y1={mapY(y)}
                  x2="470"
                  y2={mapY(y)}
                  stroke="#374151"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              ))}

              {/* 数据点 - 热力图 */}
              {data.map((item, index) => (
                <motion.g key={item.id}>
                  <motion.circle
                    cx={mapX(item.x)}
                    cy={mapY(item.y)}
                    r={8}
                    fill={getHeatmapColor(item.area)}
                    opacity={0.8}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                  />
                  <text
                    x={mapX(item.x)}
                    y={mapY(item.y) + 4}
                    fontSize="8"
                    fill="#fff"
                    textAnchor="middle"
                  >
                    {item.id}
                  </text>
                </motion.g>
              ))}

              {/* 坐标轴标签 */}
              <text x="250" y="455" fontSize="12" fill="#6b7280" textAnchor="middle">x 色品坐标</text>
              <text x="10" y="235" fontSize="12" fill="#6b7280" textAnchor="middle" transform="rotate(-90, 10, 235)">y 色品坐标</text>
            </svg>
          </div>

          {/* 图例 */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-500" />
              <span className="text-xs text-gray-400">高灵敏度 (面积小)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500" />
              <span className="text-xs text-gray-400">中等灵敏度</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500" />
              <span className="text-xs text-gray-400">低灵敏度 (面积大)</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 text-center">
            每个圆圈代表一个参考色点的椭圆中心位置，颜色表示该位置的灵敏度等级
          </p>
        </motion.div>
      )}

      {/* 轴比分析 */}
      {activeTab === 'ratio' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="h-64 flex items-end justify-center gap-1 px-4">
            {data.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex flex-col items-center gap-1 flex-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: index * 0.02 }}
              >
                <motion.div
                  className="w-full rounded-t-sm min-w-[8px]"
                  style={{
                    backgroundColor: item.regionColor,
                    height: `${(item.aspectRatio / 10) * 200}px`,
                    maxHeight: '200px',
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.aspectRatio / 10) * 200}px` }}
                  transition={{ delay: index * 0.02, duration: 0.3 }}
                />
                <span className="text-xs text-gray-500 rotate-90 origin-left translate-y-4">{item.id}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between text-xs text-gray-500 px-4">
            <span>参考色编号 (1-25)</span>
            <span>长轴/短轴比率</span>
          </div>

          {/* 统计 */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="bg-white/5 p-3 rounded-lg text-center">
              <p className="text-xs text-gray-500 mb-1">平均轴比</p>
              <p className="text-xl font-mono font-bold text-primary-400">
                {(data.reduce((sum, d) => sum + d.aspectRatio, 0) / data.length).toFixed(1)}
              </p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg text-center">
              <p className="text-xs text-gray-500 mb-1">最大轴比</p>
              <p className="text-xl font-mono font-bold text-red-400">
                {Math.max(...data.map(d => d.aspectRatio)).toFixed(1)}
              </p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg text-center">
              <p className="text-xs text-gray-500 mb-1">最小轴比</p>
              <p className="text-xl font-mono font-bold text-emerald-400">
                {Math.min(...data.map(d => d.aspectRatio)).toFixed(1)}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            轴比越大表示椭圆越扁，说明人眼在该方向的颜色敏感度差异越大
          </p>
        </motion.div>
      )}

      {/* 色区对比 */}
      {activeTab === 'sensitivity' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="space-y-3">
            {Object.entries(regionStats).map(([region, stats], index) => (
              <motion.div
                key={region}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 p-4 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: stats.color }}
                    />
                    <span className="font-medium text-gray-300">{region}</span>
                  </div>
                  <span className="text-xs text-gray-500">{stats.count} 个参考点</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">平均椭圆面积</span>
                      <span className="font-mono text-gray-300">{stats.avgArea.toFixed(2)} ×10⁻⁶</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: stats.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(stats.avgArea / maxArea) * 100}%` }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 结论卡片 */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-4 rounded-lg border border-emerald-500/20">
            <p className="text-sm text-gray-300">
              <strong className="text-emerald-400">紫-蓝区域</strong>的椭圆面积最小，
              说明人眼对<span className="text-emerald-400">紫蓝色变化最敏感</span>；
              <strong className="text-blue-400">绿色区域</strong>的椭圆面积较大，
              说明人眼对<span className="text-blue-400">绿色变化较不敏感</span>。
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
