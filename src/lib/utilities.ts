/** Sleep Timer
 * returns a Promise after a set amount of time.
 */
export function sleep<T>(t: number, d: T): Promise<T> {
  return new Promise((r) => window.setTimeout(() => r(d), t));
}


// Note: PropertyKey is a builtIn type alias of
// type PropertyKey = string | number | symbol
// This lets us use "Record<PropertyKey, any>" to represent any object
// but is slightly nicer to use than the "object" type
export function groupBy<T extends Record<PropertyKey, any>>(
  arr: T[],
  key: keyof T,
): any {
  return arr.reduce((accumulator, val) => {
    const groupedKey = val[key];
    if (!accumulator[groupedKey]) {
      accumulator[groupedKey] = [];
    }
    accumulator[groupedKey].push(val);
    return accumulator;
  }, {} as any);
}

// Note: PropertyKey is a builtIn type alias of
// type PropertyKey = string | number | symbol
// This lets us use "Record<PropertyKey, any>" to represent any object
// but is slightly nicer to use than the "object" type
export function sortBy<T extends Record<PropertyKey, any>>(
  arr: T[],
  key1: keyof T,
  key2: keyof T,
): T[] {
  return arr.sort((a, b) => {
    if (a[key1] > b[key1]) return 1;
    if (a[key1] < b[key1]) return -1;

    const c = parseInt(a[key2]?.toString(), 10);
    const d = parseInt(b[key2]?.toString(), 10);
    if (c > d) return 1;
    if (c < d) return -1;

    return 0;
  });
}

/** Fetches the sum based on the selected key */
export function sumBy<T extends Record<PropertyKey, any>>(
  arr: T[],
  key: keyof T,
) {
  let result = 0;
  arr.forEach((x) => {
    if (typeof x[key] === "string") {
      result += parseFloat(x[key]);
    }
    else {
      result += x[key];
    }
  });
  return result;
}

/** Set between light and dark theme */
export function setTheme(dark: boolean = false) {
  const root = document.getElementsByTagName('html')[0] as HTMLHtmlElement;
  root.className = dark ? "theme-dark js" : "theme-light js";
}