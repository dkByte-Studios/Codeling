import index from '../../content/generated/index.json';
import type { CourseIndex, Lesson, Unit } from './types';

export const courseIndex = index as CourseIndex;

const loaders = import.meta.glob<Unit>('../../content/generated/unit-*.json', { import: 'default' });

/** Units are loaded one at a time, when they are needed. */
export async function loadUnit(unit: number): Promise<Unit> {
  const load = loaders[`../../content/generated/unit-${String(unit).padStart(2, '0')}.json`];
  if (!load) throw new Error(`Unit ${unit} is not in the course data.`);
  return load();
}

export async function loadLesson(id: string): Promise<{ unit: Unit; lesson: Lesson }> {
  const unit = await loadUnit(Number(id.split('.')[0]));
  const lesson = unit.lessons.find((l) => l.id === id);
  if (!lesson) throw new Error(`Lesson ${id} was not found.`);
  return { unit, lesson };
}

/** Every lesson id in course order. */
export const lessonOrder: string[] = courseIndex.units.flatMap((u) => u.lessons.map((l) => l.id));
