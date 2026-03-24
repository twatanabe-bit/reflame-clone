"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Brain,
  Sparkles,
  FileText,
  User,
  BookOpen,
  MessageSquare,
  ChevronRight,
  Lightbulb,
} from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const quickActions = [
  { icon: FileText, label: "ES添削", prompt: "以下のESを添削してください。企業: 三菱商事、設問:「学生時代に最も力を入れたことは？」" },
  { icon: User, label: "面接練習", prompt: "三菱商事の最終面接の模擬面接をしてください。想定される質問を出してください。" },
  { icon: BookOpen, label: "企業研究", prompt: "三菱商事の企業研究をサポートしてください。事業内容、強み、最近のニュースを教えてください。" },
  { icon: Lightbulb, label: "自己分析", prompt: "自己分析を深めるための質問をしてください。強み・弱みを整理したいです。" },
];

const aiResponses: Record<string, string> = {
  "es": "もちろんです！ESの添削を行います。\n\n以下のポイントを確認しますね：\n\n**1. 構成** — STAR法（状況→課題→行動→結果）で整理されているか\n**2. 具体性** — 数字や固有名詞で説得力があるか\n**3. 論理性** — 因果関係が明確か\n**4. 独自性** — あなたならではのエピソードか\n**5. 文字数** — 制限内に収まっているか\n\nESの内容を貼り付けてください。添削結果をお返しします。",
  "interview": "面接練習を始めましょう！\n\n三菱商事の最終面接でよく聞かれる質問です：\n\n**Q1. 当社を志望する理由を改めて教えてください。**\n\n→ ポイント：1次・2次面接での回答を踏まえつつ、より深い理由を述べましょう。\n「なぜ商社か」「なぜ三菱商事か」「入社後に何をしたいか」の3段構成が効果的です。\n\nまず、この質問に回答してみてください。フィードバックをお返しします。",
  "research": "三菱商事の企業研究をお手伝いします！\n\n## 三菱商事 概要\n\n**事業内容：** 天然ガス、総合素材、石油・化学、金属資源、産業インフラ、自動車・モビリティ、食品産業、コンシューマー産業、電力ソリューション、複合都市開発の10グループ体制\n\n**強み：**\n- 総合商社トップの純利益（2025年度 約1兆円）\n- 「三綱領」に基づく堅実な企業文化\n- ローソン経営統合によるリテール強化\n\n**最近のニュース：**\n- DX推進の新組織設立\n- 脱炭素関連の投資拡大\n- 海外インフラ案件の拡大\n\n深掘りしたい分野はありますか？",
  "analysis": "自己分析を一緒に進めましょう！\n\n以下の質問に答えてみてください。あなたの強みと価値観を整理します。\n\n**Q1. 大学生活で最も達成感を感じた瞬間はいつですか？**\n\n→ この質問は「何に価値を感じるか」を明確にします。\n結果だけでなく、プロセスのどの部分に達成感を感じたかも考えてみてください。\n\n回答をどうぞ！次の質問に進みます。",
  "default": "ご質問ありがとうございます！\n\n就活に関することなら何でもお手伝いします。例えば：\n\n- **ES添削** — AIがあなたのESを5つの観点で評価\n- **面接練習** — 想定質問と模擬面接\n- **企業研究** — 企業の強み・文化・最新ニュース\n- **自己分析** — 強み・弱みの整理\n\n何から始めますか？",
};

function getAIResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  if (lower.includes("es") || lower.includes("添削") || lower.includes("エントリー")) return aiResponses["es"];
  if (lower.includes("面接") || lower.includes("模擬")) return aiResponses["interview"];
  if (lower.includes("企業") || lower.includes("研究") || lower.includes("ニュース")) return aiResponses["research"];
  if (lower.includes("自己") || lower.includes("分析") || lower.includes("強み")) return aiResponses["analysis"];
  return aiResponses["default"];
}

export default function MentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content: "こんにちは！AIメンターです。\n\n就活に関する相談なら何でもお任せください。ES添削、面接練習、企業研究、自己分析など、あなたの就活を全力でサポートします。\n\n何から始めますか？",
      timestamp: "09:00",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(content: string) {
    if (!content.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: content.trim(),
      timestamp: new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: getAIResponse(content),
        timestamp: new Date().toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">AIメンター</h1>
            <p className="text-xs text-emerald-500 font-medium flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              オンライン
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => sendMessage(action.prompt)}
              className="shrink-0 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 px-3 py-2 text-xs font-medium text-slate-600 hover:text-blue-700 flex items-center gap-1.5 transition-all"
            >
              <Icon className="h-3.5 w-3.5" />
              {action.label}
            </button>
          );
        })}
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "assistant"
                    ? "bg-gradient-to-br from-violet-500 to-purple-600"
                    : "bg-gradient-to-br from-blue-500 to-blue-600"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Sparkles className="h-4 w-4 text-white" />
                ) : (
                  <User className="h-4 w-4 text-white" />
                )}
              </div>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  msg.role === "assistant"
                    ? "bg-slate-50 border border-slate-200"
                    : "bg-blue-600 text-white"
                }`}
              >
                <div
                  className={`text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "assistant" ? "text-slate-700" : "text-white"
                  }`}
                >
                  {msg.content.split("\n").map((line, i) => {
                    if (line.startsWith("## ")) {
                      return <div key={i} className="font-bold text-base mt-2 mb-1">{line.replace("## ", "")}</div>;
                    }
                    if (line.startsWith("**") && line.endsWith("**")) {
                      return <div key={i} className="font-semibold mt-1">{line.replace(/\*\*/g, "")}</div>;
                    }
                    if (line.startsWith("- ")) {
                      return <div key={i} className="ml-2">• {line.replace("- ", "")}</div>;
                    }
                    return <div key={i}>{line || <br />}</div>;
                  })}
                </div>
                <div
                  className={`text-[10px] mt-1.5 ${
                    msg.role === "assistant" ? "text-slate-400" : "text-blue-200"
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder="メッセージを入力..."
              className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white p-2.5 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
