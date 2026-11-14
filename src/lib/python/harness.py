import builtins
import json
import linecache
import os
import random
import shutil
import sys
import traceback

WORK = "/work"
FILENAME = "main.py"


class NeedInput(BaseException):
    """Raised when the program asks for input() and no answer is left."""

    def __init__(self, prompt):
        self.prompt = prompt


class Out:
    def __init__(self, transcript):
        self.transcript = transcript

    def write(self, text):
        self.transcript.append(text)
        return len(text)

    def flush(self):
        pass


def clear_folder():
    for name in os.listdir(WORK):
        path = os.path.join(WORK, name)
        if os.path.isdir(path):
            shutil.rmtree(path)
        else:
            os.remove(path)


def describe_error(error):
    """The error as Python prints it, limited to the learner's own code."""
    tb = error.__traceback__
    while tb is not None and tb.tb_frame.f_code.co_filename != FILENAME:
        tb = tb.tb_next
    line = None
    if isinstance(error, SyntaxError):
        text = "".join(traceback.format_exception_only(type(error), error))
        line = error.lineno
    else:
        text = "".join(traceback.format_exception(type(error), error, tb))
        frames = [f for f in traceback.extract_tb(tb) if f.filename == FILENAME] if tb else []
        if frames:
            line = frames[-1].lineno
    return {"type": type(error).__name__, "message": str(error), "text": text, "line": line}


def run_user_code(code, inputs_json, files_json, keep_files, seed):
    inputs = json.loads(inputs_json)
    files = json.loads(files_json)
    transcript = []
    os.makedirs(WORK, exist_ok=True)
    os.chdir(WORK)
    if not keep_files:
        clear_folder()
    for name, content in files.items():
        with open(os.path.join(WORK, name), "w", encoding="utf-8", newline="") as f:
            f.write(content)

    # Lets tracebacks show the learner's own line of code, with the ^^^^ markers.
    linecache.cache[FILENAME] = (len(code), None, code.splitlines(True), FILENAME)

    queue = list(inputs)

    def fake_input(prompt=""):
        transcript.append(str(prompt))
        if not queue:
            raise NeedInput(str(prompt))
        answer = queue.pop(0)
        transcript.append(answer + "\n")
        return answer

    saved = (sys.stdout, sys.stderr, builtins.input)
    sys.stdout = sys.stderr = Out(transcript)
    builtins.input = fake_input
    random.seed(seed)
    result = {"status": "done", "prompt": None, "error": None}
    try:
        exec(compile(code, FILENAME, "exec"), {"__name__": "__main__"})
    except NeedInput as need:
        result["status"] = "needInput"
        result["prompt"] = need.prompt
    except SystemExit:
        pass
    except BaseException as error:  # the learner's program may fail in any way
        result["status"] = "error"
        result["error"] = describe_error(error)
    finally:
        sys.stdout, sys.stderr, builtins.input = saved
    result["transcript"] = "".join(transcript)
    return json.dumps(result)
