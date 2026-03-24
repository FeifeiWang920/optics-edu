import ChapterCard from "@/components/chapter/ChapterCard";
import BlackbodySlider from "@/components/BlackbodySlider";

export function Chapter07Metamerism() {
  return (
    <ChapterCard
      chapterNumber={7}
      title="同色异谱与色适应"
      subtitle="光源变化下的颜色感知"
      cieRef="CIE 15:2004 Section 9"
      difficulty="advanced"
      estimatedTime={12}
      interactive={<BlackbodySlider />}
      mathDetail={
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-bold text-primary-400 mb-2">同色异谱指数（Metamerism Index）</h4>
            <p className="text-gray-400 mb-2">
              同色异谱指数 M 表示两种颜色在测试光源下的色差：
            </p>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs">
              <p>M = ΔE*(测试光源)</p>
              <p className="text-gray-500 mt-1">条件：ΔE*(参考光源) = 0</p>
            </div>
            <p className="text-gray-400 mt-2">
              M 值越小，表示颜色配对在不同光源下越稳定。M &lt; 1 被认为是优秀的抗同色异谱性能。
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">特殊同色异谱指数 Mᵢ</h4>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs space-y-1">
              <p>对于 CIE 定义的标准照明体 i (A, D50, D55, D65, D75, F1-F12)：</p>
              <p>Mᵢ = ΔE*₀₀(样品对，照明体 i)</p>
              <p className="text-gray-500">条件：ΔE*₀₀(样品对，D65) = 0</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">冯·克里克斯色适应变换</h4>
            <p className="text-gray-400 mb-2">
              冯·克里克斯（Von Kries）假设认为色适应是通过独立调节三种视锥通道的增益实现的：
            </p>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs space-y-1">
              <p>[Lᵣ]   [α 0  0 ] [Lₜ]</p>
              <p>[Mᵣ] = [0  β 0 ] [Mₜ]</p>
              <p>[Sᵣ]   [0  0  γ] [Sₜ]</p>
            </div>
            <p className="text-gray-400 mt-2">
              其中 (Lₜ, Mₜ, Sₜ) 是测试条件下的响应，(Lᵣ, Mᵣ, Sᵣ) 是参考条件下的响应，
              α、β、γ 是由白点决定的增益系数。
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">色温与相关色温（CCT）</h4>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs">
              <p>CCT 由普朗克轨迹上最近点的温度确定</p>
              <p className="text-gray-500 mt-1">使用 Robertson 法或 Ohno 法计算</p>
            </div>
            <p className="text-gray-400 mt-2">
              当光源色品点不在普朗克轨迹上时，使用距离最近点的温度作为 CCT。
              距离称为 Duv，正负表示在轨迹的哪一侧。
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <p>
          <span className="text-primary-400 font-medium">同色异谱（Metamerism）</span>是色度学中一个反直觉但极其重要的现象：
          两种颜色在某种光源下看起来完全相同，但在另一种光源下却呈现明显差异。
          这种现象在日常生活中随处可见，也是工业颜色匹配中的重大挑战。
        </p>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-primary-400 font-bold mb-2">什么是同色异谱？</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            当两个物体具有<span className="italic">不同的光谱反射率曲线</span>，
            但在特定光源下产生<span className="italic">相同的三刺激值</span>时，
            它们被称为同色异谱对。
          </p>
          <div className="glass-panel p-4 rounded-lg bg-primary-500/5 border border-primary-500/20">
            <p className="text-white text-sm mb-2"><strong>经典例子：</strong></p>
            <p className="text-gray-300 text-sm">
              在商场荧光灯下看起来完美匹配的衬衫和裤子，拿到日光下可能发现颜色不一致。
              这是因为两种面料的染料光谱特性不同，但在荧光灯的光谱下恰好产生相同的响应。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-4 rounded-xl">
            <h4 className="text-secondary-400 font-bold mb-2">同色异谱的类型</h4>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>
                <span className="text-primary-400 font-mono text-xs">照明体同色异谱</span>
                <span className="text-gray-400"> — 光源变化导致颜色差异（最常见）</span>
              </li>
              <li>
                <span className="text-primary-400 font-mono text-xs">观察者同色异谱</span>
                <span className="text-gray-400"> — 不同观察者的视锥响应差异</span>
              </li>
              <li>
                <span className="text-primary-400 font-mono text-xs">视场同色异谱</span>
                <span className="text-gray-400"> — 2° 与 10° 标准观察者的差异</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <h4 className="text-accent-400 font-bold mb-2">减少同色异谱的方法</h4>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• 使用光谱反射率相近的材料</li>
              <li>• 选择在多种光源下稳定的颜料</li>
              <li>• 采用多光源条件下的颜色评估</li>
              <li>• 使用窄带光源（如 LED）照明</li>
            </ul>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border-l-4 border-l-yellow-500">
          <h4 className="text-yellow-400 font-bold mb-2">💡 色适应（Chromatic Adaptation）</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-2">
            人眼具有惊人的自适应能力。在白炽灯（约 2800K）下看一张白纸，
            尽管它实际上富含红色光谱，我们仍然感知为{'"白色"'}。这种现象称为
            <span className="italic">色适应</span>。
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            色适应的生理机制是视锥细胞的<span className="italic">增益调节</span>。
            大脑会自动{'"校准"'}白色参考点，使我们能在不同光源下保持相对稳定的颜色感知。
          </p>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-primary-400 font-bold mb-2">🌡️ 色温与颜色感知</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            上方的黑体辐射滑块展示了色温（Color Temperature）对颜色外观的影响：
          </p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="glass-panel p-2 rounded text-center">
              <p className="text-orange-400 font-bold">1000-3000K</p>
              <p className="text-gray-400">暖色调</p>
              <p className="text-gray-500">烛光、白炽灯</p>
            </div>
            <div className="glass-panel p-2 rounded text-center">
              <p className="text-yellow-400 font-bold">4000-5000K</p>
              <p className="text-gray-400">中性白</p>
              <p className="text-gray-500">上午日光</p>
            </div>
            <div className="glass-panel p-2 rounded text-center">
              <p className="text-blue-400 font-bold">6500K+</p>
              <p className="text-gray-400">冷色调</p>
              <p className="text-gray-500">正午日光、阴天</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-primary-400 font-bold mb-2">标准照明体</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            CIE 定义了一系列标准照明体用于颜色评估：
          </p>
          <div className="space-y-2 text-sm">
            <div className="glass-panel p-3 rounded flex justify-between items-center">
              <div>
                <p className="text-white font-mono text-xs">照明体 A</p>
                <p className="text-gray-400 text-xs">代表 2856K 白炽灯光</p>
              </div>
              <span className="text-gray-500 text-xs">家居环境</span>
            </div>
            <div className="glass-panel p-3 rounded flex justify-between items-center">
              <div>
                <p className="text-white font-mono text-xs">照明体 D65</p>
                <p className="text-gray-400 text-xs">代表 6504K 平均日光</p>
              </div>
              <span className="text-gray-500 text-xs">标准光源</span>
            </div>
            <div className="glass-panel p-3 rounded flex justify-between items-center">
              <div>
                <p className="text-white font-mono text-xs">照明体 F 系列</p>
                <p className="text-gray-400 text-xs">荧光灯（F1-F12）</p>
              </div>
              <span className="text-gray-500 text-xs">商业照明</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-primary-400 font-bold mb-2">🚗 车灯设计中的应用</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            汽车颜色设计必须考虑同色异谱效应。一辆车的颜色需要在多种光照条件下
            （日光、白炽灯、荧光灯、钠灯）都保持协调。 premium 汽车品牌会在
            多种标准光源下评估车身颜色，确保没有明显的同色异谱问题。
            此外，LED 大灯的光谱设计也需要考虑颜色渲染性，确保驾驶员能准确
            识别交通信号和路面标志的颜色。
          </p>
        </div>
      </div>
    </ChapterCard>
  );
}
