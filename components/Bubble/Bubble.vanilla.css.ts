import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '../../styles/tokens.css';

const bip = keyframes({
  '0%': {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 1,
  },
  '100%': {
    top: -8,
    right: -8,
    bottom: -8,
    left: -8,
    opacity: 0,
  },
});

const baseBubble = style({
  display: 'inline-block',
  width: tokens.sizes['4'],
  height: tokens.sizes['4'],
  backgroundColor: tokens.colors.red['8'],
  borderRadius: '50%',
  position: 'relative',

  selectors: {
    '&::before': {
      animation: `${bip} 1s ease infinite`,
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.5)',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: -1,
    },
    '&::after': {
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      top: 5,
      right: 5,
      bottom: 5,
      left: 5,
      backgroundColor: 'rgba(255,255,255,.1)',
      borderRadius: '50%',
      pointerEvents: 'none',
    },
  },
});

export const bubbleRecipe = recipe({
  base: baseBubble,

  variants: {
    variant: {
      red: {
        backgroundColor: tokens.colors.red['8'],
        selectors: {
          '&::before': { backgroundColor: tokens.colors.red['8'] },
        },
      },
      green: {
        backgroundColor: tokens.colors.green['8'],
        selectors: {
          '&::before': { backgroundColor: tokens.colors.green['8'] },
        },
      },
      orange: {
        backgroundColor: tokens.colors.orange['8'],
        selectors: {
          '&::before': { backgroundColor: tokens.colors.orange['8'] },
        },
      },
      blue: {
        backgroundColor: tokens.colors.blue['8'],
        selectors: {
          '&::before': { backgroundColor: tokens.colors.blue['8'] },
        },
      },
      yellow: {
        backgroundColor: tokens.colors.neon['8'],
        selectors: {
          '&::before': { backgroundColor: tokens.colors.neon['8'] },
        },
      },
      purple: {
        backgroundColor: tokens.colors.purple['8'],
        selectors: {
          '&::before': { backgroundColor: tokens.colors.purple['8'] },
        },
      },
      gray: {
        backgroundColor: tokens.colors.slate['8'],
        selectors: {
          '&::before': { backgroundColor: tokens.colors.slate['8'] },
        },
      },
    },
    size: {
      'x-small': {
        width: tokens.sizes['1'],
        height: tokens.sizes['1'],
      },
      small: {
        width: tokens.sizes['2'],
        height: tokens.sizes['2'],
      },
      medium: {
        width: tokens.sizes['3'],
        height: tokens.sizes['3'],
      },
      large: {
        width: tokens.sizes['4'],
        height: tokens.sizes['4'],
      },
      'x-large': {
        width: tokens.sizes['5'],
        height: tokens.sizes['5'],
      },
    },
    noAnimation: {
      true: {
        selectors: {
          '&::before': { content: 'none' },
        },
      },
    },
  },

  defaultVariants: {
    size: 'small',
    noAnimation: false,
  },
});
