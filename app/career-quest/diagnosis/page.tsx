"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { questions } from "@/lib/career-quest/data";
import { encodeAnswers } from "@/lib/career-quest/scoring";

export default function CareerQuestDiagnosis() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const question = questions[step];
  const progress = ((step + 1) / questions.length) * 100;
  const isLast = step === questions.length - 1;

  const handleSelect = useCallback((idx: number) => {
    setSelected(idx);
  }, []);

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers.slice(0, step), selected];
    setAnswers(newAnswers);

    if (isLast) {
      const encoded = encodeAnswers(newAnswers);
      router.push(`/career-quest/result?d=${encoded}`);
    } else {
      setDirection("next");
      setStep((s) => s + 1);
      setSelected(answers[step + 1] ?? null);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setDirection("prev");
      setStep((s) => s - 1);
      setSelected(answers[step - 1] ?? null);
    } else {
      router.push("/career-quest");
    }
  };

  const themeColors = [
    "from-purple-600 to-indigo-600",
    "from-pink-600 to-purple-600",
    "from-indigo-600 to-cyan-600",
    "from-amber-500 to-pink-600",
    "from-emerald-500 to-teal-600",
    "from-violet-600 to-purple-600",
    "from-cyan-500 to-blue-600",
    "from-rose-500 to-pink-600",
    "from-orange-500 to-red-500",
    "from-teal-500 to-emerald-600",
    "from-fuchsia-500 to-purple-600",
    "from-blue-600 to-indigo-600",
  ];
  const currentTheme = themeColors[step % themeColors.length];

  return (
    <div className="flex min-h-screen flex-col bg-[#0F0A2A]">
      {/* Header */}
      <div className="border-b border-white/[0.06] bg-white/[0.03] px-5 backdrop-blur-sm">
        <div className="mx-auto max-w-[640px]">
          <div className="flex items-center justify-between pb-[10px] pt-[14px]">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 bg-transparent text-[13px] text-slate-500 transition-colors hover:text-slate-300"
            >
              <ArrowLeft className="h-4 w-4" />
              戻る
            </button>
            <span className="text-[13px] font-bold text-purple-400">
              Q{step + 1} / {questions.length}
            </span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${currentTheme} transition-all duration-500 ease-out`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto w-full max-w-[640px] flex-1 px-5 py-6">
        {/* Question */}
        <div
          key={step}
          className={`animate-fade-up ${direction === "next" ? "" : "[animation-direction:reverse]"}`}
        >
          <div className="mb-6 flex items-start gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${currentTheme} text-sm font-bold text-white shadow-lg`}
            >
              {step + 1}
            </div>
            <div className="pt-1">
              <div className="text-[18px] font-bold leading-[1.5] text-white">
                {question.scenario}
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="grid gap-[10px]">
            {question.options.map((opt, idx) => {
              const isSelected = selected === idx;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(idx)}
                  className={`flex items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-purple-500 bg-purple-500/[0.12] shadow-[0_4px_20px_rgba(168,85,247,0.2)]"
                      : "border-white/[0.08] bg-white/[0.04] hover:border-purple-500/40 hover:bg-white/[0.06]"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-purple-500 text-white"
                        : "bg-white/[0.08] text-slate-500"
                    }`}
                  >
                    {isSelected ? <Check className="h-3.5 w-3.5" /> : String.fromCharCode(65 + idx)}
                  </span>
                  <span
                    className={`text-[14px] font-medium leading-[1.6] ${
                      isSelected ? "text-purple-200" : "text-slate-300"
                    }`}
                  >
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Next button */}
        <div className="mt-7 flex justify-end">
          <button
            onClick={handleNext}
            disabled={selected === null}
            className={`inline-flex items-center gap-2 rounded-full px-8 py-[14px] text-[14px] font-bold text-white transition-all ${
              selected !== null
                ? `bg-gradient-to-r ${currentTheme} shadow-[0_8px_24px_rgba(168,85,247,0.3)] hover:-translate-y-[2px] hover:shadow-[0_12px_32px_rgba(168,85,247,0.4)]`
                : "cursor-not-allowed bg-white/[0.08] text-slate-600"
            }`}
          >
            {isLast ? "診断する" : "次へ"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
