<script lang="ts">
  import { onMount, untrack } from 'svelte';
  import type { TypedExercise } from '../../lib/content/types';
  import { gradeTyped } from '../../lib/python/grade';
  import { getPython } from '../../lib/python/shared';
  import Blocks from '../Blocks.svelte';
  import type { CheckResult } from './api';

  let { exercise, locked, onready }: { exercise: TypedExercise; locked: boolean; onready: (ready: boolean) => void } = $props();

  const python = getPython();
  // The lesson player makes a new copy of this component for each exercise, so these are read once.
  let code = $state(untrack(() => exercise).starter);
  let pythonState = $state<'loading' | 'ready' | 'failed'>('loading');
  let running = $state(false);
  let shown = $state<{ text: string; error?: string } | null>(null);
  const first = untrack(() => exercise).tests[0];

  onMount(() => {
    python.whenReady().then(
      () => (pythonState = 'ready'),
      () => (pythonState = 'failed'),
    );
  });

  $effect(() => {
    onready(code.trim().length > 0);
  });

  async function run() {
    running = true;
    let result;
    try {
      result = await python.run({ code, inputs: first.inputs, files: first.files, seed: 1, timeLimitMs: 5000 });
    } catch (error) {
      running = false;
      shown = { text: '', error: `The program could not be run: ${error instanceof Error ? error.message : String(error)}` };
      return;
    }
    running = false;
    if (result.status === 'error' && result.error) shown = { text: result.transcript, error: result.error.text };
    else if (result.status === 'timeout') shown = { text: result.transcript, error: 'Stopped: your program ran for more than 5 seconds. Is there an endless loop?' };
    else if (result.status === 'needInput') shown = { text: result.transcript, error: 'The program asked for more answers than this exercise gives.' };
    else shown = { text: result.transcript };
  }

  function onkeydown(event: KeyboardEvent) {
    const area = event.currentTarget as HTMLTextAreaElement;
    if (event.key === 'Tab') {
      event.preventDefault();
      insert(area, '    ');
    } else if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.metaKey) {
      // Keep the indent of the line above, and add one level after a colon.
      event.preventDefault();
      const before = area.value.slice(0, area.selectionStart);
      const line = before.slice(before.lastIndexOf('\n') + 1);
      const indent = line.match(/^ */)?.[0] ?? '';
      insert(area, '\n' + indent + (line.trimEnd().endsWith(':') ? '    ' : ''));
    }
  }

  function insert(area: HTMLTextAreaElement, text: string) {
    const start = area.selectionStart;
    code = area.value.slice(0, start) + text + area.value.slice(area.selectionEnd);
    queueMicrotask(() => area.setSelectionRange(start + text.length, start + text.length));
  }

  export async function check(): Promise<CheckResult> {
    return gradeTyped(exercise, code);
  }
</script>

<div class="prompt"><Blocks blocks={exercise.prompt} /></div>

<label class="label" for="editor">Your code</label>
<textarea
  id="editor"
  class="editor"
  bind:value={code}
  {onkeydown}
  readonly={locked}
  spellcheck="false"
  autocapitalize="off"
  autocomplete="off"
  rows={Math.max(6, code.split('\n').length + 2)}
></textarea>

<div class="bar">
  <button type="button" class="btn primary" disabled={running || pythonState !== 'ready'} onclick={run}>Run</button>
  <span class="status">
    {#if pythonState === 'loading'}Starting Python...{:else if pythonState === 'failed'}Python could not start. Reload the page and try again.{:else if running}Running...{:else if first.inputs.length}The app types these answers for you: {first.inputs.join(', ')}{/if}
  </span>
</div>

{#if shown}
  <div class="label">Output</div>
  <pre class="code console">{shown.text || (shown.error ? '' : '(nothing is shown)')}</pre>
  {#if shown.error}<pre class="code problem">{shown.error}</pre>{/if}
{/if}

<style>
  .label { display: block; margin: 16px 0 6px; font-weight: 800; font-size: 13px; color: var(--muted); }
  .editor {
    width: 100%; font-family: var(--mono); font-size: 14px; line-height: 1.6; padding: 12px 14px;
    border: 2px solid var(--line); border-radius: 14px; background: #fffdf6; color: var(--ink); resize: vertical; tab-size: 4;
  }
  .editor:focus { outline: none; border-color: var(--mint); }
  .bar { display: flex; align-items: center; gap: 14px; margin-top: 12px; flex-wrap: wrap; }
  .status { color: var(--muted); font-size: 14px; }
  .console { min-height: 48px; white-space: pre-wrap; }
  .problem { background: var(--coral-tint); border-color: var(--coral); margin-top: 8px; white-space: pre-wrap; }
</style>
