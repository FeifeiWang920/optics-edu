import ChapterCard from "@/components/chapter/ChapterCard";
import ColorMatchingCurves from "@/components/colorimetry/ColorMatchingCurves";
import CIE1931Explorer from "@/components/CIE1931Explorer";

export function Chapter04CIE1931() {
  return (
    <ChapterCard
      chapterNumber={4}
      title="CIE 1931 标准系统"
      subtitle="国际照明委员会的色度学基石"
      cieRef="CIE 15:2004"
      difficulty="advanced"
      estimatedTime={15}
      interactive={
        <div className="space-y-6">
          <ColorMatchingCurves />
          <CIE1931Explorer />
        </div>
      }
      mathDetail={
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-bold text-primary-400 mb-2">CIE XYZ 三刺激值计算</h4>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs space-y-1">
              <p>X = k ∫ S(λ) x̄(λ) dλ</p>
              <p>Y = k ∫ S(λ) ȳ(λ) dλ</p>
              <p>Z = k ∫ S(λ) z̄(λ) dλ</p>
              <p className="text-gray-500 mt-2">k = 100 / ∫ S(λ) ȳ(λ) dλ（归一化常数）</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">色品坐标转换</h4>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs space-y-1">
              <p>x = X / (X + Y + Z)</p>
              <p>y = Y / (X + Y + Z)</p>
              <p>z = Z / (X + Y + Z) = 1 - x - y</p>
            </div>
            <p className="text-gray-400 mt-2">
              色品坐标 (x, y) 消除了亮度信息，仅表示颜色的色相和饱和度。
              这就是 CIE 1931 色品图的基础。
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">XYZ 到 RGB 的转换矩阵</h4>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs">
              <p>[R]   [ 3.2405 -1.5370 -0.4985] [X]</p>
              <p>[G] = [-0.9690  1.8759  0.0416] [Y]</p>
              <p>[B]   [ 0.0556 -0.2040  1.0572] [Z]</p>
            </div>
            <p className="text-gray-400 mt-2">
              这是 CIE XYZ 到 sRGB 的标准转换矩阵（D65 白点）。
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">主波长与互补色</h4>
            <p className="text-gray-400">
              从白点（如 D65）通过色品点画直线，与光谱轨迹的交点即为该颜色的
              <strong>主波长（Dominant Wavelength）</strong>。反向延长线与光谱轨迹的
              交点则是<strong>互补色波长</strong>。
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <p>
          1931 年，国际照明委员会（CIE, Commission Internationale de l'Éclairage）在剑桥召开的历史性会议上，
          基于 Wright 和 Guild 的颜色匹配实验数据，正式确立了<span className="text-primary-400 font-medium">CIE 1931 XYZ 色度系统</span>。
          这一系统至今仍是色度学的基石。
        </p>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-primary-400 font-bold mb-2">为什么需要 XYZ 系统？</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            在 CIE 1931 之前，颜色匹配实验使用实际的红、绿、蓝原色。但问题在于：
          </p>
          <ul className="text-gray-300 text-sm space-y-2 mb-3">
            <li className="flex items-start gap-2">
              <span className="text-red-400">•</span>
              <span>某些高饱和度颜色无法用正的 RGB 值表示，需要"负"原色</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">•</span>
              <span>不同实验者使用的原色波长不同，结果难以比较</span>
            </li>
          </ul>
          <p className="text-gray-300 text-sm leading-relaxed">
            CIE 的解决方案是定义三个<span className="italic">假想的</span>原色 X、Y、Z，
            它们经过精心设计，使得所有可见颜色都能用正的三刺激值表示。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-4 rounded-xl">
            <h4 className="text-secondary-400 font-bold mb-2">X、Y、Z 的物理意义</h4>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>
                <span className="text-red-400 font-mono text-xs">X</span>
                <span className="text-gray-400"> — 大致对应红原色响应</span>
              </li>
              <li>
                <span className="text-green-400 font-mono text-xs">Y</span>
                <span className="text-gray-400"> — 精确等于亮度响应（与 V(λ) 一致）</span>
              </li>
              <li>
                <span className="text-blue-400 font-mono text-xs">Z</span>
                <span className="text-gray-400"> — 大致对应蓝原色响应</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <h4 className="text-accent-400 font-bold mb-2">2° 与 10° 标准观察者</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              CIE 1931 定义的是 2° 视场标准观察者（小视野）。1964 年，CIE 补充了
              10° 标准观察者（大视野），因为视网膜上视锥细胞的分布密度随视角变化。
              车灯测试通常使用 10° 标准，因为它更接近实际驾驶时的观察条件。
            </p>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border-l-4 border-l-blue-500">
          <h4 className="text-blue-400 font-bold mb-2">📊 色匹配函数曲线解读</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            上图中的三条曲线是 CIE 1931 2° 标准观察者的色匹配函数 x̄(λ)、ȳ(λ)、z̄(λ)。
          </p>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• <span className="text-green-400 font-mono">ȳ(λ)</span> 与人眼光谱光视效率 V(λ) 完全一致</li>
            <li>• <span className="text-red-400 font-mono">x̄(λ)</span> 在长波区有最大响应</li>
            <li>• <span className="text-blue-400 font-mono">z̄(λ)</span> 主要在短波区有响应</li>
          </ul>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-primary-400 font-bold mb-2">🔬 实验数据的来源</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            CIE 1931 标准基于两项独立但结果一致的颜色匹配实验：
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="glass-panel p-3 rounded-lg">
              <p className="text-white font-medium">Wright (1928-29)</p>
              <p className="text-gray-400">10 名观察者，使用 650nm(R)、530nm(G)、460nm(B) 原色</p>
            </div>
            <div className="glass-panel p-3 rounded-lg">
              <p className="text-white font-medium">Guild (1931)</p>
              <p className="text-gray-400">7 名观察者，使用类似的原色设置</p>
            </div>
          </div>
        </div>

        <p>
          下方的 CIE 1931 色品图探索器展示了完整的 xy 色度空间。点击图表可以读取任意点的
          色品坐标，并观察其在 sRGB 色域内外的位置关系。马蹄形边界是光谱轨迹，
          连接两端的直线是紫色线（非光谱色）。
        </p>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-primary-400 font-bold mb-2">🚗 车灯设计中的应用</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            CIE 1931 系统是现代车灯颜色标准的基础。ECE R48、FMVSS 108 等法规都使用
            CIE 色品坐标定义信号灯（转向、制动、后位灯）的颜色容差区域。
            例如，汽车制动灯的红色必须落在 CIE 色品图上定义的特定四边形区域内。
          </p>
        </div>
      </div>
    </ChapterCard>
  );
}
