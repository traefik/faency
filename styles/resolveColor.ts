import { tokens } from './tokens.css';

/**
 * Resolves `$name` to the vanilla token (a CSS variable, so overrides apply), then to the theme color.
 * Anything else, or an unknown name, is returned as is.
 */
export const resolveColor = (value: string, colors?: Record<string, unknown>): string => {
  if (!value.startsWith('$')) return value;

  const name = value.slice(1);
  const tokenColors: unknown = tokens.colors;
  const token =
    typeof tokenColors === 'object' && tokenColors !== null
      ? (tokenColors as Record<string, unknown>)[name]
      : undefined;
  if (typeof token === 'string') return token;

  const color = colors?.[name];
  return typeof color === 'string' ? color : value;
};
