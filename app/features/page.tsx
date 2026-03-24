"use client";

import Link from "next/link";
import {
  ArrowLeft,
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
  Gamepad2,
  Heart,
  Lock,
  Smartphone,
  Globe,
  Database,
  Cpu,
} from "lucide-react";

function FeatureHero() {
  return (
    <section className="relative pt-32 pb-20 px-6 text-center">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-blue-500/[0.05] blur-[100px]" />
      <div className="relative z-10 mx-auto max-w-[800px]">
        <span className="text-xs font-semibold tracking-[0.15em] text-blue-400 uppercase">
          Features
        </span>
        <h1 className="mt-4 text-4xl font-black md:text-6xl leading-tight">
          全ての機能が
          <br />
          <span className="text-gradient">次世代レベル</span>
        </h1>
        <p className="mt-6 text-slate-400 max-w-[560px] mx-auto leading-[1.8]">
          リクナビ、マイナビ、ONE CAREER、Notion…
          今まで5つ以上のツールに散らばっていた就活の全てを、ひとつのOSに。
        </p>
      </div>
    </section>
  );
}

function FeatureDetail({
  icon,
  tag,
  tagColor,
  title,
  description,
  features,
  reverse,
  mockup,
}: {
  icon: React.ReactNode;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  features: string[];
  reverse?: boolean;
  mockup: React.ReactNode;
}) {
  return (
    <section className="relative py-20 px-6">
      <div
        className={`mx-auto max-w-[1080px] flex flex-col gap-12 items-center ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        {/* Text */}
        <div className="flex-1 max-w-[480px]">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center text-white"
              style={{ background: tagColor }}
            >
              {icon}
            </div>
            <span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: tagColor }}>
              {tag}
            </span>
          </div>
          <h2 className="text-2xl font-black md:text-3xl leading-tight mb-4">{title}</h2>
          <p className="text-sm leading-[1.9] text-slate-400 mb-6">{description}</p>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: tagColor }} />
                <span className="text-sm text-slate-300">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mockup */}
        <div className="flex-1 max-w-[520px] w-full">{mockup}</div>
      </div>
    </section>
  );
}

/* Mock components for each feature */
function SyncEngineMockup() {
  return (
    <div className="glass-strong rounded-2xl p-5 glow-blue">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="h-4 w-4 text-blue-400" />
        <span className="text-xs font-bold">AI自動同期</span>
        <span className="ml-auto text-[10px] text-emerald-400">リアルタイム</span>
      </div>
      <div className="space-y-2">
        {[
          { from: "三菱商事 採用担当", subject: "最終面接のご案内", action: "カレンダー登録済", color: "#10B981", time: "2分前" },
          { from: "Google Japan HR", subject: "2次選考通過のお知らせ", action: "ステータス更新済", color: "#3B82F6", time: "1時間前" },
          { from: "野村総研 新卒採用", subject: "ES提出締切リマインド", action: "締切アラート設定済", color: "#F59E0B", time: "3時間前" },
        ].map((m, i) => (
          <div key={i} className="glass rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold text-slate-300">{m.from}</span>
              <span className="text-[9px] text-slate-600">{m.time}</span>
            </div>
            <div className="text-[10px] text-slate-500 mb-2">{m.subject}</div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" style={{ color: m.color }} />
              <span className="text-[10px] font-semibold" style={{ color: m.color }}>
                {m.action}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ESMockup() {
  return (
    <div className="glass-strong rounded-2xl p-5 glow-purple">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-4 w-4 text-purple-400" />
        <span className="text-xs font-bold">ES AI添削</span>
      </div>
      <div className="glass rounded-lg p-4 mb-3">
        <div className="text-[10px] text-slate-500 mb-2">三菱商事 — 学生時代に力を入れたこと (400字)</div>
        <div className="text-xs leading-[1.8] text-slate-300">
          私は大学時代、
          <span className="bg-purple-500/20 text-purple-300 rounded px-1">ビジネスコンテストの運営</span>
          に力を入れました。チームリーダーとして
          <span className="bg-blue-500/20 text-blue-300 rounded px-1">20名のメンバー</span>
          を統率し...
        </div>
      </div>
      <div className="space-y-2">
        <div className="glass rounded-lg p-3 flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] font-bold text-purple-300">AI提案: 具体性UP</div>
            <div className="text-[10px] text-slate-500">
              「20名」→ 具体的な役割分担や成果数値を追加すると説得力が向上します
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {[
            { label: "構成", score: 85, color: "#3B82F6" },
            { label: "具体性", score: 65, color: "#F59E0B" },
            { label: "独自性", score: 78, color: "#10B981" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-lg p-2 flex-1 text-center">
              <div className="text-lg font-black" style={{ color: s.color }}>
                {s.score}
              </div>
              <div className="text-[9px] text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="glass-strong rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Gamepad2 className="h-4 w-4 text-emerald-400" />
        <span className="text-xs font-bold">RPGステータス</span>
      </div>
      <div className="glass rounded-lg p-4 mb-3 text-center">
        <span className="text-3xl">⚔️</span>
        <div className="text-lg font-black text-amber-400 mt-1">Lv.12 就活戦士</div>
        <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden mt-2 mx-8">
          <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 w-[69%]" />
        </div>
        <div className="text-[10px] text-slate-500 mt-1">1,240 / 1,800 EXP</div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { emoji: "📝", name: "ES Master", unlocked: true },
          { emoji: "🎤", name: "Interview Pro", unlocked: true },
          { emoji: "🔥", name: "30日連続", unlocked: false },
        ].map((b) => (
          <div
            key={b.name}
            className={`glass rounded-lg p-3 text-center ${!b.unlocked ? "opacity-30" : ""}`}
          >
            <span className="text-xl">{b.emoji}</span>
            <div className="text-[9px] text-slate-500 mt-1">{b.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OBMockup() {
  return (
    <div className="glass-strong rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-4 w-4 text-amber-400" />
        <span className="text-xs font-bold">OB/OG マッチング</span>
      </div>
      <div className="space-y-2">
        {[
          { name: "山田 花子", company: "三菱商事", univ: "早稲田大学", year: "2024年入社", match: 95 },
          { name: "佐藤 健太", company: "マッキンゼー", univ: "東京大学", year: "2023年入社", match: 88 },
          { name: "鈴木 美咲", company: "Google", univ: "慶應義塾大学", year: "2025年入社", match: 82 },
        ].map((p) => (
          <div key={p.name} className="glass glass-hover rounded-lg p-3 flex items-center gap-3 cursor-pointer">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-sm font-bold shrink-0">
              {p.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold">{p.name}</div>
              <div className="text-[10px] text-slate-500">{p.company} / {p.univ} / {p.year}</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-sm font-black text-amber-400">{p.match}%</div>
              <div className="text-[9px] text-slate-500">マッチ度</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MentorMockup() {
  return (
    <div className="glass-strong rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="h-4 w-4 text-rose-400" />
        <span className="text-xs font-bold">AIメンター</span>
        <span className="ml-auto text-[10px] text-emerald-400">24h対応</span>
      </div>
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
          <div className="glass rounded-lg rounded-tl-none p-3 text-xs leading-[1.8] text-slate-300">
            三菱商事の最終面接、お疲れ様! よく準備してきましたね。
            次は結果を待ちながら、マッキンゼーの1次面接対策に切り替えましょう。
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <div className="glass rounded-lg rounded-tr-none p-3 text-xs leading-[1.8] text-blue-300 bg-blue-500/[0.08]">
            ありがとう! マッキンゼーのケース面接対策を始めたいです
          </div>
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 text-[10px] font-bold">
            T
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
          <div className="glass rounded-lg rounded-tl-none p-3 text-xs leading-[1.8] text-slate-300">
            いい心意気です! まずはフェルミ推定から始めましょう。
            「日本のコンビニの年間売上は?」このケースを5分で解いてみてください。
          </div>
        </div>
      </div>
    </div>
  );
}

function SecuritySection() {
  const items = [
    { icon: <Lock className="h-5 w-5" />, title: "E2E暗号化", desc: "AES-256-GCMでデータ保護。サーバーでも復号不可能。" },
    { icon: <Shield className="h-5 w-5" />, title: "Passkey認証", desc: "パスワードレス。生体認証で安全かつ高速なログイン。" },
    { icon: <Database className="h-5 w-5" />, title: "APPI準拠", desc: "個人情報保護法に完全準拠。データ削除権を保証。" },
    { icon: <Cpu className="h-5 w-5" />, title: "SOC 2 Type II", desc: "エンタープライズレベルのセキュリティ監査基準を取得予定。" },
  ];

  return (
    <section className="relative py-20 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent" />
      <div className="relative mx-auto max-w-[960px]">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.15em] text-emerald-400 uppercase">Security</span>
          <h2 className="mt-3 text-3xl font-black">
            就活情報を<span className="text-gradient">最高レベル</span>で保護
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div key={i} className="glass rounded-xl p-5 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                {item.icon}
              </div>
              <h3 className="text-sm font-bold">{item.title}</h3>
              <p className="mt-2 text-[11px] leading-[1.7] text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesCTA() {
  return (
    <section className="relative py-24 px-6 text-center">
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/[0.05] to-transparent" />
      <div className="relative z-10 mx-auto max-w-[560px]">
        <h2 className="text-3xl font-black">
          全機能を<span className="text-gradient">今すぐ体験</span>
        </h2>
        <p className="mt-4 text-sm text-slate-400">
          デモ版でダッシュボード、ES管理、AIメンターの全てを体験できます。
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-[2px]"
          >
            デモを体験する
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/spec"
            className="inline-flex items-center gap-2 rounded-full glass glass-hover px-8 py-4 text-sm font-semibold text-slate-300 transition-all"
          >
            仕様書を読む
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function FeaturesPage() {
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
            <Link href="/features" className="text-xs text-white font-semibold">機能</Link>
            <Link href="/dashboard" className="text-xs text-slate-400 hover:text-white transition-colors">デモ</Link>
            <Link href="/spec" className="text-xs text-slate-400 hover:text-white transition-colors">仕様書</Link>
          </div>
          <Link
            href="/dashboard"
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-xs font-bold text-white"
          >
            無料で始める
          </Link>
        </div>
      </nav>

      <FeatureHero />

      <FeatureDetail
        icon={<Mail className="h-4 w-4" />}
        tag="Sync Engine"
        tagColor="#3B82F6"
        title="メールを開く必要は、もうない"
        description="Gmail / Outookのメールをリアルタイムでスキャン。AIが就活メールを自動分類し、選考ステータスの更新、カレンダー登録、締切設定まで全て自動で処理します。"
        features={[
          "メール自動分類（選考案内 / 合否通知 / 説明会案内）",
          "カレンダー自動登録（Google Calendar / Apple Calendar 双方向同期）",
          "締切アラート自動設定（3日前 / 1日前 / 3時間前）",
          "移動時間の自動算出（Google Maps API連携）",
        ]}
        mockup={<SyncEngineMockup />}
      />

      <FeatureDetail
        icon={<FileText className="h-4 w-4" />}
        tag="ES 2.0"
        tagColor="#8B5CF6"
        title="合格ESを書くのは、AIと一緒に"
        description="50万件の合格ESデータベースを学習したAIが、あなたのESをリアルタイムで添削。構成・具体性・論理性・独自性を5段階で評価し、合格率を最大化します。"
        features={[
          "企業 × 設問パターン別の最適構成提案",
          "類似設問の自動検出と使い回し最適化",
          "バージョン管理（Git的な差分表示）",
          "提出トラッキング（締切連動）",
        ]}
        reverse
        mockup={<ESMockup />}
      />

      <FeatureDetail
        icon={<Gamepad2 className="h-4 w-4" />}
        tag="RPG Dashboard"
        tagColor="#10B981"
        title="就活を、冒険にする"
        description="選考状況をRPGのステータス画面で可視化。レベル、EXP、バッジ、ストリークで就活を冒険のように楽しめます。"
        features={[
          "選考パイプライン（カンバンボード形式）",
          "レベルシステム & EXPゲージ",
          "実績バッジコレクション",
          "デイリーミッション & ストリーク",
        ]}
        mockup={<DashboardMockup />}
      />

      <FeatureDetail
        icon={<Users className="h-4 w-4" />}
        tag="OB/OG Network"
        tagColor="#F59E0B"
        title="先輩の声が、最強の武器になる"
        description="志望企業 × 大学 × 学部でOB/OGを自動検索。内定者のES・面接体験談にアクセスし、チャットで直接相談。"
        features={[
          "マッチ度スコアによる最適なOB/OG提案",
          "内定者のES・面接体験談閲覧",
          "匿名チャット相談",
          "企業研究の自動レポート生成",
        ]}
        reverse
        mockup={<OBMockup />}
      />

      <FeatureDetail
        icon={<Brain className="h-4 w-4" />}
        tag="AI Mentor"
        tagColor="#EF4444"
        title="24時間、あなたの隣に"
        description="面接練習、ES相談、メンタルケアまで。お祈りメールの後も、AIメンターが自動でフォローし、次のアクションを提案します。"
        features={[
          "面接質問の回答練習（音声対応）",
          "メンタルヘルスチェック & 励ましメッセージ",
          "お祈りメール受信時の自動フォロー",
          "ケース面接・フェルミ推定の対策",
        ]}
        mockup={<MentorMockup />}
      />

      <SecuritySection />
      <FeaturesCTA />

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-8 px-6">
        <div className="mx-auto max-w-[960px] flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500" />
            <span className="text-sm font-bold">ShukatsuOS</span>
          </div>
          <p className="text-xs text-slate-600">&copy; 2026 ShukatsuOS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
