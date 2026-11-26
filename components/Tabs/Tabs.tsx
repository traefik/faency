import * as TabsPrimitive from '@radix-ui/react-tabs';
import React from 'react';

import { styled } from '../../stitches.config';
import { focusTriggerOnMouseDown } from './focusTriggerOnMouseDown';

export const TabsContainer = styled(TabsPrimitive.Root, {
  display: 'flex',
  flexDirection: 'column',
});

export const TabsList = styled(TabsPrimitive.List, {
  display: 'flex',
  borderBottom: `1px solid $textSubtle`,
});

const StyledTabsTrigger = styled(TabsPrimitive.Trigger, {
  all: 'unset',
  color: '$textSubtle',
  fontFamily: 'inherit',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  py: '$2',
  userSelect: 'none',
  '@hover': {
    '&:not([data-disabled]):hover': {
      cursor: 'pointer',
    },
    '&:not([data-state="active"]):not([data-disabled]):hover': {
      color: '$hiContrast',
    },
  },
  '&[data-state="active"]': {
    color: '$primary',
    boxShadow: 'inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor',
    fontWeight: '$semiBold',
  },
  '&:focus-visible': {
    outline: '2px solid $colors$focusOutline',
    outlineOffset: '-2px',
  },
  '&[data-disabled]': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  // Forced colors drop the box-shadow underline, so mark the active tab another way.
  '@media (forced-colors: active)': {
    '&[data-state="active"]': {
      textDecoration: 'underline',
      textDecorationThickness: '2px',
      textUnderlineOffset: '4px',
    },
  },
});

const TabsTriggerImpl = React.forwardRef<
  React.ElementRef<typeof StyledTabsTrigger>,
  React.ComponentProps<typeof StyledTabsTrigger>
>(({ disabled, onMouseDown, ...props }, forwardedRef) => (
  // Radix only sets the native `disabled`, which an `asChild` element other than a button ignores.
  <StyledTabsTrigger
    aria-disabled={disabled || undefined}
    disabled={disabled}
    {...props}
    onMouseDown={(event) => focusTriggerOnMouseDown(event, disabled, onMouseDown)}
    ref={forwardedRef}
  />
));

TabsTriggerImpl.displayName = 'TabsTrigger';

// Keeps `${TabsTrigger}` working as a Stitches selector.
export const TabsTrigger = Object.assign(TabsTriggerImpl, {
  className: StyledTabsTrigger.className,
  selector: StyledTabsTrigger.selector,
  toString: () => StyledTabsTrigger.toString(),
});

export const TabsContent = styled(TabsPrimitive.Content, {
  width: '100%',
});
