import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import React from 'react';

import { CSS, styled, VariantProps } from '../../stitches.config';
import { elevationVariants } from '../Elevation';
import { panelStyles } from '../Panel';

// #region Root

const StyledRoot = styled(NavigationMenuPrimitive.Root, {
  ul: {
    m: 0,
    p: 0,
    listStyleType: 'none',
    li: {
      display: 'inline',
    },
  },
});

export type NavigationMenuProps = React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  children: React.ReactNode;
  css?: CSS;
};

export type NavigationMenuVariants = VariantProps<typeof NavigationMenu>;

export const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof StyledRoot>,
  NavigationMenuProps
>(({ children, ...props }, fowardedRef) => (
  <StyledRoot {...props} ref={fowardedRef}>
    {children}
  </StyledRoot>
));

// #endregion Root

// #region Content

const StyledContent = styled(NavigationMenuPrimitive.Content, panelStyles, {
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

type NavigationMenuPrimitiveContentProps = Omit<
  React.ComponentProps<typeof NavigationMenuPrimitive.Content>,
  'as'
>;

export type NavigationMenuContentProps = NavigationMenuPrimitiveContentProps &
  VariantProps<typeof StyledContent> & {
    css?: CSS;
  };

export const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof StyledContent>,
  NavigationMenuContentProps
>(({ children, elevation, ...props }, fowardedRef) => (
  <StyledContent elevation={elevation} {...props} ref={fowardedRef}>
    {children}
  </StyledContent>
));

// #endregion Content

// #region Trigger

const StyledTrigger = styled(NavigationMenuPrimitive.Trigger, {
  backgroundColor: 'transparent',
  border: 'none',
});

export type NavigationMenuTriggerProps = React.ComponentProps<
  typeof NavigationMenuPrimitive.Trigger
> &
  VariantProps<typeof StyledContent> & {
    css?: CSS;
  };

export const NavigationMenuTrigger = ({ children, ...props }: NavigationMenuTriggerProps) => (
  <StyledTrigger {...props}>{children}</StyledTrigger>
);

// #endregion Trigger

export const NavigationMenuIndicator = NavigationMenuPrimitive.Indicator;
export const NavigationMenuItem = NavigationMenuPrimitive.Item;
export const NavigationMenuLink = NavigationMenuPrimitive.Link;
export const NavigationMenuList = NavigationMenuPrimitive.List;
export const NavigationMenuViewport = NavigationMenuPrimitive.Viewport;
