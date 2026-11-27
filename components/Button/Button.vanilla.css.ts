import { keyframes, style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { stateLayers } from '@/styles/stateLayers';
import { tokens } from '@/styles/tokens.css';

const BG_SIZES = {
  small: tokens.sizes['8'],
  medium: tokens.sizes['9'],
  large: tokens.sizes['10'],
};

const backgroundSlide = keyframes({
  '100%': { transform: `translateX(${tokens.sizes['9']})` },
});

const backgroundSlideSmall = keyframes({
  '100%': { transform: `translateX(${tokens.sizes['8']})` },
});

const backgroundSlideLarge = keyframes({
  '100%': { transform: `translateX(${tokens.sizes['10']})` },
});

const HOVER_LAYER = 'rgba(255, 255, 255, 0.15)';
const PRESSED_LAYER = 'rgba(0, 0, 0, 0.15)';

const baseButton = style({
  // Reset
  appearance: 'none',
  all: 'unset',
  boxSizing: 'border-box',
  border: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  // Layout
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  position: 'relative',
  overflow: 'hidden',

  // Typography
  fontFamily: tokens.fonts.rubik,
  fontWeight: tokens.fontWeights.medium,
  fontVariantNumeric: 'tabular-nums',
  lineHeight: '1',

  selectors: {
    '&:disabled': {
      pointerEvents: 'none',
      opacity: 0.5,
    },
    '&:focus-visible': {
      boxShadow: `inset 0 0 0 2px ${tokens.colors.focusOutline}`,
      backgroundImage: stateLayers(HOVER_LAYER),
    },
    // `:hover:active` outranks the hover rules, which come later inside their media query.
    '&:active, &:hover:active': {
      backgroundImage: stateLayers(PRESSED_LAYER),
    },
  },

  '@media': {
    '(hover: hover)': {
      selectors: {
        '&:hover': {
          cursor: 'pointer',
          backgroundImage: stateLayers(HOVER_LAYER),
        },
      },
    },
  },
});

export const buttonRecipe = recipe({
  base: baseButton,

  variants: {
    size: {
      small: {
        borderRadius: tokens.radii.button,
        height: tokens.sizes['5'],
        paddingLeft: tokens.space['2'],
        paddingRight: tokens.space['2'],
        fontSize: tokens.fontSizes['1'],
        lineHeight: tokens.sizes['5'],
      },
      medium: {
        borderRadius: tokens.radii.button,
        height: tokens.sizes['6'],
        paddingLeft: tokens.space['3'],
        paddingRight: tokens.space['3'],
        fontSize: tokens.fontSizes['3'],
        lineHeight: tokens.sizes['6'],
      },
      large: {
        borderRadius: tokens.radii.button,
        height: tokens.sizes['7'],
        paddingLeft: tokens.space['3'],
        paddingRight: tokens.space['3'],
        fontSize: tokens.fontSizes['3'],
        lineHeight: tokens.sizes['7'],
      },
    },
    variant: {
      primary: {
        backgroundColor: tokens.colors.primary,
        color: tokens.colors.buttonPrimaryText,
        selectors: {
          '&:focus-visible': {
            boxShadow: `inset 0 0 0 2px ${tokens.colors.buttonPrimaryFocusBorder}`,
          },
        },
        '@media': {
          '(hover: hover)': {
            selectors: {
              '&:hover': {
                backgroundImage: stateLayers(tokens.colors.primaryTint, HOVER_LAYER),
              },
            },
          },
        },
      },
      secondary: {
        backgroundColor: tokens.colors.buttonSecondaryBg,
        color: tokens.colors.buttonSecondaryText,
        boxShadow: `inset 0 0 0 2px ${tokens.colors.buttonSecondaryBorder}`,
        selectors: {
          '&:active': {
            boxShadow: `inset 0 0 0 1px ${tokens.colors.buttonSecondaryBorder}`,
          },
          '&:focus-visible': {
            boxShadow: `inset 0 0 0 2px ${tokens.colors.buttonSecondaryFocusBorder}`,
          },
        },
        '@media': {
          '(hover: hover)': {
            selectors: {
              '&:hover': {
                backgroundImage: stateLayers(tokens.colors.primaryTint, HOVER_LAYER),
              },
            },
          },
        },
      },
      red: {
        backgroundColor: tokens.colors.buttonRedBg,
        color: tokens.colors.buttonRedText,
        selectors: {
          '&:focus-visible': {
            boxShadow: `inset 0 0 0 2px ${tokens.colors.buttonRedFocusBg}`,
          },
        },
      },
    },
    state: {
      active: {
        backgroundColor: tokens.colors.deepBlue['5'],
        color: tokens.colors.deepBlue['11'],
        selectors: {
          '&:active': {
            backgroundColor: tokens.colors.deepBlue['5'],
          },
        },
      },
      waiting: {
        backgroundColor: tokens.colors.deepBlue['3'],
        boxShadow: `inset 0 0 0 1px ${tokens.colors.deepBlue['4']}`,
        color: 'transparent',
        overflow: 'hidden',
        pointerEvents: 'none',
        selectors: {
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '-100%',
            width: '200%',
            backgroundSize: BG_SIZES.medium,
            backgroundImage: `linear-gradient(
              -45deg,
              transparent 33%,
              ${tokens.colors.deepBlue['4']} 33%,
              ${tokens.colors.deepBlue['4']} 66%,
              transparent 66%
            )`,
            animation: `${backgroundSlide} 500ms linear infinite`,
          },
        },
      },
    },
    ghost: {
      true: {
        boxShadow: 'none',
        '@media': {
          '(hover: hover)': {
            selectors: {
              '&:hover': {
                boxShadow: 'none',
              },
            },
          },
        },
      },
    },
    rounded: {
      true: {
        borderRadius: tokens.radii.pill,
      },
    },
  },

  compoundVariants: [
    {
      variants: { variant: 'primary', ghost: true },
      style: {
        color: tokens.colors.primary,
        backgroundColor: 'transparent',
        '@media': {
          '(hover: hover)': {
            selectors: {
              '&:hover': {
                color: tokens.colors.buttonPrimaryGhostHoverText,
                backgroundColor: 'transparent',
              },
            },
          },
        },
      },
    },
    {
      variants: { variant: 'primary', state: 'active' },
      style: {
        backgroundColor: tokens.colors.buttonPrimaryFocusBg,
        color: tokens.colors.buttonPrimaryText,
        boxShadow: 'inset 0 0 0 2px white',
      },
    },
    {
      variants: { variant: 'secondary', state: 'waiting' },
      style: {
        backgroundColor: tokens.colors.deepBlue['3'],
        color: 'transparent',
      },
    },
    {
      variants: { variant: 'secondary', ghost: true },
      style: {
        backgroundColor: 'transparent',
        color: tokens.colors.buttonSecondaryText,
        boxShadow: 'none',
      },
    },
    {
      variants: { variant: 'red', state: 'waiting' },
      style: {
        backgroundColor: tokens.colors.deepBlue['3'],
        color: 'transparent',
      },
    },
    {
      variants: { variant: 'red', state: 'active' },
      style: {
        backgroundColor: tokens.colors.buttonRedFocusBg,
        color: tokens.colors.buttonRedText,
        boxShadow: 'inset 0 0 0 2px white',
      },
    },
    {
      variants: { variant: 'red', ghost: true },
      style: {
        color: tokens.colors.buttonRedBg,
        backgroundColor: 'transparent',
        '@media': {
          '(hover: hover)': {
            selectors: {
              '&:hover': {
                color: tokens.colors.buttonRedHoverText,
                backgroundColor: 'transparent',
              },
            },
          },
        },
      },
    },
    {
      variants: { size: 'small', state: 'waiting' },
      style: {
        selectors: {
          '&::after': {
            backgroundSize: BG_SIZES.small,
            animation: `${backgroundSlideSmall} 500ms linear infinite`,
          },
        },
      },
    },
    {
      variants: { size: 'large', state: 'waiting' },
      style: {
        selectors: {
          '&::after': {
            backgroundSize: BG_SIZES.large,
            animation: `${backgroundSlideLarge} 500ms linear infinite`,
          },
        },
      },
    },
  ],

  defaultVariants: {
    size: 'medium',
    variant: 'primary',
  },
});

export type ButtonRecipeVariants = RecipeVariants<typeof buttonRecipe>;
