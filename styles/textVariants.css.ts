import { tokens } from './tokens.css';

/**
 * Shared text variant definitions used across Text-based components
 * (Text, Label, Blockquote, Paragraph, etc.)
 */

export const sizeVariants = {
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
} as const;

export const weightVariants = {
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
} as const;

export const colorVariants = {
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
} as const;

export const gradientVariants = {
  true: {
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
} as const;

export const transformVariants = {
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
} as const;

export const noWrapVariants = {
  true: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
} as const;
