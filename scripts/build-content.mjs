// Reads content/python/*.md and writes src/content/generated/*.json for the app.
// Run automatically before dev, build and type-check.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseUnit } from './content-parser.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'content', 'python');
const target = join(root, 'src', 'content', 'generated');

// Files are overwritten in place, not deleted first, so a running dev server never sees the folder vanish.
mkdirSync(target, { recursive: true });
const written = new Set();
const save = (name, data) => {
  writeFileSync(join(target, name), JSON.stringify(data));
  written.add(name);
};

const index = [];
const counts = { lessons: 0, exercises: 0, quiz: 0, exam: 0, skipped: 0 };
for (const name of readdirSync(source).filter((f) => /^unit-\d+.*\.md$/.test(f)).sort()) {
  const unit = parseUnit(readFileSync(join(source, name), 'utf8').replace(/\r\n/g, '\n'));
  const id = String(unit.unit).padStart(2, '0');
  save(`unit-${id}.json`, unit);
  index.push({
    unit: unit.unit,
    title: unit.title,
    lessons: unit.lessons.map((l) => ({ id: l.id, title: l.title, exercises: l.exercises.length })),
    hasProject: unit.project !== null,
    quizQuestions: unit.quiz.length,
  });
  counts.lessons += unit.lessons.length;
  counts.exercises += unit.lessons.reduce((n, l) => n + l.exercises.length, 0);
  counts.quiz += unit.quiz.length;
  counts.exam += unit.exam.length;
  counts.skipped += unit.skipped.length;
  for (const s of unit.skipped) console.warn(`  skipped ${s.lesson} #${s.number} (${s.title}): ${s.reason}`);
}
save('index.json', { units: index });
for (const name of readdirSync(target)) if (!written.has(name)) rmSync(join(target, name), { force: true });
console.log(
  `Content: ${index.length} units, ${counts.lessons} lessons, ${counts.exercises} exercises, ${counts.quiz} quiz questions, ${counts.exam} exam questions, ${counts.skipped} skipped.`,
);
