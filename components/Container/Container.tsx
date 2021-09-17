import { styled } from '../../stitches.config';

export const Container = styled('div', {
  // Reset
  boxSizing: 'border-box',
  flexShrink: 0,

  // Custom
  ml: 'auto',
  mr: 'auto',
  px: '$5',

  variants: {
    size: {
      '1': {
        maxWidth: '425px',
      },
      '2': {
        maxWidth: '768px',
      },
      '3': {
        maxWidth: '1440px',
      },
      '4': {
        maxWidth: 'none',
      },
    },
    noGutter: {
      true: {
        px: 0,
      },
    },
  },
  defaultVariants: {
    size: '4',
  },
});
