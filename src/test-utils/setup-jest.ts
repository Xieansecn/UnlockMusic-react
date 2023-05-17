import '@testing-library/jest-dom';

// FIXME: Use something like jsdom-worker?
//   see: https://github.com/developit/jsdom-worker
if (!global.Worker) {
  (global as any).Worker = class MockWorker {
    events: Record<string, (e: unknown) => void> = Object.create(null);

    onmessage?: () => {};
    addEventListener(name: string, e: unknown) {
      if (Object.hasOwn(this.events, name)) {
        this.events[name](e);
      }
    }
  };
}
