<script lang="ts">
  import { untrack } from 'svelte';
  import type { Lesson } from '../lib/content/types';
  import { progress } from '../lib/progress.svelte';
  import { getPython } from '../lib/python/shared';
  import Blocks from './Blocks.svelte';
  import ExerciseRunner from './ExerciseRunner.svelte';
  import Mascot from './Mascot.svelte';

  let { lesson, onexit }: { lesson: Lesson; onexit: () => void } = $props();

  // App.svelte makes a new Lesson for each lesson id, so the lesson is read once.
  const data = untrack(() => lesson);
  const XP_PER_CORRECT = 10;

  let phase = $state<'read' | 'practice' | 'done'>('read');
  let correct = $state(0);

  const total = data.exercises.length;
  const xp = $derived(correct * XP_PER_CORRECT);
  const accuracy = $derived(total ? Math.round((correct / total) * 100) : 100);

  // Typed exercises need Python. Start it while the learner reads.
  if (data.exercises.some((e) => e.type === 'typed')) void getPython();

  function finished(results: boolean[]) {
    correct = results.filter(Boolean).length;
    progress.complete(data.id, accuracy, xp);
    phase = 'done';
    window.scrollTo({ top: 0 });
  }

  function onkey(event: KeyboardEvent) {
    if (phase === 'practice' || event.key !== 'Enter' || event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) return;
    event.preventDefault();
    if (phase === 'read') phase = 'practice';
    else onexit();
  }
</script>

<svelte:window onkeydown={onkey} />

{#if phase === 'practice'}
  <ExerciseRunner exercises={data.exercises} xpPerCorrect={XP_PER_CORRECT} {onexit} onfinish={finished} />
{:else}
  <div class="screen">
    <header>
      <button type="button" class="close" aria-label="Leave the lesson" onclick={onexit}>×</button>
      <div class="track"><div class="fill" style:width={phase === 'done' ? '100%' : '0%'}></div></div>
      <span class="xp">{phase === 'done' ? xp : 0} XP</span>
    </header>

    <main>
      {#if phase === 'read'}
        <p class="kicker">Lesson {data.id}</p>
        <h1>{data.title}</h1>
        <div class="read"><Blocks blocks={data.teach} /></div>
      {:else}
        <div class="done">
          <Mascot mood={accuracy >= 70 ? 'cheer' : 'happy'} size={160} />
          <h1>Lesson complete</h1>
          <p class="recap">{@html data.recap}</p>
          <div class="stats">
            <div><strong>{xp}</strong><span>XP earned</span></div>
            <div><strong>{accuracy}%</strong><span>right the first time</span></div>
          </div>
        </div>
      {/if}
    </main>

    <footer>
      <div class="inner">
        <button type="button" class="btn primary big" onclick={() => (phase === 'read' ? (phase = 'practice') : onexit())}>
          {phase === 'read' ? 'Start' : 'Finish'}
        </button>
      </div>
    </footer>
  </div>
{/if}

<style>
  .screen { min-height: 100vh; display: flex; flex-direction: column; }
  header { display: flex; align-items: center; gap: 14px; max-width: 760px; width: 100%; margin: 0 auto; padding: 16px; }
  .close { background: none; border: none; font-size: 32px; line-height: 1; color: var(--muted); cursor: pointer; padding: 0 6px; }
  .track { flex: 1; height: 14px; background: var(--line); border-radius: 8px; overflow: hidden; }
  .fill { height: 100%; background: var(--mint); border-radius: 8px; transition: width 0.3s; }
  .xp { font-weight: 800; color: var(--muted); font-size: 14px; min-width: 64px; text-align: right; }
  main { flex: 1; max-width: 760px; width: 100%; margin: 0 auto; padding: 8px 16px 40px; }
  h1 { font-size: 28px; margin: 0 0 8px; }
  .kicker { margin: 0; color: var(--muted); font-weight: 800; font-size: 14px; }
  .read { font-size: 17px; }
  .done { text-align: center; padding-top: 24px; display: flex; flex-direction: column; align-items: center; }
  .recap { max-width: 520px; }
  .stats { display: flex; gap: 16px; margin-top: 8px; }
  .stats div { background: var(--card); border: 2px solid var(--line); border-radius: 14px; padding: 10px 18px; display: grid; }
  .stats strong { font-size: 24px; }
  .stats span { color: var(--muted); font-size: 13px; }
  footer { position: sticky; bottom: 0; background: var(--card); border-top: 2px solid var(--line); }
  .inner { max-width: 760px; margin: 0 auto; padding: 14px 16px; display: flex; justify-content: flex-end; }
  .big { min-width: 150px; }
</style>
