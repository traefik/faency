import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { breakpoints } from '@/styles/breakpoints.css';
import { tokens } from '@/styles/tokens.css';

const FOCUS_SHADOW =
  '0 1px 5px 0 hsla(0, 0%, 0%, 0.2), 0 3px 1px -2px hsla(0, 0%, 0%, 0.12), 0 2px 2px 0 hsla(0, 0%, 0%, 0.14)';
const CARET_WIDTH = '15px';

const triggerLayer = {
  boxSizing: 'border-box',
  content: '""',
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  borderRadius: 'inherit',
} as const;

const triggerSize = (height: string, radius: string, fontSize: string, space: string) => ({
  height,
  borderRadius: radius,
  fontSize,
  paddingInlineStart: space,
  paddingInlineEnd: `calc(${space} / 2)`,
  gap: `calc(${space} / 2)`,
});

export const selectTriggerRecipe = recipe({
  base: {
    appearance: 'none',
    border: 'none',
    margin: 0,
    outline: 'none',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    boxSizing: 'border-box',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    minWidth: 0,
    backgroundColor: tokens.colors.selectBg,
    boxShadow: `inset 0 0 0 1px ${tokens.colors.selectBorder}`,
    color: tokens.colors.selectText,
    fontFamily: tokens.fonts.rubik,
    fontVariantNumeric: 'tabular-nums',
    fontWeight: tokens.fontWeights.regular,
    textAlign: 'start',
    cursor: 'default',

    selectors: {
      '&::before': triggerLayer,
      '&::after': triggerLayer,
      '&[data-placeholder]': {
        color: tokens.colors.selectPlaceholder,
      },
      '&:focus-visible': {
        boxShadow: `inset 0 0 0 2px ${tokens.colors.selectFocusBorder}, ${FOCUS_SHADOW}`,
      },
      '&:disabled': {
        pointerEvents: 'none',
        opacity: 0.7,
        color: tokens.colors.selectDisabledText,
      },
    },

    '@media': {
      [breakpoints.hover]: {
        selectors: {
          '&:hover::before': {
            backgroundColor: tokens.colors.selectHoverBg,
          },
          '&:hover::after': {
            backgroundColor: tokens.colors.primary,
            opacity: 0.05,
          },
        },
      },
    },
  },

  variants: {
    size: {
      small: triggerSize(
        tokens.sizes['5'],
        tokens.radii['2'],
        tokens.fontSizes['1'],
        tokens.space['2'],
      ),
      medium: triggerSize(
        tokens.sizes['6'],
        tokens.radii['3'],
        tokens.fontSizes['3'],
        tokens.space['3'],
      ),
      large: triggerSize(
        tokens.sizes['7'],
        tokens.radii['3'],
        tokens.fontSizes['3'],
        tokens.space['3'],
      ),
    },
    variant: {
      ghost: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        selectors: {
          '&:focus-visible': {
            backgroundColor: tokens.colors.loContrast,
            boxShadow: `inset 0 0 0 1px ${tokens.colors.selectFocusBorder}, 0 0 0 1px ${tokens.colors.selectFocusBorder}`,
          },
        },
        '@media': {
          [breakpoints.hover]: {
            selectors: {
              '&:hover': {
                boxShadow: `inset 0 0 0 1px ${tokens.colors.slate.A7}`,
                backgroundColor: tokens.colors.selectHoverBg,
              },
            },
          },
        },
      },
    },
    state: {
      invalid: {
        boxShadow: `inset 0 0 0 1px ${tokens.colors.selectInvalidBorder}`,
        selectors: {
          '&:focus-visible': {
            boxShadow: `inset 0 0 0 2px ${tokens.colors.selectInvalidBorder}, ${FOCUS_SHADOW}`,
          },
        },
      },
    },
  },

  defaultVariants: {
    size: 'medium',
  },
});

export const selectValue = style({
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

export const selectIcon = style({
  flexShrink: 0,
  width: CARET_WIDTH,
  height: CARET_WIDTH,
});

export const selectContent = style({
  zIndex: tokens.zIndices.max,
  boxSizing: 'border-box',
  width: 'var(--radix-select-trigger-width)',
  maxHeight: 'min(320px, var(--radix-select-content-available-height))',
  overflow: 'hidden',
  backgroundColor: tokens.colors.cardBackground,
  border: `1px solid ${tokens.colors.comboboxContentBorder}`,
  borderRadius: tokens.radii['3'],
  fontFamily: tokens.fonts.rubik,
  outline: 'none',
});

export const selectViewport = style({
  padding: tokens.space['1'],
});

export const selectScrollButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: tokens.sizes['5'],
  color: tokens.colors.textSubtle,
  cursor: 'default',
});

const textSizeVariants = {
  small: { fontSize: tokens.fontSizes['1'] },
  medium: { fontSize: tokens.fontSizes['3'] },
  large: { fontSize: tokens.fontSizes['3'] },
};

export const selectItemRecipe = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space['2'],
    paddingBlock: tokens.space['2'],
    paddingInline: tokens.space['2'],
    borderRadius: tokens.radii['2'],
    color: tokens.colors.hiContrast,
    lineHeight: 1.3,
    outline: 'none',
    userSelect: 'none',
    cursor: 'pointer',

    selectors: {
      '&[data-highlighted]': {
        backgroundColor: tokens.colors.comboboxOptionHighlightBg,
      },
      '&[data-disabled]': {
        color: tokens.colors.textSubtle,
        opacity: 0.7,
        cursor: 'default',
      },
    },
  },

  variants: {
    size: textSizeVariants,
  },

  defaultVariants: {
    size: 'medium',
  },
});

export const selectItemContent = style({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  overflowWrap: 'anywhere',
});

export const selectItemDescriptionRecipe = recipe({
  base: {
    color: tokens.colors.textSubtle,
  },

  variants: {
    size: {
      small: { fontSize: tokens.fontSizes['0'] },
      medium: { fontSize: tokens.fontSizes['1'] },
      large: { fontSize: tokens.fontSizes['1'] },
    },
  },

  defaultVariants: {
    size: 'medium',
  },
});

export const selectItemIndicator = style({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: CARET_WIDTH,
  height: CARET_WIDTH,
});

export const selectLabelRecipe = recipe({
  base: {
    paddingBlock: tokens.space['1'],
    paddingInline: tokens.space['2'],
    color: tokens.colors.textSubtle,
    fontWeight: tokens.fontWeights.medium,
    lineHeight: 1.3,
  },

  variants: {
    size: {
      small: { fontSize: tokens.fontSizes['0'] },
      medium: { fontSize: tokens.fontSizes['1'] },
      large: { fontSize: tokens.fontSizes['1'] },
    },
  },

  defaultVariants: {
    size: 'medium',
  },
});

export const selectSeparator = style({
  height: 1,
  marginBlock: tokens.space['1'],
  backgroundColor: tokens.colors.divider,
});
