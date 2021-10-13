import React from 'react';
import { styled } from '../../stitches.config';

import { Input, InputProps, InputVariants } from '../Input';
import { IconButton } from '../IconButton';
import { ExclamationTriangleIcon, CrossCircledIcon } from '@radix-ui/react-icons';

// COMPONENTS
const AdornmentGroup = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

// TYPES
export type TextFieldProps = InputProps & {
  clearable?: boolean,
}

export type TextFieldVariants = InputVariants;

export const TextField = React.forwardRef<
  HTMLInputElement,
  TextFieldProps
>(({ state, clearable, ...props }, forwardedRef) => {
  const inputRef = React.useRef<HTMLInputElement | null>(forwardedRef);

  const invalid = React.useMemo(
    () => state === 'invalid',
    [state],
  );

  const handleClear = React.useCallback(
    () => {
      const { current } = inputRef;
      if (current) {
        current.value = '';
      }
    },
    [inputRef],
  );

  const endAdornment = React.useMemo(
    () => {
      if (clearable && invalid) {
        return (
          <AdornmentGroup>
            <ExclamationTriangleIcon />
            <IconButton onClick={handleClear}>
              <CrossCircledIcon />
            </IconButton>
          </AdornmentGroup>
        )
      }
      if (clearable) {
        return (
          <IconButton onClick={handleClear}>
            <CrossCircledIcon />
          </IconButton>
        )
      }
      if (invalid) {
        return <ExclamationTriangleIcon />
      }
      return null;
    },
    [clearable, invalid, handleClear],
  );

  return (
    <Input
      ref={inputRef}
      endAdornment={endAdornment}
      state={state}
      {...props}
    />
  );
})