// Checks the unit quiz rules. Run with: npm test
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { PASS_PERCENT, drawQuestions, isPass, lessonsToReview, percent, quizXp } from '../src/lib/quiz.ts';

const bank = Array.from({ length: 25 }, (_, i) => ({ id: `Q${i + 1}`, source: `1.${(i % 5) + 1}` }));

test('a quiz has 10 different questions', () => {
  const picked = drawQuestions(bank);
  assert.equal(picked.length, 10);
  assert.equal(new Set(picked.map((q) => q.id)).size, 10);
});

test('a retry skips the questions from the last attempt', () => {
  const first = drawQuestions(bank);
  const second = drawQuestions(bank, new Set(first.map((q) => q.id)));
  assert.equal(second.filter((q) => first.some((f) => f.id === q.id)).length, 0);
});

test('a small bank still gives a full quiz, repeating if it has to', () => {
  const small = bank.slice(0, 12);
  const picked = drawQuestions(small, new Set(small.slice(0, 6).map((q) => q.id)));
  assert.equal(picked.length, 10);
});

test('a bank smaller than the quiz gives all it has', () => {
  assert.equal(drawQuestions(bank.slice(0, 4)).length, 4);
});

test('the order is shuffled by the random function', () => {
  const never = () => 0; // always swaps with the first item
  const picked = drawQuestions(bank, new Set(), 25, never);
  assert.notDeepEqual(picked.map((q) => q.id), bank.map((q) => q.id));
});

test('70 percent passes and 60 does not', () => {
  assert.equal(PASS_PERCENT, 70);
  assert.equal(isPass(7, 10), true);
  assert.equal(isPass(6, 10), false);
  assert.equal(isPass(10, 10), true);
  assert.equal(percent(0, 0), 0);
  assert.equal(percent(2, 3), 67);
});

test('the lessons to review are listed once, in course order, and mixed questions are left out', () => {
  const missed = [{ source: '2.3' }, { source: '1.5' }, { source: '2.3' }, { source: 'mixed' }, {}, { source: '10.2' }];
  assert.deepEqual(lessonsToReview(missed), ['1.5', '2.3', '10.2']);
});

test('XP is five per right answer, with a bonus for the first pass only', () => {
  assert.equal(quizXp(8, 10, true), 90);
  assert.equal(quizXp(8, 10, false), 40);
  assert.equal(quizXp(5, 10, true), 25);
});
