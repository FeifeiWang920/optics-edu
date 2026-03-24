import CIE1931Explorer from "@/lib/cie-1931";
import ColorMixer from "@/components/ColorMixer";
import BlackbodySlider from "@/components/BlackbodySlider";
import { Palette, Layers, Box, Info, FlaskConical, SunMedium } from "lucide-react";

export default function ColorimetryPage() {
  return (
    <div className="space-y-16">
      <section className="space-y-4">
        <h1 className="text-5xl font-bold text-gradient">色度学</h1>
        <p className="text-gray-400 text-lg max-w-3xl">
          颜色并不是物理现实，而是<strong>材料光学特性 + 人眼响应 + 大脑解释</strong>三者共同作用的结果。色度学（Colorimetry）提供了一套定量描述和测量颜色的科学方法，是车灯光色合规检验的理论基础。
        </p>
      </section>

      {/* What is color */}
      <section className="glass-panel p-10 space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-3"><Info className="text-primary-500" /> 颜色是什么？</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          {[
            { step: "01", title: "物理：光谱功率分布", desc: "光源或物体反射的光，在不同波长上的能量分布（SPD，Spectral Power Distribution）。这是客观存在的物理量。", color: "border-t-primary-500" },
            { step: "02", title: "生理：视锥细胞响应", desc: "L、M、S三种视锥细胞对不同波长的光分别产生响应，将光谱信息转换为三组电信号（三刺激值 X、Y、Z）。", color: "border-t-secondary-500" },
            { step: "03", title: "心理：大脑解释", desc: "大脑对三种细胞信号进行对比分析，最终生成主观的颜色感知。同一个颜色，在不同背景、光源和心理状态下可能产生截然不同的感知。", color: "border-t-accent-500" },
          ].map((s) => (
            <div key={s.step} className={`p-5 bg-white/5 rounded-xl border-t-4 ${s.color} space-y-3`}>
              <span className="text-3xl font-black text-white/10">{s.step}</span>
              <h4 className="font-bold text-white">{s.title}</h4>
              <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        {/* Color perception chain */}
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
          <span className="px-3 py-1 bg-white/5 rounded-full">光源/物体</span>
          <span>→</span>
          <span className="px-3 py-1 bg-white/5 rounded-full">光谱功率分布 SPD</span>
          <span>→</span>
          <span className="px-3 py-1 bg-white/5 rounded-full">视锥细胞 LMS</span>
          <span>→</span>
          <span className="px-3 py-1 bg-white/5 rounded-full">大脑处理</span>
          <span>→</span>
          <span className="px-3 py-1 bg-primary-500/20 border border-primary-500/30 rounded-full text-primary-300">颜色感知</span>
        </div>
      </section>

      {/* Color Matching and Trichromatic Theory */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">三色学说与颜色匹配实验</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-5 text-sm text-gray-300 leading-relaxed">
            <p>
              1807年，托马斯·杨（T.Young）提出三色学说，后由赫尔姆霍兹完善。核心观点：人眼存在三种感色细胞（LMS视锥），任何颜色都可以由<strong>红（R）、绿（G）、蓝（B）</strong>三种原色的适当比例混合匹配。
            </p>
            <div className="p-4 bg-black/40 rounded-xl font-mono text-xs border border-white/5 space-y-2 text-gray-300">
              <p className="text-gray-500">// 颜色匹配方程</p>
              <p>C ≡ R·[R] + G·[G] + B·[B]</p>
              <p className="text-xs text-gray-500">R、G、B 为三刺激值，表示三种原色所需的量</p>
            </div>
            <div className="p-4 bg-primary-500/5 rounded-xl border border-primary-500/10 space-y-3">
              <h4 className="font-bold text-white">阶段学说（现代共识）</h4>
              <ol className="text-xs text-gray-400 space-y-1 list-decimal list-inside">
                <li><strong className="text-white">视网膜层（LMS）：</strong>视锥细胞分别响应长、中、短波，产生 LMS 信号</li>
                <li><strong className="text-white">神经层（对抗色）：</strong>信号重组为 亮度–暗度、红–绿、黄–蓝三对对抗信号</li>
                <li><strong className="text-white">大脑层（感知）：</strong>最终产生主观颜色印象</li>
              </ol>
            </div>
          </div>
          <ColorMixer />
        </div>
      </section>

      {/* CIE 1931 System */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">CIE 1931 标准色度学系统</h2>
        <div className="text-sm text-gray-400 max-w-3xl space-y-3">
          <p>由于 RGB 实验中某些颜色需要"负值"（难以理解和使用），1931年国际照明委员会（CIE）引入了三个<strong>虚拟原色 X、Y、Z</strong>，使任何可见颜色的三刺激值均为正数。</p>
          <p>进一步，令 x = X/(X+Y+Z), y = Y/(X+Y+Z)，将颜色信息提取为仅与色调和饱和度相关的<strong>色品坐标 (x, y)</strong>，即可绘制 CIE 1931 色品图。</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="text-xs text-gray-500 mb-3">👆 点击图表探索不同色品坐标位置</p>
            <CIE1931Explorer />
          </div>
          <div className="glass-panel p-8 space-y-5">
            <h3 className="text-lg font-bold text-white">读懂色品图</h3>
            <div className="space-y-4 text-xs text-gray-400">
              <div className="p-3 bg-white/5 rounded-lg space-y-1">
                <h5 className="font-bold text-white">马蹄形边缘（光谱轨迹）</h5>
                <p>代表纯单色光（饱和度最高的颜色），从380nm紫色到780nm红色。</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg space-y-1">
                <h5 className="font-bold text-white">等能白光点（E点）</h5>
                <p>x = y ≈ 0.333，代表各波长能量均等的白光。</p>
              </div>
              <div className="p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/10 space-y-1">
                <h5 className="font-bold text-yellow-400">🚗 车灯法规应用</h5>
                <p>ECE法规为每类车灯（制动灯、转向灯等）在色品图上规定了一个<strong>合规色度区域</strong>，灯具颜色必须落在区域内才能通过检验。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Temperature */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-3"><SunMedium className="text-yellow-400" /> 色温 (Color Temperature)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-5 text-sm text-gray-300 leading-relaxed">
            <p>
              加热一块黑色不透明的物体（黑体），随着温度升高，它会依次发出红→橙→黄→白→蓝白色的光。当某光源发出的光颜色与<strong>黑体在某温度时的颜色相同</strong>，则称该温度为此光源的<strong>色温</strong>。
            </p>
            <div className="p-4 bg-black/40 rounded-xl space-y-3 border border-white/5">
              <h4 className="font-bold text-white text-xs uppercase tracking-widest">常见光源色温对照</h4>
              {[
                { kelvin: "1800K", label: "蜡烛光", color: "#ff6a00" },
                { kelvin: "2700K", label: "白炽灯", color: "#ff8c00" },
                { kelvin: "3000K", label: "卤素灯（车用标准）", color: "#ffa500" },
                { kelvin: "4000K", label: "荧光灯", color: "#ffd1a3" },
                { kelvin: "6000K", label: "氙气灯/LED车灯", color: "#ffffff" },
                { kelvin: "8000K", label: "晴天蓝天光", color: "#c6d9ff" },
              ].map(({ kelvin, label, color }) => (
                <div key={kelvin} className="flex items-center gap-3 text-xs">
                  <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <span className="font-mono text-gray-400 w-14 shrink-0">{kelvin}</span>
                  <span className="text-gray-500">{label}</span>
                </div>
              ))}
            </div>
            <div className="p-3 bg-blue-500/5 rounded border border-blue-500/10 text-xs text-gray-400">
              <strong className="text-blue-300">相关色温（CCT）：</strong>对于光谱不完全符合黑体辐射的光源（如 LED），使用"相关色温"描述其感知颜色。在普朗克轨迹附近，同一 CCT 值可能对应多个不同色品坐标（用同色异谱描述这种差异）。
            </div>
          </div>
          <BlackbodySlider />
        </div>
      </section>

      {/* Color difference and Metamerism */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold">高级概念</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 space-y-4">
            <Layers className="text-accent-400" size={28} />
            <h4 className="text-lg font-bold">同色异谱（Metamerism）</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              光谱功率分布（SPD）完全不同的两种光，当其与人眼 LMS 视锥的响应积分结果相同时，看起来颜色相同。这种现象称为<strong>同色异谱</strong>。
            </p>
            <p className="text-xs text-gray-500 italic">举例：某红色油漆在白炽灯下与另一红色相同，但在LED下颜色差异明显。车灯测试必须规定标准光源，就是因为这个原因。</p>
          </div>
          <div className="glass-panel p-6 space-y-4">
            <Box className="text-primary-400" size={28} />
            <h4 className="text-lg font-bold">均匀色空间（L*a*b*）</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              CIE 1931 xy 色品图并不均匀——图上相同距离的两点，人眼感知到的颜色差异可能大相径庭。
            </p>
            <p className="text-sm text-gray-400">1976年，CIE 定义了 <strong>L*a*b*（CIELAB）</strong> 色空间，使得欧氏距离与视觉颜色差异高度一致，公式：
            </p>
            <div className="font-mono text-primary-300 text-sm text-center p-2 bg-black/40 rounded">ΔE* = √(ΔL*² + Δa*² + Δb*²)</div>
            <p className="text-[11px] text-gray-500">ΔE* &lt; 1：人眼通常无法分辨；ΔE* &gt; 3：明显色差</p>
          </div>
          <div className="glass-panel p-6 space-y-4">
            <Palette className="text-purple-400" size={28} />
            <h4 className="text-lg font-bold">颜色的三个基本属性</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="p-3 bg-white/5 rounded-lg space-y-1">
                <h5 className="font-bold text-white text-xs">色调（Hue）</h5>
                <p className="text-xs">光谱中不同波长对应的基本颜色（红、橙、黄...），由主波长决定。</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg space-y-1">
                <h5 className="font-bold text-white text-xs">饱和度（Saturation）</h5>
                <p className="text-xs">颜色的纯度。纯色（单色光）饱和度最高；混入越多白色越不饱和。</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg space-y-1">
                <h5 className="font-bold text-white text-xs">明度（Brightness/Lightness）</h5>
                <p className="text-xs">颜色的亮暗程度。三属性中只要有一个不同，颜色感知就会不同。</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
