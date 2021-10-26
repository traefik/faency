import { styled } from '../stitches.config';

export const TreeItem = styled('div', {
  // Reset
  alignItems: 'center',
  boxSizing: 'border-box',
  display: 'flex',
  lineHeight: '1',
  userSelect: 'none',
  WebkitTapHighlightColor: 'transparent',
  '&:disabled': {
    pointerEvents: 'none',
  },
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },

  // Custom
  height: '29px',
  px: '$2',
  fontSize: '$1',
  color: '$hiContrast',

  variants: {
    variant: {
      gray: {
        backgroundColor: '$slate3',
        '&:hover': {
          backgroundColor: '$slate4',
        },
        '&:active': {
          backgroundColor: '$slate5',
        },
      },
      red: {
        backgroundColor: '$red3',
        '&:hover': {
          backgroundColor: '$red4',
        },
        '&:active': {
          backgroundColor: '$red5',
        },
      },
      blue: {
        backgroundColor: '$blue3',
        '&:hover': {
          backgroundColor: '$blue4',
        },
        '&:active': {
          backgroundColor: '$blue5',
        },
      },
      green: {
        backgroundColor: '$green3',
        '&:hover': {
          backgroundColor: '$green4',
        },
        '&:active': {
          backgroundColor: '$green5',
        },
      },
      yellow: {
        backgroundColor: '$yellow3',
        '&:hover': {
          backgroundColor: '$yellow4',
        },
        '&:active': {
          backgroundColor: '$yellow5',
        },
      },
      orange: {
        backgroundColor: '$orange3',
        '&:hover': {
          backgroundColor: '$orange4',
        },
        '&:active': {
          backgroundColor: '$orange5',
        },
      },
    },
  },
});
