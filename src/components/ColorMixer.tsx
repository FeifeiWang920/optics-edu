"use client";

import { useState, useMemo } from "react";

export default function ColorMixer() {
  const [rgb, setRgb] = useState({ r: 255, g: 150, b: 50 });
  const [target] = useState({ r: 100, g: 200, b: 150 });

  const diff = useMemo(() => {
    return Math.sqrt(
      Math.pow(rgb.r - target.r, 2) +
      Math.pow(rgb.g - target.g, 2) +
      Math.pow(rgb.b - target.b, 2)
    );
  }, [rgb, target]);

  return (
    <div className="glass-panel p-8 space-y-6">
      <h3 className="text-xl font-bold text-white">颜色匹配实验 (Color Matching)</h3>
      
      <div className="grid grid-cols-2 gap-4 h-32">
        <div className="rounded-xl flex flex-col items-center justify-center space-y-2 border border-white/10" style={{ backgroundColor: `rgb(${target.r}, ${target.g}, ${target.b})` }}>
          <span className="text-[10px] font-bold text-white uppercase drop-shadow-md">目标颜色 Target</span>
        </div>
        <div className="rounded-xl flex flex-col items-center justify-center space-y-2 border border-white/10" style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}>
          <span className="text-[10px] font-bold text-white uppercase drop-shadow-md">你的混合 Mix</span>
        </div>
      </div>

      <div className="space-y-4">
        <ColorSlider label="R (Red)" value={rgb.r} color="bg-red-500" onChange={(v) => setRgb({ ...rgb, r: v })} />
        <ColorSlider label="G (Green)" value={rgb.g} color="bg-green-500" onChange={(v) => setRgb({ ...rgb, g: v })} />
        <ColorSlider label="B (Blue)" value={rgb.b} color="bg-blue-500" onChange={(v) => setRgb({ ...rgb, b: v })} />
      </div>

      <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center">
         <span className="text-xs text-gray-400">颜色距离 (sRGB 欧氏距离估算): </span>
         <span className={`font-mono font-bold ${diff < 25 ? "text-green-400" : "text-primary-400"}`}>
            {diff.toFixed(1)}
         </span>
         {diff < 25 && <span className="ml-2 text-[10px] text-green-500 font-bold animate-pulse">匹配成功！</span>}
      </div>
    </div>
  );
}

function ColorSlider({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-mono text-gray-500">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <input 
        type="range" min="0" max="255" value={value} 
        onChange={(e) => onChange(parseInt(e.target.value))}
        className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-white/10`}
      />
    </div>
  );
}
