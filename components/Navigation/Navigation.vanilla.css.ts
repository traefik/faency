import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { breakpoints } from '@/styles/breakpoints.css';
import { tokens } from '@/styles/tokens.css';

import { elevationVariants } from '@/components/Elevation/Elevation.vanilla.css';

// State colors stack over `background-color`, so a custom base color keeps the hover, focus and active layers.
const layers = (tint: string, color: string) =>
  `linear-gradient(${tint}, ${tint}), linear-gradient(${color}, ${color})`;

const negativeSpace1 = `calc(${tokens.space['1']} * -1)`;

export const navigationContainer = style({
  display: 'flex',
  boxSizing: 'border-box',
  flexDirection: 'column',
});

const navigationItem = style({
  position: 'relative',
  display: 'flex',
  boxSizing: 'border-box',
  alignItems: 'center',
  width: '100%',
  minHeight: tokens.sizes['7'],
  marginTop: tokens.space['2'],
  paddingTop: tokens.space['2'],
  paddingBottom: tokens.space['2'],
  paddingLeft: tokens.space['3'],
  paddingRight: tokens.space['3'],
  border: 'none',
  borderRadius: tokens.radii['3'],
  outline: 'none',
  backgroundColor: tokens.colors.navButtonBg,
  color: tokens.colors.navButtonText,
  fontFamily: tokens.fonts.rubik,
  fontWeight: tokens.fontWeights.medium,
  fontSize: tokens.fontSizes['3'],
  textDecoration: 'none',
  cursor: 'pointer',

  selectors: {
    '&:first-child': {
      marginTop: 0,
    },
    '&:focus': {
      color: tokens.colors.navButtonFocusText,
      boxShadow: `inset 0 0 0 2px ${tokens.colors.navButtonFocusBorder}`,
      backgroundImage: layers(tokens.colors.navButtonFocusBg2, tokens.colors.navButtonFocusBg),
    },
  },

  '@media': {
    [breakpoints.hover]: {
      selectors: {
        '&:hover': {
          color: tokens.colors.navButtonHoverText,
          backgroundImage: layers(tokens.colors.navButtonHoverBg2, tokens.colors.navButtonHoverBg),
        },
      },
    },
  },
});

const navigationItemActive = style({
  color: tokens.colors.navButtonActiveText,
  backgroundImage: layers(tokens.colors.navButtonActiveBg2, tokens.colors.navButtonActiveBg),

  selectors: {
    '&:focus': {
      color: tokens.colors.navButtonActiveText,
    },
  },

  '@media': {
    [breakpoints.hover]: {
      selectors: {
        '&:hover': {
          color: tokens.colors.navButtonActiveText,
        },
      },
    },
  },
});

export const navigationItemRecipe = recipe({
  base: navigationItem,

  variants: {
    active: {
      true: navigationItemActive,
      false: {},
    },
  },

  defaultVariants: {
    active: false,
  },
});

const navigationItemSlot = style({
  display: 'flex',
  boxSizing: 'border-box',
});

const navigationItemDimmed = style({
  opacity: 0.74,
});

export const navigationItemStart = style([
  navigationItemSlot,
  navigationItemDimmed,
  {
    paddingRight: tokens.space['2'],
    marginLeft: negativeSpace1,
  },
]);

export const navigationItemLabel = style([
  navigationItemSlot,
  navigationItemDimmed,
  {
    flexGrow: 1,
  },
]);

export const navigationItemEnd = style([
  navigationItemSlot,
  {
    paddingLeft: tokens.space['2'],
    marginRight: negativeSpace1,
  },
]);

globalStyle(
  `${navigationItem}:focus > ${navigationItemDimmed}, ${navigationItem}:hover > ${navigationItemDimmed}, ${navigationItemActive} > ${navigationItemDimmed}`,
  { opacity: 1 },
);

const navigationDrawer = style({
  display: 'flex',
  boxSizing: 'border-box',
  flexDirection: 'column',
  maxWidth: '240px',
  padding: tokens.space['3'],
});

const navigationDrawerFullWidth = style({
  paddingLeft: 0,
  paddingRight: 0,
});

export const navigationDrawerRecipe = recipe({
  base: navigationDrawer,

  variants: {
    elevation: elevationVariants,
    fullWidth: {
      true: navigationDrawerFullWidth,
      false: {},
    },
  },

  defaultVariants: {
    elevation: 1,
    fullWidth: false,
  },
});

// Defined after the item so these win over its radius and focus ring at equal specificity.
globalStyle(`${navigationDrawerFullWidth} > *, ${navigationDrawerFullWidth} > div > *`, {
  borderRadius: 0,
});

globalStyle(
  `${navigationDrawerFullWidth} > *:focus, ${navigationDrawerFullWidth} > div > *:focus`,
  {
    border: 'none',
    boxShadow: 'none',
  },
);
