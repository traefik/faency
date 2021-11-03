import React from 'react';
import { VariantProps } from '@stitches/react';
import { styled, CSS } from '../../stitches.config';
import { elevationVariant } from '../Elevation';
import { IconButton } from '../IconButton';

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
    boxShadow: `inset 0 0 0 2px $colors$inputFocusBorder`,
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
          boxShadow: 'inset 0 0 0 2px $colors$inputInvalidBorder',
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
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  '&::after': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
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
    state: {
      invalid: {
        color: '$inputInvalidBorder',
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
        [`& ${IconButton}`]: {
          size: SMALL_HEIGHT,
        },
      },
      medium: {
        mx: 'calc($3 / 2)',
        [`& ${IconButton}`]: {
          size: MEDIUM_HEIGHT,
        },
      },
      large: {
        mx: 'calc($3 / 2)',
        [`& ${IconButton}`]: {
          size: LARGE_HEIGHT,
        },
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
  variants: {
    size: {
      small: {
        [`& ${IconButton}:first-of-type`]: {
          // remove start margin for first IconButton
          marginInlineStart: 'calc(-$2 / 2)',
        },
      },
      medium: {
        [`& ${IconButton}:first-of-type`]: {
          // remove start margin for first IconButton
          marginInlineStart: 'calc(-$3 / 2)',
        },
      },
      large: {
        [`& ${IconButton}:first-of-type`]: {
          // remove start margin for first IconButton
          marginInlineStart: 'calc(-$3 / 2)',
        },
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const AdornmentWrapperEnd = styled(AdornmentWrapper, {
  right: 0,
  variants: {
    size: {
      small: {
        [`& ${IconButton}:last-of-type`]: {
          // remove start margin for last IconButton
          marginInlineEnd: 'calc(-$2 / 2)',
        },
      },
      medium: {
        [`& ${IconButton}:last-of-type`]: {
          // remove start margin for last IconButton
          marginInlineEnd: 'calc(-$3 / 2)',
        },
      },
      large: {
        [`& ${IconButton}:last-of-type`]: {
          // remove start margin for last IconButton
          marginInlineEnd: 'calc(-$3 / 2)',
        },
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

type DefaultInputVariants = VariantProps<typeof StyledInput>;
export type InputVariants = Omit<DefaultInputVariants, 'startAdornment' | 'endAdornment'>;
export interface HTMLInputProps extends React.InputHTMLAttributes<any> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  type?: string;
}

export type InputProps = Omit<HTMLInputProps, 'size'> & InputVariants & { css?: CSS };

export type InputHandle = {
  clear: () => void;
  focus: () => void;
};

export const Input = React.forwardRef<InputHandle, InputProps>(
  ({ size, startAdornment, endAdornment, css, ...props }, forwardedRef) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(
      forwardedRef,
      () => ({
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
        },
      }),
      [inputRef]
    );

    const hasStartAdornment = React.useMemo(() => Boolean(startAdornment), [startAdornment]);

    const hasEndAdornment = React.useMemo(() => Boolean(endAdornment), [endAdornment]);

    return (
      <InputWrapper css={css} disabled={props.disabled} state={props.state}>
        {hasStartAdornment && (
          <AdornmentWrapperStart size={size}>{startAdornment}</AdornmentWrapperStart>
        )}
        {hasEndAdornment && <AdornmentWrapperEnd size={size}>{endAdornment}</AdornmentWrapperEnd>}
        <StyledInput
          ref={inputRef}
          startAdornment={hasStartAdornment}
          endAdornment={hasEndAdornment}
          size={size}
          {...props}
        />
      </InputWrapper>
    );
  }
);
