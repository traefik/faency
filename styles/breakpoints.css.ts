/**
 * Breakpoint definitions matching stitches.config.ts media queries
 * Used for responsive styling in vanilla-extract components
 */

export const breakpoints = {
  bp1: '(min-width: 520px) and (max-width: 899px)',
  bp2: '(min-width: 900px) and (max-width: 1199px)',
  bp3: '(min-width: 1200px) and (max-width: 1799px)',
  bp4: '(min-width: 1800px)',
  motion: '(prefers-reduced-motion)',
  hover: '(any-hover: hover)',
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
} as const;
