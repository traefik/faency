import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '../../styles/tokens.css';

const avatarRoot = style({
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  boxSizing: 'border-box',
  display: 'flex',
  flexShrink: 0,
  position: 'relative',
  border: 'none',
  fontFamily: 'inherit',
  lineHeight: '1',
  margin: '0',
  outline: 'none',
  padding: '0',
  fontWeight: tokens.fontWeights.medium,
  color: tokens.colors.hiContrast,

  selectors: {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      borderRadius: 'inherit',
      boxShadow: 'inset 0px 0px 1px rgba(0, 0, 0, 0.12)',
    },
  },
});

export const avatarRecipe = recipe({
  base: avatarRoot,

  variants: {
    size: {
      '1': {
        width: tokens.sizes['3'],
        height: tokens.sizes['3'],
      },
      '2': {
        width: tokens.sizes['5'],
        height: tokens.sizes['5'],
      },
      '3': {
        width: tokens.sizes['6'],
        height: tokens.sizes['6'],
      },
      '4': {
        width: tokens.sizes['7'],
        height: tokens.sizes['7'],
      },
      '5': {
        width: tokens.sizes['8'],
        height: tokens.sizes['8'],
      },
      '6': {
        width: tokens.sizes['9'],
        height: tokens.sizes['9'],
      },
    },
    variant: {
      gray: {
        backgroundColor: tokens.colors.slate['5'],
      },
      red: {
        backgroundColor: tokens.colors.red['5'],
      },
      purple: {
        backgroundColor: tokens.colors.purple['5'],
      },
      blue: {
        backgroundColor: tokens.colors.blue['5'],
      },
      green: {
        backgroundColor: tokens.colors.green['5'],
      },
      orange: {
        backgroundColor: tokens.colors.orange['5'],
      },
    },
    shape: {
      square: {
        borderRadius: tokens.radii['2'],
      },
      circle: {
        borderRadius: '50%',
      },
    },
  },

  defaultVariants: {
    size: '2',
    variant: 'gray',
    shape: 'circle',
  },
});

export const avatarImage = style({
  display: 'flex',
  objectFit: 'cover',
  boxSizing: 'border-box',
  height: '100%',
  verticalAlign: 'middle',
  width: '100%',
});

const avatarFallbackBase = style({
  textTransform: 'uppercase',
  fontFamily: tokens.fonts.rubik,
  color: tokens.colors.deepBlue['10'],
});

export const avatarFallbackRecipe = recipe({
  base: avatarFallbackBase,

  variants: {
    size: {
      '1': {
        fontSize: '10px',
        lineHeight: '15px',
      },
      '2': {
        fontSize: tokens.fontSizes['3'],
      },
      '3': {
        fontSize: tokens.fontSizes['6'],
      },
      '4': {
        fontSize: tokens.fontSizes['7'],
      },
      '5': {
        fontSize: tokens.fontSizes['8'],
      },
      '6': {
        fontSize: tokens.fontSizes['9'],
      },
    },
  },

  defaultVariants: {
    size: '2',
  },
});
