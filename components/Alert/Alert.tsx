import { VariantProps } from '@stitches/react';
import { styled } from '../../stitches.config';
import { Card } from '../Card';

export const Alert = styled(Card, {
  variants: {
    variant: {
      gray: {
        '&::before': {
          boxShadow: 'inset 0 0 0 1px $colors$slate9',
        },
      },
      info: {
        '&::before': {
          boxShadow: 'inset 0 0 0 1px $colors$blue9',
        },
      },
      success: {
        '&::before': {
          boxShadow: 'inset 0 0 0 1px $colors$green9',
        },
      },
      warning: {
        '&::before': {
          boxShadow: 'inset 0 0 0 1px $colors$orange9',
        },
      },
      error: {
        '&::before': {
          boxShadow: 'inset 0 0 0 1px $colors$red9',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'gray',
  },
});

export type AlertVariants = VariantProps<typeof Alert>;
export type AlertProps = AlertVariants & {};
