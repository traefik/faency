import { createVar, fallbackVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { breakpoints } from '@/styles/breakpoints.css';
import { stateLayers } from '@/styles/stateLayers';
import { tokens } from '@/styles/tokens.css';

// Lets Alert add an inset ring without replacing the elevation shadow.
export const cardRing = createVar();
const ring = fallbackVar(cardRing, '0 0 #0000');

const elevationVariants = {
  0: {
    boxShadow: ring,
  },
  1: {
    backgroundColor: tokens.colors['01dp'],
    boxShadow: `${ring}, 0 1px 5px 0 hsla(0, 0%, 0%, 0.2), 0 3px 1px -2px hsla(0, 0%, 0%, 0.12), 0 2px 2px 0 hsla(0, 0%, 0%, 0.14)`,
  },
  2: {
    backgroundColor: tokens.colors['02dp'],
    boxShadow: `${ring}, 0 2px 4px -1px hsla(0, 0%, 0%, 0.2), 0 1px 10px 0 hsla(0, 0%, 0%, 0.12), 0 4px 5px 0 hsla(0, 0%, 0%, 0.14)`,
  },
  3: {
    backgroundColor: tokens.colors['03dp'],
    boxShadow: `${ring}, 0 3px 5px -1px hsla(0, 0%, 0%, 0.2), 0 1px 18px 0 hsla(0, 0%, 0%, 0.12), 0 6px 10px 0 hsla(0, 0%, 0%, 0.14)`,
  },
  4: {
    backgroundColor: tokens.colors['04dp'],
    boxShadow: `${ring}, 0 7px 8px -4px hsla(0, 0%, 0%, 0.2), 0 5px 22px 4px hsla(0, 0%, 0%, 0.12), 0 12px 17px 2px hsla(0, 0%, 0%, 0.14)`,
  },
  5: {
    backgroundColor: tokens.colors['05dp'],
    boxShadow: `${ring}, 0 11px 15px -7px hsla(0, 0%, 0%, 0.2), 0 9px 46px 8px hsla(0, 0%, 0%, 0.12), 0 24px 38px 3px hsla(0, 0%, 0%, 0.14)`,
  },
} as const;

const cardBase = style({
  appearance: 'none',
  border: 'none',
  boxSizing: 'border-box',
  font: 'inherit',
  lineHeight: '1',
  outline: 'none',
  padding: tokens.space['3'],
  textAlign: 'inherit',
  verticalAlign: 'middle',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  backgroundColor: tokens.colors.cardBackground,
  display: 'block',
  textDecoration: 'none',
  color: 'inherit',
  borderRadius: tokens.radii['3'],
  position: 'relative',
});

export const cardRecipe = recipe({
  base: cardBase,

  variants: {
    elevation: elevationVariants,
    variant: {
      inner: {
        backgroundColor: tokens.colors.innerCardBgColor,
      },
      ghost: {
        backgroundColor: 'transparent',
        boxShadow: ring,
      },
    },
    active: {
      true: {
        outline: `1px solid ${tokens.colors.cardActiveBorder}`,
        backgroundImage: stateLayers(tokens.colors.cardActiveBackground),
      },
    },
  },

  defaultVariants: {
    elevation: 1,
  },
});

const interactiveCardBase = style([
  cardBase,
  {
    '@media': {
      [breakpoints.hover]: {
        selectors: {
          '&:hover': {
            cursor: 'pointer',
            outline: `1px solid ${tokens.colors.cardHoverBorder}`,
            backgroundImage: stateLayers(tokens.colors.cardHoverBackground),
          },
        },
      },
    },
    selectors: {
      '&:active': {
        outline: `1px solid ${tokens.colors.cardActiveBorder}`,
        backgroundImage: stateLayers(tokens.colors.cardActiveBackground),
      },
      // Beats the hover and active outlines.
      '&:focus, &:focus:hover, &:focus:active': {
        outline: `2px solid ${tokens.colors.primary}`,
      },
    },
  },
]);

export const interactiveCardRecipe = recipe({
  base: interactiveCardBase,

  variants: {
    elevation: elevationVariants,
    variant: {
      inner: {
        backgroundColor: tokens.colors.innerCardBgColor,
      },
      ghost: {
        backgroundColor: 'transparent',
        boxShadow: ring,
      },
    },
    active: {
      true: {
        outline: `1px solid ${tokens.colors.cardActiveBorder}`,
        backgroundImage: stateLayers(tokens.colors.cardActiveBackground),
      },
    },
  },

  defaultVariants: {
    elevation: 1,
  },
});
