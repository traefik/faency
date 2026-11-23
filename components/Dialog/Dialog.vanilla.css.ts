import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '@/styles/tokens.css';

import { elevationVariants } from '@/components/Elevation/Elevation.vanilla.css';
import { overlay } from '@/components/Overlay/Overlay.vanilla.css';

export const dialogOverlay = style([
  overlay,
  {
    position: 'fixed',
    inset: 0,
  },
]);

export const dialogContentRecipe = recipe({
  base: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 200,
    maxHeight: '85vh',
    padding: tokens.space['4'],
    marginTop: '-5vh',
    backgroundColor: tokens.colors.dialogBackground,
    boxShadow: `inset 0 0 0 1px ${tokens.colors.deepBlue['4']}`,
    borderRadius: tokens.radii['3'],
    willChange: 'transform',
    overflow: 'auto',

    ':focus': {
      outline: 'none',
    },
  },

  variants: {
    elevation: elevationVariants,
  },

  defaultVariants: {
    elevation: 5,
  },
});

// Doubled class to win over the IconButton base `position: relative`
export const dialogCloseButton = style({
  selectors: {
    '&&': {
      position: 'absolute',
      top: tokens.space['2'],
      right: tokens.space['2'],
      cursor: 'pointer',
      color: tokens.colors.hiContrast,
    },
  },
});
