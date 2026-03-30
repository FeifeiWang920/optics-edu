"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 球面坐标转换为3D笛卡尔坐标
function sphericalToCartesian(theta: number, phi: number, radius: number) {
  const thetaRad = (theta * Math.PI) / 180;
  const phiRad = (phi * Math.PI) / 180;
  return {
    x: radius * Math.sin(thetaRad) * Math.cos(phiRad),
    y: radius * Math.cos(thetaRad),
    z: radius * Math.sin(thetaRad) * Math.sin(phiRad),
  };
}

// 3D点投影到2D画布（简单透视投影）
function project3DTo2D(x: number, y: number, z: number, viewAngle: number) {
  const angleRad = (viewAngle * Math.PI) / 180;
  const cosA = Math.cos(angleRad);
  const sinA = Math.sin(angleRad);

  // 绕Y轴旋转
  const xRot = x * cosA + z * sinA;
  const zRot = -x * sinA + z * cosA;

  // 透视投影
  const scale = 200 / (200 + zRot);
  return {
    x: 150 + xRot * scale,
    y: 150 - y * scale,
    scale: scale,
  };
}

export default function EquirectangularProjectionExplorer() {
  const [theta, setTheta] = useState(45); // 极角 0-180°
  const [phi, setPhi] = useState(45); // 方位角 0-360°
  const [viewAngle, setViewAngle] = useState(30); // 3D视图旋转角度
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0); // 0:球面, 1:展开中, 2:平面
  const [showGrid, setShowGrid] = useState(true);
  const [showFormulas, setShowFormulas] = useState(true);

  // 球面半径
  const radius = 80;

  // 当前点在球面上的3D坐标
  const spherePoint = useMemo(
    () => sphericalToCartesian(theta, phi, radius),
    [theta, phi]
  );

  // 投影到2D平面上的坐标
  const projected2D = useMemo(() => {
    // 等距圆柱投影: x = φ, y = θ
    return {
      x: 50 + (phi / 360) * 200, // φ 映射到 50-250
      y: 250 - theta, // θ 映射到 250-50 (注意y轴向下)
    };
  }, [theta, phi]);

  // 3D视图中的投影位置
  const sphere2D = useMemo(
    () => project3DTo2D(spherePoint.x, spherePoint.y, spherePoint.z, viewAngle),
    [spherePoint, viewAngle]
  );

  // 动画效果
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setAnimationPhase((prev) => {
        if (prev >= 2) {
          setIsAnimating(false);
          return 2;
        }
        return prev + 0.02;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isAnimating]);

  // 生成球面网格线
  const generateSphereGrid = () => {
    const lines = [];
    // 经线 (φ = constant)
    for (let phiDeg = 0; phiDeg < 360; phiDeg += 30) {
      const points = [];
      for (let t = 10; t <= 170; t += 5) {
        const p = sphericalToCartesian(t, phiDeg, radius);
        const proj = project3DTo2D(p.x, p.y, p.z, viewAngle);
        points.push(proj);
      }
      lines.push({ type: "meridian", points, phi: phiDeg });
    }
    // 纬线 (θ = constant)
    for (let thetaDeg = 30; thetaDeg < 180; thetaDeg += 30) {
      const points = [];
      for (let p = 0; p <= 360; p += 10) {
        const pt = sphericalToCartesian(thetaDeg, p, radius);
        const proj = project3DTo2D(pt.x, pt.y, pt.z, viewAngle);
        points.push(proj);
      }
      lines.push({ type: "parallel", points, theta: thetaDeg });
    }
    return lines;
  };

  const sphereGrid = useMemo(() => generateSphereGrid(), [viewAngle]);

  // 动画：球面展开到平面
  const getAnimatedPoint = () => {
    if (animationPhase <= 1) {
      // 球面阶段到展开中
      const t = Math.max(0, animationPhase);
      return {
        x: sphere2D.x * (1 - t) + projected2D.x * t,
        y: sphere2D.y * (1 - t) + projected2D.y * t,
        onSphere: t < 0.5,
      };
    }
    // 平面阶段
    return { x: projected2D.x, y: projected2D.y, onSphere: false };
  };

  const animatedPoint = getAnimatedPoint();

  return (
    <div className="glass-card p-6 rounded-xl space-y-6">
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">
            等距圆柱投影原理
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Equirectangular Projection: 球面光强分布 → 平面配光图
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setAnimationPhase(0);
              setIsAnimating(true);
            }}
            disabled={isAnimating}
            className="px-3 py-1.5 bg-primary-500/20 hover:bg-primary-500/30 disabled:opacity-50 text-primary-300 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
            投影动画
          </button>
          <button
            onClick={() => setShowGrid(!showGrid)}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium rounded-lg transition-colors"
          >
            {showGrid ? "隐藏网格" : "显示网格"}
          </button>
        </div>
      </div>

      {/* 双视图并排 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：3D球面视图 */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-400">球面视图</span>
            <span className="text-[10px] text-gray-500 font-mono">
              I(θ={theta.toFixed(0)}°, φ={phi.toFixed(0)}°)
            </span>
          </div>
          <div className="relative bg-black/40 rounded-xl overflow-hidden border border-white/10 aspect-square">
            <svg viewBox="0 0 300 300" className="w-full h-full">
              {/* 背景 */}
              <rect width="300" height="300" fill="rgba(0,0,0,0.3)" />

              {/* 球面网格 */}
              {showGrid &&
                sphereGrid.map((line, idx) => (
                  <motion.path
                    key={`${line.type}-${idx}`}
                    d={`M ${line.points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L ")}`}
                    fill="none"
                    stroke={
                      line.type === "meridian"
                        ? "rgba(59,130,246,0.3)"
                        : "rgba(34,197,94,0.3)"
                    }
                    strokeWidth={line.phi === 0 || line.theta === 90 ? 1.5 : 0.8}
                    opacity={line.phi === 0 || line.theta === 90 ? 0.8 : 0.4}
                  />
                ))}

              {/* 球体外轮廓 */}
              <circle
                cx="150"
                cy="150"
                r={80}
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
              />

              {/* 坐标轴 */}
              <line
                x1="150"
                y1="70"
                x2="150"
                y2="230"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
              <text x="155" y="75" className="fill-gray-500 text-[8px]">
                Z(极轴)
              </text>

              {/* 当前点 */}
              <motion.circle
                cx={sphere2D.x}
                cy={sphere2D.y}
                r="6"
                fill="#f59e0b"
                stroke="white"
                strokeWidth="2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />

              {/* 点到中心的连线 */}
              <line
                x1="150"
                y1="150"
                x2={sphere2D.x}
                y2={sphere2D.y}
                stroke="rgba(245,158,11,0.4)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />

              {/* 角度标注 */}
              <text x="235" y="145" className="fill-amber-400 text-[9px] font-mono">
                θ={theta}°
              </text>
            </svg>

            {/* 视图控制 */}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-500">视角</span>
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={viewAngle}
                  onChange={(e) => setViewAngle(parseInt(e.target.value))}
                  className="flex-1 accent-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：2D投影视图 */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-400">平面投影</span>
            <span className="text-[10px] text-gray-500 font-mono">
              x=φ, y=θ (等距)
            </span>
          </div>
          <div className="relative bg-black/40 rounded-xl overflow-hidden border border-white/10 aspect-square">
            <svg viewBox="0 0 300 300" className="w-full h-full">
              {/* 背景网格 */}
              <defs>
                <pattern
                  id="grid"
                  width="25"
                  height="25"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 25 0 L 0 0 0 25"
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="300" height="300" fill="url(#grid)" />

              {/* 投影区域边框 */}
              <rect
                x="50"
                y="50"
                width="200"
                height="200"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
              />

              {/* φ 刻度 (横轴) */}
              {[0, 90, 180, 270, 360].map((p) => (
                <g key={`phi-${p}`}>
                  <line
                    x1={50 + (p / 360) * 200}
                    y1="250"
                    x2={50 + (p / 360) * 200}
                    y2="255"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1"
                  />
                  <text
                    x={50 + (p / 360) * 200}
                    y="265"
                    className="fill-gray-500 text-[8px]"
                    textAnchor="middle"
                  >
                    {p}°
                  </text>
                </g>
              ))}
              <text
                x="150"
                y="285"
                className="fill-blue-400 text-[10px]"
                textAnchor="middle"
              >
                φ (方位角)
              </text>

              {/* θ 刻度 (纵轴) */}
              {[0, 45, 90, 135, 180].map((t) => (
                <g key={`theta-${t}`}>
                  <line
                    x1="45"
                    y1={250 - t}
                    x2="50"
                    y2={250 - t}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1"
                  />
                  <text
                    x="40"
                    y={250 - t + 3}
                    className="fill-gray-500 text-[8px]"
                    textAnchor="end"
                  >
                    {t}°
                  </text>
                </g>
              ))}
              <text
                x="15"
                y="150"
                className="fill-green-400 text-[10px]"
                textAnchor="middle"
                transform="rotate(-90, 15, 150)"
              >
                θ (极角)
              </text>

              {/* 投影点 */}
              <motion.circle
                cx={projected2D.x}
                cy={projected2D.y}
                r="6"
                fill="#3b82f6"
                stroke="white"
                strokeWidth="2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />

              {/* 投影线 */}
              <line
                x1={projected2D.x}
                y1={projected2D.y}
                x2={projected2D.x}
                y2="250"
                stroke="rgba(59,130,246,0.4)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <line
                x1={projected2D.x}
                y1={projected2D.y}
                x2="50"
                y2={projected2D.y}
                stroke="rgba(59,130,246,0.4)"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
            </svg>

            {/* 投影公式 */}
            <div className="absolute top-3 right-3 p-2 bg-black/60 rounded-lg border border-white/10">
              <div className="text-[10px] text-gray-400 space-y-0.5 font-mono">
                <p className="text-blue-400">x = φ</p>
                <p className="text-green-400">y = θ</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 控制面板 */}
      <div className="space-y-4">
        {/* 角度控制 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>极角 θ (0-180°)</span>
              <span className="font-mono text-green-400">{theta}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="180"
              value={theta}
              onChange={(e) => setTheta(parseInt(e.target.value))}
              className="w-full accent-green-500"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>方位角 φ (0-360°)</span>
              <span className="font-mono text-blue-400">{phi}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={phi}
              onChange={(e) => setPhi(parseInt(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 理论公式区域 */}
      <AnimatePresence>
        {showFormulas && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {/* 投影变换公式 */}
            <div className="glass-panel p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  投影变换公式
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-xs text-gray-400">球面坐标 → 平面坐标</p>
                  <div className="p-3 bg-black/40 rounded-lg font-mono text-sm space-y-1">
                    <p className="text-blue-400">x = φ</p>
                    <p className="text-green-400">y = θ</p>
                    <p className="text-gray-500 text-xs mt-2">
                      等距特性: 角度均匀分布
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-400">立体角微元</p>
                  <div className="p-3 bg-black/40 rounded-lg font-mono text-sm">
                    <p className="text-amber-400">dΩ = sinθ · dθ · dφ</p>
                    <p className="text-gray-500 text-xs mt-2">
                      高纬度(θ→0)面积压缩
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 关键概念 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <h4 className="text-xs font-bold text-white mb-1">
                  等距特性
                </h4>
                <p className="text-[11px] text-gray-400">
                  经线和纬线在平面上保持等间距，便于读取角度值。这是配光图标准化的基础。
                </p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <h4 className="text-xs font-bold text-white mb-1">
                  面积畸变
                </h4>
                <p className="text-[11px] text-gray-400">
                  球面面积元 dΩ=sinθdθdφ，在极点处(θ=0)面积趋近于零，投影后会被拉伸。
                </p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <h4 className="text-xs font-bold text-white mb-1">
                  光通量积分
                </h4>
                <p className="text-[11px] text-gray-400">
                  Φ = ∫∫ I(θ,φ) sinθ dθdφ，计算时必须引入 sinθ 权重保持守恒。
                </p>
              </div>
            </div>

            {/* 行业应用 */}
            <div className="glass-panel p-4 border border-secondary-500/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary-500/20 flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4 text-secondary-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    IES/LDT 文件标准
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    配光数据文件存储的就是等距投影后的二维数组 I(H,V)，其中 H=φ
                    (水平角), V=θ-90° (垂直角，以水平线为0°)。读取时直接使用插值，无需额外坐标转换。
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 切换公式显示 */}
      <button
        onClick={() => setShowFormulas(!showFormulas)}
        className="w-full py-2 text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center justify-center gap-2"
      >
        <span>{showFormulas ? "隐藏理论详情" : "显示理论详情"}</span>
        <svg
          className={`w-4 h-4 transition-transform ${showFormulas ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
}
