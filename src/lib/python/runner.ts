// The page's side of running Python. One worker, one run at a time.
// If a program runs too long, or the person presses Stop, the worker is thrown away and a new one is started.
import type { FromWorker, RunOptions, RunResult, ToWorker } from './protocol';

const DEFAULT_TIME_LIMIT_MS = 5000;

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
  onStatus: (status: 'loading' | 'ready' | 'failed') => void = () => {};

  constructor(private readonly baseUrl: string) {
    this.start();
  }

  private start() {
    this.onStatus('loading');
    this.ready = new Promise<void>((resolve, reject) => {
      this.readyResolve = resolve;
      this.readyReject = reject;
    });
    this.ready.catch(() => {});
    this.worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
    this.worker.onmessage = (event: MessageEvent<FromWorker>) => this.handle(event.data);
    this.worker.onerror = (event) => this.fail(event.message || 'The Python worker crashed.');
    const init: ToWorker = { type: 'init', indexURL: `${location.origin}${this.baseUrl}pyodide/` };
    this.worker.postMessage(init);
  }

  private fail(message: string) {
    this.onStatus('failed');
    this.readyReject(new Error(message));
  }

  private handle(message: FromWorker) {
    if (message.type === 'ready') {
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

  async run(options: RunOptions): Promise<RunResult> {
    await this.ready;
    const id = this.nextId++;
    const timeLimit = options.timeLimitMs ?? DEFAULT_TIME_LIMIT_MS;
    this.runStarted = performance.now();
    return new Promise<RunResult>((resolve) => {
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
        resolve({ status, transcript: '', ms: Math.round(performance.now() - this.runStarted) });
      };
      this.worker.postMessage({
        type: 'run',
        id,
        code: options.code,
        inputs: options.inputs ?? [],
        files: options.files ?? {},
        keepFiles: options.keepFiles ?? false,
        seed: options.seed ?? 1,
      } satisfies ToWorker);
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
