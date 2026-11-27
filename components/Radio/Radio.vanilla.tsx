import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import React from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import { RecipeVariantProps, splitVariants } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { useFieldControl } from '@/components/Field/FieldContext';

import { radioGroup, radioIndicator, radioRecipe } from './Radio.vanilla.css';

type RadioRecipeVariants = RecipeVariantProps<typeof radioRecipe>;

export type RadioGroupVanillaProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
  'asChild'
> &
  CSSProps;

export const RadioGroupVanilla = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupVanillaProps
>(
  (
    {
      id,
      disabled,
      className,
      css,
      style,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    forwardedRef,
  ) => {
    const control = useFieldControl({
      id,
      disabled,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      labelable: false,
    });

    const mergedStyles = useInlineStyle(css, style);

    return (
      <RadioGroupPrimitive.Root
        {...props}
        id={control.id}
        disabled={control.disabled}
        aria-labelledby={ariaLabelledBy ?? control.labelId}
        aria-describedby={control['aria-describedby']}
        aria-invalid={control['aria-invalid']}
        className={cx(radioGroup, className)}
        style={mergedStyles}
        ref={forwardedRef}
      />
    );
  },
);

RadioGroupVanilla.displayName = 'RadioGroupVanilla';

export interface RadioVanillaOwnProps extends CSSProps {
  size?: RadioRecipeVariants['size'];
}

export type RadioVanillaProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
  'asChild'
> &
  RadioVanillaOwnProps;

export const RadioVanilla = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioVanillaProps
>(({ className, css, style, ...rest }, forwardedRef) => {
  const [variants, props] = splitVariants(radioRecipe, rest);
  const mergedStyles = useInlineStyle(css, style);

  return (
    <RadioGroupPrimitive.Item
      {...props}
      className={cx(radioRecipe(variants), className)}
      style={mergedStyles}
      ref={forwardedRef}
    >
      <RadioGroupPrimitive.Indicator className={radioIndicator} />
    </RadioGroupPrimitive.Item>
  );
});

RadioVanilla.displayName = 'RadioVanilla';
