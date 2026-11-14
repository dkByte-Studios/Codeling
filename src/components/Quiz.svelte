<script module lang="ts">
  // Remembered while the page is open: the questions of the last attempt and the fails in a row, per unit.
  const lastDrawn = new Map<number, Set<string>>();
  const failsInARow = new Map<number, number>();
</script>

<script lang="ts">
  import { untrack } from 'svelte';
  import { courseIndex } from '../lib/content/load';
  import type { Exercise, Unit } from '../lib/content/types';
  import { progress } from '../lib/progress.svelte';
  import { PASS_PERCENT, QUIZ_SIZE, drawQuestions, isPass, lessonsToReview, percent } from '../lib/quiz';
  import { getPython } from '../lib/python/shared';
  import ExerciseRunner from './ExerciseRunner.svelte';
  import Mascot from './Mascot.svelte';

  let { unit, onexit, onreview }: { unit: Unit; onexit: () => void; onreview: (lessonId: string) => void } = $props();

  const data = untrack(() => unit);
  const lessonTitle = (id: string) => courseIndex.units.flatMap((u) => u.lessons).find((l) => l.id === id)?.title ?? '';

  let phase = $state<'intro' | 'run' | 'result'>('intro');
  let questions = $state.raw<Exercise[]>([]);
  let correct = $state(0);
  let xpEarned = $state(0);
  let firstPass = $state(false);

  const total = $derived(questions.length);
  const score = $derived(percent(correct, total));
  const passed = $derived(isPass(correct, total));
  const skipping = !progress.allLessonsDone(data.unit);
  let fails = $state(0);
  let reviewIds = $state<string[]>([]);

  function begin() {
    questions = drawQuestions(data.quiz, lastDrawn.get(data.unit) ?? new Set());
    lastDrawn.set(data.unit, new Set(questions.map((q) => q.id ?? '')));
    // Typed questions are rare in quizzes, but make sure Python is ready if one comes up.
    if (questions.some((q) => q.type === 'typed')) void getPython();
    phase = 'run';
    window.scrollTo({ top: 0 });
  }

  function finished(results: boolean[]) {
    correct = results.filter(Boolean).length;
    firstPass = !progress.isQuizPassed(data.unit);
    xpEarned = progress.recordQuiz(data.unit, correct, results.length);
    reviewIds = lessonsToReview(questions.filter((_, i) => !results[i]));
    fails = isPass(correct, results.length) ? 0 : (failsInARow.get(data.unit) ?? 0) + 1;
    failsInARow.set(data.unit, fails);
    phase = 'result';
    window.scrollTo({ top: 0 });
  }

  function onkey(event: KeyboardEvent) {
    if (phase === 'run' || event.key !== 'Enter' || event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) return;
    event.preventDefault();
    if (phase === 'intro' || !passed) begin();
    else onexit();
  }
</script>

<svelte:window onkeydown={onkey} />

{#if phase === 'run'}
  <ExerciseRunner exercises={questions} showHints={false} {onexit} onfinish={finished} />
{:else}
  <div class="screen">
    <header>
      <button type="button" class="close" aria-label="Leave the quiz" onclick={onexit}>×</button>
    </header>
    <main>
      {#if phase === 'intro'}
        <div class="center">
          <Mascot mood="determined" size={150} />
          <p class="kicker">Unit {data.unit}</p>
          <h1>{data.title}: quiz</h1>
          <p>{QUIZ_SIZE} questions from this unit. Score {PASS_PERCENT}% or more to open the next unit. There are no hints, and you can try again as many times as you like.</p>
          {#if skipping}
            <p class="note">You have not finished every lesson in this unit. If you pass the quiz, you skip ahead.</p>
          {/if}
        </div>
      {:else if passed}
        <div class="center">
          <Mascot mood="starry" size={160} />
          <h1>Quiz passed</h1>
          <div class="stats">
            <div><strong>{score}%</strong><span>{correct} of {total} right</span></div>
            <div><strong>{xpEarned}</strong><span>XP earned{firstPass ? ', with the first-pass bonus' : ''}</span></div>
          </div>
          <p>{data.unit < courseIndex.units.length ? 'The next unit is open.' : 'You have finished the last unit quiz.'}</p>
        </div>
      {:else}
        <div class="center">
          <Mascot mood="thinking" size={150} />
          <h1>Not yet</h1>
          <div class="stats">
            <div><strong>{score}%</strong><span>{correct} of {total} right</span></div>
            <div><strong>{PASS_PERCENT}%</strong><span>needed to pass</span></div>
          </div>
          {#if reviewIds.length}
            <p class="review-title">These lessons cover the questions you missed:</p>
            <div class="review">
              {#each reviewIds as id}
                <button type="button" class="btn" onclick={() => onreview(id)}>Lesson {id}: {lessonTitle(id)}</button>
              {/each}
            </div>
          {/if}
          {#if fails >= 2}
            <p class="note">Two tries in a row. Reading the lessons above first will help. Then come back and try again.</p>
          {/if}
        </div>
      {/if}
    </main>
    <footer>
      <div class="inner">
        {#if phase === 'result' && !passed}
          <button type="button" class="btn" onclick={onexit}>Back to the path</button>
        {/if}
        <button type="button" class="btn primary big" onclick={() => (phase === 'result' && passed ? onexit() : begin())}>
          {phase === 'intro' ? 'Start the quiz' : passed ? 'Finish' : 'Try again'}
        </button>
      </div>
    </footer>
  </div>
{/if}

<style>
  .screen { min-height: 100vh; display: flex; flex-direction: column; }
  header { max-width: 760px; width: 100%; margin: 0 auto; padding: 16px; }
  .close { background: none; border: none; font-size: 32px; line-height: 1; color: var(--muted); cursor: pointer; padding: 0 6px; }
  main { flex: 1; max-width: 760px; width: 100%; margin: 0 auto; padding: 0 16px 40px; }
  .center { display: flex; flex-direction: column; align-items: center; text-align: center; }
  h1 { font-size: 28px; margin: 4px 0 8px; }
  .kicker { margin: 8px 0 0; color: var(--muted); font-weight: 800; font-size: 14px; }
  .note { background: var(--gold-tint); border-radius: 12px; padding: 8px 14px; max-width: 480px; }
  .stats { display: flex; gap: 16px; margin: 8px 0 12px; }
  .stats div { background: var(--card); border: 2px solid var(--line); border-radius: 14px; padding: 10px 18px; display: grid; }
  .stats strong { font-size: 24px; }
  .stats span { color: var(--muted); font-size: 13px; }
  .review-title { font-weight: 800; margin: 4px 0; }
  .review { display: grid; gap: 8px; width: min(100%, 420px); }
  .review .btn { text-align: left; }
  footer { position: sticky; bottom: 0; background: var(--card); border-top: 2px solid var(--line); }
  .inner { max-width: 760px; margin: 0 auto; padding: 14px 16px; display: flex; justify-content: flex-end; gap: 12px; }
  .big { min-width: 170px; }
</style>
