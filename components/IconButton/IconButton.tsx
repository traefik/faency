import { styled } from '../../stitches.config';

export const IconButton = styled('button', {
  // Reset
  alignItems: 'center',
  appearance: 'none',
  borderWidth: '0',
  boxSizing: 'border-box',
  display: 'inline-flex',
  flexShrink: 0,
  fontFamily: 'inherit',
  fontSize: '14px',
  justifyContent: 'center',
  lineHeight: '1',
  outline: 'none',
  padding: '0',
  textDecoration: 'none',
  userSelect: 'none',
  WebkitTapHighlightColor: 'transparent',
  backgroundColor: '$iconButtonBackground',

  '&::before': {
    boxSizing: 'border-box',
  },

  '&::after': {
    boxSizing: 'border-box',
  },

  '&:hover': {
    boxShadow: '0 0 1px 0 $colors$iconButtonHoverBorder',
  },

  '&:focus': {
    boxShadow: '0 0 1px 0 $colors$iconButtonFocusBorder',
  },

  '&:disabled': {
    pointerEvents: 'none',
    backgroundColor: 'transparent',
    color: '$slate6',
  },

  variants: {
    size: {
      '1': {
        borderRadius: '$1',
        height: '$5',
        width: '$5',
      },
      '2': {
        borderRadius: '$2',
        height: '$6',
        width: '$6',
      },
      '3': {
        borderRadius: '$2',
        height: '$7',
        width: '$7',
      },
      '4': {
        borderRadius: '$3',
        height: '$8',
        width: '$8',
      },
    },
    ghost: {
      true: {
        backgroundColor: 'transparent',
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: '$iconButtonHoverBackground',
        },
      },
    },
    variant: {
      default: {
        color: '$slate10',
      },
      primary: {
        color: '$primary',
      },
      red: {
        color: '$red9',
      },
      green: {
        color: '$orange9',
      },
      orange: {
        color: '$orange9',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: '2',
    ghost: true,
  },
});
