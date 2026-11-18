import { globalStyle, style, StyleRule } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '@/styles/tokens.css';

export const radioGroup = style({
  display: 'flex',
});

export const radioIndicator = style({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  width: '100%',
  position: 'relative',

  selectors: {
    '&::after': {
      content: '""',
      display: 'block',
      width: '7px',
      height: '7px',
      borderRadius: tokens.radii.round,
      backgroundColor: tokens.colors.contentBg,
    },
  },
});

export const radioBase: StyleRule = {
  all: 'unset',
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
  textDecoration: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  borderRadius: '50%',
  color: tokens.colors.hiContrast,
  boxShadow: `inset 0 0 0 1px ${tokens.colors.radioBorder}`,
  overflow: 'hidden',

  selectors: {
    '&::before': {
      boxSizing: 'border-box',
    },
    '&::after': {
      boxSizing: 'border-box',
    },
    '&[data-state=checked]': {
      backgroundColor: tokens.colors.radioIndicator,
    },
  },
};

const radioItem = style([
  radioBase,
  {
    selectors: {
      '[role="radiogroup"][aria-invalid="true"] &:not(:focus-visible)': {
        boxShadow: `inset 0 0 0 1px ${tokens.colors.radioInvalidBorder}`,
      },
      '&:focus-visible': {
        outline: 'none',
        boxShadow: `inset 0 0 0 1px ${tokens.colors.radioFocusBorder}, 0 0 0 1px ${tokens.colors.radioFocusBorder}`,
      },
      '&:disabled': {
        pointerEvents: 'none',
      },
      '&:disabled[data-state=checked]': {
        backgroundColor: tokens.colors.radioIndicatorDisabledBg,
      },
    },

    '@media': {
      '(any-hover: hover)': {
        selectors: {
          '&:hover': {
            cursor: 'pointer',
            boxShadow: `inset 0 0 0 1px ${tokens.colors.radioHoverBorder}`,
          },
        },
      },
    },
  },
]);

globalStyle(`${radioItem}:disabled ${radioIndicator}::after`, {
  backgroundColor: tokens.colors.radioDisabledBg,
});

const radioSizeLarge = style({
  width: tokens.sizes['5'],
  height: tokens.sizes['5'],
});

globalStyle(`${radioSizeLarge} ${radioIndicator}::after`, {
  width: tokens.sizes['3'],
  height: tokens.sizes['3'],
});

export const radioRecipe = recipe({
  base: radioItem,

  variants: {
    size: {
      '1': {
        width: tokens.sizes['3'],
        height: tokens.sizes['3'],
      },
      '2': radioSizeLarge,
    },
  },

  defaultVariants: {
    size: '1',
  },
});
