import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { breakpoints } from '../../styles/breakpoints.css';
import { tokens } from '../../styles/tokens.css';

// Elevation variants matching Elevation component
const elevationVariants = {
  0: {
    boxShadow: 'none',
  },
  1: {
    backgroundColor: tokens.colors['01dp'],
    boxShadow:
      '0 1px 5px 0 hsla(0, 0%, 0%, 0.2), 0 3px 1px -2px hsla(0, 0%, 0%, 0.12), 0 2px 2px 0 hsla(0, 0%, 0%, 0.14)',
  },
  2: {
    backgroundColor: tokens.colors['02dp'],
    boxShadow:
      '0 2px 4px -1px hsla(0, 0%, 0%, 0.2), 0 1px 10px 0 hsla(0, 0%, 0%, 0.12), 0 4px 5px 0 hsla(0, 0%, 0%, 0.14)',
  },
  3: {
    backgroundColor: tokens.colors['03dp'],
    boxShadow:
      '0 3px 5px -1px hsla(0, 0%, 0%, 0.2), 0 1px 18px 0 hsla(0, 0%, 0%, 0.12), 0 6px 10px 0 hsla(0, 0%, 0%, 0.14)',
  },
  4: {
    backgroundColor: tokens.colors['04dp'],
    boxShadow:
      '0 7px 8px -4px hsla(0, 0%, 0%, 0.2), 0 5px 22px 4px hsla(0, 0%, 0%, 0.12), 0 12px 17px 2px hsla(0, 0%, 0%, 0.14)',
  },
  5: {
    backgroundColor: tokens.colors['05dp'],
    boxShadow:
      '0 11px 15px -7px hsla(0, 0%, 0%, 0.2), 0 9px 46px 8px hsla(0, 0%, 0%, 0.12), 0 24px 38px 3px hsla(0, 0%, 0%, 0.14)',
  },
} as const;

// Base card styles
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

  '::before': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: tokens.radii['3'],
    pointerEvents: 'none',
  },
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
        boxShadow: 'none',
      },
    },
    active: {
      true: {
        '::before': {
          outline: `1px solid ${tokens.colors.cardActiveBorder}`,
          backgroundColor: tokens.colors.cardActiveBackground,
        },
      },
    },
  },

  defaultVariants: {
    elevation: 1,
  },
});

// Interactive card styles (for button element)
const interactiveCardBase = style([
  cardBase,
  {
    '@media': {
      [breakpoints.hover]: {
        selectors: {
          '&:hover': {
            cursor: 'pointer',
          },
          '&:hover::before': {
            outline: `1px solid ${tokens.colors.cardHoverBorder}`,
            backgroundColor: tokens.colors.cardHoverBackground,
          },
        },
      },
    },
    selectors: {
      '&:focus': {
        outline: `2px solid ${tokens.colors.primary}`,
      },
      '&:active::before': {
        outline: `1px solid ${tokens.colors.cardActiveBorder}`,
        backgroundColor: tokens.colors.cardActiveBackground,
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
        boxShadow: 'none',
      },
    },
    active: {
      true: {
        '::before': {
          outline: `1px solid ${tokens.colors.cardActiveBorder}`,
          backgroundColor: tokens.colors.cardActiveBackground,
        },
      },
    },
  },

  defaultVariants: {
    elevation: 1,
  },
});
