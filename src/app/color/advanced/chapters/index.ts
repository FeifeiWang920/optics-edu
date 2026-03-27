// 章节内容组件导入和导出
import { Chapter01Rainbow as Chapter01RainbowType } from "./chapter-01-rainbow";
import { Chapter02Eye as Chapter02EyeType } from "./chapter-02-eye";
import { Chapter03Matching as Chapter03MatchingType } from "./chapter-03-matching";
import { Chapter04CIE1931 as Chapter04CIE1931Type } from "./chapter-04-cie1931";
import { Chapter05Diagram as Chapter05DiagramType } from "./chapter-05-diagram";
import { Chapter06DeltaE as Chapter06DeltaEType } from "./chapter-06-delta-e";
import { MacAdamDeepDive as MacAdamDeepDiveType } from "./chapter-06b-macadam-deep-dive";
import { Chapter07Metamerism as Chapter07MetamerismType } from "./chapter-07-metamerism";
import { Chapter08Automotive as Chapter08AutomotiveType } from "./chapter-08-automotive";

export { Chapter01Rainbow } from "./chapter-01-rainbow";
export { Chapter02Eye } from "./chapter-02-eye";
export { Chapter03Matching } from "./chapter-03-matching";
export { Chapter04CIE1931 } from "./chapter-04-cie1931";
export { Chapter05Diagram } from "./chapter-05-diagram";
export { Chapter06DeltaE } from "./chapter-06-delta-e";
export { MacAdamDeepDive } from "./chapter-06b-macadam-deep-dive";
export { Chapter07Metamerism } from "./chapter-07-metamerism";
export { Chapter08Automotive } from "./chapter-08-automotive";

// 章节配置数组
export const CHAPTERS = [
  {
    number: 1,
    id: "rainbow",
    title: "从彩虹说起",
    subtitle: "光的物理本质与可见光谱",
    difficulty: "beginner" as const,
    estimatedTime: 8,
    feynmanRef: "费曼物理学讲义 35-1",
  },
  {
    number: 2,
    id: "eye",
    title: "人眼的精密设计",
    subtitle: "视网膜与三色视觉系统",
    difficulty: "intermediate" as const,
    estimatedTime: 12,
    feynmanRef: "费曼物理学讲义 35-4",
  },
  {
    number: 3,
    id: "matching",
    title: "颜色匹配实验",
    subtitle: "格拉斯曼定律与加色混合",
    difficulty: "intermediate" as const,
    estimatedTime: 10,
    feynmanRef: "费曼物理学讲义 35-2",
  },
  {
    number: 4,
    id: "cie1931",
    title: "CIE 1931 标准系统",
    subtitle: "国际照明委员会的色度学基石",
    difficulty: "advanced" as const,
    estimatedTime: 15,
    cieRef: "CIE 15:2004",
  },
  {
    number: 5,
    id: "diagram",
    title: "读懂色品图",
    subtitle: "CIE 1931 xy 色度图的全面解析",
    difficulty: "intermediate" as const,
    estimatedTime: 12,
    cieRef: "CIE 15:2004 Section 6.4",
  },
  {
    number: 6,
    id: "delta-e",
    title: "均匀色空间与色差",
    subtitle: "从 CIE 1976 到 CIEDE2000",
    difficulty: "advanced" as const,
    estimatedTime: 15,
    cieRef: "CIE 15:2004 Section 7",
  },
  {
    number: 6.5,
    id: "macadam-deep-dive",
    title: "MacAdam 椭圆深度解析",
    subtitle: "人眼色觉差异感知的里程碑实验",
    difficulty: "advanced" as const,
    estimatedTime: 25,
    cieRef: "JOSA 1942, Vol. 32",
  },
  {
    number: 7,
    id: "metamerism",
    title: "同色异谱与色适应",
    subtitle: "光源变化下的颜色感知",
    difficulty: "advanced" as const,
    estimatedTime: 12,
    cieRef: "CIE 15:2004 Section 9",
  },
  {
    number: 8,
    id: "automotive",
    title: "车灯中的色度学实践",
    subtitle: "从理论到工程应用",
    difficulty: "intermediate" as const,
    estimatedTime: 10,
    cieRef: "ECE R48 / FMVSS 108",
  },
];

// 难度类型
export type Difficulty = "beginner" | "intermediate" | "advanced";

// 获取章节组件
export function getChapterComponent(number: number) {
  switch (number) {
    case 1:
      return Chapter01RainbowType;
    case 2:
      return Chapter02EyeType;
    case 3:
      return Chapter03MatchingType;
    case 4:
      return Chapter04CIE1931Type;
    case 5:
      return Chapter05DiagramType;
    case 6:
      return Chapter06DeltaEType;
    case 6.5:
      return MacAdamDeepDiveType;
    case 7:
      return Chapter07MetamerismType;
    case 8:
      return Chapter08AutomotiveType;
    default:
      return null;
  }
}

// 按难度筛选章节
export function filterChaptersByDifficulty(difficulty: Difficulty) {
  return CHAPTERS.filter((chapter) => chapter.difficulty === difficulty);
}

// 获取章节总学习时间（分钟）
export function getTotalLearningTime() {
  return CHAPTERS.reduce((sum, chapter) => sum + chapter.estimatedTime, 0);
}
