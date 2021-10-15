import React from 'react';
import { styled } from '../../stitches.config';

import { Input, InputHandle, InputProps, InputVariants } from '../Input';
import { IconButton } from '../IconButton';
import { ExclamationTriangleIcon, CrossCircledIcon, EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';

// TYPES
export type TextFieldProps = InputProps & {
  type?: string,
  clearable?: boolean,
}

export type TextFieldVariants = InputVariants;

// COMPONENTS
const AdornmentGroup = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const StyledExclamationTriangleIcon = styled(ExclamationTriangleIcon, {
  color: '$slate10', // follow iconbutton default color
  '& + *': {
    marginLeft: '$1'
  }
});

export const TextField = React.forwardRef<
  React.ElementRef<typeof Input>,
  TextFieldProps
>(({ state, clearable, type, ...props }, forwardedRef) => {
  const inputRef = React.useRef<InputHandle | null>(null);
  React.useImperativeHandle(forwardedRef, () => inputRef.current as InputHandle);

  const [innerType, setInnerType] = React.useState(type);
  const isPasswordVisible = React.useMemo(
    () => innerType !== "password",
    [innerType],
  );

  const invalid = React.useMemo(
    () => state === 'invalid',
    [state],
  );

  const isPasswordType = React.useMemo(
    () => type === 'password',
    [type],
  );

  const typeOrInnerType = React.useMemo(
    () => isPasswordType ? innerType : type,
    [isPasswordType, type, innerType],
  );

  const hasAdornmentGroup = React.useMemo(
    () => (clearable && invalid)
      || (clearable && isPasswordType)
      || (invalid && isPasswordType),
    [clearable, invalid, isPasswordType],
  );

  const handleClear = React.useCallback(
    () => {
      const { current } = inputRef;
      if (current) {
        current.clear();
      }
    },
    [inputRef],
  );

  const togglePasswordVisibility = React.useCallback(
    () => {
      setInnerType(prevInnerType => prevInnerType === 'password' ? undefined : 'password');
    },
    [setInnerType],
  );

  const EndAdornmentWrapper = React.useMemo(
    () => hasAdornmentGroup ? AdornmentGroup : React.Fragment,
    [hasAdornmentGroup],
  );

  return (
    <Input
      ref={inputRef}
      endAdornment={(
        <EndAdornmentWrapper>
          {invalid && <StyledExclamationTriangleIcon />}
          {isPasswordType && (
            <IconButton onClick={togglePasswordVisibility}>
              {isPasswordVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
            </IconButton>
          )}
          {clearable && (
            <IconButton onClick={handleClear}>
              <CrossCircledIcon />
            </IconButton>
          )}
        </EndAdornmentWrapper>
      )}
      state={state}
      type={typeOrInnerType}
      {...props}
    />
  );
})