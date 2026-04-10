function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Recursively merges two plain objects. Source properties win on conflict.
 * Nested plain objects are merged rather than replaced.
 * Arrays and non-plain values are always replaced by the source value.
 */
export function deepMerge<T extends Record<string, any>, S extends Record<string, any>>(
  target: T,
  source?: S | null,
): T & S {
  if (!source) return target as T & S;

  const result: Record<string, any> = { ...target };

  for (const key of Object.keys(source)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;
    const sourceVal = source[key];
    const targetVal = result[key];

    if (isPlainObject(sourceVal) && isPlainObject(targetVal)) {
      result[key] = deepMerge(targetVal, sourceVal);
    } else if (sourceVal !== undefined) {
      result[key] = sourceVal;
    }
  }

  return result as T & S;
}
