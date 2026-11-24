import React, { ElementType, forwardRef, ReactNode } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { RecipeVariantProps, withVariantKeys } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import {
  navigationContainer,
  navigationDrawerRecipe,
  navigationItemEnd,
  navigationItemLabel,
  navigationItemRecipe,
  navigationItemStart,
} from './Navigation.vanilla.css';

const navigationDrawerClass = withVariantKeys(navigationDrawerRecipe);

export type NavigationContainerVanillaProps<C extends ElementType = 'div'> =
  PolymorphicComponentProps<C, CSSProps>;

type NavigationContainerVanillaComponent = PolymorphicComponent<
  'div',
  NavigationContainerVanillaProps<ElementType>
>;

const NavigationContainerVanillaImpl = forwardRef(
  <C extends ElementType = 'div'>(
    { as, className, css, style, ...props }: NavigationContainerVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'div';
    const mergedStyles = useInlineStyle(css, style);

    return (
      <Component
        ref={ref}
        className={cx(navigationContainer, className)}
        style={mergedStyles}
        {...props}
      />
    );
  },
);

NavigationContainerVanillaImpl.displayName = 'NavigationContainerVanilla';

export const NavigationContainerVanilla =
  NavigationContainerVanillaImpl as NavigationContainerVanillaComponent;

type NavigationDrawerVariants = RecipeVariantProps<typeof navigationDrawerRecipe>;

interface NavigationDrawerOwnProps extends NavigationDrawerVariants, CSSProps {}

export type NavigationDrawerVanillaProps<C extends ElementType = 'nav'> = PolymorphicComponentProps<
  C,
  NavigationDrawerOwnProps
>;

type NavigationDrawerVanillaComponent = PolymorphicComponent<
  'nav',
  NavigationDrawerVanillaProps<ElementType>
>;

const NavigationDrawerVanillaImpl = forwardRef(
  <C extends ElementType = 'nav'>(
    { as, elevation, fullWidth, className, css, style, ...props }: NavigationDrawerVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'nav';
    const mergedStyles = useInlineStyle(css, style);

    return (
      <Component
        ref={ref}
        className={cx(navigationDrawerClass({ elevation, fullWidth }), className)}
        style={mergedStyles}
        {...props}
      />
    );
  },
);

NavigationDrawerVanillaImpl.displayName = 'NavigationDrawerVanilla';

export const NavigationDrawerVanilla =
  NavigationDrawerVanillaImpl as NavigationDrawerVanillaComponent;

export interface NavigationItemOwnProps extends CSSProps {
  active?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

export type NavigationItemVanillaProps<C extends ElementType = 'button'> =
  PolymorphicComponentProps<C, NavigationItemOwnProps>;

type NavigationItemVanillaComponent = PolymorphicComponent<
  'button',
  NavigationItemVanillaProps<ElementType>
>;

const NavigationItemVanillaImpl = forwardRef(
  <C extends ElementType = 'button'>(
    {
      as,
      active = false,
      startAdornment,
      endAdornment,
      children,
      className,
      css,
      style,
      ...props
    }: NavigationItemVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || 'button';
    const isButton = Component === 'button';
    const mergedStyles = useInlineStyle(css, style);

    return (
      <Component
        ref={ref}
        type={isButton ? 'button' : undefined}
        aria-current={active && !isButton ? 'page' : undefined}
        data-active={active ? '' : undefined}
        className={cx(navigationItemRecipe({ active }), className)}
        style={mergedStyles}
        {...props}
      >
        {startAdornment ? <span className={navigationItemStart}>{startAdornment}</span> : null}
        <span className={navigationItemLabel}>{children}</span>
        {endAdornment ? <span className={navigationItemEnd}>{endAdornment}</span> : null}
      </Component>
    );
  },
);

NavigationItemVanillaImpl.displayName = 'NavigationItemVanilla';

export const NavigationItemVanilla = NavigationItemVanillaImpl as NavigationItemVanillaComponent;

export type NavigationLinkVanillaProps = Omit<NavigationItemVanillaProps<'a'>, 'as' | 'ref'>;

export const NavigationLinkVanilla = forwardRef<HTMLAnchorElement, NavigationLinkVanillaProps>(
  (props, ref) => <NavigationItemVanilla as="a" ref={ref} {...props} />,
);

NavigationLinkVanilla.displayName = 'NavigationLinkVanilla';
