import ChapterCard from "@/components/chapter/ChapterCard";
import MacAdamEllipses from "@/components/colorimetry/MacAdamEllipses";

export function MacAdamDeepDive() {
  return (
    <ChapterCard
      chapterNumber={6.5}
      title="MacAdam 椭圆深度解析"
      subtitle="人眼色觉差异感知的里程碑实验"
      cieRef="JOSA 1942, Vol. 32"
      difficulty="advanced"
      estimatedTime={25}
      interactive={
        <div className="space-y-6">
          <MacAdamEllipses />
        </div>
      }
      mathDetail={
        <div className="space-y-6 text-sm">
          {/* 椭圆拟合公式 */}
          <div>
            <h4 className="font-bold text-primary-400 mb-2">MacAdam 椭圆方程</h4>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs space-y-2">
              <p>g₁₁(Δx)² + 2g₁₂(Δx)(Δy) + g₂₂(Δy)² = 1</p>
              <p className="text-gray-500 mt-2">其中 g₁₁, g₁₂, g₂₂ 是椭圆参数矩阵的元素</p>
            </div>
          </div>

          {/* 半长轴和半短轴计算 */}
          <div>
            <h4 className="font-bold text-primary-400 mb-2">椭圆几何参数</h4>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs space-y-1">
              <p>半长轴：a = 1/√λ₁</p>
              <p>半短轴：b = 1/√λ₂</p>
              <p>旋转角：θ = ½ arctan(2g₁₂/(g₁₁-g₂₂))</p>
            </div>
            <p className="text-gray-400 mt-2">
              λ₁ 和 λ₂ 是矩阵 G 的特征值，决定了椭圆的大小和形状。
            </p>
          </div>

          {/* 颜色匹配方差 */}
          <div>
            <h4 className="font-bold text-primary-400 mb-2">颜色匹配方差分析</h4>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs space-y-1">
              <p>σ²x = Σ(xᵢ - x₀)² / n</p>
              <p>σ²y = Σ(yᵢ - y₀)² / n</p>
              <p>协方差：σxy = Σ(xᵢ - x₀)(yᵢ - y₀) / n</p>
            </div>
          </div>

          {/* 单位椭圆面积 */}
          <div>
            <h4 className="font-bold text-primary-400 mb-2">椭圆面积与灵敏度</h4>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs space-y-1">
              <p>A = πab = π/√(λ₁λ₂) = π/√|G|</p>
            </div>
            <p className="text-gray-400 mt-2">
              椭圆面积与人眼在该色区的颜色辨别灵敏度成反比。面积越小，灵敏度越高。
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 实验背景 */}
        <section className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-bold text-primary-400 mb-4">🔬 实验背景</h3>
          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>
              1942年，David L. MacAdam 在美国柯达研究实验室进行了一项开创性的颜色视觉研究。
              这项研究的动机源于当时色度学的一个核心问题：<strong>CIE 1931 色品图上的距离无法准确预测人眼感知的颜色差异</strong>。
            </p>
            <p>
              MacAdam 注意到，在色品图的不同区域，人眼对颜色变化的敏感度差异巨大。例如，
              在绿色区域，人眼极其敏感，微小的色度变化就能被察觉；而在蓝色区域，
              人眼相对迟钝，需要较大的物理变化才能产生相同的感知差异。
            </p>
            <div className="bg-white/5 p-4 rounded-lg border-l-4 border-l-primary-500">
              <p className="text-primary-300 font-medium mb-2">核心研究问题</p>
              <ul className="space-y-2 text-sm">
                <li>• 人眼对不同色区的颜色差异感知是否相同？</li>
                <li>• 如何在色品图上量化颜色差异的感知阈值？</li>
                <li>• 这种非均匀性对工业颜色匹配有何影响？</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 实验方法 */}
        <section className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-bold text-secondary-400 mb-4">🎯 实验方法</h3>
          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>
              MacAdam 设计了一个精密的分光光度计匹配实验。被试（包括 MacAdam 本人和另外两名观察者）
              需要调节测试光的颜色，使其与参考光在视觉上完全匹配。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="text-secondary-400 font-medium mb-2">实验设置</h4>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>• 2° 视场（匹配 CIE 1931 标准观察者）</li>
                  <li>• 标准光源（使用单色光合成）</li>
                  <li>• 暗适应环境</li>
                  <li>• 24 个参考色点（覆盖可见光谱）</li>
                </ul>
              </div>
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="text-secondary-400 font-medium mb-2">匹配流程</h4>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>• 显示参考色（固定）</li>
                  <li>• 被试调节测试色匹配</li>
                  <li>• 记录 50 次独立匹配结果</li>
                  <li>• 统计分析匹配点的分布</li>
                </ul>
              </div>
            </div>

            <p className="mt-4">
              每位被试对 24 个参考色各进行 50 次颜色匹配。这些匹配点并非完全重合，
              而是形成一个统计分布——这就是后来著名的<strong>MacAdam 椭圆</strong>的数据基础。
            </p>
          </div>
        </section>

        {/* 实验原理 */}
        <section className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-bold text-accent-400 mb-4">📐 实验原理</h3>
          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>
              MacAdam 使用统计方法分析了匹配点的分布。他发现，在色品图上，
              匹配点的分布可以用椭圆来近似描述。这个椭圆被称为<strong>颜色匹配椭圆</strong>或<strong>色差椭圆</strong>。
            </p>

            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-accent-400 font-medium mb-2">为什么是椭圆？</h4>
              <p className="text-gray-400 text-sm mb-3">
                椭圆是二维高斯分布的等概率轮廓。假设人眼的颜色匹配误差在 x 和 y 方向上服从正态分布，
                那么等概率线就是椭圆。
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-black/20 p-3 rounded">
                  <p className="text-accent-300 mb-1">短轴方向</p>
                  <p className="text-gray-500">人眼最敏感的方向，微小的色度变化就能被察觉</p>
                </div>
                <div className="bg-black/20 p-3 rounded">
                  <p className="text-accent-300 mb-1">长轴方向</p>
                  <p className="text-gray-500">人眼最不敏感的方向，需要较大的变化才能察觉</p>
                </div>
              </div>
            </div>

            <p>
              椭圆的大小、形状和方向因参考色而异。MacAdam 发现，在色品图的不同区域，
              椭圆的特性差异显著：绿色区域的椭圆小而圆（高灵敏度），蓝色区域的椭圆大而扁（低灵敏度）。
            </p>
          </div>
        </section>

        {/* 实验结论 */}
        <section className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-bold text-green-400 mb-4">📊 实验结论</h3>
          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>
              MacAdam 的研究得出了几个重要结论，这些结论深刻影响了后来的色度学发展。
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg">
                <span className="text-green-400 font-bold text-lg">1</span>
                <div>
                  <p className="text-green-300 font-medium">CIE 1931 色品图不均匀</p>
                  <p className="text-gray-400 text-sm mt-1">
                    色品图上的几何距离与人眼感知的色差不成正比。绿色区域 0.01 的 xy 距离可能比蓝色区域 0.05 的距离更容易被察觉。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg">
                <span className="text-green-400 font-bold text-lg">2</span>
                <div>
                  <p className="text-green-300 font-medium">椭圆参数高度可变</p>
                  <p className="text-gray-400 text-sm mt-1">
                    椭圆的大小可相差 20 倍以上，长轴与短轴的比率可达 10:1。这说明人眼对不同方向的颜色变化敏感度差异巨大。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg">
                <span className="text-green-400 font-bold text-lg">3</span>
                <div>
                  <p className="text-green-300 font-medium">存在个体差异</p>
                  <p className="text-gray-400 text-sm mt-1">
                    不同观察者的椭圆大小和形状有所不同，但整体趋势一致。这为建立"标准观察者"提供了依据。
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg">
                <span className="text-green-400 font-bold text-lg">4</span>
                <div>
                  <p className="text-green-300 font-medium">光谱色与非光谱色不同</p>
                  <p className="text-gray-400 text-sm mt-1">
                    光谱轨迹上的颜色（纯色）与白光混合色的椭圆特性存在系统性差异。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 科学意义 */}
        <section className="glass-card p-6 rounded-xl border-l-4 border-l-blue-500">
          <h3 className="text-xl font-bold text-blue-400 mb-4">💡 科学意义与影响</h3>
          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>
              MacAdam 的这项工作被公认为色度学史上最重要的实验之一，其影响延续至今。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="text-blue-400 font-medium mb-2">对均匀色空间的推动</h4>
                <p className="text-gray-400 text-xs">
                  MacAdam 椭圆直接推动了 CIE 1960 UCS、CIE 1976 L*a*b* 和 CIE 1976 L*u*v* 等均匀色空间的建立。
                  这些色空间的目标是使色差椭圆尽可能接近圆形且大小一致。
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="text-blue-400 font-medium mb-2">工业颜色容差标准</h4>
                <p className="text-gray-400 text-xs">
                  现代工业中的颜色容差（如纺织、印刷、涂料）都基于 MacAdam 的研究。
                  ΔE（色差）的计算方法不断演进，但基础仍是他的椭圆概念。
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="text-blue-400 font-medium mb-2">色差公式的发展</h4>
                <p className="text-gray-400 text-xs">
                  从简单的 ΔE*ab 到复杂的 CIEDE2000，每一个改进都试图更好地模拟 MacAdam 椭圆所揭示的人眼感知特性。
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="text-blue-400 font-medium mb-2">显示技术校准</h4>
                <p className="text-gray-400 text-xs">
                  现代显示器的色域设计、校准标准都考虑了人眼在不同色区的敏感度差异，这正是 MacAdam 椭圆的应用。
                </p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg mt-4">
              <p className="text-blue-300 font-medium mb-2">关键引用</p>
              <p className="text-gray-400 text-xs italic">
                "Visual Sensitivities to Color Differences in Daylight" — D.L. MacAdam,
                Journal of the Optical Society of America, Vol. 32, No. 5, pp. 247-274, 1942
              </p>
              <p className="text-gray-500 text-xs mt-2">
                这篇论文被引用超过 4000 次，是色度学领域最具影响力的文献之一。
              </p>
            </div>
          </div>
        </section>

        {/* 可视化说明 */}
        <section className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-bold text-purple-400 mb-4">🎨 可视化说明</h3>
          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>
              上图展示了 MacAdam 椭圆在 CIE 1931 色品图上的分布。为了便于观察，椭圆被放大了 10 倍显示。
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg text-center">
                <p className="text-emerald-400 font-medium text-xs">绿色区域</p>
                <p className="text-gray-500 text-[10px] mt-1">椭圆大且扁<br />人眼最不敏感</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg text-center">
                <p className="text-blue-400 font-medium text-xs">蓝色区域</p>
                <p className="text-gray-500 text-[10px] mt-1">椭圆小且圆<br />人眼最敏感</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-center">
                <p className="text-red-400 font-medium text-xs">红色区域</p>
                <p className="text-gray-500 text-[10px] mt-1">椭圆相对圆<br />各向较均匀</p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg text-center">
                <p className="text-yellow-400 font-medium text-xs">白色区域</p>
                <p className="text-gray-500 text-[10px] mt-1">椭圆沿光谱<br />方向拉长</p>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              <strong>提示：</strong>使用滑块可以调整椭圆的放大倍数。1阶椭圆（未放大）实际上非常小，
              通常小于 0.01 的 xy 距离。这说明了 CIE 1931 色品图与人眼感知之间的巨大差异。
            </p>
          </div>
        </section>
      </div>
    </ChapterCard>
  );
}
