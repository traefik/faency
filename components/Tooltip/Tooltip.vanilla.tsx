import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React, { ElementType, forwardRef } from 'react';

import { createPolymorphicPart } from '@/styles/createPolymorphicPart';
import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import { PolymorphicComponentProps } from '@/styles/polymorphic';
import { RecipeVariantProps, withVariantKeys } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { TextVanilla } from '@/components/Text/Text.vanilla';

import { tooltipArrow, tooltipContentRecipe } from './Tooltip.vanilla.css';

const tooltipContentClass = withVariantKeys(tooltipContentRecipe);

export const TooltipRootVanilla = TooltipPrimitive.Root;
export const TooltipPortalVanilla = TooltipPrimitive.Portal;

export type TooltipTriggerVanillaProps<C extends ElementType = 'button'> =
  PolymorphicComponentProps<C, CSSProps>;

export const TooltipTriggerVanilla = createPolymorphicPart<'button'>(TooltipPrimitive.Trigger, {
  displayName: 'TooltipTriggerVanilla',
});

export type TooltipContentVanillaProps = Omit<
  TooltipPrimitive.TooltipContentProps,
  'asChild' | 'content'
> &
  CSSProps &
  RecipeVariantProps<typeof tooltipContentRecipe>;

export const TooltipContentVanilla = forwardRef<HTMLDivElement, TooltipContentVanillaProps>(
  ({ multiline, className, css, style, children, ...props }, ref) => (
    <TooltipPrimitive.Content
      ref={ref}
      side="top"
      align="center"
      sideOffset={5}
      className={cx(tooltipContentClass({ multiline }), className)}
      style={useInlineStyle(css, style)}
      {...props}
    >
      {typeof children === 'string' ? (
        <TextVanilla
          size="1"
          as="p"
          css={{ color: 'currentColor', lineHeight: multiline ? '20px' : undefined }}
        >
          {children}
        </TextVanilla>
      ) : (
        children
      )}
      <TooltipPrimitive.Arrow className={tooltipArrow} offset={5} width={11} height={5} />
    </TooltipPrimitive.Content>
  ),
);

TooltipContentVanilla.displayName = 'TooltipContentVanilla';

export type TooltipVanillaProps = TooltipContentVanillaProps &
  Pick<
    TooltipPrimitive.TooltipProps,
    'open' | 'defaultOpen' | 'onOpenChange' | 'delayDuration' | 'disableHoverableContent'
  > & {
    content: React.ReactNode;
    children: React.ReactNode;
  };

export const TooltipVanilla = forwardRef<HTMLDivElement, TooltipVanillaProps>(
  (
    {
      children,
      content,
      open,
      defaultOpen,
      onOpenChange,
      delayDuration = 400,
      disableHoverableContent,
      ...props
    },
    ref,
  ) => (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      delayDuration={delayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipContentVanilla ref={ref} {...props}>
          {content}
        </TooltipContentVanilla>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  ),
);

TooltipVanilla.displayName = 'TooltipVanilla';
