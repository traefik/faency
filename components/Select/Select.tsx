import React from 'react';
import { styled, CSS } from '../../stitches.config';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { VariantProps } from '@stitches/react';

const StyledSelect = styled('select', {
  appearance: 'none',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: 'inherit',
  color: 'inherit',
  font: 'inherit',
  outline: 'none',
  width: '100%',
  height: '100%',
  pl: '$1',
  pr: '$3',
  lineHeight: '25px',

  '&:disabled': {
    color: '$selectDisabledText',
  },
});

const SelectWrapper = styled('div', {
  backgroundColor: '$selectBg',
  borderRadius: '$2',
  boxShadow: 'inset 0 0 0 1px $colors$selectBorder',
  color: '$selectText',
  fontFamily: '$rubik',
  fontSize: '$1',
  fontVariantNumeric: 'tabular-nums',
  fontWeight: 400,
  height: '$5',
  flexShrink: 0,

  '&:focus-within': {
    zIndex: 1,
    backgroundColor: '$selectFocusBg',
    boxShadow:
      'inset 0px 0px 0px 1px $colors$selectFocusBorder, 0px 0px 0px 1px $colors$selectFocusBorder',
  },

  '&:-webkit-autofill': {
    boxShadow: 'inset 0 0 0 2px $colors$selectBorder, inset 0 0 0 100px $colors$selectBg',
  },

  '&:-webkit-autofill::first-line': {
    fontFamily: '$rubik',
    color: '$hiContrast',
  },

  '@hover': {
    '&:hover': {
      backgroundColor: '$selectHoverBg',
    },
  },

  variants: {
    disabled: {
      true: {
        pointerEvents: 'none',
        backgroundColor: '$selectBg',
        boxShadow:
          'inset 0px 0px 0px 1px $colors$selectDisabledBorder, 0px 0px 0px 1px $colors$selectDisabledBorder',
        color: '$selectDisabledText',
      },
    },
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
    variant: {
      ghost: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        '@hover': {
          '&:hover': {
            boxShadow: 'inset 0 0 0 1px $colors$slateA7',
            backgroundColor: '$selectHoverBg',
          },
        },
        '&:focus-within': {
          backgroundColor: '$loContrast',
          boxShadow:
            'inset 0px 0px 0px 1px $colors$selectFocusBorder, 0px 0px 0px 1px $colors$selectFocusBorder',
        },
      },
    },
    state: {
      invalid: {
        boxShadow: 'inset 0 0 0 2px $colors$red9',
        '&:focus-within': {
          backgroundColor: '$selectBg',
          boxShadow: 'inset 0 0 0 2px $colors$red9',
        },
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const StyledCaretSortIcon = styled(CaretSortIcon, {
  position: 'absolute',
  pointerEvents: 'none',
  display: 'inline',

  variants: {
    // Use margins instead of top/left to avoid setting "position: relative" on parent,
    // which would make stacking context tricky with Select used in a control group.
    size: {
      small: {
        marginTop: 5,
        marginLeft: -16,
      },
      medium: {
        marginTop: 9,
        marginLeft: -16,
      },
      large: {
        marginTop: 13,
        marginLeft: -16,
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
});

export type SelectProps = React.ComponentProps<typeof StyledSelect> &
  React.ComponentProps<typeof SelectWrapper> & { css?: CSS };
export type SelectVariants = VariantProps<typeof SelectWrapper>;

export const BaseSelect = ({ css, size, state, variant, ...props }: SelectProps): JSX.Element => (
  <SelectWrapper
    css={css as any}
    size={size}
    state={state}
    variant={variant}
    disabled={props.disabled}
  >
    <StyledSelect {...props} />
    <StyledCaretSortIcon size={size} />
  </SelectWrapper>
);

export const Select = React.forwardRef<React.ElementRef<typeof StyledSelect>, SelectProps>(
  ({ css, size, state, variant, ...props }, forwardedRef) => {
    return (
      <SelectWrapper
        css={css as any}
        size={size}
        state={state}
        variant={variant}
        disabled={props.disabled}
      >
        <StyledSelect ref={forwardedRef} {...props} />
        <StyledCaretSortIcon size={size} />
      </SelectWrapper>
    );
  }
);

Select.toString = () => `.${SelectWrapper.className}`;
