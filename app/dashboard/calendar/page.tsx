"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  FileText,
  Video,
  Users,
  X,
} from "lucide-react";

interface CalendarEvent {
  id: number;
  title: string;
  company: string;
  type: "interview" | "deadline" | "obog" | "other";
  date: string;
  time?: string;
  location?: string;
  memo?: string;
}

const typeConfig = {
  interview: { label: "面接", color: "bg-blue-500", textColor: "text-blue-600", bgLight: "bg-blue-50 border-blue-200" },
  deadline: { label: "締切", color: "bg-red-500", textColor: "text-red-600", bgLight: "bg-red-50 border-red-200" },
  obog: { label: "OB/OG", color: "bg-amber-500", textColor: "text-amber-600", bgLight: "bg-amber-50 border-amber-200" },
  other: { label: "その他", color: "bg-slate-400", textColor: "text-slate-600", bgLight: "bg-slate-50 border-slate-200" },
};

const initialEvents: CalendarEvent[] = [
  { id: 1, title: "最終面接", company: "三菱商事", type: "interview", date: "2026-03-26", time: "14:00", location: "大手町本社 12F" },
  { id: 2, title: "1次面接", company: "マッキンゼー", type: "interview", date: "2026-03-27", time: "10:00", location: "六本木ヒルズ" },
  { id: 3, title: "ES締切", company: "野村総研", type: "deadline", date: "2026-03-28", time: "23:59" },
  { id: 4, title: "ES締切", company: "デロイト", type: "deadline", date: "2026-03-30", time: "23:59" },
  { id: 5, title: "2次面接", company: "Google Japan", type: "interview", date: "2026-04-01", time: "15:00", location: "渋谷ストリーム" },
  { id: 6, title: "OB面談", company: "三井物産", type: "obog", date: "2026-03-25", time: "18:00", location: "丸の内カフェ" },
  { id: 7, title: "ES締切", company: "アクセンチュア", type: "deadline", date: "2026-04-02", time: "23:59" },
  { id: 8, title: "企業説明会", company: "トヨタ自動車", type: "other", date: "2026-04-03", time: "13:00", location: "オンライン" },
];

export default function CalendarPage() {
  const [events, setEvents] = useState(initialEvents);
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1)); // March 2026
  const [selectedDate, setSelectedDate] = useState<string | null>("2026-03-26");
  const [showAddModal, setShowAddModal] = useState(false);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const today = "2026-03-24";

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  function dateStr(day: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function eventsForDay(day: number) {
    return events.filter((e) => e.date === dateStr(day));
  }

  const selectedEvents = selectedDate
    ? events.filter((e) => e.date === selectedDate).sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""))
    : [];

  function addEvent(e: Omit<CalendarEvent, "id">) {
    setEvents([...events, { ...e, id: Date.now() }]);
    setShowAddModal(false);
  }

  function deleteEvent(id: number) {
    setEvents(events.filter((ev) => ev.id !== id));
  }

  return (
    <div className="max-w-5xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900">カレンダー</h1>
          <p className="text-sm text-slate-500 mt-0.5">面接・締切・OB面談の一元管理</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Plus className="h-4 w-4" />
          予定追加
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
              className="rounded-lg p-2 hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h2 className="text-sm font-bold text-slate-900">
              {year}年 {month + 1}月
            </h2>
            <button
              onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
              className="rounded-lg p-2 hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-px">
            {["日", "月", "火", "水", "木", "金", "土"].map((d) => (
              <div key={d} className="text-center text-[11px] font-semibold text-slate-400 pb-2">
                {d}
              </div>
            ))}
            {days.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />;
              const ds = dateStr(day);
              const dayEvents = eventsForDay(day);
              const isToday = ds === today;
              const isSelected = ds === selectedDate;
              return (
                <button
                  key={ds}
                  onClick={() => setSelectedDate(ds)}
                  className={`relative min-h-[72px] p-1.5 rounded-lg text-left transition-all ${
                    isSelected
                      ? "bg-blue-50 ring-2 ring-blue-500"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                      isToday
                        ? "bg-blue-600 text-white"
                        : "text-slate-700"
                    }`}
                  >
                    {day}
                  </span>
                  <div className="mt-0.5 space-y-0.5">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        className={`rounded px-1 py-0.5 text-[9px] font-medium truncate ${typeConfig[ev.type].color} text-white`}
                      >
                        {ev.company}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[9px] text-slate-400 px-1">
                        +{dayEvents.length - 2}件
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Day Detail */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-sm font-bold text-slate-900 mb-4">
            {selectedDate
              ? `${new Date(selectedDate).getMonth() + 1}/${new Date(selectedDate).getDate()} の予定`
              : "日付を選択"}
          </h3>
          {selectedEvents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-slate-400">予定なし</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="mt-3 text-xs text-blue-600 font-semibold hover:text-blue-700"
              >
                + 予定を追加
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedEvents.map((ev) => {
                const tc = typeConfig[ev.type];
                return (
                  <div key={ev.id} className={`rounded-lg border p-3 ${tc.bgLight}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className={`text-[11px] font-semibold ${tc.textColor}`}>
                          {tc.label}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                          {ev.company}
                        </h4>
                        <p className="text-xs text-slate-500">{ev.title}</p>
                      </div>
                      <button
                        onClick={() => deleteEvent(ev.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2 space-y-1">
                      {ev.time && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Clock className="h-3 w-3" />
                          {ev.time}
                        </div>
                      )}
                      {ev.location && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <MapPin className="h-3 w-3" />
                          {ev.location}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <AddEventModal
          date={selectedDate || today}
          onClose={() => setShowAddModal(false)}
          onAdd={addEvent}
        />
      )}
    </div>
  );
}

function AddEventModal({
  date,
  onClose,
  onAdd,
}: {
  date: string;
  onClose: () => void;
  onAdd: (e: Omit<CalendarEvent, "id">) => void;
}) {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState<CalendarEvent["type"]>("interview");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-slate-900">予定追加</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl px-2">
            ×
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">企業名</label>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="企業名を入力"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">内容</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="面接、ES締切など"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">種別</label>
            <div className="flex gap-2">
              {(Object.keys(typeConfig) as CalendarEvent["type"][]).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    type === t
                      ? `${typeConfig[t].color} text-white`
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {typeConfig[t].label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">時間</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">場所</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="場所を入力"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            キャンセル
          </button>
          <button
            onClick={() => {
              if (company && title) {
                onAdd({ company, title, type, date, time: time || undefined, location: location || undefined });
              }
            }}
            className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold hover:bg-blue-700"
          >
            追加
          </button>
        </div>
      </div>
    </div>
  );
}
