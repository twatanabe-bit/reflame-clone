"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FileText,
  Shield,
  Zap,
  Brain,
  BarChart3,
  Users,
  Mail,
  Calendar,
  Trophy,
  Heart,
  Gamepad2,
  Lock,
  Database,
  Globe,
  Cpu,
  Smartphone,
  Server,
  Code,
} from "lucide-react";

function SpecNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500" />
          <span className="text-base font-black tracking-tight">ShukatsuOS</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/features" className="text-xs text-slate-400 hover:text-white transition-colors">機能</Link>
          <Link href="/dashboard" className="text-xs text-slate-400 hover:text-white transition-colors">デモ</Link>
          <Link href="/spec" className="text-xs text-white font-semibold">仕様書</Link>
        </div>
        <Link
          href="/dashboard"
          className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-xs font-bold text-white"
        >
          無料で始める
        </Link>
      </div>
    </nav>
  );
}

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-16 scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-gradient text-sm font-black">{number}</span>
        <div className="h-5 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
        <h2 className="text-xl font-black md:text-2xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function TableRow({ cells, header }: { cells: string[]; header?: boolean }) {
  return (
    <div
      className={`grid gap-4 border-b border-white/[0.05] px-5 py-3 ${
        header ? "bg-white/[0.04] text-xs font-bold text-slate-400" : "text-sm"
      }`}
      style={{ gridTemplateColumns: `repeat(${cells.length}, 1fr)` }}
    >
      {cells.map((c, i) => (
        <span key={i} className={i === 0 && !header ? "text-slate-300 font-medium" : "text-slate-400"}>
          {c}
        </span>
      ))}
    </div>
  );
}

export default function SpecPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <SpecNav />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-blue-500/[0.05] blur-[100px]" />
        <div className="relative z-10 mx-auto max-w-[800px]">
          <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-semibold tracking-wider text-blue-300 mb-6">
            <FileText className="h-3 w-3" />
            SPECIFICATION DOCUMENT v1.0.0
          </div>
          <h1 className="text-4xl font-black md:text-5xl leading-tight">
            <span className="text-gradient">ShukatsuOS</span>
            <br />
            開発仕様書
          </h1>
          <p className="mt-4 text-slate-400 max-w-[560px] leading-[1.8]">
            日本の就活市場における情報の断片化・手入力の煩雑さ・精神的不安を
            テクノロジーで根本から解決する、次世代就活統合管理プラットフォームの全仕様。
          </p>

          {/* TOC */}
          <div className="mt-10 glass rounded-xl p-6">
            <div className="text-xs font-bold text-slate-400 mb-3">目次</div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {[
                { num: "01", title: "バリュープロポジション", id: "value" },
                { num: "02", title: "競合比較と差別化戦略", id: "competitor" },
                { num: "03", title: "コア機能（Feature Set）", id: "features" },
                { num: "04", title: "ユーザー体験（UX）設計", id: "ux" },
                { num: "05", title: "技術スタック", id: "tech" },
                { num: "06", title: "セキュリティ", id: "security" },
                { num: "07", title: "ロードマップ", id: "roadmap" },
                { num: "08", title: "デザインシステム", id: "design" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 glass-hover transition-all text-sm"
                >
                  <span className="text-gradient text-xs font-black">{item.num}</span>
                  <span className="text-slate-300">{item.title}</span>
                  <ChevronRight className="h-3 w-3 text-slate-600 ml-auto" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[800px] px-6 pb-24">
        {/* 01 Value Proposition */}
        <Section id="value" number="01" title="バリュープロポジション">
          <div className="glass rounded-xl p-6 text-center mb-6">
            <p className="text-lg font-bold text-gradient leading-relaxed">
              「メール・LINE・各社マイページ・ES・面接対策・OB訪問
              <br className="hidden md:block" />
              — すべてが一つになる。手入力ゼロの就活OS。」
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {[
              { icon: <Zap className="h-5 w-5 text-blue-400" />, title: "手入力ゼロ", desc: "AI自動同期による完全自動化" },
              { icon: <BarChart3 className="h-5 w-5 text-purple-400" />, title: "情報一元化", desc: "全チャネルを単一ダッシュボードに統合" },
              { icon: <Heart className="h-5 w-5 text-rose-400" />, title: "不安解消", desc: "可視化 + AIメンターで精神的サポート" },
            ].map((v, i) => (
              <div key={i} className="glass rounded-xl p-5">
                {v.icon}
                <h3 className="mt-3 text-sm font-bold">{v.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 02 Competitor Analysis */}
        <Section id="competitor" number="02" title="競合比較と差別化戦略">
          <div className="glass rounded-xl overflow-hidden mb-6">
            <TableRow cells={["サービス", "主な弱点"]} header />
            {[
              ["リクナビ", "UIが旧世代、通知過多、手入力が膨大"],
              ["マイナビ", "機能肥大化によるUX劣化、パーソナライズ不足"],
              ["ONE CAREER", "ES・体験談は強いが管理機能が弱い"],
              ["外資就活", "ターゲットが狭い（上位校限定感）"],
              ["OfferBox", "逆求人特化で総合管理不可"],
              ["Notion（自作）", "設定が面倒、就活特化の自動化なし"],
            ].map((row, i) => (
              <TableRow key={i} cells={row} />
            ))}
          </div>

          <h3 className="text-base font-bold mb-3">ShukatsuOSの差別化</h3>
          <div className="glass rounded-xl overflow-hidden">
            <TableRow cells={["差別化軸", "実現方法"]} header />
            {[
              ["手入力ゼロ", "メール自動解析AI + マイページ連携"],
              ["情報一元化", "メール / LINE / カレンダー / ES統合"],
              ["不安解消", "RPGステータス + AIメンター"],
              ["Z世代UX", "Liquid Glass + 60fps + ゲーミフィケーション"],
              ["AI-Native", "ES添削 / 面接練習 / 企業マッチング"],
            ].map((row, i) => (
              <TableRow key={i} cells={row} />
            ))}
          </div>
        </Section>

        {/* 03 Core Features */}
        <Section id="features" number="03" title="コア機能（Feature Set）">
          {[
            {
              icon: <Mail className="h-5 w-5" />,
              name: "AI自動同期エンジン",
              color: "#3B82F6",
              items: [
                "Gmail / Outlook連携でメール自動スキャン",
                "選考案内 → ステータス更新、合否通知 → 即時反映",
                "ES締切 → デッドライン自動設定",
                "Google Calendar / Apple Calendar 双方向同期",
                "移動時間の自動算出（Google Maps API）",
              ],
            },
            {
              icon: <FileText className="h-5 w-5" />,
              name: "ES 2.0",
              color: "#8B5CF6",
              items: [
                "合格ES 50万件ベースのAI添削エンジン",
                "構成 / 具体性 / 論理性 / 独自性 / 文字数の5段階評価",
                "類似設問の自動検出 → 使い回し最適化提案",
                "バージョン管理（差分表示）",
                "締切連動の提出トラッキング",
              ],
            },
            {
              icon: <BarChart3 className="h-5 w-5" />,
              name: "リアルタイム・ダッシュボード",
              color: "#10B981",
              items: [
                "カンバンボード形式の選考パイプライン",
                "RPGステータス画面（レベル / EXP / バッジ）",
                "統計ダッシュボード（通過率 / ヒートマップ）",
                "同期の匿名平均との比較",
              ],
            },
            {
              icon: <Users className="h-5 w-5" />,
              name: "OB/OG・内定者DB連携",
              color: "#F59E0B",
              items: [
                "志望企業 × 大学 × 学部でOB/OG自動検索",
                "内定者のES・面接体験談閲覧",
                "チャットベース相談（匿名オプション）",
              ],
            },
            {
              icon: <Brain className="h-5 w-5" />,
              name: "AIメンター（ShukatsuMentor）",
              color: "#EF4444",
              items: [
                "24時間対応のAIメンター",
                "面接質問の回答練習（音声対応）",
                "メンタルヘルスチェック & 励ましメッセージ",
                "お祈りメール受信時の自動フォロー",
              ],
            },
          ].map((f, i) => (
            <div key={i} className="glass rounded-xl p-5 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="h-9 w-9 rounded-lg flex items-center justify-center text-white"
                  style={{ background: f.color }}
                >
                  {f.icon}
                </div>
                <h3 className="text-base font-bold">{f.name}</h3>
              </div>
              <ul className="space-y-2 ml-12">
                {f.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: f.color }} />
                    <span className="text-sm text-slate-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {/* 04 UX Design */}
        <Section id="ux" number="04" title="ユーザー体験（UX）設計">
          <h3 className="text-base font-bold mb-4">黄金の1分間フロー</h3>
          <div className="glass rounded-xl p-5 mb-6">
            {[
              { time: "0s", label: "アプリ起動", desc: "" },
              { time: "3s", label: "ダッシュボード表示", desc: "「今日やるべきこと」が3つ以内で表示" },
              { time: "10s", label: "最優先タスクをタップ", desc: "例: 明日締切のES → 編集画面へ" },
              { time: "30s", label: "AIが下書き提案済み", desc: "微修正するだけ" },
              { time: "45s", label: "ES提出完了", desc: "達成アニメーション + ステータス自動更新" },
              { time: "60s", label: "次のタスク表示", desc: "or「今日のミッション完了!」" },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4 mb-4 last:mb-0">
                <div className="text-right min-w-[40px]">
                  <span className="text-xs font-black text-gradient">{step.time}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                  {i < 5 && <div className="w-px h-8 bg-gradient-to-b from-blue-500/40 to-transparent" />}
                </div>
                <div>
                  <div className="text-sm font-bold">{step.label}</div>
                  {step.desc && <div className="text-xs text-slate-500">{step.desc}</div>}
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-base font-bold mb-4">ゲーミフィケーション要素</h3>
          <div className="glass rounded-xl overflow-hidden">
            <TableRow cells={["要素", "実装"]} header />
            {[
              ["レベルシステム", "アクション（ES提出等）でEXP獲得 → レベルアップ"],
              ["デイリーミッション", "「今日のES 1社」「企業研究 15分」等"],
              ["バッジコレクション", "「ES10社マスター」「面接王」等の実績"],
              ["ストリーク", "連続ログイン日数 → 特別称号"],
              ["進化するアバター", "進捗に応じてアバターが成長"],
            ].map((row, i) => (
              <TableRow key={i} cells={row} />
            ))}
          </div>
        </Section>

        {/* 05 Tech Stack */}
        <Section id="tech" number="05" title="技術スタック">
          <div className="glass rounded-xl overflow-hidden">
            <TableRow cells={["レイヤー", "技術", "選定理由"]} header />
            {[
              ["Frontend", "Next.js 16 + React 19", "RSC + Server Actions で爆速"],
              ["Styling", "Tailwind CSS 4 + Framer Motion", "Liquid Glass実現"],
              ["State", "Zustand + TanStack Query", "軽量 + キャッシュ最適化"],
              ["Backend", "Next.js API Routes + Hono", "Edge Runtime低レイテンシ"],
              ["Database", "Supabase (PostgreSQL)", "リアルタイム同期 + 型安全"],
              ["AI", "Claude API (Opus/Sonnet)", "ES添削・メール解析"],
              ["Auth", "Supabase Auth + Passkey", "パスワードレス認証"],
              ["Search", "Meilisearch", "爆速全文検索"],
              ["Deploy", "Vercel (Edge)", "グローバルCDN + ISR"],
            ].map((row, i) => (
              <TableRow key={i} cells={row} />
            ))}
          </div>
        </Section>

        {/* 06 Security */}
        <Section id="security" number="06" title="セキュリティ">
          <div className="glass rounded-xl overflow-hidden">
            <TableRow cells={["要件", "実装"]} header />
            {[
              ["データ暗号化", "AES-256-GCM（保存時）+ TLS 1.3（通信時）"],
              ["認証", "Passkey (WebAuthn) + OAuth 2.0 PKCE"],
              ["認可", "RBAC + Row Level Security"],
              ["Credential Vault", "E2E暗号化、サーバー側で復号不可"],
              ["個人情報保護", "APPI（個人情報保護法）完全準拠"],
              ["監査ログ", "全操作の不可逆ログ記録"],
              ["脆弱性対策", "OWASP Top 10対応、定期ペネトレ"],
              ["データ削除権", "ユーザーが全データを即時完全削除可能"],
            ].map((row, i) => (
              <TableRow key={i} cells={row} />
            ))}
          </div>
        </Section>

        {/* 07 Roadmap */}
        <Section id="roadmap" number="07" title="ロードマップ">
          <div className="space-y-4">
            {[
              {
                phase: "Phase 1: MVP",
                period: "2026年Q2（3ヶ月）",
                goal: "コアユーザー1,000人獲得",
                color: "#3B82F6",
                items: ["ダッシュボード", "ES管理 + AI添削基本版", "メール自動解析（Gmail）", "RPGステータス基本版", "Google OAuth + Passkey"],
                active: true,
              },
              {
                phase: "Phase 2: Growth",
                period: "2026年Q3（3ヶ月）",
                goal: "ユーザー10,000人、DAU 30%",
                color: "#8B5CF6",
                items: ["LINE連携", "OB/OG・内定者DB", "AIメンター", "ゲーミフィケーション全機能", "オフライン対応"],
                active: false,
              },
              {
                phase: "Phase 3: Scale",
                period: "2026年Q4〜2027年Q1（6ヶ月）",
                goal: "ユーザー100,000人、シェア1位",
                color: "#10B981",
                items: ["面接練習AI（音声 + 動画）", "企業マッチングAI", "メンタルケア機能", "ブラウザ拡張", "SOC 2認証取得"],
                active: false,
              },
              {
                phase: "Phase 4: Domination",
                period: "2027年〜",
                goal: "日本の就活インフラに",
                color: "#F59E0B",
                items: ["B2B企業向けダッシュボード", "海外就活対応", "転職市場への拡張", "API公開"],
                active: false,
              },
            ].map((p, i) => (
              <div
                key={i}
                className={`glass rounded-xl p-6 ${p.active ? "border-blue-500/30 glow-blue" : ""}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="h-3 w-3 rounded-full" style={{ background: p.color }} />
                  <h3 className="text-base font-bold">{p.phase}</h3>
                  {p.active && (
                    <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400">
                      CURRENT
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
                  <span>{p.period}</span>
                  <span>目標: {p.goal}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full px-3 py-1 text-xs"
                      style={{
                        background: `${p.color}15`,
                        color: p.color,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 08 Design System */}
        <Section id="design" number="08" title="デザインシステム">
          <div className="glass rounded-xl p-6 mb-6">
            <h3 className="text-sm font-bold mb-3">トンマナ（Tone & Manner）</h3>
            <div className="glass rounded-lg p-4 mb-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong>コンセプト:</strong> 「信頼できる先輩 × 最先端テクノロジー」
              </p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                プロフェッショナルだが親しみやすい。Z世代が「ダサい」と感じない洗練さ。
                ダークネイビー基調 + Blue → Purple グラデーション。
                Liquid Glass（すりガラス透過）+ Subtle Motion。
              </p>
            </div>

            <h4 className="text-xs font-bold text-slate-400 mb-3">カラーパレット</h4>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 mb-4">
              {[
                { name: "Deep Navy", hex: "#0A0E1A", text: "white" },
                { name: "Blue", hex: "#3B82F6", text: "white" },
                { name: "Purple", hex: "#8B5CF6", text: "white" },
                { name: "Emerald", hex: "#10B981", text: "white" },
                { name: "Amber", hex: "#F59E0B", text: "black" },
                { name: "Rose", hex: "#EF4444", text: "white" },
                { name: "Text Primary", hex: "#F8FAFC", text: "black" },
                { name: "Text Muted", hex: "#94A3B8", text: "black" },
              ].map((c) => (
                <div key={c.name} className="rounded-lg overflow-hidden">
                  <div className="h-10" style={{ background: c.hex }} />
                  <div className="glass p-2">
                    <div className="text-[10px] font-bold">{c.name}</div>
                    <div className="text-[9px] text-slate-500">{c.hex}</div>
                  </div>
                </div>
              ))}
            </div>

            <h4 className="text-xs font-bold text-slate-400 mb-3">Glass Effect</h4>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-xs font-bold mb-1">Glass</div>
                <div className="text-[10px] text-slate-500">blur(20px) opacity(0.06)</div>
              </div>
              <div className="glass-strong rounded-xl p-4 text-center">
                <div className="text-xs font-bold mb-1">Glass Strong</div>
                <div className="text-[10px] text-slate-500">blur(32px) opacity(0.10)</div>
              </div>
              <div className="glass glass-hover rounded-xl p-4 text-center cursor-pointer">
                <div className="text-xs font-bold mb-1">Glass Hover</div>
                <div className="text-[10px] text-slate-500">Hover me</div>
              </div>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <div className="text-center pt-8">
          <p className="text-sm text-slate-500 italic mb-6">
            ShukatsuOS — 就活の「面倒」を「熱狂」に変える。
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-[2px]"
          >
            デモを体験する
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] py-8 px-6 mt-16">
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
