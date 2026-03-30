import ChapterCard from "@/components/chapter/ChapterCard";
import MacAdamEllipses from "@/components/colorimetry/MacAdamEllipses";
import ColorDifferenceCalculator from "@/components/colorimetry/ColorDifferenceCalculator";

export function Chapter06DeltaE() {
  return (
    <ChapterCard
      chapterNumber={6}
      title="均匀色空间与色差"
      subtitle="从 CIE 1976 到 CIEDE2000"
      cieRef="CIE 15:2004 Section 7"
      difficulty="advanced"
      estimatedTime={15}
      interactive={
        <div className="space-y-6">
          <MacAdamEllipses />
          <ColorDifferenceCalculator />
        </div>
      }
      mathDetail={
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-bold text-primary-400 mb-2">CIELAB 色空间转换</h4>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs space-y-1">
              <p>L* = 116 × f(Y/Yn) - 16</p>
              <p>a* = 500 × [f(X/Xn) - f(Y/Yn)]</p>
              <p>b* = 200 × [f(Y/Yn) - f(Z/Zn)]</p>
              <p className="text-gray-500 mt-2">f(t) = t^(1/3) 当 t &gt; 0.008856</p>
              <p className="text-gray-500">f(t) = 7.787×t + 16/116 当 t ≤ 0.008856</p>
            </div>
            <p className="text-gray-400 mt-2">
              其中 (Xn, Yn, Zn) 是参考白点的三刺激值（D65: Xn=95.047, Yn=100.000, Zn=108.883）。
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">ΔE*ab (CIE 1976)</h4>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs">
              <p>ΔE*ab = √[(L*₂-L*₁)² + (a*₂-a*₁)² + (b*₂-b*₁)²]</p>
            </div>
            <p className="text-gray-400 mt-2">
              最简单的欧几里得距离公式，但与人眼感知仍有偏差。
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">ΔE*94 (CIE 1994)</h4>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs space-y-1">
              <p>ΔL* = L*₂ - L*₁</p>
              <p>ΔC*ab = C*ab,₂ - C*ab,₁</p>
              <p>ΔH*ab = √[(ΔE*ab)² - (ΔL*)² - (ΔC*ab)²]</p>
              <p className="text-gray-500 mt-1">ΔE*94 = √[(ΔL*/kLSL)² + (ΔC*ab/kCSC)² + (ΔH*ab/kHSH)²]</p>
            </div>
            <p className="text-gray-400 mt-2">
              引入了明度、彩度、色相的加权因子，更适合纺织和涂料行业。
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">ΔE*00 (CIEDE2000)</h4>
            <p className="text-gray-400 mb-2">
              CIEDE2000 是目前最精确的色差公式，包含以下修正：
            </p>
            <ul className="text-gray-400 text-xs space-y-1 ml-4">
              <li>• 彩度依赖的权重函数</li>
              <li>• 色相角依赖的权重函数</li>
              <li>• 彩度-色相交互作用项</li>
              <li>• 蓝色区域的中性色修正</li>
            </ul>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs mt-2">
              <p>ΔE*00 = √[(ΔL{' '}{'/'}kLSL)² + (ΔC{' '}{'/'}kCSC)² + (ΔH{' '}{'/'}kHSH)² + RT(ΔC{' '}{'/'}kCSC)(ΔH{' '}{'/'}kHSH)]</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">色差评级的经验法则</h4>
            <div className="glass-panel p-3 rounded-lg text-xs space-y-1">
              <p><span className="text-emerald-400">ΔE ≤ 1.0</span> — 无法察觉</p>
              <p><span className="text-green-400">ΔE 1.0-2.0</span> — 专业观察者才能察觉</p>
              <p><span className="text-yellow-400">ΔE 2.0-3.0</span> — 普通观察者可以察觉</p>
              <p><span className="text-orange-400">ΔE 3.0-6.0</span> — 明显差异</p>
              <p><span className="text-red-400">ΔE &gt; 6.0</span> — 显著差异</p>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <p>
          在 CIE 1931 xy 色品图中，两点之间的距离并不能准确反映人眼感知的颜色差异。
          为了解决这个问题，CIE 在 1976 年提出了<span className="text-primary-400 font-medium">均匀色空间</span>的概念，
          其中相等的距离对应相等的感知色差。
        </p>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-primary-400 font-bold mb-2">为什么 CIE 1931 不均匀？</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            MacAdam (1942) 通过精密的颜色匹配实验发现，人眼对不同颜色区域的敏感度差异很大：
          </p>
          <ul className="text-gray-300 text-sm space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              <span><strong>蓝色区域</strong>：人眼非常敏感，很小的物理变化就能察觉</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span><strong>绿色区域</strong>：人眼相对不敏感，需要较大变化才能察觉</span>
            </li>
          </ul>
        </div>

        <div className="glass-card p-4 rounded-xl border-l-4 border-l-blue-500">
          <h4 className="text-blue-400 font-bold mb-2">🔵 MacAdam 椭圆</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            上图中的椭圆是<span className="italic">MacAdam 椭圆</span>，表示在 CIE 1931 色品图上
            人眼刚好能察觉颜色差异的区域（1 阶阈值，放大 10 倍显示）。
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            椭圆的大小和方向随位置变化：蓝色区域椭圆小（敏感），绿色区域椭圆大（不敏感）。
            这直观地展示了 CIE 1931 的不均匀性。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-4 rounded-xl">
            <h4 className="text-secondary-400 font-bold mb-2">CIELAB (L*a*b*) 色空间</h4>
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              CIE 1976 L*a*b* 是第一个被广泛接受的均匀色空间：
            </p>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>
                <span className="text-white font-mono text-xs">L*</span>
                <span className="text-gray-400"> — 明度（0=黑，100=白）</span>
              </li>
              <li>
                <span className="text-red-400 font-mono text-xs">a*</span>
                <span className="text-gray-400"> — 红绿轴（正=红，负=绿）</span>
              </li>
              <li>
                <span className="text-yellow-400 font-mono text-xs">b*</span>
                <span className="text-gray-400"> — 黄蓝轴（正=黄，负=蓝）</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <h4 className="text-accent-400 font-bold mb-2">色差公式的演进</h4>
            <div className="space-y-2 text-sm">
              <div className="glass-panel p-2 rounded">
                <p className="text-white font-medium">CIE 1976 (ΔE*ab)</p>
                <p className="text-gray-400 text-xs">简单欧氏距离，仍有约 25% 误差</p>
              </div>
              <div className="glass-panel p-2 rounded">
                <p className="text-white font-medium">CIE 1994 (ΔE*94)</p>
                <p className="text-gray-400 text-xs">引入权重因子，改善明显</p>
              </div>
              <div className="glass-panel p-2 rounded bg-primary-500/10 border border-primary-500/20">
                <p className="text-white font-medium">CIEDE2000 (ΔE*00)</p>
                <p className="text-gray-400 text-xs">当前工业标准，最精确</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-primary-400 font-bold mb-2">🎯 色差计算实战</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            使用上方的色差计算器，你可以：
          </p>
          <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
            <li>选择或输入两种颜色（HEX 或 RGB）</li>
            <li>实时查看它们的 CIELAB 值</li>
            <li>比较三种色差公式的计算结果</li>
            <li>理解不同 ΔE 值的感知意义</li>
          </ol>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-primary-400 font-bold mb-2">🚗 车灯设计中的应用</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            在汽车制造业中，色差控制至关重要。同一辆车的不同部件（如前后保险杠、车身面板、
            外饰件）可能由不同供应商生产，但必须保持颜色一致。行业标准通常要求：
          </p>
          <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
            <div className="glass-panel p-3 rounded">
              <p className="text-gray-400">外观件容差</p>
              <p className="text-white font-bold">ΔE*00 &lt; 1.0</p>
            </div>
            <div className="glass-panel p-3 rounded">
              <p className="text-gray-400">信号灯容差</p>
              <p className="text-white font-bold">ΔE*00 &lt; 2.0</p>
            </div>
          </div>
        </div>
      </div>
    </ChapterCard>
  );
}
