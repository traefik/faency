import { globalStyle, style } from '@vanilla-extract/css';

import { breakpoints } from '@/styles/breakpoints.css';
import { stateLayers } from '@/styles/stateLayers';
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
      backgroundColor: tokens.colors.inputBg,
    },
  },
});

globalStyle(`${wrapper}:hover ${firefoxPatch}`, {
  '@supports': {
    '(-moz-appearance: none)': {
      '@media': {
        [breakpoints.hover]: {
          backgroundImage: stateLayers(tokens.colors.primaryTint, tokens.colors.inputHoverBg),
        },
      },
    },
  },
});
