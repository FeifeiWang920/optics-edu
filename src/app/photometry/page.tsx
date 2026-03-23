import PhotometryVisualizer from "@/components/PhotometryVisualizer";
import { Zap, Eye, Target, SquareMinus, BookOpen } from "lucide-react";

export default function PhotometryPage() {
  return (
    <div className="space-y-16">
      <section className="space-y-4">
        <h1 className="text-5xl font-bold text-gradient">光度学基础</h1>
        <p className="text-gray-400 text-lg max-w-3xl">
          光度学是量化光的学科——但它不是简单地测量电磁辐射能量，而是将<strong>人眼的主观感受</strong>一并纳入考量。正确理解这些量，才能读懂灯具规格书和法规要求。
        </p>
      </section>

      {/* Radiometry vs Photometry */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">辐射度学 vs 光度学</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 space-y-4">
            <Eye className="text-gray-500" size={32} />
            <h3 className="text-xl font-bold text-white">辐射度学（Radiometry）</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              对所有范围的电磁辐射进行<strong>客观物理计量</strong>的学科，不考虑人眼的主观感受。使用的是物理单位，如瓦特（W）。
            </p>
            <div className="p-3 bg-black/40 rounded-lg font-mono text-xs space-y-1 text-gray-400">
              <p>辐射功率 → W（瓦）</p>
              <p>辐射强度 → W/sr</p>
              <p>辐照度  → W/m²</p>
              <p>辐射亮度 → W/(sr·m²)</p>
            </div>
          </div>
          <div className="glass-panel p-8 space-y-4 border border-primary-500/20">
            <Eye className="text-primary-400" size={32} />
            <h3 className="text-xl font-bold text-white">光度学（Photometry）</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              在可见光范围内，用人眼的<strong>视觉灵敏度加权</strong>后的计量学科。相同物理功率的光，感知到的"亮度"因波长而不同。
            </p>
            <div className="p-3 bg-primary-500/5 rounded-lg font-mono text-xs space-y-1 text-primary-300">
              <p>光通量 → 流明（lm）</p>
              <p>发光强度 → 坎德拉（cd）</p>
              <p>照度   → 勒克斯（lx）</p>
              <p>亮度   → 坎德拉/平方米（cd/m²）</p>
            </div>
          </div>
        </div>
        {/* Luminous Efficacy SVG */}
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-lg font-bold text-white">视见函数 V(λ) — 人眼的灵敏度权重</h3>
          <p className="text-xs text-gray-400 max-w-3xl">视见函数描述了人眼在不同波长光线下的相对灵敏度，是辐射量转换为光度量的核心加权因子。对所有波长的权重积分，得到光功当量，最大值 683 lm/W 对应 555nm。</p>
          <svg viewBox="0 0 500 170" className="w-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="40" y1="130" x2="470" y2="130" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
            <line x1="40" y1="10" x2="40" y2="130" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
            {[380, 430, 480, 530, 555, 580, 630, 680, 730, 780].map((nm) => (
              <text key={nm} x={40 + (nm - 380) / 400 * 430} y="143" fill="#555" fontSize="7" textAnchor="middle">{nm}</text>
            ))}
            <text x="255" y="158" fill="#666" fontSize="8" textAnchor="middle">波长 (nm)</text>
            <text x="12" y="18" fill="#666" fontSize="7">V(λ)</text>
            <text x="12" y="28" fill="#666" fontSize="7">1.0</text>
            <text x="12" y="80" fill="#666" fontSize="7">0.5</text>
            <text x="12" y="130" fill="#666" fontSize="7">0</text>
            {/* Line at 0.5 */}
            <line x1="40" y1="80" x2="470" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4,4"/>
            {/* Photopic curve (approx) peak 555nm: 40 + (555-380)/400 * 430 = 228.1 */}
            <path d="M 40 130 Q 120 130 170 100 Q 228.1 0 280 100 Q 330 130 470 130"
              stroke="#22c55e" strokeWidth="2.5" fill="rgba(34,197,94,0.1)" />
            <text x="270" y="10" fill="#22c55e" fontSize="9" textAnchor="middle">明视觉 V(λ)</text>
            <text x="270" y="22" fill="#22c55e" fontSize="8" textAnchor="middle">峰值 555nm</text>
            
            {/* Peak marker at 555nm */}
            <line x1="228.1" y1="10" x2="228.1" y2="130" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,3" opacity="0.4"/>
            
            {/* Scotopic curve peak ~507nm: 40 + (507-380)/400 * 430 = 176.5 */}
            <path d="M 40 130 Q 80 130 130 90 Q 176.5 10 210 90 Q 250 130 470 130"
              stroke="#3b82f6" strokeWidth="2" fill="rgba(59,130,246,0.07)" strokeDasharray="6,3"/>
            <text x="160" y="10" fill="#3b82f6" fontSize="9" textAnchor="middle">暗视觉 V&apos;(λ)</text>
            <text x="160" y="22" fill="#3b82f6" fontSize="8" textAnchor="middle">峰值 507nm</text>
            
            {/* Peak marker at 507nm */}
            <line x1="176.5" y1="10" x2="176.5" y2="130" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3" opacity="0.4"/>
          </svg>
          <p className="text-[10px] text-gray-500 text-center">最大光谱光视效能（明视觉）：683 lm/W @ 555nm；最大光谱光视效能（暗视觉）：1700 lm/W @ 507nm</p>
        </div>
      </section>

      {/* Solid Angle */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">立体角（Solid Angle）</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4 text-sm text-gray-300">
            <p>立体角是二维"平面角"概念在三维空间中的推广，用于描述三维空间中"方向的范围大小"。</p>
            <div className="p-4 bg-accent-500/5 rounded-xl border border-accent-500/10 space-y-3">
              <div className="font-mono text-center p-2 bg-black/40 rounded text-accent-300">
                Ω = A / r²  (球面度, sr)
              </div>
              <p className="text-xs text-gray-400">A = 球面上的面积，r = 球半径。整球的立体角 = 4π ≈ 12.57 sr</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white/5 rounded-lg">整球 = 4π sr ≈ 12.57 sr</div>
              <div className="p-3 bg-white/5 rounded-lg">半球 = 2π sr ≈ 6.28 sr</div>
            </div>
          </div>
          <div className="glass-panel p-4">
            <svg viewBox="0 0 220 170" className="w-full" xmlns="http://www.w3.org/2000/svg">
              {/* Background sphere */}
              <ellipse cx="90" cy="85" rx="68" ry="68" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2"/>
              {/* Equator ellipse (perspective) */}
              <ellipse cx="90" cy="103" rx="68" ry="13" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3,3"/>
              {/*
                Center O = (90, 85), radius r = 68
                Solid angle patch on sphere surface:
                Edge 1: from O, direction angle ~340° from +x → unit vector ~(0.94,-0.34) → end (90+68*0.94, 85+68*(-0.34))=(153.9, 61.9)
                Edge 2: from O, direction angle ~310° → unit (-0.64,-0.77) → end (90+68*(-0.64),85+68*(-0.77))=(46.5, 32.6)
                Spherical patch arc connects these two surface points
              */}
              {/* Edge rays from center to sphere surface */}
              <line x1="90" y1="85" x2="153" y2="62" stroke="#888" strokeWidth="1.2"/>
              <line x1="90" y1="85" x2="47" y2="33" stroke="#888" strokeWidth="1.2"/>
              {/* r label on one edge */}
              <text x="122" y="67" fill="#888" fontSize="9">r</text>
              {/* Spherical patch (arc on sphere surface between the two points) */}
              <path d="M 153 62 Q 120 20 47 33" fill="rgba(251,191,36,0.25)" stroke="#f59e0b" strokeWidth="1.5"/>
              {/* Lines from center to patch outline */}
              <path d="M 90 85 L 153 62 Q 120 20 47 33 Z" fill="rgba(251,191,36,0.1)" stroke="none"/>
              {/* Label: spherical area A */}
              <text x="80" y="38" fill="#f59e0b" fontSize="9">球面面积 A</text>
              {/* Center O */}
              <circle cx="90" cy="85" r="2.5" fill="#3b82f6"/>
              <text x="94" y="89" fill="#3b82f6" fontSize="8">O（球心）</text>
              {/* Solid angle symbol Ω */}
              <text x="87" y="68" fill="#f59e0b" fontSize="13" fontWeight="bold">Ω</text>
              {/* Formula */}
              <text x="5" y="155" fill="#888" fontSize="9" fontWeight="bold">Ω = A / r²</text>
              <text x="68" y="155" fill="#555" fontSize="9">（球面度, Sr）</text>
              <text x="5" y="168" fill="#555" fontSize="8">整球 = 4π Sr ≈ 12.57 Sr；半球 = 2π Sr ≈ 6.28 Sr</text>
            </svg>
          </div>
        </div>
      </section>

      {/* Core Photometric Quantities */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">四大核心光度量</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              sym: "Φ", name: "光通量", english: "Luminous Flux", unit: "流明（lm）",
              def: "光源向四面八方发出的可见光总功率（用视见函数加权后的辐射功率）",
              formula: "Φ = ∫ P(λ) · V(λ) · 683 dλ",
              note: "一只普通卤素车灯约 1000lm，LED 近光灯约 800~1200lm",
              color: "border-l-primary-500", fcolor: "text-primary-300",
            },
            {
              sym: "I", name: "发光强度", english: "Luminous Intensity", unit: "坎德拉（cd）",
              def: "光源在特定方向上单位立体角内的光通量，描述光源向某一方向发光的\"集中程度\"",
              formula: "I = dΦ / dΩ （cd = lm/sr）",
              note: "车灯配光测试就是测量 I(θ,φ)——即不同角度的发光强度分布（配光曲线）",
              color: "border-l-secondary-500", fcolor: "text-secondary-300",
            },
            {
              sym: "E", name: "照度", english: "Illuminance", unit: "勒克斯（lx）",
              def: "单位面积被照面接收到的光通量。只与光源和接收面的相对位置有关，与被照面材质无关",
              formula: "E = dΦ / dA （lx = lm/m²）",
              note: "法规规定近光灯在25m处水平面照度不低于1lx。晴天室外约10000lx，室内约500lx",
              color: "border-l-accent-500", fcolor: "text-accent-300",
            },
            {
              sym: "L", name: "亮度", english: "Luminance", unit: "坎德拉/平方米（cd/m²）= 尼特（nit）",
              def: "从特定方向观察时，单位投影面积的发光强度。这才是人眼真正感知的\"明亮程度\"",
              formula: "L = d²Φ / (dΩ · dA · cosθ)",
              note: "白纸和黑纸在相同照度下，亮度截然不同。屏幕亮度通常300~600nit，太阳约10⁹nit",
              color: "border-l-purple-500", fcolor: "text-purple-300",
            },
          ].map((q) => (
            <div key={q.sym} className={`glass-panel p-6 space-y-4 border-l-4 ${q.color}`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className={`text-4xl font-black ${q.fcolor} mr-2`}>{q.sym}</span>
                  <span className="text-xl font-bold text-white">{q.name}</span>
                  <p className="text-xs text-gray-500 mt-0.5">{q.english}</p>
                </div>
                <span className={`text-[10px] font-mono px-2 py-1 rounded ${q.fcolor} bg-white/5`}>{q.unit}</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{q.def}</p>
              <div className={`font-mono text-center p-2 bg-black/40 rounded text-sm ${q.fcolor}`}>{q.formula}</div>
              <p className="text-[11px] text-gray-500 italic border-t border-white/5 pt-3">💡 {q.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inverse Square Law */}
      <section className="glass-panel p-10 bg-gradient-to-br from-surface to-transparent">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold">平方反比定律</h2>
            <p className="text-gray-400 leading-relaxed text-sm">
              对于点光源，照度随距离的平方成反比减小。这是灯具配光测试和照明设计的最基础定律。
            </p>
            <div className="p-5 bg-primary-500/5 rounded-xl border border-primary-500/10 space-y-3">
              <div className="font-mono text-center p-3 bg-black/40 rounded text-primary-300 text-xl">
                E = I · cosθ / r²
              </div>
              <p className="text-xs text-gray-400 text-center">E: 照度(lx)  |  I: 发光强度(cd)  |  r: 距离(m)  |  θ: 入射角</p>
            </div>
            <div className="space-y-2">
              {[
                { d: "1m", e: "10000 lx", note: "基准" },
                { d: "2m", e: "2500 lx", note: "距离翻倍 → 照度变 1/4" },
                { d: "5m", e: "400 lx", note: "距离 5倍 → 照度变 1/25" },
                { d: "10m", e: "100 lx", note: "可视为点光源的极限距离" },
              ].map(({ d, e, note }) => (
                <div key={d} className="flex items-center gap-3 text-xs">
                  <div className="w-10 h-8 rounded-lg bg-white/5 flex items-center justify-center font-mono text-white shrink-0">{d}</div>
                  <div className="w-20 shrink-0 text-primary-400 font-mono">{e}</div>
                  <div className="text-gray-500">{note}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-3">👆 交互式仿真 — 拖动距离滑块，观察照度变化</p>
            <PhotometryVisualizer />
          </div>
        </div>
      </section>

      {/* Luminance vs Illuminance */}
      <div className="glass-card p-8 space-y-4">
        <BookOpen className="text-gray-500" size={24} />
        <h3 className="text-xl font-bold text-white">照度与亮度：容易混淆的两个概念</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-400">
          <div className="space-y-2">
            <p><strong className="text-white">照度（lx）</strong>描述的是被照面<em>接收</em>到多少光，与被照面材质无关。</p>
            <p>在同一房间（照度相同），白色墙壁和黑色墙壁接收的照度是相同的。</p>
          </div>
          <div className="space-y-2">
            <p><strong className="text-white">亮度（cd/m²）</strong>描述的是从特定方向看到的表面<em>发出（或反射）</em>多少光。</p>
            <p>在同一照度下，白纸（反射率约90%）比黑纸（约5%）亮度高约18倍，这导致我们感知到颜色差异。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
