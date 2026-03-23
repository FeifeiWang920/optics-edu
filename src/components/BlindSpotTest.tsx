"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function BlindSpotTest() {
  const [started, setStarted] = useState(false);

  return (
    <div className="glass-panel p-8 space-y-6 relative overflow-hidden">
      <div className="flex justify-between items-center">
         <h3 className="text-xl font-bold text-white">盲点测试 (Blind Spot Test)</h3>
         {!started && (
           <button 
             onClick={() => setStarted(true)}
             className="px-4 py-1.5 bg-primary-500 text-white text-xs font-bold rounded-full hover:bg-primary-600 transition-colors"
           >
             开始测试
           </button>
         )}
      </div>

      <div className="bg-black/40 rounded-xl p-12 flex items-center justify-between border border-white/5 min-h-[200px]">
        {/* Cross */}
        <div className="text-4xl font-light text-white select-none">＋</div>
        
        {/* Dot that moves or stays at a specific distance */}
        {started ? (
          <motion.div 
            animate={{ x: [0, -40, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          />
        ) : (
          <div className="w-8 h-8 bg-white/10 rounded-full border border-white/20" />
        )}
      </div>

      <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
        <p className="font-bold text-primary-400 flex items-center gap-2">
           📖 测试方法：
        </p>
        <ol className="list-decimal list-inside space-y-1 text-xs">
          <li>遮住<strong>左眼</strong>，用右眼盯着左侧的 <strong>“＋”</strong> 字。</li>
          <li>保持眼睛距离屏幕约 30-40 厘米。</li>
          <li>缓慢前后移动头部，在某个特定距离，右侧的<strong>圆点会突然消失</strong>。</li>
        </ol>
        <p className="text-[11px] italic pt-2 border-t border-white/5">
           原理：视神经汇集点穿过视网膜时没有感光细胞，该点被称为“盲点”。
        </p>
      </div>
    </div>
  );
}
