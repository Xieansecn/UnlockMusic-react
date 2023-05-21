function isPromise<T = unknown>(p: unknown): p is Promise<T> {
  return !!p && typeof p === 'object' && 'then' in p && 'catch' in p && 'finally' in p;
}

export function timedLogger<R = unknown>(label: string, fn: () => R): R {
  console.time(label);

  try {
    const result = fn();

    if (isPromise(result)) {
      result.finally(() => {
        console.timeEnd(label);
      });
    }

    return result;
  } catch (e) {
    console.timeEnd(label);
    throw e;
  }
}
