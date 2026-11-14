import type { TypedExercise } from '../content/types';
import { getPython } from './shared';

export type Verdict = { correct: boolean; message: string; detail?: string };

const clean = (text: string) => text.replace(/\r\n/g, '\n').trim();

/** Swaps the starting lines for a test. Null when the learner's code no longer has a line to swap. */
export function applySubstitutions(code: string, substitute: { from: string; to: string }[] | undefined): string | null {
  if (!substitute?.length) return code;
  const lines = code.split('\n');
  for (const { from, to } of substitute) {
    const at = lines.findIndex((line) => line.trimEnd() === from.trimEnd());
    if (at < 0) return null;
    lines[at] = to;
  }
  return lines.join('\n');
}

/** Runs the learner's code against each test and compares what it prints. */
export async function gradeTyped(exercise: TypedExercise, code: string): Promise<Verdict> {
  for (const needle of exercise.mustContain) {
    if (!code.includes(needle)) return { correct: false, message: `Your code should contain ${needle}` };
  }
  for (const pattern of exercise.mustMatch) {
    if (!new RegExp(pattern, 'm').test(code)) {
      return { correct: false, message: 'Your code is missing something the task asked for. Read the task again.' };
    }
  }
  const python = getPython();
  for (const test of exercise.tests) {
    const swapped = applySubstitutions(code, test.substitute);
    if (swapped === null) {
      const needed = test.substitute?.[0]?.from.trim() ?? '';
      return { correct: false, message: `Keep the starting line ${needed} in your code, so it can be tested with other values.` };
    }
    const result = await python.run({ code: swapped, inputs: test.inputs, files: test.files, seed: 1, timeLimitMs: 5000 });
    const where = test.inputs.length
      ? ` when the answers typed are ${test.inputs.join(', ')}`
      : test.substitute?.length
        ? ` when ${test.substitute.map((s) => s.to.trim()).join(' and ')}`
        : '';
    if (result.status === 'error' && result.error) {
      return { correct: false, message: `Your program stopped with an error${where}.`, detail: result.error.text };
    }
    if (result.status === 'timeout') {
      return { correct: false, message: 'Your program ran for more than 5 seconds. Is there an endless loop?' };
    }
    if (result.status === 'needInput') {
      return { correct: false, message: 'Your program asked for more answers than the task gives.' };
    }
    if (result.status !== 'done') return { correct: false, message: 'The program was stopped.' };
    if (clean(result.stdout) !== clean(test.expected)) {
      return {
        correct: false,
        message: `The program shows something different${where}.`,
        detail: `Expected:\n${clean(test.expected) || '(nothing)'}\n\nYour program showed:\n${clean(result.stdout) || '(nothing)'}`,
      };
    }
  }
  return { correct: true, message: 'All checks passed.' };
}
