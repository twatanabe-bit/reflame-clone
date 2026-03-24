"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Plus,
  Star,
  Clock,
  TrendingUp,
  Flame,
  Brain,
  Sparkles,
  MessageSquare,
  User,
  AlertTriangle,
  GripVertical,
} from "lucide-react";

/* ─── KPI Cards ─── */
function KPICards() {
  const kpis = [
    { label: "エントリー", value: "24", unit: "社", change: "+3 今週", color: "#2563EB", icon: FileText },
    { label: "ES提出済", value: "18", unit: "社", change: "75%", color: "#7C3AED", icon: CheckCircle2 },
    { label: "面接予定", value: "5", unit: "件", change: "今週3件", color: "#059669", icon: Calendar },
    { label: "内定", value: "2", unit: "社", change: "内定率 11%", color: "#D97706", icon: Star },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {kpis.map((k) => {
        const Icon = k.icon;
        return (
          <div
            key={k.label}
            className="bg-white rounded-xl p-4 border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-500 font-medium">{k.label}</span>
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: k.color + "10" }}
              >
                <Icon className="h-4 w-4" style={{ color: k.color }} />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-slate-900">{k.value}</span>
              <span className="text-sm text-slate-400 font-medium">{k.unit}</span>
            </div>
            <div className="mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              <span className="text-xs text-emerald-600 font-medium">{k.change}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Pipeline Kanban ─── */
function PipelineKanban() {
  const [columns, setColumns] = useState([
    {
      id: "es",
      title: "ES提出",
      color: "#94A3B8",
      items: [
        { id: 1, company: "野村総研", deadline: "3/28", logo: "NRI" },
        { id: 2, company: "デロイト", deadline: "3/30", logo: "DT" },
      ],
    },
    {
      id: "pass",
      title: "書類通過",
      color: "#2563EB",
      items: [
        { id: 3, company: "アクセンチュア", deadline: "4/2", logo: "AC" },
        { id: 4, company: "サイバーエージェント", deadline: "4/5", logo: "CA" },
        { id: 5, company: "楽天", deadline: "4/3", logo: "RK" },
      ],
    },
    {
      id: "first",
      title: "1次面接",
      color: "#7C3AED",
      items: [{ id: 6, company: "マッキンゼー", deadline: "3/27", logo: "Mc" }],
    },
    {
      id: "second",
      title: "2次面接",
      color: "#D97706",
      items: [{ id: 7, company: "Google Japan", deadline: "4/1", logo: "G" }],
    },
    {
      id: "final",
      title: "最終面接",
      color: "#DC2626",
      items: [{ id: 8, company: "三菱商事", deadline: "3/26", logo: "MC" }],
    },
    {
      id: "offer",
      title: "内定",
      color: "#059669",
      items: [
        { id: 9, company: "リクルート", deadline: "—", logo: "R" },
        { id: 10, company: "ソニー", deadline: "—", logo: "SN" },
      ],
    },
  ]);

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-slate-900">選考パイプライン</h2>
          <span className="text-xs text-slate-400 bg-slate-100 rounded-full px-2 py-0.5">
            全24社
          </span>
        </div>
        <button className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs font-semibold flex items-center gap-1 transition-colors">
          <Plus className="h-3.5 w-3.5" />
          企業追加
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {columns.map((col) => (
          <div key={col.id} className="min-w-[170px] flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: col.color }}
              />
              <span className="text-xs font-semibold text-slate-600">
                {col.title}
              </span>
              <span className="text-[11px] text-slate-400 bg-slate-100 rounded-full px-1.5">
                {col.items.length}
              </span>
            </div>
            <div className="space-y-2">
              {col.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 border border-slate-200 hover:border-slate-300 hover:shadow-sm rounded-lg p-3 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <GripVertical className="h-3 w-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div
                      className="h-6 w-6 rounded-md flex items-center justify-center text-[8px] font-bold text-white"
                      style={{ background: col.color }}
                    >
                      {item.logo}
                    </div>
                    <span className="text-xs font-semibold text-slate-700 truncate">
                      {item.company}
                    </span>
                  </div>
                  {item.deadline !== "—" && (
                    <div className="flex items-center gap-1 ml-5">
                      <Clock className="h-3 w-3 text-slate-400" />
                      <span className="text-[11px] text-slate-400">
                        〆 {item.deadline}
                      </span>
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

/* ─── Today's Missions ─── */
function TodayMissions() {
  const [missions, setMissions] = useState([
    { id: 1, task: "三菱商事 最終面接（14:00 大手町）", urgent: true, done: false, exp: 100 },
    { id: 2, task: "Google Japan ES最終提出", urgent: true, done: false, exp: 50 },
    { id: 3, task: "マッキンゼー 1次面接対策", urgent: false, done: false, exp: 30 },
    { id: 4, task: "トヨタ 企業研究メモ作成", urgent: false, done: true, exp: 20 },
    { id: 5, task: "OB面談のお礼メール送信", urgent: false, done: true, exp: 15 },
  ]);

  function toggleDone(id: number) {
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, done: !m.done } : m))
    );
  }

  const doneCount = missions.filter((m) => m.done).length;

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <h2 className="text-sm font-bold text-slate-900">今日のタスク</h2>
        </div>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full px-2.5 py-0.5">
          {doneCount}/{missions.length} 完了
        </span>
      </div>

      <div className="space-y-1.5">
        {missions.map((m) => (
          <div
            key={m.id}
            onClick={() => toggleDone(m.id)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-pointer transition-all ${
              m.done
                ? "bg-slate-50 opacity-60"
                : "hover:bg-slate-50 border border-transparent hover:border-slate-200"
            }`}
          >
            <CheckCircle2
              className={`h-[18px] w-[18px] shrink-0 transition-colors ${
                m.done ? "text-emerald-500" : "text-slate-300"
              }`}
            />
            <span
              className={`text-[13px] flex-1 ${
                m.done
                  ? "line-through text-slate-400"
                  : "text-slate-700 font-medium"
              }`}
            >
              {m.task}
            </span>
            {m.urgent && !m.done && (
              <span className="rounded-full bg-red-50 border border-red-200 px-2 py-0.5 text-[10px] font-bold text-red-600">
                急
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-orange-50 border border-orange-200 p-3 flex items-center gap-3">
        <Flame className="h-5 w-5 text-orange-500 shrink-0" />
        <div>
          <div className="text-xs font-bold text-orange-700">
            12日連続ログイン中
          </div>
          <div className="text-[11px] text-orange-500">
            あと18日で「30日連続」バッジ獲得!
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── AI Mentor Widget ─── */
function AIMentorWidget() {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="h-5 w-5 text-violet-600" />
        <h2 className="text-sm font-bold text-slate-900">AIメンター</h2>
      </div>

      <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 mb-3">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-[13px] leading-relaxed text-slate-700">
              明日の三菱商事最終面接に向けて、過去の最終面接質問パターンを分析しました。
              「入社後のキャリアビジョン」と「志望動機の深掘り」が頻出です。
            </p>
            <Link
              href="/dashboard/mentor"
              className="mt-2 inline-block text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors"
            >
              面接対策を始める →
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Link
          href="/dashboard/mentor"
          className="rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 p-3 text-left transition-all"
        >
          <MessageSquare className="h-4 w-4 text-blue-600 mb-1.5" />
          <div className="text-xs font-semibold text-slate-700">ES添削</div>
          <div className="text-[11px] text-slate-400">AIに相談する</div>
        </Link>
        <Link
          href="/dashboard/mentor"
          className="rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 p-3 text-left transition-all"
        >
          <User className="h-4 w-4 text-emerald-600 mb-1.5" />
          <div className="text-xs font-semibold text-slate-700">面接練習</div>
          <div className="text-[11px] text-slate-400">模擬面接開始</div>
        </Link>
      </div>
    </div>
  );
}

/* ─── Upcoming Deadlines ─── */
function UpcomingDeadlines() {
  const deadlines = [
    { company: "三菱商事", event: "最終面接", date: "3/26(水)", daysLeft: 2, urgent: true },
    { company: "マッキンゼー", event: "1次面接", date: "3/27(木)", daysLeft: 3, urgent: true },
    { company: "野村総研", event: "ES締切", date: "3/28(金)", daysLeft: 4, urgent: false },
    { company: "デロイト", event: "ES締切", date: "3/30(日)", daysLeft: 6, urgent: false },
    { company: "Google Japan", event: "2次面接", date: "4/1(火)", daysLeft: 8, urgent: false },
  ];

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        <h2 className="text-sm font-bold text-slate-900">直近の締切</h2>
      </div>
      <div className="space-y-1.5">
        {deadlines.map((d, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-slate-50 transition-colors"
          >
            <div className="text-center min-w-[36px]">
              <div
                className={`text-lg font-extrabold ${
                  d.urgent ? "text-red-500" : "text-slate-400"
                }`}
              >
                {d.daysLeft}
              </div>
              <div className="text-[9px] text-slate-400 font-medium">日後</div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-slate-700 truncate">
                {d.company}
              </div>
              <div className="text-[11px] text-slate-400">
                {d.event} — {d.date}
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Dashboard ─── */
export default function DashboardPage() {
  return (
    <div className="space-y-5 max-w-6xl">
      {/* Welcome */}
      <div className="rounded-xl p-5 bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              おはよう、田中さん!
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              今日のタスクは5件。明日の三菱商事最終面接の準備をお忘れなく。
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-orange-200">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-xs font-bold text-orange-600">
              12日連続
            </span>
          </div>
        </div>
      </div>

      <KPICards />
      <PipelineKanban />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <TodayMissions />
        <AIMentorWidget />
      </div>

      <UpcomingDeadlines />
    </div>
  );
}
