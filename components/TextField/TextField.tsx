import React from 'react';
import { styled } from '../../stitches.config';

import { Box } from '../Box';
import { Input, InputHandle, InputProps, InputVariants } from '../Input';
import { Label } from '../Label';
import { Tooltip } from '../Tooltip';
import {
  ExclamationTriangleIcon,
  CrossCircledIcon,
  EyeOpenIcon,
  EyeClosedIcon,
} from '@radix-ui/react-icons';

// TYPES
export interface TextFieldLabelProps {
  variant: 'invalid' | 'subtle' | 'contrast' | 'default';
  htmlFor?: string;
}
export type TextFieldProps = InputProps & {
  type?: string;
  clearable?: boolean;
  label?: string | ((props: TextFieldLabelProps) => JSX.Element);
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

const StyledEyeOpenIcon = styled(EyeOpenIcon, {
  '@hover': {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

const StyledEyeClosedIcon = styled(EyeClosedIcon, {
  '@hover': {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

const StyledCrossCircledIcon = styled(CrossCircledIcon, {
  '@hover': {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

export const TextField = React.forwardRef<React.ElementRef<typeof Input>, TextFieldProps>(
  (
    {
      state,
      clearable,
      label: LabelOrComponent,
      id,
      type,
      disabled,
      readOnly,
      onBlur,
      onFocus,
      css,
      ...props
    },
    forwardedRef
  ) => {
    const inputRef = React.useRef<InputHandle | null>(null);
    React.useImperativeHandle(forwardedRef, () => inputRef.current as InputHandle);

    const [inputHasFocus, setInputHasFocus] = React.useState(false);
    const [innerType, setInnerType] = React.useState(type);
    const isPasswordVisible = React.useMemo(() => innerType !== 'password', [innerType]);

    const invalid = React.useMemo(() => state === 'invalid', [state]);

    const labelVariant = React.useMemo(() => {
      if (disabled) {
        return 'subtle';
      }
      if (invalid) {
        return 'invalid';
      }
      if (inputHasFocus) {
        return 'contrast';
      }
      return 'default';
    }, [invalid, disabled, inputHasFocus]);

    const LabelNode = React.useMemo(() => {
      if (LabelOrComponent === undefined || LabelOrComponent === null) {
        return null;
      }
      if (typeof LabelOrComponent === 'string') {
        return (
          <Label variant={labelVariant} htmlFor={id}>
            {LabelOrComponent}
          </Label>
        );
      }
      return <LabelOrComponent variant={labelVariant} htmlFor={id} />;
    }, [LabelOrComponent, labelVariant, id]);

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

    const PasswordVisibilityToggleIcon = React.useMemo(
      () => (isPasswordVisible ? StyledEyeClosedIcon : StyledEyeOpenIcon),
      [isPasswordVisible]
    );

    const passwordAction = React.useMemo(
      () => (isPasswordVisible ? 'Hide password' : 'Show password'),
      [isPasswordVisible]
    );

    return (
      <Box css={css}>
        {LabelNode}
        <Input
          id={id}
          ref={inputRef}
          endAdornment={
            hasInnerAdornment && (
              <EndAdornmentWrapper>
                {invalid && <StyledExclamationTriangleIcon role="alert" aria-label="Invalid" />}
                {isPasswordType && (
                  <Tooltip content={passwordAction}>
                    <PasswordVisibilityToggleIcon
                      aria-label={passwordAction}
                      onClick={togglePasswordVisibility}
                    />
                  </Tooltip>
                )}
                {clearable && !clearDisabled && (
                  <Tooltip content="Clear">
                    <StyledCrossCircledIcon aria-label="Clear" onClick={handleClear} />
                  </Tooltip>
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
