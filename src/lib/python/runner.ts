// The page's side of running Python. One worker, one run at a time.
// If a program runs too long, or the person presses Stop, the worker is thrown away and a new one is started.
import type { FromWorker, RunOptions, RunResult, ToWorker } from './protocol';

const DEFAULT_TIME_LIMIT_MS = 5000;
const START_TIMEOUT_MS = 60_000;

export class PythonRunner {
  private worker!: Worker;
  private nextId = 1;
  private pending: { id: number; finish: (result: RunResult) => void } | null = null;
  private ready!: Promise<void>;
  private readyResolve!: () => void;
  private readyReject!: (reason: Error) => void;

  /** How long the first start took, in milliseconds. Null until Python is ready. */
  loadMs: number | null = null;
  /** How many times the worker had to be restarted after a stop or timeout. */
  restarts = 0;
  /** Why Python could not start, in words. Null when it started fine. */
  error: string | null = null;
  onStatus: (status: 'loading' | 'ready' | 'failed') => void = () => {};
  private startTimer: ReturnType<typeof setTimeout> | undefined;

  constructor(private readonly baseUrl: string) {
    this.start();
  }

  private start() {
    this.error = null;
    this.onStatus('loading');
    this.ready = new Promise<void>((resolve, reject) => {
      this.readyResolve = resolve;
      this.readyReject = reject;
    });
    this.ready.catch(() => {});
    clearTimeout(this.startTimer);
    this.startTimer = setTimeout(
      () => this.fail('Python took longer than 60 seconds to start. Check your connection and try again.'),
      START_TIMEOUT_MS,
    );
    try {
      this.worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
    } catch (error) {
      this.fail(`This browser could not create the Python worker: ${error instanceof Error ? error.message : String(error)}`);
      return;
    }
    this.worker.onmessage = (event: MessageEvent<FromWorker>) => this.handle(event.data);
    this.worker.onerror = (event) =>
      this.fail(event.message || `The Python worker could not start (file: ${event.filename || 'unknown'}).`);
    this.worker.onmessageerror = () => this.fail('The Python worker sent a message the page could not read.');
    const init: ToWorker = { type: 'init', indexURL: `${location.origin}${this.baseUrl}pyodide/` };
    this.worker.postMessage(init);
  }

  private fail(message: string) {
    clearTimeout(this.startTimer);
    this.error = message;
    this.onStatus('failed');
    this.readyReject(new Error(message));
  }

  /** Throws the worker away and tries to start Python again. */
  retry() {
    this.worker?.terminate();
    this.start();
  }

  private handle(message: FromWorker) {
    if (message.type === 'ready') {
      clearTimeout(this.startTimer);
      if (this.loadMs === null) this.loadMs = message.loadMs;
      this.onStatus('ready');
      this.readyResolve();
    } else if (message.type === 'failed') {
      this.fail(message.message);
    } else if (message.type === 'result' && this.pending?.id === message.id) {
      const { finish } = this.pending;
      this.pending = null;
      finish({ ...message.result, ms: Math.round(performance.now() - this.runStarted) });
    }
  }

  private runStarted = 0;

  /** Resolves when Python is ready to run code. */
  whenReady(): Promise<void> {
    return this.ready;
  }

  private chain: Promise<unknown> = Promise.resolve();

  /** Runs one program at a time. A run asked for while another is going waits its turn. */
  run(options: RunOptions): Promise<RunResult> {
    const next = this.chain.then(() => this.execute(options));
    this.chain = next.catch(() => {});
    return next;
  }

  private async execute(options: RunOptions): Promise<RunResult> {
    await this.ready;
    const id = this.nextId++;
    const timeLimit = options.timeLimitMs ?? DEFAULT_TIME_LIMIT_MS;
    this.runStarted = performance.now();
    return new Promise<RunResult>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.restartWith('timeout');
      }, timeLimit);
      this.pending = {
        id,
        finish: (result) => {
          clearTimeout(timer);
          resolve(result);
        },
      };
      this.endRun = (status) => {
        clearTimeout(timer);
        this.pending = null;
        resolve({ status, transcript: '', stdout: '', ms: Math.round(performance.now() - this.runStarted) });
      };
      try {
        this.worker.postMessage({
          type: 'run',
          id,
          code: options.code,
          // Copies, so reactive objects from the page can always be sent to the worker.
          inputs: [...(options.inputs ?? [])],
          files: { ...(options.files ?? {}) },
          keepFiles: options.keepFiles ?? false,
          seed: options.seed ?? 1,
        } satisfies ToWorker);
      } catch (error) {
        clearTimeout(timer);
        this.pending = null;
        reject(error);
      }
    });
  }

  private endRun: (status: 'timeout' | 'stopped') => void = () => {};

  private restartWith(status: 'timeout' | 'stopped') {
    this.worker.terminate();
    this.restarts += 1;
    this.endRun(status);
    this.start();
  }

  /** Stops the running program. Python restarts in the background. */
  stop() {
    if (this.pending) this.restartWith('stopped');
  }
}
