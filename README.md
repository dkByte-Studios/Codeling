# Codeling

Learn programming in short, game-like lessons, in your browser. Starts with Python.

Everything runs on your device: no account, no server, no tracking. Python runs inside the page using [Pyodide](https://pyodide.org), so typed code challenges work offline once the app has loaded.

**Status:** early. The Python course is written (16 units, 84 lessons). The app is being built: right now the site is a test bench that proves Python runs in the browser.

## Run it

You need Node.js 22 or newer.

```bash
npm install
npm run dev
```

Other commands:

```bash
npm run build     # production build in dist/
npm run preview   # serve the production build
npm run check     # type-check the Svelte and TypeScript code
```

`npm run dev` and `npm run build` first copy the Pyodide runtime into `public/pyodide` (it is not committed).

## What is here

| Folder | What it holds |
|---|---|
| `src/` | The app (Svelte 5, TypeScript, Vite) |
| `src/lib/python/` | The Python runner: a web worker that runs learner code, and the page side that starts, replays and stops it |
| `content/python/` | The Python course as markdown, 16 units |
| `content/check.py` | Runs every code sample in the lessons and checks the output, errors and answers (`py content/check.py`) |
| `mascot/` | The Codeling mascot: 12 emotions as SVG, built by `mascot/build.mjs` |
| `learner-app-content-plan.md` | The plan for every course |
| `design-and-tech-plan.md` | Look and feel, screens, tech choices and build phases |

## How Python runs

Learner code runs in a web worker, so the page never freezes. A program that asks for `input()` is replayed: the page asks the person, adds the answer to the list, and runs the program again from the start with the same random seed. A program that runs too long, or is stopped, is cut off by throwing the worker away and starting a new one. No special server headers are needed, so it works on GitHub Pages.
