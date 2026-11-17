import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon, DividerHorizontalIcon } from '@radix-ui/react-icons';
import React from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import type { RecipeVariantProps } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { useFieldControl } from '@/components/Field/FieldContext';

import {
  checkboxCheckIcon,
  checkboxIndeterminateIcon,
  checkboxIndicator,
  checkboxRecipe,
} from './Checkbox.vanilla.css';

type CheckboxRecipeVariants = RecipeVariantProps<typeof checkboxRecipe>;

export interface CheckboxVanillaOwnProps extends CSSProps {
  size?: CheckboxRecipeVariants['size'];
}

export type CheckboxVanillaProps = Omit<
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  'asChild'
> &
  CheckboxVanillaOwnProps;

export const CheckboxVanilla = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxVanillaProps
>(
  (
    {
      id,
      disabled,
      size,
      className,
      css,
      style,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      ...props
    },
    forwardedRef,
  ) => {
    const control = useFieldControl({
      id,
      disabled,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
    });

    const mergedStyles = useInlineStyle(css, style);

    return (
      <CheckboxPrimitive.Root
        {...props}
        id={control.id}
        disabled={control.disabled}
        aria-describedby={control['aria-describedby']}
        aria-invalid={control['aria-invalid']}
        className={cx(checkboxRecipe({ size }), className)}
        style={mergedStyles}
        ref={forwardedRef}
      >
        <CheckboxPrimitive.Indicator className={checkboxIndicator}>
          <CheckIcon className={checkboxCheckIcon} height={40} width={40} aria-hidden />
          <DividerHorizontalIcon
            className={checkboxIndeterminateIcon}
            height={40}
            width={40}
            aria-hidden
          />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  },
);

CheckboxVanilla.displayName = 'CheckboxVanilla';
