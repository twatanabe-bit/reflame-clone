"use client";

import { useMemo, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Trophy,
  TrendingUp,
  Star,
  MessageCircle,
} from "lucide-react";
import { CELEBRITY_PERSONAS, calculateRank, RANK_DEFINITIONS } from "@/lib/interview/data";
import { loadProgress, saveProgress } from "@/lib/interview/storage";
import type { InterviewScores, FeedbackItem } from "@/lib/interview/types";

// ===== Radar Chart (SVG) =====
function RadarChart({ scores }: { scores: InterviewScores }) {
  const labels = [
    { key: "logic", label: "論理性" },
    { key: "passion", label: "熱量" },
    { key: "originality", label: "独自性" },
    { key: "conciseness", label: "簡潔さ" },
    { key: "impression", label: "印象" },
  ] as const;

  const cx = 120;
  const cy = 120;
  const maxR = 90;

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
    const r = (value / 100) * maxR;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const gridLevels = [20, 40, 60, 80, 100];

  return (
    <svg viewBox="0 0 240 240" className="w-full max-w-[280px]">
      {/* Grid */}
      {gridLevels.map((level) => (
        <polygon
          key={level}
          points={labels
            .map((_, i) => {
              const p = getPoint(i, level);
              return `${p.x},${p.y}`;
            })
            .join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
      ))}

      {/* Axes */}
      {labels.map((_, i) => {
        const p = getPoint(i, 100);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={labels
          .map((l, i) => {
            const p = getPoint(i, scores[l.key]);
            return `${p.x},${p.y}`;
          })
          .join(" ")}
        fill="rgba(139,92,246,0.2)"
        stroke="#8B5CF6"
        strokeWidth="2"
      />

      {/* Data points */}
      {labels.map((l, i) => {
        const p = getPoint(i, scores[l.key]);
        return <circle key={i} cx={p.x} cy={p.y} r="4" fill="#8B5CF6" />;
      })}

      {/* Labels */}
      {labels.map((l, i) => {
        const p = getPoint(i, 118);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-400 text-[11px]"
          >
            {l.label}
          </text>
        );
      })}
    </svg>
  );
}

// ===== Score Bar =====
function ScoreBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="min-w-[56px] text-xs text-slate-400">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
      <span className="min-w-[28px] text-right text-xs font-bold" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

// ===== Rank Progress Bar =====
function RankProgressBar({
  exp,
}: {
  exp: number;
}) {
  const { current, next, progress } = calculateRank(exp);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{current.emoji}</span>
          <div>
            <p className="text-sm font-bold text-white">{current.title}</p>
            <p className="text-[10px] text-slate-500">Lv.{current.level}</p>
          </div>
        </div>
        {next && (
          <div className="flex items-center gap-2 text-slate-500">
            <ArrowRight className="h-3.5 w-3.5" />
            <div className="text-right">
              <p className="text-xs text-slate-400">
                {next.emoji} {next.title}
              </p>
              <p className="text-[10px]">
                あと{next.expRequired - exp}EXP
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-1.5 text-right text-[10px] text-slate-500">
        {exp} / {next?.expRequired || "MAX"} EXP
      </p>
    </div>
  );
}

export default function InterviewResultPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-gradient-to-br from-[#0A1628] to-[#1E40AF] text-white">読み込み中...</div>}>
      <InterviewResultContent />
    </Suspense>
  );
}

function InterviewResultContent() {
  const searchParams = useSearchParams();
  const personaId = searchParams.get("persona");

  const persona = useMemo(
    () => CELEBRITY_PERSONAS.find((p) => p.id === personaId) || CELEBRITY_PERSONAS[0],
    [personaId]
  );

  // Load real scores from sessionStorage (set by session page), fallback to random
  const scores: InterviewScores = useMemo(() => {
    if (typeof window === "undefined") {
      return { logic: 65, passion: 65, originality: 60, conciseness: 62, impression: 64 };
    }
    try {
      const raw = sessionStorage.getItem("interview-scores");
      if (raw) {
        const parsed = JSON.parse(raw);
        // Clear after reading so refreshing the page doesn't reuse
        sessionStorage.removeItem("interview-scores");
        return parsed as InterviewScores;
      }
    } catch {}
    // Fallback for direct access
    const r = () => Math.floor(Math.random() * 25) + 58;
    return { logic: r(), passion: r(), originality: r(), conciseness: r(), impression: r() };
  }, []);

  const totalScore = useMemo(
    () =>
      Math.round(
        (scores.logic + scores.passion + scores.originality + scores.conciseness + scores.impression) / 5
      ),
    [scores]
  );

  const exp = useMemo(() => totalScore * 2, [totalScore]);

  // Save EXP to localStorage for cumulative progression
  const [cumulativeExp, setCumulativeExp] = useState(exp);
  useEffect(() => {
    const progress = saveProgress(exp);
    setCumulativeExp(progress.totalExp);
  }, [exp]);

  // Generate persona-specific feedback
  const feedback: FeedbackItem[] = useMemo(() => {
    const { values, name } = persona;
    return [
      {
        category: "論理性",
        score: scores.logic,
        comment: `${name}「${values.speechRhythm.fillerWords[0] || ""}、話の筋は通ってる${values.speechRhythm.sentenceEnding[0] || ""}。でもね、結論→理由→具体例の順番をもっと意識すると、面接官の心に刺さるよ。」`,
        improvement: "PREP法（Point-Reason-Example-Point）を意識して回答を構成する",
      },
      {
        category: "熱量・パッション",
        score: scores.passion,
        comment: `${name}「${values.catchphrases[0] || ""} 言葉に気持ちを込めろ。棒読みじゃ伝わらないよ。」`,
        improvement: "自分が本当に情熱を持てるエピソードを中心に据える",
      },
      {
        category: "独自性",
        score: scores.originality,
        comment: `${name}「みんなが言いそうな回答だったかな。${values.preferredWords[0] || "本気"}で向き合った経験を、もっと自分の言葉で語って。」`,
        improvement: "テンプレート回答を避け、自分だけの具体的なエピソードを入れる",
      },
    ];
  }, [persona, scores]);

  const gradeLabel = totalScore >= 80 ? "S" : totalScore >= 70 ? "A" : totalScore >= 60 ? "B" : "C";
  const gradeColor =
    totalScore >= 80 ? "text-amber-400" : totalScore >= 70 ? "text-purple-400" : totalScore >= 60 ? "text-blue-400" : "text-slate-400";

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0A1628] to-[#1E40AF] px-6 pb-20">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-[880px]">
        {/* Header */}
        <div className="flex items-center gap-4 pt-8">
          <Link
            href="/interview"
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs text-slate-400 transition hover:bg-white/10"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            アバター選択へ
          </Link>
        </div>

        {/* Title */}
        <div className="animate-fade-up mt-8 flex items-center gap-4">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${persona.avatarGradient} text-3xl shadow-xl`}
          >
            {persona.avatarEmoji}
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">面接結果レポート</h1>
            <p className="text-sm text-slate-400">
              面接官：{persona.name}（{persona.styleLabel}）
            </p>
          </div>
        </div>

        {/* Score KPI Cards */}
        <div className="animate-fade-up [animation-delay:100ms] mt-8 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.06] p-5 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <Trophy className="h-4 w-4 text-amber-400" />
              <span className="text-[11px] text-slate-500">総合スコア</span>
            </div>
            <div className="mt-2 text-4xl font-black text-white">{totalScore}</div>
            <div className={`mt-1 text-lg font-bold ${gradeColor}`}>
              ランク {gradeLabel}
            </div>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.06] p-5 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span className="text-[11px] text-slate-500">獲得EXP</span>
            </div>
            <div className="mt-2 text-4xl font-black text-emerald-400">+{exp}</div>
            <div className="mt-1 text-[11px] text-slate-500">ランクアップに貢献</div>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.06] p-5 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <Star className="h-4 w-4 text-purple-400" />
              <span className="text-[11px] text-slate-500">難易度</span>
            </div>
            <div className="mt-2 flex justify-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${i < persona.difficulty ? "fill-amber-400 text-amber-400" : "text-slate-600"}`}
                />
              ))}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">{persona.styleLabel}</div>
          </div>
        </div>

        {/* Rank Progress */}
        <div className="animate-fade-up [animation-delay:200ms] mt-6">
          <RankProgressBar exp={cumulativeExp} />
        </div>

        {/* Radar + Score Breakdown */}
        <div className="animate-fade-up [animation-delay:300ms] mt-6 grid gap-4 sm:grid-cols-2">
          {/* Radar Chart */}
          <div className="flex items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5">
            <RadarChart scores={scores} />
          </div>

          {/* Score Bars */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              スコア内訳
            </h3>
            <div className="space-y-3">
              <ScoreBar label="論理性" value={scores.logic} color="#8B5CF6" />
              <ScoreBar label="熱量" value={scores.passion} color="#E11D48" />
              <ScoreBar label="独自性" value={scores.originality} color="#0EA5E9" />
              <ScoreBar label="簡潔さ" value={scores.conciseness} color="#10B981" />
              <ScoreBar label="印象" value={scores.impression} color="#F59E0B" />
            </div>
          </div>
        </div>

        {/* Persona Feedback */}
        <div className="animate-fade-up [animation-delay:400ms] mt-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
            <MessageCircle className="h-5 w-5 text-purple-400" />
            「{persona.name}」からのフィードバック
          </h3>
          <div className="space-y-3">
            {feedback.map((item) => (
              <div
                key={item.category}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-white">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-purple-500/20 px-2.5 py-0.5 text-xs font-bold text-purple-300">
                    {item.score}点
                  </span>
                </div>
                <p className="mb-3 text-sm leading-relaxed text-slate-300">
                  {item.comment}
                </p>
                <div className="rounded-xl bg-white/[0.04] p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
                    改善アクション
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {item.improvement}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Encouragement */}
        <div className="animate-fade-up [animation-delay:500ms] mt-6 rounded-2xl border border-purple-500/20 bg-purple-500/[0.08] p-6 text-center">
          <div className="text-3xl">{persona.avatarEmoji}</div>
          <p className="mt-3 text-base font-bold leading-relaxed text-purple-200">
            「{persona.encouragement}」
          </p>
          <p className="mt-2 text-xs text-purple-400">─ {persona.name}</p>
        </div>

        {/* CTAs */}
        <div className="animate-fade-up [animation-delay:600ms] mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href={`/interview/session?persona=${persona.id}`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 px-8 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <RotateCcw className="h-4 w-4" />
            同じアバターで再挑戦
          </Link>
          <Link
            href="/interview"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-8 py-4 text-sm text-slate-400 transition hover:bg-white/10"
          >
            別のアバターを選ぶ
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
