"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function PhotometryVisualizer() {
  const [distance, setDistance] = useState(2); // 1m to 5m
  const intensity = 100; // 100 cd fixed for demo
  const illuminance = (intensity / (distance * distance)).toFixed(1);

  return (
    <div className="flex flex-col gap-8">
      <div className="relative h-64 bg-black/60 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
        {/* Source */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col items-center">
           <motion.div 
             animate={{ scale: [1, 1.2, 1] }}
             transition={{ repeat: Infinity, duration: 2 }}
             className="w-8 h-8 bg-yellow-400 rounded-full blur-md shadow-[0_0_20px_rgba(250,204,21,0.6)]" 
           />
           <span className="text-[10px] text-yellow-500 font-bold mt-2 uppercase">光源 (I)</span>
           <span className="text-[10px] text-gray-500">{intensity} cd</span>
        </div>

        {/* Light Beam */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
           <defs>
              <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="rgba(250,204,21,0.2)" />
                 <stop offset="100%" stopColor="rgba(250,204,21,0.02)" />
              </linearGradient>
           </defs>
           <motion.path
             animate={{
                d: `M 50 128 L ${60 + distance * 60} ${128 - 20 * distance} L ${60 + distance * 60} ${128 + 20 * distance} Z`
             }}
             fill="url(#beamGradient)"
           />
        </svg>

        {/* Receiver Wall */}
        <motion.div 
          animate={{ x: distance * 60 }}
          style={{ height: distance * 40 }}
          className="w-2 bg-white/20 border-l border-white/40 backdrop-blur-sm relative"
        >
           <div className="absolute -top-6 left-0 right-0 text-center whitespace-nowrap">
              <p className="text-[10px] font-bold text-white uppercase tracking-tighter">表面 (E)</p>
              <p className="text-[9px] text-primary-400">{illuminance} lux</p>
           </div>
        </motion.div>

        {/* Distance Line */}
        <div className="absolute bottom-10 left-10 right-10 h-px bg-white/10">
           <motion.div 
             animate={{ width: distance * 60 }}
             className="h-full bg-primary-500 relative"
           >
              <span className="absolute -top-4 right-0 text-[9px] text-gray-500 font-mono">{distance}m</span>
           </motion.div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex justify-between text-xs text-gray-400">
           <span>距离 (r)</span>
           <span>{distance} m</span>
        </label>
        <input 
          type="range" min="1" max="5" step="0.1" value={distance} 
          onChange={(e) => setDistance(parseFloat(e.target.value))}
          className="w-full accent-primary"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="glass-card p-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-2 opacity-10 font-black text-4xl group-hover:scale-110 transition-transform">E</div>
              <h4 className="text-sm font-bold text-white mb-1">平方反比定律</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed font-mono">
                E = I / r²
              </p>
              <p className="text-[11px] text-gray-500 mt-2">
                当距离翻倍（2x），接收面上的照度会下降到原来的 1/4 (25%)。
              </p>
           </div>
           <div className="glass-card p-4 relative overflow-hidden group border-primary-500/20">
              <h4 className="text-sm font-bold text-white mb-1">专业视角</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                在车灯法规测试中，照度计通常放置在 25米 处。通过测量照度(lx)并乘以距离平方(25²)，我们计算出配光强度(cd)。
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
