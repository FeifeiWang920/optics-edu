import RayTracer from "@/components/RayTracer";
import PhaseFunctionVisualizer from "@/components/PhaseFunctionVisualizer";
import { Zap, TriangleAlert, Droplets, Sigma } from "lucide-react";

export default function InteractionsPage() {
  return (
    <div className="space-y-16">
      <section className="space-y-4">
        <h1 className="text-5xl font-bold text-gradient">光的物理作用原理</h1>
        <p className="text-gray-400 text-lg max-w-3xl">
          光线在传播过程中，会与各种材料的界面发生相互作用。掌握这些规律，才能设计出精确控制光路的反射镜、透镜和导光系统。
        </p>
      </section>

      {/* Reflection */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-3"><Zap className="text-primary-500" /> 反射（Reflection）</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-5 text-gray-300 text-sm leading-relaxed">
            <p>当光线照射到两种介质的界面时，一部分光会返回原介质继续传播，这就是<strong>反射</strong>。</p>
            <div className="p-5 bg-primary-500/5 rounded-xl border border-primary-500/10 space-y-3">
              <h4 className="font-bold text-white">反射定律（镜面反射）</h4>
              <div className="font-mono text-center p-3 bg-black/40 rounded-lg text-primary-300">
                θᵣ = θᵢ
              </div>
              <p className="text-xs text-gray-400">反射角 = 入射角，且入射光线、法线、反射光线三者共面</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <h5 className="font-bold text-white text-xs">镜面反射</h5>
                <p className="text-[11px] text-gray-500">表面光滑，反射方向单一。车用反射镜（如近光灯抛物面镜）利用此原理精确控制出光方向。</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                <h5 className="font-bold text-white text-xs">漫反射</h5>
                <p className="text-[11px] text-gray-500">表面粗糙，光线向各方向散射。如哑光涂料表面。漫反射亮度与观察角无关（朗伯体）。</p>
              </div>
            </div>
            <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 text-xs text-gray-400">
              <strong className="text-blue-300">车灯应用：</strong>近光灯反射镜采用<strong>自由曲面</strong>（Free-form Surface）设计，精确计算每块反射区域的曲率，将点光源的光精确投射到规定的配光形状（如截止线）。
            </div>
          </div>
          {/* SVG Reflection Diagram - Accurate */}
          <div className="glass-panel p-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 text-center">镜面反射原理图</p>
            <svg viewBox="0 0 280 210" className="w-full" xmlns="http://www.w3.org/2000/svg">
              {/* Interface */}
              <line x1="10" y1="130" x2="270" y2="130" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
              {/* Hatching below interface to indicate medium */}
              {[30,60,90,120,150,180,210,240].map(x => (
                <line key={x} x1={x} y1="130" x2={x-10} y2="148" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
              ))}
              <text x="195" y="147" fill="#666" fontSize="9">反射介质（镜面）</text>
              {/* Normal — vertical dashed line through incidence point P(140,130) */}
              <line x1="140" y1="20" x2="140" y2="130" stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeDasharray="5,3"/>
              <text x="144" y="28" fill="#666" fontSize="8">法线 N</text>
              {/*
                Incidence point P = (140, 130).
                Incident ray at 45° from normal: from upper-left direction.
                  unit along incident: (sin45°, cos45°) = (0.707, 0.707) away from P
                  start = P - 90*(0.707,0.707) = (140-63.6, 130-63.6) = (76, 66) → use (50, 43)
                Reflected ray at 45° on other side:
                  unit: (-sin45,cos45)=(-0.707, 0.707) away from P upward-right
                  end = P + 90*(0.707,-0.707) = wait, UPWARD in SVG = -y
                  end = (140+63.6, 130-63.6) = (203, 66) → use (230, 43)
              */}
              {/* Incident ray: from (50,43) → P(140,130), 45° from vertical */}
              <line x1="50" y1="43" x2="140" y2="130" stroke="#f59e0b" strokeWidth="2.5"/>
              <polygon points="137,122 143,122 140,130" fill="#f59e0b"/>
              <text x="37" y="40" fill="#f59e0b" fontSize="9">入射光</text>
              {/* Reflected ray: P(140,130) → (230,43), symmetric about normal */}
              <line x1="140" y1="130" x2="230" y2="43" stroke="#3b82f6" strokeWidth="2.5"/>
              <polygon points="225,53 233,44 232,52" fill="#3b82f6"/>
              <text x="222" y="40" fill="#3b82f6" fontSize="9">反射光</text>
              {/*
                Angle arcs at P(140,130), radius=35.
                Normal direction = up = angle 270° in standard coords (or -90° = (0,-1) in SVG)
                Incident arrives from direction: upper-left, so from P toward (50,43): direction=(-90,-87)/125≈(-0.718,-0.695)
                  angle arc from normal (top, 140,95) sweeping CCW (in SVG = CW visually) to incident direction
                  point on arc at 45° left of normal: (140+35*sin(-45°), 130+35*(-cos45°)) but in SVG y-flip:
                  = (140-35*sin45°, 130-35*cos45°) = (140-24.7, 130-24.7) = (115.3, 105.3)
                  normal top point: (140, 130-35)=(140,95)
              */}
              {/* θᵢ arc: from normal top (140,95) CCW to left side */}
              <path d="M 140 95 A 35 35 0 0 0 115.3 105.3" fill="none" stroke="rgba(251,191,36,0.7)" strokeWidth="1.5"/>
              <text x="99" y="104" fill="#f59e0b" fontSize="10">θᵢ</text>
              {/* θᵣ arc: from normal top (140,95) CW to right side — symmetric */}
              <path d="M 140 95 A 35 35 0 0 1 164.7 105.3" fill="none" stroke="rgba(59,130,246,0.7)" strokeWidth="1.5"/>
              <text x="163" y="104" fill="#3b82f6" fontSize="10">θᵣ</text>
              {/* Annotation */}
              <text x="72" y="195" fill="#888" fontSize="9">θᵢ = θᵣ （角度均从法线量起；入射、反射、法线三者共面）</text>
            </svg>
          </div>
        </div>
      </section>

      {/* Refraction */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-3"><Sigma className="text-secondary-500" /> 折射（Refraction）与斯涅尔定律</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-5 text-gray-300 text-sm leading-relaxed">
            <p>光从一种介质进入另一种介质时，速度改变，传播方向发生偏折，称为<strong>折射</strong>。折射定律（斯涅尔定律）精确描述了这一关系：</p>
            <div className="p-5 bg-secondary-500/5 rounded-xl border border-secondary-500/10 space-y-3">
              <h4 className="font-bold text-white">斯涅尔定律（Snell{' '}{'´s'} Law）</h4>
              <div className="font-mono text-center p-3 bg-black/40 rounded-lg text-secondary-300 text-lg">
                n₁ · sin θ₁ = n₂ · sin θ₂
              </div>
              <p className="text-xs text-gray-400">n 为折射率，θ 为与法线的夹角。折射率 = c / v（光速/介质中光速）</p>
            </div>
            <div className="p-4 bg-black/40 rounded-xl font-mono text-xs border border-white/5 space-y-1">
              {/* 常见光学材料折射率（对钠黄光 589nm） */}
              <p className="text-white">空气 n ≈ 1.000</p>
              <p className="text-white">水   n ≈ 1.333</p>
              <p className="text-green-400">PMMA (亚克力)  n ≈ 1.492</p>
              <p className="text-blue-400">PC (聚碳酸酯)  n ≈ 1.586</p>
              <p className="text-yellow-400">玻璃（普通）   n ≈ 1.52</p>
            </div>
          </div>
          {/* Ray Tracer */}
          <div>
            <p className="text-xs text-gray-500 mb-3">👆 交互式折射仿真器 — 拖动滑块改变入射角和材料</p>
            <RayTracer />
          </div>
        </div>
      </section>

      {/* Total Internal Reflection */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-3"><TriangleAlert className="text-yellow-500" /> 全内反射（TIR）</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-5 text-gray-300 text-sm leading-relaxed">
            <p>
              当光从<strong>光密介质</strong>（如 PC）射向<strong>光疏介质</strong>（如空气），若入射角大于某个临界角，折射光线将完全消失，光线 100% 被反射回光密介质，这就是<strong>全内反射</strong>。
            </p>
            <div className="p-5 bg-yellow-500/5 rounded-xl border border-yellow-500/10 space-y-3">
              <h4 className="font-bold text-white">临界角公式</h4>
              <div className="font-mono text-center p-3 bg-black/40 rounded-lg text-yellow-300">
                θ<sub>c</sub> = arcsin(n₂ / n₁)
              </div>
              <div className="text-xs text-gray-400 space-y-1">
                <p>PMMA → 空气：θc = arcsin(1/1.492) ≈ <strong className="text-white">42.2°</strong></p>
                <p>PC → 空气：θc = arcsin(1/1.586) ≈ <strong className="text-white">39.1°</strong></p>
              </div>
            </div>
            <div className="p-4 bg-yellow-500/5 rounded-xl border border-yellow-500/10 space-y-2">
              <h4 className="font-bold text-yellow-400 text-xs uppercase tracking-widest">车灯核心应用</h4>
              <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                <li><strong className="text-white">导光条（Light Guide）：</strong>利用全反射将光从端部导入后沿棒体传导，实现均匀线光源效果</li>
                <li><strong className="text-white">TIR 透镜：</strong>通过全反射将 LED 光束高效准直，替代传统抛物面镜，效率更高</li>
              </ul>
            </div>
          </div>
          {/* SVG TIR Diagram - Physically Accurate */}
          <div className="glass-panel p-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 text-center">全内反射三种情形对比</p>
            <svg viewBox="0 0 360 240" className="w-full" xmlns="http://www.w3.org/2000/svg">
              {/* Dense medium fill (bottom = PMMA) */}
              <rect x="0" y="120" width="360" height="120" fill="rgba(59,130,246,0.06)"/>
              {/* Interface line */}
              <line x1="0" y1="120" x2="360" y2="120" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
              <text x="5" y="115" fill="#888" fontSize="8">空气 n=1.0</text>
              <text x="5" y="133" fill="#60a5fa" fontSize="8">PMMA n=1.492</text>

              {/* ── CASE 1: Small angle ─ partial refraction ── */}
              {/* Incident ray from bottom-left, angle ~30° from normal */}
              {/* Normal at x=70 */}
              <line x1="70" y1="60" x2="70" y2="185" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,3"/>
              {/* Incident: from (30,185) to (70,120), θ₁≈30° from normal */}
              <line x1="30" y1="185" x2="70" y2="120" stroke="#f59e0b" strokeWidth="2"/>
              <polygon points="68,128 73,123 70,120" fill="#f59e0b"/>
              {/* Refracted: sinθ₂=n₁/n₂·sinθ₁=1.492·sin30°/1=0.746→θ₂≈48° from normal */}
              {/* 折射光跨越法线到右侧，向远离法线方向偏折（θ₂ > θ₁） */}
              {/* At x=70,y=120, θ₂=48°→tanθ₂=1.11, Δy=50→Δx=55 to RIGHT */}
              <line x1="70" y1="120" x2={70 + 55} y2="70" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.6"/>
              <polygon points={"119,72 125,68 120,75"} fill="#f59e0b" opacity="0.6"/>
              {/* Angle arcs */}
              <path d="M 70 140 A 20 20 0 0 0 55.4 131.4" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.7"/>
              <text x="42" y="147" fill="#f59e0b" fontSize="7">θ₁≈30°</text>
              <path d="M 70 100 A 20 20 0 0 0 84 90" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.5"/>
              <text x="88" y="100" fill="#f59e0b" fontSize="7">θ₂≈48°</text>
              <text x="18" y="215" fill="#f59e0b" fontSize="7">①小角度→折射透出</text>

              {/* ── CASE 2: Critical angle ─ refracted ray grazes the surface ── */}
              {/* Normal at x=180 */}
              <line x1="180" y1="60" x2="180" y2="195" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,3"/>
              {/* θ_c = arcsin(1/1.492) ≈ 42.2° */}
              {/* Incident: angle=42.2° from normal → tan(42.2°)≈0.907 → Δy=75→Δx=68 */}
              <line x1="112" y1="195" x2="180" y2="120" stroke="#22c55e" strokeWidth="2"/>
              <polygon points="178,128 183,123 180,120" fill="#22c55e"/>
              {/* Refracted at 90° — grazes the interface, goes right along y=120 */}
              <line x1="180" y1="120" x2="290" y2="120" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="6,3" opacity="0.7"/>
              <polygon points="285,117 291,120 285,123" fill="#22c55e" opacity="0.7"/>
              {/* Angle arc */}
              <path d="M 180 148 A 28 28 0 0 0 160 126" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.7"/>
              <text x="140" y="152" fill="#22c55e" fontSize="7">θ_c≈42.2°</text>
              <text x="285" y="116" fill="#22c55e" fontSize="7">θ₂=90°</text>
              <text x="130" y="215" fill="#22c55e" fontSize="7">②临界角→沿界面传播</text>

              {/* ── CASE 3: Beyond critical angle → TIR ── */}
              {/* Normal at x=290 */}
              <line x1="290" y1="60" x2="290" y2="195" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,3"/>
              {/* Incident: angle=60° from normal > θ_c → TIR */}
              {/* tan60°=1.732, Δy=70→Δx=121, but limit to Δx=70 */}
              {/* from (250,191) to (290,120): Δx=40,Δy=71→angle=arctan(40/71)=29°... Let me use 60°: Δx=70·tan60°≈121, clip to (215,191) */}
              <line x1="250" y1="191" x2="290" y2="120" stroke="#ef4444" strokeWidth="2"/>
              <polygon points="288,128 293,123 290,120" fill="#ef4444"/>
              {/* Reflected: mirror of incident across normal. Incident Δx=+40,Δy=-71→reflected Δx=-40,Δy=-71, → from 290,120 to 250,49 (clip to 330,191) */}
              {/* Symmetric: incident goes to left of normal by 40 in x, reflected goes to right by 40 */}
              <line x1="290" y1="120" x2="330" y2="191" stroke="#ef4444" strokeWidth="2"/>
              <polygon points="328,183 333,190 325,188" fill="#ef4444"/>
              {/* Angle arcs for incident and reflected */}
              <path d="M 290 148 A 28 28 0 0 0 271.7 133" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.7"/>
              <text x="248" y="152" fill="#ef4444" fontSize="7">θᵢ≈60°</text>
              <path d="M 290 148 A 28 28 0 0 1 308.3 133" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.7"/>
              <text x="309" y="152" fill="#ef4444" fontSize="7">θᵣ≈60°</text>
              {/* No refracted ray — show X */}
              <text x="305" y="95" fill="#ef4444" fontSize="11" fontWeight="bold">✕</text>
              <text x="295" y="85" fill="#ef4444" fontSize="7">无折射光</text>
              <text x="240" y="215" fill="#ef4444" fontSize="7">③超临界角→全部反射</text>

              {/* Legend bottom */}
              <text x="5" y="232" fill="#666" fontSize="7.5">注：θ_c = arcsin(n₂/n₁) = arcsin(1/1.492) ≈ 42.2°；超过此角度，折射光消失，反射率=100%</text>
            </svg>
          </div>

        </div>
      </section>

      {/* Fresnel + Absorption */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 space-y-5">
          <h2 className="text-2xl font-bold">菲涅尔方程（Fresnel Equations）</h2>
          <div className="text-gray-300 text-sm space-y-4">
            <p>即使是透明材料，光线在界面处也会有一部分被反射，而不是全部透过。菲涅尔方程精确计算了这部分<strong>界面反射损耗</strong>。</p>
            <div className="p-4 bg-primary-500/5 rounded-xl border border-primary-500/10 space-y-2">
              <p className="text-xs text-gray-400">正入射（θ = 0°）时的反射率 R：</p>
              <div className="font-mono text-center p-2 bg-black/40 rounded text-primary-300">
                R = ((n₁ - n₂) / (n₁ + n₂))²
              </div>
            </div>
            <div className="p-3 bg-black/40 rounded-lg font-mono text-xs border border-white/5 space-y-1">
              {/* 垂直入射反射率计算 */}
              <p className="text-green-400">空气→PMMA：R = ((1-1.492)/(1+1.492))² ≈ <strong className="text-white">3.9%</strong></p>
              <p className="text-blue-400">空气→PC：R = ((1-1.586)/(1+1.586))² ≈ <strong className="text-white">5.1%</strong></p>
            </div>
            <div className="p-3 bg-yellow-500/5 rounded border border-yellow-500/10 text-xs text-gray-400">
              💡 车灯配光镜（PC 材质）每个界面有约 5% 的菲涅尔反射损耗，两面合计约 10%。高档车灯会采用<strong>增透镀膜</strong>降低损耗。
            </div>
          </div>
        </div>

        <div className="glass-panel p-8 space-y-5">
          <h2 className="text-2xl font-bold flex items-center gap-2"><Droplets className="text-blue-400" /> 散射（Scattering）</h2>
          <div className="text-gray-300 text-sm space-y-4">
            <p>光线在传播过程中碰到不均匀粒子或粗糙界面时，会偏离原方向向多角度散射。</p>
            <div className="space-y-3">
              <div className="p-3 bg-sky-500/5 rounded-xl border border-sky-500/10 space-y-1">
                <h4 className="font-bold text-sky-400 text-xs">瑞利散射（Rayleigh Scattering）</h4>
                <p className="text-[11px] text-gray-400">粒子尺寸 ≪ 波长时发生。散射强度 ∝ 1/λ⁴（波长越短散射越强）。<strong>天空为蓝色</strong>的原因，雾灯用黄光穿透力更强也基于此。</p>
              </div>
              <div className="p-3 bg-gray-500/5 rounded-xl border border-gray-500/10 space-y-1">
                <h4 className="font-bold text-gray-400 text-xs">米氏散射（Mie Scattering）</h4>
                <p className="text-[11px] text-gray-400">粒子尺寸 ≈ 波长时发生，对波长不敏感。<strong>云雾呈白色</strong>的原因（水滴比光波大）。</p>
              </div>
              <div className="p-3 bg-purple-500/5 rounded-xl border border-purple-500/10 space-y-1">
                <h4 className="font-bold text-purple-400 text-xs">BSDF（双向散射分布函数）</h4>
                <p className="text-[11px] text-gray-400">描述材料表面对光散射的数学模型，是仿真软件中表面属性的核心参数，涵盖镜面分量与漫反射分量。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dispersion */}
      <section className="glass-panel p-8 space-y-5">
        <h2 className="text-2xl font-bold">色散（Dispersion）与阿贝数</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-sm text-gray-300">
          <div className="space-y-4">
            <p>折射率并非常数，而是与光的波长有关。不同波长（颜色）的光在同一材料中折射率略有不同，导致它们折射后的传播方向略有差异，这就是<strong>色散</strong>。最著名的例子是棱镜将白光分解成彩虹色。</p>
            <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/10 space-y-3">
              <h4 className="font-bold text-white">阿贝数（V-number / Abbe Number）</h4>
              <div className="font-mono text-center p-2 bg-black/40 rounded text-purple-300">
                V = (n<sub>d</sub> - 1) / (n<sub>F</sub> - n<sub>C</sub>)
              </div>
              <p className="text-xs text-gray-400">n<sub>d</sub>=黄光(589nm), n<sub>F</sub>=蓝光(486nm), n<sub>C</sub>=红光(656nm)</p>
              <p className="text-xs text-gray-400"><strong>阿贝数越大，色散越小</strong>（越适合精密光学系统）</p>
            </div>
            <div className="p-3 bg-black/40 rounded font-mono text-xs space-y-1 border border-white/5">
              <p className="text-green-400">PMMA：V ≈ 55.2（色散较小）</p>
              <p className="text-blue-400">PC：  V ≈ 30.0（色散较大，彩色边缘明显）</p>
            </div>
          </div>
          {/* Dispersion GIF - 来自 Wikipedia 的标准色散示意图 */}
          <div className="flex flex-col items-center">
            <img
              src="/Light_dispersion_conceptual_waves.gif"
              alt="光通过三棱镜的色散现象"
              className="w-full max-w-[280px] rounded-lg"
            />
            <p className="text-[10px] text-gray-500 mt-2 text-center">
              白光经棱镜色散：波长越短（紫光）折射率越大，偏折越明显
            </p>
          </div>
        </div>
      </section>
      {/* Volume Scattering - Phase Function */}
      <section className="glass-panel p-8 space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-3"><Sigma className="text-purple-400" /> 体积散射与相函数（Volume Scattering）</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Theory */}
          <div className="space-y-4 text-sm text-gray-300">
            <p>
              <strong className="text-white">体积散射</strong>发生在介质内部，当光遇到微观不均匀性（填料颗粒、气泡、密度起伏）时偏离原传播方向。与表面散射不同，体积散射在传播路径上连续发生。</p>
            <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/10 space-y-3">
              <h4 className="font-bold text-purple-400 text-xs uppercase tracking-widest">Henyey-Greenstein 相函数</h4>
              <p className="text-xs text-gray-400">单参数描述散射角分布，广泛用于光学塑料、生物组织、大气光学：</p>
              <div className="font-mono text-center p-2 bg-black/40 rounded text-purple-300">
                p(cosθ) = (1-g²) / [2(1+g²-2g·cosθ)^(3/2)]
              </div>
              <p className="text-xs text-gray-400">g：各向异性因子（-1~1）。g&gt;0前向散射（车灯PC/PMMA典型值0.7-0.9）</p>
            </div>
            <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/10 space-y-3">
              <h4 className="font-bold text-indigo-400 text-xs uppercase tracking-widest">Cornette-Shanks 双参数相函数</h4>
              <p className="text-xs text-gray-400">改进HG函数，更好描述同时具有前向和后向峰值的散射（如冰晶、特定填料塑料）：</p>
              <div className="font-mono text-xs text-center p-2 bg-black/40 rounded text-indigo-300 leading-relaxed">
                p(cosθ) = 3/(2+α) · (1+cos²θ)/(1+α·cosθ)^(3/2)
              </div>
              <p className="text-[10px] text-gray-500">α控制各向异性，第二项(1+cos²θ)引入前后向不对称修正</p>
            </div>
            <div className="p-3 bg-black/40 rounded font-mono text-xs space-y-1 border border-white/5">
              <p className="text-green-400">各向同性散射：g = 0</p>
              <p className="text-blue-400">PC/PMMA颗粒填料：g ≈ 0.75-0.95</p>
              <p className="text-yellow-400">强前向散射（大颗粒）：g → 0.99</p>
            </div>
          </div>

          {/* Right: Interactive Phase Function Visualizer */}
          <div className="space-y-3">
            <p className="text-xs text-gray-500">👆 交互式相函数可视化 — 拖动滑块观察g值对散射方向的影响</p>
            <PhaseFunctionVisualizer />
          </div>
        </div>

        {/* Applications */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-purple-500 rounded-full" />
            车灯光学应用
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 space-y-2">
              <h4 className="font-bold text-purple-400 text-xs uppercase">雾度材料调控</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                通过添加TiO₂等散射填料，精确控制光扩散板的雾度（haze）和透射率。g值决定光在材料内部的"随机行走"路径，影响出光均匀性。
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 space-y-2">
              <h4 className="bold text-indigo-400 text-xs uppercase">仿真软件实现</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                ASAP、LightTools、Speos等光学仿真软件中，体积散射通过HG或双参数相函数定义。输入μs（散射系数）和g（各向异性因子）即可建模散射体。
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/5 space-y-2">
              <h4 className="font-bold text-blue-400 text-xs uppercase">散射损耗评估</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                PC/PMMA中的微小气泡或杂质造成体积散射，使部分光线偏离设计方向成为杂散光。通过测量BSDF反推材料的g值和散射系数。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
