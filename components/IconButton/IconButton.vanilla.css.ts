import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateLayers } from '@/styles/stateLayers';
import { tokens } from '@/styles/tokens.css';

const HOVER_LAYER = 'rgba(255, 255, 255, 0.15)';
const PRESSED_LAYER = 'rgba(0, 0, 0, 0.15)';

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

  selectors: {
    '&:disabled': {
      pointerEvents: 'none',
      opacity: 0.5,
    },
    '&:focus-visible': {
      outline: '2px solid currentColor',
      backgroundImage: stateLayers(HOVER_LAYER),
    },
    // `:hover:active` outranks the hover rules, which come later inside their media query.
    '&:active, &:hover:active': {
      backgroundImage: stateLayers(PRESSED_LAYER),
    },
  },

  '@media': {
    '(hover: hover)': {
      selectors: {
        '&:hover': {
          cursor: 'pointer',
          backgroundImage: stateLayers(HOVER_LAYER),
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
