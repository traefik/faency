import { style } from '@vanilla-extract/css';

import { stateLayers } from '@/styles/stateLayers';
import { tokens } from '@/styles/tokens.css';

export const buttonSwitchContainer = style({
  display: 'inline-flex',
  backgroundColor: tokens.colors.buttonSwitchContainerBg,
  borderRadius: tokens.radii['3'],
  padding: '3px',
  gap: tokens.space['1'],
});

const HOVER_LAYER = 'rgba(255, 255, 255, 0.15)';

export const buttonSwitchItem = style({
  display: 'inline-flex',
  backgroundColor: tokens.colors.buttonSwitchOffBg,
  color: tokens.colors.buttonSwitchOffColor,
  padding: tokens.space['1'],
  width: tokens.sizes['10'],
  justifyContent: 'center',
  fontWeight: 600,
  border: 'none',
  borderRadius: tokens.radii['3'],
  position: 'relative',

  selectors: {
    '&:focus-visible': {
      backgroundImage: stateLayers(HOVER_LAYER),
    },
    '&[data-state=on]': {
      backgroundColor: tokens.colors.buttonSwitchActiveBg,
      color: tokens.colors.buttonSwitchActiveColor,
    },
  },

  '@media': {
    '(hover: hover)': {
      selectors: {
        '&:hover': {
          cursor: 'pointer',
          backgroundImage: stateLayers(HOVER_LAYER),
        },
      },
    },
  },
});
