import { assignInlineVars } from '@vanilla-extract/dynamic';
import { RecipeVariants } from '@vanilla-extract/recipes';
import React from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
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
    { size, startAdornment, endAdornment, css, variant, state, cursor, className, style, ...props },
    forwardedRef,
  ) => {
    const inputRef = React.useRef<InputVanillaHandle>(null);
    const { colors } = useVanillaExtractTheme();
    const { style: cssStyles, vars } = processCSSProp(css, colors);
    const mergedStyles = { ...cssStyles, ...style, ...assignInlineVars(vars) };

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
      disabled: props.disabled,
      state,
      size,
    });

    const styledInputClass = styledInputRecipe({
      size,
      variant,
      state,
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
      <div className={`${inputWrapperClass} ${className || ''}`.trim()} style={mergedStyles}>
        {hasStartAdornment && <div className={adornmentWrapperStartClass}>{startAdornment}</div>}

        <input ref={inputRef} className={styledInputClass} {...props} />

        {hasEndAdornment && <div className={adornmentWrapperEndClass}>{endAdornment}</div>}
      </div>
    );
  },
);

InputVanilla.displayName = 'InputVanilla';
