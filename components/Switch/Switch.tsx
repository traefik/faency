import React from 'react';
import { styled, VariantProps, CSS } from '../../stitches.config';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { elevationVariants } from '../Elevation';

// CONSTANTS
const THUMB_DIAMETER = 14; // @FIXME: shouldn't this size be part of theme ?
const LARGE_RATIO = 1.5;
const THUMB_GAP = 2; // Gap between thumb and background
const ROOT_WIDTH = 32;
const ROOT_HEIGHT = 18;

// COMPONENTS
const StyledThumb = styled(SwitchPrimitive.Thumb, {
  position: 'absolute',
  left: 0,
  width: THUMB_DIAMETER,
  height: THUMB_DIAMETER,
  backgroundColor: '$switchThumb',
  borderRadius: '$round',
  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 1px 2px;',
  transition: 'transform 100ms cubic-bezier(0.22, 1, 0.36, 1)',
  transform: `translateX(${THUMB_GAP}px)`,
  willChange: 'transform',

  '&[data-state="checked"]': {
    transform: `translateX(${ROOT_WIDTH - THUMB_GAP - THUMB_DIAMETER}px)`,
  },
});

const StyledSwitch = styled(SwitchPrimitive.Root, {
  all: 'unset',
  boxSizing: 'border-box',
  userSelect: 'none',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },

  // Reset
  alignItems: 'center',
  display: 'inline-flex',
  justifyContent: 'center',
  lineHeight: '1',
  margin: '0',
  outline: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  backgroundColor: '$switchBackground',
  borderRadius: '$pill',
  position: 'relative',
  '@hover': {
    '&:hover': {
      cursor: 'pointer',
      [`& ${StyledThumb}`]: {
        ...elevationVariants[1],
      }
    },
  },
  '&:focus': {
    [`& ${StyledThumb}`]: {
      ...elevationVariants[2],
    }
  },
  '&:disabled': {
    pointerEvents: 'none',
    opacity: 0.38,
  },
  '&[data-state="checked"]': {
    backgroundColor: '$switchActiveBackground',
  },

  variants: {
    size: {
      '1': {
        width: ROOT_WIDTH,
        height: ROOT_HEIGHT,
        m: '$2'
      },
      '2': {
        width: ROOT_WIDTH * LARGE_RATIO,
        height: ROOT_HEIGHT * LARGE_RATIO,
        [`& ${StyledThumb}`]: {
          width: THUMB_DIAMETER * LARGE_RATIO,
          height: THUMB_DIAMETER * LARGE_RATIO,
          transform: `translateX(${LARGE_RATIO * THUMB_GAP})`,

          '&[data-state="checked"]': {
            transform: `translateX(${LARGE_RATIO * (ROOT_WIDTH - THUMB_GAP - THUMB_DIAMETER)}px)`,
          },
        },
      },
    },
  },
  defaultVariants: {
    size: '1',
  },
});

export type SwitchVariants = VariantProps<typeof StyledSwitch>;
type SwitchPrimitiveProps = Omit<React.ComponentProps<typeof SwitchPrimitive.Root>, 'as'>;
export type SwitchProps = SwitchPrimitiveProps & SwitchVariants & { css?: CSS };

export const Switch = React.forwardRef<React.ElementRef<typeof StyledSwitch>, SwitchProps>(
  (props, forwardedRef) => (
    <StyledSwitch {...props} ref={forwardedRef}>
      <StyledThumb />
    </StyledSwitch>
  )
);
