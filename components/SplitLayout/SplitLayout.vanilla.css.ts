import { style } from '@vanilla-extract/css';

import { breakpoints } from '../../styles/breakpoints.css';
import { tokens } from '../../styles/tokens.css';

export const root = style({
  display: 'flex',
  alignItems: 'flex-start',
  minWidth: 0,
  selectors: {
    '&[data-stacked]': { display: 'block' },
  },
});

export const main = style({
  flex: 1,
  minWidth: 0,
});

export const aside = style({
  flexShrink: 0,
  minWidth: 0,
  selectors: {
    [`${root}[data-stacked] &`]: { marginTop: tokens.space['6'] },
  },
});

export const handle = style({
  flexShrink: 0,
  alignSelf: 'stretch',
  width: 33,
  display: 'flex',
  justifyContent: 'center',
  cursor: 'col-resize',
  touchAction: 'none',
  outline: 'none',
});

export const handleLine = style({
  width: 1,
  borderRadius: 2,
  backgroundColor: tokens.colors.divider,
  transition: 'width 120ms ease, background-color 120ms ease',
  selectors: {
    [`${handle}:hover &, ${handle}:focus-visible &`]: {
      width: 3,
      backgroundColor: tokens.colors.primary,
    },
  },
  '@media': {
    [breakpoints.motion]: { transition: 'none' },
  },
});
