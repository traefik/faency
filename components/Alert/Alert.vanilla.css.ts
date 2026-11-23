import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '@/styles/tokens.css';

// CardVanilla's `::before` overlay carries the ring, leaving the element's box-shadow to elevation.
const ring = (color: string) => ({
  '::before': {
    boxShadow: `inset 0 0 0 1px ${color}`,
  },
});

export const alertRecipe = recipe({
  variants: {
    variant: {
      gray: ring(tokens.colors.toneNeutralSolid),
      info: ring(tokens.colors.toneInfoSolid),
      success: ring(tokens.colors.toneSuccessSolid),
      warning: ring(tokens.colors.toneWarningSolid),
      error: ring(tokens.colors.toneDangerSolid),
    },
  },

  defaultVariants: {
    variant: 'gray',
  },
});
