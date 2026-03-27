'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Info, ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';
import { MACADAM_ELLIPSES } from '@/lib/colorimetry/data';

/**
 * MacAdam 椭圆数据表格组件
 *
 * 展示 24 个参考色点的详细椭圆参数
 * 支持按色区分组、排序、筛选
 */

interface EllipseData {
  id: number;
  x: number;
  y: number;
  semiMajor: number;
  semiMinor: number;
  aspectRatio: number;
  angle: number;
  area: number;
  sensitivity: 'high' | 'medium' | 'low';
  region: string;
  color: string;
}

// 根据中心坐标估算对应波长和色区
function estimateWavelengthRegion(x: number, y: number): { region: string; color: string } {
  // 根据色品图位置估算色区
  if (y > 0.5) return { region: '绿-青区', color: '#10b981' };
  if (y > 0.3 && x < 0.3) return { region: '蓝-青区', color: '#3b82f6' };
  if (y < 0.2 && x < 0.25) return { region: '紫-蓝区', color: '#8b5cf6' };
  if (x > 0.5) return { region: '橙-红区', color: '#f97316' };
  if (x > 0.4 && y > 0.25) return { region: '黄-橙区', color: '#eab308' };
  return { region: '白光区', color: '#9ca3af' };
}

// 计算灵敏度等级
function calculateSensitivity(area: number): 'high' | 'medium' | 'low' {
  // 面积越小，灵敏度越高
  const maxArea = Math.PI * 0.008 * 0.002; // 约最大椭圆面积
  const ratio = area / maxArea;
  if (ratio < 0.3) return 'high';
  if (ratio < 0.6) return 'medium';
  return 'low';
}

export default function MacAdamDataTable() {
  const [sortKey, setSortKey] = useState<keyof EllipseData>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  // 处理数据
  const data: EllipseData[] = useMemo(() => {
    return MACADAM_ELLIPSES.map((ellipse, index) => {
      const area = Math.PI * ellipse.semiMajor * ellipse.semiMinor;
      const aspectRatio = ellipse.semiMajor / ellipse.semiMinor;
      const { region, color } = estimateWavelengthRegion(ellipse.center.x, ellipse.center.y);

      return {
        id: index + 1,
        x: ellipse.center.x,
        y: ellipse.center.y,
        semiMajor: ellipse.semiMajor * 1000, // 转换为 ×10⁻³
        semiMinor: ellipse.semiMinor * 1000,
        aspectRatio,
        angle: ellipse.angle,
        area: area * 1000000, // 转换为 ×10⁻⁶
        sensitivity: calculateSensitivity(area),
        region,
        color,
      };
    });
  }, []);

  // 过滤和排序
  const filteredData = useMemo(() => {
    let result = filterRegion === 'all'
      ? [...data]
      : data.filter(item => item.region === filterRegion);

    result.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      const modifier = sortOrder === 'asc' ? 1 : -1;
      return (aVal < bVal ? -1 : 1) * modifier;
    });

    return result;
  }, [data, filterRegion, sortKey, sortOrder]);

  // 获取所有色区
  const regions = useMemo(() => {
    const unique = new Set(data.map(d => d.region));
    return Array.from(unique).sort();
  }, [data]);

  // 切换排序
  const handleSort = (key: keyof EllipseData) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  // 切换展开
  const toggleExpand = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  // 格式化数字
  const formatNum = (num: number, decimals: number = 3) => num.toFixed(decimals);

  return (
    <div className="glass-panel p-6 rounded-2xl space-y-6">
      <div className="flex items-center gap-2 text-primary-500">
        <Info className="w-5 h-5" />
        <h3 className="text-lg font-semibold">MacAdam 椭圆数据表</h3>
      </div>

      {/* 筛选器 */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterRegion('all')}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
            filterRegion === 'all'
              ? 'bg-primary-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          全部
        </button>
        {regions.map(region => (
          <button
            key={region}
            onClick={() => setFilterRegion(region)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filterRegion === region
                ? 'bg-primary-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* 数据表格 */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-3 py-2 text-left">
                <button
                  onClick={() => handleSort('id')}
                  className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                >
                  编号
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="px-3 py-2 text-left">
                <button
                  onClick={() => handleSort('region')}
                  className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                >
                  色区
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="px-3 py-2 text-left text-gray-400">中心坐标 (x, y)</th>
              <th className="px-3 py-2 text-left">
                <button
                  onClick={() => handleSort('semiMajor')}
                  className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                >
                  半长轴
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="px-3 py-2 text-left">
                <button
                  onClick={() => handleSort('semiMinor')}
                  className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                >
                  半短轴
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="px-3 py-2 text-left">
                <button
                  onClick={() => handleSort('aspectRatio')}
                  className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                >
                  轴比
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="px-3 py-2 text-left">
                <button
                  onClick={() => handleSort('area')}
                  className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                >
                  面积
                  <ArrowUpDown size={14} />
                </button>
              </th>
              <th className="px-3 py-2 text-left text-gray-400">灵敏度</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                  index % 2 === 0 ? 'bg-white/[0.02]' : ''
                }`}
              >
                <td className="px-3 py-2">
                  <span className="font-mono text-gray-300">{item.id}</span>
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-300">{item.region}</span>
                  </div>
                </td>
                <td className="px-3 py-2 font-mono text-xs text-gray-400">
                  ({formatNum(item.x, 3)}, {formatNum(item.y, 3)})
                </td>
                <td className="px-3 py-2 font-mono text-gray-300">
                  {formatNum(item.semiMajor)}
                </td>
                <td className="px-3 py-2 font-mono text-gray-300">
                  {formatNum(item.semiMinor)}
                </td>
                <td className="px-3 py-2 font-mono text-gray-300">
                  {formatNum(item.aspectRatio, 1)}
                </td>
                <td className="px-3 py-2 font-mono text-gray-300">
                  {formatNum(item.area)}
                </td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    item.sensitivity === 'high'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : item.sensitivity === 'medium'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {item.sensitivity === 'high' ? '高' : item.sensitivity === 'medium' ? '中' : '低'}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
        <div className="bg-white/5 p-3 rounded-lg text-center">
          <p className="text-xs text-gray-500 mb-1">最小椭圆面积</p>
          <p className="text-lg font-mono font-bold text-emerald-400">
            {formatNum(Math.min(...data.map(d => d.area)))}
          </p>
          <p className="text-xs text-gray-600">×10⁻⁶</p>
        </div>
        <div className="bg-white/5 p-3 rounded-lg text-center">
          <p className="text-xs text-gray-500 mb-1">最大椭圆面积</p>
          <p className="text-lg font-mono font-bold text-red-400">
            {formatNum(Math.max(...data.map(d => d.area)))}
          </p>
          <p className="text-xs text-gray-600">×10⁻⁶</p>
        </div>
        <div className="bg-white/5 p-3 rounded-lg text-center">
          <p className="text-xs text-gray-500 mb-1">最大轴比</p>
          <p className="text-lg font-mono font-bold text-primary-400">
            {formatNum(Math.max(...data.map(d => d.aspectRatio)), 1)}
          </p>
          <p className="text-xs text-gray-600">:1</p>
        </div>
        <div className="bg-white/5 p-3 rounded-lg text-center">
          <p className="text-xs text-gray-500 mb-1">平均面积</p>
          <p className="text-lg font-mono font-bold text-secondary-400">
            {formatNum(data.reduce((sum, d) => sum + d.area, 0) / data.length)}
          </p>
          <p className="text-xs text-gray-600">×10⁻⁶</p>
        </div>
      </div>

      {/* 单位说明 */}
      <div className="text-xs text-gray-500 space-y-1">
        <p><strong>单位说明：</strong></p>
        <p>• 半长轴/半短轴：×10⁻³ （色品图坐标单位）</p>
        <p>• 面积：×10⁻⁶ （色品图坐标单位平方）</p>
        <p>• 轴比：半长轴 / 半短轴</p>
        <p>• 灵敏度：基于椭圆面积相对大小划分（高&lt;0.3, 中0.3-0.6, 低&gt;0.6）</p>
      </div>
    </div>
  );
}
