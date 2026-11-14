export type Mood =
  | 'happy'
  | 'wave'
  | 'thinking'
  | 'worried'
  | 'sad'
  | 'cheer'
  | 'starry'
  | 'determined'
  | 'sleepy'
  | 'surprised'
  | 'confused'
  | 'proud';

const urls = import.meta.glob<string>('/mascot/svg/*.svg', { query: '?url', import: 'default', eager: true });

export function mascotUrl(mood: Mood): string {
  return urls[`/mascot/svg/codeling-${mood}.svg`];
}
