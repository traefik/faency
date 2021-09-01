import { styled } from '../stitches.config';

export const Text = styled('span', {
  // Reset
  lineHeight: '1',
  margin: '0',
  fontFamily: '$rubik',
  fontWeight: 400,
  fontVariantNumeric: 'tabular-nums',
  display: 'block',

  variants: {
    size: {
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
    },
    variant: {
      red: {
        color: '$red11',
      },
      blue: {
        color: '$blue11',
      },
      green: {
        color: '$green11',
      },
      orange: {
        color: '$orange11',
      },
      deepBlue: {
        color: '$deepBlue11',
      },
      neon: {
        color: '$neon11',
      },
      contrast: {
        color: '$hiContrast',
      },
    },
    gradient: {
      true: {
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    },
  },
  compoundVariants: [
    {
      variant: 'red',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $red11, $red6)',
      },
    },
    {
      variant: 'blue',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $blue11, $blue6)',
      },
    },
    {
      variant: 'green',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $green11, $green6)',
      },
    },
    {
      variant: 'orange',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $orange11, $orange6)',
      },
    },
    {
      variant: 'neon',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $neon, $neon)',
      },
    },
    {
      variant: 'deepBlue',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $deepBlue, $deepBlue)',
      },
    },
    {
      variant: 'contrast',
      gradient: 'true',
      css: {
        background: 'linear-gradient(to right, $hiContrast, $gray12)',
      },
    },
  ],
  defaultVariants: {
    size: '3',
    variant: 'contrast',
  },
});
