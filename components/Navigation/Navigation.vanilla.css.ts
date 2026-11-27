import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { breakpoints } from '@/styles/breakpoints.css';
import { stateLayers } from '@/styles/stateLayers';
import { tokens } from '@/styles/tokens.css';

import { elevationVariants } from '@/components/Elevation/Elevation.vanilla.css';

const negativeSpace1 = `calc(${tokens.space['1']} * -1)`;

export const navigationContainer = style({
  display: 'flex',
  boxSizing: 'border-box',
  flexDirection: 'column',
});

export const navigationItem = style({
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
    // `data-active` also comes from Radix when the item is the `as` of a NavigationMenuLink; `:where` lets hover and focus layers win.
    '&:where([data-active])': {
      color: tokens.colors.navButtonActiveText,
      backgroundImage: stateLayers(
        tokens.colors.navButtonActiveBg2,
        tokens.colors.navButtonActiveBg,
      ),
    },
    '&:focus-visible': {
      color: tokens.colors.navButtonFocusText,
      backgroundImage: stateLayers(tokens.colors.navButtonFocusBg2, tokens.colors.navButtonFocusBg),
      boxShadow: `inset 0 0 0 2px ${tokens.colors.navButtonFocusBorder}`,
    },
    '&:where([data-active]):focus-visible': {
      color: tokens.colors.navButtonActiveText,
    },
  },

  '@media': {
    [breakpoints.hover]: {
      selectors: {
        '&:hover': {
          color: tokens.colors.navButtonHoverText,
          backgroundImage: stateLayers(
            tokens.colors.navButtonHoverBg2,
            tokens.colors.navButtonHoverBg,
          ),
        },
        '&:where([data-active]):hover': {
          color: tokens.colors.navButtonActiveText,
        },
      },
    },
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
  `${navigationItem}:focus-visible > ${navigationItemDimmed}, ${navigationItem}:hover > ${navigationItemDimmed}, ${navigationItem}[data-active] > ${navigationItemDimmed}`,
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

export const navigationItemFullWidth = style({});

// Children of a full width drawer, or items flagged full width at any depth.
globalStyle(
  [
    `${navigationDrawerFullWidth} > *`,
    `${navigationDrawerFullWidth} > div > *`,
    `${navigationItemFullWidth}${navigationItem}`,
  ].join(', '),
  {
    borderRadius: 0,
  },
);
