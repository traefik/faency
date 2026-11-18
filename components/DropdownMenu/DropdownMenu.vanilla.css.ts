import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '@/styles/tokens.css';

import { elevationVariants } from '@/components/Elevation/Elevation.vanilla.css';
import { panelStyle } from '@/components/Panel/Panel.vanilla.css';

const baseItem = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontFamily: tokens.fonts.rubik,
  fontSize: tokens.fontSizes['1'],
  fontVariantNumeric: 'tabular-nums',
  lineHeight: '1',
  cursor: 'default',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  height: tokens.sizes['5'],
  paddingInline: tokens.space['5'],
} as const;

export const dropdownMenuContentRecipe = recipe({
  base: [
    panelStyle,
    {
      boxSizing: 'border-box',
      minWidth: 120,
      paddingBlock: tokens.space['1'],
      zIndex: tokens.zIndices.max,
    },
  ],

  variants: {
    elevation: elevationVariants,
  },

  defaultVariants: {
    elevation: 2,
  },
});

export const dropdownMenuItem = style({
  ...baseItem,
  position: 'relative',
  color: tokens.colors.hiContrast,
  outline: 'none',

  selectors: {
    '&[data-highlighted]': {
      backgroundColor: tokens.colors.blue['9'],
      color: 'white',
    },
    '&[data-disabled]': {
      color: tokens.colors.slate['9'],
    },
  },
});

export const dropdownMenuLabel = style({
  ...baseItem,
  color: tokens.colors.slate['11'],
});

export const dropdownMenuSeparator = style({
  height: 1,
  marginBlock: tokens.space['1'],
  backgroundColor: tokens.colors.slate['6'],
});

export const dropdownMenuItemIndicator = style({
  boxSizing: 'border-box',
  position: 'absolute',
  left: tokens.space['1'],
});

export const dropdownMenuRadioIndicator = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: tokens.sizes['3'],
  height: tokens.sizes['3'],
});

export const dropdownMenuRadioDot = style({
  width: tokens.sizes['1'],
  height: tokens.sizes['1'],
  backgroundColor: 'currentColor',
  borderRadius: tokens.radii.round,
});
