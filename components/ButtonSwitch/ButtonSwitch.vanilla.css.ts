import { style } from '@vanilla-extract/css';

import { tokens } from '../../styles/tokens.css';

export const buttonSwitchContainer = style({
  display: 'inline-flex',
  backgroundColor: tokens.colors.buttonSwitchContainerBg,
  borderRadius: tokens.radii['3'],
  padding: '3px',
  gap: tokens.space['1'],
});

export const buttonSwitchItem = style({
  display: 'inline-flex',
  backgroundColor: tokens.colors.buttonSwitchOffBg,
  color: tokens.colors.buttonSwitchOffColor,
  padding: tokens.space['1'],
  width: tokens.sizes['10'],
  justifyContent: 'center',
  fontWeight: 600,
  border: 'none',
  position: 'relative',

  selectors: {
    '&::before': {
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: tokens.radii['3'],
    },
    '&::after': {
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: tokens.radii['3'],
    },
    '&:focus-visible': {
      borderRadius: tokens.radii['3'],
    },
    '&:focus-visible::before': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    '&:focus-visible::after': {
      opacity: 0.15,
    },
    '&[data-state=on]': {
      backgroundColor: tokens.colors.buttonSwitchActiveBg,
      color: tokens.colors.buttonSwitchActiveColor,
      borderRadius: tokens.radii['3'],
    },
  },

  '@media': {
    '(hover: hover)': {
      selectors: {
        '&:hover': {
          cursor: 'pointer',
        },
        '&:hover::before': {
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
        },
        '&:hover::after': {
          opacity: 0.05,
        },
      },
    },
  },
});
