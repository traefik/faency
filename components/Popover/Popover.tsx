import React from 'react';
import { styled, CSS, VariantProps } from '../../stitches.config';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Box } from '../Box';
import { panelStyles } from '../Panel';
import { elevationVariants } from '../Elevation';

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

type PopoverContentPrimitiveProps = Omit<
  React.ComponentProps<typeof PopoverPrimitive.Content>,
  'as'
>;
export type PopoverContentProps = PopoverContentPrimitiveProps & {
  css?: CSS;
  hideArrow?: boolean;
  arrowCss?: CSS;
};

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  PopoverContentProps
>(({ children, hideArrow, arrowCss, ...props }, fowardedRef) => (
  <StyledContent sideOffset={0} {...props} ref={fowardedRef}>
    {children}
    {!hideArrow && (
      <Box css={arrowCss}>
        <PopoverPrimitive.Arrow width={11} height={5} offset={5} style={{ fill: 'currentColor' }} />
      </Box>
    )}
  </StyledContent>
));

export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;
