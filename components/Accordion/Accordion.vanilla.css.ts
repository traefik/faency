import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '@/styles/tokens.css';

import { elevationVariants } from '@/components/Elevation/Elevation.vanilla.css';

const open = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
});

const close = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
});

const sizeVariants = {
  small: {
    paddingTop: tokens.space['2'],
    paddingBottom: tokens.space['2'],
  },
  medium: {
    paddingTop: tokens.space['3'],
    paddingBottom: tokens.space['3'],
  },
  large: {
    paddingTop: tokens.space['5'],
    paddingBottom: tokens.space['5'],
  },
};

export const accordionRootRecipe = recipe({
  base: {
    borderRadius: 0,
    backgroundColor: 'transparent',
  },

  variants: {
    elevation: elevationVariants,
  },

  defaultVariants: {
    elevation: 0,
  },
});

export const accordionItem = style({
  marginTop: tokens.space['1'],
  borderRadius: 'inherit',
  boxShadow: `0 1px 0 0 ${tokens.colors.divider}`,

  selectors: {
    '&:first-child': {
      marginTop: 0,
    },
  },
});

export const accordionHeader = style({
  all: 'unset',
  display: 'flex',
  borderRadius: 'inherit',
});

export const accordionTriggerRecipe = recipe({
  base: {
    all: 'unset',
    borderRadius: 'inherit',
    fontFamily: 'inherit',
    backgroundColor: tokens.colors.contentBg,
    color: tokens.colors.accordionLabel,
    paddingLeft: tokens.space['2'],
    paddingRight: tokens.space['2'],
    lineHeight: 1,
    fontSize: tokens.fontSizes['3'],
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    transition: 'opacity 200ms ease-out',

    selectors: {
      '&::before': {
        borderRadius: 'inherit',
        boxSizing: 'border-box',
        content: '""',
        position: 'absolute',
        inset: 0,
      },
      '&:focus': {
        boxShadow: `inset 0 0 0 1px ${tokens.colors.accordionActiveShadow}`,
      },
    },

    '@media': {
      '(any-hover: hover)': {
        selectors: {
          '&:not([disabled]):hover': {
            cursor: 'pointer',
          },
          '&:not([disabled]):hover::before': {
            backgroundColor: tokens.colors.accordionHoverShadow,
          },
        },
      },
    },
  },

  variants: {
    size: sizeVariants,
  },

  defaultVariants: {
    size: 'small',
  },
});

export const accordionChevron = style({
  marginRight: tokens.space['2'],
  color: tokens.colors.accordionText,
  transition: 'transform 200ms ease-out',

  selectors: {
    '[data-state=open] > &': {
      transform: 'rotateZ(90deg)',
    },
  },
});

export const accordionCustomIcon = style({
  marginRight: tokens.space['2'],
  color: tokens.colors.accordionText,
});

export const accordionTriggerLabelRecipe = recipe({
  base: {
    width: '100%',
  },

  variants: {
    noIcon: {
      true: {
        marginLeft: tokens.space['5'],
      },
    },
  },
});

export const accordionContent = style({
  overflow: 'hidden',
  fontSize: tokens.fontSizes['3'],
  color: tokens.colors.accordionText,

  selectors: {
    '&[data-state="open"]': {
      animation: `${open} 200ms ease-out`,
    },
    '&[data-state="closed"]': {
      animation: `${close} 200ms ease-out`,
    },
  },
});

export const accordionContentWrapperRecipe = recipe({
  variants: {
    size: sizeVariants,
  },

  defaultVariants: {
    size: 'small',
  },
});
