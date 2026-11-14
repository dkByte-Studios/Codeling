// Messages between the page and the Python worker, and the shape of a run result.

export type RunOptions = {
  code: string;
  /** Answers the program's input() calls will receive, in order. */
  inputs?: string[];
  /** Sample files created in the program's working folder before it runs. */
  files?: Record<string, string>;
  /** Keep files from the previous run instead of starting with an empty folder. */
  keepFiles?: boolean;
  /** Seed for the random module, so a replay behaves exactly like the first run. */
  seed?: number;
  /** Stop the program after this many milliseconds. */
  timeLimitMs?: number;
};

export type RunError = {
  /** For example NameError. */
  type: string;
  message: string;
  /** The traceback as Python prints it, limited to the learner's own code. */
  text: string;
  /** Line number in the learner's code, when there is one. */
  line: number | null;
};

export type RunResult = {
  /**
   * done: the program finished.
   * needInput: the program asked for input() beyond the answers given. Ask the person, then run again with one more answer.
   * error: the program stopped with an error.
   * timeout: the time limit ran out (probably an endless loop).
   * stopped: the person pressed Stop.
   */
  status: 'done' | 'needInput' | 'error' | 'timeout' | 'stopped';
  /** Everything the program showed, including prompts and the answers typed. */
  transcript: string;
  /** Only what the program printed. This is what typed exercises are checked against. */
  stdout: string;
  prompt?: string;
  error?: RunError;
  ms: number;
};

export type ToWorker =
  | { type: 'init'; indexURL: string }
  | ({ type: 'run'; id: number } & Required<Pick<RunOptions, 'code' | 'inputs' | 'files' | 'keepFiles' | 'seed'>>);

export type FromWorker =
  | { type: 'ready'; loadMs: number }
  | { type: 'failed'; message: string }
  | { type: 'result'; id: number; result: Omit<RunResult, 'ms'> };
