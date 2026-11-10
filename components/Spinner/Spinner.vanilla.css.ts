import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { breakpoints } from '../../styles/breakpoints.css';
import { tokens } from '../../styles/tokens.css';

export const colorTokens = tokens.colors;

const spin = keyframes({
  to: { transform: 'rotate(360deg)' },
});

export const spinnerRecipe = recipe({
  base: {
    display: 'inline-flex',
    flexShrink: 0,
    verticalAlign: 'middle',
    color: tokens.colors.primary,
  },
  variants: {
    size: {
      small: { width: tokens.sizes['3'], height: tokens.sizes['3'] },
      medium: { width: tokens.sizes['5'], height: tokens.sizes['5'] },
      large: { width: tokens.sizes['6'], height: tokens.sizes['6'] },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export const svg = style({
  width: '100%',
  height: '100%',
  animation: `${spin} 1s linear infinite`,
  '@media': {
    // Slowed rather than stopped, so it still reads as busy.
    [breakpoints.motion]: { animationDuration: '3s' },
  },
});

export const track = style({
  opacity: 0.25,
});

export const hiddenLabel = style({
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
});
