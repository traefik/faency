import * as TabsPrimitive from '@radix-ui/react-tabs';
import React, { ElementType } from 'react';

import { createPolymorphicPart } from '@/styles/createPolymorphicPart';
import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import { PolymorphicComponentProps } from '@/styles/polymorphic';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { focusTriggerOnMouseDown } from './focusTriggerOnMouseDown';
import { tabsContainer, tabsContent, tabsList, tabsTrigger } from './Tabs.vanilla.css';

export type TabsContainerVanillaProps = Omit<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
  'asChild'
> &
  CSSProps;

export const TabsContainerVanilla = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsContainerVanillaProps
>(({ className, css, style, ...props }, forwardedRef) => {
  const mergedStyles = useInlineStyle(css, style);

  return (
    <TabsPrimitive.Root
      {...props}
      className={cx(tabsContainer, className)}
      style={mergedStyles}
      ref={forwardedRef}
    />
  );
});

TabsContainerVanilla.displayName = 'TabsContainerVanilla';

export type TabsListVanillaProps = Omit<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
  'asChild'
> &
  CSSProps;

export const TabsListVanilla = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListVanillaProps
>(({ className, css, style, ...props }, forwardedRef) => {
  const mergedStyles = useInlineStyle(css, style);

  return (
    <TabsPrimitive.List
      {...props}
      className={cx(tabsList, className)}
      style={mergedStyles}
      ref={forwardedRef}
    />
  );
});

TabsListVanilla.displayName = 'TabsListVanilla';

type TabsTriggerOwnProps = Pick<TabsPrimitive.TabsTriggerProps, 'value' | 'disabled'>;

export type TabsTriggerVanillaProps<C extends ElementType = 'button'> = PolymorphicComponentProps<
  C,
  TabsTriggerOwnProps & CSSProps
>;

// Radix only sets the native `disabled`, which an `as` element other than a button ignores.
const AccessibleTabsTrigger = React.forwardRef<HTMLButtonElement, TabsPrimitive.TabsTriggerProps>(
  ({ disabled, onMouseDown, ...props }, forwardedRef) => (
    <TabsPrimitive.Trigger
      aria-disabled={disabled || undefined}
      disabled={disabled}
      {...props}
      onMouseDown={(event) => focusTriggerOnMouseDown(event, disabled, onMouseDown)}
      ref={forwardedRef}
    />
  ),
);

AccessibleTabsTrigger.displayName = 'AccessibleTabsTrigger';

export const TabsTriggerVanilla = createPolymorphicPart<'button', TabsTriggerOwnProps>(
  AccessibleTabsTrigger,
  { displayName: 'TabsTriggerVanilla', className: tabsTrigger },
);

export type TabsContentVanillaProps = Omit<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
  'asChild'
> &
  CSSProps;

export const TabsContentVanilla = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentVanillaProps
>(({ className, css, style, ...props }, forwardedRef) => {
  const mergedStyles = useInlineStyle(css, style);

  return (
    <TabsPrimitive.Content
      {...props}
      className={cx(tabsContent, className)}
      style={mergedStyles}
      ref={forwardedRef}
    />
  );
});

TabsContentVanilla.displayName = 'TabsContentVanilla';
