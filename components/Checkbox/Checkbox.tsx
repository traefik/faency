import React from 'react';
import { styled, CSS, VariantProps } from '../../stitches.config';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  width: '100%',
});

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  boxSizing: 'border-box',
  userSelect: 'none',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },

  alignItems: 'center',
  appearance: 'none',
  display: 'inline-flex',
  justifyContent: 'center',
  lineHeight: '1',
  margin: '0',
  outline: 'none',
  padding: '0',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  overflow: 'hidden',

  '&[data-state=checked]': {
    backgroundColor: '$checkboxCheckedBg',
    boxShadow: 'inset 0 0 0 1px transparent',
    color: '$checkboxCheckedIcon',

    '@hover': {
      '&:hover': {
        backgroundColor: '$checkboxCheckedHoverBg',
      },
    },
  },

  '&[data-state=unchecked]': {
    backgroundColor: '$checkboxBg',
    boxShadow: 'inset 0 0 0 1px $colors$checkboxBorder',
    color: '$checkboxIcon',

    '@hover': {
      '&:hover': {
        backgroundColor: '$checkboxHoverBg',
        boxShadow: 'inset 0 0 0 1px $colors$checkboxHoverBorder',
      },
    },
  },

  '&:focus': {
    outline: 'none',
    borderColor: '$red7',
    boxShadow: 'inset 0 0 0 1px $colors$checkboxFocusBorder',
  },

  '&:disabled': {
    pointerEvents: 'none',
    backgroundColor: '$checkboxDisabledBg',
    boxShadow: 'inset 0 0 0 1px $colors$checkboxDisabledBorder',
    '&::placeholder': {
      color: '$checkboxDisabledText',
    },

    [`& ${StyledIndicator}`]: {
      '&::after': {
        backgroundColor: '$checkboxIndicatorDisabledBg',
      },
    },
  },

  variants: {
    size: {
      medium: {
        width: 18,
        height: 18,
        borderRadius: '$2',
      },
      large: {
        width: '$5',
        height: '$5',
        borderRadius: '$3',
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

type CheckboxPrimitiveProps = Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, 'as'>;
type CheckboxVariants = VariantProps<typeof StyledCheckbox>;
type CheckboxProps = CheckboxPrimitiveProps & CheckboxVariants & { css?: CSS };

export const Checkbox = React.forwardRef<React.ElementRef<typeof StyledCheckbox>, CheckboxProps>(
  (props, forwardedRef) => {
    return (
      <StyledCheckbox {...props} ref={forwardedRef}>
        <StyledIndicator>
          <CheckIcon height={40} width={40} />
        </StyledIndicator>
      </StyledCheckbox>
    );
  }
);

const BaseCheckbox = (props: CheckboxProps): JSX.Element => <Checkbox {...props} />;
export const CheckboxForStory = modifyVariantsForStory<
  CheckboxVariants,
  CheckboxProps & React.InputHTMLAttributes<any>
>(BaseCheckbox);
