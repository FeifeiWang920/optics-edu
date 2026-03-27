'use client';

import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

/**
 * 颜色匹配实验装置示意图
 *
 * 展示 MacAdam 1942 年使用的分光光度计装置
 * 包括参考光路、测试光路和观察视场
 */
export default function ColorMatchingApparatus() {
  return (
    <div className="glass-panel p-6 rounded-2xl space-y-6">
      <div className="flex items-center gap-2 text-primary-500">
        <Info className="w-5 h-5" />
        <h3 className="text-lg font-semibold">分光光度计装置示意图</h3>
      </div>

      {/* SVG 装置图 */}
      <div className="flex justify-center">
        <svg
          width="700"
          height="400"
          viewBox="0 0 700 400"
          className="max-w-full h-auto rounded-xl bg-black/20"
        >
          {/* 背景渐变 */}
          <defs>
            <linearGradient id="beamRef" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="beamTest" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.3" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 参考光路（上） */}
          <g>
            <text x="50" y="85" fontSize="12" fill="#60a5fa" fontWeight="500">参考光路</text>

            {/* 参考光源 */}
            <rect x="80" y="60" width="40" height="50" rx="4" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="2" />
            <text x="100" y="88" fontSize="10" fill="#60a5fa" textAnchor="middle">参考</text>

            {/* 参考光光束 */}
            <motion.path
              d="M 120 85 L 280 85"
              stroke="url(#beamRef)"
              strokeWidth="8"
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            />

            {/* 参考光单色仪 */}
            <rect x="280" y="65" width="60" height="40" rx="4" fill="#1e3a5f" stroke="#60a5fa" strokeWidth="2" />
            <text x="310" y="90" fontSize="9" fill="#60a5fa" textAnchor="middle">单色仪</text>

            {/* 参考光后续光束 */}
            <motion.path
              d="M 340 85 L 450 85"
              stroke="url(#beamRef)"
              strokeWidth="6"
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </g>

          {/* 测试光路（下） */}
          <g>
            <text x="50" y="235" fontSize="12" fill="#fbbf24" fontWeight="500">测试光路</text>

            {/* 测试光源 */}
            <rect x="80" y="210" width="40" height="50" rx="4" fill="#3d3d1f" stroke="#fbbf24" strokeWidth="2" />
            <text x="100" y="238" fontSize="10" fill="#fbbf24" textAnchor="middle">测试</text>

            {/* 测试光光束 */}
            <motion.path
              d="M 120 235 L 280 235"
              stroke="url(#beamTest)"
              strokeWidth="8"
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            />

            {/* 测试光单色仪 */}
            <rect x="280" y="215" width="60" height="40" rx="4" fill="#3d3d1f" stroke="#fbbf24" strokeWidth="2" />
            <text x="310" y="240" fontSize="9" fill="#fbbf24" textAnchor="middle">单色仪</text>

            {/* 测试光后续光束 */}
            <motion.path
              d="M 340 235 L 450 235"
              stroke="url(#beamTest)"
              strokeWidth="6"
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />

            {/* 调节控制示意 */}
            <circle cx="320" cy="235" r="8" fill="none" stroke="#fbbf24" strokeWidth="2" />
            <text x="320" y="275" fontSize="9" fill="#fbbf24" textAnchor="middle">可调节</text>
          </g>

          {/* 合束镜 */}
          <g>
            <polygon points="450,70 480,85 450,100" fill="#4a5568" stroke="#9ca3af" strokeWidth="2" />
            <polygon points="450,220 480,235 450,250" fill="#4a5568" stroke="#9ca3af" strokeWidth="2" />
            <text x="465" y="165" fontSize="10" fill="#9ca3af" textAnchor="middle">合束</text>
            <text x="465" y="180" fontSize="10" fill="#9ca3af" textAnchor="middle">棱镜</text>
          </g>

          {/* 合成光束 */}
          <motion.path
            d="M 480 160 L 520 160"
            stroke="url(#beamRef)"
            strokeWidth="10"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          />

          {/* 2° 视场光阑 */}
          <g>
            <rect x="520" y="130" width="40" height="60" rx="4" fill="#1f2937" stroke="#6b7280" strokeWidth="2" />
            <circle cx="540" cy="160" r="12" fill="#000" stroke="#6b7280" strokeWidth="2" />
            <text x="540" y="210" fontSize="10" fill="#9ca3af" textAnchor="middle">2° 视场光阑</text>
          </g>

          {/* 出射光束 */}
          <motion.path
            d="M 560 160 L 600 160"
            stroke="url(#beamRef)"
            strokeWidth="8"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 1.2 }}
          />

          {/* 观察者眼睛示意 */}
          <g>
            <ellipse cx="630" cy="160" rx="25" ry="18" fill="#1f2937" stroke="#9ca3af" strokeWidth="2" />
            <circle cx="630" cy="160" r="10" fill="#000" />
            <circle cx="632" cy="158" r="3" fill="#4a5568" />
            <text x="630" y="200" fontSize="10" fill="#9ca3af" textAnchor="middle">观察者</text>
          </g>

          {/* 暗箱示意 */}
          <rect x="70" y="40" width="600" height="280" fill="none" stroke="#374151" strokeWidth="2" strokeDasharray="8,4" rx="8" />
          <text x="370" y="330" fontSize="12" fill="#6b7280" textAnchor="middle">暗适应观察室</text>
        </svg>
      </div>

      {/* 实验参数卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 p-4 rounded-xl text-center">
          <p className="text-xs text-gray-500 mb-1">视场大小</p>
          <p className="text-lg font-bold text-primary-400">2°</p>
          <p className="text-xs text-gray-600">圆形视场</p>
        </div>
        <div className="bg-white/5 p-4 rounded-xl text-center">
          <p className="text-xs text-gray-500 mb-1">照明条件</p>
          <p className="text-lg font-bold text-secondary-400">暗适应</p>
          <p className="text-xs text-gray-600">环境光 &lt; 0.01 cd/m²</p>
        </div>
        <div className="bg-white/5 p-4 rounded-xl text-center">
          <p className="text-xs text-gray-500 mb-1">背景亮度</p>
          <p className="text-lg font-bold text-accent-400">0.5</p>
          <p className="text-xs text-gray-600">cd/m²</p>
        </div>
        <div className="bg-white/5 p-4 rounded-xl text-center">
          <p className="text-xs text-gray-500 mb-1">观察距离</p>
          <p className="text-lg font-bold text-green-400">标准</p>
          <p className="text-xs text-gray-600">约 2m</p>
        </div>
      </div>

      {/* 说明文字 */}
      <div className="space-y-2 text-sm text-gray-400">
        <p>
          <strong className="text-primary-400">参考光路：</strong>
          产生固定的参考色光，经单色仪分离后形成单色光。
        </p>
        <p>
          <strong className="text-secondary-400">测试光路：</strong>
          产生可调节的测试色光，被试通过调节使其与参考光匹配。
        </p>
        <p>
          <strong className="text-accent-400">合束棱镜：</strong>
          将参考光和测试光合并到同一光路，形成并置的2°圆形视场。
        </p>
        <p>
          <strong className="text-gray-400">暗适应环境：</strong>
          确保观察者在标准暗适应状态下进行颜色匹配。
        </p>
      </div>
    </div>
  );
}
