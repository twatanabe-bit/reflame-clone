import type { MBTIDimension, MBTIType, StatusValues, DiagnosisResult } from "./types";
import { questions, jobTypes } from "./data";

export function calculateMBTI(answers: number[]): {
  mbtiType: MBTIType;
  scores: Record<MBTIDimension, number>;
} {
  const scores: Record<MBTIDimension, number> = {
    E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0,
  };

  answers.forEach((optionIndex, questionIndex) => {
    const question = questions[questionIndex];
    if (!question) return;
    const option = question.options[optionIndex];
    if (!option) return;

    for (const [dim, value] of Object.entries(option.scores)) {
      scores[dim as MBTIDimension] += value as number;
    }
  });

  const ei = scores.E >= scores.I ? "E" : "I";
  const sn = scores.S >= scores.N ? "S" : "N";
  const tf = scores.T >= scores.F ? "T" : "F";
  const jp = scores.J >= scores.P ? "J" : "P";

  const mbtiType = `${ei}${sn}${tf}${jp}` as MBTIType;

  return { mbtiType, scores };
}

export function calculateStatus(
  scores: Record<MBTIDimension, number>,
  job: { statusBase: StatusValues }
): StatusValues {
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  const normalize = (val: number) => Math.min(100, Math.max(10, Math.round(val)));

  return {
    breakthrough: normalize(job.statusBase.breakthrough + (scores.E - scores.I) * 2 + scores.T),
    coordination: normalize(job.statusBase.coordination + (scores.F - scores.T) * 2 + scores.E),
    logic: normalize(job.statusBase.logic + (scores.T - scores.F) * 2 + scores.J),
    creativity: normalize(job.statusBase.creativity + (scores.N - scores.S) * 2 + scores.P),
    empathy: normalize(job.statusBase.empathy + (scores.F - scores.T) * 2 + scores.E),
  };
}

export function diagnose(answers: number[]): DiagnosisResult {
  const { mbtiType, scores } = calculateMBTI(answers);
  const job = jobTypes.find((j) => j.mbti === mbtiType) ?? jobTypes[0];
  const status = calculateStatus(scores, job);

  return { mbtiType, job, scores, status, answers };
}

export function encodeAnswers(answers: number[]): string {
  return btoa(JSON.stringify(answers));
}

export function decodeAnswers(encoded: string): number[] {
  try {
    return JSON.parse(atob(encoded));
  } catch {
    return [];
  }
}
