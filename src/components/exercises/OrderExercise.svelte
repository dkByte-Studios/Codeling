<script lang="ts">
  import { untrack } from 'svelte';
  import type { OrderExercise } from '../../lib/content/types';
  import Blocks from '../Blocks.svelte';
  import type { CheckResult } from './api';

  let { exercise, locked, onready }: { exercise: OrderExercise; locked: boolean; onready: (ready: boolean) => void } = $props();

  const pieces = untrack(() => exercise).pieces;
  const looksLikeCode = pieces.some((p) => /^\s|[=()\[\]:"#]/.test(p));

  // The pieces start in a random order, and not already in the right one.
  function shuffled(): number[] {
    const list = pieces.map((_, i) => i);
    for (let attempt = 0; attempt < 10; attempt++) {
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
      if (list.some((v, i) => pieces[v] !== pieces[i])) break;
    }
    return list;
  }

  let bank = $state(shuffled());
  let placed = $state<number[]>([]);

  function place(index: number) {
    if (locked) return;
    bank = bank.filter((i) => i !== index);
    placed = [...placed, index];
    onready(bank.length === 0);
  }

  function unplace(index: number) {
    if (locked) return;
    placed = placed.filter((i) => i !== index);
    bank = [...bank, index];
    onready(false);
  }

  export function check(): CheckResult {
    return { correct: placed.length === pieces.length && placed.every((p, i) => pieces[p] === pieces[i]) };
  }
</script>

<div class="prompt"><Blocks blocks={exercise.prompt} /></div>

<div class="label">Your order</div>
<div class="tray answer" class:empty={placed.length === 0}>
  {#each placed as index, i (index)}
    <button type="button" class="piece placed" class:code={looksLikeCode} disabled={locked} onclick={() => unplace(index)}>
      <span class="n">{i + 1}</span><span class="t">{pieces[index]}</span>
    </button>
  {:else}
    <span class="hint">Tap the pieces below, in order.</span>
  {/each}
</div>

<div class="label">Pieces</div>
<div class="tray">
  {#each bank as index (index)}
    <button type="button" class="piece" class:code={looksLikeCode} disabled={locked} onclick={() => place(index)}>
      <span class="t">{pieces[index]}</span>
    </button>
  {/each}
</div>

{#if locked && !check().correct}
  <div class="label">The right order</div>
  <ol class="solution">
    {#each pieces as piece}<li class:code={looksLikeCode}>{piece}</li>{/each}
  </ol>
{/if}

<style>
  .label { margin: 16px 0 6px; font-weight: 800; font-size: 13px; color: var(--muted); }
  .tray { display: flex; flex-direction: column; gap: 8px; }
  .answer { min-height: 60px; border: 2px dashed var(--line); border-radius: 14px; padding: 8px; }
  .hint { color: var(--muted); padding: 8px; }
  .piece {
    display: flex; align-items: center; gap: 10px; text-align: left; white-space: pre;
    background: var(--card); color: var(--ink); border: 2px solid var(--line); border-bottom-width: 5px;
    border-radius: 12px; padding: 8px 12px; cursor: pointer; font-weight: 700; font-size: 16px;
  }
  .piece.code { font-family: var(--mono); font-size: 14px; font-weight: 500; }
  .piece:active:not(:disabled) { transform: translateY(2px); border-bottom-width: 3px; }
  .piece.placed { border-color: var(--mint); background: var(--mint-tint); }
  .n { flex: none; width: 22px; height: 22px; border-radius: 50%; background: var(--mint); color: var(--ink); display: flex; align-items: center; justify-content: center; font-size: 12px; font-family: var(--sans); font-weight: 800; }
  .solution { margin: 0; padding-left: 24px; }
  .solution li { white-space: pre; margin: 4px 0; }
  .solution li.code { font-family: var(--mono); font-size: 14px; }
</style>
