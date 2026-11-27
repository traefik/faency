import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { stateLayers } from '@/styles/stateLayers';
import { tokens } from '@/styles/tokens.css';

import { elevationVariants } from '@/components/Elevation/Elevation.vanilla.css';

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
      // No pointer-events: none, or clicks would fall through to the <li> and fire its onClick.
      '&:disabled': {
        opacity: 0.5,
      },
      '&:focus-visible': {
        boxShadow: `inset 0 0 0 2px ${tokens.colors.listItemFocusBorder}`,
      },
      // `:hover:active` outranks the hover rule, which comes later inside its media query.
      '&:enabled:active, &:enabled:hover:active': {
        backgroundImage: stateLayers(tokens.colors.primaryTint, tokens.colors.listItemActiveBg),
      },
    },

    '@media': {
      '(any-hover: hover)': {
        selectors: {
          '&:enabled:hover': {
            cursor: 'pointer',
            backgroundImage: stateLayers(tokens.colors.primaryTint, tokens.colors.listItemHoverBg),
          },
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
