import { globalStyle, GlobalStyleRule, style } from '@vanilla-extract/css';

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

const inFirefox = (rule: GlobalStyleRule) => ({ '@supports': { '(-moz-appearance: none)': rule } });
const onHover = (rule: GlobalStyleRule) => inFirefox({ '@media': { [breakpoints.hover]: rule } });

// Direct child only: adornments render inside the same wrapper and may hold inputs of their own.
const field = `${input} > input`;

globalStyle(
  `${wrapper}:hover ${firefoxPatch}`,
  onHover({ backgroundImage: stateLayers(tokens.colors.primaryTint, tokens.colors.inputHoverBg) }),
);

globalStyle(
  `${wrapper}:hover:has(${field}[aria-invalid="true"]) ${firefoxPatch}`,
  onHover({
    backgroundImage: stateLayers(tokens.colors.inputInvalidHoverTint, tokens.colors.inputHoverBg),
  }),
);

// Dimmed like the Input wrapper, and not clickable, so it can't open the picker.
globalStyle(
  `${wrapper}:has(${field}:disabled) ${firefoxPatch}`,
  inFirefox({ opacity: 0.7, pointerEvents: 'none' }),
);

// Declared after the invalid rule, with the same specificity, so it wins.
globalStyle(
  `${wrapper}:hover:has(${field}:disabled) ${firefoxPatch}`,
  onHover({ backgroundImage: 'none' }),
);
