import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { breakpoints } from '../../styles/breakpoints.css';
import { tokens } from '../../styles/tokens.css';

// CONSTANTS
const FOCUS_SHADOW =
  '0 1px 5px 0 hsla(0, 0%, 0%, 0.2), 0 3px 1px -2px hsla(0, 0%, 0%, 0.12), 0 2px 2px 0 hsla(0, 0%, 0%, 0.14)';

const styledTextareaBase = style({
  // Reset
  appearance: 'none',
  overflow: 'auto',
  borderWidth: '0',
  boxSizing: 'border-box',
  fontFamily: tokens.fonts.rubik,
  margin: '0',
  outline: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  // Custom
  padding: tokens.space['3'],
  position: 'relative',
  flexGrow: 1,
  backgroundColor: 'transparent',
  borderRadius: 'inherit',
  boxShadow: `inset 0 0 0 1px ${tokens.colors.textareaBorder}`,
  color: tokens.colors.textareaText,
  fontVariantNumeric: 'tabular-nums',
  transition: 'box-shadow .1s ease-in-out',

  selectors: {
    '&:-webkit-autofill, &:autofill': {
      boxShadow: `inset 0 0 0 1px ${tokens.colors.textareaBorder}, inset 0 0 0 100px ${tokens.colors.textareaBg}`,
    },
    '&:-webkit-autofill::first-line, &:autofill::first-line': {
      fontFamily: tokens.fonts.rubik,
      color: tokens.colors.hiContrast,
    },
    '&:focus-visible': {
      boxShadow: `inset 0 0 0 2px ${tokens.colors.textareaFocusBorder}, ${FOCUS_SHADOW}`,
    },
    '&::placeholder': {
      color: tokens.colors.textareaPlaceholder,
    },
    '&:read-only:not(:disabled)': {
      boxShadow: 'none',
    },
    '&:disabled': {
      pointerEvents: 'none',
      opacity: '0.7',
      color: tokens.colors.textareaDisabledText,
    },
  },
});

export const styledTextareaRecipe = recipe({
  base: styledTextareaBase,
  variants: {
    variant: {
      ghost: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        selectors: {
          '&:disabled': {
            boxShadow: 'none',
          },
          '&:focus-visible': {
            backgroundColor: tokens.colors.loContrast,
          },
        },
      },
    },
    state: {
      invalid: {
        boxShadow: `inset 0 0 0 1px ${tokens.colors.textareaInvalidBorder}`,
        selectors: {
          '&:focus-visible': {
            boxShadow: `inset 0 0 0 2px ${tokens.colors.textareaInvalidBorder}, ${FOCUS_SHADOW}`,
          },
        },
        '@media': {
          [breakpoints.hover]: {
            selectors: {
              '&:hover::after': {
                backgroundColor: tokens.colors.textareaInvalidBorder,
              },
            },
          },
        },
      },
    },
    cursor: {
      default: {
        cursor: 'default',
        '@media': {
          [breakpoints.hover]: {
            selectors: {
              '&:hover:not(:read-only)': {
                cursor: 'text',
              },
            },
          },
        },
        selectors: {
          '&:focus-visible:not(:read-only)': {
            cursor: 'text',
          },
        },
      },
      text: {
        cursor: 'text',
      },
    },
    resize: {
      none: {
        resize: 'none',
      },
      both: {
        resize: 'both',
      },
      vertical: {
        resize: 'vertical',
      },
      horizontal: {
        resize: 'horizontal',
      },
    },
    endAdornment: {
      true: {
        paddingBottom: tokens.space['5'],
        paddingRight: tokens.space['5'],
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        variant: 'ghost',
        state: 'invalid',
      },
      style: {
        boxShadow: `inset 0 0 0 1px ${tokens.colors.textareaInvalidBorder}`,
      },
    },
  ],
  defaultVariants: {
    cursor: 'default',
    resize: 'both',
  },
});

const textareaWrapperBase = style({
  // Reset
  outline: 'none',
  lineHeight: 0,

  position: 'relative',
  display: 'inline-flex',
  backgroundColor: tokens.colors.textareaBg,
  color: tokens.colors.textareaPlaceholder,
  borderRadius: tokens.radii['3'],

  selectors: {
    '&::before': {
      boxSizing: 'border-box',
      borderRadius: 'inherit',
      content: '""',
      position: 'absolute',
      inset: '0',
      pointerEvents: 'none',
    },
    '&::after': {
      boxSizing: 'border-box',
      borderRadius: 'inherit',
      content: '""',
      position: 'absolute',
      inset: '0',
      pointerEvents: 'none',
    },
    '&:focus-visible::before': {
      backgroundColor: tokens.colors.textareaFocusBg,
    },
    '&:focus-visible::after': {
      backgroundColor: tokens.colors.primary,
      opacity: '0.15',
    },
  },
  '@media': {
    [breakpoints.hover]: {
      selectors: {
        '&:hover::before': {
          backgroundColor: tokens.colors.textareaHoverBg,
        },
        '&:hover::after': {
          backgroundColor: tokens.colors.primary,
          opacity: '0.05',
        },
      },
    },
  },
});

export const textareaWrapperRecipe = recipe({
  base: textareaWrapperBase,
  variants: {
    disabled: {
      true: {
        opacity: '0.7',
        color: tokens.colors.textareaDisabledText,
        '@media': {
          [breakpoints.hover]: {
            selectors: {
              '&:hover::before': {
                backgroundColor: 'inherit',
              },
              '&:hover::after': {
                backgroundColor: 'inherit',
              },
            },
          },
        },
      },
    },
    state: {
      invalid: {
        '@media': {
          [breakpoints.hover]: {
            selectors: {
              '&:hover::after': {
                backgroundColor: tokens.colors.textareaInvalidBorder,
              },
            },
          },
        },
      },
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export const adornmentWrapperEnd = style({
  position: 'absolute',
  bottom: tokens.space['2'],
  right: tokens.space['3'],
  minWidth: tokens.sizes['5'],
  minHeight: tokens.sizes['5'],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
