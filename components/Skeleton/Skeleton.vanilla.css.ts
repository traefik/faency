import { globalStyle, keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '../../styles/tokens.css';

const pulse = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const skeletonBase = style({
  backgroundColor: tokens.colors.skeletonBackground,
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '3px',
  height: 'auto',
  width: 'auto',

  selectors: {
    '&:not(:empty)': {
      maxWidth: 'fit-content',
    },
  },

  '::after': {
    animationName: pulse,
    animationDuration: '500ms',
    animationDirection: 'alternate',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
    backgroundColor: tokens.colors.skeletonAnimation,
    borderRadius: 'inherit',
    bottom: 0,
    content: '""',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

// Global styles for child elements inside skeleton
globalStyle(`${skeletonBase}:not(:empty) > *`, {
  visibility: 'hidden',
  display: 'block',
});

export const skeletonRecipe = recipe({
  base: skeletonBase,

  variants: {
    variant: {
      square: {
        borderRadius: tokens.radii['2'],
      },
      circle: {
        borderRadius: tokens.radii.round,
      },
      badge: {
        borderRadius: tokens.radii.pill,
        display: 'inline-flex',
      },
      button: {
        borderRadius: tokens.radii['3'],
        display: 'inline-flex',
      },
      text: {
        selectors: {
          '&:empty::before': {
            content: '"\\00a0"',
          },
        },
      },
    },
  },

  defaultVariants: {
    variant: 'text',
  },
});
