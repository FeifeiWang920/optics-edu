"use client";

import { motion } from "framer-motion";

const bands = [
  "bg-[#333]", "bg-[#444]", "bg-[#555]", "bg-[#666]", "bg-[#777]", "bg-[#888]", "bg-[#999]"
];

export default function MachBandDemo() {
  return (
    <div className="glass-panel p-8 space-y-6">
      <h3 className="text-xl font-bold text-white mb-2 underline decoration-accent-500/30 underline-offset-8 decoration-wavy">马赫带效应 (Mach Band Effect)</h3>
      
      <div className="space-y-4">
        <p className="text-xs text-gray-400">
          盯着各色条之间的交界处。你会发现，在较亮的一侧边缘似乎更亮，而在较暗的一侧边缘似乎更暗。这其实是人眼的神经处理机制（侧抑制）产生的错觉。
        </p>
        
        <div className="flex h-32 w-full rounded-xl overflow-hidden border border-white/5">
          {bands.map((color, i) => (
            <div key={i} className={`flex-1 ${color} h-full transition-all`} />
          ))}
        </div>
      </div>

      <div className="p-4 bg-accent-500/5 rounded-xl border border-accent-500/10">
         <h4 className="text-xs font-bold text-accent-400 mb-2">💡 视觉增强原理</h4>
         <p className="text-[11px] text-gray-400 leading-relaxed italic">
           侧抑制 (Lateral Inhibition) 是大脑对边缘信息的主动增强过程。这种机制有助于我们在低对比度环境下，更清晰地辨别物体的轮廓和形状。
         </p>
      </div>
    </div>
  );
}
