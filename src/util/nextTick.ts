type NextTickFn = (callback: () => void) => void;
const nextTickFn =
  typeof setImmediate !== 'undefined'
    ? (setImmediate as NextTickFn)
    : typeof requestAnimationFrame !== 'undefined'
    ? (requestAnimationFrame as NextTickFn)
    : (setTimeout as NextTickFn);

export async function nextTickAsync() {
  return new Promise<void>((resolve) => nextTickFn(resolve));
}
