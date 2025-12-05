import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { breakpoints } from '../../styles/breakpoints.css';
import { tokens } from '../../styles/tokens.css';

// CONSTANTS
const FOCUS_SHADOW =
  '0 1px 5px 0 hsla(0, 0%, 0%, 0.2), 0 3px 1px -2px hsla(0, 0%, 0%, 0.12), 0 2px 2px 0 hsla(0, 0%, 0%, 0.14)';

const SMALL_HEIGHT = tokens.sizes['5'];
const MEDIUM_HEIGHT = tokens.sizes['6'];
const LARGE_HEIGHT = tokens.sizes['7'];

const styledInputBase = style({
  // Reset
  appearance: 'none',
  borderWidth: '0',
  boxSizing: 'border-box',
  fontFamily: tokens.fonts.rubik,
  margin: '0',
  outline: 'none',
  padding: '0',
  width: '100%',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  // Custom
  position: 'relative',
  backgroundColor: 'transparent',
  borderRadius: 'inherit', // inherit border radius from InputWrapper
  boxShadow: `inset 0 0 0 1px ${tokens.colors.inputBorder}`,
  color: tokens.colors.inputText,
  fontVariantNumeric: 'tabular-nums',
  transition: 'box-shadow .1s ease-in-out',

  selectors: {
    '&[type="number"]': {
      paddingRight: '0', // remove padding for number native controls
    },
    '&:-webkit-autofill, &:autofill': {
      boxShadow: `inset 0 0 0 1px ${tokens.colors.inputBorder}, inset 0 0 0 100px ${tokens.colors.inputBg}`,
    },
    '&:-webkit-autofill::first-line, &:autofill::first-line': {
      fontFamily: tokens.fonts.rubik,
      color: tokens.colors.hiContrast,
    },
    '&:focus-visible': {
      boxShadow: `inset 0 0 0 2px ${tokens.colors.inputFocusBorder}, ${FOCUS_SHADOW}`,
    },
    '&::placeholder': {
      color: tokens.colors.inputPlaceholder,
    },
    '&:read-only:not(:disabled)': {
      boxShadow: 'none',
    },
    '&:disabled': {
      pointerEvents: 'none',
      color: tokens.colors.inputDisabledText,
    },
  },
});

export const styledInputRecipe = recipe({
  base: styledInputBase,
  variants: {
    size: {
      small: {
        height: SMALL_HEIGHT,
        fontSize: tokens.fontSizes['1'],
        paddingLeft: tokens.space['2'],
        paddingRight: tokens.space['2'],
        lineHeight: tokens.sizes['5'],
        selectors: {
          '&:-webkit-autofill::first-line, &:autofill::first-line': {
            fontSize: tokens.fontSizes['1'],
          },
        },
      },
      medium: {
        height: MEDIUM_HEIGHT,
        fontSize: tokens.fontSizes['3'],
        paddingLeft: tokens.space['3'],
        paddingRight: tokens.space['3'],
        lineHeight: tokens.sizes['6'],
        selectors: {
          '&:-webkit-autofill::first-line, &:autofill::first-line': {
            fontSize: tokens.fontSizes['3'],
          },
        },
      },
      large: {
        height: LARGE_HEIGHT,
        fontSize: tokens.fontSizes['3'],
        paddingLeft: tokens.space['3'],
        paddingRight: tokens.space['3'],
        lineHeight: tokens.sizes['7'],
        selectors: {
          '&:-webkit-autofill::first-line, &:autofill::first-line': {
            fontSize: tokens.fontSizes['3'],
          },
        },
      },
    },
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
        boxShadow: `inset 0 0 0 1px ${tokens.colors.inputInvalidBorder}`,
        selectors: {
          '&:focus-visible': {
            boxShadow: `inset 0 0 0 2px ${tokens.colors.inputInvalidBorder}, ${FOCUS_SHADOW}`,
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
    startAdornment: {
      true: {},
    },
    endAdornment: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        variant: 'ghost',
        state: 'invalid',
      },
      style: {
        boxShadow: `inset 0 0 0 1px ${tokens.colors.inputInvalidBorder}`,
      },
    },
    // startAdornment compound variants
    {
      variants: {
        startAdornment: true,
        size: 'small',
      },
      style: {
        paddingInlineStart: `calc(${tokens.space['2']} + 15px)`,
      },
    },
    {
      variants: {
        startAdornment: true,
        size: 'medium',
      },
      style: {
        paddingInlineStart: `calc(${tokens.space['3']} + 15px)`,
      },
    },
    {
      variants: {
        startAdornment: true,
        size: 'large',
      },
      style: {
        paddingInlineStart: `calc(${tokens.space['3']} + 15px)`,
      },
    },
    // endAdornment compound variants
    {
      variants: {
        endAdornment: true,
        size: 'small',
      },
      style: {
        paddingInlineEnd: `calc(${tokens.space['2']} + 15px)`,
      },
    },
    {
      variants: {
        endAdornment: true,
        size: 'medium',
      },
      style: {
        paddingInlineEnd: `calc(${tokens.space['3']} + 15px)`,
      },
    },
    {
      variants: {
        endAdornment: true,
        size: 'large',
      },
      style: {
        paddingInlineEnd: `calc(${tokens.space['3']} + 15px)`,
      },
    },
    // endAdornment + invalid compound variants
    {
      variants: {
        endAdornment: true,
        size: 'small',
        state: 'invalid',
      },
      style: {
        paddingInlineEnd: `calc(${tokens.space['4']} + 30px)`, // size padding + adornment margins + icon size + icon size
      },
    },
    {
      variants: {
        endAdornment: true,
        size: 'medium',
        state: 'invalid',
      },
      style: {
        paddingInlineEnd: `calc(${tokens.space['6']} + 30px)`,
      },
    },
    {
      variants: {
        endAdornment: true,
        size: 'large',
        state: 'invalid',
      },
      style: {
        paddingInlineEnd: `calc(${tokens.space['6']} + 30px)`,
      },
    },
  ],
  defaultVariants: {
    size: 'medium',
    cursor: 'default',
  },
});

const inputWrapperBase = style({
  // Reset
  outline: 'none',
  lineHeight: 0,

  position: 'relative',
  backgroundColor: tokens.colors.inputBg,
  color: tokens.colors.inputPlaceholder,

  selectors: {
    '&::before': {
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      inset: '0',
      pointerEvents: 'none',
    },
    '&::after': {
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      inset: '0',
      pointerEvents: 'none',
    },
    '&:focus-visible::before': {
      backgroundColor: tokens.colors.inputFocusBg,
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
          backgroundColor: tokens.colors.inputHoverBg,
        },
        '&:hover::after': {
          backgroundColor: tokens.colors.primary,
          opacity: '0.05',
        },
      },
    },
  },
});

export const inputWrapperRecipe = recipe({
  base: inputWrapperBase,
  variants: {
    disabled: {
      true: {
        opacity: '0.7',
        color: tokens.colors.inputDisabledText,
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
                backgroundColor: tokens.colors.inputInvalidBorder,
              },
            },
          },
        },
      },
    },
    size: {
      small: {
        borderRadius: tokens.radii['2'],
        selectors: {
          '&::before, &::after': {
            borderRadius: tokens.radii['2'],
          },
        },
      },
      medium: {
        borderRadius: tokens.radii['3'],
        selectors: {
          '&::before, &::after': {
            borderRadius: tokens.radii['3'],
          },
        },
      },
      large: {
        borderRadius: tokens.radii['3'],
        selectors: {
          '&::before, &::after': {
            borderRadius: tokens.radii['3'],
          },
        },
      },
    },
  },
  defaultVariants: {
    size: 'medium',
    disabled: false,
  },
});

const adornmentWrapperBase = style({
  position: 'absolute',
  top: '0',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const adornmentWrapperRecipe = recipe({
  base: adornmentWrapperBase,
  variants: {
    size: {
      small: {
        marginLeft: `calc(${tokens.space['2']} / 2)`,
        marginRight: `calc(${tokens.space['2']} / 2)`,
      },
      medium: {
        marginLeft: `calc(${tokens.space['3']} / 2)`,
        marginRight: `calc(${tokens.space['3']} / 2)`,
      },
      large: {
        marginLeft: `calc(${tokens.space['3']} / 2)`,
        marginRight: `calc(${tokens.space['3']} / 2)`,
      },
    },
    variant: {
      start: {
        left: '0',
      },
      end: {
        right: '0',
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});
