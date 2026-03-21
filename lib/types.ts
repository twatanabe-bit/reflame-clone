export interface Role {
  id: string;
  label: string;
  icon: string;
  base: number;
  desc: string;
}

export interface Industry {
  id: string;
  label: string;
  mult: number;
  demand: string;
}

export interface Experience {
  id: string;
  label: string;
  mult: number;
  tag: string;
}

export interface Skill {
  id: string;
  label: string;
  desc: string;
  bonus: number;
  expertise: number;
  portable: number;
}

export interface Cert {
  id: string;
  label: string;
  bonus: number;
  rarity: number;
}

export interface Salary {
  id: string;
  label: string;
  value: number;
}

export interface StepDef {
  key: string;
  title: string;
  sub: string;
}

export interface Answers {
  role?: string;
  industry?: string;
  experience?: string;
  skill?: string;
  cert?: string;
  salary?: string;
}

export interface RadarPoint {
  label: string;
  val: number;
}

export interface BreakdownItem {
  label: string;
  value: string;
  pos: boolean;
}

export interface ActionPlan {
  icon: string;
  color: string;
  bg: string;
  title: string;
  impact: string;
  period: string;
  detail: string;
}

export interface DiagnosisResult {
  mv: number;
  curSal: number;
  gap: number;
  gapPct: number;
  pct: number;
  breakdown: BreakdownItem[];
  radar: RadarPoint[];
  role: Role;
  ind: Industry;
  exp: Experience;
  skill: Skill;
  cert: Cert;
  plans: ActionPlan[];
}
