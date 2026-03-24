import ChapterCard from "@/components/chapter/ChapterCard";
import SpectrumSlider from "@/components/SpectrumSlider";

export function Chapter01Rainbow() {
  return (
    <ChapterCard
      chapterNumber={1}
      title="从彩虹说起"
      subtitle="光的物理本质与可见光谱"
      feynmanRef="费曼物理学讲义 35-1"
      difficulty="beginner"
      estimatedTime={8}
      interactive={<SpectrumSlider />}
      mathDetail={
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-bold text-primary-400 mb-2">波长与频率的关系</h4>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs">
              c = λ × f
            </div>
            <p className="mt-2 text-gray-400">
              其中 c 为光速（真空中约 3×10⁸ m/s），λ 为波长，f 为频率。
              波长越短，频率越高，光子能量越大。
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary-400 mb-2">光子能量公式</h4>
            <div className="glass-panel p-3 rounded-lg font-mono text-xs">
              E = h × f = hc/λ
            </div>
            <p className="mt-2 text-gray-400">
              其中 h 为普朗克常数（6.626×10⁻³⁴ J·s）。紫光（400nm）的光子能量约为 3.1eV，
              红光（700nm）约为 1.8eV。
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <p>
          彩虹是自然界中最美丽的光学现象之一。当阳光穿过雨滴时，发生了<span className="text-primary-400 font-medium">折射</span>、
          <span className="text-primary-400 font-medium">反射</span>和<span className="text-primary-400 font-medium">色散</span>，
          将白光分解成我们熟悉的七彩光谱。
        </p>

        <div className="glass-card p-4 rounded-xl">
          <h4 className="text-primary-400 font-bold mb-2">什么是可见光？</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            可见光是电磁波谱中极窄的一段，波长范围约为 <strong>380nm 到 780nm</strong>。
            这段频谱恰好位于紫外线和红外线之间。人眼之所以能"看见"这段频谱，
            是进化的结果——太阳辐射的峰值正好落在可见光范围内。
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ColorBand name="紫光" range="380-450nm" color="from-purple-600 to-blue-700" />
          <ColorBand name="蓝光" range="450-495nm" color="from-blue-700 to-cyan-500" />
          <ColorBand name="绿光" range="495-570nm" color="from-cyan-500 to-green-500" />
          <ColorBand name="红光" range="620-780nm" color="from-orange-500 to-red-600" />
        </div>

        <div className="glass-card p-4 rounded-xl border-l-4 border-l-yellow-500">
          <h4 className="text-yellow-500 font-bold mb-2">💡 车灯设计中的意义</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            车灯的光谱分布直接影响照明质量和安全性。卤素灯富含红外线（发热大），
            LED 和激光大灯则能更精确地控制光谱，提高效率并减少眩光。
          </p>
        </div>

        <p>
          在这个交互组件中，你可以探索可见光谱的不同区域。将鼠标悬停在每个颜色带上，
          可以看到详细的波长信息和名称。
        </p>
      </div>
    </ChapterCard>
  );
}

function ColorBand({ name, range, color }: { name: string; range: string; color: string }) {
  return (
    <div className="glass-card p-3 rounded-xl">
      <div className={`h-2 rounded bg-gradient-to-r ${color} mb-2`} />
      <p className="text-white font-medium text-sm">{name}</p>
      <p className="text-gray-500 text-xs">{range}</p>
    </div>
  );
}
