<script lang="ts">
  import { untrack } from 'svelte';
  import type { TraceExercise } from '../../lib/content/types';
  import Blocks from '../Blocks.svelte';
  import type { CheckResult } from './api';

  let { exercise, locked, onready }: { exercise: TraceExercise; locked: boolean; onready: (ready: boolean) => void } = $props();

  // The lesson player makes a new copy of this component for each exercise, so the code is read once.
  const lines = untrack(() => exercise).code.split('\n');
  const key = (row: number, name: string) => `${row}:${name}`;
  let values = $state<Record<string, string>>({});

  // Quotes around text do not matter: 'cat' and cat are the same answer.
  const normal = (text: string) => text.trim().replace(/^(['"])(.*)\1$/, '$2');
  const expected = (row: number, name: string) => normal(exercise.rows[row].values[name] ?? '');
  const cellWrong = (row: number, name: string) => locked && normal(values[key(row, name)] ?? '') !== expected(row, name);

  function update(row: number, name: string, value: string) {
    values = { ...values, [key(row, name)]: value };
    onready(exercise.rows.every((_, r) => exercise.vars.every((v) => (values[key(r, v)] ?? '').trim() !== '')));
  }

  export function check(): CheckResult {
    return {
      correct: exercise.rows.every((_, r) => exercise.vars.every((v) => normal(values[key(r, v)] ?? '') === expected(r, v))),
    };
  }
</script>

<div class="prompt"><Blocks blocks={exercise.prompt} /></div>

<pre class="code listing">{#each lines as text, i}<span class="row" class:hot={i + 1 === exercise.line}><span class="ln">{i + 1}</span>{text}
</span>{/each}</pre>
<p class="how">The line with the colored background is the line the table watches.</p>

<div class="scroll">
  <table>
    <thead>
      <tr><th></th>{#each exercise.vars as name}<th><code>{name}</code></th>{/each}</tr>
    </thead>
    <tbody>
      {#each exercise.rows as row, r}
        <tr>
          <th class="side">{row.final ? 'After the loop' : `Round ${r + 1}`}</th>
          {#each exercise.vars as name}
            <td>
              <input
                value={values[key(r, name)] ?? ''}
                class:wrong={cellWrong(r, name)}
                disabled={locked}
                autocomplete="off"
                spellcheck="false"
                aria-label="{name}, {row.final ? 'after the loop' : `round ${r + 1}`}"
                oninput={(e) => update(r, name, e.currentTarget.value)}
              />
              {#if cellWrong(r, name)}<div class="fix">{expected(r, name)}</div>{/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .listing { padding: 8px 0; }
  .row { display: block; padding: 0 14px 0 0; }
  .row.hot { background: var(--gold-tint); }
  .ln { display: inline-block; width: 36px; text-align: right; padding-right: 12px; color: var(--muted); user-select: none; }
  .how { color: var(--muted); font-size: 14px; margin: 6px 0 12px; }
  .scroll { overflow-x: auto; }
  table { border-collapse: collapse; }
  th, td { border: 2px solid var(--line); padding: 6px 10px; text-align: left; }
  thead th { background: var(--gold-tint); }
  .side { background: var(--mint-tint); white-space: nowrap; font-size: 14px; }
  input {
    width: 100px; font-family: var(--mono); font-size: 14px; border: 2px solid var(--line);
    border-radius: 8px; padding: 6px 8px; background: var(--card); color: var(--ink);
  }
  input:focus { outline: none; border-color: var(--mint); }
  input.wrong { border-color: var(--coral); background: var(--coral-tint); }
  .fix { font-family: var(--mono); font-size: 12px; color: var(--leaf-ink); margin-top: 2px; }
</style>
