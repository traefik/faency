import React from 'react';

import { CSS, styled, VariantProps } from '../../stitches.config';
import { elevationVariants } from '../Elevation';
import { Field } from '../Field/Field';
import { FieldLabelProps, useFieldControl } from '../Field/FieldContext';
import { Label } from '../Label';

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
    WebkitTextFillColor: '$colors$hiContrast',
  },

  '&:-webkit-autofill::first-line,&:autofill::first-line': {
    fontFamily: '$rubik',
    color: '$hiContrast',
  },

  '&:focus-visible': {
    boxShadow: `inset 0 0 0 2px $colors$textareaFocusBorder, ${FOCUS_SHADOW}`,
  },

  '&:-webkit-autofill:focus-visible,&:autofill:focus-visible': {
    boxShadow: `inset 0 0 0 2px $colors$textareaFocusBorder, inset 0 0 0 100px $colors$textareaBg, ${FOCUS_SHADOW}`,
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
        '&:-webkit-autofill,&:autofill': {
          boxShadow:
            'inset 0 0 0 1px $colors$textareaInvalidBorder, inset 0 0 0 100px $colors$textareaBg',
        },
        '&:focus-visible': {
          boxShadow: `inset 0 0 0 2px $colors$textareaInvalidBorder, ${FOCUS_SHADOW}`,
        },
        '&:-webkit-autofill:focus-visible,&:autofill:focus-visible': {
          boxShadow: `inset 0 0 0 2px $colors$textareaInvalidBorder, inset 0 0 0 100px $colors$textareaBg, ${FOCUS_SHADOW}`,
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

export interface TextareaVariants extends Omit<
  VariantProps<typeof StyledTextarea>,
  'endAdornment'
> {}

export interface TextareaProps
  extends TextareaVariants, Omit<React.ComponentProps<typeof StyledTextarea>, 'endAdornment'> {
  label?: string;
  description?: React.ReactNode;
  error?: React.ReactNode;
  announceError?: boolean;
  endAdornment?: React.ReactNode;
  rootCss?: CSS;
}

type TextareaControlProps = Omit<
  TextareaProps,
  'label' | 'description' | 'error' | 'announceError' | 'rootCss'
>;

const TextareaControl = React.forwardRef<
  React.ElementRef<typeof StyledTextarea>,
  TextareaControlProps
>(
  (
    {
      state,
      disabled,
      id,
      css,
      endAdornment,
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
      ...props
    },
    forwardedRef,
  ) => {
    const control = useFieldControl({
      id,
      disabled,
      invalid: state === 'invalid',
      'aria-describedby': ariaDescribedBy,
      'aria-invalid': ariaInvalid,
    });
    const resolvedState = control.invalid ? 'invalid' : state;
    const hasEndAdornment = Boolean(endAdornment);

    return (
      <TextareaWrapper state={resolvedState} disabled={control.disabled}>
        <StyledTextarea
          id={control.id}
          ref={forwardedRef}
          css={css}
          disabled={control.disabled}
          state={resolvedState}
          endAdornment={hasEndAdornment}
          aria-describedby={control['aria-describedby']}
          aria-invalid={control['aria-invalid']}
          {...props}
        />
        {hasEndAdornment && <AdornmentWrapperEnd>{endAdornment}</AdornmentWrapperEnd>}
      </TextareaWrapper>
    );
  },
);

export const Textarea = React.forwardRef<React.ElementRef<typeof StyledTextarea>, TextareaProps>(
  (
    { label, description, error, announceError, id, rootCss, state, disabled, ...props },
    forwardedRef,
  ) => {
    return (
      <Field
        id={id}
        label={
          label &&
          ((labelProps: FieldLabelProps) => (
            <Label {...labelProps} css={{ display: 'block' }}>
              {label}
            </Label>
          ))
        }
        description={description}
        error={error}
        announceError={announceError}
        invalid={state === 'invalid'}
        disabled={disabled}
        css={rootCss}
      >
        <TextareaControl ref={forwardedRef} id={id} state={state} disabled={disabled} {...props} />
      </Field>
    );
  },
);
