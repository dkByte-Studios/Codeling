<script lang="ts">
  import { untrack } from 'svelte';
  import type { Exercise } from '../lib/content/types';
  import Mascot from './Mascot.svelte';
  import type { CheckResult, ExerciseApi } from './exercises/api';
  import ChoiceExercise from './exercises/ChoiceExercise.svelte';
  import MatchExercise from './exercises/MatchExercise.svelte';
  import OrderExercise from './exercises/OrderExercise.svelte';
  import TraceExercise from './exercises/TraceExercise.svelte';
  import TypedExercise from './exercises/TypedExercise.svelte';

  // Runs a list of exercises one at a time: check, feedback, continue. Used by lessons and by quizzes.
  let {
    exercises,
    showHints = true,
    xpPerCorrect = 0,
    onexit,
    onfinish,
  }: {
    exercises: Exercise[];
    showHints?: boolean;
    /** When above 0, the top right shows the XP earned so far. Otherwise it shows the question number. */
    xpPerCorrect?: number;
    onexit: () => void;
    /** Called after the last Continue, with whether each exercise was right the first time. */
    onfinish: (results: boolean[]) => void;
  } = $props();

  // The parent makes a new runner for each list, so the list is read once.
  const list = untrack(() => exercises);
  const total = list.length;

  let index = $state(0);
  let ready = $state(false);
  let locked = $state(false);
  let checking = $state(false);
  let showHint = $state(false);
  let verdict = $state<CheckResult | null>(null);
  let problem = $state('');
  let api = $state<ExerciseApi | undefined>();
  let results = $state<boolean[]>([]);

  const current = $derived(list[index]);
  const right = $derived(results.filter(Boolean).length);

  async function check() {
    if (!api || !ready || locked || checking) return;
    checking = true;
    try {
      verdict = await api.check();
    } catch (error) {
      // Something broke while checking (for example Python stopped). Let the learner try again.
      checking = false;
      problem = `Checking did not work: ${error instanceof Error ? error.message : String(error)}. Try again.`;
      return;
    }
    problem = '';
    checking = false;
    locked = true;
    results[index] = verdict.correct;
  }

  function next() {
    if (index + 1 >= total) {
      onfinish([...results]);
      return;
    }
    index += 1;
    ready = false;
    locked = false;
    showHint = false;
    verdict = null;
    problem = '';
    api = undefined;
    window.scrollTo({ top: 0 });
  }

  function primary() {
    if (locked) next();
    else void check();
  }

  function onkey(event: KeyboardEvent) {
    if (event.key !== 'Enter' || event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) return;
    const tag = (event.target as HTMLElement | null)?.tagName;
    if (tag === 'TEXTAREA' || tag === 'INPUT') return;
    event.preventDefault();
    primary();
  }
</script>

<svelte:window onkeydown={onkey} />

<div class="screen">
  <header>
    <button type="button" class="close" aria-label="Leave" onclick={onexit}>×</button>
    <div class="track" role="progressbar" aria-valuemin="0" aria-valuemax={total} aria-valuenow={index}>
      <div class="fill" style:width="{((index + (locked ? 1 : 0)) / total) * 100}%"></div>
    </div>
    <span class="count">{xpPerCorrect > 0 ? `${right * xpPerCorrect} XP` : `${index + 1} of ${total}`}</span>
  </header>

  <main data-exercise={current.id ?? current.number}>
    {#key index}
      {#if current.type === 'choice' || current.type === 'tf'}
        <ChoiceExercise bind:this={api} exercise={current} {locked} onready={(r) => (ready = r)} />
      {:else if current.type === 'order'}
        <OrderExercise bind:this={api} exercise={current} {locked} onready={(r) => (ready = r)} />
      {:else if current.type === 'match'}
        <MatchExercise bind:this={api} exercise={current} {locked} onready={(r) => (ready = r)} />
      {:else if current.type === 'trace'}
        <TraceExercise bind:this={api} exercise={current} {locked} onready={(r) => (ready = r)} />
      {:else if current.type === 'typed'}
        <TypedExercise bind:this={api} exercise={current} {locked} onready={(r) => (ready = r)} />
      {/if}
    {/key}
    {#if showHints && current.hint && !locked}
      <div class="hintbox">
        {#if showHint}
          <span class="hint-text">Hint: {@html current.hint}</span>
        {:else}
          <button type="button" class="linklike" onclick={() => (showHint = true)}>Need a hint?</button>
        {/if}
      </div>
    {/if}
  </main>

  <footer class:good={locked && verdict?.correct} class:bad={locked && verdict && !verdict.correct}>
    <div class="inner">
      {#if problem}<div class="feedback"><div class="words"><strong>Something went wrong</strong><span>{problem}</span></div></div>{/if}
      {#if locked && verdict}
        <div class="feedback">
          <Mascot mood={verdict.correct ? 'cheer' : 'worried'} size={56} />
          <div class="words">
            <strong>{verdict.correct ? 'Nice work' : 'Not quite'}</strong>
            {#if verdict.message}<span>{verdict.message}</span>{/if}
            {#if current.why}<span>{@html current.why}</span>{/if}
            {#if verdict.detail}<pre class="detail">{verdict.detail}</pre>{/if}
          </div>
        </div>
      {/if}
      <button
        type="button"
        class="btn {locked ? (verdict?.correct ? 'leaf' : 'coral') : 'primary'} big"
        disabled={!locked && (!ready || checking)}
        onclick={primary}
      >
        {#if locked}{index + 1 >= total ? 'Finish' : 'Continue'}{:else if checking}Checking...{:else}Check{/if}
      </button>
    </div>
  </footer>
</div>

<style>
  .screen { min-height: 100vh; display: flex; flex-direction: column; }
  header { display: flex; align-items: center; gap: 14px; max-width: 760px; width: 100%; margin: 0 auto; padding: 16px; }
  .close { background: none; border: none; font-size: 32px; line-height: 1; color: var(--muted); cursor: pointer; padding: 0 6px; }
  .track { flex: 1; height: 14px; background: var(--line); border-radius: 8px; overflow: hidden; }
  .fill { height: 100%; background: var(--mint); border-radius: 8px; transition: width 0.3s; }
  .count { font-weight: 800; color: var(--muted); font-size: 14px; min-width: 64px; text-align: right; }
  main { flex: 1; max-width: 760px; width: 100%; margin: 0 auto; padding: 8px 16px 40px; }
  .hintbox { margin-top: 20px; }
  .linklike { background: none; border: none; color: var(--sky-edge); font-weight: 800; cursor: pointer; padding: 0; }
  .hint-text { background: var(--gold-tint); border-radius: 12px; padding: 8px 12px; display: inline-block; }
  footer { position: sticky; bottom: 0; background: var(--card); border-top: 2px solid var(--line); }
  footer.good { background: var(--leaf-tint); border-top-color: var(--leaf); }
  footer.bad { background: var(--coral-tint); border-top-color: var(--coral); }
  .inner { max-width: 760px; margin: 0 auto; padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
  .feedback { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 240px; }
  .words { display: grid; gap: 2px; }
  .words strong { font-size: 18px; }
  .detail { margin: 6px 0 0; font-family: var(--mono); font-size: 12px; white-space: pre-wrap; background: #fffdf6; border-radius: 10px; padding: 8px 10px; max-height: 160px; overflow: auto; }
  .big { min-width: 150px; margin-left: auto; }
</style>
