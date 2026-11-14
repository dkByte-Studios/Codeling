import { lessonOrder } from './content/load';

const KEY = 'codeling.progress.v1';

type Saved = { completed: Record<string, number>; xp: number };

function read(): Saved {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const data = JSON.parse(raw) as Partial<Saved>;
      return { completed: data.completed ?? {}, xp: data.xp ?? 0 };
    }
  } catch {
    // Storage can be blocked or empty. Start fresh.
  }
  return { completed: {}, xp: 0 };
}

class Progress {
  /** Lesson id to the best accuracy, 0 to 100. */
  completed = $state<Record<string, number>>({});
  xp = $state(0);

  constructor() {
    const saved = read();
    this.completed = saved.completed;
    this.xp = saved.xp;
  }

  private save() {
    try {
      localStorage.setItem(KEY, JSON.stringify({ completed: this.completed, xp: this.xp }));
    } catch {
      // Not saving is better than crashing.
    }
  }

  isDone(id: string) {
    return id in this.completed;
  }

  /** A lesson opens when the one before it is done. */
  isUnlocked(id: string) {
    const at = lessonOrder.indexOf(id);
    return at === 0 || (at > 0 && this.isDone(lessonOrder[at - 1]));
  }

  complete(id: string, accuracy: number, xp: number) {
    this.completed = { ...this.completed, [id]: Math.max(this.completed[id] ?? 0, accuracy) };
    this.xp += xp;
    this.save();
  }

  /** The first lesson that is not done yet. */
  get current() {
    return lessonOrder.find((id) => !this.isDone(id)) ?? null;
  }
}

export const progress = new Progress();
