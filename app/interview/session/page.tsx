"use client";

import { useState, useRef, useEffect, useMemo, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Send,
  ArrowLeft,
  ChevronRight,
  Mic,
  MicOff,
} from "lucide-react";
import {
  CELEBRITY_PERSONAS,
  INTERVIEW_PHASES,
  getPhaseOpener,
  calculateRank,
  calculateExp,
} from "@/lib/interview/data";
import type {
  DialogTurn,
  AvatarEmotion,
  InterviewPhase,
  InterviewScores,
  CelebrityPersona,
} from "@/lib/interview/types";

// ===== Avatar Face Component =====
function AvatarFace({
  emotion,
  persona,
}: {
  emotion: AvatarEmotion;
  persona: CelebrityPersona;
}) {
  const eyes: Record<AvatarEmotion, string> = {
    neutral: "◉ ◉",
    smile: "◠ ◠",
    thinking: "◉ …",
    impressed: "★ ★",
    serious: "◎ ◎",
    laugh: "▽ ▽",
    confused: "◉ ◑",
    encouraging: "◠ ◡",
  };

  const mouths: Record<AvatarEmotion, string> = {
    neutral: "━",
    smile: "◡",
    thinking: "〜",
    impressed: "○",
    serious: "─",
    laugh: "▽",
    confused: "∿",
    encouraging: "◡",
  };

  return (
    <div
      className={`flex h-20 w-20 flex-col items-center justify-center rounded-2xl bg-gradient-to-br ${persona.avatarGradient} text-white shadow-xl transition-all duration-500`}
    >
      <div className="text-sm tracking-[0.3em]">{eyes[emotion]}</div>
      <div className="mt-0.5 text-lg">{mouths[emotion]}</div>
      <div className="mt-0.5 text-[10px] opacity-60">{persona.avatarEmoji}</div>
    </div>
  );
}

// ===== Typing Indicator =====
function TypingIndicator({ persona }: { persona: CelebrityPersona }) {
  return (
    <div className="flex items-end gap-3">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${persona.avatarGradient} text-sm`}
      >
        {persona.avatarEmoji}
      </div>
      <div className="rounded-2xl rounded-bl-md bg-white/[0.08] px-4 py-3">
        <div className="flex gap-1">
          <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
          <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
          <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

// ===== Phase Progress =====
function PhaseProgress({
  currentPhase,
}: {
  currentPhase: InterviewPhase;
}) {
  const currentIdx = INTERVIEW_PHASES.findIndex((p) => p.key === currentPhase);

  return (
    <div className="flex items-center gap-1">
      {INTERVIEW_PHASES.map((phase, i) => (
        <div key={phase.key} className="flex items-center gap-1">
          <div
            className={`flex h-7 items-center rounded-full px-2.5 text-[10px] font-semibold transition-all ${
              i === currentIdx
                ? "bg-purple-500/30 text-purple-300"
                : i < currentIdx
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-white/[0.06] text-slate-500"
            }`}
          >
            {i < currentIdx ? "✓" : i + 1}
            <span className="ml-1 hidden sm:inline">{phase.label}</span>
          </div>
          {i < INTERVIEW_PHASES.length - 1 && (
            <ChevronRight className="h-3 w-3 text-slate-600" />
          )}
        </div>
      ))}
    </div>
  );
}

// ===== Simulated AI Response =====
function generateAvatarResponse(
  persona: CelebrityPersona,
  phase: InterviewPhase,
  userMessage: string,
  turnInPhase: number
): { text: string; emotion: AvatarEmotion } {
  const { values } = persona;
  const ending =
    values.speechRhythm.sentenceEnding[
      Math.floor(Math.random() * values.speechRhythm.sentenceEnding.length)
    ] || "";
  const filler =
    values.speechRhythm.fillerWords[
      Math.floor(Math.random() * values.speechRhythm.fillerWords.length)
    ] || "";

  // Phase-based follow-up responses
  const responses: Record<InterviewPhase, { text: string; emotion: AvatarEmotion }[]> = {
    intro: [
      { text: `${filler}、なるほどね。もう少し具体的に、何が一番の強みか教えて${ending}。`, emotion: "thinking" },
      { text: `いいね。じゃあ次のフェーズに行こう${ending}。`, emotion: "smile" },
    ],
    gakuchika: [
      { text: `ふーん、それで？その経験から何を学んだ${ending}？具体的なエピソードが欲しいな。`, emotion: "serious" },
      { text: `なかなか面白い経験してるね。もっとパンチ力のある言い方があると思うけど${ending}。`, emotion: "impressed" },
      { text: `OK、伝わった。次いこう${ending}。`, emotion: "smile" },
    ],
    motivation: [
      { text: `${filler}、その志望理由は他の会社にも当てはまらない？もっと具体的に${ending}。`, emotion: "confused" },
      { text: `いい回答だね。${values.catchphrases[Math.floor(Math.random() * values.catchphrases.length)]}`, emotion: "impressed" },
    ],
    strength: [
      { text: `弱みを認められるのは良いことだ${ending}。で、どうやって克服してる？`, emotion: "thinking" },
      { text: `${filler}、なるほど。次で最後の質問に行こう${ending}。`, emotion: "smile" },
    ],
    future: [
      { text: `面白いビジョンだね${ending}。でも、そのためにいま何してる？`, emotion: "serious" },
      { text: `${values.catchphrases[0]} 将来が楽しみだね${ending}。`, emotion: "encouraging" },
    ],
    reverse: [
      { text: `いい質問だね${ending}。${filler}、そうだな…自分を信じて突き進む力が一番大事だと思うよ。`, emotion: "smile" },
      { text: `なるほど${ending}。他に聞きたいことはある？なければフィードバックに行くよ。`, emotion: "encouraging" },
    ],
    feedback: [
      { text: "お疲れさま！フィードバックを確認してね。", emotion: "smile" },
    ],
  };

  const phaseResponses = responses[phase] || responses.intro;
  const idx = Math.min(turnInPhase, phaseResponses.length - 1);
  return phaseResponses[idx];
}

// ===== Score Generation =====
function generateScores(): InterviewScores {
  const r = () => Math.floor(Math.random() * 30) + 55; // 55-85 range
  return {
    logic: r(),
    passion: r(),
    originality: r(),
    conciseness: r(),
    impression: r(),
  };
}

// ===== Main Component =====
export default function InterviewSessionPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-gradient-to-br from-[#0A1628] to-[#1E40AF] text-white">読み込み中...</div>}>
      <InterviewSessionContent />
    </Suspense>
  );
}

function InterviewSessionContent() {
  const searchParams = useSearchParams();
  const personaId = searchParams.get("persona");

  const persona = useMemo(
    () => CELEBRITY_PERSONAS.find((p) => p.id === personaId) || CELEBRITY_PERSONAS[0],
    [personaId]
  );

  const [dialog, setDialog] = useState<DialogTurn[]>([]);
  const [input, setInput] = useState("");
  const [currentPhase, setCurrentPhase] = useState<InterviewPhase>("intro");
  const [turnInPhase, setTurnInPhase] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [avatarEmotion, setAvatarEmotion] = useState<AvatarEmotion>("neutral");
  const [isRecording, setIsRecording] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const initializedRef = useRef(false);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [dialog, isTyping]);

  // Initial greeting
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const opener = getPhaseOpener(persona, "intro");
    setTimeout(() => {
      setDialog([
        { speaker: "avatar", text: `やぁ、よく来たね。${persona.name}だよ。今日は本気の面接、いくよ。`, emotion: "smile" },
      ]);
      setAvatarEmotion("smile");

      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setDialog((prev) => [
            ...prev,
            { speaker: "avatar", text: opener, emotion: "neutral" },
          ]);
          setAvatarEmotion("neutral");
        }, 1200);
      }, 800);
    }, 500);
  }, [persona]);

  // Send message
  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || isTyping || isFinished) return;

    setInput("");
    setDialog((prev) => [...prev, { speaker: "user", text }]);

    // Simulate avatar response
    setIsTyping(true);
    setAvatarEmotion("thinking");

    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const response = generateAvatarResponse(persona, currentPhase, text, turnInPhase);
      setDialog((prev) => [
        ...prev,
        { speaker: "avatar", text: response.text, emotion: response.emotion },
      ]);
      setAvatarEmotion(response.emotion);
      setIsTyping(false);

      const newTurn = turnInPhase + 1;
      setTurnInPhase(newTurn);

      // Phase advancement logic
      const phaseOrder: InterviewPhase[] = [
        "intro", "gakuchika", "motivation", "strength", "future", "reverse",
      ];
      const currentIdx = phaseOrder.indexOf(currentPhase);
      const maxTurns = currentPhase === "intro" ? 2 : currentPhase === "reverse" ? 2 : 3;

      if (newTurn >= maxTurns && currentIdx < phaseOrder.length - 1) {
        const nextPhase = phaseOrder[currentIdx + 1];
        setTimeout(() => {
          setCurrentPhase(nextPhase);
          setTurnInPhase(0);
          setIsTyping(true);
          setTimeout(() => {
            const phaseOpener = getPhaseOpener(persona, nextPhase);
            setDialog((prev) => [
              ...prev,
              { speaker: "avatar", text: phaseOpener, emotion: "neutral" },
            ]);
            setAvatarEmotion("neutral");
            setIsTyping(false);
          }, 1000);
        }, 600);
      } else if (newTurn >= maxTurns && currentIdx === phaseOrder.length - 1) {
        // Interview complete
        setTimeout(() => {
          setIsFinished(true);
          setCurrentPhase("feedback");
          const scores = generateScores();
          const exp = calculateExp(scores);
          const rank = calculateRank(exp);

          setDialog((prev) => [
            ...prev,
            {
              speaker: "avatar",
              text: `お疲れさま！全フェーズ完了だよ。\n\n${persona.encouragement}\n\n📊 結果を見てみよう。`,
              emotion: "encouraging",
            },
          ]);
          setAvatarEmotion("encouraging");
        }, 800);
      }
    }, delay);
  }, [input, isTyping, isFinished, persona, currentPhase, turnInPhase]);

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Voice recording toggle (UI placeholder)
  const toggleRecording = () => setIsRecording((prev) => !prev);

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-[#0A1628] to-[#1E40AF]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/interview"
            className="flex items-center gap-1 text-xs text-slate-400 transition hover:text-slate-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            戻る
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <AvatarFace emotion={avatarEmotion} persona={persona} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                {persona.name}
              </span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-400">
                面接中
              </span>
            </div>
            <p className="text-[11px] text-slate-500">{persona.styleLabel}</p>
          </div>
        </div>

        <PhaseProgress currentPhase={currentPhase} />
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-[700px] space-y-4">
          {dialog.map((turn, i) =>
            turn.speaker === "avatar" ? (
              <div key={i} className="flex items-end gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${persona.avatarGradient} text-sm`}
                >
                  {persona.avatarEmoji}
                </div>
                <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-white/[0.08] px-4 py-3 text-sm leading-relaxed text-slate-200 whitespace-pre-line">
                  {turn.text}
                </div>
              </div>
            ) : (
              <div key={i} className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-br-md bg-blue-600/40 px-4 py-3 text-sm leading-relaxed text-white whitespace-pre-line">
                  {turn.text}
                </div>
              </div>
            )
          )}

          {isTyping && <TypingIndicator persona={persona} />}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-white/[0.08] px-4 py-3">
        <div className="mx-auto max-w-[700px]">
          {isFinished ? (
            <div className="flex items-center justify-center gap-4">
              <Link
                href={`/interview/result?persona=${persona.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 px-8 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                📊 結果を見る
              </Link>
              <Link
                href="/interview"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-6 py-3 text-sm text-slate-400 transition hover:bg-white/10"
              >
                アバター選択に戻る
              </Link>
            </div>
          ) : (
            <div className="flex items-end gap-2">
              <button
                onClick={toggleRecording}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                  isRecording
                    ? "bg-red-500/30 text-red-400"
                    : "bg-white/[0.06] text-slate-400 hover:bg-white/10"
                }`}
                title={isRecording ? "録音停止" : "音声入力"}
              >
                {isRecording ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </button>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="回答を入力してください..."
                rows={1}
                className="flex-1 resize-none rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-purple-500/50 focus:outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                  input.trim() && !isTyping
                    ? "bg-purple-600 text-white hover:bg-purple-500"
                    : "bg-white/[0.04] text-slate-600"
                }`}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          )}
          <p className="mt-2 text-center text-[10px] text-slate-600">
            {isFinished
              ? "面接終了 ─ お疲れさまでした！"
              : `現在のフェーズ：${INTERVIEW_PHASES.find((p) => p.key === currentPhase)?.label || ""} ─ Shift+Enter で改行`}
          </p>
        </div>
      </div>
    </div>
  );
}
