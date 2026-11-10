import {
  CrossCircledIcon,
  ExclamationTriangleIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from '@radix-ui/react-icons';
import React from 'react';

import { styled } from '../../stitches.config';
import { Field } from '../Field/Field';
import { FieldLabelProps, useFieldContext } from '../Field/FieldContext';
import { Input, InputHandle, InputProps, InputVariants } from '../Input';
import { Tooltip } from '../Tooltip';

// TYPES
export interface TextFieldLabelProps {
  variant: 'invalid' | 'subtle' | 'contrast' | 'default';
  htmlFor?: string;
  id?: string;
}
export type TextFieldProps = InputProps & {
  type?: string;
  clearable?: boolean;
  label?: string | ((props: TextFieldLabelProps) => JSX.Element);
  description?: React.ReactNode;
  error?: React.ReactNode;
  announceError?: boolean;
};

export type TextFieldVariants = InputVariants;

// COMPONENTS
const AdornmentGroup = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const StyledExclamationTriangleIcon = styled(ExclamationTriangleIcon, {
  '& + *': {
    marginLeft: '$1',
  },
});

const AdornmentButton = styled('button', {
  appearance: 'none',
  background: 'none',
  border: 'none',
  padding: 0,
  font: 'inherit',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$1',
  color: 'inherit',
  '@hover': {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  '&:focus-visible': {
    outline: '2px solid $inputFocusBorder',
    outlineOffset: '1px',
  },
});

export const TextField = React.forwardRef<React.ElementRef<typeof Input>, TextFieldProps>(
  (
    {
      state,
      clearable,
      label: LabelOrComponent,
      description,
      error,
      announceError,
      id,
      type,
      disabled,
      readOnly,
      css,
      ...props
    },
    forwardedRef,
  ) => {
    const inputRef = React.useRef<InputHandle | null>(null);
    React.useImperativeHandle(forwardedRef, () => inputRef.current as InputHandle);

    const outerField = useFieldContext();
    const [innerType, setInnerType] = React.useState(type);
    const isPasswordVisible = React.useMemo(() => innerType !== 'password', [innerType]);

    const invalid = state === 'invalid' || Boolean(error) || Boolean(outerField?.invalid);

    const renderLabel = React.useMemo(() => {
      if (LabelOrComponent === undefined || LabelOrComponent === null) {
        return undefined;
      }
      if (typeof LabelOrComponent === 'string') {
        return LabelOrComponent;
      }
      return (labelProps: FieldLabelProps) => <LabelOrComponent {...labelProps} />;
    }, [LabelOrComponent]);

    const isPasswordType = React.useMemo(() => type === 'password', [type]);

    const typeOrInnerType = React.useMemo(
      () => (isPasswordType ? innerType : type),
      [isPasswordType, type, innerType],
    );

    const hasInnerAdornment = React.useMemo(
      () => clearable || isPasswordType || invalid,
      [clearable, isPasswordType, invalid],
    );

    const hasAdornmentGroup = React.useMemo(
      () => (clearable && invalid) || (clearable && isPasswordType) || (invalid && isPasswordType),
      [clearable, invalid, isPasswordType],
    );

    const clearDisabled = readOnly || disabled || Boolean(outerField?.disabled);

    const handleClear = React.useCallback(() => {
      const { current } = inputRef;
      if (current) {
        const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
        setValue?.call(current, '');
        current.dispatchEvent(new Event('input', { bubbles: true }));
        current.focus();
      }
    }, [inputRef]);

    const togglePasswordVisibility = React.useCallback(() => {
      setInnerType((prevInnerType) => (prevInnerType === 'password' ? undefined : 'password'));
    }, [setInnerType]);

    const EndAdornmentWrapper = hasAdornmentGroup ? AdornmentGroup : React.Fragment;

    const PasswordVisibilityToggleIcon = isPasswordVisible ? EyeClosedIcon : EyeOpenIcon;

    const passwordAction = React.useMemo(
      () => (isPasswordVisible ? 'Hide password' : 'Show password'),
      [isPasswordVisible],
    );

    const input = (
      <Input
        id={id}
        ref={inputRef}
        endAdornment={
          hasInnerAdornment && (
            <EndAdornmentWrapper>
              {invalid && <StyledExclamationTriangleIcon aria-hidden />}
              {isPasswordType && (
                <Tooltip content={passwordAction}>
                  <AdornmentButton
                    type="button"
                    aria-label={passwordAction}
                    onClick={togglePasswordVisibility}
                  >
                    <PasswordVisibilityToggleIcon aria-hidden />
                  </AdornmentButton>
                </Tooltip>
              )}
              {clearable && !clearDisabled && (
                <Tooltip content="Clear">
                  <AdornmentButton type="button" aria-label="Clear" onClick={handleClear}>
                    <CrossCircledIcon aria-hidden />
                  </AdornmentButton>
                </Tooltip>
              )}
            </EndAdornmentWrapper>
          )
        }
        state={state}
        type={typeOrInnerType}
        disabled={disabled}
        readOnly={readOnly}
        {...props}
      />
    );

    return (
      <Field
        id={id}
        label={renderLabel}
        description={description}
        error={error}
        announceError={announceError}
        invalid={state === 'invalid'}
        disabled={disabled}
        css={css}
      >
        {input}
      </Field>
    );
  },
);
