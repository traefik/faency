import { style, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { tokens } from '../../styles/tokens.css';

// Loading animation keyframes
const loadingAnimation = keyframes({
  '100%': { transform: 'translateX(48px)' },
});

// Base button styles
export const buttonBase = style({
  // Reset
  appearance: 'none',
  userSelect: 'none',
  boxSizing: 'border-box',
  border: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  all: 'unset',

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

  // Pseudo elements for hover/focus effects
  '::before': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    inset: 0,
  },
  '::after': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    inset: 0,
  },

  // Focus styles
  ':focus-visible': {
    outline: 'none',
  },

  // Hover styles
  '@media (any-hover: hover)': {
    ':hover': {
      cursor: 'pointer',
    },
  },

  // Disabled state
  ':disabled': {
    pointerEvents: 'none',
    opacity: 0.5,
  },
});

// Button recipe with variants
export const button = recipe({
  base: buttonBase,
  variants: {
    size: {
      small: {
        height: tokens.sizes[5],
        paddingLeft: tokens.space[2],
        paddingRight: tokens.space[2],
        fontSize: tokens.fontSizes[1],
        borderRadius: tokens.radii[3],
        lineHeight: tokens.sizes[5],
      },
      medium: {
        height: tokens.sizes[6],
        paddingLeft: tokens.space[3],
        paddingRight: tokens.space[3],
        fontSize: tokens.fontSizes[3],
        borderRadius: tokens.radii[3],
        lineHeight: tokens.sizes[6],
      },
      large: {
        height: tokens.sizes[7],
        paddingLeft: tokens.space[3],
        paddingRight: tokens.space[3],
        fontSize: tokens.fontSizes[3],
        borderRadius: tokens.radii[3],
        lineHeight: tokens.sizes[7],
      },
    },
    variant: {
      primary: {
        // Colors will be set via theme context
      },
      secondary: {
        // Colors will be set via theme context
      },
      red: {
        // Colors will be set via theme context
      },
    },
    state: {
      active: {
        // Colors will be set via theme context
      },
      waiting: {
        color: 'transparent',
        overflow: 'hidden',
        pointerEvents: 'none',
        '::after': {
          left: '-100%',
          width: '200%',
          backgroundSize: '48px',
          backgroundImage:
            'linear-gradient(-45deg, transparent 33%, currentColor 33%, currentColor 66%, transparent 66%)',
          animation: `${loadingAnimation} 500ms linear infinite`,
        },
      },
    },
    ghost: {
      true: {
        backgroundColor: 'transparent !important',
      },
    },
    rounded: {
      true: {
        borderRadius: tokens.radii.pill,
      },
    },
  },
  defaultVariants: {
    size: 'medium',
    variant: 'primary',
  },
});
