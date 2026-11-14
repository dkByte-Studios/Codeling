"""Runs every code sample in the lesson files and checks it.

Usage (from the project folder):  py content/check.py

Block types, written as the first line of a code fence:
  python [inputs=a,b]        runs the code; the next ```output block must match what it prints.
                             In inputs, ~ stands for a space (the fence header cannot hold spaces).
  error <Type> [inputs=a,b]  the code must fail with that error type.
  trace line=N vars=a,b      runs the code and records the variables each time line N is about
                             to run, plus a final row; the next ```table block must match.
  forever                    the code must still be running after 2 seconds (an endless loop).
  json / badjson             the text must parse (json) or fail to parse (badjson) as JSON.
  file <name>                a sample file, given to the next program that runs. Every program runs
                             in its own empty temporary folder, so nothing carries over.
For predict questions with a one-line output, the option marked as the answer must equal that
output. Also checks the exact error messages quoted in the teach text.
"""
import contextlib
import io
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).parent
SELF = str(Path(__file__).resolve())


def fake_inputs(inputs_json):
    import builtins
    it = iter(json.loads(inputs_json))

    def fake_input(prompt=""):
        try:
            return next(it)
        except StopIteration:
            raise EOFError("program asked for more input than the lesson provides")

    builtins.input = fake_input


def run_mode(code_file, inputs_json):
    fake_inputs(inputs_json)
    sys.stdout.reconfigure(encoding="utf-8")
    code = Path(code_file).read_text(encoding="utf-8")
    exec(compile(code, "<lesson>", "exec"), {"__name__": "__main__"})


def trace_mode(code_file, line, names):
    code = compile(Path(code_file).read_text(encoding="utf-8"), "<lesson>", "exec")
    rows = []

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
            exec(code, {"__name__": "__main__"})
        finally:
            sys.settrace(None)
    sys.stdout.reconfigure(encoding="utf-8")
    print(json.dumps(rows))


def write_temp(code):
    with tempfile.NamedTemporaryFile("w", suffix=".py", delete=False, encoding="utf-8") as f:
        f.write(code)
        return f.name


def run_code(code, inputs, files=None):
    """Runs the code in an empty temporary folder that holds only the sample files given."""
    path = write_temp(code)
    try:
        with tempfile.TemporaryDirectory() as folder:
            for name, content in (files or {}).items():
                (Path(folder) / name).write_bytes(content.encode("utf-8"))
            r = subprocess.run(
                [sys.executable, "-I", SELF, "--run", path, json.dumps(inputs)],
                capture_output=True, text=True, encoding="utf-8", timeout=10, cwd=folder,
            )
    finally:
        Path(path).unlink(missing_ok=True)
    return r.returncode, r.stdout.replace("\r\n", "\n"), r.stderr.replace("\r\n", "\n")


def run_trace(code, line, names):
    path = write_temp(code)
    try:
        r = subprocess.run(
            [sys.executable, "-I", __file__, "--trace", path, str(line), ",".join(names)],
            capture_output=True, text=True, encoding="utf-8", timeout=10,
        )
    finally:
        Path(path).unlink(missing_ok=True)
    if r.returncode != 0:
        return None, r.stderr.strip().splitlines()[-1] if r.stderr.strip() else "failed"
    return json.loads(r.stdout), None


def runs_forever(code):
    path = write_temp(code)
    try:
        subprocess.run(
            [sys.executable, "-I", __file__, "--run", path, "[]"],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=2,
        )
        return False
    except subprocess.TimeoutExpired:
        return True
    finally:
        Path(path).unlink(missing_ok=True)


FENCE = re.compile(r"^```([^\n]*)\n(.*?)^```", re.M | re.S)


def parse_info(info):
    parts = info.split()
    kind = parts[0] if parts else ""
    opts = {"inputs": [], "err": None}
    for p in parts[1:]:
        if "=" in p:
            k, v = p.split("=", 1)
            if k == "inputs":
                opts[k] = v.replace("~", " ").split(",")  # ~ stands for a space in the fence header
            else:
                opts[k] = v.split(",") if k == "vars" else v
        else:
            opts["err"] = p
    return kind, opts


def options_after(text):
    end = re.search(r"^(\*\*|---)", text, re.M)
    seg = text[: end.start()] if end else text
    opts = dict(re.findall(r"^- ([A-D])\) (.*)$", seg, re.M))
    ans = re.search(r"^Answer: ([A-D])\s*$", seg, re.M)
    return opts, (ans.group(1) if ans else None)


def next_fence(fences, i, text, want):
    nxt = fences[i + 1] if i + 1 < len(fences) else None
    if nxt and nxt.group(1).strip() == want and not text[fences[i].end():nxt.start()].strip():
        return nxt
    return None


def check_file(path, stats):
    text = path.read_text(encoding="utf-8")
    fences = list(FENCE.finditer(text))
    problems = []
    pending = {}  # sample files from ```file name blocks, handed to the next program that runs
    for i, m in enumerate(fences):
        kind, opts = parse_info(m.group(1))
        code = m.group(2)
        line = text.count("\n", 0, m.start()) + 1
        where = f"{path.name}:{line}"
        if kind == "file":
            stats["files"] += 1
            pending[opts["err"]] = code
        elif kind == "error":
            files, pending = pending, {}
            rc, out, e = run_code(code, opts["inputs"], files)
            stats["errors"] += 1
            last = e.strip().splitlines()[-1] if e.strip() else ""
            if rc == 0 or not last.startswith(opts["err"] or ""):
                problems.append(f"{where}: expected {opts['err']}, got: {last or 'no error'}")
        elif kind in ("json", "badjson"):
            stats["json"] += 1
            try:
                json.loads(code)
                valid = True
            except ValueError:
                valid = False
            if valid != (kind == "json"):
                problems.append(f"{where}: {kind} block is {'valid' if valid else 'invalid'} JSON")
        elif kind == "forever":
            stats["forever"] += 1
            if not runs_forever(code):
                problems.append(f"{where}: expected an endless loop but the program finished")
        elif kind == "trace":
            tbl = next_fence(fences, i, text, "table")
            if not tbl:
                problems.append(f"{where}: trace block has no table block")
                continue
            rows, err = run_trace(code, int(opts["line"]), opts["vars"])
            stats["traces"] += 1
            expected = [r.strip() for r in tbl.group(2).strip().splitlines()]
            if err:
                problems.append(f"{where}: trace crashed: {err}")
            elif rows != expected:
                problems.append(f"{where}: trace differs. expected {expected}, got {rows}")
        elif kind == "python":
            files, pending = pending, {}
            nxt = next_fence(fences, i, text, "output")
            if not nxt:
                stats["unchecked"] += 1
                problems.append(f"{where}: python block has no output block (not checked)")
                continue
            expected = nxt.group(2).strip()
            rc, out, e = run_code(code, opts["inputs"], files)
            stats["runs"] += 1
            if rc != 0:
                problems.append(f"{where}: crashed: {e.strip().splitlines()[-1] if e.strip() else rc}")
            elif out.strip() != expected:
                problems.append(f"{where}: output differs. expected {expected!r}, got {out.strip()!r}")
            else:
                choices, ans = options_after(text[nxt.end():])
                if ans and expected and "\n" not in expected:
                    stats["answers"] += 1
                    chosen = choices.get(ans, "").replace("`", "").strip()
                    if chosen != expected:
                        problems.append(f"{where}: marked answer {ans}) {chosen!r} but the code prints {expected!r}")
    return problems


MESSAGES = [
    ('print("Hello)', "unterminated string literal"),
    ('print("Hello"', "'(' was never closed"),
    ('prnt("Hello")', "name 'prnt' is not defined"),
    ('prnt("Hello")', "Did you mean: 'print'?"),
    ('Print("Hi")', "name 'Print' is not defined"),
    ('print("Age: " + 15)', "can only concatenate str (not \"int\") to str"),
    ('done = true', "name 'true' is not defined"),
    ('x = [1, 2, 3]\nprint(x[3])', "list index out of range"),
    ('total = 5\nprint(totl)', "line 2, in <module>"),
    ('total = 5\nprint(totl)', "NameError: name 'totl' is not defined. Did you mean: 'total'?"),
    ('total = 5\nprint(totl)', "^^^^"),
    ('name = "Sam"\nage = 12\nprint(name)\nprint(agee)', "line 4, in <module>"),
    ('name = "Sam"\nage = 12\nprint(name)\nprint(agee)', "NameError: name 'agee' is not defined"),
    ('a = 5\nb = 6\nprint(c)', "line 3, in <module>"),
    ('print(10 / 0)', "ZeroDivisionError: division by zero"),
    ('print(int("12a"))', "invalid literal for int() with base 10: '12a'"),
    ('def greet(name):\n    print(name)\n\ngreet()', "greet() missing 1 required positional argument: 'name'"),
    ('def double(n):\n    print(n * 2)\n\nresult = double(5)\nprint(result + 1)', "unsupported operand type(s) for +: 'NoneType' and 'int'"),
    ('def make():\n    secret = 42\n    return secret\n\nmake()\nprint(secret)', "NameError: name 'secret' is not defined"),
    ('say_hi()\n\ndef say_hi():\n    print("Hi!")', "name 'say_hi' is not defined"),
    ('nums = [1, 2, 3]\nprint(nums[-4])', "IndexError: list index out of range"),
    ('nums = [1, 2]\nnums.remove(9)', "ValueError: list.remove(x): x not in list"),
    ('print(["a"].index("z"))', "ValueError: list.index(x): x not in list || ValueError: 'z' is not in list"),
    ('student = {"name": "Sam"}\nprint(student["grade"])', "KeyError: 'grade'"),
    ('word = "cat"\nprint(word[3])', "IndexError: string index out of range"),
    ('word = "cat"\nword[0] = "b"', "TypeError: 'str' object does not support item assignment"),
    ("class Book:\n    pass\n\nb = Book()\nprint(b.title)", "AttributeError: 'Book' object has no attribute 'title'"),
    ('class Book:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author\n\nb = Book("Dune")', "TypeError: Book.__init__() missing 1 required positional argument: 'author'"),
    ('class Counter:\n    def __init__(self):\n        self.count = 0\n\n    def add():\n        self.count += 1\n\nc = Counter()\nc.add()', "TypeError: Counter.add() takes 0 positional arguments but 1 was given"),
    ('with open("missing.txt") as f:\n    print(f.read())',"FileNotFoundError: [Errno 44] No such file or directory: 'missing.txt' || FileNotFoundError: [Errno 2] No such file or directory: 'missing.txt'"),
    ('import json\nprint(json.loads("{\'name\': \'Sam\'}"))', "Expecting property name enclosed in double quotes"),
]


def check_messages(stats):
    problems = []
    for code, needle in MESSAGES:
        rc, out, e = run_code(code, [])
        stats["messages"] += 1
        # " || " separates wordings that different Python versions use (the app runs Pyodide's Python)
        if not any(n in e for n in needle.split(" || ")):
            problems.append(f"message check: {code!r} did not give {needle!r}; got {e.strip().splitlines()[-1] if e.strip() else 'nothing'}")
    return problems


def main():
    stats = {"runs": 0, "errors": 0, "answers": 0, "messages": 0, "unchecked": 0, "traces": 0, "forever": 0, "json": 0, "files": 0}
    problems = []
    for path in sorted((HERE / "python").glob("*.md")):
        problems += check_file(path, stats)
    problems += check_messages(stats)
    print(f"Ran {stats['runs']} code samples, {stats['errors']} error samples, {stats['traces']} trace tables, "
          f"{stats['forever']} endless loops, {stats['json']} JSON examples, {stats['answers']} marked answers, "
          f"{stats['messages']} error messages.")
    for p in problems:
        print("PROBLEM:", p)
    print("OK" if not problems else f"{len(problems)} problem(s)")
    return 1 if problems else 0


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--run":
        run_mode(sys.argv[2], sys.argv[3])
    elif len(sys.argv) > 1 and sys.argv[1] == "--trace":
        trace_mode(sys.argv[2], int(sys.argv[3]), sys.argv[4].split(","))
    else:
        sys.exit(main())
