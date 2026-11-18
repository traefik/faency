import * as PopoverPrimitive from '@radix-ui/react-popover';
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

import { popoverArrowRecipe, popoverContentRecipe } from './Popover.vanilla.css';

export const PopoverVanilla = PopoverPrimitive.Root;
export const PopoverPortalVanilla = PopoverPrimitive.Portal;

export type PopoverTriggerVanillaProps<C extends ElementType = 'button'> =
  PolymorphicComponentProps<C, CSSProps>;

type PopoverTriggerVanillaComponent = PolymorphicComponent<
  'button',
  PopoverTriggerVanillaProps<ElementType>
>;

const PopoverTriggerVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'button'>(
    { as, css, style, children, ...props }: PopoverTriggerVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component: ElementType | undefined = as;

    return (
      <PopoverPrimitive.Trigger
        ref={ref}
        asChild={Component !== undefined}
        style={useInlineStyle(css, style)}
        {...props}
      >
        {Component !== undefined ? <Component>{children}</Component> : children}
      </PopoverPrimitive.Trigger>
    );
  },
);

PopoverTriggerVanillaComponentImpl.displayName = 'PopoverTriggerVanilla';

export const PopoverTriggerVanilla =
  PopoverTriggerVanillaComponentImpl as PopoverTriggerVanillaComponent;

export type PopoverCloseVanillaProps<C extends ElementType = 'button'> = PolymorphicComponentProps<
  C,
  CSSProps
>;

type PopoverCloseVanillaComponent = PolymorphicComponent<
  'button',
  PopoverCloseVanillaProps<ElementType>
>;

const PopoverCloseVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'button'>(
    { as, css, style, children, ...props }: PopoverCloseVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component: ElementType | undefined = as;

    return (
      <PopoverPrimitive.Close
        ref={ref}
        asChild={Component !== undefined}
        style={useInlineStyle(css, style)}
        {...props}
      >
        {Component !== undefined ? <Component>{children}</Component> : children}
      </PopoverPrimitive.Close>
    );
  },
);

PopoverCloseVanillaComponentImpl.displayName = 'PopoverCloseVanilla';

export const PopoverCloseVanilla = PopoverCloseVanillaComponentImpl as PopoverCloseVanillaComponent;

export type PopoverAnchorVanillaProps<C extends ElementType = 'div'> = PolymorphicComponentProps<
  C,
  CSSProps
>;

type PopoverAnchorVanillaComponent = PolymorphicComponent<
  'div',
  PopoverAnchorVanillaProps<ElementType>
>;

const PopoverAnchorVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'div'>(
    { as, css, style, children, ...props }: PopoverAnchorVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component: ElementType | undefined = as;

    return (
      <PopoverPrimitive.Anchor
        ref={ref}
        asChild={Component !== undefined}
        style={useInlineStyle(css, style)}
        {...props}
      >
        {Component !== undefined ? <Component>{children}</Component> : children}
      </PopoverPrimitive.Anchor>
    );
  },
);

PopoverAnchorVanillaComponentImpl.displayName = 'PopoverAnchorVanilla';

export const PopoverAnchorVanilla =
  PopoverAnchorVanillaComponentImpl as PopoverAnchorVanillaComponent;

type PopoverContentVariants = NonNullable<RecipeVariants<typeof popoverContentRecipe>>;

export type PopoverContentVanillaProps = Omit<PopoverPrimitive.PopoverContentProps, 'asChild'> &
  CSSProps &
  PopoverContentVariants & {
    hideArrow?: boolean;
    arrowCss?: CSSProps['css'];
  };

export const PopoverContentVanilla = forwardRef<HTMLDivElement, PopoverContentVanillaProps>(
  ({ elevation, hideArrow, arrowCss, className, css, style, children, ...props }, ref) => {
    const contentStyle = useInlineStyle(css, style);
    const arrowStyle = useInlineStyle(arrowCss);

    return (
      <PopoverPrimitive.Content
        ref={ref}
        sideOffset={0}
        className={cx(popoverContentRecipe({ elevation }), className)}
        style={contentStyle}
        {...props}
      >
        {children}
        {!hideArrow && (
          <PopoverPrimitive.Arrow
            className={popoverArrowRecipe({ elevation })}
            style={arrowStyle}
            width={11}
            height={5}
            offset={5}
          />
        )}
      </PopoverPrimitive.Content>
    );
  },
);

PopoverContentVanilla.displayName = 'PopoverContentVanilla';
