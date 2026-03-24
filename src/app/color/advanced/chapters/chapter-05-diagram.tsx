import ChapterCard from "@/components/chapter/ChapterCard";
import CIE1931Explorer from "@/components/CIE1931Explorer";

export function Chapter05Diagram() {
  return (
    <ChapterCard
      chapterNumber={5}
      title="读懂色品图"
      subtitle="CIE 1931 xy 色度图的全面解析"
      cieRef="CIE 15:2004 Section 6.4"
      difficulty="intermediate"
      estimatedTime={12}
      interactive={<CIE1931Explorer />}
      mathDetail={
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-bold text-primary-400 mb-2">色品坐标的几何意义</h4>
            <p className="text-gray-400 mb-2">
              在 xy 色品图中，任意颜色点的位置由其色品坐标 (x, y) 唯一确定。
              两点之间的距离可以粗略反映颜色差异，但 CIE 1931 不是 perceptually uniform 的。
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">主波长计算</h4>
            <p className="text-gray-400 mb-2">
              给定色品点 P(x₀, y₀) 和白点 W(xw, yw)，主波长由直线 WP 与光谱轨迹的交点确定：
            </p>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs">
              <p>直线方程：(y - yw) = m(x - xw)</p>
              <p>斜率 m = (y₀ - yw) / (x₀ - xw)</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">色纯度（Excitation Purity）</h4>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs">
              <p>pe = (x - xw) / (xs - xw)</p>
              <p className="text-gray-500 mt-1">或</p>
              <p>pe = √[(x-xw)² + (y-yw)²] / √[(xs-xw)² + (ys-yw)²]</p>
            </div>
            <p className="text-gray-400 mt-2">
              其中 (xs, ys) 是光谱轨迹上主波长对应的点。pe = 0 表示白光，pe = 1 表示纯光谱色。
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">混色直线法则</h4>
            <p className="text-gray-400">
              两种颜色混合后的色品点必定位于它们的连线上，位置由混合比例决定：
            </p>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs">
              <p>P = α·P₁ + (1-α)·P₂</p>
              <p className="text-gray-500 mt-1">其中 α = Φ₁ / (Φ₁ + Φ₂)</p>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <p>
          CIE 1931 xy 色品图是色度学中最重要、最常用的可视化工具。这个独特的
          <span className="text-primary-400 font-medium">马蹄形图表</span>包含了人眼可见的所有颜色，
          为工程师和设计师提供了一种直观理解和沟通颜色的方式。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-4 rounded-xl">
            <h4 className="text-primary-400 font-bold mb-2">马蹄形边界</h4>
            <ul className="text-gray-300 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary-400">▸</span>
                <span><strong>曲线部分</strong>是光谱轨迹，标注了对应的主波长（nm）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-400">▸</span>
                <span><strong>底部直线</strong>是紫色线，连接 380nm 和 780nm，代表非光谱的紫红色</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-400">▸</span>
                <span><strong>内部区域</strong>包含所有可能的颜色，越靠近边界饱和度越高</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <h4 className="text-secondary-400 font-bold mb-2">图表上的关键点</h4>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>
                <span className="text-yellow-400 font-mono text-xs">D65 (0.3127, 0.3290)</span>
                <span className="text-gray-400"> — 标准日光光源</span>
              </li>
              <li>
                <span className="text-white font-mono text-xs">E (0.3333, 0.3333)</span>
                <span className="text-gray-400"> — 等能白光</span>
              </li>
              <li>
                <span className="text-green-400 font-mono text-xs">555nm</span>
                <span className="text-gray-400"> — 人眼最敏感的波长</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border-l-4 border-l-purple-500">
          <h4 className="text-purple-400 font-bold mb-2">📍 普朗克轨迹（黑体辐射曲线）</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            图中那条贯穿的 S 形曲线是<span className="italic">普朗克轨迹</span>，表示黑体在不同温度下发出的光的颜色。
          </p>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• <strong>1000-3000K</strong>：暖色调（烛光、白炽灯）</li>
            <li>• <strong>4000-5000K</strong>：中性白（上午日光）</li>
            <li>• <strong>6500K+</strong>：冷色调（正午日光、阴天天空）</li>
          </ul>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-accent-400 font-bold mb-2">sRGB 色域三角形</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            图中虚线勾勒的三角形是标准 sRGB 显示器的色域范围。三个顶点分别是：
          </p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="glass-panel p-2 rounded text-center">
              <p className="text-red-400 font-mono">R (0.64, 0.33)</p>
            </div>
            <div className="glass-panel p-2 rounded text-center">
              <p className="text-green-400 font-mono">G (0.30, 0.60)</p>
            </div>
            <div className="glass-panel p-2 rounded text-center">
              <p className="text-blue-400 font-mono">B (0.15, 0.06)</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-3">
            三角形外的颜色（如高饱和度的绿色区域）无法在标准 sRGB 显示器上准确显示，
            需要广色域显示器才能呈现。
          </p>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-primary-400 font-bold mb-2">如何在色品图上确定颜色属性</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-500/20 border border-primary-500 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-400 text-xs font-bold">1</span>
              </div>
              <div>
                <p className="text-white font-medium">主波长</p>
                <p className="text-gray-400">从白点画直线通过色品点，延长至光谱轨迹，交点的波长即为主波长</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-500/20 border border-primary-500 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-400 text-xs font-bold">2</span>
              </div>
              <div>
                <p className="text-white font-medium">色纯度</p>
                <p className="text-gray-400">色品点到白点的距离与白点到光谱轨迹距离的比值</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-500/20 border border-primary-500 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-400 text-xs font-bold">3</span>
              </div>
              <div>
                <p className="text-white font-medium">互补色</p>
                <p className="text-gray-400">从白点反向延长线与光谱轨迹的交点</p>
              </div>
            </div>
          </div>
        </div>

        <p>
          点击上方的色品图探索器，你可以点击任意位置读取色品坐标，观察其与标准参考点
          （如 D65 白光）的相对位置关系。尝试点击不同区域，感受色品坐标的变化规律。
        </p>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-primary-400 font-bold mb-2">🚗 车灯设计中的应用</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            在车灯设计中，色品图用于验证光源是否符合法规要求。ECE 和 SAE 标准都定义了
            信号灯的色品区域边界坐标。例如，红色制动灯的 x 坐标必须 ≤ 0.700，
            黄色转向灯的 y 坐标必须在 0.390 到 0.410 之间。
          </p>
        </div>
      </div>
    </ChapterCard>
  );
}
