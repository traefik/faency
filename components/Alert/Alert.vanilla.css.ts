import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '@/styles/tokens.css';

import { cardRing } from '@/components/Card/Card.vanilla.css';

const ring = (color: string) => ({
  vars: { [cardRing]: `inset 0 0 0 1px ${color}` },
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
