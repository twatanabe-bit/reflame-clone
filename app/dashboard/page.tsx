"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  Calendar,
  CheckCircle2,
  ChevronRight,
  FileText,
  GripVertical,
  Mail,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Trophy,
  User,
  Sparkles,
  BarChart3,
  Users,
  Brain,
  Flame,
  Star,
  Clock,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

/* ─── Sidebar ─── */
function Sidebar() {
  const navItems = [
    { icon: <BarChart3 className="h-4 w-4" />, label: "ダッシュボード", active: true },
    { icon: <FileText className="h-4 w-4" />, label: "ES管理", active: false },
    { icon: <Calendar className="h-4 w-4" />, label: "カレンダー", active: false },
    { icon: <Mail className="h-4 w-4" />, label: "メール連携", active: false },
    { icon: <Users className="h-4 w-4" />, label: "OB/OG", active: false },
    { icon: <Brain className="h-4 w-4" />, label: "AIメンター", active: false },
    { icon: <Trophy className="h-4 w-4" />, label: "実績", active: false },
  ];

  return (
    <aside className="hidden md:flex w-[220px] shrink-0 flex-col border-r border-white/[0.06] bg-[#0A0E1A] p-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500" />
        <span className="text-sm font-black tracking-tight">ShukatsuOS</span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs transition-all ${
              item.active
                ? "glass text-white font-semibold"
                : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="glass rounded-xl p-3 mt-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">
            T
          </div>
          <div>
            <div className="text-xs font-semibold">田中 太郎</div>
            <div className="text-[10px] text-slate-500">早稲田大学 商学部</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ─── KPI Cards ─── */
function KPICards() {
  const kpis = [
    { label: "エントリー", value: "24", unit: "社", change: "+3", up: true, color: "#3B82F6", icon: <FileText className="h-4 w-4" /> },
    { label: "ES提出済", value: "18", unit: "社", change: "75%", up: true, color: "#8B5CF6", icon: <CheckCircle2 className="h-4 w-4" /> },
    { label: "面接予定", value: "5", unit: "件", change: "今週3件", up: true, color: "#10B981", icon: <Calendar className="h-4 w-4" /> },
    { label: "内定", value: "2", unit: "社", change: "11%", up: true, color: "#F59E0B", icon: <Star className="h-4 w-4" /> },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {kpis.map((k) => (
        <div key={k.label} className="glass rounded-xl p-4 group hover:border-white/[0.15] transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-slate-500">{k.label}</span>
            <span style={{ color: k.color }}>{k.icon}</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black" style={{ color: k.color }}>{k.value}</span>
            <span className="text-sm text-slate-500">{k.unit}</span>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-emerald-400" />
            <span className="text-[10px] text-emerald-400">{k.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Pipeline Kanban ─── */
function PipelineKanban() {
  const columns = [
    {
      title: "ES提出",
      color: "#94A3B8",
      items: [
        { company: "野村総研", deadline: "3/28", logo: "NRI" },
        { company: "デロイト", deadline: "3/30", logo: "DT" },
      ],
    },
    {
      title: "書類通過",
      color: "#3B82F6",
      items: [
        { company: "アクセンチュア", deadline: "4/2", logo: "AC" },
        { company: "サイバーエージェント", deadline: "4/5", logo: "CA" },
        { company: "楽天", deadline: "4/3", logo: "RK" },
      ],
    },
    {
      title: "1次面接",
      color: "#8B5CF6",
      items: [
        { company: "マッキンゼー", deadline: "3/27", logo: "Mc" },
      ],
    },
    {
      title: "2次面接",
      color: "#F59E0B",
      items: [
        { company: "Google Japan", deadline: "4/1", logo: "G" },
      ],
    },
    {
      title: "最終面接",
      color: "#EF4444",
      items: [
        { company: "三菱商事", deadline: "3/26", logo: "MC" },
      ],
    },
    {
      title: "内定",
      color: "#10B981",
      items: [
        { company: "リクルート", deadline: "—", logo: "R" },
        { company: "ソニー", deadline: "—", logo: "SN" },
      ],
    },
  ];

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-1 rounded-sm bg-blue-500" />
          <span className="text-sm font-bold">選考パイプライン</span>
          <span className="text-[10px] text-slate-500 ml-2">全24社</span>
        </div>
        <button className="glass rounded-lg px-3 py-1.5 text-[10px] text-slate-400 hover:text-white transition-colors flex items-center gap-1">
          <Plus className="h-3 w-3" />
          企業追加
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {columns.map((col) => (
          <div key={col.title} className="min-w-[160px] flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full" style={{ background: col.color }} />
              <span className="text-[11px] font-semibold text-slate-400">{col.title}</span>
              <span className="text-[10px] text-slate-600">{col.items.length}</span>
            </div>
            <div className="space-y-2">
              {col.items.map((item) => (
                <div
                  key={item.company}
                  className="glass glass-hover rounded-lg p-3 cursor-pointer transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="h-6 w-6 rounded-md flex items-center justify-center text-[8px] font-black text-white"
                      style={{ background: col.color }}
                    >
                      {item.logo}
                    </div>
                    <span className="text-xs font-semibold truncate">{item.company}</span>
                  </div>
                  {item.deadline !== "—" && (
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3 text-slate-600" />
                      <span className="text-[10px] text-slate-500">〆 {item.deadline}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── RPG Status ─── */
function RPGStatus() {
  const stats = [
    { label: "ES提出力", val: 80, max: 100, color: "#3B82F6" },
    { label: "面接突破力", val: 60, max: 100, color: "#8B5CF6" },
    { label: "業界研究", val: 90, max: 100, color: "#10B981" },
    { label: "自己分析", val: 70, max: 100, color: "#F59E0B" },
    { label: "ネットワーク", val: 45, max: 100, color: "#EF4444" },
  ];

  const badges = [
    { emoji: "📝", name: "ES10社提出", unlocked: true },
    { emoji: "🎤", name: "面接5社突破", unlocked: true },
    { emoji: "🔍", name: "業界3つ研究", unlocked: true },
    { emoji: "🤝", name: "OB5人面談", unlocked: false },
    { emoji: "🏆", name: "内定3社", unlocked: false },
    { emoji: "🔥", name: "30日連続", unlocked: false },
  ];

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="h-5 w-5 text-amber-400" />
        <span className="text-sm font-bold">就活クエスト</span>
      </div>

      {/* Level */}
      <div className="glass rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-lg">
              ⚔️
            </div>
            <div>
              <div className="text-xs text-slate-500">就活戦士</div>
              <div className="text-lg font-black text-amber-400">Lv.12</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-slate-600">Next Level</div>
            <div className="text-xs text-slate-400">560 EXP</div>
          </div>
        </div>
        <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
            style={{ width: "69%" }}
          />
        </div>
        <div className="flex justify-between mt-1 text-[10px] text-slate-600">
          <span>1,240 EXP</span>
          <span>1,800 EXP</span>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-3 mb-5">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="min-w-[80px] text-[11px] text-slate-500">{s.label}</span>
            <div className="flex-1 h-[6px] rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${s.val}%`, background: s.color }}
              />
            </div>
            <span className="min-w-[28px] text-right text-[11px] font-bold" style={{ color: s.color }}>
              {s.val}
            </span>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="border-t border-white/[0.06] pt-4">
        <div className="text-[11px] font-semibold text-slate-400 mb-3">実績バッジ</div>
        <div className="grid grid-cols-3 gap-2">
          {badges.map((b) => (
            <div
              key={b.name}
              className={`rounded-lg p-2 text-center transition-all ${
                b.unlocked ? "glass" : "bg-white/[0.02] opacity-40"
              }`}
            >
              <span className="text-lg">{b.emoji}</span>
              <div className="text-[9px] text-slate-500 mt-1">{b.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Today's Missions ─── */
function TodayMissions() {
  const missions = [
    { task: "三菱商事 最終面接（14:00 大手町）", type: "interview", urgent: true, done: false, exp: 100 },
    { task: "Google Japan ES最終提出", type: "es", urgent: true, done: false, exp: 50 },
    { task: "マッキンゼー 1次面接対策", type: "prep", urgent: false, done: false, exp: 30 },
    { task: "トヨタ 企業研究メモ作成", type: "research", urgent: false, done: true, exp: 20 },
    { task: "OB面談のお礼メール送信", type: "mail", urgent: false, done: true, exp: 15 },
  ];

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-400" />
          <span className="text-sm font-bold">今日のミッション</span>
        </div>
        <span className="text-[10px] text-emerald-400 font-semibold">2/5 完了</span>
      </div>

      <div className="space-y-2">
        {missions.map((m, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
              m.done ? "opacity-40" : "glass glass-hover cursor-pointer"
            }`}
          >
            <CheckCircle2
              className={`h-4 w-4 shrink-0 ${
                m.done ? "text-emerald-500" : "text-slate-600"
              }`}
            />
            <span className={`text-xs flex-1 ${m.done ? "line-through text-slate-600" : "text-slate-300"}`}>
              {m.task}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              {m.urgent && !m.done && (
                <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-400">
                  急
                </span>
              )}
              <span className="text-[10px] text-amber-400/60 font-semibold">+{m.exp}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Streak */}
      <div className="mt-4 glass rounded-lg p-3 flex items-center gap-3">
        <Flame className="h-5 w-5 text-orange-500" />
        <div>
          <div className="text-xs font-bold text-orange-400">12日連続ログイン</div>
          <div className="text-[10px] text-slate-500">あと18日で「30日連続」バッジ獲得!</div>
        </div>
      </div>
    </div>
  );
}

/* ─── AI Mentor Widget ─── */
function AIMentorWidget() {
  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="h-5 w-5 text-purple-400" />
        <span className="text-sm font-bold">AIメンター</span>
      </div>

      {/* Suggestion */}
      <div className="glass rounded-lg p-4 mb-3">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-xs leading-[1.8] text-slate-300">
              明日の三菱商事最終面接に向けて、過去の最終面接質問パターンを分析しました。
              「入社後のキャリアビジョン」と「志望動機の深掘り」が頻出です。
            </p>
            <button className="mt-2 text-[11px] font-semibold text-purple-400 hover:text-purple-300 transition-colors">
              面接対策を始める →
            </button>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-2">
        <button className="glass glass-hover rounded-lg p-3 text-left transition-all">
          <MessageSquare className="h-4 w-4 text-blue-400 mb-1" />
          <div className="text-[11px] font-semibold">ES添削</div>
          <div className="text-[10px] text-slate-500">AIに相談する</div>
        </button>
        <button className="glass glass-hover rounded-lg p-3 text-left transition-all">
          <User className="h-4 w-4 text-emerald-400 mb-1" />
          <div className="text-[11px] font-semibold">面接練習</div>
          <div className="text-[10px] text-slate-500">模擬面接開始</div>
        </button>
      </div>
    </div>
  );
}

/* ─── Upcoming Deadlines ─── */
function UpcomingDeadlines() {
  const deadlines = [
    { company: "三菱商事", event: "最終面接", date: "3/26(水)", daysLeft: 2, color: "#EF4444" },
    { company: "マッキンゼー", event: "1次面接", date: "3/27(木)", daysLeft: 3, color: "#F59E0B" },
    { company: "野村総研", event: "ES締切", date: "3/28(金)", daysLeft: 4, color: "#F59E0B" },
    { company: "デロイト", event: "ES締切", date: "3/30(日)", daysLeft: 6, color: "#3B82F6" },
    { company: "Google Japan", event: "2次面接", date: "4/1(火)", daysLeft: 8, color: "#3B82F6" },
  ];

  return (
    <div className="glass rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-amber-400" />
        <span className="text-sm font-bold">直近の締切</span>
      </div>
      <div className="space-y-2">
        {deadlines.map((d, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg px-3 py-2 glass">
            <div className="text-center min-w-[36px]">
              <div className="text-lg font-black" style={{ color: d.color }}>{d.daysLeft}</div>
              <div className="text-[9px] text-slate-500">日後</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold truncate">{d.company}</div>
              <div className="text-[10px] text-slate-500">{d.event} — {d.date}</div>
            </div>
            <ChevronRight className="h-3 w-3 text-slate-600 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Dashboard Page ─── */
export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#0A0E1A]">
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-40 glass border-b border-white/[0.06] px-6 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-black">ダッシュボード</h1>
              <p className="text-[11px] text-slate-500">2026年3月24日（月）</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="glass rounded-lg p-2 text-slate-400 hover:text-white transition-colors">
                <Search className="h-4 w-4" />
              </button>
              <button className="glass rounded-lg p-2 text-slate-400 hover:text-white transition-colors relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500" />
              </button>
              <button className="glass rounded-lg p-2 text-slate-400 hover:text-white transition-colors">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 space-y-5">
          {/* Welcome banner */}
          <div className="glass rounded-xl p-5 bg-gradient-to-r from-blue-500/[0.08] to-purple-500/[0.08]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold">おはよう、田中さん!</h2>
                <p className="text-xs text-slate-400 mt-1">
                  今日のミッションは5件。明日の三菱商事最終面接の準備をお忘れなく。
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 glass rounded-lg px-3 py-2">
                <Flame className="h-4 w-4 text-orange-400" />
                <span className="text-xs font-bold text-orange-400">12日連続</span>
              </div>
            </div>
          </div>

          {/* KPI */}
          <KPICards />

          {/* Pipeline */}
          <PipelineKanban />

          {/* Two column */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <TodayMissions />
            <RPGStatus />
          </div>

          {/* Two column */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <AIMentorWidget />
            <UpcomingDeadlines />
          </div>

          {/* Bottom nav for mobile */}
          <div className="h-16 md:hidden" />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 glass border-t border-white/[0.06] md:hidden">
        <div className="flex items-center justify-around py-2">
          {[
            { icon: <BarChart3 className="h-5 w-5" />, label: "ホーム", active: true },
            { icon: <FileText className="h-5 w-5" />, label: "ES", active: false },
            { icon: <Calendar className="h-5 w-5" />, label: "予定", active: false },
            { icon: <Brain className="h-5 w-5" />, label: "AI", active: false },
            { icon: <User className="h-5 w-5" />, label: "マイ", active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 ${
                item.active ? "text-blue-400" : "text-slate-600"
              }`}
            >
              {item.icon}
              <span className="text-[9px]">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
