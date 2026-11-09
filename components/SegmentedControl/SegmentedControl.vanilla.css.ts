import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { breakpoints } from '../../styles/breakpoints.css';
import { tokens } from '../../styles/tokens.css';

export const segmentedControlRecipe = recipe({
  base: {
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'stretch',
    border: `1px solid ${tokens.colors.segmentedControlBorder}`,
    borderRadius: tokens.radii['2'],
    overflow: 'hidden',
    fontFamily: tokens.fonts.rubik,
  },

  variants: {
    fullWidth: {
      true: { display: 'flex', width: '100%' },
      false: {},
    },
  },

  defaultVariants: {
    fullWidth: false,
  },
});

export const segmentedControlItemRecipe = recipe({
  base: {
    boxSizing: 'border-box',
    appearance: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.space['2'],
    margin: 0,
    border: 0,
    backgroundColor: 'transparent',
    color: tokens.colors.textSubtle,
    fontFamily: 'inherit',
    fontWeight: tokens.fontWeights.regular,
    lineHeight: 1.3,
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'background-color 120ms ease, color 120ms ease',

    selectors: {
      '& + &': {
        borderLeft: `1px solid ${tokens.colors.segmentedControlBorder}`,
      },
      '&:hover:not([data-state="checked"]):not([data-disabled])': {
        backgroundColor: tokens.colors.segmentedControlHoverBg,
      },
      '&[data-state="checked"]': {
        backgroundColor: tokens.colors.segmentedControlActiveBg,
        color: tokens.colors.segmentedControlActiveText,
      },
      '&:focus-visible': {
        outline: `2px solid ${tokens.colors.focusOutline}`,
        outlineOffset: '-2px',
      },
      '&[data-disabled]': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },

    '@media': {
      [breakpoints.motion]: {
        transition: 'none',
      },
    },
  },

  variants: {
    size: {
      small: {
        minHeight: tokens.sizes['5'],
        paddingInline: tokens.space['2'],
        fontSize: tokens.fontSizes['1'],
      },
      medium: {
        minHeight: tokens.sizes['6'],
        paddingInline: tokens.space['3'],
        fontSize: tokens.fontSizes['2'],
      },
      large: {
        minHeight: tokens.sizes['7'],
        paddingInline: tokens.space['3'],
        fontSize: tokens.fontSizes['3'],
      },
    },
    fullWidth: {
      true: { flex: '1 1 0', minWidth: 0, whiteSpace: 'normal' },
      false: { whiteSpace: 'nowrap' },
    },
  },

  defaultVariants: {
    size: 'medium',
    fullWidth: false,
  },
});

export type SegmentedControlSize = NonNullable<
  NonNullable<RecipeVariants<typeof segmentedControlItemRecipe>>['size']
>;
