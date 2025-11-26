import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '../../styles/tokens.css';

// Base blockquote styles (inherits from Text component with blockquote-specific overrides)
const blockquoteBase = style({
  lineHeight: '1',
  margin: '0',
  fontFamily: tokens.fonts.rubik,
  fontVariantNumeric: 'tabular-nums',
  display: 'inline-block',
  borderLeft: `2px solid ${tokens.colors.textDefault}`,
  padding: `${tokens.space['2']} ${tokens.space['3']}`,
});

export const blockquoteRecipe = recipe({
  base: blockquoteBase,

  variants: {
    size: {
      '0': {
        fontSize: tokens.fontSizes['0'],
      },
      '1': {
        fontSize: tokens.fontSizes['1'],
      },
      '2': {
        fontSize: tokens.fontSizes['2'],
      },
      '3': {
        fontSize: tokens.fontSizes['3'],
      },
      '4': {
        fontSize: tokens.fontSizes['4'],
      },
      '5': {
        fontSize: tokens.fontSizes['5'],
      },
      '6': {
        fontSize: tokens.fontSizes['6'],
      },
      '7': {
        fontSize: tokens.fontSizes['7'],
      },
      '8': {
        fontSize: tokens.fontSizes['8'],
      },
      '9': {
        fontSize: tokens.fontSizes['9'],
      },
      '10': {
        fontSize: tokens.fontSizes['10'],
      },
      '11': {
        fontSize: tokens.fontSizes['11'],
      },
      '12': {
        fontSize: tokens.fontSizes['12'],
      },
      inherit: {
        fontSize: 'inherit',
      },
    },
    weight: {
      light: {
        fontWeight: tokens.fontWeights.light,
      },
      regular: {
        fontWeight: tokens.fontWeights.regular,
      },
      medium: {
        fontWeight: tokens.fontWeights.medium,
      },
      semiBold: {
        fontWeight: tokens.fontWeights.semiBold,
      },
      bold: {
        fontWeight: tokens.fontWeights.bold,
      },
    },
    variant: {
      red: {
        color: tokens.colors.textRed,
      },
      subtle: {
        color: tokens.colors.textSubtle,
      },
      default: {
        color: tokens.colors.textDefault,
      },
      contrast: {
        color: tokens.colors.textContrast,
      },
      inherit: {
        color: 'inherit',
      },
      invalid: {
        color: tokens.colors.textInvalid,
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
        display: 'inline-block',
        selectors: {
          '&::first-letter': {
            textTransform: 'uppercase',
          },
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
