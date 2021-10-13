import React from 'react';
import { VariantProps } from '@stitches/react';
import { styled } from '../../stitches.config';

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
    transition: 'box-shadow .1s ease-in-out',
    '&:-webkit-autofill': {
      boxShadow:
        'inset 0 0 0 2px $colors$inputFocusBorder, inset 0 0 0 100px $colors$inputBg',
    },
  },
  '&::placeholder': {
    color: '$inputPlaceholder',
  },
  '&:disabled': {
    pointerEvents: 'none',
    boxShadow:
      'inset 0px 0px 0px 1px $colors$inputDisabledBorder, 0px 0px 0px 1px $colors$inputDisabledBorder',
    color: '$inputDisabledText',
    '&::placeholder': {
      color: '$inputDisabledText',
    },
  },
  '&:read-only': {
    backgroundColor: '$inputReadOnlyBg',
    '&:focus': {
      boxShadow: 'inset 0px 0px 0px 2px $colors$inputBorder',
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
            boxShadow: 'inset 0 0 0 1px $colors$slateA7',
          },
        },
        '&:focus': {
          backgroundColor: '$loContrast',
          boxShadow: 'inset 0px 0px 0px 1px $colors$blue8, 0px 0px 0px 1px $colors$blue8',
        },
        '&:disabled': {
          backgroundColor: 'transparent',
        },
        '&:read-only': {
          backgroundColor: 'transparent',
        },
      },
    },
    state: {
      invalid: {
        boxShadow: 'inset 0 0 0 1px $colors$red8',
        '&:focus': {
          boxShadow: 'inset 0px 0px 0px 1px $colors$red8, 0px 0px 0px 1px $colors$red8',
        },
      },
    },
    cursor: {
      default: {
        cursor: 'default',
        '&:focus': {
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
    // TODO: avoid variant duplication
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
  // TODO: avoid defaultVariant duplication
  defaultVariants: {
    size: 'medium',
  },
});

export type InputVariants = VariantProps<typeof StyledInput>;
export type InputProps = InputVariants & {
  startAdornment?: React.ReactNode | null,
  endAdornment?: React.ReactNode | null,
};

export const Input = React.forwardRef<
  React.ElementRef<typeof StyledInput>,
  InputProps
>(({ startAdornment, endAdornment, size, ...props }, forwardedRef) => {
  const hasStartAdornment = React.useMemo(
    () => Boolean(startAdornment),
    [startAdornment],
  );

  const hasEndAdornment = React.useMemo(
    () => Boolean(endAdornment),
    [endAdornment],
  );

  return (
    <InputWrapper>
      {hasStartAdornment && (
        <AdornmentWrapper
          variant="start"
          size={size}
        >
          {startAdornment}
        </AdornmentWrapper>
      )}
      <StyledInput
        ref={forwardedRef}
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
