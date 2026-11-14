<script lang="ts">
  import { onMount } from 'svelte';
  import { PythonRunner } from './lib/python/runner';
  import type { RunResult } from './lib/python/protocol';
  import { samples } from './lib/python/samples';

  const runner = new PythonRunner(import.meta.env.BASE_URL);

  let status = $state<'loading' | 'ready' | 'failed'>('loading');
  let loadMs = $state<number | null>(null);
  let code = $state(samples[0].code);
  let note = $state(samples[0].note);
  let keepFiles = $state(false);
  let timeLimitSeconds = $state(5);
  let running = $state(false);
  let result = $state<RunResult | null>(null);
  let answers = $state<string[]>([]);
  let typed = $state('');
  let restarts = $state(0);

  runner.onStatus = (s) => {
    status = s;
    loadMs = runner.loadMs;
    restarts = runner.restarts;
  };

  async function go(extraAnswer?: string) {
    if (extraAnswer === undefined) answers = [];
    else answers = [...answers, extraAnswer];
    running = true;
    result = await runner.run({
      code,
      inputs: answers,
      keepFiles,
      timeLimitMs: timeLimitSeconds * 1000,
    });
    running = false;
    restarts = runner.restarts;
    typed = '';
  }

  function submitAnswer(event: SubmitEvent) {
    event.preventDefault();
    void go(typed);
  }

  function choose(index: number) {
    code = samples[index].code;
    note = samples[index].note;
    result = null;
    answers = [];
  }

  // Lets tests drive the runner from the browser console.
  onMount(() => {
    (window as unknown as { __spike: unknown }).__spike = { runner };
  });
</script>

<main>
  <header>
    <h1>Codeling: Python test bench</h1>
    <p class="chips">
      <span class="chip {status}">
        {#if status === 'loading'}Starting Python...{:else if status === 'ready'}Python ready{#if loadMs !== null} in {loadMs} ms{/if}{:else}Python failed to start{/if}
      </span>
      {#if result}<span class="chip">Last run: {result.ms} ms</span>{/if}
      {#if restarts > 0}<span class="chip">Restarts: {restarts}</span>{/if}
    </p>
  </header>

  <div class="samples">
    {#each samples as sample, i}
      <button type="button" class="ghost" onclick={() => choose(i)}>{sample.name}</button>
    {/each}
  </div>
  <p class="note">{note}</p>

  <div class="bench">
    <section>
      <label for="code">Program</label>
      <textarea id="code" bind:value={code} spellcheck="false" rows="16"></textarea>
      <div class="controls">
        <button type="button" class="go" disabled={status !== 'ready' || running} onclick={() => go()}>Run</button>
        <button type="button" class="stop" disabled={!running} onclick={() => runner.stop()}>Stop</button>
        <label class="inline"><input type="checkbox" bind:checked={keepFiles} /> Keep files</label>
        <label class="inline">Time limit <input type="number" min="1" max="30" bind:value={timeLimitSeconds} /> s</label>
      </div>
    </section>

    <section>
      <label for="out">Output</label>
      <pre id="out" class="out">{result?.transcript ?? ''}</pre>
      {#if result?.status === 'needInput'}
        <form onsubmit={submitAnswer} class="answer">
          <input bind:value={typed} placeholder="Type your answer and press Enter" autocomplete="off" />
          <button type="submit" class="go">Enter</button>
        </form>
      {/if}
      {#if result?.status === 'error' && result.error}
        <pre class="error">{result.error.text}</pre>
      {:else if result?.status === 'timeout'}
        <p class="error">Stopped: your program ran for more than {timeLimitSeconds} seconds. Is there an endless loop?</p>
      {:else if result?.status === 'stopped'}
        <p class="error">Stopped.</p>
      {:else if result?.status === 'done'}
        <p class="ok">The program finished.</p>
      {/if}
    </section>
  </div>
</main>

<style>
  main { max-width: 1100px; margin: 0 auto; padding: 24px 16px 48px; }
  h1 { font-size: 24px; margin: 0 0 8px; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 16px; }
  .chip { background: var(--card); border: 2px solid var(--line); border-radius: 999px; padding: 4px 12px; font-weight: 700; font-size: 13px; }
  .chip.ready { background: var(--leaf-tint); border-color: var(--leaf); color: var(--leaf-ink); }
  .chip.failed { background: var(--coral-tint); border-color: var(--coral); }
  .samples { display: flex; flex-wrap: wrap; gap: 8px; }
  .note { color: var(--muted); margin: 8px 0 16px; }
  .bench { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; }
  label { font-weight: 800; display: block; margin-bottom: 4px; }
  textarea, .out { width: 100%; box-sizing: border-box; border: 2px solid var(--line); border-radius: 14px; background: var(--card); color: var(--ink); font-family: var(--mono); font-size: 14px; padding: 12px; }
  textarea { resize: vertical; min-height: 280px; }
  .out { margin: 0; min-height: 200px; white-space: pre-wrap; }
  .error { background: var(--coral-tint); border: 2px solid var(--coral); border-radius: 14px; padding: 12px; font-family: var(--mono); white-space: pre-wrap; color: var(--ink); }
  p.error { font-family: inherit; }
  .ok { color: var(--leaf-ink); font-weight: 700; }
  .controls { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-top: 12px; }
  .inline { display: inline-flex; gap: 6px; align-items: center; font-weight: 700; margin: 0; }
  .inline input[type='number'] { width: 56px; }
  .answer { display: flex; gap: 8px; margin-top: 8px; }
  .answer input { flex: 1; }
  button { font: inherit; font-weight: 800; border-radius: 14px; border: 2px solid var(--line); border-bottom-width: 5px; padding: 8px 18px; background: var(--card); color: var(--ink); cursor: pointer; }
  button:active:not(:disabled) { transform: translateY(2px); border-bottom-width: 3px; }
  button:disabled { opacity: 0.5; cursor: not-allowed; }
  .go { background: var(--mint); border-color: var(--mint-edge); }
  .stop { background: var(--coral); border-color: var(--coral-edge); color: #fff; }
  input:not([type='checkbox']) { font: inherit; border: 2px solid var(--line); border-radius: 12px; padding: 8px 12px; background: var(--card); color: var(--ink); }
</style>
