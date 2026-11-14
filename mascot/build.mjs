// Builds the Codeling mascot SVGs: one shared body, 12 emotions that swap arms, eyes, brows, mouth and extras.
// Run: node mascot/build.mjs   (writes mascot/svg/*.svg and mascot/preview.html)
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const C = {
  out: '#0A7A68', body: '#00E2C0', hi: '#A8FFF0', belly: '#A6EC7A', ink: '#073D33',
  cream: '#FFF3CC', creamShade: '#F5DDA0', tan: '#B8802F', gold: '#FFD000', goldD: '#B88A00',
  vine: '#35DB5C', drop: '#A9D8F2', dropD: '#3E87B5', coral: '#FF8A7A', mouth: '#173F37', zz: '#5B7DB1',
};
const EY = 104, LX = 84, RX = 116;
const line = (w, col = C.out) => `stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
const mirror = (s) => `<g transform="translate(200,0) scale(-1,1)">${s}</g>`;

const antenna = () => `
<path d="M84 68 C80 56 91 50 88 38" fill="none" ${line(9)}/>
<path d="M84 68 C80 56 91 50 88 38" fill="none" ${line(5, C.vine)}/>
<path d="M85 58 C74 58 71 49 77 47 C82 46 83 52 79 53" fill="none" ${line(6)}/>
<path d="M85 58 C74 58 71 49 77 47 C82 46 83 52 79 53" fill="none" ${line(3, C.vine)}/>
<circle cx="88" cy="31" r="9.5" fill="${C.gold}" ${line(2.5, C.goldD)}/>
<circle cx="85" cy="28" r="3" fill="#FFF2B8"/>`;

const body = () => `
<ellipse cx="100" cy="226" rx="54" ry="6" fill="#000" opacity="0.1"/>
<path d="M62 154 C56 104 66 66 100 66 C134 66 144 104 138 154 Z" fill="${C.body}" ${line(3.5)}/>
<ellipse cx="84" cy="88" rx="11" ry="6" transform="rotate(-25 84 88)" fill="${C.hi}"/>
<circle cx="73" cy="101" r="2.5" fill="#fff" opacity="0.6"/>
<path d="M66 154 C68 126 132 126 134 154 Z" fill="${C.belly}" ${line(3)}/>`;

const shell = () => `
<path d="M44 140 L60 157 L74 138 L88 158 L100 140 L112 158 L126 138 L140 157 L156 140 C160 190 134 219 100 219 C66 219 40 190 44 140 Z" fill="${C.cream}" ${line(3.5, C.tan)}/>
<path d="M126 150 C152 170 142 206 106 214 C138 200 148 172 130 152 Z" fill="${C.creamShade}"/>
<path d="M54 160 C52 176 58 192 70 202" fill="none" stroke="#FFF8E3" stroke-width="5" stroke-linecap="round"/>`;

const arm = (d, hx, hy) =>
  `<path d="${d}" fill="none" ${line(13)}/><path d="${d}" fill="none" stroke="${C.body}" stroke-width="8.5" stroke-linecap="round"/>` +
  (hx != null ? `<circle cx="${hx}" cy="${hy}" r="7.5" fill="${C.body}" ${line(3)}/>` : '');
const A = {
  down: arm('M72 120 C56 126 52 142 58 152'),
  cheer: arm('M72 118 C52 110 42 94 45 78', 45, 76),
  upSmall: arm('M72 118 C54 114 46 102 46 92', 46, 90),
  fist: arm('M72 122 C52 124 46 110 54 100', 54, 98),
  wave: arm('M72 118 C52 110 44 98 46 84', 46, 82),
  chin: arm('M128 122 C142 138 124 148 110 138', 109, 137),
  scratch: arm('M72 118 C52 112 48 92 62 82', 63, 80),
};

const eyeOpen = (cx, dx = 0, dy = 0, r = 11, pr = 6) => `
<circle cx="${cx}" cy="${EY}" r="${r}" fill="#fff" ${line(3, C.ink)}/>
<circle cx="${cx + dx}" cy="${EY + dy}" r="${pr}" fill="${C.ink}"/>
<circle cx="${cx + dx - 2.2}" cy="${EY + dy - 2.6}" r="2.3" fill="#fff"/>
<circle cx="${cx + dx + 2.2}" cy="${EY + dy + 2.4}" r="1.2" fill="#fff"/>`;
const eyeJoy = (cx) => `<path d="M${cx - 9} ${EY + 3} Q${cx} ${EY - 9} ${cx + 9} ${EY + 3}" fill="none" ${line(4, C.ink)}/>`;
const eyeSleep = (cx) => `<path d="M${cx - 9} ${EY - 1} Q${cx} ${EY + 8} ${cx + 9} ${EY - 1}" fill="none" ${line(4, C.ink)}/>`;
const star5 = (cx, cy, R, r) => {
  const p = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5, rad = i % 2 ? r : R;
    p.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`);
  }
  return p.join(' ');
};
const eyeStar = (cx) => `
<circle cx="${cx}" cy="${EY}" r="12" fill="#fff" ${line(3, C.ink)}/>
<polygon points="${star5(cx, EY, 9, 4)}" fill="${C.gold}" ${line(1.5, C.goldD)}/>`;
const brow = (d) => `<path d="${d}" fill="none" ${line(4.2, C.ink)}/>`;
const B = {
  raised: brow('M72 86 Q84 78 94 84') + brow('M106 84 Q116 78 128 86'),
  worried: brow('M72 92 Q82 90 94 82') + brow('M106 82 Q118 90 128 92'),
  sad: brow('M70 95 Q82 90 94 79') + brow('M106 79 Q118 90 130 95'),
  determined: brow('M72 84 Q84 86 94 97') + brow('M106 97 Q116 86 128 84'),
  confused: brow('M72 82 Q84 74 94 80') + brow('M106 88 Q116 90 128 95'),
  thinking: brow('M72 80 Q84 72 94 78') + brow('M106 88 Q116 86 128 88'),
};
const cheeks = `<ellipse cx="68" cy="124" rx="7" ry="4.5" fill="${C.coral}" opacity="0.55"/><ellipse cx="132" cy="124" rx="7" ry="4.5" fill="${C.coral}" opacity="0.55"/>`;

const M = {
  open: `<path d="M88 122 Q100 142 112 122 Z" fill="${C.mouth}" ${line(3, C.ink)}/><ellipse cx="100" cy="130" rx="6" ry="3" fill="${C.coral}"/>`,
  grin: `<path d="M84 120 Q100 148 116 120 Z" fill="${C.mouth}" ${line(3, C.ink)}/><ellipse cx="100" cy="132" rx="8" ry="4" fill="${C.coral}"/>`,
  smile: `<path d="M88 124 Q100 136 112 124" fill="none" ${line(3.6, C.ink)}/>`,
  smileWide: `<path d="M84 123 Q100 140 116 123" fill="none" ${line(3.6, C.ink)}/>`,
  smirk: `<path d="M92 127 Q100 131 108 126" fill="none" ${line(3.6, C.ink)}/>`,
  flat: `<path d="M93 128 Q101 126 108 129" fill="none" ${line(3.6, C.ink)}/>`,
  wavy: `<path d="M90 130 Q94 124 98 130 Q102 136 106 130 Q108 127 111 129" fill="none" ${line(3.4, C.ink)}/>`,
  frown: `<path d="M90 133 Q100 123 110 133" fill="none" ${line(3.6, C.ink)}/>`,
  oSmall: `<ellipse cx="100" cy="129" rx="5" ry="6" fill="${C.mouth}" ${line(2.6, C.ink)}/>`,
  oBig: `<ellipse cx="100" cy="130" rx="7.5" ry="9.5" fill="${C.mouth}" ${line(3, C.ink)}/><ellipse cx="100" cy="135" rx="4.5" ry="2.6" fill="${C.coral}"/>`,
  yawn: `<ellipse cx="100" cy="126" rx="6.5" ry="8" fill="${C.mouth}" ${line(3, C.ink)}/>`,
  cry: `<path d="M88 135 Q100 119 112 135 Z" fill="${C.mouth}" ${line(3, C.ink)}/>`,
};

const spark = (cx, cy, s) =>
  `<path d="M${cx} ${cy - s} Q${cx} ${cy} ${cx + s} ${cy} Q${cx} ${cy} ${cx} ${cy + s} Q${cx} ${cy} ${cx - s} ${cy} Q${cx} ${cy} ${cx} ${cy - s} Z" fill="${C.gold}" ${line(1.3, C.goldD)}/>`;
const sparks = (list) => list.map(([x, y, s]) => spark(x, y, s)).join('');
const drop = (x, y, s = 1) =>
  `<path d="M${x} ${y} C${x + 7 * s} ${y + 12 * s} ${x + 9 * s} ${y + 19 * s} ${x} ${y + 22 * s} C${x - 9 * s} ${y + 19 * s} ${x - 7 * s} ${y + 12 * s} ${x} ${y} Z" fill="${C.drop}" ${line(2.2, C.dropD)}/>
<ellipse cx="${x - 2.2 * s}" cy="${y + 15 * s}" rx="${1.6 * s}" ry="${3 * s}" fill="#fff" opacity="0.8"/>`;
const zzz = `<path d="M150 72 h12 l-12 14 h12" fill="none" ${line(3.4, C.zz)}/><path d="M168 52 h8 l-8 9 h8" fill="none" ${line(2.8, C.zz)}/>`;
const question = `<path d="M154 56 c0 -9 16 -9 16 0 c0 7 -8 7 -8 15" fill="none" ${line(4, C.zz)}/><circle cx="162" cy="81" r="2.6" fill="${C.zz}"/>`;
const exclaim = `<path d="M170 40 v20" fill="none" ${line(5, C.goldD)}/><path d="M170 40 v20" fill="none" ${line(2.4, C.gold)}/><circle cx="170" cy="71" r="3.4" fill="${C.gold}" ${line(1.6, C.goldD)}/>`;
const thought = `<circle cx="138" cy="70" r="3" fill="#fff" ${line(1.8, C.zz)}/><circle cx="148" cy="60" r="4.5" fill="#fff" ${line(1.8, C.zz)}/><circle cx="162" cy="48" r="9" fill="#fff" ${line(1.8, C.zz)}/>`;

const L = (e, ...a) => e(LX, ...a);
const R = (e, ...a) => e(RX, ...a);
const emotions = [
  { name: 'happy', label: 'Happy', back: A.down + mirror(A.down), eyes: L(eyeOpen) + R(eyeOpen), brows: '', mouth: M.open },
  { name: 'wave', label: 'Wave and wink', back: A.down + mirror(A.wave), eyes: L(eyeOpen) + eyeJoy(RX), brows: '', mouth: M.open, extra: cheeks + sparks([[172, 66, 7], [182, 90, 5]]) },
  { name: 'thinking', label: 'Thinking', back: A.down, front: mirror(A.chin), eyes: L(eyeOpen, 3, -4) + R(eyeOpen, 3, -4), brows: B.thinking, mouth: M.flat, extra: thought },
  { name: 'worried', label: 'Worried', back: A.down + mirror(A.down), eyes: L(eyeOpen, 0, 2) + R(eyeOpen, 0, 2), brows: B.worried, mouth: M.wavy, extra: drop(146, 78) },
  { name: 'sad', label: 'Sad', back: A.down + mirror(A.down), eyes: L(eyeOpen, 0, 3, 11.5, 7) + R(eyeOpen, 0, 3, 11.5, 7), brows: B.sad, mouth: M.cry, extra: drop(74, 112, 0.7) + drop(126, 112, 0.7) },
  { name: 'cheer', label: 'Cheering', back: A.cheer + mirror(A.cheer), eyes: eyeJoy(LX) + eyeJoy(RX), brows: '', mouth: M.grin, extra: sparks([[24, 52, 9], [176, 52, 9], [40, 28, 6], [160, 28, 6], [100, 12, 7]]) },
  { name: 'starry', label: 'Starry-eyed', back: A.upSmall + mirror(A.upSmall), eyes: eyeStar(LX) + eyeStar(RX), brows: '', mouth: M.open, extra: cheeks + sparks([[34, 66, 8], [166, 66, 8], [100, 10, 6]]) },
  { name: 'determined', label: 'Determined', back: A.fist + mirror(A.fist), eyes: L(eyeOpen, 0, 1, 11, 6.5) + R(eyeOpen, 0, 1, 11, 6.5), brows: B.determined, mouth: M.smirk },
  { name: 'sleepy', label: 'Sleepy', back: A.down + mirror(A.down), eyes: eyeSleep(LX) + eyeSleep(RX), brows: '', mouth: M.yawn, extra: zzz },
  { name: 'surprised', label: 'Surprised', back: A.upSmall + mirror(A.upSmall), eyes: L(eyeOpen, 0, 0, 13, 4) + R(eyeOpen, 0, 0, 13, 4), brows: B.raised, mouth: M.oBig, extra: exclaim },
  { name: 'confused', label: 'Confused', back: A.down, front: mirror(A.scratch), eyes: L(eyeOpen, -3, -3) + R(eyeOpen, 3, 2, 9.5, 5), brows: B.confused, mouth: M.wavy, extra: question },
  { name: 'proud', label: 'Proud', back: A.down + mirror(A.down), eyes: L(eyeOpen, 1, -3) + R(eyeOpen, 1, -3), brows: B.raised, mouth: M.smileWide, extra: cheeks + sparks([[34, 92, 7], [168, 92, 7]]) },
];

const svg = (e) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="200" height="240" role="img"><title>Codeling: ${e.label}</title>
${antenna()}${mirror(antenna())}
${e.back}
${body()}
${e.eyes}${e.brows}${e.mouth}
${e.front ?? ''}
${shell()}
${e.extra ?? ''}
</svg>
`;

mkdirSync(join(here, 'svg'), { recursive: true });
for (const e of emotions) writeFileSync(join(here, 'svg', `codeling-${e.name}.svg`), svg(e));

const cards = emotions.map((e) => `<figure><img src="svg/codeling-${e.name}.svg" alt="${e.label}"><figcaption>${e.label}</figcaption></figure>`).join('\n');
writeFileSync(join(here, 'preview.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Codeling mascot</title>
<style>
:root{--bg:#FFFBEF;--card:#FFFFFF;--ink:#073D33;--line:#F5DFA0}
:root[data-theme=dark]{--bg:#12211E;--card:#1B302B;--ink:#E8F5EF;--line:#2C4A43}
body{margin:0;padding:24px 16px;background:var(--bg);color:var(--ink);font-family:system-ui,sans-serif}
header{display:flex;justify-content:space-between;align-items:center;max-width:960px;margin:0 auto 16px}
h1{margin:0;font-size:22px}
button{font:inherit;padding:8px 14px;border-radius:12px;border:2px solid var(--line);background:var(--card);color:var(--ink);cursor:pointer}
main{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:14px;max-width:960px;margin:0 auto}
figure{margin:0;background:var(--card);border:2px solid var(--line);border-radius:18px;padding:12px;text-align:center}
img{width:100%;height:auto}
figcaption{margin-top:4px;font-weight:600}
</style></head><body>
<header><h1>Codeling mascot: 12 emotions</h1><button id="t">Dark mode</button></header>
<main>
${cards}
</main>
<script>document.getElementById('t').onclick=function(){var r=document.documentElement;var d=r.dataset.theme==='dark';r.dataset.theme=d?'light':'dark';this.textContent=d?'Dark mode':'Light mode'}</script>
</body></html>
`);
console.log(`Built ${emotions.length} SVGs`);
