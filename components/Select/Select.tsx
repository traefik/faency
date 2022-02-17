import React from 'react';
import { styled, CSS, VariantProps } from '../../stitches.config';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { elevationVariants } from '../Elevation';

// CONSTANTS
const FOCUS_SHADOW = elevationVariants[1].boxShadow; // apply elevation $1 when focus
const CARET_WIDTH = '15px';

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
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  '& option': {
    color: 'black',
    bc: 'white',
  },

  '&:focus-visible': {
    boxShadow: `inset 0 0 0 2px $colors$selectFocusBorder, ${FOCUS_SHADOW}`,
  },

  '&:disabled': {
    pointerEvents: 'none',
    color: '$selectDisabledText',
  },
});

const SelectWrapper = styled('div', {
  position: 'relative',
  backgroundColor: '$selectBg',
  borderRadius: '$2',
  boxShadow: 'inset 0 0 0 1px $colors$selectBorder',
  color: '$selectText',
  fontFamily: '$rubik',
  fontSize: '$1',
  fontVariantNumeric: 'tabular-nums',
  fontWeight: '$regular',
  height: '$5',
  flexShrink: 0,

  '&::before': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    borderRadius: 'inherit',
  },
  '&::after': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    borderRadius: 'inherit'
  },

  '&:focus-visible': {
    '&::before': {
      backgroundColor: '$selectFocusBg',
    },
    '&::after': {
      backgroundColor: '$primary',
      opacity: 0.15,
    },
  },

  '@hover': {
    '&:hover': {
      '&::before': {
        backgroundColor: '$selectHoverBg',
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
        color: '$selectDisabledText',
        '@hover': {
          '&:hover': {
            '&::before': {
              display: 'none',
            },
            '&::after': {
              display: 'none',
            },
          },
        },
      },
    },
    size: {
      small: {
        borderRadius: '$2',
        height: '$5',
        fontSize: '$1',
        lineHeight: '$sizes$5',
        '&:-webkit-autofill::first-line': {
          fontSize: '$1',
        },
        [`& ${StyledSelect}`]: {
          pl: '$2',
          pr: `calc($2 + ${CARET_WIDTH})`
        },
        [`& ${StyledCaretSortIcon}`]: {
          right: 'calc($2 / 2)',
        },
      },
      medium: {
        borderRadius: '$3',
        height: '$6',
        fontSize: '$3',
        lineHeight: '$sizes$6',
        '&:-webkit-autofill::first-line': {
          fontSize: '$3',
        },
        [`& ${StyledSelect}`]: {
          pl: '$3',
          pr: `calc($3 + ${CARET_WIDTH})`,
        },
        [`& ${StyledCaretSortIcon}`]: {
          right: 'calc($3 / 2)',
        },
      },
      large: {
        borderRadius: '$3',
        height: '$7',
        fontSize: '$3',
        lineHeight: '$sizes$7',
        '&:-webkit-autofill::first-line': {
          fontSize: '$3',
        },
        [`& ${StyledSelect}`]: {
          pl: '$3',
          pr: `calc($3 + ${CARET_WIDTH})`,
        },
        [`& ${StyledCaretSortIcon}`]: {
          right: 'calc($3 / 2)',
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
        boxShadow: 'inset 0 0 0 1px $colors$selectInvalidBorder',
        '&:focus-visible': {
          boxShadow: `inset 0 0 0 2px $colors$selectInvalidBorder, ${FOCUS_SHADOW}`,
        },
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export type SelectVariants = VariantProps<typeof StyledSelect> & VariantProps<typeof SelectWrapper> & VariantProps<typeof StyledCaretSortIcon>;

export type SelectProps = Omit<React.ComponentProps<typeof StyledSelect>, 'size'> & SelectVariants & { css?: CSS };

export const Select = React.forwardRef<React.ElementRef<typeof StyledSelect>, SelectProps>(
  ({ css, size, state, variant, cursor, ...props }, forwardedRef) => {
    return (
      <SelectWrapper
        css={css as any}
        size={size}
        state={state}
        variant={variant}
        disabled={props.disabled}
      >
        <StyledSelect ref={forwardedRef} {...props} />
        <StyledCaretSortIcon size={size} cursor={cursor} />
      </SelectWrapper>
    );
  }
);

Select.toString = () => `.${SelectWrapper.className}`;
