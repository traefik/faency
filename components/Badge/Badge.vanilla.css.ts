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
    variant: {
      gray: {
        backgroundColor: tokens.colors.gray['6'],
        color: tokens.colors.gray['10'],
        border: `1px solid ${tokens.colors.gray['10']}`,
      },
      red: {
        backgroundColor: tokens.colors.red['6'],
        color: tokens.colors.red['10'],
        border: `1px solid ${tokens.colors.red['10']}`,
      },
      blue: {
        backgroundColor: tokens.colors.blue['6'],
        color: tokens.colors.blue['10'],
        border: `1px solid ${tokens.colors.blue['10']}`,
      },
      green: {
        backgroundColor: tokens.colors.green['6'],
        color: tokens.colors.green['10'],
        border: `1px solid ${tokens.colors.green['10']}`,
      },
      neon: {
        backgroundColor: tokens.colors.neon['6'],
        color: tokens.colors.neon['10'],
        border: `1px solid ${tokens.colors.neon['10']}`,
      },
      orange: {
        backgroundColor: tokens.colors.orange['6'],
        color: tokens.colors.orange['10'],
        border: `1px solid ${tokens.colors.orange['10']}`,
      },
      purple: {
        backgroundColor: tokens.colors.purple['6'],
        color: tokens.colors.purple['10'],
        border: `1px solid ${tokens.colors.purple['10']}`,
      },
    },
    alphaBg: {
      true: {},
    },
    borderless: {
      true: {
        border: 'none',
      },
    },
  },

  compoundVariants: [
    {
      variants: { alphaBg: true, variant: 'gray' },
      style: { backgroundColor: tokens.colors.gray.A6 },
    },
    {
      variants: { alphaBg: true, variant: 'red' },
      style: { backgroundColor: tokens.colors.red.A6 },
    },
    {
      variants: { alphaBg: true, variant: 'blue' },
      style: { backgroundColor: tokens.colors.blue.A6 },
    },
    {
      variants: { alphaBg: true, variant: 'green' },
      style: { backgroundColor: tokens.colors.green.A6 },
    },
    {
      variants: { alphaBg: true, variant: 'neon' },
      style: { backgroundColor: tokens.colors.neon.A6 },
    },
    {
      variants: { alphaBg: true, variant: 'orange' },
      style: { backgroundColor: tokens.colors.orange.A6 },
    },
    {
      variants: { alphaBg: true, variant: 'purple' },
      style: { backgroundColor: tokens.colors.purple.A6 },
    },
  ],

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
    variant: {
      gray: {
        backgroundColor: tokens.colors.gray['6'],
        color: tokens.colors.gray['10'],
        border: `1px solid ${tokens.colors.gray['10']}`,
      },
      red: {
        backgroundColor: tokens.colors.red['6'],
        color: tokens.colors.red['10'],
        border: `1px solid ${tokens.colors.red['10']}`,
      },
      blue: {
        backgroundColor: tokens.colors.blue['6'],
        color: tokens.colors.blue['10'],
        border: `1px solid ${tokens.colors.blue['10']}`,
      },
      green: {
        backgroundColor: tokens.colors.green['6'],
        color: tokens.colors.green['10'],
        border: `1px solid ${tokens.colors.green['10']}`,
      },
      neon: {
        backgroundColor: tokens.colors.neon['6'],
        color: tokens.colors.neon['10'],
        border: `1px solid ${tokens.colors.neon['10']}`,
      },
      orange: {
        backgroundColor: tokens.colors.orange['6'],
        color: tokens.colors.orange['10'],
        border: `1px solid ${tokens.colors.orange['10']}`,
      },
      purple: {
        backgroundColor: tokens.colors.purple['6'],
        color: tokens.colors.purple['10'],
        border: `1px solid ${tokens.colors.purple['10']}`,
      },
    },
    alphaBg: {
      true: {},
    },
    borderless: {
      true: {
        border: 'none',
      },
    },
  },

  compoundVariants: [
    {
      variants: { alphaBg: true, variant: 'gray' },
      style: { backgroundColor: tokens.colors.gray.A6 },
    },
    {
      variants: { alphaBg: true, variant: 'red' },
      style: { backgroundColor: tokens.colors.red.A6 },
    },
    {
      variants: { alphaBg: true, variant: 'blue' },
      style: { backgroundColor: tokens.colors.blue.A6 },
    },
    {
      variants: { alphaBg: true, variant: 'green' },
      style: { backgroundColor: tokens.colors.green.A6 },
    },
    {
      variants: { alphaBg: true, variant: 'neon' },
      style: { backgroundColor: tokens.colors.neon.A6 },
    },
    {
      variants: { alphaBg: true, variant: 'orange' },
      style: { backgroundColor: tokens.colors.orange.A6 },
    },
    {
      variants: { alphaBg: true, variant: 'purple' },
      style: { backgroundColor: tokens.colors.purple.A6 },
    },
  ],

  defaultVariants: {
    size: 'small',
    variant: 'gray',
    borderless: false,
  },
});
