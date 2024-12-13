import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import React, { ComponentProps } from 'react';

import { CSS, keyframes, styled, VariantProps } from '../../stitches.config';
import { IconButton } from '../IconButton';
import { overlayStyles } from '../Overlay';

const fadeIn = keyframes({
  from: { opacity: '0' },
  to: { opacity: '1' },
});

const fadeOut = keyframes({
  from: { opacity: '1' },
  to: { opacity: '0' },
});

const SidePanelOverlay = styled(DialogPrimitive.Overlay, overlayStyles, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,

  '&[data-state="open"]': {
    animation: `${fadeIn} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },

  '&[data-state="closed"]': {
    animation: `${fadeOut} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },
});

const slideIn = keyframes({
  from: { transform: '$$transformValue' },
  to: { transform: 'translate3d(0,0,0)' },
});

const slideOut = keyframes({
  from: { transform: 'translate3d(0,0,0)' },
  to: { transform: '$$transformValue' },
});

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: '$sidePanelBackground',
  boxShadow: 'inset 0 0 0 1px $colors$deepBlue4',
  position: 'fixed',
  top: 0,
  bottom: 0,
  width: 375,
  p: '$4',

  '&[data-state="open"]': {
    animation: `${slideIn} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },

  '&[data-state="closed"]': {
    animation: `${slideOut} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },

  variants: {
    side: {
      top: {
        $$transformValue: 'translate3d(0,-100%,0)',
        width: '100%',
        height: 250,
        bottom: 'auto',
      },
      right: {
        $$transformValue: 'translate3d(100%,0,0)',
        right: 0,
        maxWidth: '50%',
      },
      bottom: {
        $$transformValue: 'translate3d(0,100%,0)',
        width: '100%',
        height: 250,
        bottom: 0,
        top: 'auto',
      },
      left: {
        $$transformValue: 'translate3d(-100%,0,0)',
        left: 0,
        maxWidth: '50%',
      },
    },
  },

  defaultVariants: {
    side: 'right',
  },
});

const StyledCloseButton = styled(DialogPrimitive.Close, {
  position: 'absolute',
  top: '$2',
  right: '$2',
  cursor: 'pointer',
});

interface SidePanelCloseButtonProps
  extends VariantProps<typeof IconButton>,
    ComponentProps<typeof IconButton> {}

const SidePanelCloseIconButton = React.forwardRef<
  React.ElementRef<typeof IconButton>,
  SidePanelCloseButtonProps
>((props, forwardedRef) => (
  <StyledCloseButton asChild>
    <IconButton ref={forwardedRef} css={{ color: '$hiContrast' }} {...props}>
      <Cross1Icon />
    </IconButton>
  </StyledCloseButton>
));

type SidePanelContentVariants = VariantProps<typeof StyledContent>;
type SidePanelContentPrimitiveProps = React.ComponentProps<typeof DialogPrimitive.Content>;
type SidePanelRootPrimitiveProps = React.ComponentProps<typeof DialogPrimitive.Root>;
type SidePanelProps = SidePanelContentPrimitiveProps &
  SidePanelRootPrimitiveProps &
  SidePanelContentVariants & { css?: CSS; noOverlay?: boolean; noCloseIcon?: boolean };

export const SidePanel = React.forwardRef<React.ElementRef<typeof StyledContent>, SidePanelProps>(
  (
    { noOverlay = false, noCloseIcon = false, children, onOpenChange, open, ...props },
    forwardedRef,
  ) => (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {!noOverlay && <SidePanelOverlay />}
        <StyledContent {...props} ref={forwardedRef}>
          {children}
          {!noCloseIcon && <SidePanelCloseIconButton />}
        </StyledContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  ),
);
