import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '../../styles/tokens.css';

const baseBadge = style({
  alignItems: 'center',
  appearance: 'none',
  border: 'none',
  boxSizing: 'border-box',
  display: 'inline-flex',
  flexShrink: 0,
  fontFamily: tokens.fonts.rubik,
  fontWeight: tokens.fontWeights.medium,
  justifyContent: 'center',
  lineHeight: '1',
  verticalAlign: 'middle',
  outline: 'none',
  padding: '0',
  textDecoration: 'none',
  userSelect: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  borderRadius: tokens.radii.pill,
  whiteSpace: 'nowrap',
  fontVariantNumeric: 'tabular-nums',
  position: 'relative',

  selectors: {
    '&:disabled': {
      backgroundColor: tokens.colors.slate['3'],
      pointerEvents: 'none',
      color: tokens.colors.slate['8'],
    },
  },
});

const interactiveBadge = style([
  baseBadge,
  {
    selectors: {
      '&::before': {
        boxSizing: 'border-box',
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
      },
      '&:focus-visible': {
        outline: `2px solid ${tokens.colors.primary}`,
      },
      '&:hover': {
        cursor: 'pointer',
      },
      '&:hover::before': {
        backgroundColor: tokens.colors.badgeInteractiveBackgroundHover,
      },
      '&:active::before': {
        backgroundColor: tokens.colors.badgeInteractiveBackgroundActive,
      },
    },
  },
]);

const colorVariants = {
  gray: {
    backgroundColor: tokens.colors.toneNeutralSurface,
    color: tokens.colors.toneNeutralText,
    border: `1px solid ${tokens.colors.toneNeutralBorder}`,
  },
  red: {
    backgroundColor: tokens.colors.toneDangerSurface,
    color: tokens.colors.toneDangerText,
    border: `1px solid ${tokens.colors.toneDangerBorder}`,
  },
  blue: {
    backgroundColor: tokens.colors.toneInfoSurface,
    color: tokens.colors.toneInfoText,
    border: `1px solid ${tokens.colors.toneInfoBorder}`,
  },
  green: {
    backgroundColor: tokens.colors.toneSuccessSurface,
    color: tokens.colors.toneSuccessText,
    border: `1px solid ${tokens.colors.toneSuccessBorder}`,
  },
  neon: {
    backgroundColor: tokens.colors.neon['3'],
    color: tokens.colors.neon['11'],
    border: `1px solid ${tokens.colors.neon['7']}`,
  },
  orange: {
    backgroundColor: tokens.colors.toneWarningSurface,
    color: tokens.colors.toneWarningText,
    border: `1px solid ${tokens.colors.toneWarningBorder}`,
  },
  purple: {
    backgroundColor: tokens.colors.purple['3'],
    color: tokens.colors.purple['11'],
    border: `1px solid ${tokens.colors.purple['7']}`,
  },
};

const alphaBgVariants = [
  {
    variants: { alphaBg: true, variant: 'gray' },
    style: { backgroundColor: tokens.colors.gray.A3 },
  },
  { variants: { alphaBg: true, variant: 'red' }, style: { backgroundColor: tokens.colors.red.A3 } },
  {
    variants: { alphaBg: true, variant: 'blue' },
    style: { backgroundColor: tokens.colors.blue.A3 },
  },
  {
    variants: { alphaBg: true, variant: 'green' },
    style: { backgroundColor: tokens.colors.green.A3 },
  },
  {
    variants: { alphaBg: true, variant: 'neon' },
    style: { backgroundColor: tokens.colors.neon.A3 },
  },
  {
    variants: { alphaBg: true, variant: 'orange' },
    style: { backgroundColor: tokens.colors.orange.A3 },
  },
  {
    variants: { alphaBg: true, variant: 'purple' },
    style: { backgroundColor: tokens.colors.purple.A3 },
  },
] as const;

export const badgeRecipe = recipe({
  base: baseBadge,

  variants: {
    size: {
      small: {
        height: tokens.sizes['4'],
        paddingLeft: tokens.space['2'],
        paddingRight: tokens.space['2'],
        fontSize: tokens.fontSizes['2'],
      },
      large: {
        height: tokens.sizes['5'],
        paddingLeft: tokens.space['3'],
        paddingRight: tokens.space['3'],
        fontSize: tokens.fontSizes['3'],
      },
    },
    variant: colorVariants,
    alphaBg: {
      true: {},
    },
    borderless: {
      true: {
        border: 'none',
      },
    },
  },

  compoundVariants: [...alphaBgVariants],

  defaultVariants: {
    size: 'small',
    variant: 'gray',
    borderless: false,
  },
});

export const interactiveBadgeRecipe = recipe({
  base: interactiveBadge,

  variants: {
    size: {
      small: {
        height: tokens.sizes['4'],
        paddingLeft: tokens.space['2'],
        paddingRight: tokens.space['2'],
        fontSize: tokens.fontSizes['2'],
      },
      large: {
        height: tokens.sizes['5'],
        paddingLeft: tokens.space['3'],
        paddingRight: tokens.space['3'],
        fontSize: tokens.fontSizes['3'],
      },
    },
    variant: colorVariants,
    alphaBg: {
      true: {},
    },
    borderless: {
      true: {
        border: 'none',
      },
    },
  },

  compoundVariants: [...alphaBgVariants],

  defaultVariants: {
    size: 'small',
    variant: 'gray',
    borderless: false,
  },
});
