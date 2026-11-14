<script lang="ts">
  import { untrack } from 'svelte';
  import type { MatchExercise } from '../../lib/content/types';
  import Blocks from '../Blocks.svelte';
  import type { CheckResult } from './api';

  let { exercise, locked, onready }: { exercise: MatchExercise; locked: boolean; onready: (ready: boolean) => void } = $props();

  const pairs = untrack(() => exercise).pairs;
  const colors = ['var(--mint)', 'var(--gold)', 'var(--sky)', 'var(--pink)', 'var(--leaf)', 'var(--coral)'];

  // Right-hand items are shown in a random order.
  const rightOrder = pairs.map((_, i) => i);
  for (let i = rightOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rightOrder[i], rightOrder[j]] = [rightOrder[j], rightOrder[i]];
  }

  /** left index -> right index the learner paired it with */
  let paired = $state<Record<number, number>>({});
  let active = $state<number | null>(null);

  const rightOwner = (right: number) => Object.keys(paired).map(Number).find((l) => paired[l] === right);

  function tapLeft(left: number) {
    if (locked) return;
    if (left in paired) {
      const { [left]: _gone, ...rest } = paired;
      paired = rest;
      onready(false);
    }
    active = left;
  }

  function tapRight(right: number) {
    if (locked || active === null) return;
    const owner = rightOwner(right);
    const next = { ...paired };
    if (owner !== undefined) delete next[owner];
    next[active] = right;
    paired = next;
    active = null;
    onready(Object.keys(paired).length === pairs.length);
  }

  // Two right-hand items can be the same word (int, float, int, float), so a match is right when the words agree.
  const isRight = (left: number) => left in paired && pairs[paired[left]][1] === pairs[left][1];

  export function check(): CheckResult {
    return { correct: pairs.every((_, left) => isRight(left)) };
  }
</script>

<div class="prompt"><Blocks blocks={exercise.prompt} /></div>
<p class="how">Tap an item on the left, then tap its match on the right.</p>

<div class="grid">
  <div class="col">
    {#each pairs as pair, left}
      {@const done = left in paired}
      {@const wrong = locked && !isRight(left)}
      <button
        type="button"
        class="item"
        class:active={active === left}
        class:wrong
        disabled={locked}
        style:--c={done ? colors[left % colors.length] : 'var(--line)'}
        onclick={() => tapLeft(left)}
      >{@html pair[0]}</button>
    {/each}
  </div>
  <div class="col">
    {#each rightOrder as right}
      {@const owner = rightOwner(right)}
      <button
        type="button"
        class="item"
        disabled={locked}
        style:--c={owner !== undefined ? colors[owner % colors.length] : 'var(--line)'}
        onclick={() => tapRight(right)}
      >{@html pairs[right][1]}</button>
    {/each}
  </div>
</div>

{#if locked && !check().correct}
  <div class="label">The right matches</div>
  <ul class="solution">
    {#each pairs as pair}<li>{@html pair[0]} goes with {@html pair[1]}</li>{/each}
  </ul>
{/if}

<style>
  .how { color: var(--muted); font-size: 14px; margin: 8px 0 12px; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .col { display: grid; gap: 10px; align-content: start; }
  .item {
    text-align: left; background: var(--card); color: var(--ink); font-weight: 700;
    border: 2px solid var(--c); border-bottom-width: 5px; border-radius: 12px; padding: 10px 12px; cursor: pointer; font-size: 15px;
    overflow-wrap: anywhere;
  }
  .item.active { background: var(--mint-tint); }
  .item.wrong { background: var(--coral-tint); border-color: var(--coral); }
  .item:active:not(:disabled) { transform: translateY(2px); border-bottom-width: 3px; }
  .label { margin: 16px 0 6px; font-weight: 800; font-size: 13px; color: var(--muted); }
  .solution { margin: 0; padding-left: 20px; }
</style>
