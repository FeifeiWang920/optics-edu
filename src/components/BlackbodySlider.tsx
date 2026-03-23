"use client";

import { useState, useMemo } from "react";
import { Thermometer } from "lucide-react";

export default function BlackbodySlider() {
  const [temp, setTemp] = useState(6500);

  // Improved temperature to color mapping using linear interpolation
  const getColor = (k: number) => {
    // Basic values for interpolation
    const points = [
      { t: 1000, r: 255, g: 50, b: 0 },    // Deep red/orange
      { t: 2000, r: 255, g: 140, b: 20 },  // Warm orange
      { t: 3000, r: 255, g: 180, b: 80 },  // Halogen yellowish
      { t: 4500, r: 255, g: 240, b: 200 }, // Warm white
      { t: 6500, r: 255, g: 255, b: 255 }, // Pure white (D65 approx)
      { t: 10000, r: 200, g: 220, b: 255 }, // Cool blue
      { t: 15000, r: 160, g: 190, b: 255 }  // Deep cool blue
    ];

    let low = points[0];
    let high = points[points.length - 1];

    for (let i = 0; i < points.length - 1; i++) {
      if (k >= points[i].t && k <= points[i+1].t) {
        low = points[i];
        high = points[i+1];
        break;
      }
    }

    const ratio = (k - low.t) / (high.t - low.t || 1);
    const r = Math.round(low.r + (high.r - low.r) * ratio);
    const g = Math.round(low.g + (high.g - low.g) * ratio);
    const b = Math.round(low.b + (high.b - low.b) * ratio);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const currentColor = useMemo(() => getColor(temp), [temp]);

  return (
    <div className="glass-panel p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
           <Thermometer className="text-primary-400" size={20} /> 色温 (Color Temp)
        </h3>
        <span className="text-xl font-mono text-white tracking-widest">{temp} <span className="text-sm font-sans text-gray-500">K</span></span>
      </div>

      <div className="relative h-24 rounded-2xl overflow-hidden border border-white/10 shadow-inner group">
         <div 
           className="absolute inset-0 transition-colors duration-500" 
           style={{ backgroundColor: currentColor }} 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
         <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-bold text-black/40 uppercase tracking-[0.2em] group-hover:scale-110 transition-transform">
               {temp < 4000 ? "Warm 暖色" : temp > 7000 ? "Cool 冷色" : "Neutral 中性"}
            </span>
         </div>
      </div>

      <div className="space-y-4">
        <input 
          type="range" min="1000" max="15000" step="100" value={temp} 
          onChange={(e) => setTemp(parseInt(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-orange-500 via-white to-blue-400"
        />
        <div className="flex justify-between text-[9px] text-gray-500 font-mono uppercase">
           <span>1000K</span>
           <span>6500K (Daylight)</span>
           <span>15000K</span>
        </div>
      </div>

      <div className="p-4 bg-primary-500/5 rounded-xl border border-primary-500/10">
         <h4 className="text-xs font-bold text-primary-400 mb-2">🚗 车灯中的应用</h4>
         <p className="text-[11px] text-gray-400 leading-relaxed italic">
           常见的卤素灯约 3000K（发黄），氙气灯或 LED 约 6000K（冷白）。色温越高，视觉上越亮，但在雨雾天气的穿透力会相应减弱。
         </p>
      </div>
    </div>
  );
}
