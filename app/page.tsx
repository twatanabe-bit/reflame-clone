"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0A1628] to-[#1E40AF] px-6">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Ghost numbers */}
      <span className="pointer-events-none absolute -right-[60px] -top-[80px] select-none font-bold text-[300px] leading-none text-white opacity-[0.04]">
        01
      </span>
      <span className="pointer-events-none absolute -left-[30px] bottom-[90px] select-none font-bold text-[160px] leading-none text-white opacity-[0.04]">
        02
      </span>

      <div className="relative mx-auto max-w-[880px]">
        {/* Badge */}
        <div className="animate-fade-up pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/[0.18] px-[18px] py-[7px] text-xs font-semibold tracking-wider text-blue-300">
            <span className="inline-block h-[7px] w-[7px] rounded-full bg-blue-400" />
            市場価値診断 2025年版 ─ 業界別マトリックス採用
          </span>
        </div>

        {/* Title */}
        <h1 className="animate-fade-up [animation-delay:80ms] mt-7 text-[clamp(36px,6.5vw,72px)] font-black leading-[1.12] tracking-tight text-white">
          あなたの価値は、
          <br />
          <span className="text-blue-400">まだ正しく</span>
          <br />
          測られていない。
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up [animation-delay:200ms] mb-10 mt-[18px] max-w-[560px] text-base leading-[1.95] text-slate-400">
          転職活動も年収交渉も、「自分の市場価値」を知ることから始まる。
          <br />
          AIの推論ではなく、
          <strong className="text-slate-300">業界別マトリックスに基づく構造化スコアリング</strong>
          でリアルな診断を算出。
        </p>

        {/* Stats */}
        <div className="animate-fade-up [animation-delay:360ms] mb-12 grid max-w-[520px] grid-cols-3 gap-3">
          {[
            { num: "10万+", lbl: "診断実績" },
            { num: "6項目", lbl: "評価軸" },
            { num: "業界別", lbl: "マトリックス算出" },
          ].map((s) => (
            <div
              key={s.lbl}
              className="rounded-2xl border border-white/10 bg-white/[0.07] px-3 py-[18px] text-center"
            >
              <div className="text-2xl font-bold text-blue-400">{s.num}</div>
              <div className="mt-1 text-[11px] text-slate-500">{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="animate-fade-up [animation-delay:520ms]">
          <Link
            href="/diagnosis"
            className="inline-flex items-center gap-[10px] rounded-full bg-gradient-to-br from-blue-600 to-blue-800 px-12 py-5 text-[17px] font-bold text-white shadow-lg transition-all hover:-translate-y-[3px] hover:shadow-[0_16px_48px_rgba(30,64,175,0.45)]"
          >
            無料で診断する
            <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="mt-[10px] text-xs text-slate-500">※ 無料・登録不要 ─ 所要時間2分</p>
        </div>

        {/* Preview box */}
        <div className="animate-fade-up [animation-delay:680ms] mb-20 mt-14 rounded-[22px] border border-white/[0.08] bg-white/[0.04] p-[26px]">
          {/* Window dots */}
          <div className="mb-4 flex items-center gap-2">
            <div className="h-[10px] w-[10px] rounded-full bg-red-500" />
            <div className="h-[10px] w-[10px] rounded-full bg-amber-500" />
            <div className="h-[10px] w-[10px] rounded-full bg-emerald-500" />
            <span className="ml-2 text-[11px] text-slate-500">市場価値診断レポート（サンプル）</span>
          </div>
          {/* Preview cards */}
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/[0.07] p-4">
              <div className="text-[11px] text-slate-500">推定市場価値</div>
              <div className="mt-[3px] text-[28px] font-bold text-blue-400">¥720万</div>
              <div className="mt-1 text-[11px] text-emerald-500">▲ 現在比 +22%</div>
            </div>
            <div className="rounded-xl bg-white/[0.07] p-4">
              <div className="text-[11px] text-slate-500">同世代 上位</div>
              <div className="mt-[3px] text-[28px] font-bold text-blue-400">18%</div>
              <div className="mt-1 text-[11px] text-slate-500">20代後半・法人営業</div>
            </div>
          </div>
          {/* Bars */}
          <div className="rounded-xl bg-white/[0.05] p-[14px]">
            <div className="mb-[10px] text-[11px] text-slate-500">評価スコア内訳</div>
            {[
              { label: "営業力", pct: 80, color: "#3B82F6" },
              { label: "ポテンシャル", pct: 88, color: "#8B5CF6" },
              { label: "希少性", pct: 65, color: "#10B981" },
            ].map((b) => (
              <div key={b.label} className="mb-[7px] flex items-center gap-[10px]">
                <span className="min-w-[68px] text-[11px] text-slate-400">{b.label}</span>
                <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${b.pct}%`, background: b.color }}
                  />
                </div>
                <span className="min-w-[24px] text-right text-[11px]" style={{ color: b.color }}>
                  {b.pct}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
