import * as PopoverPrimitive from '@radix-ui/react-popover';
import React from 'react';

import { CSS, styled, VariantProps } from '../../stitches.config';
import { elevationVariants } from '../Elevation';
import { panelStyles } from '../Panel';

export type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root> & {
  children: React.ReactNode;
};
export type PopoverVariants = VariantProps<typeof Popover>;

export function Popover({ children, ...props }: PopoverProps) {
  return <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>;
}

const StyledContent = styled(PopoverPrimitive.Content, panelStyles, {
  minWidth: 200,
  minHeight: '$6',
  maxWidth: 265,
  color: '$hiContrast',
  '&:focus': {
    outline: 'none',
  },
  variants: {
    elevation: elevationVariants,
  },
  defaultVariants: {
    elevation: 2,
  },
});

const fillColorVariants: Record<number, CSS> = {
  0: {
    fill: '$00dp',
  },
  1: {
    fill: '$01dp',
  },
  2: {
    fill: '$02dp',
  },
  3: {
    fill: '$03dp',
  },
  4: {
    fill: '$04dp',
  },
  5: {
    fill: '$05dp',
  },
};

const StyledArrow = styled(PopoverPrimitive.Arrow, {
  fill: 'currentColor',
  variants: {
    elevation: fillColorVariants,
  },
  defaultVariants: {
    elevation: 2,
  },
});

type PopoverContentPrimitiveProps = Omit<
  React.ComponentProps<typeof PopoverPrimitive.Content>,
  'as'
>;
export type PopoverContentProps = PopoverContentPrimitiveProps &
  VariantProps<typeof StyledContent> & {
    css?: CSS;
    hideArrow?: boolean;
    arrowCss?: CSS;
  };

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  PopoverContentProps
>(({ children, hideArrow, arrowCss, elevation, ...props }, fowardedRef) => (
  <StyledContent sideOffset={0} elevation={elevation} {...props} ref={fowardedRef}>
    {children}
    {!hideArrow && (
      <StyledArrow elevation={elevation} width={11} height={5} offset={5} css={arrowCss} />
    )}
  </StyledContent>
));

export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverPortal = PopoverPrimitive.Portal;
