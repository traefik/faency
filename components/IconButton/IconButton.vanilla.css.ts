import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { tokens } from '../../styles/tokens.css';

// Base button styles (matching BUTTON_BASE_STYLES from Button component)
const baseIconButton = style({
  // Reset
  appearance: 'none',
  userSelect: 'none',
  boxSizing: 'border-box',
  border: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  // Layout
  alignItems: 'center',
  display: 'inline-flex',
  flexShrink: 0,
  justifyContent: 'center',
  position: 'relative',
  padding: '0',

  // Typography
  fontFamily: 'inherit',
  fontSize: '14px',
  lineHeight: '1',

  // Custom
  textDecoration: 'none',
  backgroundColor: 'transparent',

  // Pseudo-elements for hover/active effects
  selectors: {
    '&::before': {
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
    },
    '&::after': {
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: 'inherit',
    },
    '&:disabled': {
      pointerEvents: 'none',
      opacity: 0.5,
    },
    '&:focus-visible': {
      outline: '2px solid currentColor',
    },
    '&:focus-visible::before': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    '&:focus-visible::after': {
      opacity: 0.15,
    },
    '&:active::before': {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
    },
  },

  '@media': {
    '(hover: hover)': {
      selectors: {
        '&:hover': {
          cursor: 'pointer',
        },
        '&:hover::before': {
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
        },
        '&:hover::after': {
          opacity: 0.05,
        },
      },
    },
  },
});

export const iconButtonRecipe = recipe({
  base: baseIconButton,

  variants: {
    size: {
      '1': {
        borderRadius: tokens.radii['1'],
        height: tokens.sizes['5'],
        width: tokens.sizes['5'],
      },
      '2': {
        borderRadius: tokens.radii['2'],
        height: tokens.sizes['6'],
        width: tokens.sizes['6'],
      },
      '3': {
        borderRadius: tokens.radii['2'],
        height: tokens.sizes['7'],
        width: tokens.sizes['7'],
      },
      '4': {
        borderRadius: tokens.radii['3'],
        height: tokens.sizes['8'],
        width: tokens.sizes['8'],
      },
    },
    variant: {
      default: {
        color: tokens.colors.slate['10'],
      },
      contrast: {
        color: tokens.colors.hiContrast,
      },
      primary: {
        color: tokens.colors.primary,
      },
      red: {
        color: tokens.colors.red['9'],
      },
      green: {
        color: tokens.colors.green['9'],
      },
      orange: {
        color: tokens.colors.orange['9'],
      },
    },
  },

  defaultVariants: {
    variant: 'default',
    size: '2',
  },
});

export type IconButtonRecipeVariants = RecipeVariants<typeof iconButtonRecipe>;
