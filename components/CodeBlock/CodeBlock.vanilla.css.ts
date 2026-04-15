import { style } from '@vanilla-extract/css';

import { tokens } from '../../styles/tokens.css';

export const wrapper = style({
  position: 'relative',
});

export const pre = style({
  margin: 0,
  borderRadius: tokens.radii['2'],
  overflow: 'auto',
  border: `1px solid ${tokens.colors.deepBlue['3']}`,
  position: 'relative',
  fontSize: tokens.fontSizes['2'],
  lineHeight: '1.6',
});

export const preNoBorder = style({
  border: 'none',
});

export const codeContent = style({
  padding: tokens.space['4'],
});

export const copyButtonWrapper = style({
  position: 'absolute',
  right: tokens.space['4'],
  zIndex: 1,
});

export const copyButtonWrapperTop = style({
  top: tokens.space['2'],
});

export const copyButtonWrapperBottom = style({
  bottom: tokens.space['2'],
});
