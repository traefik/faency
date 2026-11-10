/**
 * Resolves `$name` against vanilla tokens first, then theme colors; any other value is returned as is.
 * `tokenColors` is passed in because `.css.ts` modules are mocked in Jest.
 */
export const resolveColor = (
  color: string,
  colors: Record<string, string>,
  tokenColors?: unknown,
): string => {
  if (!color.startsWith('$')) return color;
  const name = color.slice(1);
  const token = (tokenColors as Record<string, unknown> | undefined)?.[name];
  if (typeof token === 'string') return token;
  return colors[name] ?? color;
};
