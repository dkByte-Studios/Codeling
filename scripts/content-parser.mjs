// Turns the lesson markdown in content/ into data the app can play.
// The format is described at the top of each unit file and checked by content/check.py.

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Inline formatting: `code` and **bold**. Code is kept apart so ** inside it stays as typed. */
export function inline(s) {
  return s
    .split(/(`[^`]+`)/)
    .map((part) =>
      part.length > 1 && part.startsWith('`') && part.endsWith('`')
        ? `<code>${esc(part.slice(1, -1))}</code>`
        : esc(part).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'),
    )
    .join('');
}

function tableBlock(rows) {
  const cells = (row) => row.replace(/^\||\|\s*$/g, '').split('|').map((c) => inline(c.trim()));
  const [head, , ...body] = rows;
  return { t: 'table', head: cells(head), rows: body.map(cells) };
}

/** Splits markdown into paragraphs, lists, tables and fenced code. */
export function tokenize(text) {
  const lines = text.split('\n');
  const out = [];
  let para = [];
  const flush = () => {
    if (para.length) out.push({ t: 'p', html: inline(para.join(' ')) });
    para = [];
  };
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const fence = line.match(/^```(.*)$/);
    if (fence) {
      flush();
      const code = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) code.push(lines[i++]);
      i++;
      out.push({ t: 'fence', info: fence[1].trim(), code: code.join('\n') });
      continue;
    }
    if (!line.trim()) {
      flush();
      i++;
      continue;
    }
    if (line.startsWith('|')) {
      flush();
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
      out.push(tableBlock(rows));
      continue;
    }
    if (/^- /.test(line) || /^\d+\. /.test(line)) {
      flush();
      const ordered = /^\d+\. /.test(line);
      const marker = ordered ? /^\d+\. / : /^- /;
      const items = [];
      while (i < lines.length && marker.test(lines[i])) items.push(inline(lines[i++].replace(marker, '')));
      out.push({ t: ordered ? 'ol' : 'ul', items });
      continue;
    }
    para.push(line.trim());
    i++;
  }
  flush();
  return out;
}

const parseInputs = (value) => (value ? value.replace(/~/g, ' ').split(',') : []);

function fenceMeta(info) {
  const [kind = '', ...rest] = info.split(/\s+/).filter(Boolean);
  const meta = { kind, inputs: [], name: undefined, errorType: undefined, line: undefined, vars: [] };
  for (const part of rest) {
    if (part.startsWith('inputs=')) meta.inputs = parseInputs(part.slice(7));
    else if (part.startsWith('line=')) meta.line = Number(part.slice(5));
    else if (part.startsWith('vars=')) meta.vars = part.slice(5).split(',');
    else if (kind === 'file' || kind === 'error') meta[kind === 'file' ? 'name' : 'errorType'] = part;
  }
  return meta;
}

/** Turns tokens into blocks the app can draw. A python block takes the output block after it. */
export function toBlocks(tokens) {
  const out = [];
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    if (tok.t !== 'fence') {
      out.push(tok);
      continue;
    }
    const meta = fenceMeta(tok.info);
    if (meta.kind === 'output' || meta.kind === 'table') continue;
    if (meta.kind === 'file') {
      out.push({ t: 'file', name: meta.name, content: `${tok.code}\n` });
      continue;
    }
    const block = { t: 'code', lang: 'python', code: tok.code };
    if (meta.kind === 'python') {
      const next = tokens[i + 1];
      if (next?.t === 'fence' && next.info.trim() === 'output') block.output = next.code;
      if (meta.inputs.length) block.inputs = meta.inputs;
    } else if (meta.kind === 'error') {
      block.errorType = meta.errorType;
    } else if (meta.kind === 'trace') {
      block.trace = { line: meta.line, vars: meta.vars };
    } else if (meta.kind === 'json' || meta.kind === 'badjson') {
      block.lang = 'json';
      if (meta.kind === 'badjson') block.invalid = true;
    } else if (meta.kind === '' || meta.kind === 'text') {
      block.lang = 'text';
    }
    out.push(block);
  }
  return out;
}

/** The programs in a body that print something, with the answers typed and the files they start with. */
function extractTests(tokens) {
  const tests = [];
  let files = {};
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    if (tok.t !== 'fence') continue;
    const meta = fenceMeta(tok.info);
    if (meta.kind === 'file') {
      files = { ...files, [meta.name]: `${tok.code}\n` };
    } else if (meta.kind === 'python') {
      const next = tokens[i + 1];
      if (next?.t === 'fence' && next.info.trim() === 'output') {
        tests.push({ inputs: meta.inputs, files, expected: next.code.trim() });
        files = {};
      }
    }
  }
  return tests;
}

/** Splits a body into plain lines and whole fences, keeping the order. */
function pieces(body) {
  const lines = body.split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    if (/^```/.test(lines[i])) {
      const start = i;
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) i++;
      out.push({ fence: lines.slice(start, i + 1).join('\n') });
      i++;
    } else {
      out.push({ line: lines[i] });
      i++;
    }
  }
  return out;
}

const OPTION = /^- ([A-D])\) (.*)$/;

/**
 * Reads one exercise or quiz question. The kind comes from what the body contains.
 * Returns { exercise } or { skipped: reason }.
 */
export function parseExercise(heading, body) {
  const items = pieces(body.replace(/\s+$/, ''));
  const fields = { why: [], hint: [] };
  const options = [];
  const order = [];
  const pairs = [];
  const promptItems = [];
  const acceptedItems = [];
  let answer = null;
  let accepted = null;
  let starter = null;
  let inOrder = false;
  let current = null; // the field a continuation line belongs to
  let seenTerminator = false;
  let sawAnswers = false;
  const isMatch = /match/i.test(heading);

  for (let n = 0; n < items.length; n++) {
    const item = items[n];
    if (item.fence) {
      current = null;
      if (accepted !== null && starter === 'waiting') {
        starter = item.fence.split('\n').slice(1, -1).join('\n');
        continue;
      }
      (accepted === null ? promptItems : acceptedItems).push(item);
      continue;
    }
    const line = item.line;
    let m;
    if ((m = line.match(OPTION))) {
      seenTerminator = true;
      options.push({ letter: m[1], text: m[2] });
      current = null;
    } else if ((m = line.match(/^Answer: (.*)$/))) {
      seenTerminator = true;
      answer = m[1].trim();
      current = null;
    } else if (/^Answers: /.test(line)) {
      sawAnswers = true;
      current = null;
    } else if ((m = line.match(/^Why: ?(.*)$/))) {
      fields.why.push(m[1]);
      current = 'why';
    } else if ((m = line.match(/^Hint: ?(.*)$/))) {
      fields.hint.push(m[1]);
      current = 'hint';
    } else if (/^Correct order:/.test(line)) {
      seenTerminator = true;
      inOrder = true;
      current = null;
    } else if (inOrder && /^\d+\. /.test(line)) {
      const text = line.replace(/^\d+\. /, '');
      order.push(text.startsWith('`') && text.endsWith('`') && text.length > 1 ? text.slice(1, -1) : text);
    } else if (/^Pieces: /.test(line)) {
      seenTerminator = true;
    } else if ((m = line.match(/^Accepted: ?(.*)$/))) {
      accepted = m[1];
      current = null;
    } else if (/^Starter:\s*(.*)$/.test(line)) {
      const rest = line.replace(/^Starter:\s*/, '');
      starter = rest === '(empty)' ? '' : 'waiting';
      if (accepted === null) accepted = '';
      current = null;
    } else if (isMatch && /^- /.test(line)) {
      const pm = line.match(/^- (`[^`]*`|[^:]+): (.*)$/);
      if (pm) pairs.push([pm[1], pm[2]]);
      seenTerminator = true;
    } else if (!line.trim()) {
      current = null;
    } else if (current && !seenTerminator) {
      current = null;
      (accepted === null ? promptItems : acceptedItems).push(item);
    } else if (current) {
      fields[current].push(line);
    } else if (accepted !== null && starter !== 'waiting') {
      acceptedItems.push(item);
    } else if (!seenTerminator || accepted === null) {
      promptItems.push(item);
    }
  }

  const text = (parts) => parts.join(' ').trim();
  const why = fields.why.length ? inline(text(fields.why)) : undefined;
  const hint = fields.hint.length ? inline(text(fields.hint)) : undefined;
  const toTokens = (arr) =>
    tokenize(arr.map((x) => (x.fence ? x.fence : x.line)).join('\n'));
  const promptTokens = toTokens(promptItems);
  const prompt = toBlocks(promptTokens);
  const allTokens = tokenize(body);

  // trace table
  const traceTok = allTokens.find((t) => t.t === 'fence' && /^trace\b/.test(t.info));
  if (traceTok) {
    const idx = allTokens.indexOf(traceTok);
    const table = allTokens[idx + 1];
    if (table?.t === 'fence' && table.info.trim() === 'table') {
      const meta = fenceMeta(traceTok.info);
      const rows = table.code
        .trim()
        .split('\n')
        .map((raw) => {
          const final = raw.startsWith('final ');
          const values = {};
          for (const part of raw.replace(/^final /, '').matchAll(/(\w+)=('(?:[^']*)'|"(?:[^"]*)"|\S+)/g)) values[part[1]] = part[2];
          return { final, values };
        });
      return {
        exercise: {
          type: 'trace',
          prompt: prompt.filter((b) => !(b.t === 'code' && b.trace)),
          code: traceTok.code,
          line: meta.line,
          vars: meta.vars,
          rows,
          why,
          hint,
        },
      };
    }
  }

  // typed code
  if (/write it yourself|fix it yourself|mini project/i.test(heading)) {
    const tests = extractTests(allTokens);
    if (!tests.length) return { skipped: 'typed exercise has no output block to check against' };
    const mustContain = [];
    const mustMatch = [];
    const acc = accepted ?? '';
    for (const m of acc.matchAll(/the code contains `([^`]+)`/g)) mustContain.push(m[1]);
    if (/a line that starts with `#`/.test(acc)) mustMatch.push('^\\s*#');
    return {
      exercise: {
        type: 'typed',
        prompt,
        starter: starter && starter !== 'waiting' ? starter : '',
        tests,
        mustContain,
        mustMatch,
        why,
        hint,
      },
    };
  }

  if (order.length) return { exercise: { type: 'order', prompt, pieces: order, why, hint } };
  if (pairs.length >= 2) {
    return {
      exercise: {
        type: 'match',
        prompt,
        pairs: pairs.map(([l, r]) => [inline(l), inline(r)]),
        why,
        hint,
      },
    };
  }
  if (options.length >= 2) {
    const index = options.findIndex((o) => o.letter === answer);
    if (index < 0) return { skipped: `answer ${answer} is not one of the options` };
    return {
      exercise: {
        type: 'choice',
        prompt,
        options: options.map((o) => inline(o.text)),
        answer: index,
        why,
        hint,
        revealOutput: prompt.some((b) => b.t === 'code' && b.output !== undefined),
      },
    };
  }
  if (answer === 'True' || answer === 'False') {
    return { exercise: { type: 'tf', prompt, answer: answer === 'True', why, hint } };
  }
  return { skipped: sawAnswers ? 'answers written as text (trace the variable)' : 'no machine-checkable answer' };
}

const EXERCISE_HEADING = /^\*\*(\d+)\. (.+)\*\*\s*$/gm;

function parseLesson(id, title, body) {
  const cleaned = body.replace(/\n---\s*$/, '').trimEnd();
  const teachStart = cleaned.indexOf('**Teach**');
  const headings = [...cleaned.matchAll(EXERCISE_HEADING)];
  const recapAt = cleaned.indexOf('**Recap**');
  const firstEx = headings.length ? headings[0].index : recapAt;
  const teachText = cleaned.slice(teachStart >= 0 ? teachStart + '**Teach**'.length : 0, firstEx);
  const recapText = recapAt >= 0 ? cleaned.slice(recapAt + '**Recap**'.length) : '';
  const exercises = [];
  const skipped = [];
  headings.forEach((h, n) => {
    const end = n + 1 < headings.length ? headings[n + 1].index : recapAt >= 0 ? recapAt : cleaned.length;
    const result = parseExercise(h[2], cleaned.slice(h.index + h[0].length, end));
    if (result.exercise) exercises.push({ number: Number(h[1]), title: h[2], ...result.exercise });
    else skipped.push({ lesson: id, number: Number(h[1]), title: h[2], reason: result.skipped });
  });
  return {
    lesson: {
      id,
      title,
      teach: toBlocks(tokenize(teachText)),
      exercises,
      recap: inline(recapText.trim().replace(/\n+/g, ' ')),
    },
    skipped,
  };
}

const QUESTION_MARKER = /^\*\*([QE])(\d+) \(([^)]*)\)\*\* ?/gm;

function parseQuestions(body) {
  const markers = [...body.matchAll(QUESTION_MARKER)];
  const questions = [];
  const skipped = [];
  markers.forEach((m, n) => {
    const end = n + 1 < markers.length ? markers[n + 1].index : body.length;
    const raw = body.slice(m.index + m[0].length, end).replace(/\n---[\s\S]*$/, '');
    const result = parseExercise('', raw.replace(/\nNote: this bank[^\n]*/g, ''));
    const id = `${m[1]}${m[2]}`;
    if (result.exercise) questions.push({ id, source: m[3], ...result.exercise });
    else skipped.push({ lesson: id, number: Number(m[2]), title: 'quiz question', reason: result.skipped });
  });
  return { questions, skipped };
}

/** Reads one unit file into lessons, project, quiz bank and exam bank. */
export function parseUnit(text) {
  const head = text.match(/^# Python, Unit (\d+): (.*)$/m);
  if (!head) throw new Error('Unit title line not found');
  const sections = text.split(/^## /m).slice(1);
  const unit = { unit: Number(head[1]), title: head[2].trim(), lessons: [], project: null, quiz: [], exam: [], skipped: [] };
  for (const section of sections) {
    const nl = section.indexOf('\n');
    const title = section.slice(0, nl).trim();
    const body = section.slice(nl + 1);
    let m;
    if ((m = title.match(/^Lesson (\d+\.\d+): (.*)$/))) {
      const { lesson, skipped } = parseLesson(m[1], m[2], body);
      unit.lessons.push(lesson);
      unit.skipped.push(...skipped);
    } else if (/project/i.test(title) && !/alternative/i.test(title)) {
      const tokens = tokenize(body.replace(/\n---\s*$/, ''));
      unit.project = { title: title.replace(/^Unit \d+ project:\s*/, ''), blocks: toBlocks(tokens), tests: extractTests(tokens) };
    } else if (/checkpoint quiz/i.test(title)) {
      const { questions, skipped } = parseQuestions(body);
      unit.quiz = questions;
      unit.skipped.push(...skipped);
    } else if (/^Final exam/i.test(title)) {
      const { questions, skipped } = parseQuestions(body);
      unit.exam = questions;
      unit.skipped.push(...skipped);
    }
  }
  return unit;
}
