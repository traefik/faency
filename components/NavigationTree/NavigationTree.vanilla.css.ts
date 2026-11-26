import { createVar, style } from '@vanilla-extract/css';

import { tokens } from '@/styles/tokens.css';

import {
  navigationItem,
  navigationItemFullWidth,
} from '@/components/Navigation/Navigation.vanilla.css';

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

// The item spans the whole row and indents its own content by depth.
export const navigationTreeItemFullWidth = style([
  navigationItemFullWidth,
  {
    selectors: {
      [`&${navigationItem}`]: {
        paddingLeft: `calc(${tokens.space['3']} + ${navigationTreeDepth} * ${tokens.space['4']})`,
      },
    },
  },
]);
