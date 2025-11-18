import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '../../styles';

const flex = style({
  boxSizing: 'border-box',
  display: 'flex',
});

export const flexRecipe = recipe({
  base: flex,

  variants: {
    direction: {
      row: {
        flexDirection: 'row',
      },
      column: {
        flexDirection: 'column',
      },
      rowReverse: {
        flexDirection: 'row-reverse',
      },
      columnReverse: {
        flexDirection: 'column-reverse',
      },
    },
    align: {
      start: {
        alignItems: 'flex-start',
      },
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'flex-end',
      },
      stretch: {
        alignItems: 'stretch',
      },
      baseline: {
        alignItems: 'baseline',
      },
    },
    justify: {
      start: {
        justifyContent: 'flex-start',
      },
      center: {
        justifyContent: 'center',
      },
      end: {
        justifyContent: 'flex-end',
      },
      ['space-evenly']: {
        justifyContent: 'space-evenly',
      },
      ['space-between']: {
        justifyContent: 'space-between',
      },
      ['space-around']: {
        justifyContent: 'space-around',
      },
    },
    wrap: {
      noWrap: {
        flexWrap: 'nowrap',
      },
      wrap: {
        flexWrap: 'wrap',
      },
      wrapReverse: {
        flexWrap: 'wrap-reverse',
      },
    },
    gap: {
      1: {
        gap: tokens.space[1],
      },
      2: {
        gap: tokens.space[2],
      },
      3: {
        gap: tokens.space[3],
      },
      4: {
        gap: tokens.space[4],
      },
      5: {
        gap: tokens.space[5],
      },
      6: {
        gap: tokens.space[6],
      },
      7: {
        gap: tokens.space[7],
      },
      8: {
        gap: tokens.space[8],
      },
      9: {
        gap: tokens.space[9],
      },
    },
  },
  defaultVariants: {
    direction: 'row',
    align: 'stretch',
    justify: 'start',
    wrap: 'noWrap',
  },
});
