"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Star, Zap, Shield, Crown } from "lucide-react";
import { CELEBRITY_PERSONAS, RANK_DEFINITIONS } from "@/lib/interview/data";
import type { CelebrityPersona, InterviewStyle } from "@/lib/interview/types";

const STYLE_ICONS: Record<InterviewStyle, React.ReactNode> = {
  pressure: <Zap className="h-4 w-4" />,
  empathy: <Shield className="h-4 w-4" />,
  charisma: <Crown className="h-4 w-4" />,
};

const STYLE_COLORS: Record<InterviewStyle, string> = {
  pressure: "text-red-400 bg-red-500/20 border-red-500/30",
  empathy: "text-sky-400 bg-sky-500/20 border-sky-500/30",
  charisma: "text-amber-400 bg-amber-500/20 border-amber-500/30",
};

function DifficultyStars({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < level ? "fill-amber-400 text-amber-400" : "text-slate-600"}`}
        />
      ))}
    </div>
  );
}

function PersonaCard({
  persona,
  selected,
  onSelect,
}: {
  persona: CelebrityPersona;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`group relative w-full rounded-2xl border p-5 text-left transition-all duration-300 ${
        selected
          ? "scale-[1.02] border-white/30 bg-white/[0.12] shadow-lg shadow-white/5"
          : "border-white/[0.08] bg-white/[0.04] hover:border-white/15 hover:bg-white/[0.07]"
      }`}
    >
      {selected && (
        <div className="absolute -top-2 right-3 rounded-full bg-blue-500 px-3 py-0.5 text-[10px] font-bold text-white">
          選択中
        </div>
      )}

      {/* Avatar */}
      <div className="mb-4 flex items-start gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${persona.avatarGradient} text-2xl shadow-lg`}
        >
          {persona.avatarEmoji}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">{persona.name}</h3>
          <p className="text-xs text-slate-400">{persona.title}</p>
          <div className="mt-1.5 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STYLE_COLORS[persona.interviewStyle]}`}
            >
              {STYLE_ICONS[persona.interviewStyle]}
              {persona.styleLabel}
            </span>
            <DifficultyStars level={persona.difficulty} />
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mb-3 text-sm leading-relaxed text-slate-300">
        {persona.styleDesc}
      </p>

      {/* Values */}
      <div className="rounded-xl bg-white/[0.04] p-3">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          価値観
        </p>
        <p className="text-xs leading-relaxed text-slate-400">
          「{persona.values.workPhilosophy}」
        </p>
      </div>

      {/* Catchphrase */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {persona.values.catchphrases.slice(0, 2).map((phrase) => (
          <span
            key={phrase}
            className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] text-slate-400"
          >
            &ldquo;{phrase}&rdquo;
          </span>
        ))}
      </div>
    </button>
  );
}

export default function InterviewPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedPersona = CELEBRITY_PERSONAS.find((p) => p.id === selectedId);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0A1628] to-[#1E40AF] px-6">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-[960px] pb-20">
        {/* Header */}
        <div className="flex items-center gap-4 pt-8">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs text-slate-400 transition hover:bg-white/10"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            トップへ戻る
          </Link>
        </div>

        {/* Title */}
        <div className="animate-fade-up mt-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/[0.18] px-[18px] py-[7px] text-xs font-semibold tracking-wider text-purple-300">
            <span className="inline-block h-[7px] w-[7px] rounded-full bg-purple-400" />
            Star Interview Avatar ─ 芸能人AI面接官
          </span>
        </div>

        <h1 className="animate-fade-up [animation-delay:80ms] mt-7 text-[clamp(28px,5vw,52px)] font-black leading-[1.15] tracking-tight text-white">
          あの人が、
          <br />
          <span className="text-purple-400">あなたの面接官</span>になる。
        </h1>

        <p className="animate-fade-up [animation-delay:200ms] mb-10 mt-4 max-w-[560px] text-base leading-[1.95] text-slate-400">
          芸能人の「価値観」「話し方」「面接スタイル」を再現したAIアバターが、
          <br />
          あなたの面接力を<strong className="text-slate-300">27卒の選考基準</strong>で鍛え上げる。
        </p>

        {/* Rank preview */}
        <div className="animate-fade-up [animation-delay:300ms] mb-10 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            ランクアップシステム
          </p>
          <div className="flex flex-wrap gap-2">
            {RANK_DEFINITIONS.slice(0, 6).map((rank) => (
              <div
                key={rank.level}
                className="flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 text-xs"
              >
                <span>{rank.emoji}</span>
                <span className="text-slate-400">{rank.title}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-slate-500">
              ...さらに上位ランクも
            </div>
          </div>
        </div>

        {/* Persona Selection */}
        <h2 className="animate-fade-up [animation-delay:400ms] mb-6 text-xl font-bold text-white">
          面接官アバターを選択
        </h2>

        <div className="animate-fade-up [animation-delay:500ms] grid gap-4 sm:grid-cols-2">
          {CELEBRITY_PERSONAS.map((persona) => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              selected={selectedId === persona.id}
              onSelect={() => setSelectedId(persona.id)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="animate-fade-up [animation-delay:600ms] mt-10 text-center">
          <Link
            href={
              selectedPersona
                ? `/interview/session?persona=${selectedPersona.id}`
                : "#"
            }
            className={`inline-flex items-center gap-[10px] rounded-full px-12 py-5 text-[17px] font-bold shadow-lg transition-all ${
              selectedPersona
                ? "bg-gradient-to-br from-purple-600 to-blue-600 text-white hover:-translate-y-[3px] hover:shadow-[0_16px_48px_rgba(124,58,237,0.45)]"
                : "cursor-not-allowed bg-slate-700/50 text-slate-500"
            }`}
            onClick={(e) => !selectedPersona && e.preventDefault()}
          >
            面接を始める
            <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="mt-3 text-xs text-slate-500">
            ※ 1回の面接は約5〜10分 ─ 全6フェーズの本格模擬面接
          </p>
        </div>
      </div>
    </div>
  );
}
