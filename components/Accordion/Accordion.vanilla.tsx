import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import React from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import { RecipeVariantProps, splitVariants, withVariantKeys } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import {
  accordionChevron,
  accordionContent,
  accordionContentWrapperRecipe,
  accordionCustomIcon,
  accordionHeader,
  accordionItem,
  accordionRootRecipe,
  accordionTriggerLabelRecipe,
  accordionTriggerRecipe,
} from './Accordion.vanilla.css';

const accordionRootClass = withVariantKeys(accordionRootRecipe);

type RootRecipeVariants = RecipeVariantProps<typeof accordionRootRecipe>;
type TriggerRecipeVariants = RecipeVariantProps<typeof accordionTriggerRecipe>;

export type AccordionVanillaSize = TriggerRecipeVariants['size'];
export type AccordionHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | 'none';

type AccordionRootOwnProps = CSSProps & {
  elevation?: RootRecipeVariants['elevation'];
};

export type AccordionRootVanillaProps =
  | (Omit<AccordionPrimitive.AccordionSingleProps, 'asChild'> & AccordionRootOwnProps)
  | (Omit<AccordionPrimitive.AccordionMultipleProps, 'asChild'> & AccordionRootOwnProps);

export const AccordionRootVanilla = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionRootVanillaProps
>(({ className, css, style, ...rest }, forwardedRef) => {
  const [variants, props] = splitVariants(accordionRootRecipe, rest);
  const mergedStyles = useInlineStyle(css, style);

  return (
    <AccordionPrimitive.Root
      {...props}
      className={cx(accordionRootClass(variants), className)}
      style={mergedStyles}
      ref={forwardedRef}
    />
  );
});

AccordionRootVanilla.displayName = 'AccordionRootVanilla';

export type AccordionItemVanillaProps = Omit<
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>,
  'asChild'
> &
  CSSProps;

export const AccordionItemVanilla = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemVanillaProps
>(({ className, css, style, ...props }, forwardedRef) => {
  const mergedStyles = useInlineStyle(css, style);

  return (
    <AccordionPrimitive.Item
      {...props}
      className={cx(accordionItem, className)}
      style={mergedStyles}
      ref={forwardedRef}
    />
  );
});

AccordionItemVanilla.displayName = 'AccordionItemVanilla';

export type AccordionTriggerBaseVanillaProps = Omit<
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>,
  'asChild'
> &
  CSSProps & {
    size?: AccordionVanillaSize;
    headingLevel?: AccordionHeadingLevel;
  };

/** The trigger in its heading, with no icon or label wrapper. Shared with RadioAccordion. */
export const AccordionTriggerBaseVanilla = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerBaseVanillaProps
>(({ headingLevel = 3, className, css, style, ...rest }, forwardedRef) => {
  const [variants, props] = splitVariants(accordionTriggerRecipe, rest);
  const mergedStyles = useInlineStyle(css, style);
  const Heading = headingLevel === 'none' ? 'div' : (`h${headingLevel}` as const);

  return (
    <AccordionPrimitive.Header asChild className={accordionHeader}>
      <Heading>
        <AccordionPrimitive.Trigger
          {...props}
          className={cx(accordionTriggerRecipe(variants), className)}
          style={mergedStyles}
          ref={forwardedRef}
        />
      </Heading>
    </AccordionPrimitive.Header>
  );
});

AccordionTriggerBaseVanilla.displayName = 'AccordionTriggerBaseVanilla';

export type AccordionTriggerVanillaProps = AccordionTriggerBaseVanillaProps & {
  customIcon?: React.ReactNode;
  noIcon?: boolean;
};

export const AccordionTriggerVanilla = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerVanillaProps
>(({ children, noIcon = false, customIcon, ...props }, forwardedRef) => (
  <AccordionTriggerBaseVanilla {...props} ref={forwardedRef}>
    {!noIcon &&
      (customIcon ? (
        <div className={accordionCustomIcon} aria-hidden>
          {customIcon}
        </div>
      ) : (
        <ChevronRightIcon className={accordionChevron} aria-hidden />
      ))}
    <div className={accordionTriggerLabelRecipe({ noIcon })}>{children}</div>
  </AccordionTriggerBaseVanilla>
));

AccordionTriggerVanilla.displayName = 'AccordionTriggerVanilla';

export type AccordionContentVanillaProps = Omit<
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>,
  'asChild'
> &
  CSSProps & {
    size?: AccordionVanillaSize;
  };

export const AccordionContentVanilla = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentVanillaProps
>(({ children, className, css, style, ...rest }, forwardedRef) => {
  const [variants, props] = splitVariants(accordionContentWrapperRecipe, rest);
  const mergedStyles = useInlineStyle(css, style);

  return (
    <AccordionPrimitive.Content
      {...props}
      className={cx(accordionContent, className)}
      style={mergedStyles}
      ref={forwardedRef}
    >
      <div className={accordionContentWrapperRecipe(variants)}>{children}</div>
    </AccordionPrimitive.Content>
  );
});

AccordionContentVanilla.displayName = 'AccordionContentVanilla';
