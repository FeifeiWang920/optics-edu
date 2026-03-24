import ChapterCard from "@/components/chapter/ChapterCard";
import ColorMixer from "@/components/ColorMixer";

export function Chapter03Matching() {
  return (
    <ChapterCard
      chapterNumber={3}
      title="颜色匹配实验"
      subtitle="格拉斯曼定律与加色混合"
      feynmanRef="费曼物理学讲义 35-2"
      difficulty="intermediate"
      estimatedTime={10}
      interactive={<ColorMixer />}
      mathDetail={
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-bold text-primary-400 mb-2">格拉斯曼第一定律（同一律）</h4>
            <p className="text-gray-400">
              如果两种颜色产生相同的视觉感觉，则它们在颜色匹配实验中是等价的：
            </p>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs mt-2">
              A ≡ B 当且仅当它们产生相同的视觉响应
            </div>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">格拉斯曼第二定律（加法定律）</h4>
            <p className="text-gray-400">
              颜色匹配关系在加色混合下保持不变：
            </p>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs mt-2">
              若 A ≡ B，则 A + C ≡ B + C
            </div>
            <p className="text-gray-400 mt-2">
              这意味着如果两种颜色匹配，向它们各自添加相同的第三种颜色后，
              新的混合色仍然匹配。
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">格拉斯曼第三定律（数乘定律）</h4>
            <p className="text-gray-400">
              颜色匹配关系在强度缩放时保持不变：
            </p>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs mt-2">
              若 A ≡ B，则 αA ≡ αB（α &gt; 0）
            </div>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">三原色原理</h4>
            <p className="text-gray-400 mb-2">
              任何颜色 C 都可以用三个独立的原色 R、G、B 的线性组合来表示：
            </p>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs">
              C = rR + gG + bB
            </div>
            <p className="text-gray-400 mt-2">
              其中 r、g、b 称为三刺激值。某些高饱和度颜色可能需要{'"负"'}的原色值，
              这意味着需要将原色添加到待匹配色一侧才能实现匹配。
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <p className="text-gray-300 text-sm leading-relaxed">
              1850 年代，德国物理学家赫尔曼·冯·赫尔姆霍兹通过系统的颜色匹配实验，
              验证了托马斯·杨的三色视觉理论。实验装置被称为<span className="text-primary-400 font-medium">颜色匹配仪</span>，
              受试者通过调节三种原色光的强度来匹配测试颜色。
            </p>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-primary-400 font-bold mb-2">实验原理</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            将一束光分成两半：一半是待匹配的测试色，另一半是三种原色光（通常是红、绿、蓝）
            的混合。受试者调节原色光的强度，直到两半看起来完全相同。
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="glass-panel p-3 rounded-lg">
              <p className="text-gray-400 mb-1">测试半圆</p>
              <p className="text-white font-medium">目标颜色</p>
            </div>
            <div className="glass-panel p-3 rounded-lg">
              <p className="text-gray-400 mb-1">匹配半圆</p>
              <p className="text-white font-medium">R + G + B 混合</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border-l-4 border-l-purple-500">
          <h4 className="text-purple-400 font-bold mb-2">🎨 负值的出现</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            实验中发现，对于某些高饱和度的光谱色，仅靠调节 R、G、B 的强度无法实现匹配。
            解决方法是将一种原色（通常是红色）<span className="italic">添加到测试色一侧</span>，
            相当于使用{'"负"'}的该原色值。这一发现直接导致了 CIE XYZ 色度系统的建立。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-4 rounded-xl">
            <h4 className="text-accent-400 font-bold mb-2">加色混合 vs 减色混合</h4>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-white font-medium">加色混合（光）</p>
                <p className="text-gray-400 text-xs">R + G + B = 白光</p>
                <p className="text-gray-400 text-xs">用于显示器、投影仪</p>
              </div>
              <div className="border-t border-white/10 pt-2">
                <p className="text-white font-medium">减色混合（颜料）</p>
                <p className="text-gray-400 text-xs">C + M + Y ≈ 黑色</p>
                <p className="text-gray-400 text-xs">用于印刷、绘画</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <h4 className="text-secondary-400 font-bold mb-2">为什么是三种原色？</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              因为人眼只有三种视锥细胞！理论上，任何三种线性独立的颜色都可以作为原色，
              但红、绿、蓝是最常用的选择，因为它们能覆盖较大的色域范围。
            </p>
          </div>
        </div>

        <p>
          在上面的交互组件中，你可以尝试调节 R、G、B 滑块的强度来匹配目标颜色。
          当颜色距离小于 25 时，表示匹配成功。这模拟了经典的颜色匹配实验。
        </p>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-primary-400 font-bold mb-2">🚗 车灯设计中的应用</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            颜色匹配原理广泛应用于车灯的颜色质量控制。生产线上使用分光光度计测量
            灯罩和光源的光谱特性，确保符合 CIE 定义的信号颜色容差范围。
            例如，转向灯的橙色必须落在 CIE 色品图上定义的特定区域内。
          </p>
        </div>
      </div>
    </ChapterCard>
  );
}
