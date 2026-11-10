import { globalStyle, style } from '@vanilla-extract/css';

import { tokens } from '../../styles/tokens.css';

export const adornmentGroup = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const invalidIcon = style({});

globalStyle(`${invalidIcon} + *`, {
  marginLeft: tokens.space['1'],
});

export const adornmentButton = style({
  appearance: 'none',
  background: 'none',
  border: 'none',
  padding: 0,
  font: 'inherit',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: tokens.radii['1'],
  color: 'inherit',
  cursor: 'pointer',
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${tokens.colors.inputFocusBorder}`,
      outlineOffset: '1px',
    },
  },
});
