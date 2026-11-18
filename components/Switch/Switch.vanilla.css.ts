import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { breakpoints } from '@/styles/breakpoints.css';
import { tokens } from '@/styles/tokens.css';

import { elevationVariants } from '@/components/Elevation/Elevation.vanilla.css';

const THUMB_DIAMETER = 14;
const THUMB_GAP = 2;
const ROOT_WIDTH = 32;
const ROOT_HEIGHT = 18;
const LARGE_RATIO = 1.5;

const thumbDiameter = createVar();
const thumbOffOffset = createVar();
const thumbOnOffset = createVar();

const switchSize = (ratio: number) => ({
  width: ROOT_WIDTH * ratio,
  height: ROOT_HEIGHT * ratio,
  vars: {
    [thumbDiameter]: `${THUMB_DIAMETER * ratio}px`,
    [thumbOffOffset]: `${THUMB_GAP * ratio}px`,
    [thumbOnOffset]: `${(ROOT_WIDTH - THUMB_GAP - THUMB_DIAMETER) * ratio}px`,
  },
});

export const switchRecipe = recipe({
  base: {
    all: 'unset',
    boxSizing: 'border-box',
    userSelect: 'none',
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    lineHeight: '1',
    margin: 0,
    outline: 'none',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    backgroundColor: tokens.colors.switchBackground,
    borderRadius: tokens.radii.pill,
    position: 'relative',

    selectors: {
      '&:focus-visible': {
        outline: `2px solid ${tokens.colors.switchFocusBorder}`,
      },
      '&:disabled, &[data-disabled]': {
        pointerEvents: 'none',
        opacity: 0.38,
      },
      '&[data-state="checked"]': {
        backgroundColor: tokens.colors.switchActiveBackground,
      },
      '&[aria-invalid="true"]:not(:focus-visible)': {
        boxShadow: `inset 0 0 0 1px ${tokens.colors.switchInvalidBorder}`,
      },
    },

    '@media': {
      [breakpoints.hover]: {
        selectors: {
          '&:hover:not([aria-readonly="true"])': {
            cursor: 'pointer',
          },
        },
      },
    },
  },

  variants: {
    size: {
      '1': switchSize(1),
      '2': switchSize(LARGE_RATIO),
    },
  },

  defaultVariants: {
    size: '1',
  },
});

const switchRoot = switchRecipe.classNames.base;

export const switchThumb = style({
  position: 'absolute',
  left: 0,
  width: thumbDiameter,
  height: thumbDiameter,
  backgroundColor: tokens.colors.switchThumb,
  borderRadius: tokens.radii.round,
  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 1px 2px',
  transition: 'transform 100ms cubic-bezier(0.22, 1, 0.36, 1)',
  transform: `translateX(${thumbOffOffset})`,
  willChange: 'transform',

  selectors: {
    '&[data-state="checked"]': {
      transform: `translateX(${thumbOnOffset})`,
    },
    [`${switchRoot}:focus-visible &`]: elevationVariants[2],
  },

  '@media': {
    [breakpoints.hover]: {
      selectors: {
        [`${switchRoot}:hover:not(:focus-visible):not([aria-readonly="true"]) &`]:
          elevationVariants[1],
      },
    },
  },
});
