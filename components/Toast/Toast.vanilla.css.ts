import { createVar, keyframes, style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { breakpoints } from '../../styles/breakpoints.css';
import { tokens } from '../../styles/tokens.css';

const enterX = createVar();
const enterY = createVar();

const slideIn = keyframes({
  from: { opacity: 0, transform: `translate(${enterX}, ${enterY})` },
  to: { opacity: 1, transform: 'translate(0, 0)' },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const swipeOut = keyframes({
  from: {
    transform: 'translate(var(--radix-toast-swipe-end-x), var(--radix-toast-swipe-end-y))',
  },
  to: { transform: `translate(${enterX}, ${enterY})` },
});

export const toastViewportRecipe = recipe({
  base: {
    position: 'fixed',
    zIndex: tokens.zIndices.max,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space['2'],
    boxSizing: 'border-box',
    width: '380px',
    maxWidth: '100vw',
    margin: 0,
    padding: tokens.space['5'],
    listStyle: 'none',
    outline: 'none',
    pointerEvents: 'none',
    vars: { [enterX]: '0', [enterY]: '0' },
  },

  variants: {
    position: {
      'top-left': { top: 0, left: 0, vars: { [enterX]: '-100%' } },
      'top-center': {
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        vars: { [enterY]: '-100%' },
      },
      'top-right': { top: 0, right: 0, vars: { [enterX]: '100%' } },
      'bottom-left': { bottom: 0, left: 0, vars: { [enterX]: '-100%' } },
      'bottom-center': {
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        vars: { [enterY]: '100%' },
      },
      'bottom-right': { bottom: 0, right: 0, vars: { [enterX]: '100%' } },
    },
  },

  defaultVariants: {
    position: 'bottom-right',
  },
});

export type ToastPosition = NonNullable<
  NonNullable<RecipeVariants<typeof toastViewportRecipe>>['position']
>;

export const toastRoot = style({
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  gap: tokens.space['2'],
  padding: tokens.space['3'],
  backgroundColor: tokens.colors.cardBackground,
  border: `1px solid ${tokens.colors.toastBorder}`,
  borderRadius: tokens.radii['3'],
  color: tokens.colors.hiContrast,
  fontFamily: tokens.fonts.rubik,
  pointerEvents: 'auto',

  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${tokens.colors.focusOutline}`,
      outlineOffset: '2px',
    },
    '&[data-state="open"]': {
      animation: `${slideIn} 200ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    '&[data-state="closed"]': {
      animation: `${fadeOut} 150ms ease-in`,
    },
    '&[data-swipe="move"]': {
      transform: 'translate(var(--radix-toast-swipe-move-x), var(--radix-toast-swipe-move-y))',
    },
    '&[data-swipe="cancel"]': {
      transform: 'translate(0, 0)',
      transition: 'transform 200ms ease-out',
    },
    '&[data-swipe="end"]': {
      animation: `${swipeOut} 100ms ease-out`,
    },
  },

  '@media': {
    [breakpoints.motion]: {
      selectors: {
        '&[data-state="open"], &[data-state="closed"], &[data-swipe="end"]': {
          animation: 'none',
        },
        '&[data-swipe="cancel"]': {
          transition: 'none',
        },
      },
    },
  },
});

export const toastIconRecipe = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: tokens.sizes['4'],
    height: tokens.sizes['4'],
  },

  variants: {
    variant: {
      gray: { color: tokens.colors.textSubtle },
      info: { color: tokens.colors.blue['9'] },
      success: { color: tokens.colors.green['9'] },
      warning: { color: tokens.colors.orange['9'] },
      error: { color: tokens.colors.red['9'] },
    },
  },

  defaultVariants: {
    variant: 'gray',
  },
});

export type ToastVariant = NonNullable<
  NonNullable<RecipeVariants<typeof toastIconRecipe>>['variant']
>;

export const toastContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: tokens.space['1'],
  flex: 1,
  minWidth: 0,
});

export const toastTitle = style({
  margin: 0,
  fontSize: tokens.fontSizes['3'],
  fontWeight: tokens.fontWeights.medium,
  lineHeight: tokens.sizes['4'],
  color: tokens.colors.hiContrast,
  overflowWrap: 'anywhere',
});

export const toastDescription = style({
  margin: 0,
  fontSize: tokens.fontSizes['2'],
  lineHeight: tokens.sizes['4'],
  color: tokens.colors.textDefault,
  overflowWrap: 'anywhere',
});

export const toastAction = style({
  marginTop: tokens.space['1'],
});

export const toastClose = style({
  flexShrink: 0,
});
