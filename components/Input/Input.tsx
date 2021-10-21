import React from 'react';
import { VariantProps } from '@stitches/react';
import { styled, CSS } from '../../stitches.config';
import { elevationVariant } from '../Elevation';
import { IconButton } from '../IconButton';

// CONSTANTS
const FOCUS_SHADOW = elevationVariant[1].boxShadow; // apply elevation $1 when focus

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
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },

  // Custom
  position: 'relative',
  backgroundColor: '$inputBg',
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
      `inset 0px 0px 0px 1px $colors$inputFocusBorder, 
        0px 0px 0px 1px $colors$inputFocusBorder, 
        ${FOCUS_SHADOW}
  `,
  },
  '&::placeholder': {
    color: '$inputPlaceholder',
  },
  '&:read-only': {
    boxShadow: 'none',
    '&:focus-visible': {
      boxShadow:
        `inset 0px 0px 0px 1px $colors$inputFocusBorder, 
          0px 0px 0px 1px $colors$inputFocusBorder, 
          ${FOCUS_SHADOW}`,
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
      true: {}
    },
    variant: {
      ghost: {
        boxShadow: 'none',
        '&:disabled,&:-webkit-autofill,&:autofill': {
          boxShadow: 'none',
        },
        backgroundColor: 'transparent',
        '@hover': {
          '&:hover': {
            boxShadow: 'inset 0 0 0 1px $colors$inputHoverBorderGhost',
            '&:disabled': {
              boxShadow: 'inset 0 0 0 1px $colors$inputDisabledBorder'
            }
          },
        },
        '&:focus': {
          backgroundColor: '$loContrast',
        },
        '&:focus-visible': {
          boxShadow: `inset 0px 0px 0px 1px $colors$inputFocusBorderGhost, 
          0px 0px 0px 1px $colors$inputFocusBorderGhost, ${FOCUS_SHADOW}`,
        },
      },
    },
    state: {
      invalid: {
        boxShadow: 'inset 0 0 0 1px $colors$inputInvalidBorder',
        '&:-webkit-autofill,&:autofill': {
          boxShadow: 'inset 0 0 0 1px $colors$inputInvalidBorder, inset 0 0 0 100px $colors$inputBg',
        },
        '&:focus-visible': {
          boxShadow: `inset 0px 0px 0px 1px $colors$inputInvalidBorder, 
          0px 0px 0px 1px $colors$inputInvalidBorder, ${FOCUS_SHADOW}`,
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
  variants: {
    size: {
      small: {
        borderRadius: '$2',
      },
      medium: {
        borderRadius: '$3',
      },
      large: {
        borderRadius: '$3',
      }
    }
  },
  defaultVariants: {
    size: 'medium',
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
        }
      },
      medium: {
        mx: 'calc($3 / 2)',
        [`& ${IconButton}`]: {
          size: MEDIUM_HEIGHT,
        }
      },
      large: {
        mx: 'calc($3 / 2)',
        [`& ${IconButton}`]: {
          size: LARGE_HEIGHT,
        }
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
  defaultVariants: {
    size: 'medium',
  },
});

const AdornmentWrapperStart = styled(AdornmentWrapper, {
  left: 0,
  variants: {
    size: {
      small: {
        [`& ${IconButton}:first-of-type`]: { // remove start margin for first IconButton
          marginInlineStart: 'calc(-$2 / 2)'
        }
      },
      medium: {
        [`& ${IconButton}:first-of-type`]: { // remove start margin for first IconButton
          marginInlineStart: 'calc(-$3 / 2)'
        }
      },
      large: {
        [`& ${IconButton}:first-of-type`]: { // remove start margin for first IconButton
          marginInlineStart: 'calc(-$3 / 2)'
        }
      }
    }
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
        [`& ${IconButton}:last-of-type`]: { // remove start margin for last IconButton
          marginInlineEnd: 'calc(-$2 / 2)'
        }
      },
      medium: {
        [`& ${IconButton}:last-of-type`]: { // remove start margin for last IconButton
          marginInlineEnd: 'calc(-$3 / 2)'
        }
      },
      large: {
        [`& ${IconButton}:last-of-type`]: { // remove start margin for last IconButton
          marginInlineEnd: 'calc(-$3 / 2)'
        }
      }
    }
  },
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
        <AdornmentWrapperStart
          size={size}
        >
          {startAdornment}
        </AdornmentWrapperStart>
      )}
      <StyledInput
        ref={inputRef}
        startAdornment={hasStartAdornment}
        endAdornment={hasEndAdornment}
        size={size}
        {...props}
      />
      {hasEndAdornment && (
        <AdornmentWrapperEnd
          size={size}
        >
          {endAdornment}
        </AdornmentWrapperEnd>
      )}
    </InputWrapper>
  );
});
