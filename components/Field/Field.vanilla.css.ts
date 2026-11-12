import { globalStyle, style } from '@vanilla-extract/css';

import { tokens } from '../../styles/tokens.css';

export const endLabelRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.space['2'],
});

globalStyle(`${endLabelRow} > [role="switch"]`, {
  margin: 0,
});

export const startRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  columnGap: tokens.space['5'],
  rowGap: tokens.space['2'],
});

export const startLabel = style({
  flex: '1 1 0',
  minWidth: '10rem',
});

export const startControl = style({
  flex: '2 1 0',
  minWidth: '16rem',
});
