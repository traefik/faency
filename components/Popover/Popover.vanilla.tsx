import * as PopoverPrimitive from '@radix-ui/react-popover';
import React, { ElementType, forwardRef } from 'react';

import { createPolymorphicPart } from '@/styles/createPolymorphicPart';
import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import { PolymorphicComponentProps } from '@/styles/polymorphic';
import { RecipeVariantProps, withVariantKeys } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { popoverArrowRecipe, popoverContentRecipe } from './Popover.vanilla.css';

const popoverContentClass = withVariantKeys(popoverContentRecipe);
const popoverArrowClass = withVariantKeys(popoverArrowRecipe);

export const PopoverVanilla = PopoverPrimitive.Root;
export const PopoverPortalVanilla = PopoverPrimitive.Portal;

export type PopoverTriggerVanillaProps<C extends ElementType = 'button'> =
  PolymorphicComponentProps<C, CSSProps>;

export const PopoverTriggerVanilla = createPolymorphicPart<'button'>(PopoverPrimitive.Trigger, {
  displayName: 'PopoverTriggerVanilla',
});

export type PopoverCloseVanillaProps<C extends ElementType = 'button'> = PolymorphicComponentProps<
  C,
  CSSProps
>;

export const PopoverCloseVanilla = createPolymorphicPart<'button'>(PopoverPrimitive.Close, {
  displayName: 'PopoverCloseVanilla',
});

export type PopoverAnchorVanillaProps<C extends ElementType = 'div'> = PolymorphicComponentProps<
  C,
  CSSProps
>;

export const PopoverAnchorVanilla = createPolymorphicPart<'div'>(PopoverPrimitive.Anchor, {
  displayName: 'PopoverAnchorVanilla',
});

type PopoverContentVariants = RecipeVariantProps<typeof popoverContentRecipe>;

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
        className={cx(popoverContentClass({ elevation }), className)}
        style={contentStyle}
        {...props}
      >
        {children}
        {!hideArrow && (
          <PopoverPrimitive.Arrow
            className={popoverArrowClass({ elevation })}
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
