"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { STEPS, getOptionsForStep, getSubText, isTwoColStep } from "@/lib/data";
import { Answers } from "@/lib/types";
import { encodeAnswers } from "@/lib/scoring";

export default function DiagnosisPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const currentStep = STEPS[step];
  const options = getOptionsForStep(currentStep.key);
  const selected = answers[currentStep.key as keyof Answers];
  const progress = ((step + 1) / STEPS.length) * 100;
  const isLastStep = step === STEPS.length - 1;

  const handleSelect = useCallback(
    (id: string) => {
      setAnswers((prev) => ({ ...prev, [currentStep.key]: id }));
    },
    [currentStep.key],
  );

  const handleNext = () => {
    if (!selected) return;
    if (isLastStep) {
      const encoded = encodeAnswers(answers as Required<Answers>);
      router.push(`/result?d=${encoded}`);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white px-6">
        <div className="mx-auto max-w-[740px]">
          <div className="flex items-center justify-between pb-[10px] pt-[14px]">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 bg-transparent text-[13px] text-slate-500 hover:text-slate-700"
            >
              <ArrowLeft className="h-4 w-4" />
              戻る
            </button>
            <span className="text-[13px] font-bold text-blue-800">
              {step + 1} / {STEPS.length}
            </span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-800 transition-all duration-400 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto w-full max-w-[740px] flex-1 px-6 py-7">
        {/* Step label */}
        <div className="mb-[22px] flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-xs font-bold text-white">
            {String(step + 1).padStart(2, "0")}
          </div>
          <div>
            <div className="text-[19px] font-bold text-slate-900">{currentStep.title}</div>
            <div className="text-xs text-slate-500">{currentStep.sub}</div>
          </div>
        </div>

        {/* Options */}
        <div
          className="grid gap-[9px]"
          style={{
            gridTemplateColumns: isTwoColStep(currentStep.key)
              ? "repeat(auto-fill, minmax(256px, 1fr))"
              : "1fr",
          }}
        >
          {options.map((opt) => {
            const o = opt as unknown as Record<string, unknown>;
            const id = o.id as string;
            const label = o.label as string;
            const isSelected = selected === id;
            const sub = getSubText(currentStep.key, o);
            const icon = currentStep.key === "role" ? (o.icon as string) : null;

            return (
              <button
                key={id}
                onClick={() => handleSelect(id)}
                className={`flex items-center gap-3 rounded-[14px] border-2 bg-white px-[18px] py-[14px] text-left transition-all ${
                  isSelected
                    ? "border-blue-800 bg-blue-50 shadow-[0_6px_20px_rgba(30,64,175,0.15)]"
                    : "border-slate-200 hover:border-blue-300 hover:shadow-[0_4px_16px_rgba(30,64,175,0.09)]"
                }`}
              >
                {icon && <span className="shrink-0 text-xl">{icon}</span>}
                <div className="flex-1">
                  <div
                    className={`text-sm font-semibold ${isSelected ? "text-blue-800" : "text-slate-900"}`}
                  >
                    {label}
                  </div>
                  {sub && (
                    <div
                      className={`mt-[2px] text-[11px] ${isSelected ? "text-blue-600" : "text-slate-500"}`}
                    >
                      {sub}
                    </div>
                  )}
                </div>
                <span
                  className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-blue-800 text-xs text-white transition-all ${
                    isSelected ? "scale-100 opacity-100" : "scale-[0.4] opacity-0"
                  }`}
                >
                  <Check className="h-3 w-3" />
                </span>
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <div className="mt-[26px] flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selected}
            className={`inline-flex items-center gap-2 rounded-full px-[38px] py-[15px] text-[15px] font-bold text-white transition-all ${
              selected
                ? "bg-gradient-to-br from-blue-600 to-blue-800 hover:-translate-y-[2px] hover:shadow-[0_12px_32px_rgba(30,64,175,0.38)]"
                : "cursor-not-allowed bg-slate-400 opacity-50"
            }`}
          >
            {isLastStep ? "診断する" : "次へ進む"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
