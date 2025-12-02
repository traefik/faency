import { style } from '@vanilla-extract/css';

import { tokens } from '../../styles/tokens.css';

export const panelStyle = style({
  backgroundColor: tokens.colors.deepBlue['3'],
  borderRadius: tokens.radii['3'],
});
