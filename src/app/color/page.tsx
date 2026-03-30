import Link from "next/link";
import CIE1931Explorer from "@/lib/cie-1931";
import ColorMixer from "@/components/ColorMixer";
import BlackbodySlider from "@/components/BlackbodySlider";
import { Palette, Layers, Box, Info, SunMedium, GraduationCap, ArrowRight, Scale, Target, Eye, CircleDot } from "lucide-react";

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

      {/* Deep Learning Entry */}
      <section className="glass-panel p-8 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <GraduationCap className="text-primary-400" />
              深入学习色度学
            </h2>
            <p className="text-gray-400 text-sm max-w-xl">
              从费曼物理学讲义到CIE国际标准，系统学习色度学的完整知识体系。
              包含8个章节，从入门到提高。
            </p>
          </div>
          <Link
            href="/color/advanced"
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium flex items-center gap-2 transition-colors shrink-0"
          >
            进入深度解析
            <ArrowRight size={18} />
          </Link>
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
              {/* 颜色匹配方程 */}
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
          <p>由于 RGB 实验中某些颜色需要{'"负值"'}（难以理解和使用），1931年国际照明委员会（CIE）引入了三个<strong>虚拟原色 X、Y、Z</strong>，使任何可见颜色的三刺激值均为正数。</p>
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
              <strong className="text-blue-300">相关色温（CCT）：</strong>对于光谱不完全符合黑体辐射的光源（如 LED），使用{'"相关色温"'}描述其感知颜色。在普朗克轨迹附近，同一 CCT 值可能对应多个不同色品坐标（用同色异谱描述这种差异）。
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

      {/* Color Difference Terminology */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center gap-3"><Scale className="text-secondary-400" /> 色差术语体系</h2>
        <p className="text-gray-400 text-sm max-w-3xl">
          在色度学和颜色工程领域，描述"颜色差异"有多种术语。它们在定义、计算方法和应用场景上各不相同，理解这些差异对准确表达颜色质量要求至关重要。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 色差 */}
          <div className="glass-panel p-5 space-y-3 border-l-4 border-l-primary-500">
            <div className="flex items-center gap-2">
              <Scale className="text-primary-400" size={20} />
              <h4 className="font-bold text-white">色差 (Color Difference)</h4>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              两种颜色之间的<strong>客观数学距离</strong>。常用计算公式包括 ΔE*ab (CIE 1976)、ΔE*cmc、ΔE*94、CIEDE2000 等。
            </p>
            <div className="p-2 bg-black/30 rounded text-xs font-mono text-primary-300">
              ΔE* = √((ΔL*)² + (Δa*)² + (Δb*)²)
            </div>
            <p className="text-[11px] text-gray-500">
              应用场景：颜色质量控制、批次一致性检验
            </p>
          </div>

          {/* 色容差 */}
          <div className="glass-panel p-5 space-y-3 border-l-4 border-l-secondary-500">
            <div className="flex items-center gap-2">
              <Target className="text-secondary-400" size={20} />
              <h4 className="font-bold text-white">色容差 (Color Tolerance)</h4>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              产品规格或法规规定的<strong>最大允许色差</strong>。是一个"通过/不通过"的判定阈值。
            </p>
            <div className="p-2 bg-secondary-500/10 rounded text-xs text-secondary-300">
              例：ECE法规规定制动灯红色容差为特定色度区域边界
            </div>
            <p className="text-[11px] text-gray-500">
              应用场景：法规合规检验、产品规格书
            </p>
          </div>

          {/* 颜色宽容量 */}
          <div className="glass-panel p-5 space-y-3 border-l-4 border-l-accent-500">
            <div className="flex items-center gap-2">
              <Eye className="text-accent-400" size={20} />
              <h4 className="font-bold text-white">颜色宽容量 (Matching Tolerance)</h4>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              人眼<strong>无法察觉差异</strong>的颜色变化范围。基于 MacAdam 椭圆实验，描述人眼感知阈值。
            </p>
            <div className="p-2 bg-accent-500/10 rounded text-xs text-accent-300">
              约1个 MacAdam 椭圆单位（标准观察者条件下）
            </div>
            <p className="text-[11px] text-gray-500">
              应用场景：视觉评估、容差标准制定依据
            </p>
          </div>

          {/* JND */}
          <div className="glass-panel p-5 space-y-3 border-l-4 border-l-green-500">
            <div className="flex items-center gap-2">
              <CircleDot className="text-green-400" size={20} />
              <h4 className="font-bold text-white">恰可察觉差异 (JND)</h4>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              <strong>Just Noticeable Difference</strong>，人眼能够分辨的最小颜色差异。在均匀色空间中约等于1个色差单位。
            </p>
            <div className="p-2 bg-green-500/10 rounded text-xs text-green-300">
              1 JND ≈ 1 ΔE*ab（近似值，实际因色区而异）
            </div>
            <p className="text-[11px] text-gray-500">
              应用场景：显示设备校准、视觉感知研究
            </p>
          </div>

          {/* 色差椭圆 */}
          <div className="glass-panel p-5 space-y-3 border-l-4 border-l-purple-500">
            <div className="flex items-center gap-2">
              <Box className="text-purple-400" size={20} />
              <h4 className="font-bold text-white">色差椭圆 (Color Ellipse)</h4>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              MacAdam 实验得到的<strong>颜色匹配误差分布</strong>，用椭圆描述人眼在不同色区的敏感度差异。
            </p>
            <div className="p-2 bg-purple-500/10 rounded text-xs text-purple-300">
              绿色区域椭圆小（敏感），蓝色区域椭圆大（迟钝）
            </div>
            <p className="text-[11px] text-gray-500">
              应用场景：均匀色空间设计基础
            </p>
          </div>

          {/* 感知色差 */}
          <div className="glass-panel p-5 space-y-3 border-l-4 border-l-yellow-500">
            <div className="flex items-center gap-2">
              <Palette className="text-yellow-400" size={20} />
              <h4 className="font-bold text-white">感知色差 (Perceptual ΔE)</h4>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              考虑人眼<strong>非均匀感知特性</strong>的色差计算，如 CIEDE2000，比简单的欧氏距离更准确。
            </p>
            <div className="p-2 bg-yellow-500/10 rounded text-xs text-yellow-300">
              ΔE*cmc、CIEDE2000 等先进公式
            </div>
            <p className="text-[11px] text-gray-500">
              应用场景：高精度颜色匹配、学术研究
            </p>
          </div>
        </div>

        {/* Summary Table */}
        <div className="glass-panel p-6 overflow-x-auto">
          <h4 className="font-bold text-white mb-4">术语对比总览</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-white/10">
                <th className="pb-3 text-gray-400 font-medium">术语</th>
                <th className="pb-3 text-gray-400 font-medium">本质</th>
                <th className="pb-3 text-gray-400 font-medium">量化方式</th>
                <th className="pb-3 text-gray-400 font-medium">典型数值</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-white/5">
                <td className="py-3 font-medium text-primary-400">色差</td>
                <td className="py-3">客观距离</td>
                <td className="py-3">ΔE*ab, CIEDE2000</td>
                <td className="py-3">0.5 ~ 10+</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 font-medium text-secondary-400">色容差</td>
                <td className="py-3">规格限制</td>
                <td className="py-3">法规区域边界</td>
                <td className="py-3">依产品而定</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 font-medium text-accent-400">颜色宽容量</td>
                <td className="py-3">感知阈值</td>
                <td className="py-3">MacAdam 椭圆</td>
                <td className="py-3">约 1 个椭圆单位</td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-green-400">JND</td>
                <td className="py-3">最小可辨差</td>
                <td className="py-3">统计阈值 (50%概率)</td>
                <td className="py-3">~1 ΔE*ab</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
