"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { RotateCcw, Share2, Twitter, Copy, CheckCircle } from "lucide-react";
import { decodeAnswers, diagnose } from "@/lib/career-quest/scoring";
import type { DiagnosisResult, StatusValues } from "@/lib/career-quest/types";
import { jobTypes } from "@/lib/career-quest/data";

function StatusBar({
  label,
  value,
  color,
  delay,
}: {
  label: string;
  value: number;
  color: string;
  delay: number;
}) {
  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const t0 = Date.now();
      function tick() {
        const p = Math.min((Date.now() - t0) / 800, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setAnimated(Math.round(ease * value));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return (
    <div className="flex items-center gap-3">
      <span className="min-w-[80px] text-[12px] font-medium text-slate-400">{label}</span>
      <div className="h-[8px] flex-1 overflow-hidden rounded-full bg-white/[0.08]">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${animated}%`, background: color }}
        />
      </div>
      <span className="min-w-[28px] text-right text-[13px] font-bold tabular-nums" style={{ color }}>
        {animated}
      </span>
    </div>
  );
}

function RadarChart({ status }: { status: StatusValues }) {
  const data = [
    { label: "突破力", val: status.breakthrough },
    { label: "調整魔法", val: status.coordination },
    { label: "論理シールド", val: status.logic },
    { label: "創造の炎", val: status.creativity },
    { label: "共感センサー", val: status.empathy },
  ];
  const cx = 150, cy = 140, r = 100;
  const N = data.length;
  const step = (2 * Math.PI) / N;
  const sa = -Math.PI / 2;
  const pt = (i: number, f: number) => ({
    x: cx + f * r * Math.cos(sa + i * step),
    y: cy + f * r * Math.sin(sa + i * step),
  });

  return (
    <svg width="100%" viewBox="0 0 300 290" className="block">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon
          key={f}
          points={data.map((_, i) => { const p = pt(i, f); return `${p.x},${p.y}`; }).join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}
      {data.map((_, i) => {
        const p = pt(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />;
      })}
      <polygon
        points={data.map((d, i) => { const p = pt(i, d.val / 100); return `${p.x},${p.y}`; }).join(" ")}
        fill="rgba(168,85,247,0.2)"
        stroke="#A855F7"
        strokeWidth="2.5"
      />
      {data.map((d, i) => {
        const p = pt(i, d.val / 100);
        return <circle key={i} cx={p.x} cy={p.y} r="4" fill="#A855F7" stroke="#0F0A2A" strokeWidth="2" />;
      })}
      {data.map((d, i) => {
        const p = pt(i, 1.28);
        const anchor = p.x < cx - 5 ? "end" : p.x > cx + 5 ? "start" : "middle";
        return (
          <text key={i} x={p.x} y={p.y + 4} textAnchor={anchor} fontSize="11" fill="#94A3B8" fontWeight="500">
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const msgs = [
    "冒険者の記録を読み込み中...",
    "MBTIスコアを算出中...",
    "適職タイプを照合中...",
    "ステータスを計算中...",
    "診断レポートを生成中...",
  ];

  useEffect(() => {
    const pi = setInterval(() => setProgress((p) => Math.min(p + 1.3, 99)), 30);
    const mi = setInterval(() => setMsgIdx((i) => Math.min(i + 1, msgs.length - 1)), 550);
    return () => { clearInterval(pi); clearInterval(mi); };
  }, [msgs.length]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F0A2A] px-5">
      <div className="text-center">
        <div className="mx-auto mb-6 h-16 w-16 animate-spin rounded-full border-[3px] border-white/[0.08] border-t-purple-500" />
        <h2 className="mb-2 text-xl font-bold text-white">診断中...</h2>
        <p className="mb-6 min-h-[20px] text-[13px] text-slate-500">{msgs[msgIdx]}</p>
        <div className="mx-auto max-w-[260px] overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-[5px] rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-slate-600">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}

function ResultContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const result: DiagnosisResult | null = useMemo(() => {
    const d = searchParams.get("d");
    if (!d) return null;
    const answers = decodeAnswers(d);
    if (!answers || answers.length === 0) return null;
    return diagnose(answers);
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareX = () => {
    if (!result) return;
    const text = `キャリアクエスト診断の結果は「${result.job.title}」(${result.job.jobName})でした！\n\n${result.job.emoji} ${result.job.soulAnalysis.slice(0, 50)}...\n\n#キャリアクエスト #就活 #MBTI診断`;
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, "_blank");
  };

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F0A2A]">
        <div className="text-center">
          <p className="mb-4 text-slate-500">診断データが見つかりません</p>
          <Link href="/career-quest" className="text-purple-400 underline">
            トップに戻る
          </Link>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingScreen />;

  const r = result;
  const partner = jobTypes.find((j) => j.mbti === r.job.bestPartner);
  const statusLabels: { key: keyof StatusValues; label: string; color: string }[] = [
    { key: "breakthrough", label: "突破力", color: "#EF4444" },
    { key: "coordination", label: "調整魔法", color: "#3B82F6" },
    { key: "logic", label: "論理シールド", color: "#06B6D4" },
    { key: "creativity", label: "創造の炎", color: "#F59E0B" },
    { key: "empathy", label: "共感センサー", color: "#10B981" },
  ];

  return (
    <div className="min-h-screen bg-[#0F0A2A]">
      {/* Hero */}
      <div className="relative overflow-hidden px-5 pb-8 pt-12">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full blur-[100px]"
            style={{ background: `${r.job.color}15` }}
          />
        </div>
        <div className="relative mx-auto max-w-[640px] text-center">
          <div className="animate-fade-up mb-2 text-[11px] font-semibold tracking-[0.15em] text-purple-400">
            YOUR CAREER QUEST RESULT
          </div>
          <div className="animate-fade-up [animation-delay:100ms] mb-1 text-6xl">{r.job.emoji}</div>
          <h1
            className="animate-fade-up [animation-delay:200ms] mb-1 text-[clamp(28px,6vw,40px)] font-black text-white"
          >
            {r.job.title}
          </h1>
          <div className="animate-fade-up [animation-delay:280ms] mb-4 flex items-center justify-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-[12px] font-bold"
              style={{ background: `${r.job.color}20`, color: r.job.color }}
            >
              {r.mbtiType}
            </span>
            <span className="text-[13px] text-slate-500">{r.job.jobName}</span>
          </div>
          <p className="animate-fade-up [animation-delay:360ms] mx-auto max-w-[440px] text-[14px] leading-[1.85] text-slate-400">
            {r.job.soulAnalysis}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[640px] px-5 pb-16">
        {/* Status */}
        <div className="animate-fade-up [animation-delay:440ms] mb-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
          <h3 className="mb-4 flex items-center gap-2 text-[14px] font-bold text-white">
            <span className="h-4 w-1 rounded-sm bg-purple-500" />
            ステータス
          </h3>
          <div className="mb-4 flex justify-center">
            <div className="w-full max-w-[280px]">
              <RadarChart status={r.status} />
            </div>
          </div>
          <div className="space-y-3">
            {statusLabels.map((s, i) => (
              <StatusBar
                key={s.key}
                label={s.label}
                value={r.status[s.key]}
                color={s.color}
                delay={i * 120}
              />
            ))}
          </div>
        </div>

        {/* Details grid */}
        <div className="animate-fade-up [animation-delay:520ms] mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Strengths */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
            <h4 className="mb-2 text-[12px] font-semibold text-emerald-400">得意武器</h4>
            <p className="text-[14px] font-medium leading-[1.7] text-white">{r.job.strengths}</p>
          </div>
          {/* Weakness */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
            <h4 className="mb-2 text-[12px] font-semibold text-rose-400">呪いの装備</h4>
            <p className="text-[14px] font-medium leading-[1.7] text-white">{r.job.weakness}</p>
          </div>
          {/* Recommended */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
            <h4 className="mb-2 text-[12px] font-semibold text-amber-400">おすすめ冒険先</h4>
            <p className="text-[14px] font-medium leading-[1.7] text-white">{r.job.recommendedField}</p>
          </div>
          {/* Negative loop */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
            <h4 className="mb-2 text-[12px] font-semibold text-red-400">就活の負のループ</h4>
            <p className="text-[14px] font-medium leading-[1.7] text-white">{r.job.negativeLoop}</p>
          </div>
        </div>

        {/* Best partner */}
        {partner && (
          <div className="animate-fade-up [animation-delay:600ms] mb-4 rounded-2xl border border-purple-500/20 bg-purple-500/[0.06] p-5">
            <h4 className="mb-3 text-[12px] font-semibold text-purple-400">伝説の相棒</h4>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{partner.emoji}</span>
              <div>
                <div className="text-[15px] font-bold text-white">
                  {partner.title}
                  <span className="ml-2 text-[12px] font-normal text-slate-500">
                    {partner.mbti} / {partner.jobName}
                  </span>
                </div>
                <p className="mt-1 text-[13px] leading-[1.7] text-slate-400">
                  {r.job.bestPartnerReason}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Share */}
        <div className="animate-fade-up [animation-delay:680ms] mb-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
          <h4 className="mb-3 flex items-center gap-2 text-[14px] font-bold text-white">
            <Share2 className="h-4 w-4 text-purple-400" />
            結果をシェア
          </h4>
          <div className="flex gap-2">
            <button
              onClick={handleShareX}
              className="flex items-center gap-2 rounded-xl bg-white/[0.08] px-4 py-[10px] text-[13px] font-medium text-white transition-colors hover:bg-white/[0.12]"
            >
              <Twitter className="h-4 w-4" />
              X (Twitter)
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 rounded-xl bg-white/[0.08] px-4 py-[10px] text-[13px] font-medium text-white transition-colors hover:bg-white/[0.12]"
            >
              {copied ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              {copied ? "コピーしました" : "リンクをコピー"}
            </button>
          </div>
        </div>

        {/* Restart */}
        <div className="animate-fade-up [animation-delay:760ms] text-center">
          <Link
            href="/career-quest"
            className="inline-flex items-center gap-2 rounded-full border-2 border-purple-500/50 px-8 py-[12px] text-[14px] font-bold text-purple-400 transition-all hover:border-purple-500 hover:bg-purple-500/10"
          >
            <RotateCcw className="h-4 w-4" />
            もう一度診断する
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CareerQuestResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0F0A2A]">
          <div className="h-16 w-16 animate-spin rounded-full border-[3px] border-white/[0.08] border-t-purple-500" />
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
