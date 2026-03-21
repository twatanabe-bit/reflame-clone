"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { decodeAnswers, calcScore } from "@/lib/scoring";
import { DiagnosisResult, RadarPoint } from "@/lib/types";

function RadarChart({ data }: { data: RadarPoint[] }) {
  const cx = 170,
    cy = 142,
    r = 112;
  const N = data.length;
  const step = (2 * Math.PI) / N;
  const sa = -Math.PI / 2;
  const pt = (i: number, f: number) => ({
    x: cx + f * r * Math.cos(sa + i * step),
    y: cy + f * r * Math.sin(sa + i * step),
  });

  return (
    <svg width="100%" height="294" viewBox="0 0 340 294" className="block">
      {/* Grid polygons */}
      {[0.25, 0.5, 0.75, 1].map((f) => {
        const pts = data.map((_, i) => pt(i, f));
        return (
          <polygon
            key={f}
            points={pts.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
        );
      })}
      {/* Axis lines */}
      {data.map((_, i) => {
        const p = pt(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#E2E8F0" strokeWidth="1" />;
      })}
      {/* Data polygon */}
      <polygon
        points={data.map((d, i) => {
          const p = pt(i, d.val / 100);
          return `${p.x},${p.y}`;
        }).join(" ")}
        fill="rgba(30,64,175,0.18)"
        stroke="#1E40AF"
        strokeWidth="2.5"
      />
      {/* Data dots */}
      {data.map((d, i) => {
        const p = pt(i, d.val / 100);
        return <circle key={i} cx={p.x} cy={p.y} r="5" fill="#1E40AF" stroke="white" strokeWidth="2" />;
      })}
      {/* Labels */}
      {data.map((d, i) => {
        const p = pt(i, 1.3);
        const anchor = p.x < cx - 5 ? "end" : p.x > cx + 5 ? "start" : "middle";
        return (
          <text key={i} x={p.x} y={p.y + 4} textAnchor={anchor} fontSize="12" fill="#374151">
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
    "業界別マトリックスを照合中...",
    "スキルスコアを算出中...",
    "同世代データと比較分析中...",
    "市場価値レポートを生成中...",
  ];

  useEffect(() => {
    const pi = setInterval(() => setProgress((p) => Math.min(p + 1.6, 99)), 35);
    const mi = setInterval(() => setMsgIdx((i) => Math.min(i + 1, msgs.length - 1)), 650);
    return () => {
      clearInterval(pi);
      clearInterval(mi);
    };
  }, [msgs.length]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0A1628] to-[#1E40AF] px-6">
      <div className="text-center">
        <div className="mx-auto mb-[26px] h-[72px] w-[72px] animate-spin rounded-full border-[3px] border-white/[0.12] border-t-blue-400" />
        <h2 className="mb-2 text-[21px] font-bold text-white">診断中...</h2>
        <p className="mb-[26px] min-h-[20px] text-[13px] text-slate-400">{msgs[msgIdx]}</p>
        <div className="mx-auto max-w-[300px] overflow-hidden rounded-full bg-white/[0.12]">
          <div
            className="h-[5px] rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all"
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
  const [animatedMv, setAnimatedMv] = useState(0);

  const result: DiagnosisResult | null = useMemo(() => {
    const d = searchParams.get("d");
    if (!d) return null;
    const answers = decodeAnswers(d);
    if (!answers) return null;
    return calcScore(answers);
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && result) {
      const t0 = Date.now();
      const dur = 1800;
      function tick() {
        const t = Math.min((Date.now() - t0) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        setAnimatedMv(Math.round(ease * result!.mv));
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
  }, [loading, result]);

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-slate-500">診断データが見つかりません</p>
          <Link href="/" className="text-blue-600 underline">
            トップに戻る
          </Link>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingScreen />;

  const r = result;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0A1628] to-[#1E40AF] px-6 pb-24 pt-[52px]">
        <span className="pointer-events-none absolute -right-[60px] -top-[60px] select-none font-bold text-[240px] leading-none text-white opacity-[0.04]">
          03
        </span>
        <div className="relative z-10 mx-auto max-w-[980px]">
          {/* Section label */}
          <div className="mb-[26px] flex items-center gap-2">
            <div className="h-[22px] w-1 rounded-sm bg-blue-400" />
            <span className="text-xs font-semibold tracking-[0.1em] text-blue-300">
              MARKET VALUE DIAGNOSTIC REPORT 2025
            </span>
          </div>
          <h1 className="mb-8 text-[clamp(20px,3.8vw,32px)] font-black leading-[1.35] text-white">
            あなたの推定市場価値が算出されました
          </h1>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-[20px] border border-white/[0.13] bg-white/[0.09] p-[26px]">
              <div className="mb-[6px] text-xs font-medium text-blue-300">推定市場価値（年収）</div>
              <div className="text-[40px] font-bold leading-none text-white">
                ¥{animatedMv.toLocaleString()}
                <span className="text-[19px] font-semibold">万</span>
              </div>
              <div
                className="mt-[10px] inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  background: r.gap > 0 ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)",
                  color: r.gap > 0 ? "#4ADE80" : "#F87171",
                }}
              >
                {r.gap > 0 ? "▲" : "▼"} 現年収比 {r.gapPct > 0 ? "+" : ""}
                {r.gapPct}%
              </div>
            </div>
            <div className="rounded-[20px] border border-white/[0.13] bg-white/[0.09] p-[26px]">
              <div className="mb-[6px] text-xs font-medium text-blue-300">同世代 上位</div>
              <div className="text-[40px] font-bold leading-none text-white">
                {100 - r.pct}
                <span className="text-[19px] font-semibold">%</span>
              </div>
              <div className="mt-[9px] text-xs text-slate-500">20代転職市場における位置づけ</div>
            </div>
            <div className="rounded-[20px] border border-white/[0.13] bg-white/[0.09] p-[26px]">
              <div className="mb-[6px] text-xs font-medium text-blue-300">年収ギャップ</div>
              <div
                className="text-[40px] font-bold leading-none"
                style={{ color: r.gap > 0 ? "#4ADE80" : "#F87171" }}
              >
                {r.gap > 0 ? "+" : ""}
                {r.gap}
                <span className="text-[19px] font-semibold">万</span>
              </div>
              <div className="mt-[9px] text-xs text-slate-500">
                {r.gap > 0
                  ? "市場価値が現年収を上回っています"
                  : "現年収が市場価値を上回っています"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-20 mx-auto -mt-[52px] max-w-[980px] px-6">
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
          {/* Breakdown */}
          <div className="overflow-hidden rounded-[20px] border border-blue-200 bg-white shadow-[0_4px_22px_rgba(30,64,175,0.07)]">
            <div className="flex items-center gap-[10px] px-5 pt-7">
              <div className="h-[22px] w-1 rounded-sm bg-blue-800" />
              <h3 className="text-[15px] font-bold text-slate-900">スコア算出根拠</h3>
            </div>
            <p className="px-5 pb-[18px] text-xs text-slate-500">
              どの条件がどのくらい評価されたかを完全開示します
            </p>
            {r.breakdown.map((b, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-slate-50 px-5 py-[13px]"
              >
                <span className="text-[13px] text-slate-700">{b.label}</span>
                <span
                  className={`ml-3 whitespace-nowrap rounded-lg px-[10px] py-1 text-[13px] font-bold ${
                    b.pos ? "bg-blue-50 text-blue-800" : "bg-red-50 text-red-500"
                  }`}
                >
                  {b.value}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between bg-blue-50 px-5 py-4">
              <span className="text-sm font-bold text-blue-800">推定市場価値</span>
              <span className="text-[21px] font-black text-blue-800">¥{r.mv}万円</span>
            </div>
          </div>

          {/* Radar */}
          <div className="overflow-hidden rounded-[20px] border border-blue-200 bg-white shadow-[0_4px_22px_rgba(30,64,175,0.07)]">
            <div className="flex items-center gap-[10px] px-5 pt-7">
              <div className="h-[22px] w-1 rounded-sm bg-blue-800" />
              <h3 className="text-[15px] font-bold text-slate-900">スキルバランス分析</h3>
            </div>
            <p className="px-5 pb-[18px] text-xs text-slate-500">
              5軸で可視化したあなたの強みと成長余地
            </p>
            <div className="px-5">
              <RadarChart data={r.radar} />
              <div className="mt-[14px] flex flex-wrap gap-2 pb-5">
                {r.radar.map((d) => (
                  <div
                    key={d.label}
                    className="flex items-center gap-[5px] rounded-full bg-blue-50 px-3 py-1 text-xs"
                  >
                    <span className="text-slate-500">{d.label}</span>
                    <span className="font-bold text-blue-800">{d.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Plans */}
        <div className="mt-5">
          <div className="mb-[5px] flex items-center gap-[10px]">
            <div className="h-[22px] w-1 rounded-sm bg-blue-800" />
            <h3 className="text-base font-bold text-slate-900">
              市場価値 +100万円のアクションプラン
            </h3>
          </div>
          <p className="mb-4 ml-[14px] text-xs text-slate-500">
            あなたのスコア・属性から算出した最優先アクション
          </p>
          <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
            {r.plans.map((p, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-[20px] border border-slate-200 bg-white p-[22px] shadow-[0_4px_14px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(0,0,0,0.1)]"
              >
                <div className="pointer-events-none absolute -top-[10px] right-3 select-none text-[82px] font-extrabold leading-none text-blue-800 opacity-[0.04]">
                  0{i + 1}
                </div>
                <div
                  className="mb-[14px] flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                  style={{ background: p.bg, color: p.color }}
                >
                  {p.icon}
                </div>
                <h4 className="mb-2 text-sm font-bold text-slate-900">{p.title}</h4>
                <div className="mb-[10px] flex flex-wrap gap-[7px]">
                  <span className="rounded-full bg-blue-50 px-[10px] py-[3px] text-[11px] font-bold text-blue-800">
                    {p.impact}
                  </span>
                  <span className="rounded-full bg-slate-100 px-[10px] py-[3px] text-[11px] text-slate-500">
                    目安: {p.period}
                  </span>
                </div>
                <p className="text-xs leading-[1.8] text-slate-500">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Salary Comparison */}
        <div className="mt-[22px] overflow-hidden rounded-[20px] border border-blue-200 bg-white shadow-[0_4px_22px_rgba(30,64,175,0.07)]">
          <div className="flex items-center gap-[10px] px-5 pt-7">
            <div className="h-[22px] w-1 rounded-sm bg-blue-800" />
            <h3 className="text-[15px] font-bold text-slate-900">現年収 vs 市場価値 比較</h3>
          </div>
          <div className="px-5 pb-[22px] pt-4">
            <div className="mb-[7px] flex justify-between text-xs text-slate-500">
              <span>現在の年収</span>
              <span>{r.curSal}万円</span>
            </div>
            <div className="mb-[14px] h-[10px] overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-slate-300"
                style={{ width: `${Math.min(100, (r.curSal / Math.max(r.mv, r.curSal)) * 100)}%` }}
              />
            </div>
            <div className="mb-[7px] flex justify-between text-xs font-bold text-blue-800">
              <span>推定市場価値</span>
              <span>{r.mv}万円</span>
            </div>
            <div className="h-[10px] overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-800"
                style={{ width: `${Math.min(100, (r.mv / Math.max(r.mv, r.curSal)) * 100)}%` }}
              />
            </div>
            <div
              className="mt-[14px] rounded-[11px] border-l-4 p-[13px] text-[13px]"
              style={{
                background: r.gap > 0 ? "#EFF6FF" : "#FEF2F2",
                color: r.gap > 0 ? "#1E40AF" : "#B91C1C",
                borderColor: r.gap > 0 ? "#1E40AF" : "#EF4444",
              }}
            >
              <strong>診断コメント：</strong>
              {r.gap > 0
                ? `あなたの市場価値は現年収を${r.gap}万円上回っています。転職・社内昇給交渉の勝ち筋が見えています。今すぐ動いてください。`
                : "現年収が市場価値を上回るレアケースです。スキルの深化と外部実績の積み上げでさらなる市場価値向上を狙いましょう。"}
            </div>
          </div>
        </div>

        {/* Restart */}
        <div className="pb-14 pt-9 text-center">
          <p className="mb-[14px] text-[13px] text-slate-500">
            条件を変えて再診断することで、転職後の想定年収もシミュレーションできます
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border-2 border-blue-800 px-11 py-[14px] text-[15px] font-bold text-blue-800 transition-all hover:bg-blue-800 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
            再診断する
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0A1628] to-[#1E40AF]">
          <div className="h-[72px] w-[72px] animate-spin rounded-full border-[3px] border-white/[0.12] border-t-blue-400" />
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
