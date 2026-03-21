import { Answers, DiagnosisResult, ActionPlan } from "./types";
import { ROLES, INDUSTRIES, EXPERIENCES, SKILLS, CERTS, SALARIES } from "./data";

export function calcScore(ans: Required<Answers>): DiagnosisResult {
  const role = ROLES.find((r) => r.id === ans.role)!;
  const ind = INDUSTRIES.find((i) => i.id === ans.industry)!;
  const exp = EXPERIENCES.find((e) => e.id === ans.experience)!;
  const skill = SKILLS.find((s) => s.id === ans.skill)!;
  const cert = CERTS.find((c) => c.id === ans.cert)!;
  const curSal = SALARIES.find((s) => s.id === ans.salary)!.value;

  const s1 = role.base;
  const s2 = Math.round(s1 * ind.mult);
  const s3 = Math.round(s2 * exp.mult);
  const s4 = s3 + skill.bonus;
  const mv = s4 + cert.bonus;
  const gap = mv - curSal;
  const gapPct = Math.round((gap / curSal) * 100);
  const pct = Math.min(95, Math.max(6, Math.round(50 + (mv - 420) / 6.5)));

  const langScore = ans.cert === "toeic700" ? 72 : ans.cert === "toeic800" ? 90 : 36;
  const potScore = ["u1", "1-2"].includes(ans.experience) ? 88 : ans.experience === "3-4" ? 72 : 58;

  const breakdown = [
    { label: `${role.label}（職種基本値）`, value: `${s1}万円`, pos: true },
    { label: `${ind.label}（業界係数）`, value: `×${ind.mult}`, pos: ind.mult >= 1 },
    { label: `経験年数 ${exp.label}（年次補正）`, value: `×${exp.mult}`, pos: exp.mult >= 1 },
    ...(skill.bonus > 0 ? [{ label: `スキルレベル「${skill.label}」`, value: `+${skill.bonus}万円`, pos: true }] : []),
    ...(cert.bonus > 0 ? [{ label: cert.label, value: `+${cert.bonus}万円`, pos: true }] : []),
  ];

  const radar = [
    { label: "営業力", val: skill.expertise },
    { label: "ポテンシャル", val: potScore },
    { label: "スキル汎用性", val: skill.portable },
    { label: "希少性", val: cert.rarity },
    { label: "語学力", val: langScore },
  ];

  const plans = getPlans(cert, ind, exp, skill);

  return { mv, curSal, gap, gapPct, pct, breakdown, radar, role, ind, exp, skill, cert, plans };
}

function getPlans(
  cert: { bonus: number },
  ind: { mult: number; label: string },
  exp: { id: string },
  skill: { id: string },
): ActionPlan[] {
  const plans: ActionPlan[] = [];

  if (cert.bonus < 80)
    plans.push({
      icon: "🏆",
      color: "#1E40AF",
      bg: "rgba(30,64,175,.1)",
      title: "宅建・FP2級の取得",
      impact: "+80〜+120万円",
      period: "6ヶ月〜1年",
      detail:
        "宅建やFP2級は不動産・保険・金融業界で「専門営業」として評価される資格です。現職のまま受験でき、合格後すぐ転職交渉・業界スイッチに活用できます。",
    });

  if (ind.mult < 1.12)
    plans.push({
      icon: "🎯",
      color: "#047857",
      bg: "rgba(4,120,87,.1)",
      title: "SaaS・不動産業界へのスイッチ",
      impact: "+60〜+130万円",
      period: "3〜6ヶ月",
      detail: `現在の${ind.label}より市場係数の高いSaaS・不動産・人材業界への転換で、同じ営業スキルが「即戦力人材」として2ランク上の評価を受けます。`,
    });

  if (["u1", "1-2"].includes(exp.id))
    plans.push({
      icon: "⚡",
      color: "#7C3AED",
      bg: "rgba(124,58,237,.1)",
      title: "第二新卒枠を最大限に活用",
      impact: "+40〜+80万円",
      period: "今すぐ",
      detail:
        "25歳前後は「第二新卒枠」が使える最後のチャンス。SaaS・人材など高成長企業では現職より高年収オファーが出やすい時期です。今動かないと枠が閉まります。",
    });

  if (skill.id !== "expert")
    plans.push({
      icon: "📈",
      color: "#0369A1",
      bg: "rgba(3,105,161,.1)",
      title: "営業実績の数値化と外部発信",
      impact: "+40〜+70万円",
      period: "1〜3ヶ月",
      detail:
        "「月30件アポ獲得」「達成率140%」など実績を数字で語れるかが年収交渉の分岐点。LinkedInや職務経歴書の改善だけで同じスキルでも20〜50万円の差が生まれます。",
    });

  return plans.slice(0, 3);
}

export function encodeAnswers(answers: Required<Answers>): string {
  return btoa(JSON.stringify(answers));
}

export function decodeAnswers(encoded: string): Required<Answers> | null {
  try {
    return JSON.parse(atob(encoded));
  } catch {
    return null;
  }
}
