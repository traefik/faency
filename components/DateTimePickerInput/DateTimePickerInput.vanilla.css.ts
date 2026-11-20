import { globalStyle, style } from '@vanilla-extract/css';

import { breakpoints } from '@/styles/breakpoints.css';
import { tokens } from '@/styles/tokens.css';

export const wrapper = style({
  display: 'flex',
  position: 'relative',
  width: '100%',
});

export const input = style({});

export const popup = style({
  zIndex: tokens.zIndices.max,
});

export const arrow = style({
  fill: tokens.colors['01dp'],
});

globalStyle(`${input} input::-webkit-calendar-picker-indicator`, {
  display: 'none',
});

const pseudoLayer = {
  boxSizing: 'border-box',
  content: '""',
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
} as const;

// Firefox has no way to hide its native picker button, so cover it with a click target.
export const firefoxPatch = style({
  display: 'none',
  '@supports': {
    '(-moz-appearance: none)': {
      display: 'block',
      width: '20px',
      height: '20px',
      position: 'absolute',
      right: '17px',
      top: '6px',
      background: tokens.colors.inputBg,
      selectors: {
        '&::before': pseudoLayer,
        '&::after': pseudoLayer,
      },
    },
  },
});

globalStyle(`${wrapper}:hover ${firefoxPatch}::before`, {
  '@supports': {
    '(-moz-appearance: none)': {
      '@media': {
        [breakpoints.hover]: {
          backgroundColor: tokens.colors.inputHoverBg,
        },
      },
    },
  },
});

globalStyle(`${wrapper}:hover ${firefoxPatch}::after`, {
  '@supports': {
    '(-moz-appearance: none)': {
      '@media': {
        [breakpoints.hover]: {
          backgroundColor: tokens.colors.primary,
          opacity: 0.05,
        },
      },
    },
  },
});
