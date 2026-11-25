import { createVar, globalStyle, style } from '@vanilla-extract/css';

import { tokens } from '@/styles/tokens.css';

import { navigationItemRecipe } from '@/components/Navigation/Navigation.vanilla.css';

export const navigationTreeNested = style({
  paddingLeft: tokens.space['4'],
});

// Keeps the keyboard focus ring; a mouse click only expands the item, so it shows no focus state.
export const navigationTreeItemExpandable = style({
  selectors: {
    '&:focus:not(:focus-visible)': {
      boxShadow: 'none',
      backgroundImage: 'none',
    },
  },
});

export const navigationTreeLabel = style({
  width: '100%',
  color: 'inherit',
});

export const navigationTreeLabelIndented = style({
  marginLeft: tokens.space['4'],
});

export const navigationTreeDepth = createVar();

export const navigationTreeFullWidthIndent = `calc(${tokens.space['3']} + ${navigationTreeDepth} * ${tokens.space['4']})`;

export const navigationTreeItemFullWidth = style({});

// Same as the items of a full width drawer, at any depth; the extra class beats the item's own radius and focus ring.
globalStyle(`${navigationTreeItemFullWidth}${navigationItemRecipe.classNames.base}`, {
  borderRadius: 0,
});

globalStyle(`${navigationTreeItemFullWidth}${navigationItemRecipe.classNames.base}:focus`, {
  border: 'none',
  boxShadow: 'none',
});
