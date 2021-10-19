import React from 'react';
import { VariantProps } from '@stitches/react';
import { styled, CSS } from '../../stitches.config';

import { IconButton } from '../IconButton';

const StyledInput = styled('input', {
  // Reset
  appearance: 'none',
  borderWidth: '0',
  boxSizing: 'border-box',
  fontFamily: '$rubik',
  margin: '0',
  outline: 'none',
  padding: '0',
  width: '100%',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },

  // Custom
  position: 'relative',
  backgroundColor: '$inputBg',
  boxShadow: 'inset 0 0 0 1px $colors$inputBorder',
  color: '$inputText',
  fontVariantNumeric: 'tabular-nums',
  transition: 'box-shadow .1s ease-in-out',
  '&[type="number"]': {
    pr: '0', // remove padding for number native controls
  },
  '&:-webkit-autofill': {
    boxShadow: 'inset 0 0 0 2px $colors$inputBorder, inset 0 0 0 100px $colors$inputBg',
  },

  '&:-webkit-autofill::first-line': {
    fontFamily: '$rubik',
    color: '$hiContrast',
  },

  '@hover': {
    '&:hover': {
      backgroundColor: '$inputHoverBg',
    },
  },

  '&:focus': {
    backgroundColor: '$inputFocusBg',
  },

  '&:focus-visible': {
    backgroundColor: '$inputFocusBg',
    boxShadow:
      'inset 0px 0px 0px 1px $colors$inputFocusBorder, 0px 0px 0px 1px $colors$inputFocusBorder',
    '&:-webkit-autofill': {
      boxShadow:
        'inset 0 0 0 2px $colors$inputFocusBorder, inset 0 0 0 100px $colors$inputBg',
    },
  },
  '&::placeholder': {
    color: '$inputPlaceholder',
  },
  '&:read-only': {
    boxShadow: 'inset 0px 0px 0px 1px $colors$inputReadOnlyBorder',
    '&:focus-visible': {
      boxShadow: 'inset 0px 0px 0px 1px $colors$inputBorder',
    },
  },
  '&:disabled': {
    pointerEvents: 'none',
    color: '$inputDisabledText',
    boxShadow: 'inset 0 0 0 1px $colors$inputDisabledBorder',
    '&::placeholder': {
      color: '$inputDisabledText',
    },
  },
  variants: {
    size: {
      small: {
        borderRadius: '$2',
        height: '$5',
        fontSize: '$1',
        px: '$2',
        lineHeight: '$sizes$5',
        '&:-webkit-autofill::first-line': {
          fontSize: '$1',
        },
      },
      medium: {
        borderRadius: '$3',
        height: '$6',
        fontSize: '$3',
        px: '$3',
        lineHeight: '$sizes$6',
        '&:-webkit-autofill::first-line': {
          fontSize: '$3',
        },
      },
      large: {
        borderRadius: '$3',
        height: '$7',
        fontSize: '$3',
        px: '$3',
        lineHeight: '$sizes$7',
        '&:-webkit-autofill::first-line': {
          fontSize: '$3',
        },
      },
    },
    startAdornment: {
      true: {},
    },
    endAdornment: {
      true: {}
    },
    variant: {
      ghost: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        '@hover': {
          '&:hover': {
            boxShadow: 'inset 0 0 0 1px $colors$inputHoverBorderGhost',
          },
        },
        '&:focus': {
          backgroundColor: '$loContrast',
        },
        '&:focus-visible': {
          boxShadow: 'inset 0px 0px 0px 1px $colors$inputFocusBorderGhost, 0px 0px 0px 1px $colors$inputFocusBorderGhost',
        },
      },
    },
    state: {
      invalid: {
        boxShadow: 'inset 0 0 0 1px $colors$inputInvalidBorder',
        '&:focus-visible': {
          boxShadow: 'inset 0px 0px 0px 1px $colors$inputInvalidBorder, 0px 0px 0px 1px $colors$inputInvalidBorder',
        },
      },
    },
    cursor: {
      default: {
        cursor: 'default',
        '@hover': {
          '&:hover:not(:read-only)': {
            cursor: 'text',
          },
        },
        '&:focus:not(:read-only)': {
          cursor: 'text',
        },
      },
      text: {
        cursor: 'text',
      },
    },
  },
  defaultVariants: {
    size: 'medium',
    cursor: 'default'
  },
  compoundVariants: [
    {
      startAdornment: true,
      size: 'small',
      css: {
        paddingInlineStart: 'calc($2 + 15px)',
      }
    },
    {
      startAdornment: true,
      size: 'medium',
      css: {
        paddingInlineStart: 'calc($3 + 15px)',
      }
    },
    {
      startAdornment: true,
      size: 'large',
      css: {
        paddingInlineStart: 'calc($3 + 15px)',
      }
    },
    {
      endAdornment: true,
      size: 'small',
      css: {
        paddingInlineEnd: 'calc($2 + 15px)',
      }
    },
    {
      endAdornment: true,
      size: 'medium',
      css: {
        paddingInlineEnd: 'calc($3 + 15px)',
      }
    },
    {
      endAdornment: true,
      size: 'large',
      css: {
        paddingInlineEnd: 'calc($3 + 15px)',
      }
    },
  ]
});

const InputWrapper = styled('div', {
  position: 'relative',
  backgroundColor: '$wrapperBg',
});

const AdornmentWrapper = styled('div', {
  position: 'absolute',
  top: 0,
  zIndex: 1,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  variants: {
    size: {
      small: {
        mx: 'calc($2 / 2)',
      },
      medium: {
        mx: 'calc($3 / 2)',
      },
      large: {
        mx: 'calc($3 / 2)',
      }
    },
    variant: {
      start: {
        left: 0,
      },
      end: {
        right: 0,
      }
    }
  },
  compoundVariants: [
    {
      variant: 'start',
      size: 'small',
      css: {
        [`& ${IconButton}:first-of-type`]: { // remove start margin for first IconButton
          marginInlineStart: 'calc(-$2 / 2)'
        }
      }
    },
    {
      variant: 'start',
      size: 'medium',
      css: {
        [`& ${IconButton}:first-of-type`]: { // remove start margin for first IconButton
          marginInlineStart: 'calc(-$3 / 2)'
        }
      }
    },
    {
      variant: 'start',
      size: 'large',
      css: {
        [`& ${IconButton}:first-of-type`]: { // remove start margin for first IconButton
          marginInlineStart: 'calc(-$3 / 2)'
        }
      }
    },
    {
      variant: 'end',
      size: 'small',
      css: {
        [`& ${IconButton}:last-of-type`]: { // remove end margin for last IconButton
          marginInlineEnd: 'calc(-$3 / 2)'
        }
      }
    },
    {
      variant: 'end',
      size: 'medium',
      css: {
        [`& ${IconButton}:last-of-type`]: { // remove end margin for last IconButton
          marginInlineEnd: 'calc(-$3 / 2)'
        }
      }
    },
    {
      variant: 'end',
      size: 'large',
      css: {
        [`& ${IconButton}:last-of-type`]: { // remove end margin for last IconButton
          marginInlineEnd: 'calc(-$3 / 2)'
        }
      }
    },

  ],
  defaultVariants: {
    size: 'medium',
  },
});

type DefaultInputVariants = VariantProps<typeof StyledInput>;
export type InputVariants = Omit<DefaultInputVariants, "startAdornment" | "endAdornment">
export interface HTMLInputProps extends React.InputHTMLAttributes<any> {
  startAdornment?: React.ReactNode | null;
  endAdornment?: React.ReactNode | null;
  type?: string;
};

export type InputProps = Omit<HTMLInputProps, "size"> & InputVariants & { css?: CSS };

export type InputHandle = {
  clear: () => void
  focus: () => void
}

export const Input = React.forwardRef<
  InputHandle,
  InputProps
>(({ startAdornment, endAdornment, size, css, ...props }, forwardedRef) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useImperativeHandle(forwardedRef, () => ({
    clear: () => {
      const { current } = inputRef;
      if (current) {
        current.value = '';
      }
    },
    focus: () => {
      const { current } = inputRef;
      if (current) {
        current.focus();
      }
    }
  }), [inputRef]);

  const hasStartAdornment = React.useMemo(
    () => Boolean(startAdornment),
    [startAdornment],
  );

  const hasEndAdornment = React.useMemo(
    () => Boolean(endAdornment),
    [endAdornment],
  );

  return (
    <InputWrapper css={css}>
      {hasStartAdornment && (
        <AdornmentWrapper
          variant="start"
          size={size}
        >
          {startAdornment}
        </AdornmentWrapper>
      )}
      <StyledInput
        ref={inputRef}
        startAdornment={hasStartAdornment}
        endAdornment={hasEndAdornment}
        size={size}
        {...props}
      />
      {hasEndAdornment && (
        <AdornmentWrapper
          variant="end"
          size={size}
        >
          {endAdornment}
        </AdornmentWrapper>
      )}
    </InputWrapper>
  );
});
