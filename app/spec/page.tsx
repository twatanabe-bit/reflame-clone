import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
            <span className="text-white text-xs font-black">S</span>
          </div>
          <span className="text-sm font-extrabold tracking-tight text-slate-900">ShukatsuOS</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/features" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">機能</Link>
          <Link href="/spec" className="text-sm text-blue-600 font-semibold">仕様書</Link>
          <Link href="/dashboard" className="rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors">
            無料で始める
          </Link>
        </div>
      </div>
    </nav>
  );
}

const sections = [
  { id: "value", title: "01 — バリュープロポジション" },
  { id: "features", title: "02 — コア機能" },
  { id: "ux", title: "03 — UXデザイン" },
  { id: "tech", title: "04 — 技術スタック" },
  { id: "security", title: "05 — セキュリティ" },
  { id: "roadmap", title: "06 — ロードマップ" },
];

export default function SpecPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="mx-auto max-w-[900px]">
          <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
            Technical Specification
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3">
            ShukatsuOS 仕様書
          </h1>
          <p className="mt-3 text-base text-slate-500 max-w-lg">
            プロダクトの全体設計、技術選定、セキュリティ方針を網羅した技術仕様書
          </p>
        </div>
      </section>

      {/* TOC + Content */}
      <section className="pb-20 px-6">
        <div className="mx-auto max-w-[900px] grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar TOC */}
          <nav className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                目次
              </div>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-sm text-slate-500 hover:text-blue-600 py-1 transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div className="lg:col-span-3 space-y-16">
            {/* 01 Value */}
            <section id="value">
              <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-200 pb-3 mb-6">
                01 — バリュープロポジション
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "手入力ゼロ", desc: "メールAI解析で選考ステータスを自動更新。手動入力の完全排除。" },
                  { title: "情報一元化", desc: "ES・面接・メール・OB訪問を1つのダッシュボードに集約。" },
                  { title: "不安解消", desc: "AIメンターが24時間サポート。進捗の可視化で心理的安全性を確保。" },
                ].map((v) => (
                  <div key={v.title} className="bg-slate-50 rounded-xl border border-slate-200 p-5">
                    <h3 className="text-sm font-bold text-slate-900 mb-2">{v.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 02 Features */}
            <section id="features">
              <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-200 pb-3 mb-6">
                02 — コア機能
              </h2>
              <div className="space-y-4">
                {[
                  { module: "AI自動同期", desc: "Gmail/Outlook連携、メール分類AI、カレンダー同期、リマインド" },
                  { module: "ES 2.0", desc: "5軸AI評価、類似設問検出、バージョン管理、締切連動" },
                  { module: "選考パイプライン", desc: "6ステージカンバン、ドラッグ&ドロップ、KPIダッシュボード" },
                  { module: "OB/OG DB", desc: "3軸検索、マッチスコア、ESサンプル、匿名チャット" },
                  { module: "AIメンター", desc: "模擬面接、自己分析、企業研究、ケース/フェルミ対策" },
                ].map((f) => (
                  <div key={f.module} className="flex gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="min-w-[140px] text-sm font-bold text-slate-900">{f.module}</div>
                    <div className="text-sm text-slate-500">{f.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* 03 UX */}
            <section id="ux">
              <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-200 pb-3 mb-6">
                03 — UXデザイン
              </h2>
              <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-900 mb-3">黄金の1分間フロー</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { time: "0秒", action: "アプリ起動" },
                    { time: "3秒", action: "ダッシュボード表示" },
                    { time: "10秒", action: "優先タスクをタップ" },
                    { time: "30秒", action: "AIが下書き提案" },
                    { time: "45秒", action: "提出 & アニメーション" },
                    { time: "60秒", action: "次のタスクへ" },
                  ].map((s) => (
                    <div key={s.time} className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                      <div className="text-lg font-extrabold text-blue-600">{s.time}</div>
                      <div className="text-xs text-slate-600 mt-0.5">{s.action}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3">ゲーミフィケーション</h3>
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {[
                      { label: "レベルシステム", desc: "EXPで成長" },
                      { label: "デイリーミッション", desc: "毎日5つのタスク" },
                      { label: "実績バッジ", desc: "12種類の収集" },
                      { label: "ストリーク", desc: "連続ログイン" },
                    ].map((g) => (
                      <div key={g.label}>
                        <div className="text-sm font-bold text-slate-900">{g.label}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{g.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 04 Tech */}
            <section id="tech">
              <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-200 pb-3 mb-6">
                04 — 技術スタック
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 text-slate-500 font-medium">レイヤー</th>
                      <th className="text-left py-3 text-slate-500 font-medium">技術</th>
                      <th className="text-left py-3 text-slate-500 font-medium">選定理由</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { layer: "Frontend", tech: "Next.js 16 + React 19", reason: "RSC + Server Actionsで高速描画" },
                      { layer: "Styling", tech: "Tailwind CSS 4", reason: "ユーティリティファーストで高速開発" },
                      { layer: "State", tech: "Zustand + TanStack Query", reason: "軽量キャッシュ＆サーバー状態管理" },
                      { layer: "Backend", tech: "Next.js API + Hono", reason: "エッジランタイム対応" },
                      { layer: "DB", tech: "Supabase (PostgreSQL)", reason: "Realtime + 型安全" },
                      { layer: "AI", tech: "Claude API (Opus/Sonnet)", reason: "ES解析・メール分類・メンター" },
                      { layer: "Auth", tech: "Supabase + Passkey", reason: "パスワードレス認証" },
                      { layer: "Search", tech: "Meilisearch", reason: "超高速全文検索" },
                      { layer: "Deploy", tech: "Vercel (Edge)", reason: "グローバルCDN + ISR" },
                    ].map((r) => (
                      <tr key={r.layer} className="border-b border-slate-100">
                        <td className="py-3 font-semibold text-slate-900">{r.layer}</td>
                        <td className="py-3 text-blue-600 font-medium">{r.tech}</td>
                        <td className="py-3 text-slate-500">{r.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 05 Security */}
            <section id="security">
              <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-200 pb-3 mb-6">
                05 — セキュリティ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "暗号化", desc: "AES-256-GCMによるE2E暗号化、TLS 1.3通信" },
                  { title: "認証", desc: "Passkey (WebAuthn) + OAuth 2.0 PKCE" },
                  { title: "認可", desc: "RBAC + Row Level Security (Supabase)" },
                  { title: "コンプライアンス", desc: "APPI完全準拠、OWASP Top 10対応" },
                  { title: "監査", desc: "不可変の監査ログ、即時データ削除権" },
                  { title: "インフラ", desc: "SOC 2 Type II取得予定、脆弱性自動スキャン" },
                ].map((s) => (
                  <div key={s.title} className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <h4 className="text-sm font-bold text-slate-900">{s.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 06 Roadmap */}
            <section id="roadmap">
              <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-200 pb-3 mb-6">
                06 — ロードマップ
              </h2>
              <div className="space-y-4">
                {[
                  { phase: "Phase 1", period: "Q2 2026", title: "MVP Launch", desc: "コア5機能リリース、1,000ユーザー獲得", color: "bg-blue-500" },
                  { phase: "Phase 2", period: "Q3 2026", title: "Growth", desc: "OB/OG DB拡充、大学公認連携開始、10,000ユーザー", color: "bg-violet-500" },
                  { phase: "Phase 3", period: "Q4 2026 - Q1 2027", title: "Scale", desc: "100,000ユーザー、就活アプリ利用率No.1獲得", color: "bg-emerald-500" },
                  { phase: "Phase 4", period: "2027+", title: "Expansion", desc: "B2B展開（企業向け採用OS）、海外展開", color: "bg-amber-500" },
                ].map((p) => (
                  <div key={p.phase} className="flex gap-4 items-start">
                    <div className={`h-3 w-3 rounded-full mt-1.5 ${p.color} shrink-0`} />
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900">{p.phase}</span>
                        <span className="text-xs text-slate-400">{p.period}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{p.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-200 rounded-xl p-8 text-center">
              <h3 className="text-lg font-extrabold text-slate-900">実際に触って確かめる</h3>
              <p className="text-sm text-slate-500 mt-1">全機能をデモでお試しいただけます。</p>
              <Link
                href="/dashboard"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors shadow-sm"
              >
                デモを体験する <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-10 px-6">
        <div className="mx-auto max-w-[1100px] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
              <span className="text-white text-[8px] font-black">S</span>
            </div>
            <span className="text-xs font-bold text-slate-400">ShukatsuOS</span>
          </div>
          <p className="text-xs text-slate-400">&copy; 2026 ShukatsuOS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
