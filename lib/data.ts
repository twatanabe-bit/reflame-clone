import { Role, Industry, Experience, Skill, Cert, Salary, StepDef } from "./types";

export const ROLES: Role[] = [
  { id: "b2b_new", label: "法人営業（新規開拓）", icon: "🏢", base: 490, desc: "テレアポ・飛び込み・提案型の新規獲得" },
  { id: "b2b_route", label: "法人営業（ルート・反響）", icon: "🤝", base: 470, desc: "既存深耕・インバウンド・関係構築型" },
  { id: "b2c_new", label: "個人営業（新規開拓）", icon: "🚶", base: 460, desc: "訪問販売・テレアポ・飛び込み" },
  { id: "b2c_inbound", label: "個人営業（反響・来店型）", icon: "🏪", base: 450, desc: "Web反響・来店カウンター・ショールーム" },
  { id: "inside", label: "インサイドセールス", icon: "💻", base: 480, desc: "オンライン商談・SDR・BDR・架電" },
  { id: "retail", label: "販売・接客（小売・サービス）", icon: "🛍️", base: 400, desc: "店舗販売・アパレル・サービスカウンター" },
  { id: "sales_plan", label: "営業企画・営業推進", icon: "📊", base: 500, desc: "KPI管理・戦略・ツール整備・分析" },
  { id: "cs", label: "カスタマーサクセス", icon: "🌟", base: 470, desc: "オンボーディング・継続率・アップセル" },
];

export const INDUSTRIES: Industry[] = [
  { id: "saas", label: "SaaS・クラウドサービス", mult: 1.22, demand: "採用需要 急増中" },
  { id: "it_infra", label: "ITインフラ・SI・通信", mult: 1.14, demand: "安定した高需要" },
  { id: "it_vendor", label: "IT機器・ソフトウェア販売", mult: 1.10, demand: "法人営業の定番" },
  { id: "realestate", label: "不動産（売買・賃貸）", mult: 1.15, demand: "インセンティブ高め" },
  { id: "housing", label: "住宅・建設・リフォーム", mult: 1.08, demand: "来店・反響営業" },
  { id: "life_ins", label: "生命保険", mult: 1.05, demand: "個人営業の登竜門" },
  { id: "general_ins", label: "損害保険・共済", mult: 1.06, demand: "法人・個人両対応" },
  { id: "securities", label: "証券・投資・FX", mult: 1.18, demand: "高単価・高インセンティブ" },
  { id: "banking", label: "銀行・信用金庫・信販", mult: 1.08, demand: "安定基盤" },
  { id: "human", label: "人材・HR・派遣", mult: 1.12, demand: "転職市場で高評価" },
  { id: "ad", label: "広告・マーケティング", mult: 1.06, demand: "代理店・媒体販売" },
  { id: "medical", label: "医療・製薬（MR・医療機器）", mult: 1.10, demand: "専門知識で差別化" },
  { id: "auto", label: "自動車・バイク・住設販売", mult: 1.00, demand: "実績重視の世界" },
  { id: "retail_ind", label: "小売・EC・流通", mult: 0.95, demand: "スキル転換の余地あり" },
  { id: "other_ind", label: "その他", mult: 1.00, demand: "業界による" },
];

export const EXPERIENCES: Experience[] = [
  { id: "u1", label: "1年未満", mult: 0.78, tag: "第二新卒ポジション" },
  { id: "1-2", label: "1〜2年", mult: 0.86, tag: "若手・第二新卒枠" },
  { id: "3-4", label: "3〜4年", mult: 1.00, tag: "中堅・即戦力枠" },
  { id: "5-7", label: "5〜7年", mult: 1.18, tag: "マネージャー候補枠" },
  { id: "8+", label: "8年以上", mult: 1.35, tag: "リーダー・事業責任者枠" },
];

export const SKILLS: Skill[] = [
  { id: "beginner", label: "初級", desc: "目標達成率80%未満。指示があれば動ける段階。", bonus: 0, expertise: 26, portable: 30 },
  { id: "intermediate", label: "中級", desc: "コンスタントに目標達成。後輩に助言できる。", bonus: 50, expertise: 54, portable: 56 },
  { id: "advanced", label: "上級", desc: "チームトップクラス。マネジメント経験あり。", bonus: 110, expertise: 76, portable: 72 },
  { id: "expert", label: "エキスパート", desc: "MVP・表彰歴あり。独自の再現性ある営業プロセスを持つ。", bonus: 230, expertise: 92, portable: 86 },
];

export const CERTS: Cert[] = [
  { id: "none", label: "特になし", bonus: 0, rarity: 32 },
  { id: "car", label: "普通自動車免許（AT・MT）", bonus: 10, rarity: 38 },
  { id: "takken", label: "宅地建物取引士（宅建）", bonus: 120, rarity: 82 },
  { id: "fp2", label: "FP2級（ファイナンシャルプランナー）", bonus: 80, rarity: 68 },
  { id: "fp3", label: "FP3級", bonus: 30, rarity: 46 },
  { id: "life_agent", label: "生命保険募集人資格", bonus: 25, rarity: 44 },
  { id: "general_agent", label: "損害保険募集人資格", bonus: 20, rarity: 42 },
  { id: "securities1", label: "証券外務員一種・二種", bonus: 70, rarity: 62 },
  { id: "boki2", label: "日商簿記2級", bonus: 50, rarity: 58 },
  { id: "toeic700", label: "TOEIC 700点以上", bonus: 55, rarity: 60 },
  { id: "toeic800", label: "TOEIC 800点以上", bonus: 90, rarity: 74 },
  { id: "it_passport", label: "ITパスポート・基本情報技術者", bonus: 35, rarity: 50 },
  { id: "mos", label: "MOS（Microsoft Office）", bonus: 15, rarity: 36 },
  { id: "other_cert", label: "その他専門資格", bonus: 40, rarity: 52 },
];

export const SALARIES: Salary[] = [
  { id: "u250", label: "250万円未満", value: 220 },
  { id: "250", label: "250〜300万円", value: 275 },
  { id: "300", label: "300〜350万円", value: 325 },
  { id: "350", label: "350〜400万円", value: 375 },
  { id: "400", label: "400〜450万円", value: 425 },
  { id: "450", label: "450〜500万円", value: 475 },
  { id: "500", label: "500〜600万円", value: 550 },
  { id: "600", label: "600〜700万円", value: 650 },
  { id: "700p", label: "700万円以上", value: 800 },
];

export const STEPS: StepDef[] = [
  { key: "role", title: "現在の職種", sub: "最も近い営業スタイルを選んでください" },
  { key: "industry", title: "現在の業界", sub: "所属している業界・取り扱い商材はどちらですか？" },
  { key: "experience", title: "営業経験年数", sub: "現職種での累計経験年数はどのくらいですか？" },
  { key: "skill", title: "営業スキルレベル", sub: "今の自分を正直に評価してください" },
  { key: "cert", title: "保有資格", sub: "最も市場価値に影響する資格を1つ選んでください" },
  { key: "salary", title: "現在の年収", sub: "現在の年収（額面・見込み含む）はどのくらいですか？" },
];

export function getOptionsForStep(key: string) {
  switch (key) {
    case "role": return ROLES;
    case "industry": return INDUSTRIES;
    case "experience": return EXPERIENCES;
    case "skill": return SKILLS;
    case "cert": return CERTS;
    case "salary": return SALARIES;
    default: return [];
  }
}

export function getSubText(key: string, option: Record<string, unknown>): string {
  switch (key) {
    case "role": return option.desc as string;
    case "industry": return option.demand as string;
    case "experience": return option.tag as string;
    case "skill": return option.desc as string;
    case "cert": return (option.bonus as number) > 0 ? `+${option.bonus}万円の評価加算` : "";
    default: return "";
  }
}

export function isTwoColStep(key: string): boolean {
  return ["role", "industry", "cert", "salary"].includes(key);
}
