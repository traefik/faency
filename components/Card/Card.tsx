import { styled } from '../../stitches.config';

export const Card = styled('div', {
  appearance: 'none',
  border: 'none',
  boxSizing: 'border-box',
  font: 'inherit',
  lineHeight: '1',
  outline: 'none',
  padding: '$3',
  textAlign: 'inherit',
  verticalAlign: 'middle',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

  backgroundColor: '$cardBackground',
  display: 'block',
  textDecoration: 'none',
  color: 'inherit',
  borderRadius: '$3',
  position: 'relative',
  boxShadow: '0 0 10px 0px $colors$cardShadow',

  '&::before': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    boxShadow: 'inset 0 0 0 1px $colors$cardBorder',
    borderRadius: '$3',
    pointerEvents: 'none',
  },

  variants: {
    variant: {
      inner: {
        backgroundColor: 'rgba(255,255,255,.07)',
      },
      ghost: {
        backgroundColor: '$cardGhostBackground',
        '&::before': {
          boxShadow: 'none',
        },
      },
    },
    interactive: {
      true: {
        '@hover': {
          '&:hover': {
            '&::before': {
              boxShadow: 'inset 0 0 0 1px $colors$cardHoverBorder',
              backgroundColor: '$cardHoverBackground',
            },
          },
        },
      },
    },
    active: {
      true: {
        '&::before': {
          boxShadow: 'inset 0 0 0 1px $colors$cardActiveBorder',
          backgroundColor: '$cardActiveBackground',
        },
      },
    },
  },
});
