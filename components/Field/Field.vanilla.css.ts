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
