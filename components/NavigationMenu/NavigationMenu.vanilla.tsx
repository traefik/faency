import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import React, { ElementType, forwardRef } from 'react';

import { createPolymorphicPart } from '@/styles/createPolymorphicPart';
import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import { PolymorphicComponentProps } from '@/styles/polymorphic';
import { RecipeVariantProps, withVariantKeys } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import {
  navigationMenuContentRecipe,
  navigationMenuItem,
  navigationMenuList,
  navigationMenuTrigger,
} from './NavigationMenu.vanilla.css';

const navigationMenuContentClass = withVariantKeys(navigationMenuContentRecipe);

export type NavigationMenuVanillaProps = Omit<
  NavigationMenuPrimitive.NavigationMenuProps,
  'asChild'
> &
  CSSProps;

export const NavigationMenuVanilla = forwardRef<HTMLElement, NavigationMenuVanillaProps>(
  ({ css, style, ...props }, ref) => (
    <NavigationMenuPrimitive.Root ref={ref} style={useInlineStyle(css, style)} {...props} />
  ),
);

NavigationMenuVanilla.displayName = 'NavigationMenuVanilla';

export type NavigationMenuListVanillaProps<C extends ElementType = 'ul'> =
  PolymorphicComponentProps<C, CSSProps>;

export const NavigationMenuListVanilla = createPolymorphicPart<'ul'>(NavigationMenuPrimitive.List, {
  displayName: 'NavigationMenuListVanilla',
  className: navigationMenuList,
});

type NavigationMenuItemOwnProps = Pick<NavigationMenuPrimitive.NavigationMenuItemProps, 'value'>;

export type NavigationMenuItemVanillaProps<C extends ElementType = 'li'> =
  PolymorphicComponentProps<C, NavigationMenuItemOwnProps & CSSProps>;

export const NavigationMenuItemVanilla = createPolymorphicPart<'li', NavigationMenuItemOwnProps>(
  NavigationMenuPrimitive.Item,
  { displayName: 'NavigationMenuItemVanilla', className: navigationMenuItem },
);

export type NavigationMenuTriggerVanillaProps<C extends ElementType = 'button'> =
  PolymorphicComponentProps<C, CSSProps>;

export const NavigationMenuTriggerVanilla = createPolymorphicPart<'button'>(
  NavigationMenuPrimitive.Trigger,
  { displayName: 'NavigationMenuTriggerVanilla', className: navigationMenuTrigger },
);

type NavigationMenuLinkOwnProps = Pick<
  NavigationMenuPrimitive.NavigationMenuLinkProps,
  'active' | 'onSelect'
>;

export type NavigationMenuLinkVanillaProps<C extends ElementType = 'a'> = PolymorphicComponentProps<
  C,
  NavigationMenuLinkOwnProps & CSSProps
>;

export const NavigationMenuLinkVanilla = createPolymorphicPart<'a', NavigationMenuLinkOwnProps>(
  NavigationMenuPrimitive.Link,
  { displayName: 'NavigationMenuLinkVanilla' },
);

type NavigationMenuContentVariants = RecipeVariantProps<typeof navigationMenuContentRecipe>;

export type NavigationMenuContentVanillaProps = Omit<
  NavigationMenuPrimitive.NavigationMenuContentProps,
  'asChild'
> &
  CSSProps &
  NavigationMenuContentVariants;

export const NavigationMenuContentVanilla = forwardRef<
  HTMLDivElement,
  NavigationMenuContentVanillaProps
>(({ elevation, className, css, style, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cx(navigationMenuContentClass({ elevation }), className)}
    style={useInlineStyle(css, style)}
    {...props}
  />
));

NavigationMenuContentVanilla.displayName = 'NavigationMenuContentVanilla';

type NavigationMenuForceMountProps = Pick<
  NavigationMenuPrimitive.NavigationMenuViewportProps,
  'forceMount'
>;

export type NavigationMenuViewportVanillaProps<C extends ElementType = 'div'> =
  PolymorphicComponentProps<C, NavigationMenuForceMountProps & CSSProps>;

export const NavigationMenuViewportVanilla = createPolymorphicPart<
  'div',
  NavigationMenuForceMountProps
>(NavigationMenuPrimitive.Viewport, { displayName: 'NavigationMenuViewportVanilla' });

export type NavigationMenuIndicatorVanillaProps<C extends ElementType = 'div'> =
  PolymorphicComponentProps<C, NavigationMenuForceMountProps & CSSProps>;

export const NavigationMenuIndicatorVanilla = createPolymorphicPart<
  'div',
  NavigationMenuForceMountProps
>(NavigationMenuPrimitive.Indicator, { displayName: 'NavigationMenuIndicatorVanilla' });
