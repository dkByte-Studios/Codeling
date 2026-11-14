<script lang="ts">
  import { mascotUrl, type Mood } from '../lib/mascot';

  let { mood = 'happy', size = 96 }: { mood?: Mood; size?: number } = $props();
</script>

<img src={mascotUrl(mood)} alt="" width={size} height={Math.round(size * 1.2)} />

<style>
  img { display: block; }
</style>
