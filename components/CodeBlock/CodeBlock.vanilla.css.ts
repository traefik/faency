import { style } from '@vanilla-extract/css';

import { tokens } from '../../styles/tokens.css';

export const pre = style({
  margin: 0,
  borderRadius: tokens.radii['2'],
  overflow: 'auto',
  border: `1px solid ${tokens.colors.deepBlue['3']}`,
  fontSize: tokens.fontSizes['2'],
  lineHeight: '1.6',
});

export const preNoBorder = style({
  border: 'none',
});

export const codeContent = style({
  padding: tokens.space['4'],
});

export const codeContentBottomPadding = style({
  paddingBottom: tokens.space['7'],
});

export const copyButtonWrapperTop = style({
  position: 'absolute',
  zIndex: 1,
  top: tokens.space['2'],
  right: tokens.space['3'],
});

export const copyButtonWrapperBottomRight = style({
  position: 'absolute',
  zIndex: 1,
  bottom: tokens.space['2'],
  right: tokens.space['3'],
});

export const copyButtonWrapperBottomLeft = style({
  position: 'absolute',
  zIndex: 1,
  bottom: tokens.space['2'],
  left: tokens.space['3'],
});
