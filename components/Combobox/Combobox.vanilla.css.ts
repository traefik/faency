import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '../../styles/tokens.css';

export const comboboxAnchor = style({
  width: '100%',
});

export const comboboxContent = style({
  boxSizing: 'border-box',
  width: 'var(--radix-popover-trigger-width)',
  maxHeight: 'min(240px, var(--radix-popover-content-available-height))',
  overflowY: 'auto',
  padding: tokens.space['1'],
  backgroundColor: tokens.colors.cardBackground,
  border: `1px solid ${tokens.colors.comboboxContentBorder}`,
  borderRadius: tokens.radii['3'],
  fontFamily: tokens.fonts.rubik,
  outline: 'none',
});

export const comboboxListbox = style({
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const comboboxOptionRecipe = recipe({
  base: {
    paddingBlock: tokens.space['2'],
    paddingInline: tokens.space['2'],
    borderRadius: tokens.radii['2'],
    color: tokens.colors.hiContrast,
    lineHeight: 1.3,
    overflowWrap: 'anywhere',
    cursor: 'pointer',

    selectors: {
      '&[data-highlighted]': {
        backgroundColor: tokens.colors.comboboxOptionHighlightBg,
      },
    },
  },

  variants: {
    size: {
      small: { fontSize: tokens.fontSizes['1'] },
      medium: { fontSize: tokens.fontSizes['3'] },
      large: { fontSize: tokens.fontSizes['3'] },
    },
  },

  defaultVariants: {
    size: 'medium',
  },
});

export const comboboxEmptyRecipe = recipe({
  base: {
    paddingBlock: tokens.space['2'],
    paddingInline: tokens.space['2'],
    color: tokens.colors.textSubtle,
    lineHeight: 1.3,
  },

  variants: {
    size: {
      small: { fontSize: tokens.fontSizes['1'] },
      medium: { fontSize: tokens.fontSizes['3'] },
      large: { fontSize: tokens.fontSizes['3'] },
    },
  },

  defaultVariants: {
    size: 'medium',
  },
});
