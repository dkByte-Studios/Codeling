<script lang="ts">
  import { untrack } from 'svelte';
  import type { Exercise, Lesson } from '../lib/content/types';
  import { progress } from '../lib/progress.svelte';
  import { getPython } from '../lib/python/shared';
  import Blocks from './Blocks.svelte';
  import Mascot from './Mascot.svelte';
  import type { CheckResult, ExerciseApi } from './exercises/api';
  import ChoiceExercise from './exercises/ChoiceExercise.svelte';
  import MatchExercise from './exercises/MatchExercise.svelte';
  import OrderExercise from './exercises/OrderExercise.svelte';
  import TraceExercise from './exercises/TraceExercise.svelte';
  import TypedExercise from './exercises/TypedExercise.svelte';

  let { lesson, onexit }: { lesson: Lesson; onexit: () => void } = $props();

  // App.svelte makes a new Lesson for each lesson id, so the exercises are read once.
  const exercises: Exercise[] = untrack(() => lesson).exercises;
  const total = exercises.length;
  const XP_PER_CORRECT = 10;

  // step 0 is the reading, steps 1..total are the exercises, and total + 1 is the finish screen.
  let step = $state(0);
  let ready = $state(false);
  let locked = $state(false);
  let checking = $state(false);
  let showHint = $state(false);
  let verdict = $state<CheckResult | null>(null);
  let problem = $state('');
  let api = $state<ExerciseApi | undefined>();
  let correct = $state(0);
  let finished = false;

  const current = $derived(step >= 1 && step <= total ? exercises[step - 1] : null);
  const xp = $derived(correct * XP_PER_CORRECT);
  const accuracy = $derived(total ? Math.round((correct / total) * 100) : 100);

  // Typed exercises need Python. Start it while the learner reads.
  if (exercises.some((e) => e.type === 'typed')) void getPython();

  function go(to: number) {
    step = to;
    ready = false;
    locked = false;
    showHint = false;
    verdict = null;
    problem = '';
    api = undefined;
    if (to === total + 1 && !finished) {
      finished = true;
      progress.complete(lesson.id, accuracy, xp);
    }
    window.scrollTo({ top: 0 });
  }

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
    if (verdict.correct) correct += 1;
  }

  function primary() {
    if (step === 0) go(1);
    else if (step === total + 1) onexit();
    else if (locked) go(step + 1);
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
    <button type="button" class="close" aria-label="Leave the lesson" onclick={onexit}>×</button>
    <div class="track" role="progressbar" aria-valuemin="0" aria-valuemax={total + 1} aria-valuenow={step}>
      <div class="fill" style:width="{(step / (total + 1)) * 100}%"></div>
    </div>
    <span class="xp">{xp} XP</span>
  </header>

  <main>
    {#if step === 0}
      <p class="kicker">Lesson {lesson.id}</p>
      <h1>{lesson.title}</h1>
      <div class="read"><Blocks blocks={lesson.teach} /></div>
    {:else if current}
      {#key step}
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
      {#if current.hint && !locked}
        <div class="hintbox">
          {#if showHint}
            <span class="hint-text">Hint: {@html current.hint}</span>
          {:else}
            <button type="button" class="linklike" onclick={() => (showHint = true)}>Need a hint?</button>
          {/if}
        </div>
      {/if}
    {:else}
      <div class="done">
        <Mascot mood={accuracy >= 70 ? 'cheer' : 'happy'} size={160} />
        <h1>Lesson complete</h1>
        <p class="recap">{@html lesson.recap}</p>
        <div class="stats">
          <div><strong>{xp}</strong><span>XP earned</span></div>
          <div><strong>{accuracy}%</strong><span>right the first time</span></div>
        </div>
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
            {#if current?.why}<span>{@html current.why}</span>{/if}
            {#if verdict.detail}<pre class="detail">{verdict.detail}</pre>{/if}
          </div>
        </div>
      {/if}
      <button
        type="button"
        class="btn {locked ? (verdict?.correct ? 'leaf' : 'coral') : 'primary'} big"
        disabled={step >= 1 && step <= total && !locked && (!ready || checking)}
        onclick={primary}
      >
        {#if step === 0}Start{:else if step === total + 1}Finish{:else if locked}Continue{:else if checking}Checking...{:else}Check{/if}
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
  .xp { font-weight: 800; color: var(--muted); font-size: 14px; min-width: 56px; text-align: right; }
  main { flex: 1; max-width: 760px; width: 100%; margin: 0 auto; padding: 8px 16px 40px; }
  h1 { font-size: 28px; margin: 0 0 8px; }
  .kicker { margin: 0; color: var(--muted); font-weight: 800; font-size: 14px; }
  .read { font-size: 17px; }
  .hintbox { margin-top: 20px; }
  .linklike { background: none; border: none; color: var(--sky-edge); font-weight: 800; cursor: pointer; padding: 0; }
  .hint-text { background: var(--gold-tint); border-radius: 12px; padding: 8px 12px; display: inline-block; }
  .done { text-align: center; padding-top: 24px; display: flex; flex-direction: column; align-items: center; }
  .recap { max-width: 520px; }
  .stats { display: flex; gap: 16px; margin-top: 8px; }
  .stats div { background: var(--card); border: 2px solid var(--line); border-radius: 14px; padding: 10px 18px; display: grid; }
  .stats strong { font-size: 24px; }
  .stats span { color: var(--muted); font-size: 13px; }
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
