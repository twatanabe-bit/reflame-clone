"use client";

import Link from "next/link";
import {
  ArrowRight,
  Mail,
  FileText,
  BarChart3,
  Users,
  Zap,
  Shield,
  Brain,
  Calendar,
  MessageSquare,
  Trophy,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Star,
} from "lucide-react";

/* ─── Hero Section ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-500/[0.07] blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/[0.07] blur-[120px]" />

      {/* Ghost numbers */}
      <span className="pointer-events-none absolute -right-[60px] top-[10%] select-none font-black text-[280px] leading-none text-white opacity-[0.02]">
        OS
      </span>

      <div className="relative z-10 mx-auto max-w-[960px] text-center">
        {/* Badge */}
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-xs font-medium tracking-wider text-blue-300 mb-8">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          2027卒対応 — AI-Native 就活管理プラットフォーム
        </div>

        {/* Title */}
        <h1 className="animate-fade-up [animation-delay:80ms] text-[clamp(32px,7vw,80px)] font-black leading-[1.08] tracking-tight">
          就活の
          <span className="text-gradient">「全て」</span>
          を、
          <br />
          ひとつに。
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-up [animation-delay:200ms] mt-6 mx-auto max-w-[640px] text-base leading-[1.9] text-slate-400 md:text-lg">
          メール自動解析、ES-AI添削、選考パイプライン管理、AIメンター。
          <br className="hidden md:block" />
          <strong className="text-slate-300">手入力ゼロ</strong>で就活の全情報を一元管理する、次世代就活OS。
        </p>

        {/* Stats */}
        <div className="animate-fade-up [animation-delay:360ms] mt-10 mb-10 flex justify-center gap-4 flex-wrap">
          {[
            { num: "0", unit: "秒", label: "手入力" },
            { num: "AI", unit: "", label: "自動同期" },
            { num: "1", unit: "画面", label: "全情報集約" },
          ].map((s) => (
            <div
              key={s.label}
              className="glass rounded-2xl px-6 py-4 text-center min-w-[120px]"
            >
              <div className="text-2xl font-black text-gradient">
                {s.num}
                <span className="text-lg">{s.unit}</span>
              </div>
              <div className="mt-1 text-[11px] text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="animate-fade-up [animation-delay:520ms] flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-[2px] hover:shadow-[0_16px_48px_rgba(99,102,241,0.35)]"
          >
            デモを体験する
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/features"
            className="inline-flex items-center gap-2 rounded-full glass glass-hover px-8 py-4 text-base font-semibold text-slate-300 transition-all hover:text-white"
          >
            機能を見る
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="animate-fade-up [animation-delay:600ms] mt-4 text-xs text-slate-600">
          無料 ・ 登録不要でデモ体験可能
        </p>
      </div>
    </section>
  );
}

/* ─── Problem Section ─── */
function ProblemSection() {
  const problems = [
    {
      icon: "😩",
      title: "情報がバラバラ",
      desc: "リクナビ、マイナビ、ONE CAREER、メール、LINE…就活情報が5つ以上のアプリに散乱。",
    },
    {
      icon: "⌨️",
      title: "手入力が地獄",
      desc: "ES締切、面接日程、説明会予約…全て手動でカレンダーに入力する苦行。",
    },
    {
      icon: "😰",
      title: "進捗が見えない不安",
      desc: "「自分は遅れてる？」「何社受けるべき？」答えがないまま闇の中で就活。",
    },
  ];

  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-[960px]">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.15em] text-red-400 uppercase">
            Problem
          </span>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            就活生の<span className="text-gradient-warm">3大苦痛</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {problems.map((p, i) => (
            <div
              key={i}
              className="animate-fade-up glass rounded-2xl p-7 transition-all hover:-translate-y-1 hover:border-red-500/20"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <span className="text-4xl">{p.icon}</span>
              <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-[1.8] text-slate-400">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Solution Section ─── */
function SolutionSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.03] to-transparent" />
      <div className="relative mx-auto max-w-[960px] text-center">
        <span className="text-xs font-semibold tracking-[0.15em] text-blue-400 uppercase">
          Solution
        </span>
        <h2 className="mt-3 text-3xl font-black md:text-4xl">
          ShukatsuOSが<span className="text-gradient">全て解決</span>する
        </h2>
        <p className="mt-4 text-slate-400 max-w-[600px] mx-auto">
          AI自動同期エンジンが、あなたの就活情報を自動で集約・整理・管理。
          もう手入力は必要ない。
        </p>
      </div>
    </section>
  );
}

/* ─── Features Grid ─── */
function FeaturesGrid() {
  const features = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "AI自動同期エンジン",
      desc: "メールをAIが自動解析。選考案内→ステータス更新、締切→カレンダー登録を全自動化。",
      color: "from-blue-500 to-cyan-500",
      glow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "ES 2.0",
      desc: "合格ES 50万件ベースのAI添削。類似設問の自動検出と使い回し最適化提案。",
      color: "from-purple-500 to-pink-500",
      glow: "group-hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "RPGダッシュボード",
      desc: "選考状況をRPGのステータス画面で可視化。レベル・EXP・バッジで就活を冒険に。",
      color: "from-emerald-500 to-teal-500",
      glow: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "OB/OG・内定者DB",
      desc: "志望企業×大学×学部でOB/OGを自動検索。内定者のES・面接体験談も閲覧可能。",
      color: "from-amber-500 to-orange-500",
      glow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AIメンター",
      desc: "24時間対応のAIが面接練習、ES相談、メンタルケアまで。お祈り後の自動フォローも。",
      color: "from-rose-500 to-red-500",
      glow: "group-hover:shadow-[0_0_40px_rgba(244,63,94,0.15)]",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "爆速オフラインUI",
      desc: "0.8秒で表示完了。Service Worker対応でオフラインでも動作。全操作60fps。",
      color: "from-yellow-500 to-amber-500",
      glow: "group-hover:shadow-[0_0_40px_rgba(234,179,8,0.15)]",
    },
  ];

  return (
    <section className="relative py-12 px-6">
      <div className="mx-auto max-w-[960px]">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group glass rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 ${f.glow}`}
            >
              <div
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} text-white`}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-[1.8] text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Dashboard Preview ─── */
function DashboardPreview() {
  const companies = [
    { name: "三菱商事", stage: "最終面接", color: "#3B82F6", progress: 85 },
    { name: "Google Japan", stage: "2次面接", color: "#8B5CF6", progress: 65 },
    { name: "トヨタ自動車", stage: "ES通過", color: "#10B981", progress: 40 },
    { name: "マッキンゼー", stage: "1次面接", color: "#F59E0B", progress: 50 },
  ];

  return (
    <section className="relative py-24 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.03] to-transparent" />
      <div className="relative mx-auto max-w-[1080px]">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.15em] text-purple-400 uppercase">
            Dashboard Preview
          </span>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            一目で<span className="text-gradient">全てが分かる</span>
          </h2>
        </div>

        {/* Mock Dashboard */}
        <div className="glass-strong rounded-3xl p-1 glow-blue">
          <div className="rounded-[20px] bg-[#0D1321] p-6 md:p-8">
            {/* Window chrome */}
            <div className="mb-6 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-amber-500/80" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-xs text-slate-600">ShukatsuOS — ダッシュボード</span>
            </div>

            {/* Top row */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-6">
              {[
                { label: "エントリー", value: "24社", sub: "+3 今週", accent: "#3B82F6" },
                { label: "ES提出済", value: "18社", sub: "提出率 75%", accent: "#8B5CF6" },
                { label: "面接予定", value: "5件", sub: "今週3件", accent: "#10B981" },
                { label: "内定", value: "2社", sub: "内定率 11%", accent: "#F59E0B" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-xl p-4">
                  <div className="text-[11px] text-slate-500">{s.label}</div>
                  <div className="mt-1 text-2xl font-black" style={{ color: s.accent }}>
                    {s.value}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-600">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Pipeline */}
            <div className="glass rounded-xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-5 w-1 rounded-sm bg-blue-500" />
                <span className="text-sm font-bold">選考パイプライン</span>
              </div>
              <div className="space-y-3">
                {companies.map((c) => (
                  <div key={c.name} className="flex items-center gap-4">
                    <span className="min-w-[120px] text-sm text-slate-300 truncate">{c.name}</span>
                    <div className="flex-1 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${c.progress}%`,
                          background: `linear-gradient(90deg, ${c.color}, ${c.color}88)`,
                        }}
                      />
                    </div>
                    <span
                      className="min-w-[80px] text-right text-xs font-semibold"
                      style={{ color: c.color }}
                    >
                      {c.stage}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* RPG Stats */}
              <div className="glass rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="h-4 w-4 text-amber-400" />
                  <span className="text-sm font-bold">就活ステータス</span>
                  <span className="ml-auto text-xs text-amber-400 font-bold">Lv.12</span>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>EXP</span>
                    <span>1,240 / 1,800</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                      style={{ width: "69%" }}
                    />
                  </div>
                </div>
                {[
                  { label: "ES提出力", val: 80, color: "#3B82F6" },
                  { label: "面接突破力", val: 60, color: "#8B5CF6" },
                  { label: "業界研究", val: 90, color: "#10B981" },
                  { label: "自己分析", val: 70, color: "#F59E0B" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3 mb-2">
                    <span className="min-w-[72px] text-[11px] text-slate-500">{s.label}</span>
                    <div className="flex-1 h-[5px] rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${s.val}%`, background: s.color }}
                      />
                    </div>
                    <span className="text-[11px] font-bold" style={{ color: s.color }}>
                      {s.val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Today's Tasks */}
              <div className="glass rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-bold">今日のミッション</span>
                </div>
                {[
                  { task: "三菱商事 最終面接（14:00）", urgent: true, done: false },
                  { task: "Google Japan ES締切（23:59）", urgent: true, done: false },
                  { task: "トヨタ 企業研究メモ作成", urgent: false, done: true },
                  { task: "OB面談のお礼メール送信", urgent: false, done: true },
                ].map((t, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 mb-2 ${
                      t.done ? "opacity-50" : "glass"
                    }`}
                  >
                    <CheckCircle2
                      className={`h-4 w-4 shrink-0 ${
                        t.done ? "text-emerald-500" : "text-slate-600"
                      }`}
                    />
                    <span className={`text-xs flex-1 ${t.done ? "line-through text-slate-600" : ""}`}>
                      {t.task}
                    </span>
                    {t.urgent && !t.done && (
                      <span className="shrink-0 rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-400">
                        急
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Comparison Section ─── */
function ComparisonSection() {
  const rows = [
    { feature: "メール自動解析", us: true, others: false },
    { feature: "ES AI添削", us: true, others: false },
    { feature: "選考パイプライン管理", us: true, others: false },
    { feature: "複数サービス情報統合", us: true, others: false },
    { feature: "AIメンター（24h対応）", us: true, others: false },
    { feature: "ゲーミフィケーション", us: true, others: false },
    { feature: "オフライン動作", us: true, others: false },
    { feature: "OB/OG マッチング", us: true, others: true },
    { feature: "求人検索", us: true, others: true },
  ];

  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-[720px]">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.15em] text-emerald-400 uppercase">
            Comparison
          </span>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            <span className="text-gradient">圧倒的</span>な差
          </h2>
        </div>

        <div className="glass-strong rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 bg-white/[0.04] px-6 py-4 text-xs font-bold text-slate-400">
            <span>機能</span>
            <span className="text-center text-gradient">ShukatsuOS</span>
            <span className="text-center">既存アプリ</span>
          </div>
          {/* Rows */}
          {rows.map((r, i) => (
            <div
              key={i}
              className="grid grid-cols-3 border-t border-white/[0.05] px-6 py-3 text-sm"
            >
              <span className="text-slate-300">{r.feature}</span>
              <span className="text-center">
                {r.us ? (
                  <CheckCircle2 className="inline h-5 w-5 text-emerald-400" />
                ) : (
                  <span className="text-slate-600">—</span>
                )}
              </span>
              <span className="text-center">
                {r.others ? (
                  <span className="text-slate-500 text-xs">一部対応</span>
                ) : (
                  <span className="text-slate-600">—</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Tech Stack Section ─── */
function TechSection() {
  const techs = [
    { name: "Next.js 16", desc: "React Server Components", icon: <Zap className="h-4 w-4" /> },
    { name: "Claude AI", desc: "ES添削 & メンター", icon: <Brain className="h-4 w-4" /> },
    { name: "Supabase", desc: "リアルタイムDB", icon: <BarChart3 className="h-4 w-4" /> },
    { name: "E2E暗号化", desc: "AES-256-GCM", icon: <Shield className="h-4 w-4" /> },
  ];

  return (
    <section className="relative py-24 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent" />
      <div className="relative mx-auto max-w-[960px]">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.15em] text-blue-400 uppercase">
            Technology
          </span>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            最先端の<span className="text-gradient">技術基盤</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {techs.map((t, i) => (
            <div key={i} className="glass rounded-xl p-5 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                {t.icon}
              </div>
              <div className="text-sm font-bold">{t.name}</div>
              <div className="mt-1 text-[11px] text-slate-500">{t.desc}</div>
            </div>
          ))}
        </div>

        {/* Security badge */}
        <div className="mt-8 glass rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
          <Shield className="h-10 w-10 text-emerald-400 shrink-0" />
          <div>
            <h3 className="text-base font-bold">就活情報を最高レベルで保護</h3>
            <p className="mt-1 text-sm text-slate-400">
              E2E暗号化 ・ Passkey認証 ・ APPI完全準拠 ・ SOC 2 Type II取得予定。
              あなたのES・選考情報・個人データは、銀行レベルのセキュリティで守られます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Roadmap ─── */
function RoadmapSection() {
  const phases = [
    {
      phase: "Phase 1",
      title: "MVP",
      period: "2026 Q2",
      items: ["ダッシュボード", "ES管理 + AI添削", "メール自動解析", "RPGステータス"],
      color: "#3B82F6",
      active: true,
    },
    {
      phase: "Phase 2",
      title: "Growth",
      period: "2026 Q3",
      items: ["LINE連携", "OB/OG DB", "AIメンター", "ゲーミフィケーション"],
      color: "#8B5CF6",
      active: false,
    },
    {
      phase: "Phase 3",
      title: "Scale",
      period: "2026 Q4",
      items: ["面接練習AI", "メンタルケア", "ブラウザ拡張", "SOC 2認証"],
      color: "#10B981",
      active: false,
    },
    {
      phase: "Phase 4",
      title: "Domination",
      period: "2027〜",
      items: ["B2B企業版", "海外就活", "転職市場拡張", "API公開"],
      color: "#F59E0B",
      active: false,
    },
  ];

  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-[960px]">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.15em] text-amber-400 uppercase">
            Roadmap
          </span>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            <span className="text-gradient">日本一</span>への道筋
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {phases.map((p, i) => (
            <div
              key={i}
              className={`glass rounded-2xl p-6 transition-all ${
                p.active ? "glow-blue border-blue-500/30" : ""
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: p.color }}
                />
                <span className="text-[11px] font-bold" style={{ color: p.color }}>
                  {p.phase}
                </span>
                {p.active && (
                  <span className="ml-auto rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400">
                    NOW
                  </span>
                )}
              </div>
              <h3 className="text-lg font-black">{p.title}</h3>
              <p className="text-xs text-slate-500 mb-4">{p.period}</p>
              <ul className="space-y-2">
                {p.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-slate-400">
                    <ChevronRight className="h-3 w-3 shrink-0" style={{ color: p.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ─── */
function CTASection() {
  return (
    <section className="relative py-32 px-6 text-center">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/[0.05] to-transparent" />
      <div className="relative z-10 mx-auto max-w-[640px]">
        <Sparkles className="mx-auto mb-6 h-10 w-10 text-blue-400" />
        <h2 className="text-3xl font-black md:text-5xl leading-tight">
          就活を、
          <br />
          <span className="text-gradient">もっとスマートに。</span>
        </h2>
        <p className="mt-6 text-slate-400">
          ShukatsuOSは、あなたの就活体験を根本から変える。
          <br />
          今すぐデモを体験しよう。
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-[2px] hover:shadow-[0_16px_48px_rgba(99,102,241,0.35)]"
          >
            デモを体験する
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-8 px-6">
      <div className="mx-auto max-w-[960px] flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500" />
          <span className="text-sm font-bold">ShukatsuOS</span>
        </div>
        <p className="text-xs text-slate-600">
          &copy; 2026 ShukatsuOS. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <Link href="/features" className="hover:text-white transition-colors">機能一覧</Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">デモ</Link>
          <Link href="/spec" className="hover:text-white transition-colors">仕様書</Link>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500" />
            <span className="text-base font-black tracking-tight">ShukatsuOS</span>
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <Link href="/features" className="text-xs text-slate-400 hover:text-white transition-colors">
              機能
            </Link>
            <Link href="/dashboard" className="text-xs text-slate-400 hover:text-white transition-colors">
              デモ
            </Link>
            <Link href="/spec" className="text-xs text-slate-400 hover:text-white transition-colors">
              仕様書
            </Link>
          </div>
          <Link
            href="/dashboard"
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-xs font-bold text-white transition-all hover:opacity-90"
          >
            無料で始める
          </Link>
        </div>
      </nav>

      <Hero />
      <ProblemSection />
      <SolutionSection />
      <FeaturesGrid />
      <DashboardPreview />
      <ComparisonSection />
      <TechSection />
      <RoadmapSection />
      <CTASection />
      <Footer />
    </div>
  );
}
