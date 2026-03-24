import ChapterCard from "@/components/chapter/ChapterCard";
import CIE1931Explorer from "@/components/CIE1931Explorer";

export function Chapter08Automotive() {
  return (
    <ChapterCard
      chapterNumber={8}
      title="车灯中的色度学实践"
      subtitle="从理论到工程应用"
      cieRef="ECE R48 / FMVSS 108"
      difficulty="intermediate"
      estimatedTime={10}
      interactive={<CIE1931Explorer />}
      mathDetail={
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-bold text-primary-400 mb-2">ECE 信号颜色色品边界</h4>
            <p className="text-gray-400 mb-2">ECE R48 法规定义了信号灯颜色的色品区域边界坐标：</p>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs space-y-1">
              <p className="text-red-400"><strong>红色（后位灯/制动灯）：</strong></p>
              <p>x ≤ 0.700, y ≤ 0.380, y ≥ 0.320</p>
              <p className="text-yellow-400 mt-2"><strong>黄色（转向灯）：</strong></p>
              <p>y ≤ 0.429, y ≥ 0.390, x ≥ 0.500</p>
              <p className="text-white mt-2"><strong>白色（前位灯/倒车灯）：</strong></p>
              <p>x ≥ 0.310, x ≤ 0.500, y ≥ 0.280</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">色纯度计算</h4>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs">
              <p>pe = OS / OW × 100%</p>
              <p className="text-gray-500 mt-1">O = 白点，S = 样品点，W = 光谱轨迹交点</p>
            </div>
            <p className="text-gray-400 mt-2">
              法规通常要求信号灯的色纯度不低于某一阈值，以确保足够的视觉识别性。
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">主波长容差</h4>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs">
              <p>λd ± Δλ（典型值：±2-5nm）</p>
            </div>
            <p className="text-gray-400 mt-2">
              对于高亮度 LED 信号灯，主波长是比色品坐标更直观的质量控制参数。
              生产设备需要定期校准以确保波长稳定性。
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <p>
          色度学理论在车灯设计中有着直接而重要的应用。从法规符合性到美学设计，
          从质量控制到人因工程，颜色科学贯穿整个汽车照明系统的开发流程。
        </p>

        <div className="glass-card p-4 rounded-xl border-l-4 border-l-red-500">
          <h4 className="text-red-400 font-bold mb-2">🔴 法规要求的颜色区域</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            全球主要汽车法规（ECE、FMVSS、GB）都对信号灯的颜色规定了严格的色品容差区域：
          </p>
          <div className="space-y-3 text-sm">
            <div className="glass-panel p-3 rounded">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded bg-red-600" />
                <p className="text-white font-bold">红色信号</p>
              </div>
              <p className="text-gray-400 text-xs mb-2">后位灯、制动灯、后雾灯</p>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="text-gray-500">ECE 边界</div>
                <div className="text-gray-300">x ≤ 0.700, y ≤ 0.380</div>
                <div className="text-gray-500">SAE 边界</div>
                <div className="text-gray-300">类似但略有差异</div>
              </div>
            </div>

            <div className="glass-panel p-3 rounded">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded bg-yellow-500" />
                <p className="text-white font-bold">黄色信号</p>
              </div>
              <p className="text-gray-400 text-xs mb-2">前/后转向灯、侧标志</p>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="text-gray-500">类别 11</div>
                <div className="text-gray-300">饱和黄色</div>
                <div className="text-gray-500">类别 12</div>
                <div className="text-gray-300">选择性黄色（法系）</div>
              </div>
            </div>

            <div className="glass-panel p-3 rounded">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded bg-white border border-gray-600" />
                <p className="text-white font-bold">白色信号</p>
              </div>
              <p className="text-gray-400 text-xs mb-2">前位灯、倒车灯</p>
              <div className="text-xs text-gray-500">
                允许略带蓝色（氙气灯、LED 冷白光）或略带黄色（卤素灯）
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-4 rounded-xl">
            <h4 className="text-primary-400 font-bold mb-2">颜色质量控制流程</h4>
            <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
              <li>来料检验：测量 LED 芯片/灯罩的色品坐标</li>
              <li>装配验证：总成后的颜色一致性检查</li>
              <li>老化测试：高温高湿后的颜色稳定性</li>
              <li>终检：确保符合法规边界要求</li>
            </ol>
          </div>

          <div className="glass-card p-4 rounded-xl">
            <h4 className="text-secondary-400 font-bold mb-2">测量设备</h4>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>
                <span className="text-white font-medium">分光光度计</span>
                <span className="text-gray-400"> — 测量光谱反射率/透射率</span>
              </li>
              <li>
                <span className="text-white font-medium">色度计</span>
                <span className="text-gray-400"> — 直接读取 xy/L*a*b* 值</span>
              </li>
              <li>
                <span className="text-white font-medium">积分球</span>
                <span className="text-gray-400"> — 测量光源的总光通量和色温</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-accent-400 font-bold mb-2">LED 时代的颜色挑战</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            LED 光源相比传统卤素灯和氙气灯，具有窄带光谱特性，这带来了新的挑战：
          </p>
          <div className="space-y-2 text-sm">
            <div className="glass-panel p-3 rounded flex items-start gap-3">
              <span className="text-primary-400 font-bold">⚠️</span>
              <div>
                <p className="text-white font-medium">波长漂移</p>
                <p className="text-gray-400 text-xs">LED 的主波长会随温度和老化发生变化，典型漂移量为 0.1nm/°C</p>
              </div>
            </div>
            <div className="glass-panel p-3 rounded flex items-start gap-3">
              <span className="text-primary-400 font-bold">⚠️</span>
              <div>
                <p className="text-white font-medium">BIN 分档</p>
                <p className="text-gray-400 text-xs">LED 制造商按波长分档供货，设计时需考虑相邻 BIN 的颜色差异</p>
              </div>
            </div>
            <div className="glass-panel p-3 rounded flex items-start gap-3">
              <span className="text-primary-400 font-bold">⚠️</span>
              <div>
                <p className="text-white font-medium">角度依赖性</p>
                <p className="text-gray-400 text-xs">某些 LED 封装的颜色会随观察角度变化（蓝光泄漏问题）</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border-l-4 border-l-blue-500">
          <h4 className="text-blue-400 font-bold mb-2">🎨 美学与品牌的颜色设计</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            除了法规要求，颜色也是品牌识别的重要元素。一些豪华品牌会定制独特的
            LED 发光颜色，例如宝马的{'"天使眼"'}日间行车灯采用特定色温（约 5500K-6000K）
            的白光，形成强烈的品牌识别度。尾灯的发光图案和颜色渐变也成为
            设计师表达品牌语言的工具。
          </p>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-primary-400 font-bold mb-2">📊 使用色品图进行合规验证</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            上方的 CIE 1931 探索器可用于验证车灯颜色是否符合法规：
          </p>
          <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
            <li>使用色度计测量样品的 xy 坐标</li>
            <li>在色品图上标记该点位置</li>
            <li>检查是否落在法规定义的边界内</li>
            <li>考虑测量不确定度，留出安全余量</li>
          </ol>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-primary-400 font-bold mb-2">🚗 未来趋势：智能车灯的颜色调节</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            随着自适应驾驶光束（ADB）和数字微镜（DMD）技术的发展，
            未来的智能车灯可能具备动态颜色调节能力：在雨雾天自动切换到
            穿透力更强的黄光，在高速公路上使用更冷的白光提高对比度，
            甚至在紧急制动时闪烁特定颜色以增强警示效果。
            这将给色度学提出新的研究和应用课题。
          </p>
        </div>
      </div>
    </ChapterCard>
  );
}
