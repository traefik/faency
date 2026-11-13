import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '../../styles/tokens.css';
import { elevationVariants } from '../Elevation/Elevation.vanilla.css';

const list = {
  margin: '0 0 0 8px',
  padding: 0,
  color: tokens.colors.textDefault,
};

export const ul = style(list);
export const ol = style(list);

const checkboxList = `${ul}:has(> li > span > input[type="checkbox"])`;

globalStyle(checkboxList, {
  margin: 0,
  listStyle: 'none',
});

globalStyle(`${checkboxList} > li`, {
  marginLeft: 0,
});

globalStyle(`${checkboxList} > li > span input`, {
  margin: '0 3px 0 0',
});

// A nested checkbox list keeps its indentation.
globalStyle(`li > ${checkboxList}, li > ${checkboxList} > li`, {
  marginLeft: tokens.space[2],
});

globalStyle(`${ol} > li::marker`, {
  fontSize: tokens.fontSizes[3],
  fontFamily: tokens.fonts.rubik,
});

export const liRecipe = recipe({
  base: {
    margin: tokens.space[2],
    outline: 'none',
    position: 'relative',
    selectors: {
      '&:focus-within': {
        boxShadow: 'none',
      },
    },
  },

  variants: {
    elevation: elevationVariants,
  },

  defaultVariants: {
    elevation: 0,
  },
});

const itemContent = style({
  backgroundColor: 'transparent',
  color: 'inherit',
  borderRadius: 'inherit',
  fontFamily: tokens.fonts.rubik,
  fontSize: tokens.fontSizes[3],
  fontVariantNumeric: 'tabular-nums',
});

export const itemText = style([
  itemContent,
  {
    flexGrow: 1,
    padding: tokens.space[1],
  },
]);

const itemLayer = {
  borderRadius: 'inherit',
  boxSizing: 'border-box',
  content: '""',
  position: 'absolute',
  inset: 0,
} as const;

const primaryTint = {
  backgroundColor: tokens.colors.primary,
  opacity: 0.05,
};

export const itemButton = style([
  itemContent,
  {
    appearance: 'none',
    userSelect: 'none',
    boxSizing: 'border-box',
    border: 'none',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    // Transparent, not none: forced-colors mode drops the box-shadow ring but shows this outline.
    outline: '2px solid transparent',
    outlineOffset: '-2px',
    flexGrow: 1,
    width: '100%',
    padding: tokens.space[2],
    position: 'relative',

    selectors: {
      '&::before': itemLayer,
      '&::after': itemLayer,
      '&:disabled': {
        pointerEvents: 'none',
        opacity: 0.5,
      },
      '&:focus, &:focus-visible': {
        boxShadow: `inset 0 0 0 2px ${tokens.colors.listItemFocusBorder}`,
      },
      '&:active::before': {
        backgroundColor: tokens.colors.listItemActiveBg,
      },
      '&:active::after': primaryTint,
    },

    '@media': {
      '(any-hover: hover)': {
        selectors: {
          '&:hover': {
            cursor: 'pointer',
          },
          '&:hover::before': {
            backgroundColor: tokens.colors.listItemHoverBg,
          },
          '&:hover::after': primaryTint,
        },
      },
    },
  },
]);

export const controlsWrapper = style({
  position: 'absolute',
  top: 0,
  right: tokens.space[2],
  zIndex: 1,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'visible',
});
