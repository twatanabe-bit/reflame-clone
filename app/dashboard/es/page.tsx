"use client";

import { useState } from "react";
import {
  Plus,
  FileText,
  Search,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Copy,
  Trash2,
  Edit3,
  Eye,
  Filter,
} from "lucide-react";

type ESStatus = "draft" | "reviewing" | "submitted" | "passed" | "rejected";

interface ESEntry {
  id: number;
  company: string;
  question: string;
  body: string;
  status: ESStatus;
  deadline: string;
  wordCount: number;
  maxWords: number;
  lastEdited: string;
  aiScore?: number;
}

const statusConfig: Record<ESStatus, { label: string; color: string; bg: string }> = {
  draft: { label: "下書き", color: "text-slate-500", bg: "bg-slate-100" },
  reviewing: { label: "AI添削中", color: "text-violet-600", bg: "bg-violet-50" },
  submitted: { label: "提出済", color: "text-blue-600", bg: "bg-blue-50" },
  passed: { label: "通過", color: "text-emerald-600", bg: "bg-emerald-50" },
  rejected: { label: "不通過", color: "text-red-500", bg: "bg-red-50" },
};

const initialEntries: ESEntry[] = [
  {
    id: 1,
    company: "三菱商事",
    question: "あなたが学生時代に最も力を入れたことは何ですか？",
    body: "大学2年時に立ち上げた国際ボランティアサークルの運営に最も力を入れました。活動開始当初はメンバーの意見が対立し、方向性が定まらない状況でしたが、個別ヒアリングを重ね、全員が納得できるビジョンを策定しました。結果として、メンバー数は15名から45名に増加し、3カ国でのプロジェクトを実現しました。",
    status: "submitted",
    deadline: "3/26",
    wordCount: 380,
    maxWords: 400,
    lastEdited: "3/23",
    aiScore: 88,
  },
  {
    id: 2,
    company: "Google Japan",
    question: "なぜGoogleで働きたいのですか？",
    body: "テクノロジーで社会課題を解決するGoogleのミッションに強く共感しています。大学でのAI研究を通じて、技術が人々の生活を変える力を実感しました。",
    status: "draft",
    deadline: "3/28",
    wordCount: 210,
    maxWords: 500,
    lastEdited: "3/24",
    aiScore: 72,
  },
  {
    id: 3,
    company: "マッキンゼー",
    question: "リーダーシップを発揮した経験を教えてください。",
    body: "ゼミのグループ論文執筆において、チームリーダーとして5名のメンバーをまとめました。各メンバーの強みを活かした役割分担を行い、週次の進捗会議を通じてスケジュール管理を徹底しました。最終的に学内コンペで最優秀賞を受賞しました。",
    status: "passed",
    deadline: "3/20",
    wordCount: 350,
    maxWords: 400,
    lastEdited: "3/18",
    aiScore: 92,
  },
  {
    id: 4,
    company: "アクセンチュア",
    question: "10年後のキャリアビジョンを教えてください。",
    body: "",
    status: "draft",
    deadline: "4/2",
    wordCount: 0,
    maxWords: 600,
    lastEdited: "—",
  },
  {
    id: 5,
    company: "野村総研",
    question: "当社を志望する理由を教えてください。",
    body: "日本のDXを推進するリーディングカンパニーとして、社会インフラの変革に携わりたいと考えています。特に金融×テクノロジーの分野に興味があり、大学での金融工学の知識を活かしたいです。",
    status: "reviewing",
    deadline: "3/28",
    wordCount: 280,
    maxWords: 400,
    lastEdited: "3/24",
    aiScore: 78,
  },
];

function ESEditor({
  entry,
  onClose,
  onSave,
}: {
  entry: ESEntry;
  onClose: () => void;
  onSave: (updated: ESEntry) => void;
}) {
  const [body, setBody] = useState(entry.body);
  const wordCount = body.length;

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div>
            <div className="text-xs text-slate-400 font-medium">{entry.company}</div>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5">{entry.question}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl px-2"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="ここにESの内容を入力してください..."
            className="w-full h-64 text-sm text-slate-700 leading-relaxed border border-slate-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-medium ${
                  wordCount > entry.maxWords ? "text-red-500" : "text-slate-400"
                }`}
              >
                {wordCount} / {entry.maxWords}文字
              </span>
              {entry.aiScore && (
                <span className="text-xs font-medium text-violet-600 bg-violet-50 rounded-full px-2 py-0.5">
                  AI Score: {entry.aiScore}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-violet-200 bg-violet-50 text-violet-600 px-3 py-1.5 text-xs font-semibold hover:bg-violet-100 transition-colors flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                AI添削
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 p-5 border-t border-slate-200">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={() => {
              onSave({ ...entry, body, wordCount: body.length, lastEdited: "3/24" });
              onClose();
            }}
            className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ESManagementPage() {
  const [entries, setEntries] = useState(initialEntries);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<ESStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = entries.filter((e) => {
    if (filterStatus !== "all" && e.status !== filterStatus) return false;
    if (searchQuery && !e.company.includes(searchQuery) && !e.question.includes(searchQuery))
      return false;
    return true;
  });

  const editingEntry = editingId ? entries.find((e) => e.id === editingId) : null;

  function addNew() {
    const newEntry: ESEntry = {
      id: Date.now(),
      company: "新規企業",
      question: "設問を入力してください",
      body: "",
      status: "draft",
      deadline: "未設定",
      wordCount: 0,
      maxWords: 400,
      lastEdited: "—",
    };
    setEntries([newEntry, ...entries]);
    setEditingId(newEntry.id);
  }

  function deleteEntry(id: number) {
    setEntries(entries.filter((e) => e.id !== id));
  }

  return (
    <div className="max-w-5xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900">ES管理</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            エントリーシートの作成・AI添削・提出管理
          </p>
        </div>
        <button
          onClick={addNew}
          className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Plus className="h-4 w-4" />
          新規作成
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="企業名・設問で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="h-4 w-4 text-slate-400" />
          {(["all", "draft", "reviewing", "submitted", "passed", "rejected"] as const).map(
            (s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  filterStatus === s
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {s === "all" ? "すべて" : statusConfig[s].label}
              </button>
            )
          )}
        </div>
      </div>

      {/* ES List */}
      <div className="space-y-3">
        {filtered.map((entry) => {
          const sc = statusConfig[entry.status];
          return (
            <div
              key={entry.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm p-5 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">
                    {entry.company}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${sc.color} ${sc.bg}`}
                  >
                    {sc.label}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingId(entry.id)}
                    className="rounded-lg p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="rounded-lg p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="text-[13px] text-slate-600 font-medium mb-2">
                {entry.question}
              </p>

              {entry.body && (
                <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                  {entry.body}
                </p>
              )}

              <div className="flex items-center gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  〆 {entry.deadline}
                </span>
                <span>
                  {entry.wordCount}/{entry.maxWords}文字
                </span>
                {entry.aiScore && (
                  <span className="text-violet-500 font-medium">
                    AI Score: {entry.aiScore}
                  </span>
                )}
                <span>更新: {entry.lastEdited}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Editor Modal */}
      {editingEntry && (
        <ESEditor
          entry={editingEntry}
          onClose={() => setEditingId(null)}
          onSave={(updated) => {
            setEntries(entries.map((e) => (e.id === updated.id ? updated : e)));
          }}
        />
      )}
    </div>
  );
}
