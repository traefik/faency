import { createVar, keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '@/styles/tokens.css';

import { overlay } from '@/components/Overlay/Overlay.vanilla.css';

const easing = 'cubic-bezier(0.22, 1, 0.36, 1)';

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const hiddenTransform = createVar();

const slideIn = keyframes({
  from: { transform: hiddenTransform },
  to: { transform: 'translate3d(0,0,0)' },
});

const slideOut = keyframes({
  from: { transform: 'translate3d(0,0,0)' },
  to: { transform: hiddenTransform },
});

export const sidePanelOverlay = style([
  overlay,
  {
    position: 'fixed',
    inset: 0,

    selectors: {
      '&[data-state="open"]': {
        animation: `${fadeIn} 150ms ${easing}`,
      },
      '&[data-state="closed"]': {
        animation: `${fadeOut} 150ms ${easing}`,
      },
    },
  },
]);

export const sidePanelContentRecipe = recipe({
  base: {
    backgroundColor: tokens.colors.sidePanelBackground,
    boxShadow: `inset 0 0 0 1px ${tokens.colors.deepBlue['4']}`,
    position: 'fixed',
    top: 0,
    bottom: 0,
    width: 375,
    padding: tokens.space['4'],

    selectors: {
      '&[data-state="open"]': {
        animation: `${slideIn} 150ms ${easing}`,
      },
      '&[data-state="closed"]': {
        animation: `${slideOut} 150ms ${easing}`,
      },
    },
  },

  variants: {
    side: {
      top: {
        vars: { [hiddenTransform]: 'translate3d(0,-100%,0)' },
        left: 0,
        right: 0,
        width: 'auto',
        height: 250,
        bottom: 'auto',
      },
      right: {
        vars: { [hiddenTransform]: 'translate3d(100%,0,0)' },
        right: 0,
        maxWidth: '50%',
      },
      bottom: {
        vars: { [hiddenTransform]: 'translate3d(0,100%,0)' },
        left: 0,
        right: 0,
        width: 'auto',
        height: 250,
        bottom: 0,
        top: 'auto',
      },
      left: {
        vars: { [hiddenTransform]: 'translate3d(-100%,0,0)' },
        left: 0,
        maxWidth: '50%',
      },
    },
  },

  defaultVariants: {
    side: 'right',
  },
});
