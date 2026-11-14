<script lang="ts">
  import { loadLesson } from './lib/content/load';
  import type { Lesson as LessonData } from './lib/content/types';
  import Home from './components/Home.svelte';
  import Lesson from './components/Lesson.svelte';
  import Spike from './Spike.svelte';

  let route = $state(location.hash);
  // Raw, not deeply reactive: the course data never changes, and plain objects can be sent to the Python worker.
  let lesson = $state.raw<LessonData | null>(null);
  let loadError = $state<string | null>(null);

  async function start(id: string) {
    loadError = null;
    try {
      lesson = (await loadLesson(id)).lesson;
    } catch (error) {
      loadError = error instanceof Error ? error.message : String(error);
    }
  }
</script>

<svelte:window onhashchange={() => (route = location.hash)} />

{#if route === '#bench'}
  <Spike />
{:else if lesson}
  {#key lesson.id}
    <Lesson {lesson} onexit={() => (lesson = null)} />
  {/key}
{:else}
  <Home onstart={start} />
  {#if loadError}<p class="error" role="alert">{loadError}</p>{/if}
{/if}

<style>
  .error { text-align: center; color: var(--coral-edge); font-weight: 700; }
</style>
