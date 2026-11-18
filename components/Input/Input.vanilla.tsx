import { RecipeVariants } from '@vanilla-extract/recipes';
import React from 'react';

import { CSSProps } from '@/styles/cssProps';
import { cx } from '@/styles/cx';
import { useInlineStyle } from '@/styles/useInlineStyle';

import { useFieldControl } from '@/components/Field/FieldContext';

import { adornmentWrapperRecipe, inputWrapperRecipe, styledInputRecipe } from './Input.vanilla.css';

type StyledInputRecipeVariants = NonNullable<RecipeVariants<typeof styledInputRecipe>>;

export interface InputVanillaOwnProps extends CSSProps {
  size?: StyledInputRecipeVariants['size'];
  variant?: StyledInputRecipeVariants['variant'];
  state?: StyledInputRecipeVariants['state'];
  cursor?: StyledInputRecipeVariants['cursor'];
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  type?: string;
}

export type InputVanillaProps = Omit<React.InputHTMLAttributes<any>, 'size'> & InputVanillaOwnProps;

export interface InputVanillaHandle extends HTMLInputElement {
  clear: () => void;
}

export const InputVanilla = React.forwardRef<InputVanillaHandle, InputVanillaProps>(
  (
    {
      size,
      startAdornment,
      endAdornment,
      css,
      variant,
      state,
      cursor,
      className,
      style,
      id,
      disabled,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      ...props
    },
    forwardedRef,
  ) => {
    const inputRef = React.useRef<InputVanillaHandle>(null);
    const control = useFieldControl({
      id,
      disabled,
      invalid: state === 'invalid',
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
    });
    const resolvedState = control.invalid ? 'invalid' : state;
    const mergedStyles = useInlineStyle(css, style);

    React.useImperativeHandle(forwardedRef, () => {
      const { current } = inputRef;
      if (current) {
        current.clear = () => {
          current.value = '';
        };
      }
      return current as InputVanillaHandle;
    }, [inputRef]);

    const hasStartAdornment = React.useMemo(() => Boolean(startAdornment), [startAdornment]);
    const hasEndAdornment = React.useMemo(() => Boolean(endAdornment), [endAdornment]);

    const inputWrapperClass = inputWrapperRecipe({
      disabled: control.disabled,
      state: resolvedState,
      size,
    });

    const styledInputClass = styledInputRecipe({
      size,
      variant,
      state: resolvedState,
      cursor,
      startAdornment: hasStartAdornment,
      endAdornment: hasEndAdornment,
    });

    const adornmentWrapperStartClass = adornmentWrapperRecipe({
      size,
      variant: 'start',
    });

    const adornmentWrapperEndClass = adornmentWrapperRecipe({
      size,
      variant: 'end',
    });

    return (
      <div className={cx(inputWrapperClass, className)} style={mergedStyles}>
        {hasStartAdornment && <div className={adornmentWrapperStartClass}>{startAdornment}</div>}

        <input
          ref={inputRef}
          className={styledInputClass}
          id={control.id}
          disabled={control.disabled}
          aria-describedby={control['aria-describedby']}
          aria-invalid={control['aria-invalid']}
          {...props}
        />

        {hasEndAdornment && <div className={adornmentWrapperEndClass}>{endAdornment}</div>}
      </div>
    );
  },
);

InputVanilla.displayName = 'InputVanilla';
