import { assignInlineVars } from '@vanilla-extract/dynamic';
import { RecipeVariants } from '@vanilla-extract/recipes';
import React from 'react';

import { CSSProps, processCSSProp } from '../../styles/cssProps';
import { useVanillaExtractTheme } from '../../styles/themeContext';
import { FieldVanilla } from '../Field/Field.vanilla';
import { FieldLabelProps, useFieldControl } from '../Field/FieldContext';
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
  description?: React.ReactNode;
  error?: React.ReactNode;
  announceError?: boolean;
  endAdornment?: React.ReactNode;
  rootCss?: CSSProps['css'];
}

export type TextareaVanillaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> &
  TextareaVanillaOwnProps;

type TextareaVanillaControlProps = Omit<
  TextareaVanillaProps,
  'label' | 'description' | 'error' | 'announceError' | 'rootCss'
>;

const TextareaVanillaControl = React.forwardRef<HTMLTextAreaElement, TextareaVanillaControlProps>(
  (
    {
      state,
      disabled,
      id,
      css,
      endAdornment,
      variant,
      cursor,
      resize,
      className,
      style,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      ...props
    },
    forwardedRef,
  ) => {
    const { colors } = useVanillaExtractTheme();
    const control = useFieldControl({
      id,
      disabled,
      invalid: state === 'invalid',
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
    });
    const resolvedState = control.invalid ? 'invalid' : state;
    const hasEndAdornment = Boolean(endAdornment);

    const { style: cssStyles, vars } = processCSSProp(css, colors);
    const mergedStyles = { ...cssStyles, ...style, ...assignInlineVars(vars) };

    const textareaWrapperClass = textareaWrapperRecipe({
      state: resolvedState,
      disabled: control.disabled,
    });
    const styledTextareaClass = styledTextareaRecipe({
      variant,
      state: resolvedState,
      cursor,
      resize,
      endAdornment: hasEndAdornment,
    });

    return (
      <div className={textareaWrapperClass}>
        <textarea
          id={control.id}
          disabled={control.disabled}
          ref={forwardedRef}
          className={`${styledTextareaClass} ${className || ''}`.trim()}
          style={mergedStyles}
          aria-describedby={control['aria-describedby']}
          aria-invalid={control['aria-invalid']}
          {...props}
        />
        {hasEndAdornment && <div className={adornmentWrapperEnd}>{endAdornment}</div>}
      </div>
    );
  },
);

TextareaVanillaControl.displayName = 'TextareaVanillaControl';

export const TextareaVanilla = React.forwardRef<HTMLTextAreaElement, TextareaVanillaProps>(
  ({ label, description, error, announceError, id, rootCss, state, ...props }, forwardedRef) => {
    return (
      <FieldVanilla
        id={id}
        label={
          label &&
          ((labelProps: FieldLabelProps) => (
            <LabelVanilla {...labelProps} css={{ display: 'block' }}>
              {label}
            </LabelVanilla>
          ))
        }
        description={description}
        error={error}
        announceError={announceError}
        invalid={state === 'invalid'}
        disabled={props.disabled}
        css={rootCss}
      >
        <TextareaVanillaControl ref={forwardedRef} id={id} state={state} {...props} />
      </FieldVanilla>
    );
  },
);

TextareaVanilla.displayName = 'TextareaVanilla';
