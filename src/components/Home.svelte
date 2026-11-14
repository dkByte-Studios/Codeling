<script lang="ts">
  import { courseIndex } from '../lib/content/load';
  import { progress } from '../lib/progress.svelte';
  import Mascot from './Mascot.svelte';

  let { onstart }: { onstart: (lessonId: string) => void } = $props();

  // Each unit gets its own color, cycling through the palette.
  const colors = [
    { bg: 'var(--mint)', edge: 'var(--mint-edge)' },
    { bg: 'var(--gold)', edge: 'var(--gold-edge)' },
    { bg: 'var(--coral)', edge: 'var(--coral-edge)' },
    { bg: 'var(--sky)', edge: 'var(--sky-edge)' },
    { bg: 'var(--leaf)', edge: 'var(--leaf-edge)' },
    { bg: 'var(--pink)', edge: 'var(--pink-edge)' },
  ];
  // The path winds left and right.
  const sway = [0, 36, 64, 36, 0, -36, -64, -36];
</script>

<div class="page">
  <header>
    <div class="brand"><Mascot mood="happy" size={44} /><span>Codeling</span></div>
    <div class="chips">
      <span class="chip" title="Experience points">{progress.xp} XP</span>
    </div>
  </header>

  <main>
    <h1>Python</h1>
    {#each courseIndex.units as unit, u}
      {@const color = colors[u % colors.length]}
      <section>
        <div class="banner" style:background={color.bg} style:border-bottom-color={color.edge}>
          <div>
            <div class="small">Unit {unit.unit}</div>
            <div class="title">{unit.title}</div>
          </div>
        </div>
        <div class="path">
          {#each unit.lessons as lesson, i}
            {@const done = progress.isDone(lesson.id)}
            {@const open = progress.isUnlocked(lesson.id)}
            {@const here = progress.current === lesson.id}
            <div class="slot" style:margin-left="{sway[i % sway.length]}px">
              {#if here}<span class="start">Start</span>{/if}
              <button
                type="button"
                class="node"
                class:done
                class:here
                disabled={!open}
                aria-label="Lesson {lesson.id}: {lesson.title}{done ? ', done' : open ? '' : ', locked'}"
                style:--bg={done ? color.bg : here ? 'var(--gold)' : 'var(--lock)'}
                style:--edge={done ? color.edge : here ? 'var(--gold-edge)' : 'var(--lock-edge)'}
                onclick={() => onstart(lesson.id)}
              >
                {#if done}✓{:else if open}{lesson.id.split('.')[1]}{:else}<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>{/if}
              </button>
              <span class="name">{lesson.title}</span>
            </div>
          {/each}
        </div>
      </section>
    {/each}
    <p class="foot"><a href="#bench">Python test bench</a></p>
  </main>
</div>

<style>
  .page { max-width: 720px; margin: 0 auto; padding: 0 16px 48px; }
  header { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; }
  .brand { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 22px; color: var(--mint-edge); }
  .chip { background: var(--card); border: 2px solid var(--line); border-radius: 999px; padding: 4px 14px; font-weight: 800; }
  h1 { margin: 8px 0 16px; font-size: 30px; }
  .banner { border-radius: 16px; border-bottom: 6px solid; padding: 12px 18px; margin: 28px 0 18px; }
  .small { font-weight: 700; font-size: 13px; }
  .title { font-weight: 800; font-size: 19px; }
  .path { display: flex; flex-direction: column; align-items: center; gap: 18px; padding: 8px 0 4px; }
  .slot { position: relative; display: flex; flex-direction: column; align-items: center; gap: 4px; width: 210px; }
  .node {
    width: 64px; height: 64px; border-radius: 50%; font-size: 24px; font-weight: 800; color: var(--ink);
    background: var(--bg); border: none; border-bottom: 7px solid var(--edge); cursor: pointer;
  }
  .node:disabled { cursor: not-allowed; color: #9a937d; }
  .node:active:not(:disabled) { transform: translateY(3px); border-bottom-width: 4px; }
  .node.here { outline: 5px solid var(--gold-tint); width: 72px; height: 72px; }
  .name { font-size: 13px; font-weight: 700; color: var(--muted); text-align: center; }
  .start {
    position: absolute; top: -26px; background: var(--card); border: 2px solid var(--line);
    border-radius: 10px; padding: 0 10px; font-weight: 800; font-size: 12px; color: var(--mint-edge);
  }
  .foot { text-align: center; margin-top: 40px; font-size: 14px; }
  .foot a { color: var(--muted); }
</style>
