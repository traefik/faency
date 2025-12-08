import { assignInlineVars } from '@vanilla-extract/dynamic';
import { RecipeVariants } from '@vanilla-extract/recipes';
import React from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { LabelVanilla } from '../Label';
import {
  adornmentWrapperEnd,
  styledTextareaRecipe,
  textareaWrapperRecipe,
} from './Textarea.vanilla.css';

type StyledTextareaRecipeVariants = NonNullable<RecipeVariants<typeof styledTextareaRecipe>>;

export interface TextareaVanillaOwnProps extends CSSProps {
  variant?: StyledTextareaRecipeVariants['variant'];
  state?: StyledTextareaRecipeVariants['state'];
  cursor?: StyledTextareaRecipeVariants['cursor'];
  resize?: StyledTextareaRecipeVariants['resize'];
  label?: string;
  endAdornment?: React.ReactNode;
  rootCss?: CSSProps['css'];
}

export type TextareaVanillaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> &
  TextareaVanillaOwnProps;

export const TextareaVanilla = React.forwardRef<HTMLTextAreaElement, TextareaVanillaProps>(
  (
    {
      state,
      disabled,
      onFocus,
      onBlur,
      label,
      id,
      rootCss,
      css,
      endAdornment,
      variant,
      cursor,
      resize,
      className,
      style,
      ...props
    },
    forwardedRef,
  ) => {
    const [hasFocus, setHasFocus] = React.useState(false);
    const { colors } = useVanillaExtractTheme();

    const invalid = React.useMemo(() => state === 'invalid', [state]);
    const hasEndAdornment = React.useMemo(() => Boolean(endAdornment), [endAdornment]);

    const labelVariant = React.useMemo(() => {
      if (disabled) {
        return 'subtle';
      }
      if (invalid) {
        return 'invalid';
      }
      if (hasFocus) {
        return 'contrast';
      }
      return 'default';
    }, [invalid, disabled, hasFocus]);

    const handleFocus = React.useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (onFocus) {
          onFocus(e);
        }
        setHasFocus(true);
      },
      [onFocus, setHasFocus],
    );

    const handleBlur = React.useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (onBlur) {
          onBlur(e);
        }
        setHasFocus(false);
      },
      [onBlur, setHasFocus],
    );

    const { style: rootCssStyles, vars: rootVars } = processCSSProp(rootCss, colors);
    const rootMergedStyles = { ...rootCssStyles, ...assignInlineVars(rootVars) };

    const { style: cssStyles, vars } = processCSSProp(css, colors);
    const mergedStyles = { ...cssStyles, ...style, ...assignInlineVars(vars) };

    const textareaWrapperClass = textareaWrapperRecipe({ state, disabled });
    const styledTextareaClass = styledTextareaRecipe({
      variant,
      state,
      cursor,
      resize,
      endAdornment: hasEndAdornment,
    });

    return (
      <div style={rootMergedStyles}>
        {label && (
          <LabelVanilla variant={labelVariant} htmlFor={id} css={{ display: 'block' }}>
            {label}
          </LabelVanilla>
        )}
        <div className={textareaWrapperClass}>
          <textarea
            id={id}
            ref={forwardedRef}
            className={`${styledTextareaClass} ${className || ''}`.trim()}
            style={mergedStyles}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {hasEndAdornment && <div className={adornmentWrapperEnd}>{endAdornment}</div>}
        </div>
      </div>
    );
  },
);

TextareaVanilla.displayName = 'TextareaVanilla';
