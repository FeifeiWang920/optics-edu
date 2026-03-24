"use client";

import { motion } from "framer-motion";

const colors = [
  { name: "Ultraviolet", wave: "< 380nm", color: "from-purple-900 to-purple-600", active: false },
  { name: "Violet", wave: "380-450nm", color: "from-purple-600 to-blue-700", active: true },
  { name: "Blue", wave: "450-495nm", color: "from-blue-700 to-cyan-500", active: true },
  { name: "Cyan", wave: "495-520nm", color: "from-cyan-500 to-teal-400", active: true },
  { name: "Green", wave: "520-570nm", color: "from-teal-400 to-green-500", active: true },
  { name: "Yellow", wave: "570-590nm", color: "from-green-500 to-yellow-400", active: true },
  { name: "Orange", wave: "590-620nm", color: "from-yellow-400 to-orange-500", active: true },
  { name: "Red", wave: "620-780nm", color: "from-orange-500 to-red-600", active: true },
  { name: "Infrared", wave: "> 780nm", color: "from-red-600 to-red-900", active: false },
];

export default function SpectrumSlider() {
  return (
    <div className="w-full space-y-6 py-8">
      <div className="flex justify-between items-end mb-2">
        <h3 className="text-xl font-semibold text-white">Visible Light Spectrum 可见光谱</h3>
        <span className="text-sm text-gray-400">380nm — 780nm</span>
      </div>
      
      <div className="relative h-24 flex w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg">
        {colors.map((c) => (
          <motion.div
            key={c.name}
            className={`flex-grow relative group cursor-pointer bg-gradient-to-b ${c.color}`}
            whileHover={{ flexGrow: 1.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
              <div className="text-center">
                <p className="text-xs font-bold text-white uppercase tracking-wider">{c.name}</p>
                <p className="text-[10px] text-white/80">{c.wave}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="glass-card p-6">
          <h4 className="text-primary-400 font-bold mb-2 flex items-center">
             Professional Depth 专业深度
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            人眼视网膜上的视锥细胞对不同波长的电磁波具有不同的敏感度。可见光（380-780nm）是电磁波谱中极窄的一段。在车灯设计中，我们重点关注主波长（Dominant Wavelength）和色纯度，以确保信号灯符合法规定义的色度区域（CIE 1931）。
          </p>
        </div>
        <div className="glass-card p-6 border-blue-500/20">
          <h4 className="text-accent font-bold mb-2 flex items-center">
             Easy to Understand 通俗易懂
          </h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            想象光是一群带着不同颜色“频率”的小精灵。频率高的像紫光，跑得飞快；频率低的像红光，步子迈得慢悠悠。在这个区间之外的，我们的眼睛就“接收不到信号”了，就像听不到超声波一样。
          </p>
        </div>
      </div>
    </div>
  );
}
