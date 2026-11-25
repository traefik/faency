import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '@/styles/tokens.css';

export const tooltipContentRecipe = recipe({
  base: {
    color: tokens.colors.tooltipText,
    backgroundColor: tokens.colors.tooltipContentBg,
    borderRadius: tokens.radii['3'],
    padding: tokens.space['2'],
  },

  variants: {
    multiline: {
      true: {
        maxWidth: 250,
        paddingBottom: 7,
      },
    },
  },
});

export const tooltipArrow = style({
  fill: tokens.colors.tooltipContentBg,
});
