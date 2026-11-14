<script lang="ts">
  import type { Block } from '../lib/content/types';
  import CodeBlock from './CodeBlock.svelte';

  let { blocks, showOutput = true }: { blocks: Block[]; showOutput?: boolean } = $props();
</script>

{#each blocks as block}
  {#if block.t === 'p'}
    <p>{@html block.html}</p>
  {:else if block.t === 'ul'}
    <ul>{#each block.items as item}<li>{@html item}</li>{/each}</ul>
  {:else if block.t === 'ol'}
    <ol>{#each block.items as item}<li>{@html item}</li>{/each}</ol>
  {:else if block.t === 'table'}
    <div class="scroll">
      <table>
        <thead><tr>{#each block.head as cell}<th>{@html cell}</th>{/each}</tr></thead>
        <tbody>
          {#each block.rows as row}<tr>{#each row as cell}<td>{@html cell}</td>{/each}</tr>{/each}
        </tbody>
      </table>
    </div>
  {:else if block.t === 'code'}
    <CodeBlock {block} {showOutput} />
  {:else if block.t === 'file'}
    <div class="file">
      <div class="file-name">File: {block.name}</div>
      <pre class="code">{block.content}</pre>
    </div>
  {/if}
{/each}

<style>
  p { margin: 10px 0; }
  ul, ol { margin: 10px 0; padding-left: 24px; }
  li { margin: 4px 0; }
  .scroll { overflow-x: auto; margin: 10px 0; }
  table { border-collapse: collapse; min-width: 50%; }
  th, td { border: 2px solid var(--line); padding: 6px 12px; text-align: left; }
  th { background: var(--gold-tint); }
  .file { margin: 10px 0; }
  .file-name { font-weight: 800; font-size: 13px; color: var(--muted); margin-bottom: 4px; }
</style>
