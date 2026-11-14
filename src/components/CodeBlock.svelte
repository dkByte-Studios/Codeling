<script lang="ts">
  import type { Block } from '../lib/content/types';

  type CodeBlockData = Extract<Block, { t: 'code' }>;
  let { block, showOutput = true }: { block: CodeBlockData; showOutput?: boolean } = $props();
</script>

<div class="wrap">
  <pre class="code">{block.code}</pre>
  {#if block.inputs?.length}
    <p class="note">The program is given these answers: {block.inputs.join(', ')}</p>
  {/if}
  {#if block.errorType}
    <p class="note">Python stops this program with a {block.errorType}.</p>
  {/if}
  {#if block.invalid}
    <p class="note">This is not valid JSON.</p>
  {/if}
  {#if showOutput && block.output !== undefined}
    <div class="out-label">Output</div>
    <pre class="code out">{block.output.trim() === '' ? '(nothing is shown)' : block.output}</pre>
  {/if}
</div>

<style>
  .wrap { margin: 10px 0; }
  .note { margin: 4px 0 0; color: var(--muted); font-size: 14px; }
  .out-label { margin: 10px 0 4px; font-weight: 800; font-size: 13px; color: var(--muted); }
  .out { background: var(--mint-tint); border-color: var(--mint); }
</style>
