import BlindSpotTest from "@/components/BlindSpotTest";
import MachBandDemo from "@/components/MachBandDemo";
import { Eye, Sun, Moon, Activity, Crosshair, AlertTriangle } from "lucide-react";

export default function VisionPage() {
  return (
    <div className="space-y-16">
      <section className="space-y-4">
        <h1 className="text-5xl font-bold text-gradient">人眼视觉与感知</h1>
        <p className="text-gray-400 text-lg max-w-3xl">
          车灯的终极目的是服务于人类视觉系统。在开始学习光源和光学设计之前，我们必须先理解这个「终端用户」——人眼——的工作原理、局限性和特殊偏好。
        </p>
      </section>

      {/* Eye Structure Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold flex items-center gap-3"><Eye className="text-primary-500" /> 人眼的光学结构</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-5 text-gray-300 text-sm leading-relaxed">
            <p>
              人眼是一个高度自适应的<strong>折射成像系统</strong>，外形呈近似球形，前后径约 24mm。其成像原理与相机极为相似：
            </p>
            <div className="space-y-3">
              {[
                { part: "角膜", role: "最主要的折射元件，提供约 2/3 的总折射力（约40D）" },
                { part: "瞳孔", role: "自动\"光圈\"，直径在 2~8mm 之间调节，控制进光量" },
                { part: "晶状体", role: "可变焦\"镜头\"，通过睫状肌改变形状，调节焦距（约20D）" },
                { part: "视网膜", role: "感光\"底片/传感器\"，将光信号转换为神经电信号" },
                { part: "中央凹", role: "视网膜中心最灵敏区域，锥细胞密度最高，视角约 3°" },
              ].map(({ part, role }) => (
                <div key={part} className="flex gap-3 p-3 bg-white/5 rounded-lg">
                  <span className="text-primary-400 font-bold w-16 shrink-0">{part}</span>
                  <span className="text-gray-400 text-xs">{role}</span>
                </div>
              ))}
            </div>
          </div>
          {/* SVG Eye Diagram */}
          <div className="glass-panel p-4">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 text-center">人眼横截面示意图</p>
            <svg viewBox="0 0 300 220" className="w-full" xmlns="http://www.w3.org/2000/svg">
              {/* Eye outline */}
              <ellipse cx="150" cy="110" rx="100" ry="90" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
              {/* Cornea */}
              <path d="M 55 90 Q 30 110 55 130" stroke="#3b82f6" strokeWidth="2.5" fill="none"/>
              <text x="5" y="93" fill="#3b82f6" fontSize="8">角膜</text>
              {/* Lens */}
              <ellipse cx="95" cy="110" rx="12" ry="22" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" strokeWidth="1.5"/>
              <text x="60" y="148" fill="#8b5cf6" fontSize="7">晶状体</text>
              {/* Pupil */}
              <circle cx="72" cy="110" r="8" fill="rgba(0,0,0,0.8)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
              <text x="46" y="132" fill="#aaa" fontSize="7">瞳孔</text>
              {/* Vitreous */}
              <text x="125" y="80" fill="#555" fontSize="8">玻璃体</text>
              {/* Retina */}
              <path d="M 247 60 Q 255 110 247 160" stroke="#f59e0b" strokeWidth="3" fill="none"/>
              <text x="252" y="90" fill="#f59e0b" fontSize="8">视</text>
              <text x="252" y="100" fill="#f59e0b" fontSize="8">网</text>
              <text x="252" y="110" fill="#f59e0b" fontSize="8">膜</text>
              {/* Fovea */}
              <circle cx="248" cy="110" r="5" fill="#ef4444" opacity="0.8"/>
              <text x="218" y="125" fill="#ef4444" fontSize="7">中央凹</text>
              {/* Optic nerve / blind spot */}
              <rect x="245" y="130" width="20" height="12" rx="3" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
              <text x="236" y="155" fill="#666" fontSize="7">视神经/盲点</text>
              {/* Light rays */}
              <line x1="10" y1="95" x2="68" y2="107" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,2" opacity="0.7"/>
              <line x1="10" y1="110" x2="68" y2="110" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,2" opacity="0.7"/>
              <line x1="10" y1="125" x2="68" y2="113" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,2" opacity="0.7"/>
              {/* Arrows inside eye */}
              <line x1="108" y1="102" x2="240" y2="86" stroke="#f59e0b" strokeWidth="1" opacity="0.4" strokeDasharray="2,3"/>
              <line x1="108" y1="110" x2="242" y2="110" stroke="#f59e0b" strokeWidth="1" opacity="0.4" strokeDasharray="2,3"/>
              <line x1="108" y1="118" x2="240" y2="132" stroke="#f59e0b" strokeWidth="1" opacity="0.4" strokeDasharray="2,3"/>
              <text x="15" y="210" fill="#555" fontSize="8">光线→角膜→瞳孔→晶状体→视网膜（倒像）→视神经→大脑</text>
            </svg>
          </div>
        </div>
      </section>

      {/* Two types of photoreceptors */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold">视网膜的两类感光细胞</h2>
        <p className="text-gray-400 text-sm max-w-3xl">
          视网膜上有约 1.3 亿个感光细胞，分为两种：锥状细胞和杆状细胞。它们在不同光照条件下分工协作，共同支撑我们的完整视觉能力。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-8 space-y-5 border-l-4 border-l-orange-500">
            <div className="flex items-center gap-2 text-orange-400">
              <Sun size={24} />
              <h3 className="text-xl font-bold">锥状细胞（视锥细胞）</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-300">
              <p>约 <strong>600 万个</strong>，高度集中于中央凹。</p>
              <div className="p-3 bg-orange-500/5 rounded-lg border border-orange-500/10 space-y-2">
                <p className="font-bold text-white">三种类型（对应三原色）：</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded">L型 红色 ~560nm</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">M型 绿色 ~530nm</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">S型 蓝色 ~420nm</span>
                </div>
              </div>
              <ul className="text-gray-400 space-y-1 list-disc list-inside text-xs">
                <li>在亮度 &gt; 3 cd/m² 时发挥作用（明视觉）</li>
                <li>能感知颜色，分辨率高（每个细胞独立连接神经）</li>
                <li>响应速度快，适合辨识快速运动目标</li>
              </ul>
              <div className="p-2 bg-yellow-500/5 rounded border border-yellow-500/10 text-[11px] text-gray-400 italic">
                💡 车灯法规中的光色要求（例如转向灯{'"琥珀色"'}）就是基于锥状细胞的色觉制定的。
              </div>
            </div>
          </div>
          <div className="glass-panel p-8 space-y-5 border-l-4 border-l-blue-500">
            <div className="flex items-center gap-2 text-blue-400">
              <Moon size={24} />
              <h3 className="text-xl font-bold">杆状细胞（视杆细胞）</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-300">
              <p>约 <strong>1.2 亿个</strong>，分布于中央凹外侧区域（周边视野）。</p>
              <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/10 space-y-2">
                <p className="font-bold text-white">只有一种：</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">视紫红质 ~500nm 最敏感</span>
                </div>
              </div>
              <ul className="text-gray-400 space-y-1 list-disc list-inside text-xs">
                <li>在极低光照下工作（暗视觉），灵敏度是锥细胞的 1000 倍以上</li>
                <li>不能分辨颜色（所有夜晚景物看起来都偏灰）</li>
                <li>多个细胞共用一个神经末梢，分辨率低</li>
              </ul>
              <div className="p-2 bg-blue-500/5 rounded border border-blue-500/10 text-[11px] text-gray-400 italic">
                💡 这解释了为何人在黑暗中无法辨别颜色——此时只有杆状细胞在工作。
              </div>
            </div>
          </div>
        </div>
        {/* Sensitivity curve SVG */}
        <div className="glass-panel p-6 space-y-3">
          <p className="text-sm font-bold text-white">明视觉（锥细胞）与暗视觉（杆细胞）相对灵敏度曲线</p>
          <svg viewBox="0 0 500 160" className="w-full" xmlns="http://www.w3.org/2000/svg">
            {/* X Axis */}
            <line x1="40" y1="130" x2="480" y2="130" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
            {/* Y Axis */}
            <line x1="40" y1="10" x2="40" y2="130" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
            {/* Labels */}
            {[380, 420, 460, 500, 540, 580, 620, 660, 700, 740, 780].map((nm) => (
              <text key={nm} x={40 + (nm - 380) / 400 * 440} y="143" fill="#555" fontSize="7" textAnchor="middle">{nm}</text>
            ))}
            <text x="260" y="158" fill="#666" fontSize="8" textAnchor="middle">波长 (nm)</text>
            <text x="10" y="70" fill="#666" fontSize="8" textAnchor="middle" transform="rotate(-90 10 70)">相对灵敏度</text>
            {/* Scotopic (Rod) curve peak at 507nm: 40 + (507-380)/400 * 440 = 179.7 */}
            <path d="M 40 130 Q 80 130 130 90 Q 179.7 0 230 90 Q 280 130 480 130"
              stroke="#3b82f6" strokeWidth="2" fill="rgba(59,130,246,0.1)" />
            <text x="160" y="25" fill="#3b82f6" fontSize="9">暗视觉（507nm）</text>
            
            {/* Photopic (Cone) curve peak at 555nm: 40 + (555-380)/400 * 440 = 232.5 */}
            <path d="M 40 130 Q 130 130 180 80 Q 232.5 0 285 80 Q 335 130 480 130"
              stroke="#22c55e" strokeWidth="2" fill="rgba(34,197,94,0.1)" />
            <text x="255" y="20" fill="#22c55e" fontSize="9">明视觉（555nm）</text>
            
            {/* Vertical guides at calculated peaks */}
            <line x1="179.7" y1="10" x2="179.7" y2="130" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3,3" opacity="0.4"/>
            <line x1="232.5" y1="10" x2="232.5" y2="130" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,3" opacity="0.4"/>
          </svg>
          <p className="text-[10px] text-gray-500 italic">明视觉（Photopic）在555nm黄绿光处达到峰值，暗视觉（Scotopic）峰值在507nm青绿光，这就是{'"蒲金野效应"'}（Purkinje Effect）</p>
        </div>
      </section>

      {/* Blind Spot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-3"><Crosshair className="text-accent-500" /> 盲点 (Blind Spot)</h2>
          <div className="text-sm text-gray-300 leading-relaxed space-y-4">
            <p>
              视网膜上有一个特殊区域——<strong>视盘</strong>——视神经和血管在此汇聚并穿出眼球。这个区域没有任何感光细胞，因此对应的视野区域存在一个我们看不到的{'"盲区"'}，称为<strong>盲点</strong>。
            </p>
            <p>
              通常情况下我们感知不到盲点的存在，因为大脑会根据周围信息自动{'"补全"'}该区域的画面。右眼的盲点位于视野中心偏颞侧约 15° 处。
            </p>
            <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10">
              <p className="text-[11px] text-gray-400">
                <AlertTriangle size={12} className="inline mr-1 text-red-400" />
                <strong className="text-red-400">安全提示：</strong>夜间驾驶时，小目标（如行人）可能恰好落入盲点而被忽略。
              </p>
            </div>
          </div>
        </div>
        <BlindSpotTest />
      </div>

      {/* Illusions & Adaptation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MachBandDemo />

        <div className="glass-panel p-8 space-y-6">
          <h2 className="text-3xl font-bold flex items-center gap-3"><Activity className="text-yellow-500" /> 视觉适应机制</h2>
          <div className="space-y-6 text-sm text-gray-300">
            <p>人眼的感光灵敏度可以在很大范围内动态调节，适应从月光到阳光超过 10 个数量级的亮度变化。这种适应过程分两种方向：</p>
            <div className="space-y-3">
              <div className="p-4 bg-yellow-500/5 rounded-xl border border-yellow-500/10 space-y-2">
                <h4 className="font-bold text-yellow-400 text-xs uppercase tracking-widest">明适应（光适应）</h4>
                <p className="text-xs text-gray-400">从暗处突然进入明亮环境，初期会感到{'"目眩"'}，随后约 <strong>1 分钟</strong>内重新适应。机制：视紫红质漂白速度快；瞳孔快速缩小。</p>
              </div>
              <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 space-y-2">
                <h4 className="font-bold text-blue-400 text-xs uppercase tracking-widest">暗适应（暗视觉恢复）</h4>
                <p className="text-xs text-gray-400">从明处进入黑暗环境，初期几乎什么都看不见。<strong>约 30~45 分钟</strong>后才能充分适应。主要过程：视紫红质合成速度缓慢。</p>
              </div>
            </div>
            <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10 text-[11px] text-gray-400">
              <AlertTriangle size={12} className="inline mr-1 text-red-400" />
              <strong className="text-red-400">工程意义：</strong>这就是为什么车灯法规严格限制<strong>眩光</strong>（Glare）——当对向车远光灯使你的眼睛进入{'"明适应"'}后，你对暗处目标的感知能力会骤降，这是极危险的驾驶盲区。
            </div>
          </div>
        </div>
      </div>

      {/* Weber-Fechner Law */}
      <section className="glass-panel p-8 space-y-5">
        <h2 className="text-2xl font-bold">韦伯-费希纳定律 (Weber-Fechner Law)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-300">
          <div className="space-y-4">
            <p>人类对亮度的感知并非线性的，而是随刺激强度的<strong>对数</strong>变化。这意味着：</p>
            <div className="font-mono text-center p-4 bg-black/40 rounded-xl border border-white/5 text-primary-400 text-lg">
              S = k · log(I / I₀)
            </div>
            <p className="text-xs text-gray-500">S = 感觉强度，I = 物理刺激强度，I₀ = 最小感知阈值，k = 常数</p>
          </div>
          <div className="space-y-3">
            <p className="text-gray-400">实际意义：</p>
            <ul className="text-xs text-gray-400 space-y-2 list-disc list-inside">
              <li>亮度翻倍，人眼感觉<strong>不会</strong>觉得{'"亮了一倍"'}</li>
              <li>只有光通量增加约 <strong>26%</strong>（即 √2 倍），人眼才能察觉差异</li>
              <li>这是为什么灯具亮度测试需使用对数坐标系</li>
              <li>光度法规中的{'"等级"'}通常按对数间隔设计</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
