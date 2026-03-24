"use client";

import { useState } from "react";
import {
  Trophy,
  Star,
  Flame,
  Target,
  BookOpen,
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  Zap,
  Award,
  CheckCircle2,
} from "lucide-react";

interface Achievement {
  id: number;
  emoji: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  category: string;
  exp: number;
}

interface Stat {
  label: string;
  value: number;
  max: number;
  color: string;
}

const stats: Stat[] = [
  { label: "ES提出力", value: 80, max: 100, color: "#2563EB" },
  { label: "面接突破力", value: 60, max: 100, color: "#7C3AED" },
  { label: "業界研究", value: 90, max: 100, color: "#059669" },
  { label: "自己分析", value: 70, max: 100, color: "#D97706" },
  { label: "ネットワーク", value: 45, max: 100, color: "#DC2626" },
];

const achievements: Achievement[] = [
  { id: 1, emoji: "📝", title: "ES職人", description: "ESを10社提出", progress: 18, maxProgress: 10, unlocked: true, category: "ES", exp: 100 },
  { id: 2, emoji: "🎤", title: "面接マスター", description: "面接を5社突破", progress: 5, maxProgress: 5, unlocked: true, category: "面接", exp: 150 },
  { id: 3, emoji: "🔍", title: "リサーチャー", description: "3つ以上の業界を研究", progress: 4, maxProgress: 3, unlocked: true, category: "研究", exp: 80 },
  { id: 4, emoji: "🤝", title: "ネットワーカー", description: "OBを5人面談", progress: 3, maxProgress: 5, unlocked: false, category: "OB/OG", exp: 120 },
  { id: 5, emoji: "🏆", title: "内定コレクター", description: "3社から内定獲得", progress: 2, maxProgress: 3, unlocked: false, category: "内定", exp: 300 },
  { id: 6, emoji: "🔥", title: "鉄人", description: "30日連続ログイン", progress: 12, maxProgress: 30, unlocked: false, category: "継続", exp: 200 },
  { id: 7, emoji: "⚡", title: "スピードスター", description: "1日で5つのタスク完了", progress: 5, maxProgress: 5, unlocked: true, category: "効率", exp: 50 },
  { id: 8, emoji: "🎯", title: "シャープシューター", description: "ES通過率80%以上", progress: 75, maxProgress: 80, unlocked: false, category: "ES", exp: 250 },
  { id: 9, emoji: "📚", title: "知識の泉", description: "AIメンターに50回質問", progress: 28, maxProgress: 50, unlocked: false, category: "AI", exp: 100 },
  { id: 10, emoji: "💎", title: "ダイヤモンド", description: "全バッジを獲得", progress: 4, maxProgress: 9, unlocked: false, category: "特別", exp: 500 },
  { id: 11, emoji: "🌟", title: "ファーストステップ", description: "初めてのES提出", progress: 1, maxProgress: 1, unlocked: true, category: "ES", exp: 20 },
  { id: 12, emoji: "💪", title: "チャレンジャー", description: "外資系企業にエントリー", progress: 3, maxProgress: 1, unlocked: true, category: "挑戦", exp: 50 },
];

export default function AchievementsPage() {
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all");

  const totalExp = achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.exp, 0);
  const level = Math.floor(totalExp / 150) + 1;
  const expInLevel = totalExp % 150;
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  const filtered = achievements.filter((a) => {
    if (filter === "unlocked") return a.unlocked;
    if (filter === "locked") return !a.unlocked;
    return true;
  });

  return (
    <div className="max-w-5xl space-y-5">
      <div>
        <h1 className="text-lg font-bold text-slate-900">実績・成長記録</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          就活の進捗を可視化し、モチベーションを維持
        </p>
      </div>

      {/* Level & Stats Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Level Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl shadow-sm">
              ⚔️
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">就活戦士</div>
              <div className="text-2xl font-extrabold text-slate-900">
                Lv.{level}
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-500 font-medium">経験値</span>
              <span className="text-xs text-slate-400">
                {expInLevel} / 150 EXP
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all"
                style={{ width: `${(expInLevel / 150) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-slate-50 rounded-lg p-2">
              <div className="text-lg font-extrabold text-slate-900">{totalExp}</div>
              <div className="text-[10px] text-slate-400">総EXP</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-2">
              <div className="text-lg font-extrabold text-slate-900">
                {unlockedCount}/{achievements.length}
              </div>
              <div className="text-[10px] text-slate-400">バッジ</div>
            </div>
          </div>

          {/* Streak */}
          <div className="mt-4 rounded-lg bg-orange-50 border border-orange-200 p-3 flex items-center gap-3">
            <Flame className="h-5 w-5 text-orange-500 shrink-0" />
            <div>
              <div className="text-xs font-bold text-orange-700">12日連続</div>
              <div className="text-[10px] text-orange-500">あと18日でバッジ獲得</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            スキルステータス
          </h2>
          <div className="space-y-4">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-4">
                <span className="min-w-[90px] text-sm text-slate-600 font-medium">
                  {s.label}
                </span>
                <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${s.value}%`, background: s.color }}
                  />
                </div>
                <span
                  className="min-w-[32px] text-right text-sm font-bold"
                  style={{ color: s.color }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-200">
            {[
              { label: "エントリー", value: "24社", icon: FileText },
              { label: "ES通過率", value: "75%", icon: CheckCircle2 },
              { label: "面接回数", value: "12回", icon: MessageSquare },
              { label: "内定数", value: "2社", icon: Trophy },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="text-center">
                  <Icon className="h-4 w-4 text-slate-400 mx-auto mb-1" />
                  <div className="text-lg font-extrabold text-slate-900">{item.value}</div>
                  <div className="text-[10px] text-slate-400">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Award className="h-4 w-4 text-amber-500" />
            実績バッジ
          </h2>
          <div className="flex gap-1.5">
            {(["all", "unlocked", "locked"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {f === "all" ? "すべて" : f === "unlocked" ? "獲得済" : "未獲得"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((badge) => (
            <div
              key={badge.id}
              className={`rounded-xl border p-4 text-center transition-all ${
                badge.unlocked
                  ? "bg-white border-slate-200 hover:border-amber-300 hover:shadow-sm"
                  : "bg-slate-50 border-slate-100 opacity-50"
              }`}
            >
              <div className="text-3xl mb-2">{badge.emoji}</div>
              <div className="text-sm font-bold text-slate-900">{badge.title}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{badge.description}</div>

              {!badge.unlocked && (
                <div className="mt-3">
                  <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{
                        width: `${Math.min((badge.progress / badge.maxProgress) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {badge.progress} / {badge.maxProgress}
                  </div>
                </div>
              )}

              {badge.unlocked && (
                <div className="mt-2 text-[10px] font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-0.5 inline-block">
                  +{badge.exp} EXP
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
