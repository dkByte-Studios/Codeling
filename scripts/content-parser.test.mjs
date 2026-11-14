// Checks that every lesson file turns into data the app can play. Run with: npm test
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { inline, parseUnit } from './content-parser.mjs';

const source = join(dirname(fileURLToPath(import.meta.url)), '..', 'content', 'python');
const units = readdirSync(source)
  .filter((f) => /^unit-\d+.*\.md$/.test(f))
  .sort()
  .map((f) => parseUnit(readFileSync(join(source, f), 'utf8').replace(/\r\n/g, '\n')));

const everything = (unit) => [...unit.lessons.flatMap((l) => l.exercises), ...unit.quiz, ...unit.exam];

test('inline keeps ** inside code and turns **bold** into strong', () => {
  assert.equal(inline('use `**` for power and **bold** text'), 'use <code>**</code> for power and <strong>bold</strong> text');
  assert.equal(inline('a < b & c'), 'a &lt; b &amp; c');
});

test('the whole course is there', () => {
  assert.equal(units.length, 16);
  assert.equal(units.reduce((n, u) => n + u.lessons.length, 0), 84);
  for (const unit of units) {
    assert.ok(unit.title, `unit ${unit.unit} has a title`);
    assert.equal(unit.quiz.length, unit.unit === 16 ? 0 : 25, `unit ${unit.unit} quiz bank size`);
  }
  assert.equal(units[15].exam.length, 30);
});

test('every lesson has something to read, practice and remember', () => {
  for (const unit of units) {
    for (const lesson of unit.lessons) {
      assert.ok(lesson.teach.length > 0, `${lesson.id} has teach text`);
      assert.ok(lesson.exercises.length >= 5, `${lesson.id} has at least 5 exercises`);
      assert.ok(lesson.recap.length > 0, `${lesson.id} has a recap`);
    }
  }
});

test('every exercise and question is well formed', () => {
  for (const unit of units) {
    for (const e of everything(unit)) {
      const where = `unit ${unit.unit} ${e.id ?? e.number}`;
      assert.ok(e.prompt.length > 0, `${where} has a prompt`);
      if (e.type === 'choice') {
        assert.ok(e.options.length >= 2 && e.options.length <= 4, `${where} option count`);
        assert.ok(e.answer >= 0 && e.answer < e.options.length, `${where} answer index`);
      } else if (e.type === 'tf') {
        assert.equal(typeof e.answer, 'boolean', where);
      } else if (e.type === 'order') {
        assert.ok(e.pieces.length >= 2, `${where} pieces`);
      } else if (e.type === 'match') {
        assert.ok(e.pairs.length >= 2, `${where} pairs`);
      } else if (e.type === 'typed') {
        assert.ok(e.tests.length >= 1, `${where} tests`);
        for (const t of e.tests) assert.equal(typeof t.expected, 'string', where);
      } else if (e.type === 'trace') {
        assert.ok(e.rows.length >= 1 && e.vars.length >= 1 && Number.isInteger(e.line), `${where} trace`);
      } else {
        assert.fail(`${where} has an unknown type ${e.type}`);
      }
    }
  }
});

test('only the two known exercises are skipped', () => {
  const skipped = units.flatMap((u) => u.skipped.map((s) => `${s.lesson}#${s.number}`));
  assert.deepEqual(skipped, ['2.3#3', '4.6#7']);
});

test('unit 1 reads the way it is written', () => {
  const u = units[0];
  assert.deepEqual(u.lessons[0].exercises.map((e) => e.type), ['choice', 'tf', 'order', 'choice', 'match', 'choice']);
  const typed = u.lessons[1].exercises.at(-1);
  assert.equal(typed.type, 'typed');
  assert.deepEqual(typed.tests, [{ inputs: [], files: {}, expected: 'Hello' }]);
  const commentTask = u.lessons[3].exercises.at(-1);
  assert.deepEqual(commentTask.mustMatch, ['^\\s*#']);
});

test('sample files and typed answers reach the tests', () => {
  const settings = units[13].lessons[3].exercises.at(-1);
  assert.deepEqual(settings.tests, [
    { inputs: [], files: {}, expected: 'light' },
    { inputs: [], files: { 'settings.txt': 'dark\n' }, expected: 'dark' },
  ]);
  const guess = units[5].project;
  assert.ok(guess.tests.length >= 2);
  assert.deepEqual(guess.tests[0].inputs, ['5', '9', '7']);
});

test('trace tables keep their rows', () => {
  const trace = units[4].lessons[2].exercises.find((e) => e.type === 'trace');
  assert.equal(trace.line, 3);
  assert.deepEqual(trace.vars, ['count']);
  assert.deepEqual(trace.rows.map((r) => r.final), [false, false, false, true]);
  assert.equal(trace.rows[3].values.count, '5');
});
