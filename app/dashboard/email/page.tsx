"use client";

import { useState } from "react";
import {
  Mail,
  Star,
  Archive,
  Trash2,
  Reply,
  ChevronRight,
  Clock,
  Building2,
  Tag,
  Filter,
  Search,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

type EmailCategory = "selection" | "offer" | "ob" | "seminar" | "other";

interface EmailMessage {
  id: number;
  from: string;
  company: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  read: boolean;
  starred: boolean;
  category: EmailCategory;
  autoTagged: boolean;
}

const categoryConfig: Record<EmailCategory, { label: string; color: string; bg: string }> = {
  selection: { label: "選考", color: "text-blue-600", bg: "bg-blue-50" },
  offer: { label: "内定", color: "text-emerald-600", bg: "bg-emerald-50" },
  ob: { label: "OB/OG", color: "text-amber-600", bg: "bg-amber-50" },
  seminar: { label: "説明会", color: "text-violet-600", bg: "bg-violet-50" },
  other: { label: "その他", color: "text-slate-500", bg: "bg-slate-100" },
};

const initialEmails: EmailMessage[] = [
  {
    id: 1,
    from: "recruit@mitsubishicorp.com",
    company: "三菱商事",
    subject: "【三菱商事】最終面接のご案内",
    preview: "田中太郎様 平素よりお世話になっております。三菱商事人事部の山田です。最終面接の詳細をお送りいたします...",
    body: "田中太郎様\n\n平素よりお世話になっております。三菱商事人事部の山田です。\n\n最終面接の詳細をお送りいたします。\n\n日時：3月26日（水）14:00～15:00\n場所：東京都千代田区丸の内2-3-1 三菱商事ビル 12階\n面接官：人事部長 佐藤、経営企画部 鈴木\n\n当日は受付にて「採用面接」とお伝えください。\n\nご不明な点がございましたら、お気軽にお問い合わせください。\n\n三菱商事株式会社\n人事部 山田花子",
    date: "3/23 15:30",
    read: true,
    starred: true,
    category: "selection",
    autoTagged: true,
  },
  {
    id: 2,
    from: "hr@google.co.jp",
    company: "Google Japan",
    subject: "【Google Japan】ES提出期限のリマインド",
    preview: "田中太郎様 エントリーシートの提出期限が3月28日に迫っております。期限内のご提出をお願いいたします...",
    body: "田中太郎様\n\nエントリーシートの提出期限が3月28日（金）23:59に迫っております。\n\n提出がお済みでない場合は、期限内にマイページよりご提出をお願いいたします。\n\nご不明点がございましたら、hr@google.co.jp までお問い合わせください。\n\nGoogle Japan 採用チーム",
    date: "3/24 09:00",
    read: false,
    starred: false,
    category: "selection",
    autoTagged: true,
  },
  {
    id: 3,
    from: "tanaka.s@mitsui.com",
    company: "三井物産",
    subject: "Re: OB訪問のお願い",
    preview: "田中さん 来週の火曜日18:00に丸の内のカフェでお会いしましょう。楽しみにしています...",
    body: "田中さん\n\nご連絡ありがとうございます。\n来週の火曜日18:00に丸の内のカフェでお会いしましょう。\n\n場所は丸の内テラスの1Fにあるカフェ「THE LOUNGE」でいかがでしょうか。\n\n何か聞きたいことがあれば事前に送っていただければ準備しておきますね。\n楽しみにしています。\n\n三井物産 田中先輩",
    date: "3/23 20:15",
    read: true,
    starred: false,
    category: "ob",
    autoTagged: true,
  },
  {
    id: 4,
    from: "noreply@recruit.co.jp",
    company: "リクルート",
    subject: "【リクルート】内定承諾書類のご案内",
    preview: "田中太郎様 この度は弊社の内定おめでとうございます。内定承諾に必要な書類をお送りいたします...",
    body: "田中太郎様\n\nこの度は弊社の内定おめでとうございます。\n\n内定承諾に必要な書類をお送りいたします。\n4月10日までにご返送ください。\n\n株式会社リクルート 人事部",
    date: "3/22 11:00",
    read: true,
    starred: true,
    category: "offer",
    autoTagged: true,
  },
  {
    id: 5,
    from: "event@toyota.co.jp",
    company: "トヨタ自動車",
    subject: "【トヨタ】技術系職種 オンライン説明会のご案内",
    preview: "就活生の皆様へ トヨタ自動車では技術系職種のオンライン説明会を開催いたします。ぜひご参加ください...",
    body: "就活生の皆様へ\n\nトヨタ自動車では技術系職種のオンライン説明会を開催いたします。\n\n日時：4月3日（木）13:00～14:30\n形式：Zoom（参加URLは後日送付）\n\nぜひご参加ください。\n\nトヨタ自動車株式会社 採用チーム",
    date: "3/21 16:45",
    read: true,
    starred: false,
    category: "seminar",
    autoTagged: true,
  },
];

export default function EmailPage() {
  const [emails, setEmails] = useState(initialEmails);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterCat, setFilterCat] = useState<EmailCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = emails.filter((e) => {
    if (filterCat !== "all" && e.category !== filterCat) return false;
    if (searchQuery && !e.company.includes(searchQuery) && !e.subject.includes(searchQuery)) return false;
    return true;
  });

  const selected = selectedId ? emails.find((e) => e.id === selectedId) : null;

  function markRead(id: number) {
    setEmails(emails.map((e) => (e.id === id ? { ...e, read: true } : e)));
  }

  function toggleStar(id: number) {
    setEmails(emails.map((e) => (e.id === id ? { ...e, starred: !e.starred } : e)));
  }

  function deleteEmail(id: number) {
    setEmails(emails.filter((e) => e.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  const unreadCount = emails.filter((e) => !e.read).length;

  return (
    <div className="max-w-6xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900">メール連携</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            就活メールをAIが自動分類・選考ステータスに反映
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 rounded-full px-2.5 py-0.5">
              {unreadCount}件 未読
            </span>
          )}
          <button className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 transition-colors">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="企業名・件名で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-1.5">
          {(["all", "selection", "offer", "ob", "seminar", "other"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilterCat(c)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filterCat === c
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {c === "all" ? "すべて" : categoryConfig[c].label}
            </button>
          ))}
        </div>
      </div>

      {/* Email List + Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 bg-white rounded-xl border border-slate-200 overflow-hidden min-h-[500px]">
        {/* List */}
        <div className="lg:col-span-2 border-r border-slate-200 overflow-y-auto max-h-[600px]">
          {filtered.map((email) => {
            const cat = categoryConfig[email.category];
            return (
              <button
                key={email.id}
                onClick={() => {
                  setSelectedId(email.id);
                  markRead(email.id);
                }}
                className={`w-full text-left px-4 py-3.5 border-b border-slate-100 transition-colors ${
                  selectedId === email.id ? "bg-blue-50" : "hover:bg-slate-50"
                } ${!email.read ? "bg-blue-50/50" : ""}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold ${!email.read ? "text-slate-900" : "text-slate-600"}`}>
                    {email.company}
                  </span>
                  {email.autoTagged && (
                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${cat.color} ${cat.bg}`}>
                      {cat.label}
                    </span>
                  )}
                  {!email.read && (
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                  )}
                </div>
                <p className={`text-[13px] truncate ${!email.read ? "font-semibold text-slate-800" : "text-slate-600"}`}>
                  {email.subject}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                    {email.preview.slice(0, 50)}...
                  </p>
                  <span className="text-[10px] text-slate-400 shrink-0 ml-2">{email.date}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <div className="lg:col-span-3 p-5 overflow-y-auto">
          {selected ? (
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selected.subject}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500">{selected.from}</span>
                    <span className="text-xs text-slate-400">{selected.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleStar(selected.id)}
                    className={`rounded-lg p-1.5 transition-colors ${
                      selected.starred
                        ? "text-amber-500 bg-amber-50"
                        : "text-slate-400 hover:bg-slate-100"
                    }`}
                  >
                    <Star className="h-4 w-4" fill={selected.starred ? "currentColor" : "none"} />
                  </button>
                  <button
                    onClick={() => deleteEmail(selected.id)}
                    className="rounded-lg p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {selected.autoTagged && (
                <div className="flex items-center gap-2 mb-4 p-2.5 rounded-lg bg-violet-50 border border-violet-200">
                  <CheckCircle2 className="h-4 w-4 text-violet-500 shrink-0" />
                  <span className="text-xs text-violet-600">
                    AIが自動分類しました: {categoryConfig[selected.category].label}
                  </span>
                </div>
              )}

              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed font-[inherit] bg-transparent p-0">
                  {selected.body}
                </pre>
              </div>

              <div className="mt-6 flex gap-2">
                <button className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700 flex items-center gap-1.5 transition-colors">
                  <Reply className="h-4 w-4" />
                  返信
                </button>
                <button className="rounded-lg border border-slate-200 text-slate-600 px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-1.5 transition-colors">
                  <Archive className="h-4 w-4" />
                  アーカイブ
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-sm">
              メールを選択してください
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
