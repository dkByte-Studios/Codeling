import { courseIndex, lessonOrder } from './content/load';
import { PASS_PERCENT, quizXp } from './quiz';

const KEY = 'codeling.progress.v1';

type Saved = {
  completed: Record<string, number>;
  xp: number;
  /** Unit number to the best quiz score, in percent. */
  quizBest: Record<string, number>;
};

function read(): Saved {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const data = JSON.parse(raw) as Partial<Saved>;
      return { completed: data.completed ?? {}, xp: data.xp ?? 0, quizBest: data.quizBest ?? {} };
    }
  } catch {
    // Storage can be blocked or empty. Start fresh.
  }
  return { completed: {}, xp: 0, quizBest: {} };
}

const unitOf = (lessonId: string) => Number(lessonId.split('.')[0]);
const hasQuiz = (unit: number) => (courseIndex.units.find((u) => u.unit === unit)?.quizQuestions ?? 0) > 0;

class Progress {
  /** Lesson id to the best accuracy, 0 to 100. */
  completed = $state<Record<string, number>>({});
  xp = $state(0);
  quizBest = $state<Record<string, number>>({});

  constructor() {
    const saved = read();
    this.completed = saved.completed;
    this.xp = saved.xp;
    this.quizBest = saved.quizBest;
  }

  private save() {
    try {
      localStorage.setItem(KEY, JSON.stringify({ completed: this.completed, xp: this.xp, quizBest: this.quizBest }));
    } catch {
      // Not saving is better than crashing.
    }
  }

  isDone(id: string) {
    return id in this.completed;
  }

  quizScore(unit: number): number | null {
    return this.quizBest[String(unit)] ?? null;
  }

  isQuizPassed(unit: number) {
    return (this.quizScore(unit) ?? -1) >= PASS_PERCENT;
  }

  /** A unit opens when the quiz of the unit before it is passed. Unit 1 is always open. */
  isUnitOpen(unit: number) {
    return unit <= 1 || !hasQuiz(unit - 1) || this.isQuizPassed(unit - 1);
  }

  /** A lesson opens when its unit is open and the lesson before it in the unit is done. */
  isUnlocked(id: string) {
    const unit = unitOf(id);
    if (!this.isUnitOpen(unit)) return false;
    if (this.isQuizPassed(unit)) return true; // a unit passed by its quiz keeps all its lessons open for review
    const at = lessonOrder.indexOf(id);
    return at <= 0 || unitOf(lessonOrder[at - 1]) !== unit || this.isDone(lessonOrder[at - 1]);
  }

  allLessonsDone(unit: number) {
    return lessonOrder.filter((id) => unitOf(id) === unit).every((id) => this.isDone(id));
  }

  /** The quiz can be taken once the unit is open, even before the lessons: that is testing out. */
  isQuizOpen(unit: number) {
    return hasQuiz(unit) && this.isUnitOpen(unit);
  }

  complete(id: string, accuracy: number, xp: number) {
    this.completed = { ...this.completed, [id]: Math.max(this.completed[id] ?? 0, accuracy) };
    this.xp += xp;
    this.save();
  }

  /** Saves a quiz attempt. Returns the XP earned. */
  recordQuiz(unit: number, correct: number, total: number): number {
    const score = total ? Math.round((correct / total) * 100) : 0;
    const firstPass = !this.isQuizPassed(unit);
    const xp = quizXp(correct, total, firstPass);
    this.quizBest = { ...this.quizBest, [String(unit)]: Math.max(this.quizScore(unit) ?? 0, score) };
    this.xp += xp;
    this.save();
    return xp;
  }

  /** What to do next: the first lesson not done, or the quiz that unlocks the next unit. */
  get next(): { kind: 'lesson'; id: string } | { kind: 'quiz'; unit: number } | null {
    // Lessons in a unit already passed by its quiz are not "next", even if they were skipped.
    const id = lessonOrder.find((l) => !this.isDone(l) && !this.isQuizPassed(unitOf(l)));
    if (!id) return null;
    if (this.isUnlocked(id)) return { kind: 'lesson', id };
    const unit = unitOf(id) - 1;
    return this.isQuizOpen(unit) ? { kind: 'quiz', unit } : null;
  }
}

export const progress = new Progress();
