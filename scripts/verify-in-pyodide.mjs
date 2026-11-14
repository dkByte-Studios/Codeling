// Runs every code sample in the course data inside Pyodide, the same Python the app uses, and checks it.
// Needs the generated course data: run `npm run content` first (npm run verify does that).
//   - code shown with its output must print exactly that
//   - code marked as failing must stop with that error type
//   - typed exercises: the model answer must pass every test and the exercise's own rules
//   - trace tables must match what Python really does
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadPyodide } from 'pyodide';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(root, 'src', 'content', 'generated');

const pyodide = await loadPyodide();
pyodide.runPython(readFileSync(join(root, 'src', 'lib', 'python', 'harness.py'), 'utf8'));
pyodide.runPython(`
import contextlib, io, json, sys

def trace_rows(code, line, names):
    rows = []
    compiled = compile(code, "<lesson>", "exec")

    def show(frame):
        return " ".join(f"{n}={frame.f_locals.get(n)!r}" for n in names)

    def tracer(frame, event, arg):
        if frame.f_code.co_filename != "<lesson>":
            return None
        if event == "line" and frame.f_lineno == line:
            rows.append(show(frame))
        elif event == "return" and frame.f_code.co_name == "<module>":
            rows.append("final " + show(frame))
        return tracer

    with contextlib.redirect_stdout(io.StringIO()):
        sys.settrace(tracer)
        try:
            exec(compiled, {"__name__": "__main__"})
        finally:
            sys.settrace(None)
    return json.dumps(rows)
`);
const runUserCode = pyodide.globals.get('run_user_code');
const traceRows = pyodide.globals.get('trace_rows');

const run = (code, inputs = [], files = {}) => JSON.parse(runUserCode(code, JSON.stringify(inputs), JSON.stringify(files), false, 1));
const clean = (s) => s.replace(/\r\n/g, '\n').trim();

const stats = { samples: 0, errors: 0, typed: 0, traces: 0, json: 0 };
const problems = [];
const fail = (where, message) => problems.push(`${where}: ${message}`);

function checkBlocks(blocks, where) {
  let files = {};
  for (const block of blocks) {
    if (block.t === 'file') {
      files = { ...files, [block.name]: block.content };
    } else if (block.t === 'code' && block.lang === 'json') {
      stats.json++;
      let valid = true;
      try {
        JSON.parse(block.code);
      } catch {
        valid = false;
      }
      if (valid === Boolean(block.invalid)) fail(where, `JSON example is ${valid ? 'valid' : 'invalid'} but marked the other way`);
    } else if (block.t === 'code' && block.lang === 'python') {
      if (block.output !== undefined) {
        stats.samples++;
        const result = run(block.code, block.inputs ?? [], files);
        if (result.status !== 'done') fail(where, `sample stopped with ${result.error?.type ?? result.status}: ${block.code.split('\n')[0]}`);
        else if (clean(result.stdout) !== clean(block.output)) {
          fail(where, `output differs. expected ${JSON.stringify(clean(block.output))}, got ${JSON.stringify(clean(result.stdout))}`);
        }
        files = {};
      } else if (block.errorType) {
        stats.errors++;
        const result = run(block.code, block.inputs ?? [], files);
        const wantedType = block.errorType.split('.').pop(); // json.decoder.JSONDecodeError shows as JSONDecodeError
        if (result.status !== 'error' || result.error.type !== wantedType) {
          fail(where, `expected ${block.errorType}, got ${result.status === 'error' ? result.error.type : result.status}`);
        }
        files = {};
      }
    }
  }
}

function checkTyped(exercise, where) {
  stats.typed++;
  for (const needle of exercise.mustContain) if (!exercise.solution.includes(needle)) fail(where, `model answer lacks ${needle}`);
  for (const pattern of exercise.mustMatch) if (!new RegExp(pattern, 'm').test(exercise.solution)) fail(where, `model answer does not match ${pattern}`);
  for (const test of exercise.tests) {
    let code = exercise.solution;
    for (const { from, to } of test.substitute ?? []) code = code.split('\n').map((l) => (l.trimEnd() === from.trimEnd() ? to : l)).join('\n');
    const result = run(code, test.inputs, test.files);
    if (result.status !== 'done') fail(where, `model answer stopped with ${result.error?.type ?? result.status}`);
    else if (clean(result.stdout) !== clean(test.expected)) {
      fail(where, `model answer prints ${JSON.stringify(clean(result.stdout))}, test expects ${JSON.stringify(clean(test.expected))}`);
    }
  }
}

function checkTrace(exercise, where) {
  stats.traces++;
  const actual = JSON.parse(traceRows(exercise.code, exercise.line, exercise.vars));
  const wanted = exercise.rows.map((r) => (r.final ? 'final ' : '') + exercise.vars.map((v) => `${v}=${r.values[v]}`).join(' '));
  if (JSON.stringify(actual) !== JSON.stringify(wanted)) fail(where, `trace differs. wanted ${JSON.stringify(wanted)}, got ${JSON.stringify(actual)}`);
}

function checkExercise(exercise, where) {
  checkBlocks(exercise.prompt, where);
  if (exercise.type === 'typed') checkTyped(exercise, where);
  if (exercise.type === 'trace') checkTrace(exercise, where);
}

for (const name of readdirSync(dataDir).filter((f) => /^unit-\d+\.json$/.test(f)).sort()) {
  const unit = JSON.parse(readFileSync(join(dataDir, name), 'utf8'));
  for (const lesson of unit.lessons) {
    checkBlocks(lesson.teach, `lesson ${lesson.id} reading`);
    for (const ex of lesson.exercises) checkExercise(ex, `lesson ${lesson.id} #${ex.number}`);
  }
  if (unit.project) {
    checkBlocks(unit.project.blocks, `unit ${unit.unit} project`);
  }
  for (const q of [...unit.quiz, ...unit.exam]) checkExercise(q, `unit ${unit.unit} ${q.id}`);
}

console.log(
  `Checked in Pyodide: ${stats.samples} samples with output, ${stats.errors} error samples, ${stats.typed} typed exercises, ${stats.traces} trace tables, ${stats.json} JSON examples.`,
);
for (const p of problems) console.log('PROBLEM:', p);
console.log(problems.length ? `${problems.length} problem(s)` : 'OK');
process.exit(problems.length ? 1 : 0);
