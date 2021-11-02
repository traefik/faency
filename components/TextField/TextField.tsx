import React from 'react';
import { styled } from '../../stitches.config';

import { Box } from '../Box';
import { Input, InputHandle, InputProps, InputVariants } from '../Input';
import { Label } from '../Label';
import { IconButton } from '../IconButton';
import {
  ExclamationTriangleIcon,
  CrossCircledIcon,
  EyeOpenIcon,
  EyeClosedIcon,
} from '@radix-ui/react-icons';

// TYPES
export type TextFieldProps = InputProps & {
  type?: string;
  clearable?: boolean;
  label?: string;
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

export const TextField = React.forwardRef<React.ElementRef<typeof Input>, TextFieldProps>(
  (
    { state, clearable, label, id, type, disabled, readOnly, onBlur, onFocus, css, ...props },
    forwardedRef
  ) => {
    const inputRef = React.useRef<InputHandle | null>(null);
    React.useImperativeHandle(forwardedRef, () => inputRef.current as InputHandle);

    const [inputHasFocus, setInputHasFocus] = React.useState(false);
    const [innerType, setInnerType] = React.useState(type);
    const isPasswordVisible = React.useMemo(() => innerType !== 'password', [innerType]);

    const invalid = React.useMemo(() => state === 'invalid', [state]);

    const labelVariant = React.useMemo(() => {
      if (invalid) {
        return 'red';
      }
      if (disabled) {
        return 'subtle';
      }
      if (inputHasFocus) {
        return 'contrast';
      }
      return 'default';
    }, [invalid, disabled, inputHasFocus]);

    const isPasswordType = React.useMemo(() => type === 'password', [type]);

    const typeOrInnerType = React.useMemo(() => (isPasswordType ? innerType : type), [
      isPasswordType,
      type,
      innerType,
    ]);

    const hasInnerAdornment = React.useMemo(() => clearable || isPasswordType || invalid, [
      clearable,
      isPasswordType,
      invalid,
    ]);

    const hasAdornmentGroup = React.useMemo(
      () => (clearable && invalid) || (clearable && isPasswordType) || (invalid && isPasswordType),
      [clearable, invalid, isPasswordType]
    );

    const clearDisabled = React.useMemo(() => readOnly || disabled, [readOnly, disabled]);

    const handleClear = React.useCallback(() => {
      const { current } = inputRef;
      if (current) {
        current.clear();
      }
    }, [inputRef]);

    const handleFocus = React.useCallback(
      (e) => {
        if (onFocus) {
          onFocus(e);
        }
        setInputHasFocus(true);
      },
      [onFocus, setInputHasFocus]
    );

    const handleBlur = React.useCallback(
      (e) => {
        if (onBlur) {
          onBlur(e);
        }
        setInputHasFocus(false);
      },
      [onBlur, setInputHasFocus]
    );

    const togglePasswordVisibility = React.useCallback(() => {
      setInnerType((prevInnerType) => (prevInnerType === 'password' ? undefined : 'password'));
    }, [setInnerType]);

    const EndAdornmentWrapper = React.useMemo(
      () => (hasAdornmentGroup ? AdornmentGroup : React.Fragment),
      [hasAdornmentGroup]
    );

    return (
      <Box css={css}>
        {label && (
          <Label variant={labelVariant} disabled={disabled} invalid={invalid} htmlFor={id}>
            {label}
          </Label>
        )}
        <Input
          id={id}
          ref={inputRef}
          endAdornment={
            hasInnerAdornment && (
              <EndAdornmentWrapper>
                {invalid && <StyledExclamationTriangleIcon />}
                {isPasswordType && (
                  <IconButton
                    type="button"
                    onClick={togglePasswordVisibility}
                    size="1"
                    tabIndex={-1}
                  >
                    {isPasswordVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
                  </IconButton>
                )}
                {clearable && (
                  <IconButton
                    disabled={clearDisabled}
                    type="button"
                    onClick={handleClear}
                    size="1"
                    tabIndex={-1}
                  >
                    <CrossCircledIcon />
                  </IconButton>
                )}
              </EndAdornmentWrapper>
            )
          }
          state={state}
          type={typeOrInnerType}
          disabled={disabled}
          readOnly={readOnly}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </Box>
    );
  }
);
