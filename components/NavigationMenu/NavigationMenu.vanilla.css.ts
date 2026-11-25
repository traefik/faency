import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '@/styles/tokens.css';

import { elevationVariants } from '@/components/Elevation/Elevation.vanilla.css';
import { navigationItem } from '@/components/Navigation/Navigation.vanilla.css';
import { panelStyle } from '@/components/Panel/Panel.vanilla.css';

export const navigationMenuList = style({
  margin: 0,
  padding: 0,
  listStyleType: 'none',
});

export const navigationMenuItem = style({
  position: 'relative',
  display: 'inline',
});

export const navigationMenuTrigger = style({
  backgroundColor: 'transparent',
  border: 'none',
});

export const navigationMenuContentRecipe = recipe({
  base: [
    panelStyle,
    {
      position: 'absolute',
      left: 0,
      zIndex: 1,
      padding: tokens.space['2'],
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

// Menu items stack without the gap they have in a drawer; `:where` keeps it easy to override.
globalStyle(
  `:where(${navigationMenuContentRecipe.classNames.base}) > ${navigationItem}`,
  { marginTop: 0 },
);
