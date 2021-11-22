import React from 'react';
import { VariantProps } from '@stitches/react';
import { styled, CSS } from '../../stitches.config';
import { elevationVariants } from '../Elevation';

// CONSTANTS
const FOCUS_SHADOW = elevationVariants[1].boxShadow; // apply elevation $1 when focus

const SMALL_HEIGHT = '$5';
const MEDIUM_HEIGHT = '$6';
const LARGE_HEIGHT = '$7';

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

  // Custom
  zIndex: 1,
  position: 'relative',
  backgroundColor: 'transparent',
  borderRadius: 'inherit', // inherit border radius from InputWrapper
  boxShadow: 'inset 0 0 0 1px $colors$inputBorder',
  color: '$inputText',
  fontVariantNumeric: 'tabular-nums',
  transition: 'box-shadow .1s ease-in-out',

  '&[type="number"]': {
    pr: '0', // remove padding for number native controls
  },

  '&:-webkit-autofill,&:autofill': {
    boxShadow: 'inset 0 0 0 1px $colors$inputBorder, inset 0 0 0 100px $colors$inputBg',
  },

  '&:-webkit-autofill::first-line,&:autofill::first-line': {
    fontFamily: '$rubik',
    color: '$hiContrast',
  },

  '&:focus-visible': {
    boxShadow: `inset 0 0 0 2px $colors$inputFocusBorder, ${FOCUS_SHADOW}`,
  },

  '&::placeholder': {
    color: '$inputPlaceholder',
  },

  '&:read-only:not(:disabled)': {
    boxShadow: 'none',
  },

  '&:disabled': {
    pointerEvents: 'none',
    color: '$inputDisabledText',
  },

  variants: {
    size: {
      small: {
        height: SMALL_HEIGHT,
        fontSize: '$1',
        px: '$2',
        lineHeight: '$sizes$5',
        '&:-webkit-autofill::first-line,&:autofill::first-line': {
          fontSize: '$1',
        },
      },
      medium: {
        height: MEDIUM_HEIGHT,
        fontSize: '$3',
        px: '$3',
        lineHeight: '$sizes$6',
        '&:-webkit-autofill::first-line,&:autofill::first-line': {
          fontSize: '$3',
        },
      },
      large: {
        height: LARGE_HEIGHT,
        fontSize: '$3',
        px: '$3',
        lineHeight: '$sizes$7',
        '&:-webkit-autofill::first-line,&:autofill::first-line': {
          fontSize: '$3',
        },
      },
    },
    startAdornment: {
      true: {},
    },
    endAdornment: {
      true: {},
    },
    variant: {
      ghost: {
        boxShadow: 'none',
        '&:disabled': {
          boxShadow: 'none',
        },
        backgroundColor: 'transparent',
        '&:focus-visible': {
          backgroundColor: '$loContrast',
        },
      },
    },
    state: {
      invalid: {
        boxShadow: 'inset 0 0 0 1px $colors$inputInvalidBorder',
        '&:focus-visible': {
          boxShadow: `inset 0 0 0 2px $colors$inputInvalidBorder, ${FOCUS_SHADOW}`,
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
        '&:focus-visible:not(:read-only)': {
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
    cursor: 'default',
  },
  compoundVariants: [
    {
      variant: 'ghost',
      state: 'invalid',
      css: {
        boxShadow: 'inset 0 0 0 1px $colors$inputInvalidBorder',
      },
    },
    {
      startAdornment: true,
      size: 'small',
      css: {
        paddingInlineStart: 'calc($2 + 15px)',
      },
    },
    {
      startAdornment: true,
      size: 'medium',
      css: {
        paddingInlineStart: 'calc($3 + 15px)',
      },
    },
    {
      startAdornment: true,
      size: 'large',
      css: {
        paddingInlineStart: 'calc($3 + 15px)',
      },
    },
    {
      endAdornment: true,
      size: 'small',
      css: {
        paddingInlineEnd: 'calc($2 + 15px)',
      },
    },
    {
      endAdornment: true,
      size: 'medium',
      css: {
        paddingInlineEnd: 'calc($3 + 15px)',
      },
    },
    {
      endAdornment: true,
      size: 'large',
      css: {
        paddingInlineEnd: 'calc($3 + 15px)',
      },
    },
    {
      endAdornment: true,
      size: 'small',
      state: 'invalid',
      css: {
        paddingInlineEnd: 'calc($4 + 30px)', // size padding + adornment margins + icon size + icon size
      },
    },
    {
      endAdornment: true,
      size: 'medium',
      state: 'invalid',
      css: {
        paddingInlineEnd: 'calc($6 + 30px)', // size padding + adornment margins + icon size + icon size
      },
    },
    {
      endAdornment: true,
      size: 'large',
      state: 'invalid',
      css: {
        paddingInlineEnd: 'calc($6 + 30px)', // size padding + adornment margins + icon size + icon size
      },
    },
  ],
});

const InputWrapper = styled('div', {
  // Reset
  outline: 'none',
  lineHeight: 0,

  position: 'relative',
  backgroundColor: '$inputBg',
  color: '$inputPlaceholder',

  '&::before': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    inset: 0,
  },
  '&::after': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    inset: 0,
  },

  '&:focus-visible': {
    '&::before': {
      backgroundColor: '$inputFocusBg',
    },
    '&::after': {
      backgroundColor: '$primary',
      opacity: 0.15,
    },
  },

  '@hover': {
    '&:hover': {
      '&::before': {
        backgroundColor: '$inputHoverBg',
      },
      '&::after': {
        backgroundColor: '$primary',
        opacity: 0.05,
      },
    },
  },

  variants: {
    disabled: {
      true: {
        opacity: 0.7,
        color: '$inputDisabledText',
        '@hover': {
          '&:hover': {
            '&::before': {
              backgroundColor: 'inherit',
            },
            '&::after': {
              backgroundColor: 'inherit',
            },
          },
        },
      },
    },
    state: {
      invalid: {
        '@hover': {
          '&:hover': {
            '&::after': {
              backgroundColor: '$inputInvalidBorder',
            },
          },
        },
      },
    },
    size: {
      small: {
        borderRadius: '$2',
        '&::before, &::after': {
          borderRadius: '$2',
        },
      },
      medium: {
        borderRadius: '$3',
        '&::before, &::after': {
          borderRadius: '$3',
        },
      },
      large: {
        borderRadius: '$3',
        '&::before, &::after': {
          borderRadius: '$3',
        },
      },
    },
  },
  defaultVariants: {
    size: 'medium',
    disabled: false,
  },
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
      },
    },
    variant: {
      start: {
        left: 0,
      },
      end: {
        right: 0,
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const AdornmentWrapperStart = styled(AdornmentWrapper, {
  left: 0,
});

const AdornmentWrapperEnd = styled(AdornmentWrapper, {
  right: 0,
});

type DefaultInputVariants = VariantProps<typeof StyledInput>;
export type InputVariants = Omit<DefaultInputVariants, 'startAdornment' | 'endAdornment'>;
export interface HTMLInputProps extends React.InputHTMLAttributes<any> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  type?: string;
}

export type InputProps = Omit<HTMLInputProps, 'size'> & InputVariants & { css?: CSS };

export interface InputHandle extends HTMLInputElement {
  clear: () => void;
}

export const Input = React.forwardRef<InputHandle, InputProps>(
  ({ size, startAdornment, endAdornment, css, ...props }, forwardedRef) => {
    const inputRef = React.useRef<InputHandle>(null);

    React.useImperativeHandle(
      forwardedRef,
      () => {
        const { current } = inputRef;
        if (current) {
          current.clear = () => {
            current.value = ''
          };
        }
        return current as InputHandle;
      },
      [inputRef]
    );

    const hasStartAdornment = React.useMemo(() => Boolean(startAdornment), [startAdornment]);

    const hasEndAdornment = React.useMemo(() => Boolean(endAdornment), [endAdornment]);

    return (
      <InputWrapper css={css} disabled={props.disabled} state={props.state}>
        {hasStartAdornment && (
          <AdornmentWrapperStart size={size}>{startAdornment}</AdornmentWrapperStart>
        )}

        <StyledInput
          ref={inputRef}
          startAdornment={hasStartAdornment}
          endAdornment={hasEndAdornment}
          size={size}
          {...props}
        />
        {hasEndAdornment && <AdornmentWrapperEnd size={size}>{endAdornment}</AdornmentWrapperEnd>}
      </InputWrapper>
    );
  }
);
