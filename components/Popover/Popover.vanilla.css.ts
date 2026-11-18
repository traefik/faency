import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '@/styles/tokens.css';

import { elevationVariants } from '@/components/Elevation/Elevation.vanilla.css';
import { panelStyle } from '@/components/Panel/Panel.vanilla.css';

export const popoverContentRecipe = recipe({
  base: [
    panelStyle,
    {
      minWidth: 200,
      minHeight: tokens.sizes['6'],
      maxWidth: 265,
      color: tokens.colors.hiContrast,
      ':focus': {
        outline: 'none',
      },
    },
  ],

  variants: {
    elevation: elevationVariants,
  },

  defaultVariants: {
    elevation: 2,
  },
});

export const popoverArrowRecipe = recipe({
  base: {
    fill: 'currentColor',
  },

  variants: {
    elevation: {
      0: { fill: tokens.colors['00dp'] },
      1: { fill: tokens.colors['01dp'] },
      2: { fill: tokens.colors['02dp'] },
      3: { fill: tokens.colors['03dp'] },
      4: { fill: tokens.colors['04dp'] },
      5: { fill: tokens.colors['05dp'] },
    },
  },

  defaultVariants: {
    elevation: 2,
  },
});
