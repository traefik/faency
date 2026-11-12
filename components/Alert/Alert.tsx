import { styled, VariantProps } from '../../stitches.config';
import { Card } from '../Card';

// TODO: when migrating to AlertVanilla, color the variants with the vanilla tone tokens
// (info → toneInfo*, success → toneSuccess*, warning → toneWarning*, error → toneDanger*, gray → toneNeutral*)
// instead of the raw $blue9/$green9/$orange9/$red9/$slate9 scale steps used here.
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
export type AlertProps = AlertVariants & NonNullable<unknown>;
