import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon } from '@radix-ui/react-icons';
import { RecipeVariants } from '@vanilla-extract/recipes';
import React, { ElementType, forwardRef } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { useInlineStyle } from '@/styles/useInlineStyle';

import {
  dropdownMenuContentRecipe,
  dropdownMenuItem,
  dropdownMenuItemIndicator,
  dropdownMenuLabel,
  dropdownMenuRadioDot,
  dropdownMenuRadioIndicator,
  dropdownMenuSeparator,
} from './DropdownMenu.vanilla.css';

export const DropdownMenuVanilla = DropdownMenuPrimitive.Root;
export const DropdownMenuPortalVanilla = DropdownMenuPrimitive.Portal;

export type DropdownMenuTriggerVanillaProps<C extends ElementType = 'button'> =
  PolymorphicComponentProps<C, CSSProps>;

type DropdownMenuTriggerVanillaComponent = PolymorphicComponent<
  'button',
  DropdownMenuTriggerVanillaProps<ElementType>
>;

const DropdownMenuTriggerVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'button'>(
    { as, css, style, children, ...props }: DropdownMenuTriggerVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component: ElementType | undefined = as;

    return (
      <DropdownMenuPrimitive.Trigger
        ref={ref}
        asChild={Component !== undefined}
        style={useInlineStyle(css, style)}
        {...props}
      >
        {Component !== undefined ? <Component>{children}</Component> : children}
      </DropdownMenuPrimitive.Trigger>
    );
  },
);

DropdownMenuTriggerVanillaComponentImpl.displayName = 'DropdownMenuTriggerVanilla';

export const DropdownMenuTriggerVanilla =
  DropdownMenuTriggerVanillaComponentImpl as DropdownMenuTriggerVanillaComponent;

type DropdownMenuContentVariants = NonNullable<RecipeVariants<typeof dropdownMenuContentRecipe>>;

export type DropdownMenuContentVanillaProps = Omit<
  DropdownMenuPrimitive.DropdownMenuContentProps,
  'asChild'
> &
  CSSProps &
  DropdownMenuContentVariants;

export const DropdownMenuContentVanilla = forwardRef<
  HTMLDivElement,
  DropdownMenuContentVanillaProps
>(({ elevation, className, css, style, ...props }, ref) => (
  <DropdownMenuPrimitive.Content
    ref={ref}
    className={cx(dropdownMenuContentRecipe({ elevation }), className)}
    style={useInlineStyle(css, style)}
    {...props}
  />
));

DropdownMenuContentVanilla.displayName = 'DropdownMenuContentVanilla';

type DropdownMenuItemOwnProps = Pick<
  DropdownMenuPrimitive.DropdownMenuItemProps,
  'disabled' | 'onSelect' | 'textValue'
> &
  CSSProps;

export type DropdownMenuItemVanillaProps<C extends ElementType = 'div'> = PolymorphicComponentProps<
  C,
  DropdownMenuItemOwnProps
>;

type DropdownMenuItemVanillaComponent = PolymorphicComponent<
  'div',
  DropdownMenuItemVanillaProps<ElementType>
>;

const DropdownMenuItemVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'div'>(
    { as, className, css, style, children, ...props }: DropdownMenuItemVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component: ElementType | undefined = as;

    return (
      <DropdownMenuPrimitive.Item
        ref={ref}
        asChild={Component !== undefined}
        className={cx(dropdownMenuItem, className)}
        style={useInlineStyle(css, style)}
        {...props}
      >
        {Component !== undefined ? <Component>{children}</Component> : children}
      </DropdownMenuPrimitive.Item>
    );
  },
);

DropdownMenuItemVanillaComponentImpl.displayName = 'DropdownMenuItemVanilla';

export const DropdownMenuItemVanilla =
  DropdownMenuItemVanillaComponentImpl as DropdownMenuItemVanillaComponent;

export type DropdownMenuCheckboxItemVanillaProps = Omit<
  DropdownMenuPrimitive.DropdownMenuCheckboxItemProps,
  'asChild'
> &
  CSSProps;

export const DropdownMenuCheckboxItemVanilla = forwardRef<
  HTMLDivElement,
  DropdownMenuCheckboxItemVanillaProps
>(({ className, css, style, children, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cx(dropdownMenuItem, className)}
    style={useInlineStyle(css, style)}
    {...props}
  >
    <span className={dropdownMenuItemIndicator}>
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));

DropdownMenuCheckboxItemVanilla.displayName = 'DropdownMenuCheckboxItemVanilla';

export type DropdownMenuRadioItemVanillaProps = Omit<
  DropdownMenuPrimitive.DropdownMenuRadioItemProps,
  'asChild'
> &
  CSSProps;

export const DropdownMenuRadioItemVanilla = forwardRef<
  HTMLDivElement,
  DropdownMenuRadioItemVanillaProps
>(({ className, css, style, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cx(dropdownMenuItem, className)}
    style={useInlineStyle(css, style)}
    {...props}
  >
    <span className={dropdownMenuItemIndicator}>
      <DropdownMenuPrimitive.ItemIndicator>
        <span className={dropdownMenuRadioIndicator}>
          <span className={dropdownMenuRadioDot} />
        </span>
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));

DropdownMenuRadioItemVanilla.displayName = 'DropdownMenuRadioItemVanilla';

export type DropdownMenuLabelVanillaProps = Omit<
  DropdownMenuPrimitive.DropdownMenuLabelProps,
  'asChild'
> &
  CSSProps;

export const DropdownMenuLabelVanilla = forwardRef<HTMLDivElement, DropdownMenuLabelVanillaProps>(
  ({ className, css, style, ...props }, ref) => (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cx(dropdownMenuLabel, className)}
      style={useInlineStyle(css, style)}
      {...props}
    />
  ),
);

DropdownMenuLabelVanilla.displayName = 'DropdownMenuLabelVanilla';

export type DropdownMenuSeparatorVanillaProps = Omit<
  DropdownMenuPrimitive.DropdownMenuSeparatorProps,
  'asChild'
> &
  CSSProps;

export const DropdownMenuSeparatorVanilla = forwardRef<
  HTMLDivElement,
  DropdownMenuSeparatorVanillaProps
>(({ className, css, style, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cx(dropdownMenuSeparator, className)}
    style={useInlineStyle(css, style)}
    {...props}
  />
));

DropdownMenuSeparatorVanilla.displayName = 'DropdownMenuSeparatorVanilla';

export type DropdownMenuGroupVanillaProps = Omit<
  DropdownMenuPrimitive.DropdownMenuGroupProps,
  'asChild'
> &
  CSSProps;

export const DropdownMenuGroupVanilla = forwardRef<HTMLDivElement, DropdownMenuGroupVanillaProps>(
  ({ css, style, ...props }, ref) => (
    <DropdownMenuPrimitive.Group ref={ref} style={useInlineStyle(css, style)} {...props} />
  ),
);

DropdownMenuGroupVanilla.displayName = 'DropdownMenuGroupVanilla';

export type DropdownMenuRadioGroupVanillaProps = Omit<
  DropdownMenuPrimitive.DropdownMenuRadioGroupProps,
  'asChild'
> &
  CSSProps;

export const DropdownMenuRadioGroupVanilla = forwardRef<
  HTMLDivElement,
  DropdownMenuRadioGroupVanillaProps
>(({ css, style, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioGroup ref={ref} style={useInlineStyle(css, style)} {...props} />
));

DropdownMenuRadioGroupVanilla.displayName = 'DropdownMenuRadioGroupVanilla';
