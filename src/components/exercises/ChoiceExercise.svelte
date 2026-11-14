<script lang="ts">
  import { untrack } from 'svelte';
  import type { ChoiceExercise, TrueFalseExercise } from '../../lib/content/types';
  import Blocks from '../Blocks.svelte';
  import type { CheckResult } from './api';

  let {
    exercise,
    locked,
    onready,
  }: { exercise: ChoiceExercise | TrueFalseExercise; locked: boolean; onready: (ready: boolean) => void } = $props();
  const first = untrack(() => exercise);

  const isTrueFalse = first.type === 'tf';
  const options: string[] = first.type === 'tf' ? ['True', 'False'] : first.options;
  const answerIndex = first.type === 'tf' ? (first.answer ? 0 : 1) : first.answer;

  // Options are shown in a random order each time, so the right answer is not always in the same place.
  const order = options.map((_, i) => i);
  if (!isTrueFalse) {
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
  }

  let selected = $state<number | null>(null);

  function pick(index: number) {
    if (locked) return;
    selected = index;
    onready(true);
  }

  function onkey(event: KeyboardEvent) {
    if (locked || event.ctrlKey || event.metaKey || event.altKey) return;
    const n = Number(event.key);
    if (n >= 1 && n <= order.length) pick(order[n - 1]);
  }

  export function check(): CheckResult {
    return { correct: selected === answerIndex };
  }
</script>

<svelte:window onkeydown={onkey} />

<div class="prompt"><Blocks blocks={exercise.prompt} showOutput={locked && (exercise.type === 'choice' ? !!exercise.revealOutput : false)} /></div>

<div class="options" role="radiogroup">
  {#each order as optionIndex, position}
    {@const state = locked ? (optionIndex === answerIndex ? 'right' : optionIndex === selected ? 'wrong' : '') : optionIndex === selected ? 'chosen' : ''}
    <button
      type="button"
      role="radio"
      aria-checked={selected === optionIndex}
      class="option {state}"
      disabled={locked}
      onclick={() => pick(optionIndex)}
    >
      <span class="num">{position + 1}</span>
      <span class="text">{@html options[optionIndex]}</span>
    </button>
  {/each}
</div>

<style>
  .options { display: grid; gap: 10px; margin-top: 16px; }
  .option {
    display: flex; align-items: center; gap: 12px; text-align: left;
    background: var(--card); color: var(--ink);
    border: 2px solid var(--line); border-bottom-width: 5px; border-radius: 14px;
    padding: 10px 14px; cursor: pointer; font-weight: 700; font-size: 16px;
  }
  .option:active:not(:disabled) { transform: translateY(2px); border-bottom-width: 3px; }
  .option.chosen { border-color: var(--mint); background: var(--mint-tint); }
  .option.right { border-color: var(--leaf); background: var(--leaf-tint); }
  .option.wrong { border-color: var(--coral); background: var(--coral-tint); }
  .option:disabled { cursor: default; opacity: 1; }
  .num {
    flex: none; width: 26px; height: 26px; border: 2px solid var(--line); border-radius: 8px;
    display: flex; align-items: center; justify-content: center; font-size: 13px; color: var(--muted);
  }
  .text { min-width: 0; overflow-wrap: anywhere; }
</style>
