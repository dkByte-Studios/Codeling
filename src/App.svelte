<script lang="ts">
  import { loadLesson, loadUnit } from './lib/content/load';
  import type { Lesson as LessonData, Unit } from './lib/content/types';
  import Home from './components/Home.svelte';
  import Lesson from './components/Lesson.svelte';
  import Quiz from './components/Quiz.svelte';
  import Spike from './Spike.svelte';

  let route = $state(location.hash);
  // Raw, not deeply reactive: the course data never changes, and plain objects can be sent to the Python worker.
  let lesson = $state.raw<LessonData | null>(null);
  let quiz = $state.raw<Unit | null>(null);
  let loadError = $state<string | null>(null);

  async function guard(work: () => Promise<void>) {
    loadError = null;
    try {
      await work();
    } catch (error) {
      loadError = error instanceof Error ? error.message : String(error);
    }
  }

  const startLesson = (id: string) =>
    guard(async () => {
      lesson = (await loadLesson(id)).lesson;
      quiz = null;
    });

  const startQuiz = (unit: number) =>
    guard(async () => {
      quiz = await loadUnit(unit);
      lesson = null;
    });
</script>

<svelte:window onhashchange={() => (route = location.hash)} />

{#if route === '#bench'}
  <Spike />
{:else if lesson}
  {#key lesson.id}
    <Lesson {lesson} onexit={() => (lesson = null)} />
  {/key}
{:else if quiz}
  {#key quiz.unit}
    <Quiz unit={quiz} onexit={() => (quiz = null)} onreview={startLesson} />
  {/key}
{:else}
  <Home onstart={startLesson} onquiz={startQuiz} />
  {#if loadError}<p class="error" role="alert">{loadError}</p>{/if}
{/if}

<style>
  .error { text-align: center; color: var(--coral-edge); font-weight: 700; }
</style>
