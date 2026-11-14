// A few facts about the browser, shown when Python cannot start, so a failure can be understood and reported.
export function browserFacts(baseUrl: string): string {
  const yesNo = (value: boolean) => (value ? 'yes' : 'no');
  let moduleWorker = false;
  try {
    const url = URL.createObjectURL(new Blob([''], { type: 'text/javascript' }));
    const probe = new Worker(url, { type: 'module' });
    probe.terminate();
    URL.revokeObjectURL(url);
    moduleWorker = true;
  } catch {
    moduleWorker = false;
  }
  return [
    `Browser: ${navigator.userAgent}`,
    `WebAssembly: ${yesNo(typeof WebAssembly === 'object')}`,
    `Web workers: ${yesNo(typeof Worker === 'function')}`,
    `Module workers: ${yesNo(moduleWorker)}`,
    `Online: ${yesNo(navigator.onLine)}`,
    `Python files: ${location.origin}${baseUrl}pyodide/`,
  ].join('\n');
}
