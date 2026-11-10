import {
  CrossCircledIcon,
  ExclamationTriangleIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from '@radix-ui/react-icons';
import React from 'react';

import { FieldVanilla } from '../Field/Field.vanilla';
import { FieldLabelProps, useFieldContext } from '../Field/FieldContext';
import { InputVanilla, InputVanillaHandle, InputVanillaProps } from '../Input';
import { Tooltip } from '../Tooltip';
import { adornmentButton, adornmentGroup, invalidIcon } from './TextField.vanilla.css';

// TYPES
export interface TextFieldLabelProps {
  variant: 'invalid' | 'subtle' | 'contrast' | 'default';
  htmlFor?: string;
  id?: string;
}

export type TextFieldVanillaProps = InputVanillaProps & {
  type?: string;
  clearable?: boolean;
  label?: string | ((props: TextFieldLabelProps) => JSX.Element);
  description?: React.ReactNode;
  error?: React.ReactNode;
  announceError?: boolean;
};

export const TextFieldVanilla = React.forwardRef<
  React.ElementRef<typeof InputVanilla>,
  TextFieldVanillaProps
>(
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
    const inputRef = React.useRef<InputVanillaHandle | null>(null);
    React.useImperativeHandle(forwardedRef, () => inputRef.current as InputVanillaHandle);

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

    const PasswordVisibilityToggleIcon = isPasswordVisible ? EyeClosedIcon : EyeOpenIcon;

    const passwordAction = React.useMemo(
      () => (isPasswordVisible ? 'Hide password' : 'Show password'),
      [isPasswordVisible],
    );

    const adornments = (
      <>
        {invalid && <ExclamationTriangleIcon className={invalidIcon} aria-hidden />}
        {isPasswordType && (
          <Tooltip content={passwordAction}>
            <button
              type="button"
              className={adornmentButton}
              aria-label={passwordAction}
              onClick={togglePasswordVisibility}
            >
              <PasswordVisibilityToggleIcon aria-hidden />
            </button>
          </Tooltip>
        )}
        {clearable && !clearDisabled && (
          <Tooltip content="Clear">
            <button
              type="button"
              className={adornmentButton}
              aria-label="Clear"
              onClick={handleClear}
            >
              <CrossCircledIcon aria-hidden />
            </button>
          </Tooltip>
        )}
      </>
    );

    const input = (
      <InputVanilla
        id={id}
        ref={inputRef}
        endAdornment={
          hasInnerAdornment &&
          (hasAdornmentGroup ? <div className={adornmentGroup}>{adornments}</div> : adornments)
        }
        state={state}
        type={typeOrInnerType}
        disabled={disabled}
        readOnly={readOnly}
        {...props}
      />
    );

    return (
      <FieldVanilla
        id={id}
        label={renderLabel}
        description={description}
        error={error}
        announceError={announceError}
        invalid={state === 'invalid'}
        disabled={disabled}
        css={{ boxSizing: 'border-box', ...css }}
      >
        {input}
      </FieldVanilla>
    );
  },
);

TextFieldVanilla.displayName = 'TextFieldVanilla';
