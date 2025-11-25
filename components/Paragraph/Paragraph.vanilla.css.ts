import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '../../styles/tokens.css';

const bp2 = '(min-width: 900px) and (max-width: 1199px)';

// Base text styles (from Text component)
const paragraphBase = style({
  lineHeight: '1',
  margin: '0',
  fontFamily: tokens.fonts.rubik,
  fontVariantNumeric: 'tabular-nums',
  display: 'inline-block',
});

export const paragraphRecipe = recipe({
  base: paragraphBase,

  variants: {
    size: {
      '1': {
        fontSize: tokens.fontSizes['3'],
        color: tokens.colors.textDefault,
        lineHeight: '25px',
        '@media': {
          [bp2]: {
            fontSize: tokens.fontSizes['4'],
            lineHeight: '27px',
          },
        },
      },
      '2': {
        fontSize: tokens.fontSizes['5'],
        color: tokens.colors.slate[11],
        lineHeight: '27px',
        '@media': {
          [bp2]: {
            fontSize: tokens.fontSizes['6'],
            lineHeight: '30px',
          },
        },
      },
    },
  },

  defaultVariants: {
    size: '1',
  },
});
