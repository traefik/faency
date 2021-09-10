import { VariantProps } from '@stitches/react';
import { styled } from '../../stitches.config';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

export const TextField = styled('input', {
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
  backgroundColor: '$textFieldBg',
  boxShadow: 'inset 0 0 0 1px $colors$textFieldBorder',
  color: '$textFieldText',
  fontVariantNumeric: 'tabular-nums',

  '&:-webkit-autofill': {
    boxShadow: 'inset 0 0 0 2px $colors$textFieldBorder, inset 0 0 0 100px $colors$textFieldBg',
  },

  '&:-webkit-autofill::first-line': {
    fontFamily: '$rubik',
    color: '$hiContrast',
  },

  '&:hover': {
    backgroundColor: '$textFieldHoverBg',
  },

  '&:focus': {
    backgroundColor: '$textFieldFocusBg',
  },

  '&:focus-visible': {
    backgroundColor: '$textFieldFocusBg',
    boxShadow:
      'inset 0px 0px 0px 1px $colors$textFieldFocusBorder, 0px 0px 0px 1px $colors$textFieldFocusBorder',
    transition: 'box-shadow .1s ease-in-out',
    '&:-webkit-autofill': {
      boxShadow:
        'inset 0 0 0 2px $colors$textFieldFocusBorder, inset 0 0 0 100px $colors$textFieldBg',
    },
  },
  '&::placeholder': {
    color: '$textFieldPlaceholder',
  },
  '&:disabled': {
    pointerEvents: 'none',
    boxShadow:
      'inset 0px 0px 0px 1px $colors$textFieldDisabledBorder, 0px 0px 0px 1px $colors$textFieldDisabledBorder',
    color: '$textFieldDisabledText',
    '&::placeholder': {
      color: '$textFieldDisabledText',
    },
  },
  '&:read-only': {
    backgroundColor: '$textFieldReadOnlyBg',
    '&:focus': {
      boxShadow: 'inset 0px 0px 0px 2px $colors$textFieldBorder',
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
        lineHeight: '$sizes$7',
        '&:-webkit-autofill::first-line': {
          fontSize: '$3',
        },
      },
      large: {
        borderRadius: '$3',
        height: '$7',
        fontSize: '$3',
        px: '$3',
        lineHeight: '$sizes$8',
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
        boxShadow: 'inset 0 0 0 2px $colors$red9',
        '&:focus': {
          boxShadow: 'inset 0px 0px 0px 1px $colors$red9, 0px 0px 0px 1px $colors$red9',
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
});

type TextFieldVariants = VariantProps<typeof TextField>;
export interface TextFieldProps extends TextFieldVariants {}
const BaseTextField = (props: TextFieldProps): JSX.Element => <TextField {...props} />;
export const TextFieldForStory = modifyVariantsForStory<
  TextFieldVariants,
  TextFieldProps & React.InputHTMLAttributes<any>
>(BaseTextField);
