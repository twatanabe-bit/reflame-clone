"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  Calendar,
  Mail,
  Users,
  Brain,
  Trophy,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

const navItems = [
  { icon: BarChart3, label: "ダッシュボード", href: "/dashboard" },
  { icon: FileText, label: "ES管理", href: "/dashboard/es" },
  { icon: Calendar, label: "カレンダー", href: "/dashboard/calendar" },
  { icon: Mail, label: "メール連携", href: "/dashboard/email" },
  { icon: Users, label: "OB/OG", href: "/dashboard/obog" },
  { icon: Brain, label: "AIメンター", href: "/dashboard/mentor" },
  { icon: Trophy, label: "実績", href: "/dashboard/achievements" },
];

function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 md:z-auto h-screen w-[240px] shrink-0 flex-col border-r border-slate-200 bg-[#FAFBFC] p-4 transition-transform md:translate-x-0 md:flex ${
          open ? "translate-x-0 flex" : "-translate-x-full hidden md:flex"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
              <span className="text-white text-xs font-black">S</span>
            </div>
            <span className="text-sm font-extrabold tracking-tight text-slate-900">
              ShukatsuOS
            </span>
          </Link>
          <button onClick={onClose} className="md:hidden text-slate-400">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 pt-4 mt-4">
          <div className="flex items-center gap-3 px-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
              T
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-900 truncate">
                田中 太郎
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                早稲田大学 商学部
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-slate-200 px-4 md:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden text-slate-500 hover:text-slate-900"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                <Search className="h-[18px] w-[18px]" />
              </button>
              <button className="rounded-lg p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors relative">
                <Bell className="h-[18px] w-[18px]" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
