import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Mail,
  FileText,
  BarChart3,
  Users,
  Brain,
  Calendar,
  Sparkles,
} from "lucide-react";

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
            <span className="text-white text-xs font-black">S</span>
          </div>
          <span className="text-sm font-extrabold tracking-tight text-slate-900">
            ShukatsuOS
          </span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/features" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
            機能
          </Link>
          <Link href="/spec" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
            仕様書
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors"
          >
            無料で始める
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="mx-auto max-w-[800px] text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 mb-6">
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          <span className="text-xs font-semibold text-blue-700">
            2027卒対応 — AI-Native 就活管理プラットフォーム
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
          就活の「全て」を、
          <br />
          <span className="text-gradient">ひとつに。</span>
        </h1>

        <p className="mt-5 text-lg text-slate-500 leading-relaxed max-w-lg mx-auto">
          メール自動解析、ES-AI添削、選考パイプライン管理、AIメンター。
          手入力ゼロで就活の全情報を一元管理。
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors flex items-center gap-2 shadow-sm"
          >
            デモを体験する
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/features"
            className="rounded-xl border border-slate-300 hover:border-slate-400 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors flex items-center gap-1"
          >
            機能を見る
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="mt-4 text-xs text-slate-400">無料 ・ 登録不要でデモ体験可能</p>
      </div>

      <div className="mx-auto max-w-[600px] mt-14 grid grid-cols-3 gap-6">
        {[
          { value: "0秒", label: "手入力" },
          { value: "AI", label: "自動同期" },
          { value: "1画面", label: "全情報集約" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-2xl font-extrabold text-slate-900">{s.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProblemSection() {
  const problems = [
    { title: "情報がバラバラ", description: "メール、LINE、マイナビ、リクナビ、Notion…就活情報が5つ以上のツールに散らばり、どこに何があるか分からない。", icon: Mail },
    { title: "手入力が多すぎる", description: "選考結果の更新、スケジュール入力、ES管理…全てが手動。毎日30分以上を管理作業に浪費。", icon: FileText },
    { title: "進捗が見えない", description: "何社受けて、何が通って、次に何をすべきか。全体像が見えず、不安だけが募る毎日。", icon: BarChart3 },
  ];

  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="mx-auto max-w-[1000px]">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-red-500 tracking-wider uppercase">Problem</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">就活生の3大苦痛</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { icon: Mail, title: "AI自動同期", description: "Gmail/Outlookと連携。選考メールを自動解析し、ステータスを即座に更新。", color: "#2563EB" },
    { icon: FileText, title: "ES 2.0", description: "50万件の合格ESベースのAI添削。5軸評価でES通過率を最大化。", color: "#7C3AED" },
    { icon: BarChart3, title: "選考パイプライン", description: "カンバン形式で全選考を可視化。ドラッグ&ドロップで簡単管理。", color: "#059669" },
    { icon: Users, title: "OB/OG DB", description: "企業×大学×学部で先輩を検索。ESサンプルや面接体験談を閲覧。", color: "#D97706" },
    { icon: Brain, title: "AIメンター", description: "24時間対応のAIが面接練習・自己分析・企業研究をサポート。", color: "#DC2626" },
    { icon: Calendar, title: "スケジュール管理", description: "面接・締切・OB面談をカレンダーで一元管理。リマインド機能付き。", color: "#0891B2" },
  ];

  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-[1000px]">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase">Features</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">6つのコア機能</h2>
          <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">バラバラだった就活を1つのプラットフォームに統合</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-300 hover:shadow-sm transition-all">
                <div className="h-10 w-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: f.color + "10" }}>
                  <Icon className="h-5 w-5" style={{ color: f.color }} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const competitors = ["リクナビ", "マイナビ", "ONE CAREER", "ShukatsuOS"];
  const criteria = [
    { label: "メールAI連携", values: ["×", "×", "×", "◎"] },
    { label: "ES AI添削", values: ["△", "△", "○", "◎"] },
    { label: "選考パイプライン", values: ["×", "×", "△", "◎"] },
    { label: "OB/OG DB", values: ["△", "△", "○", "◎"] },
    { label: "AIメンター", values: ["×", "×", "×", "◎"] },
    { label: "ゲーミフィケーション", values: ["×", "×", "×", "◎"] },
  ];

  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="mx-auto max-w-[800px]">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-violet-600 tracking-wider uppercase">Comparison</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">他サービスとの比較</h2>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left p-4 text-slate-500 font-medium" />
                {competitors.map((c) => (
                  <th key={c} className={`p-4 text-center font-bold ${c === "ShukatsuOS" ? "text-blue-600 bg-blue-50" : "text-slate-600"}`}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {criteria.map((row) => (
                <tr key={row.label} className="border-b border-slate-100">
                  <td className="p-4 text-slate-700 font-medium">{row.label}</td>
                  {row.values.map((v, i) => (
                    <td key={i} className={`p-4 text-center ${i === 3 ? "bg-blue-50 font-bold text-blue-600" : "text-slate-500"}`}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10 px-6">
      <div className="mx-auto max-w-[1100px] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
            <span className="text-white text-[8px] font-black">S</span>
          </div>
          <span className="text-xs font-bold text-slate-400">ShukatsuOS</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/features" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">機能</Link>
          <Link href="/spec" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">仕様書</Link>
          <Link href="/dashboard" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">デモ</Link>
        </div>
        <p className="text-xs text-slate-400">&copy; 2026 ShukatsuOS. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <ComparisonSection />
      <section className="py-20 px-6">
        <div className="mx-auto max-w-[600px] text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">就活を、もっとスマートに。</h2>
          <p className="mt-3 text-sm text-slate-500">登録不要でデモをお試しいただけます。</p>
          <Link
            href="/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-8 py-3.5 text-sm font-semibold text-white transition-colors shadow-sm"
          >
            デモを体験する
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
