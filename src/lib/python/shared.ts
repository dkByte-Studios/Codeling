import { PythonRunner } from './runner';

let runner: PythonRunner | null = null;

/** One Python for the whole app. It starts the first time something asks for it. */
export function getPython(): PythonRunner {
  runner ??= new PythonRunner(import.meta.env.BASE_URL);
  // In development, lets the browser console inspect the one Python the app uses.
  if (import.meta.env.DEV) (globalThis as { __python?: PythonRunner }).__python = runner;
  return runner;
}
