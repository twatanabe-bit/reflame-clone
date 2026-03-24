"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Clock, Share2, Shield } from "lucide-react";

export default function CareerQuestLanding() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0F0A2A] via-[#1A1145] to-[#2D1B69] px-5">
      {/* Animated background particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[15%] h-[300px] w-[300px] animate-[float_8s_ease-in-out_infinite] rounded-full bg-purple-500/[0.07] blur-[80px]" />
        <div className="absolute right-[10%] top-[45%] h-[250px] w-[250px] animate-[float_10s_ease-in-out_infinite_reverse] rounded-full bg-indigo-400/[0.08] blur-[80px]" />
        <div className="absolute bottom-[10%] left-[30%] h-[200px] w-[200px] animate-[float_12s_ease-in-out_infinite] rounded-full bg-pink-500/[0.06] blur-[60px]" />
      </div>

      <div className="relative mx-auto max-w-[680px]">
        {/* Badge */}
        <div className="animate-fade-up pt-16 sm:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/[0.15] px-4 py-[6px] text-[11px] font-semibold tracking-wider text-purple-300">
            <Sparkles className="h-3 w-3" />
            MBTI × RPG ─ 就活キャリア診断 2026
          </span>
        </div>

        {/* Title */}
        <h1 className="animate-fade-up [animation-delay:80ms] mt-6 text-[clamp(32px,7vw,56px)] font-black leading-[1.15] tracking-tight text-white">
          あなたの
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
            適職タイプ
          </span>
          を<br />
          RPG風に診断
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up [animation-delay:180ms] mt-4 max-w-[480px] text-[15px] leading-[1.85] text-slate-400">
          12問の質問に答えるだけで、MBTIに基づく
          <strong className="text-slate-300">16タイプの職業適性</strong>
          を診断。あなたのステータス・得意武器・伝説の相棒まで丸わかり。
        </p>

        {/* Feature chips */}
        <div className="animate-fade-up [animation-delay:300ms] mt-6 flex flex-wrap gap-2">
          {[
            { icon: Clock, label: "約3分で完了" },
            { icon: Shield, label: "登録不要・完全無料" },
            { icon: Share2, label: "結果をシェア可能" },
          ].map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-[6px] rounded-full border border-white/10 bg-white/[0.06] px-3 py-[6px] text-[11px] text-slate-400"
            >
              <f.icon className="h-3 w-3 text-purple-400" />
              {f.label}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="animate-fade-up [animation-delay:420ms] mt-8">
          <Link
            href="/career-quest/diagnosis"
            className="group inline-flex items-center gap-[10px] rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 px-10 py-[18px] text-[16px] font-bold text-white shadow-[0_8px_32px_rgba(168,85,247,0.4)] transition-all hover:-translate-y-[2px] hover:shadow-[0_16px_48px_rgba(168,85,247,0.5)]"
          >
            診断スタート
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Preview Card */}
        <div className="animate-fade-up [animation-delay:560ms] mb-16 mt-12 rounded-[20px] border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-[10px] w-[10px] rounded-full bg-red-500" />
            <div className="h-[10px] w-[10px] rounded-full bg-amber-500" />
            <div className="h-[10px] w-[10px] rounded-full bg-emerald-500" />
            <span className="ml-2 text-[11px] text-slate-500">診断結果サンプル</span>
          </div>

          {/* Sample result */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-white/[0.06] p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-3xl">⚡</span>
                <div>
                  <div className="text-[11px] text-purple-400">あなたのタイプ</div>
                  <div className="text-lg font-bold text-white">閃きの魔術師</div>
                </div>
              </div>
              <div className="text-[11px] text-slate-500">ENTP / 新規事業プランナー</div>
            </div>
            <div className="rounded-xl bg-white/[0.06] p-4">
              <div className="text-[11px] text-slate-500">ステータス</div>
              <div className="mt-2 space-y-[6px]">
                {[
                  { label: "突破力", val: 75, color: "#A855F7" },
                  { label: "創造の炎", val: 95, color: "#F59E0B" },
                  { label: "論理シールド", val: 80, color: "#06B6D4" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className="min-w-[60px] text-[10px] text-slate-400">{s.label}</span>
                    <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${s.val}%`, background: s.color }}
                      />
                    </div>
                    <span className="min-w-[20px] text-right text-[10px] font-bold" style={{ color: s.color }}>
                      {s.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
