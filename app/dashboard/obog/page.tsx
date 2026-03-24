"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MessageSquare,
  Star,
  Building2,
  GraduationCap,
  Calendar,
  ChevronRight,
  User,
  Plus,
  X,
} from "lucide-react";

interface OBOGProfile {
  id: number;
  name: string;
  company: string;
  department: string;
  university: string;
  faculty: string;
  year: number;
  matchScore: number;
  tags: string[];
  available: boolean;
  note?: string;
  lastContact?: string;
}

const initialProfiles: OBOGProfile[] = [
  {
    id: 1,
    name: "佐藤 健一",
    company: "三菱商事",
    department: "経営企画部",
    university: "早稲田大学",
    faculty: "商学部",
    year: 2022,
    matchScore: 95,
    tags: ["総合商社", "同学部", "面接対策"],
    available: true,
    lastContact: "3/20",
  },
  {
    id: 2,
    name: "鈴木 美咲",
    company: "マッキンゼー",
    department: "コンサルタント",
    university: "東京大学",
    faculty: "経済学部",
    year: 2023,
    matchScore: 88,
    tags: ["外資コンサル", "ケース面接", "ES添削"],
    available: true,
  },
  {
    id: 3,
    name: "田村 翔太",
    company: "Google Japan",
    department: "ソフトウェアエンジニア",
    university: "早稲田大学",
    faculty: "基幹理工学部",
    year: 2024,
    matchScore: 82,
    tags: ["外資IT", "技術面接", "同大学"],
    available: false,
  },
  {
    id: 4,
    name: "山本 さくら",
    company: "リクルート",
    department: "プロダクトマネージャー",
    university: "慶應義塾大学",
    faculty: "総合政策学部",
    year: 2021,
    matchScore: 78,
    tags: ["メガベンチャー", "PM", "企業文化"],
    available: true,
    lastContact: "3/15",
  },
  {
    id: 5,
    name: "高橋 大輔",
    company: "三井物産",
    department: "エネルギー本部",
    university: "早稲田大学",
    faculty: "商学部",
    year: 2020,
    matchScore: 91,
    tags: ["総合商社", "同学部", "海外駐在"],
    available: true,
    note: "OB面談予定: 3/25 18:00",
    lastContact: "3/23",
  },
  {
    id: 6,
    name: "中村 愛",
    company: "ソニー",
    department: "マーケティング部",
    university: "上智大学",
    faculty: "経済学部",
    year: 2023,
    matchScore: 75,
    tags: ["メーカー", "マーケ", "ブランド戦略"],
    available: true,
  },
];

export default function OBOGPage() {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCompany, setFilterCompany] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showContactModal, setShowContactModal] = useState<number | null>(null);

  const filtered = profiles.filter((p) => {
    if (searchQuery && !p.name.includes(searchQuery) && !p.company.includes(searchQuery) && !p.tags.some((t) => t.includes(searchQuery)))
      return false;
    if (filterCompany && p.company !== filterCompany) return false;
    return true;
  }).sort((a, b) => b.matchScore - a.matchScore);

  const companies = [...new Set(profiles.map((p) => p.company))];
  const selected = selectedId ? profiles.find((p) => p.id === selectedId) : null;

  return (
    <div className="max-w-5xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900">OB/OG ネットワーク</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            企業×大学でOB/OGを検索・コンタクト管理
          </p>
        </div>
        <span className="text-xs text-slate-400 bg-slate-100 rounded-full px-3 py-1">
          {profiles.length}名 登録済
        </span>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="名前・企業名・タグで検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterCompany}
          onChange={(e) => setFilterCompany(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">すべての企業</option>
          {companies.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((profile) => (
          <div
            key={profile.id}
            className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm p-5 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="h-11 w-11 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-500 text-sm font-bold shrink-0">
                {profile.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">{profile.name}</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 rounded-full px-2 py-0.5">
                      {profile.matchScore}%
                    </span>
                  </div>
                </div>

                <div className="mt-1 space-y-0.5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Building2 className="h-3 w-3" />
                    {profile.company} {profile.department}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <GraduationCap className="h-3 w-3" />
                    {profile.university} {profile.faculty}（{profile.year}卒）
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {profile.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium text-slate-500 bg-slate-100 rounded-full px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {profile.note && (
                  <div className="mt-2.5 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
                    {profile.note}
                  </div>
                )}

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => setShowContactModal(profile.id)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold flex items-center gap-1 transition-colors ${
                      profile.available
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                    disabled={!profile.available}
                  >
                    <MessageSquare className="h-3 w-3" />
                    {profile.available ? "コンタクト" : "対応不可"}
                  </button>
                  {profile.lastContact && (
                    <span className="text-[11px] text-slate-400">
                      最終連絡: {profile.lastContact}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <ContactModal
          profile={profiles.find((p) => p.id === showContactModal)!}
          onClose={() => setShowContactModal(null)}
        />
      )}
    </div>
  );
}

function ContactModal({
  profile,
  onClose,
}: {
  profile: OBOGProfile;
  onClose: () => void;
}) {
  const [message, setMessage] = useState(
    `${profile.name}様\n\nはじめまして。${profile.university}${profile.faculty}の田中太郎と申します。\n\n現在就職活動中で、${profile.company}に興味を持っております。\nお忙しいところ恐縮ですが、OB訪問のお時間をいただけないでしょうか。\n\nよろしくお願いいたします。`
  );

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900">
            {profile.name}さんにコンタクト
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl px-2">
            ×
          </button>
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-48 rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            キャンセル
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700"
          >
            送信
          </button>
        </div>
      </div>
    </div>
  );
}
