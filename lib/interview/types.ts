// ===== Star Interview Avatar - Type Definitions =====

/** 面接スタイル */
export type InterviewStyle = "pressure" | "empathy" | "charisma";

/** 芸能人ペルソナの価値観エンジン構造 */
export interface ValuesEngine {
  workPhilosophy: string;    // 仕事観
  lifePhilosophy: string;    // 人生観
  preferredWords: string[];  // 好む言葉選び
  catchphrases: string[];    // 口癖
  speechRhythm: {
    sentenceEnding: string[];   // 文末の癖
    metaphorStyle: string;      // 独特の例え話スタイル
    laughStyle: string;         // 笑い方
    fillerWords: string[];      // 相槌・フィラー
  };
}

/** 芸能人アバターペルソナ */
export interface CelebrityPersona {
  id: string;
  name: string;
  title: string;              // 肩書き
  avatarEmoji: string;        // アバター絵文字
  avatarColor: string;        // テーマカラー
  avatarGradient: string;     // グラデーション
  interviewStyle: InterviewStyle;
  styleLabel: string;         // スタイル表示名
  styleDesc: string;          // スタイル説明
  values: ValuesEngine;
  sampleQuestions: string[];  // 面接で聞きそうな質問
  encouragement: string;      // 内定祈願メッセージ
  consolation: string;        // 不合格後の励まし
  difficulty: number;         // 難易度 1-5
}

/** 面接ターン */
export interface DialogTurn {
  speaker: "avatar" | "user";
  text: string;
  emotion?: AvatarEmotion;    // アバターの表情
  timestamp?: number;
}

/** アバター表情 */
export type AvatarEmotion =
  | "neutral"
  | "smile"
  | "thinking"
  | "impressed"
  | "serious"
  | "laugh"
  | "confused"
  | "encouraging";

/** 面接フェーズ */
export type InterviewPhase =
  | "intro"        // 自己紹介
  | "gakuchika"    // ガクチカ
  | "motivation"   // 志望動機
  | "strength"     // 強み・弱み
  | "future"       // 将来像
  | "reverse"      // 逆質問
  | "feedback";    // フィードバック

/** 面接セッション状態 */
export interface InterviewSession {
  personaId: string;
  phase: InterviewPhase;
  turnIndex: number;
  dialog: DialogTurn[];
  scores: InterviewScores;
  rank: PlayerRank;
}

/** 面接評価スコア */
export interface InterviewScores {
  logic: number;         // 論理性 0-100
  passion: number;       // 熱量 0-100
  originality: number;   // 独自性 0-100
  conciseness: number;   // 簡潔さ 0-100
  impression: number;    // 印象 0-100
}

/** ゲーミフィケーション：プレイヤーランク */
export interface PlayerRank {
  level: number;
  title: string;
  emoji: string;
  nextTitle: string;
  expCurrent: number;
  expNext: number;
}

/** ランク定義 */
export interface RankDefinition {
  level: number;
  title: string;
  emoji: string;
  expRequired: number;
}

/** フィードバック項目 */
export interface FeedbackItem {
  category: string;
  score: number;
  comment: string;       // 「あの人ならこう言う」形式
  improvement: string;   // 改善点
}

/** 面接結果 */
export interface InterviewResult {
  persona: CelebrityPersona;
  totalScore: number;
  rank: string;
  scores: InterviewScores;
  feedback: FeedbackItem[];
  encouragementMessage: string;
  nextChallenge: string;
}
