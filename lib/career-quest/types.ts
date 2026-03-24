export type MBTIDimension = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
export type MBTIType =
  | "INTJ" | "INTP" | "ENTJ" | "ENTP"
  | "INFJ" | "INFP" | "ENFJ" | "ENFP"
  | "ISTJ" | "ISFJ" | "ESTJ" | "ESFJ"
  | "ISTP" | "ISFP" | "ESTP" | "ESFP";

export interface QuestionOption {
  id: string;
  text: string;
  /** Each option contributes scores to MBTI dimensions */
  scores: Partial<Record<MBTIDimension, number>>;
}

export interface Question {
  id: number;
  scenario: string;
  options: [QuestionOption, QuestionOption, QuestionOption, QuestionOption];
}

export interface StatusValues {
  breakthrough: number;    // 突破力
  coordination: number;    // 調整魔法
  logic: number;           // 論理シールド
  creativity: number;      // 創造の炎
  empathy: number;         // 共感センサー
}

export interface JobType {
  mbti: MBTIType;
  jobName: string;
  title: string;           // 二つ名
  emoji: string;
  color: string;           // テーマカラー
  soulAnalysis: string;    // 魂の解析
  strengths: string;       // 得意武器
  weakness: string;        // 呪いの装備
  recommendedField: string; // おすすめ冒険先
  bestPartner: MBTIType;   // 伝説の相棒
  bestPartnerReason: string;
  negativeLoop: string;    // 就活の負のループ
  statusBase: StatusValues;
}

export interface DiagnosisResult {
  mbtiType: MBTIType;
  job: JobType;
  scores: Record<MBTIDimension, number>;
  status: StatusValues;
  answers: number[];
}
