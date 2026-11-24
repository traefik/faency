import { style } from '@vanilla-extract/css';

import { tokens } from '@/styles/tokens.css';

export const tabsContainer = style({
  display: 'flex',
  flexDirection: 'column',
});

export const tabsList = style({
  display: 'flex',
  borderBottom: `1px solid ${tokens.colors.textSubtle}`,
});

export const tabsTrigger = style({
  all: 'unset',
  color: tokens.colors.textSubtle,
  fontFamily: 'inherit',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: tokens.space['2'],
  paddingBottom: tokens.space['2'],
  userSelect: 'none',

  selectors: {
    '&[data-state="active"]': {
      color: tokens.colors.primary,
      boxShadow: 'inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor',
      fontWeight: tokens.fontWeights.semiBold,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.colors.focusOutline}`,
      outlineOffset: '-2px',
    },
    '&[data-disabled]': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },

  '@media': {
    // Forced colors drop the box-shadow underline, so mark the active tab another way.
    '(forced-colors: active)': {
      selectors: {
        '&[data-state="active"]': {
          textDecoration: 'underline',
          textDecorationThickness: '2px',
          textUnderlineOffset: '4px',
        },
      },
    },
    '(any-hover: hover)': {
      selectors: {
        '&:not([data-disabled]):hover': {
          cursor: 'pointer',
        },
        // Media rules come after the base selectors, so keep the active color on hover.
        '&:not([data-state="active"]):not([data-disabled]):hover': {
          color: tokens.colors.hiContrast,
        },
      },
    },
  },
});

export const tabsContent = style({
  width: '100%',
});
