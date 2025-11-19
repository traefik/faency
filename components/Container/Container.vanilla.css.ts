import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '../../styles';

const container = style({
  boxSizing: 'border-box',
  flexShrink: 0,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: tokens.space[5],
  paddingRight: tokens.space[5],
});

export const containerRecipe = recipe({
  base: container,

  variants: {
    size: {
      '1': {
        maxWidth: '425px',
      },
      '2': {
        maxWidth: '768px',
      },
      '3': {
        maxWidth: '1440px',
      },
      '4': {
        maxWidth: 'none',
      },
    },
    noGutter: {
      true: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  },
  defaultVariants: {
    size: '4',
  },
});
