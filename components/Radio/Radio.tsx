import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { styled, CSS, VariantProps } from '../../stitches.config';

export const RadioGroup = styled(RadioGroupPrimitive.Root, {
  display: 'flex',
});

export const INDICATOR_BASE_STYLES = {
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  width: '100%',
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    width: '8px',
    height: '8px',
    borderRadius: '$round',
    backgroundColor: '$radioIndicator',
  },
};

const StyledIndicator = styled(RadioGroupPrimitive.Indicator, INDICATOR_BASE_STYLES);

export const RADIO_BASE_STYLES = {
  all: 'unset',
  boxSizing: 'border-box',
  userSelect: 'none',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },
  alignItems: 'center',
  appearance: 'none',
  display: 'inline-flex',
  justifyContent: 'center',
  lineHeight: '1',
  margin: '0',
  outline: 'none',
  padding: '0',
  textDecoration: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  borderRadius: '50%',
  color: '$hiContrast',
  boxShadow: 'inset 0 0 0 1px $colors$radioBorder',
  overflow: 'hidden',
}
const StyledRadio = styled(RadioGroupPrimitive.Item, RADIO_BASE_STYLES, {
  '@hover': {
    '&:hover': {
      boxShadow: 'inset 0 0 0 1px $colors$radioHoverBorder',
      backgroundColor: '$radioHoverBg',
    },
  },
  '&:focus-visible': {
    outline: 'none',
    boxShadow: 'inset 0 0 0 1px $colors$radioFocusBorder, 0 0 0 1px $colors$radioFocusBorder',
  },

  '&:disabled': {
    pointerEvents: 'none',
    backgroundColor: '$radioDisabledBg',
    '&::placeholder': {
      color: '$radioDisabledText',
    },

    [`& ${StyledIndicator}`]: {
      '&::after': {
        backgroundColor: '$radioIndicatorDisabledBg',
      },
    },
  },

  variants: {
    size: {
      '1': {
        width: '$3',
        height: '$3',
      },
      '2': {
        width: '$5',
        height: '$5',

        [`& ${StyledIndicator}`]: {
          '&::after': {
            width: '$3',
            height: '$3',
          },
        },
      },
    },
  },
  defaultVariants: {
    size: '1',
  },
});

export type RadioVariants = VariantProps<typeof StyledRadio>;
type RadioGroupItemPrimitiveProps = Omit<
  React.ComponentProps<typeof RadioGroupPrimitive.Item>,
  'as'
>;
export type RadioProps = RadioGroupItemPrimitiveProps & RadioVariants & { css?: CSS };

export const Radio = React.forwardRef<React.ElementRef<typeof StyledRadio>, RadioProps>(
  (props, forwardedRef) => (
    <StyledRadio {...props} ref={forwardedRef}>
      <StyledIndicator />
    </StyledRadio>
  )
);
