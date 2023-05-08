export const workerClient = new Worker(new URL('./worker', import.meta.url), { type: 'module' });
