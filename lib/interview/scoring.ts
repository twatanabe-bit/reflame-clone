import type { InterviewScores, InterviewPhase, DialogTurn } from "./types";

/** ユーザー回答からスコアをリアルタイム分析 */
export function analyzeResponse(
  text: string,
  phase: InterviewPhase
): InterviewScores {
  const len = text.length;

  // ── 論理性：構造的な表現があるか ──
  const logicKeywords = [
    "なぜなら", "理由は", "具体的に", "例えば", "結果として",
    "まず", "次に", "最後に", "したがって", "つまり",
    "第一に", "その結果", "このため", "一方で", "加えて",
  ];
  const logicHits = logicKeywords.filter((kw) => text.includes(kw)).length;
  const logic = clamp(40 + logicHits * 8 + Math.min(len / 8, 20));

  // ── 熱量：感情表現・強い言葉 ──
  const passionKeywords = [
    "本気", "全力", "情熱", "絶対", "必ず", "夢", "挑戦",
    "成長", "頑張", "努力", "やりがい", "感動", "覚悟",
    "！", "!",
  ];
  const passionHits = passionKeywords.filter((kw) => text.includes(kw)).length;
  const passion = clamp(38 + passionHits * 7 + Math.min(len / 10, 18));

  // ── 独自性：ありきたりでないか（一般的な定型表現の少なさ） ──
  const genericPhrases = [
    "コミュニケーション能力", "チームワーク", "リーダーシップ",
    "御社の理念", "成長できる", "社会貢献", "グローバル",
  ];
  const genericHits = genericPhrases.filter((kw) => text.includes(kw)).length;
  // 数字を使うと具体性UP
  const hasNumbers = /\d+/.test(text);
  const originality = clamp(
    50 + (hasNumbers ? 12 : 0) - genericHits * 6 + Math.min(len / 12, 15)
  );

  // ── 簡潔さ：適切な長さか（長すぎず短すぎず） ──
  const idealLen = phase === "intro" ? 120 : 200;
  const lenDiff = Math.abs(len - idealLen);
  const conciseness = clamp(80 - lenDiff / 4);

  // ── 印象：総合的な表現力 ──
  const hasPoliteness = /です|ます|ございます/.test(text);
  const impression = clamp(
    35 +
    (hasPoliteness ? 10 : 0) +
    Math.min(logicHits * 3, 12) +
    Math.min(passionHits * 3, 12) +
    Math.min(len / 10, 20)
  );

  return { logic, passion, originality, conciseness, impression };
}

/** 全ダイアログからの累積スコア算出 */
export function calculateSessionScores(
  dialog: DialogTurn[]
): InterviewScores {
  const userTurns = dialog.filter((t) => t.speaker === "user");
  if (userTurns.length === 0) {
    return { logic: 50, passion: 50, originality: 50, conciseness: 50, impression: 50 };
  }

  const phases: InterviewPhase[] = [
    "intro", "gakuchika", "motivation", "strength", "future", "reverse",
  ];

  const allScores = userTurns.map((turn, i) => {
    const phaseIdx = Math.min(Math.floor(i / 2), phases.length - 1);
    return analyzeResponse(turn.text, phases[phaseIdx]);
  });

  // 各スコアの加重平均（後半のフェーズほど重み高い）
  let totalWeight = 0;
  const sum = { logic: 0, passion: 0, originality: 0, conciseness: 0, impression: 0 };

  allScores.forEach((s, i) => {
    const weight = 1 + i * 0.3;
    totalWeight += weight;
    sum.logic += s.logic * weight;
    sum.passion += s.passion * weight;
    sum.originality += s.originality * weight;
    sum.conciseness += s.conciseness * weight;
    sum.impression += s.impression * weight;
  });

  return {
    logic: Math.round(sum.logic / totalWeight),
    passion: Math.round(sum.passion / totalWeight),
    originality: Math.round(sum.originality / totalWeight),
    conciseness: Math.round(sum.conciseness / totalWeight),
    impression: Math.round(sum.impression / totalWeight),
  };
}

/** スコアをURL安全な文字列にエンコード */
export function encodeScores(scores: InterviewScores): string {
  return btoa(JSON.stringify(scores));
}

/** URL文字列からスコアをデコード */
export function decodeScores(encoded: string): InterviewScores | null {
  try {
    return JSON.parse(atob(encoded));
  } catch {
    return null;
  }
}

function clamp(v: number, min = 30, max = 95): number {
  return Math.round(Math.max(min, Math.min(max, v)));
}
