import { CSS, styled, VariantProps } from '../../stitches.config';

export const Text = styled('span', {
  // Reset
  lineHeight: '1',
  margin: '0',
  fontFamily: '$rubik',
  fontVariantNumeric: 'tabular-nums',
  display: 'inline-block',

  variants: {
    size: {
      '0': {
        fontSize: '$0',
      },
      '1': {
        fontSize: '$1',
      },
      '2': {
        fontSize: '$2',
      },
      '3': {
        fontSize: '$3',
      },
      '4': {
        fontSize: '$4',
      },
      '5': {
        fontSize: '$5',
      },
      '6': {
        fontSize: '$6',
      },
      '7': {
        fontSize: '$7',
      },
      '8': {
        fontSize: '$8',
      },
      '9': {
        fontSize: '$9',
      },
      '10': {
        fontSize: '$10',
      },
      '11': {
        fontSize: '$11',
      },
      '12': {
        fontSize: '$12',
      },
      inherit: {
        fontSize: 'inherit',
      },
    },
    weight: {
      light: {
        fontWeight: '$light',
      },
      regular: {
        fontWeight: '$regular',
      },
      medium: {
        fontWeight: '$medium',
      },
      semiBold: {
        fontWeight: '$semiBold',
      },
      bold: {
        fontWeight: '$bold',
      },
    },
    variant: {
      red: {
        color: '$textRed',
      },
      subtle: {
        color: '$textSubtle',
      },
      default: {
        color: '$textDefault',
      },
      contrast: {
        color: '$textContrast',
      },
      inherit: {
        color: 'inherit',
      },
      invalid: {
        color: '$textInvalid',
      },
    },
    gradient: {
      true: {
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    },
    transform: {
      uppercase: {
        textTransform: 'uppercase',
      },
      capitalize: {
        // WARNING: this will only work with block elements (display block/inline-block)
        // @see https://developer.mozilla.org/en-US/docs/Web/CSS/::first-letter
        display: 'inline-block',
        '&::first-letter': {
          textTransform: 'uppercase',
        },
      },
      capitalizeWords: {
        textTransform: 'capitalize',
      },
    },
    noWrap: {
      true: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
  },
  defaultVariants: {
    size: '3',
    variant: 'default',
  },
});

export type TextVariants = VariantProps<typeof Text>;
export type TextProps = TextVariants & { css?: CSS };
