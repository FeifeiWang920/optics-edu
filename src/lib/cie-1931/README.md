# CIE 1931 色品图库

一个基于 CIE 15: Colorimetry 标准和 IEC 61966-2-1 sRGB 规范的 CIE 1931 色品图渲染库。

## 特性

- ✅ 符合 **CIE 15: Colorimetry** 标准的算法实现
- ✅ 基于 **IEC 61966-2-1 sRGB** 标准的颜色转换
- ✅ 精确的 xyY → XYZ → sRGB 转换流程
- ✅ 正确的色域外颜色处理（保持色调）
- ✅ sRGB gamma 校正 (EOTF)
- ✅ 光谱轨迹、普朗克轨迹、sRGB 色域边界显示
- ✅ 交互式坐标读取
- ✅ 完整的 TypeScript 类型支持

## 安装

将 `src/lib/cie-1931` 目录复制到您的项目中。

## 快速开始

### 1. 使用 React 组件（推荐）

```tsx
import CIE1931Explorer from '@/lib/cie-1931/Explorer';

export default function ColorPage() {
  const handlePointSelect = (point) => {
    console.log('Selected:', point.x, point.y);
  };

  return (
    <div className="p-6">
      <CIE1931Explorer
        width="100%"
        onPointSelect={handlePointSelect}
        showWavelengthLabels={true}
        showPlanckianLocus={true}
        showSRGBGamut={true}
        showWhitePoints={true}
      />
    </div>
  );
}
```

### 2. 自定义样式（使用 Tailwind CSS）

```tsx
import CIE1931Explorer from '@/lib/cie-1931/Explorer';

export default function ColorPage() {
  return (
    <div className="glass-panel p-6 space-y-5">
      <h2 className="text-2xl font-bold text-white">色度学</h2>
      <CIE1931Explorer width="100%" />
    </div>
  );
}
```

### 3. 自定义参考点

```tsx
import CIE1931Explorer from '@/lib/cie-1931/Explorer';

export default function ColorPage() {
  const customPoints = [
    { x: 0.64, y: 0.33, label: 'R', desc: 'sRGB 红色' },
    { x: 0.30, y: 0.60, label: 'G', desc: 'sRGB 绿色' },
    { x: 0.15, y: 0.06, label: 'B', desc: 'sRGB 蓝色' },
  ];

  return <CIE1931Explorer customPoints={customPoints} />;
}
```

## 高级用法

### 生成自定义大小的色品图

```tsx
import CIE1931Explorer from '@/lib/cie-1931/Explorer';

export default function ColorPage() {
  return (
    <CIE1931Explorer
      width="800px"
      canvasConfig={{
        width: 800,
        height: 770,
        padding: 60,
      }}
    />
  );
}
```

### 使用底层 API（非 React）

```ts
import { generateCIEChromaticityDataURL } from '@/lib/cie-1931/generator';
import { xyToRgb } from '@/lib/cie-1931/utils';

// 生成色品图图像
const imageUrl = generateCIEChromaticityDataURL({
  width: 1200,
  height: 1150,
  padding: 80,
});

// 转换色品坐标到 RGB
const [r, g, b] = xyToRgb(0.3127, 0.3290); // D65 白光
console.log(`RGB: (${r.toFixed(3)}, ${g.toFixed(3)}, ${b.toFixed(3)})`);
```

### 生成 ImageData 用于 Canvas

```ts
import { generateCIEChromaticityDiagram } from '@/lib/cie-1931/generator';

const imageData = generateCIEChromaticityDiagram({ width: 800, height: 770 });

const canvas = document.createElement('canvas');
canvas.width = imageData.width;
canvas.height = imageData.height;
const ctx = canvas.getContext('2d')!;
ctx.putImageData(imageData, 0, 0);

document.body.appendChild(canvas);
```

## API 文档

### `CIE1931Explorer` 组件

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `width` | `string` | `'100%'` | 组件宽度 |
| `onPointSelect` | `(point) => void` | `undefined` | 点击回调，返回选中的色品坐标 |
| `showWavelengthLabels` | `boolean` | `true` | 是否显示光谱轨迹波长标签 |
| `showPlanckianLocus` | `boolean` | `true` | 是否显示普朗克轨迹 |
| `showSRGBGamut` | `boolean` | `true` | 是否显示 sRGB 色域三角形 |
| `showWhitePoints` | `boolean` | `true` | 是否显示参考白点 |
| `customPoints` | `Array<{x, y, label, desc}>` | `[]` | 自定义参考点 |
| `canvasConfig` | `Partial<CANVAS_CONFIG>` | `undefined` | 画布配置覆盖 |

### 工具函数

#### `xyToRgb(x: number, y: number): [number, number, number]`

将 CIE xy 色品坐标转换为 RGB 值（0-1）。

```ts
const [r, g, b] = xyToRgb(0.3127, 0.3290);
```

#### `wavelengthToHsl(nm: number): string`

将波长转换为 HSL 颜色字符串（用于光谱轨迹边界线）。

```ts
const color = wavelengthToHsl(520); // "hsl(135, 100%, 50%)"
```

#### `cieToCanvas(cx, cy, config): [number, number]`

将 CIE 色品坐标转换为画布像素坐标。

#### `canvasToCie(px, py, config): [number, number]`

将画布像素坐标转换为 CIE 色品坐标。

#### `isInsideSRGBGamut(x, y, primaries): boolean`

判断点是否在 sRGB 色域内。

### 生成器函数

#### `generateCIEChromaticityDiagram(options): ImageData`

生成色品图的 ImageData 对象。

#### `generateCIEChromaticityDataURL(options): string`

生成色品图的 Data URL（PNG 格式）。

#### `generateCIEChromaticityDiagramAsync(options): Promise<ImageData>`

异步生成色品图（避免阻塞 UI）。

### 常量

#### `SPECTRAL_LOCUS`

CIE 1931 2° 标准色度观察者光谱轨迹数据（380-780nm，5nm 间隔）。

#### `PLANCKIAN_LOCUS`

普朗克轨迹（黑体辐射色温曲线）。

#### `SRGB_PRIMARIES`

sRGB 原色坐标 `{ red, green, blue }`。

#### `WHITEPOINTS`

标准白点 `{ D65, E, D50 }`。

#### `CANVAS_CONFIG`

画布配置常量 `{ width, height, padding, xMin, xMax, yMin, yMax }`。

## 技术细节

### 颜色转换流程

```
CIE xy 色品坐标
    ↓
xyY → XYZ 转换 (Y = 1.0)
    ↓
XYZ → 线性 sRGB (3×3 变换矩阵)
    ↓
色域外处理（裁剪负值，归一化超限值）
    ↓
sRGB Gamma 校正 (EOTF)
    ↓
RGB 值 (0-1)
```

### 色域外处理

- **负值处理**：裁剪到 0
- **超限值处理**：归一化到 [0, 1] 范围，保持色调

### 标准参考

- **CIE 15: Colorimetry** - 色度学基础标准
- **IEC 61966-2-1** - sRGB 颜色空间规范

## 注意事项

1. **绿色区域分界线**：520nm 等高饱和度光谱色超出 sRGB 色域，被压缩到可显示范围内，会在边界处产生视觉过渡。这是正常现象。

2. **左下角颜色**：380nm-460nm 波段的光谱色在 CIE 空间中包含红色分量，显示为蓝紫色，不是纯蓝色。

3. **显示设备限制**：实际显示效果取决于显示设备的色域和颜色配置文件。广色域显示器可显示更多颜色。

## 示例项目

查看 `src/app/color/page.tsx` 获取完整示例。

## 许可

基于 CIE 15: Colorimetry 和 IEC 61966-2-1 标准实现。

## 贡献

欢迎提交 Issue 和 Pull Request。

---

**版本**: 1.0.0
**最后更新**: 2026-03-23
**维护者**: optics-edu 项目