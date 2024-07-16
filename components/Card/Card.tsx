import React, { ComponentProps, ElementRef } from 'react';

import { styled, VariantProps } from '../../stitches.config';
import { elevationVariants } from '../Elevation/Elevation';

const StyledCard = styled('div', {
  appearance: 'none',
  border: 'none',
  boxSizing: 'border-box',
  font: 'inherit',
  lineHeight: '1',
  outline: 'none',
  padding: '$3',
  textAlign: 'inherit',
  verticalAlign: 'middle',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

  backgroundColor: '$cardBackground',
  display: 'block',
  textDecoration: 'none',
  color: 'inherit',
  borderRadius: '$3',
  position: 'relative',

  '&::before': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: '$3',
    pointerEvents: 'none',
  },

  variants: {
    elevation: elevationVariants,
    variant: {
      inner: {
        backgroundColor: '$innerCardBgColor',
      },
      ghost: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
    },
    active: {
      true: {
        '&::before': {
          outline: '1px solid $colors$cardActiveBorder',
          backgroundColor: '$cardActiveBackground',
        },
      },
    },
  },
  defaultVariants: {
    elevation: 1,
  },
});

const StyledInteractiveCard = styled('button', StyledCard, {
  '@hover': {
    '&:hover': {
      cursor: 'pointer',
      '&::before': {
        outline: '1px solid $colors$cardHoverBorder',
        backgroundColor: '$cardHoverBackground',
      },
    },
  },
  '&:focus': {
    outline: '2px solid $primary',
  },
  '&:active': {
    '&::before': {
      outline: '1px solid $colors$cardActiveBorder',
      backgroundColor: '$cardActiveBackground',
    },
  },
});

export interface CardVariantProps
  extends ComponentProps<typeof StyledCard>,
    VariantProps<typeof StyledCard> {
  interactive?: false;
}
export interface InteractiveCardProps
  extends VariantProps<typeof StyledInteractiveCard>,
    ComponentProps<typeof StyledInteractiveCard> {
  interactive: true;
}
export type CardProps = CardVariantProps | InteractiveCardProps;

export const Card = React.forwardRef<ElementRef<typeof StyledCard>, CardProps>(
  ({ interactive, ...props }, forwardedRef) => {
    if (interactive) {
      return (
        <StyledInteractiveCard
          tabIndex={0}
          ref={forwardedRef as React.RefObject<HTMLButtonElement>}
          {...(props as InteractiveCardProps)}
        />
      );
    }
    return (
      <StyledCard
        ref={forwardedRef as React.RefObject<HTMLDivElement>}
        {...(props as CardVariantProps)}
      />
    );
  }
);
