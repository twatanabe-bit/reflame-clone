import Link from "next/link";
import {
  ArrowRight,
  Mail,
  FileText,
  BarChart3,
  Users,
  Brain,
  Shield,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Zap,
  Lock,
  Eye,
} from "lucide-react";

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
          <Link href="/features" className="text-sm text-blue-600 font-semibold">機能</Link>
          <Link href="/spec" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">仕様書</Link>
          <Link href="/dashboard" className="rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors">
            無料で始める
          </Link>
        </div>
      </div>
    </nav>
  );
}

const features = [
  {
    id: "sync",
    icon: Mail,
    color: "#2563EB",
    title: "AI自動同期エンジン",
    subtitle: "メールを読む必要は、もうない。",
    description: "Gmail/Outlookと連携し、就活関連メールをAIが自動解析。選考結果を即座にパイプラインに反映します。",
    capabilities: [
      "メール自動分類（選考通知・日程調整・お祈り）",
      "カレンダー自動同期（Google/Apple）",
      "締切3日前・1日前・3時間前リマインド",
      "移動時間の自動計算",
    ],
  },
  {
    id: "es",
    icon: FileText,
    color: "#7C3AED",
    title: "ES 2.0",
    subtitle: "50万件の合格ESが、あなたのコーチに。",
    description: "AIが5つの評価軸でESを添削。過去の合格ESパターンと照合し、通過率を最大化します。",
    capabilities: [
      "5軸AI評価（構成・具体性・論理性・独自性・文字数）",
      "類似設問の自動検出・流用提案",
      "バージョン管理（差分ビュー対応）",
      "締切連動の提出ステータス管理",
    ],
  },
  {
    id: "pipeline",
    icon: BarChart3,
    color: "#059669",
    title: "選考パイプライン",
    subtitle: "24社の進捗を、1画面で。",
    description: "カンバン形式で全選考を可視化。ES提出から内定まで、すべてのステージを一目で把握。",
    capabilities: [
      "6ステージのカンバンビュー",
      "ドラッグ&ドロップでステータス更新",
      "企業ごとの選考履歴タイムライン",
      "KPIダッシュボード（通過率・内定率）",
    ],
  },
  {
    id: "obog",
    icon: Users,
    color: "#D97706",
    title: "OB/OG・内定者DB",
    subtitle: "先輩の知恵を、あなたの武器に。",
    description: "企業×大学×学部でOB/OGを検索。ESサンプルや面接体験談にアクセスし、選考対策を強化。",
    capabilities: [
      "企業×大学×学部の3軸検索",
      "マッチスコアで最適な先輩を提案",
      "ESサンプル・面接体験談の閲覧",
      "匿名チャットでの気軽な相談",
    ],
  },
  {
    id: "mentor",
    icon: Brain,
    color: "#DC2626",
    title: "AIメンター",
    subtitle: "24時間、あなた専属のキャリアアドバイザー。",
    description: "面接練習、自己分析、企業研究、メンタルケアまで。あらゆる就活相談にAIが即座に回答。",
    capabilities: [
      "模擬面接（音声対応）",
      "自己分析の深掘りワーク",
      "企業研究レポートの自動生成",
      "ケーススタディ・フェルミ推定対策",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-[800px] text-center">
          <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase">Features</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 leading-tight">
            就活に必要な全てを、
            <br />
            1つのプラットフォームに。
          </h1>
          <p className="mt-4 text-base text-slate-500 max-w-lg mx-auto">
            5つのコア機能とエンタープライズグレードのセキュリティで、
            安心して就活に集中できる環境を提供します。
          </p>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="pb-20 px-6">
        <div className="mx-auto max-w-[900px] space-y-16">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={f.id}
                className={`flex flex-col md:flex-row gap-8 items-start ${
                  idx % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1">
                  <div
                    className="inline-flex h-12 w-12 rounded-xl items-center justify-center mb-4"
                    style={{ backgroundColor: f.color + "10" }}
                  >
                    <Icon className="h-6 w-6" style={{ color: f.color }} />
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">{f.title}</h2>
                  <p className="text-sm font-medium mt-1" style={{ color: f.color }}>
                    {f.subtitle}
                  </p>
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                    {f.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {f.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: f.color }} />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex-1 bg-slate-50 rounded-xl border border-slate-200 p-6 min-h-[200px] flex items-center justify-center">
                  <div className="text-center">
                    <Icon className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                    <p className="text-sm text-slate-400 font-medium">{f.title} プレビュー</p>
                    <Link
                      href="/dashboard"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      デモで試す <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Security */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="mx-auto max-w-[800px]">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-emerald-600 tracking-wider uppercase">Security</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
              エンタープライズグレードのセキュリティ
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Lock, title: "E2E暗号化", desc: "AES-256-GCMによる端末間暗号化" },
              { icon: Shield, title: "Passkey認証", desc: "パスワードレスでセキュアなログイン" },
              { icon: Eye, title: "APPI準拠", desc: "個人情報保護法に完全準拠" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="bg-white rounded-xl border border-slate-200 p-5 text-center">
                  <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{s.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-[600px] text-center">
          <h2 className="text-2xl font-extrabold text-slate-900">全機能をデモで体験</h2>
          <p className="mt-2 text-sm text-slate-500">登録不要で今すぐお試しいただけます。</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors flex items-center gap-2 shadow-sm"
            >
              デモを体験する <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/spec"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 transition-colors"
            >
              仕様書を見る
            </Link>
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
