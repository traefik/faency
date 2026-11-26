import * as SwitchPrimitive from '@radix-ui/react-switch';
import { ElementType, forwardRef } from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicRef,
} from '@/styles/polymorphic';
import { RecipeVariantProps, splitVariants, withVariantKeys } from '@/styles/recipeVariants';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { useFieldControl } from '@/components/Field/FieldContext';

import { switchRecipe, switchThumb } from './Switch.vanilla.css';

const switchClass = withVariantKeys(switchRecipe);

type SwitchRecipeVariants = RecipeVariantProps<typeof switchRecipe>;

interface SwitchVanillaOwnProps extends SwitchRecipeVariants, CSSProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
}

export type SwitchVanillaProps<C extends ElementType = 'button'> = PolymorphicComponentProps<
  C,
  SwitchVanillaOwnProps
>;

type SwitchVanillaComponent = PolymorphicComponent<'button', SwitchVanillaOwnProps>;

const SwitchVanillaComponentImpl = forwardRef(
  <C extends ElementType = 'button'>(
    {
      as,
      className,
      css,
      style,
      id,
      checked,
      defaultChecked,
      onCheckedChange,
      disabled,
      required,
      name,
      value,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      'aria-labelledby': ariaLabelledBy,
      ...rest
    }: SwitchVanillaProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const [variants, props] = splitVariants(switchRecipe, rest);
    const mergedStyles = useInlineStyle(css, style);
    const recipeClass = switchClass(variants);

    const control = useFieldControl({
      id,
      disabled,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      labelable: !as,
    });

    // With `as`, the switch is a read-only indicator of `checked`, not a control.
    if (as) {
      const Component = as as ElementType;
      const state = (checked ?? defaultChecked) ? 'checked' : 'unchecked';

      return (
        <Component
          {...props}
          ref={ref}
          id={control.id}
          role="switch"
          aria-checked={state === 'checked'}
          aria-readonly
          aria-disabled={control.disabled}
          aria-labelledby={ariaLabelledBy ?? control.labelId}
          aria-describedby={control['aria-describedby']}
          aria-invalid={control['aria-invalid']}
          data-state={state}
          data-disabled={control.disabled ? '' : undefined}
          className={cx(recipeClass, className)}
          style={mergedStyles}
        >
          <span data-state={state} className={switchThumb} />
        </Component>
      );
    }

    return (
      <SwitchPrimitive.Root
        {...props}
        ref={ref}
        id={control.id}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={control.disabled}
        required={required}
        name={name}
        value={value}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={control['aria-describedby']}
        aria-invalid={control['aria-invalid']}
        className={cx(recipeClass, className)}
        style={mergedStyles}
      >
        <SwitchPrimitive.Thumb className={switchThumb} />
      </SwitchPrimitive.Root>
    );
  },
);

SwitchVanillaComponentImpl.displayName = 'SwitchVanilla';

export const SwitchVanilla = SwitchVanillaComponentImpl as SwitchVanillaComponent;
