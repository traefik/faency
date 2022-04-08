import React, { ComponentProps } from 'react';
import { CSS, styled, VariantProps } from '../../stitches.config';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { overlayStyles } from '../Overlay';
import { IconButton } from '../IconButton';
import { Card } from '../Card';
import { elevationVariants } from '../Elevation/Elevation';

type DialogProps = React.ComponentProps<typeof DialogPrimitive.Root> & {
  children: React.ReactNode;
};

const StyledOverlay = styled(DialogPrimitive.Overlay, overlayStyles, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

export function Dialog({ children, ...props }: DialogProps) {
  return (
    <DialogPrimitive.Root {...props}>
      <StyledOverlay />
      {children}
    </DialogPrimitive.Root>
  );
}

export const StyledContent = styled(DialogPrimitive.Content, Card, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 200,
  maxHeight: '85vh',
  padding: '$4',
  marginTop: '-5vh',
  backgroundColor: '$dialogBackground',
  boxShadow: 'inset 0 0 0 1px $colors$deepBlue4',
  borderRadius: '$3',
  // animation: `${fadeIn} 125ms linear, ${moveDown} 125ms cubic-bezier(0.22, 1, 0.36, 1)`,
  willChange: 'transform',
  overflow: 'auto',

  '&::before': {
    boxShadow: 'none',
  },

  '&:focus': {
    outline: 'none',
  },

  variants: {
    elevation: elevationVariants,
  },
  defaultVariants: {
    elevation: 5,
  },
});

const StyledCloseButton = styled(DialogPrimitive.Close, {
  position: 'absolute',
  top: '$2',
  right: '$2',
  cursor: 'pointer',
});

interface DialogCloseButtonProps
  extends VariantProps<typeof IconButton>,
    ComponentProps<typeof IconButton> {}
export const DialogCloseIconButton = React.forwardRef<
  React.ElementRef<typeof IconButton>,
  DialogCloseButtonProps
>((props, forwardedRef) => (
  <StyledCloseButton asChild>
    <IconButton ref={forwardedRef} css={{ color: '$hiContrast' }} {...props}>
      <Cross1Icon />
    </IconButton>
  </StyledCloseButton>
));

type DialogContentPrimitiveProps = React.ComponentProps<typeof DialogPrimitive.Content>;
type DialogContentProps = DialogContentPrimitiveProps &
  VariantProps<typeof StyledContent> & { css?: CSS };

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  DialogContentProps
>(({ children, ...props }, forwardedRef) => (
  <StyledContent {...props} ref={forwardedRef}>
    {children}
    <DialogCloseIconButton />
  </StyledContent>
));

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
