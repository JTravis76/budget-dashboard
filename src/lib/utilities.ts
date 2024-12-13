/** Sleep Timer
 * returns a Promise after a set amount of time.
 */
export function sleep<T>(t: number, d: T): Promise<T> {
  return new Promise((r) => window.setTimeout(() => r(d), t));
}