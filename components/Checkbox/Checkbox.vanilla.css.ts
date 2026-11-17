import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '@/styles/tokens.css';

export const checkboxIndicator = style({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  width: '100%',
});

export const checkboxCheckIcon = style({
  selectors: {
    '[data-state=indeterminate] > &': {
      display: 'none',
    },
  },
});

export const checkboxIndeterminateIcon = style({
  selectors: {
    '[data-state=checked] > &': {
      display: 'none',
    },
  },
});

export const checkboxRecipe = recipe({
  base: {
    all: 'unset',
    border: 'none',
    boxSizing: 'border-box',
    userSelect: 'none',
    alignItems: 'center',
    appearance: 'none',
    display: 'inline-flex',
    justifyContent: 'center',
    lineHeight: '1',
    margin: '0',
    outline: 'none',
    padding: '0',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    overflow: 'hidden',

    selectors: {
      '&::before': {
        boxSizing: 'border-box',
      },
      '&::after': {
        boxSizing: 'border-box',
      },
      '&[data-state=checked], &[data-state=indeterminate]': {
        backgroundColor: tokens.colors.checkboxCheckedBg,
        boxShadow: 'inset 0 0 0 1px transparent',
        color: tokens.colors.checkboxCheckedIcon,
      },
      '&[data-state=unchecked]': {
        backgroundColor: tokens.colors.checkboxBg,
        boxShadow: `inset 0 0 0 1px ${tokens.colors.checkboxBorder}`,
        color: tokens.colors.checkboxIcon,
      },
      '&[aria-invalid="true"][data-state=unchecked]:not(:focus-visible)': {
        boxShadow: `inset 0 0 0 1px ${tokens.colors.checkboxInvalidBorder}`,
      },
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `inset 0 0 0 1px ${tokens.colors.checkboxFocusBorder}, 0 0 0 1px ${tokens.colors.checkboxFocusBorder}`,
      },
      '&:disabled': {
        pointerEvents: 'none',
        backgroundColor: tokens.colors.checkboxDisabledBg,
        boxShadow: `inset 0 0 0 1px ${tokens.colors.checkboxDisabledBorder}`,
        color: tokens.colors.checkboxDisabledIcon,
      },
    },

    '@media': {
      '(any-hover: hover)': {
        selectors: {
          '&[data-state=checked]:hover, &[data-state=indeterminate]:hover': {
            backgroundColor: tokens.colors.checkboxCheckedHoverBg,
          },
          '&[data-state=unchecked]:hover': {
            backgroundColor: tokens.colors.checkboxHoverBg,
            boxShadow: `inset 0 0 0 1px ${tokens.colors.checkboxHoverBorder}`,
          },
        },
      },
    },
  },

  variants: {
    size: {
      medium: {
        width: 18,
        height: 18,
        borderRadius: tokens.radii['2'],
      },
      large: {
        width: tokens.sizes['5'],
        height: tokens.sizes['5'],
        borderRadius: tokens.radii['3'],
      },
    },
  },

  defaultVariants: {
    size: 'medium',
  },
});
