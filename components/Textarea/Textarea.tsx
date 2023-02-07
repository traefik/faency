import React from 'react';
import { styled, VariantProps, CSS } from '../../stitches.config';
import { elevationVariants } from '../Elevation';
import { Label } from '../Label';
import { Box } from '../Box';

// CONSTANTS
const FOCUS_SHADOW = elevationVariants[1].boxShadow; // apply elevation $1 when focus

// COMPONENTS
const StyledTextarea = styled('textarea', {
  // Reset
  appearance: 'none',
  overflow: 'auto', // force overflow auto behaviour cross-browser
  borderWidth: '0',
  boxSizing: 'border-box',
  fontFamily: '$rubik',
  margin: '0',
  outline: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  // Custom
  p: '$3',
  position: 'relative',
  flexGrow: 1, // make sure to grow fully inside TextareaWrapper
  backgroundColor: 'transparent',
  borderRadius: 'inherit', // inherit border radius from TextareaWrapper
  boxShadow: 'inset 0 0 0 1px $colors$textareaBorder',
  color: '$textareaText',
  fontVariantNumeric: 'tabular-nums',
  transition: 'box-shadow .1s ease-in-out',

  '&:-webkit-autofill,&:autofill': {
    boxShadow: 'inset 0 0 0 1px $colors$textareaBorder, inset 0 0 0 100px $colors$textareaBg',
  },

  '&:-webkit-autofill::first-line,&:autofill::first-line': {
    fontFamily: '$rubik',
    color: '$hiContrast',
  },

  '&:focus-visible': {
    boxShadow: `inset 0 0 0 2px $colors$textareaFocusBorder, ${FOCUS_SHADOW}`,
  },

  '&::placeholder': {
    color: '$textareaPlaceholder',
  },

  '&:read-only:not(:disabled)': {
    boxShadow: 'none',
  },

  '&:disabled': {
    pointerEvents: 'none',
    opacity: 0.7,
    color: '$textareaDisabledText',
  },
  variants: {
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
        boxShadow: 'inset 0 0 0 1px $colors$textareaInvalidBorder',
        '&:focus-visible': {
          boxShadow: `inset 0 0 0 2px $colors$textareaInvalidBorder, ${FOCUS_SHADOW}`,
        },
        '@hover': {
          '&:hover': {
            '&::after': {
              backgroundColor: '$textareaInvalidBorder',
            },
          },
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
    resize: {
      none: {
        resize: 'none',
      },
      both: {
        resize: 'both',
      },
      vertical: {
        resize: 'vertical',
      },
      horizontal: {
        resize: 'horizontal',
      },
    },
    endAdornment: {
      true: {
        paddingBottom: '$5',
        paddingRight: '$5',
      },
    },
  },
  defaultVariants: {
    cursor: 'default',
    resize: 'both',
  },
  compoundVariants: [
    {
      variant: 'ghost',
      state: 'invalid',
      css: {
        boxShadow: 'inset 0 0 0 1px $colors$textareaInvalidBorder',
      },
    },
  ],
});

const TextareaWrapper = styled('div', {
  // Reset
  outline: 'none',
  lineHeight: 0,

  position: 'relative',
  display: 'inline-flex', // helps matching resizable content size
  backgroundColor: '$textareaBg',
  color: '$textareaPlaceholder',
  borderRadius: '$3',

  '&::before': {
    boxSizing: 'border-box',
    borderRadius: 'inherit',
    content: '""',
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },
  '&::after': {
    boxSizing: 'border-box',
    borderRadius: 'inherit',
    content: '""',
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },

  '&:focus-visible': {
    '&::before': {
      backgroundColor: '$textareaFocusBg',
    },
    '&::after': {
      backgroundColor: '$primary',
      opacity: 0.15,
    },
  },

  '@hover': {
    '&:hover': {
      '&::before': {
        backgroundColor: '$textareaHoverBg',
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
        color: '$textareaDisabledText',
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
              backgroundColor: '$textareaInvalidBorder',
            },
          },
        },
      },
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

const AdornmentWrapperEnd = styled('div', {
  position: 'absolute',
  bottom: '$2',
  right: '$3',
  minWidth: '$5',
  minHeight: '$5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export interface TextareaVariants
  extends Omit<VariantProps<typeof StyledTextarea>, 'endAdornment'> {}

export interface TextareaProps
  extends TextareaVariants,
    Omit<React.ComponentProps<typeof StyledTextarea>, 'css' | 'endAdornment'> {
  label?: string;
  endAdornment?: React.ReactNode;
  rootCss?: CSS;
  css?: CSS;
}

export const Textarea = React.forwardRef<React.ElementRef<typeof StyledTextarea>, TextareaProps>(
  (
    { state, disabled, onFocus, onBlur, label, id, rootCss, css, endAdornment, ...props },
    forwardedRef
  ) => {
    const [hasFocus, setHasFocus] = React.useState(false);

    const invalid = React.useMemo(() => state === 'invalid', [state]);

    const hasEndAdornment = React.useMemo(() => Boolean(endAdornment), [endAdornment]);

    const labelVariant = React.useMemo(() => {
      if (disabled) {
        return 'subtle';
      }
      if (invalid) {
        return 'invalid';
      }
      if (hasFocus) {
        return 'contrast';
      }
      return 'default';
    }, [invalid, disabled, hasFocus]);

    const handleFocus = React.useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (onFocus) {
          onFocus(e);
        }
        setHasFocus(true);
      },
      [onFocus, setHasFocus]
    );

    const handleBlur = React.useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (onBlur) {
          onBlur(e);
        }
        setHasFocus(false);
      },
      [onBlur, setHasFocus]
    );

    return (
      <Box css={rootCss}>
        {label && (
          <Label variant={labelVariant} htmlFor={id} css={{ display: 'block' }}>
            {label}
          </Label>
        )}
        <TextareaWrapper state={state} disabled={disabled}>
          <StyledTextarea
            id={id}
            ref={forwardedRef}
            css={css}
            disabled={disabled}
            state={state}
            onFocus={handleFocus}
            onBlur={handleBlur}
            endAdornment={hasEndAdornment}
            {...props}
          />
          {hasEndAdornment && <AdornmentWrapperEnd>{endAdornment}</AdornmentWrapperEnd>}
        </TextareaWrapper>
      </Box>
    );
  }
);
