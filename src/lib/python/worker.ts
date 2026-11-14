/// <reference lib="webworker" />
// Runs learner code with Pyodide, away from the page, so the page never freezes.
import type { PyodideAPI } from 'pyodide';
import harness from './harness.py?raw';
import type { FromWorker, ToWorker } from './protocol';

let pyodide: PyodideAPI | null = null;

const post = (message: FromWorker) => self.postMessage(message);

async function init(indexURL: string) {
  const started = performance.now();
  let stage = 'loading pyodide.mjs';
  try {
    const { loadPyodide } = await import(/* @vite-ignore */ `${indexURL}pyodide.mjs`);
    stage = 'starting Python (loading the Python files)';
    pyodide = (await loadPyodide({ indexURL })) as PyodideAPI;
    stage = 'running the setup code';
    pyodide.runPython(harness);
    post({ type: 'ready', loadMs: Math.round(performance.now() - started) });
  } catch (error) {
    post({ type: 'failed', message: `Failed while ${stage}: ${error instanceof Error ? error.message : String(error)}` });
  }
}

function run(message: Extract<ToWorker, { type: 'run' }>) {
  if (!pyodide) {
    post({ type: 'failed', message: 'Python is not ready yet.' });
    return;
  }
  const runUserCode = pyodide.globals.get('run_user_code');
  try {
    const json = runUserCode(
      message.code,
      JSON.stringify(message.inputs),
      JSON.stringify(message.files),
      message.keepFiles,
      message.seed,
    ) as string;
    post({ type: 'result', id: message.id, result: JSON.parse(json) });
  } finally {
    runUserCode.destroy();
  }
}

self.onmessage = (event: MessageEvent<ToWorker>) => {
  const message = event.data;
  if (message.type === 'init') void init(message.indexURL);
  else if (message.type === 'run') run(message);
};
