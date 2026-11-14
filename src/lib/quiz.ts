// The rules for unit quizzes. No imports, so they can be tested on their own.

export const QUIZ_SIZE = 10;
/** A quiz is passed at this score or higher. */
export const PASS_PERCENT = 70;
/** XP for each right answer, and a bonus the first time a unit quiz is passed. */
export const QUIZ_XP_PER_CORRECT = 5;
export const QUIZ_FIRST_PASS_BONUS = 50;

type Question = { id?: string };

/**
 * Picks questions for one attempt, in random order. Questions from the last attempt are skipped
 * while there are enough others, so a retry is not the same quiz again.
 */
export function drawQuestions<T extends Question>(
  bank: T[],
  avoid: ReadonlySet<string> = new Set(),
  size: number = QUIZ_SIZE,
  random: () => number = Math.random,
): T[] {
  const fresh = bank.filter((q) => !q.id || !avoid.has(q.id));
  const pool = fresh.length >= size ? fresh : bank;
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(size, shuffled.length));
}

export function percent(correct: number, total: number): number {
  return total === 0 ? 0 : Math.round((correct / total) * 100);
}

export function isPass(correct: number, total: number): boolean {
  return percent(correct, total) >= PASS_PERCENT;
}

/** The lessons behind the missed questions, once each, in course order. Questions marked "mixed" point nowhere. */
export function lessonsToReview(missed: { source?: string }[]): string[] {
  const ids = new Set<string>();
  for (const q of missed) if (q.source && /^\d+\.\d+$/.test(q.source)) ids.add(q.source);
  return [...ids].sort((a, b) => {
    const [ua, la] = a.split('.').map(Number);
    const [ub, lb] = b.split('.').map(Number);
    return ua - ub || la - lb;
  });
}

/** XP for an attempt: points for right answers, plus a bonus for the first pass. */
export function quizXp(correct: number, total: number, firstPass: boolean): number {
  return correct * QUIZ_XP_PER_CORRECT + (firstPass && isPass(correct, total) ? QUIZ_FIRST_PASS_BONUS : 0);
}
