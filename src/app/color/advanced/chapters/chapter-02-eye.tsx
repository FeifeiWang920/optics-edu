import ChapterCard from "@/components/chapter/ChapterCard";
import LMSSensitivityChart from "@/components/colorimetry/LMSSensitivityChart";

export function Chapter02Eye() {
  return (
    <ChapterCard
      chapterNumber={2}
      title="人眼的精密设计"
      subtitle="视网膜与三色视觉系统"
      feynmanRef="费曼物理学讲义 35-4"
      difficulty="intermediate"
      estimatedTime={12}
      interactive={<LMSSensitivityChart />}
      mathDetail={
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-bold text-primary-400 mb-2">三刺激值计算</h4>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs space-y-1">
              <p>X = k ∫ S(λ) x̄(λ) dλ</p>
              <p>Y = k ∫ S(λ) ȳ(λ) dλ</p>
              <p>Z = k ∫ S(λ) z̄(λ) dλ</p>
            </div>
            <p className="mt-2 text-gray-400">
              三刺激值通过对光谱功率分布 S(λ) 与 CIE 标准观察者色匹配函数加权积分得到。
              归一化常数 k 确保完全漫反射体的 Y = 100。
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">LMS 响应模型</h4>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs space-y-1">
              <p>L = ∫ S(λ) l̄(λ) dλ</p>
              <p>M = ∫ S(λ) m̄(λ) dλ</p>
              <p>S = ∫ S(λ) s̄(λ) dλ</p>
            </div>
            <p className="mt-2 text-gray-400">
              L、M、S 分别代表长波、中波、短波视锥细胞的响应。大脑通过比较三者的
              相对强度来感知颜色，这就是三色视觉理论的基础。
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">光谱光视效率函数 V(λ)</h4>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs">
              V(λ) ≈ ȳ(λ) （CIE 1931 标准观察者）
            </div>
            <p className="mt-2 text-gray-400">
              明视觉条件下，人眼对 555nm 绿光最敏感，此时 V(λ) = 1.0。
              最大光谱光视效能 Kₘ = 683 lm/W。
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <p>
          人眼是一台精密的光学仪器。光线穿过角膜、瞳孔、晶状体，最终聚焦在视网膜上。
          视网膜上的<span className="text-primary-400 font-medium">视锥细胞</span>和
          <span className="text-primary-400 font-medium">视杆细胞</span>将光信号转换为神经信号，
          传递给大脑进行处理。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-4 rounded-xl">
            <h4 className="text-primary-400 font-bold mb-2">三种视锥细胞</h4>
            <ul className="text-gray-300 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-mono text-xs mt-0.5">L 型</span>
                <span>对长波敏感，峰值约 <strong>560nm</strong>（红黄色），约占 64%</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-mono text-xs mt-0.5">M 型</span>
                <span>对中波敏感，峰值约 <strong>530nm</strong>（绿色），约占 32%</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-mono text-xs mt-0.5">S 型</span>
                <span>对短波敏感，峰值约 <strong>420nm</strong>（蓝紫色），约占 2%</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <h4 className="text-secondary-400 font-bold mb-2">视杆细胞</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              视杆细胞对弱光极其敏感，峰值灵敏度在 <strong>498nm</strong>（蓝绿色）。
              它们负责暗视觉（scotopic vision），但无法区分颜色。
              这就是为什么在昏暗环境中我们看到的世界几乎是黑白的。
            </p>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border-l-4 border-l-blue-500">
          <h4 className="text-blue-400 font-bold mb-2">👁️ 颜色感知的本质</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            颜色不是物理世界的固有属性，而是大脑对视网膜信号的<span className="italic">解释</span>。
            当 L 视锥被强烈激发而 M、S 视锥激发较弱时，大脑{'"创造"'}出红色的感觉。
            不同物种的视锥细胞类型和数量不同，因此它们{'"看到"'}的颜色世界也截然不同。
          </p>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-accent-400 font-bold mb-2">光谱响应曲线的意义</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            上图展示了 Stockman & Sharpe (2000) 测定的 10° 标准观察者的 LMS 光谱响应曲线。
            这些曲线描述了人眼三种视锥细胞对不同波长光的相对敏感度。
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            <strong>关键观察：</strong>三条曲线有大面积重叠，这意味着大多数波长会同时激发
            多种视锥细胞。大脑通过比较它们的<span className="italic">相对响应比例</span>来判断颜色，
            这就是三色视觉的核心机制。
          </p>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-primary-400 font-bold mb-2">🚗 车灯设计中的应用</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            了解人眼的光谱响应对于设计高效、安全的车灯至关重要。
            例如，人眼对黄绿光区域最敏感，这就是为什么雾灯通常采用黄色光源——
            在雨雾天气中能获得更好的可见度。同时，避免过量的蓝光可以减少眩光
            和对向驾驶员的不适感。
          </p>
        </div>
      </div>
    </ChapterCard>
  );
}
