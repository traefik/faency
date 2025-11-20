import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '../../styles';

const grid = style({
  boxSizing: 'border-box',
  display: 'grid',
});

export const gridRecipe = recipe({
  base: grid,

  variants: {
    align: {
      start: {
        alignItems: 'start',
      },
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'end',
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
        justifyContent: 'start',
      },
      center: {
        justifyContent: 'center',
      },
      end: {
        justifyContent: 'end',
      },
      between: {
        justifyContent: 'space-between',
      },
    },
    flow: {
      row: {
        gridAutoFlow: 'row',
      },
      column: {
        gridAutoFlow: 'column',
      },
      dense: {
        gridAutoFlow: 'dense',
      },
      rowDense: {
        gridAutoFlow: 'row dense',
      },
      columnDense: {
        gridAutoFlow: 'column dense',
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
    gapX: {
      1: {
        columnGap: tokens.space[1],
      },
      2: {
        columnGap: tokens.space[2],
      },
      3: {
        columnGap: tokens.space[3],
      },
      4: {
        columnGap: tokens.space[4],
      },
      5: {
        columnGap: tokens.space[5],
      },
      6: {
        columnGap: tokens.space[6],
      },
      7: {
        columnGap: tokens.space[7],
      },
      8: {
        columnGap: tokens.space[8],
      },
      9: {
        columnGap: tokens.space[9],
      },
    },
    gapY: {
      1: {
        rowGap: tokens.space[1],
      },
      2: {
        rowGap: tokens.space[2],
      },
      3: {
        rowGap: tokens.space[3],
      },
      4: {
        rowGap: tokens.space[4],
      },
      5: {
        rowGap: tokens.space[5],
      },
      6: {
        rowGap: tokens.space[6],
      },
      7: {
        rowGap: tokens.space[7],
      },
      8: {
        rowGap: tokens.space[8],
      },
      9: {
        rowGap: tokens.space[9],
      },
    },
  },
});
