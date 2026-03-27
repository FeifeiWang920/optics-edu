"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function FermatPrincipleExplorer() {
  // Point coordinates - A in top medium, B in bottom medium
  const [pointAX, setPointAX] = useState(80);  // x-coordinate of point A (start)
  const [pointBX, setPointBX] = useState(220); // x-coordinate of point B (end)
  const [n1, setN1] = useState(1.0);           // refractive index of medium 1 (top)
  const [n2, setN2] = useState(1.5);           // refractive index of medium 2 (bottom)

  const interfaceY = 150; // y-coordinate of the interface (fixed at middle)
  const pointAY = 50;     // y-coordinate of point A (top)
  const pointBY = 250;    // y-coordinate of point B (bottom)

  // Calculate optical path length for a given intersection point x
  const calculateOPL = (x: number): number => {
    const d1 = Math.sqrt(Math.pow(x - pointAX, 2) + Math.pow(interfaceY - pointAY, 2));
    const d2 = Math.sqrt(Math.pow(pointBX - x, 2) + Math.pow(pointBY - interfaceY, 2));
    return n1 * d1 + n2 * d2;
  };

  // Find optimal path by scanning possible intersection points
  const { optimalX, optimalOPL, actualX, actualOPL } = useMemo(() => {
    let minOPL = Infinity;
    let bestX = pointAX;

    // Scan across the interface to find minimum OPL
    for (let x = 0; x <= 300; x += 0.5) {
      const opl = calculateOPL(x);
      if (opl < minOPL) {
        minOPL = opl;
        bestX = x;
      }
    }

    // Calculate actual path (straight line intersection with interface)
    // Line from A to B: parametric form
    // y = pointAY + t * (pointBY - pointAY)
    // x = pointAX + t * (pointBX - pointAX)
    // At interfaceY: t = (interfaceY - pointAY) / (pointBY - pointAY)
    const t = (interfaceY - pointAY) / (pointBY - pointAY);
    const straightX = pointAX + t * (pointBX - pointAX);
    const straightOPL = calculateOPL(straightX);

    return {
      optimalX: bestX,
      optimalOPL: minOPL,
      actualX: straightX,
      actualOPL: straightOPL
    };
  }, [pointAX, pointBX, n1, n2]);

  // Calculate angles for display
  const theta1Rad = Math.atan2(Math.abs(actualX - pointAX), interfaceY - pointAY);
  const theta2Rad = Math.atan2(Math.abs(pointBX - actualX), pointBY - interfaceY);
  const theta1Deg = (theta1Rad * 180) / Math.PI;
  const theta2Deg = (theta2Rad * 180) / Math.PI;

  // Calculate path savings
  const pathSavings = ((actualOPL - optimalOPL) / actualOPL) * 100;
  const isOptimal = Math.abs(actualX - optimalX) < 1;

  return (
    <div className="glass-card p-4 rounded-xl space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white">费马原理：最短时间路径</h3>
        <span className="text-[10px] text-gray-400 font-mono">
          OPL = n₁d₁ + n₂d₂
        </span>
      </div>

      {/* SVG Visualization */}
      <div className="relative bg-black/40 rounded-xl overflow-hidden border border-white/10">
        <svg viewBox="0 0 300 300" className="w-full h-auto">
          {/* Medium 1 (Top) - lighter background */}
          <rect x="0" y="0" width="300" height="150" fill="rgba(59, 130, 246, 0.05)" />
          {/* Medium 2 (Bottom) - darker background */}
          <rect x="0" y="150" width="300" height="150" fill="rgba(139, 92, 246, 0.05)" />

          {/* Interface line */}
          <line x1="0" y1="150" x2="300" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <text x="280" y="145" className="fill-gray-500 text-[8px]">界面</text>

          {/* Normal line at actual intersection */}
          <line
            x1={actualX}
            y1="0"
            x2={actualX}
            y2="300"
            stroke="rgba(255,255,255,0.15)"
            strokeDasharray="3 3"
            strokeWidth="1"
          />

          {/* Optimal path (dashed, when different from actual) */}
          {!isOptimal && (
            <>
              <line
                x1={pointAX}
                y1={pointAY}
                x2={optimalX}
                y2={interfaceY}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                strokeDasharray="4 2"
              />
              <line
                x1={optimalX}
                y1={interfaceY}
                x2={pointBX}
                y2={pointBY}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                strokeDasharray="4 2"
              />
            </>
          )}

          {/* Actual path - Incident ray */}
          <line
            x1={pointAX}
            y1={pointAY}
            x2={actualX}
            y2={interfaceY}
            stroke="#f59e0b"
            strokeWidth="2.5"
          />

          {/* Actual path - Refracted ray */}
          <line
            x1={actualX}
            y1={interfaceY}
            x2={pointBX}
            y2={pointBY}
            stroke="#3b82f6"
            strokeWidth="2.5"
          />

          {/* Point A (source) */}
          <circle cx={pointAX} cy={pointAY} r="6" fill="#f59e0b" />
          <text x={pointAX - 8} y={pointAY - 10} className="fill-amber-400 text-[10px] font-bold">A</text>

          {/* Point B (destination) */}
          <circle cx={pointBX} cy={pointBY} r="6" fill="#3b82f6" />
          <text x={pointBX + 8} y={pointBY + 15} className="fill-blue-400 text-[10px] font-bold">B</text>

          {/* Intersection point */}
          <circle cx={actualX} cy={interfaceY} r="4" fill="white" />

          {/* Angle arcs */}
          {/* theta1 - incident angle */}
          <path
            d={`M ${actualX} ${interfaceY - 30} A 30 30 0 0 ${pointAX < actualX ? 1 : 0} ${actualX + (pointAX < actualX ? -30 : 30) * Math.sin(theta1Rad)} ${interfaceY - 30 * Math.cos(theta1Rad)}`}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <text
            x={actualX + (pointAX < actualX ? -25 : 15)}
            y={interfaceY - 20}
            className="fill-amber-400 text-[9px]"
          >
            θ₁={theta1Deg.toFixed(1)}°
          </text>

          {/* theta2 - refracted angle */}
          <path
            d={`M ${actualX} ${interfaceY + 30} A 30 30 0 0 ${pointBX > actualX ? 0 : 1} ${actualX + (pointBX > actualX ? 30 : -30) * Math.sin(theta2Rad)} ${interfaceY + 30 * Math.cos(theta2Rad)}`}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <text
            x={actualX + (pointBX > actualX ? 15 : -35)}
            y={interfaceY + 35}
            className="fill-blue-400 text-[9px]"
          >
            θ₂={theta2Deg.toFixed(1)}°
          </text>

          {/* Medium labels */}
          <text x="10" y="30" className="fill-gray-500 text-[9px] uppercase tracking-wider">介质1 (n₁={n1})</text>
          <text x="10" y="280" className="fill-gray-500 text-[9px] uppercase tracking-wider">介质2 (n₂={n2})</text>

          {/* Optimal point indicator */}
          {!isOptimal && (
            <circle cx={optimalX} cy={interfaceY} r="4" fill="none" stroke="#10b981" strokeWidth="2" />
          )}
        </svg>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Point A X position */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span>起点 A 位置</span>
            <span className="font-mono">x={pointAX}</span>
          </div>
          <input
            type="range"
            min="20"
            max="280"
            step="5"
            value={pointAX}
            onChange={(e) => setPointAX(parseInt(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>

        {/* Point B X position */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span>终点 B 位置</span>
            <span className="font-mono">x={pointBX}</span>
          </div>
          <input
            type="range"
            min="20"
            max="280"
            step="5"
            value={pointBX}
            onChange={(e) => setPointBX(parseInt(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        {/* Refractive indices */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>介质1折射率 n₁</span>
              <span className="font-mono">{n1.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="2.0"
              step="0.05"
              value={n1}
              onChange={(e) => setN1(parseFloat(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <span>介质2折射率 n₂</span>
              <span className="font-mono">{n2.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="2.0"
              step="0.05"
              value={n2}
              onChange={(e) => setN2(parseFloat(e.target.value))}
              className="w-full accent-secondary"
            />
          </div>
        </div>
      </div>

      {/* OPL Comparison */}
      <div className="space-y-2">
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
          <div>
            <span className="text-[10px] text-gray-500 uppercase">当前路径 OPL</span>
            <div className="text-lg font-mono text-white">{actualOPL.toFixed(2)}</div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-500 uppercase">最优路径 OPL</span>
            <div className={`text-lg font-mono ${isOptimal ? 'text-green-400' : 'text-emerald-400'}`}>
              {optimalOPL.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Path savings indicator */}
        {!isOptimal ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-amber-400">
                相比直线多走: {((actualOPL - optimalOPL)).toFixed(2)} 单位
              </span>
              <span className="text-xs font-bold text-amber-400">
                +{pathSavings.toFixed(2)}%
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              调整起点A和终点B位置，观察光如何自动选择最省时的路径
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs text-green-400 font-medium">
                完美！当前路径即为光学最短路径
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Explanation */}
      <div className="glass-panel p-4 text-[11px] text-gray-400 space-y-2">
        <p className="font-bold text-white flex gap-2 items-center">
          <span className="text-primary-400 uppercase tracking-tighter">费马原理</span>
        </p>
        <p>
          光线从A点到B点，实际走过的路径是<strong className="text-white">光程(OPL)最短</strong>的那条。
          光程 = 折射率 × 几何路径，反映的是光传播的&quot;时间成本&quot;。
        </p>
        <p className="text-gray-500">
          当 n₁ ≠ n₂ 时，直线路径不再是光程最短的路径。光线会在界面处偏折，
          使得 n₁d₁ + n₂d₂ 最小化 —— 这正是<strong className="text-white">斯涅尔定律</strong>的物理本质。
        </p>
      </div>
    </div>
  );
}
