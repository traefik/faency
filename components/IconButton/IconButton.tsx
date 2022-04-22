import { styled, VariantProps } from '../../stitches.config';
import { BUTTON_BASE_STYLES } from '../Button';

export const IconButton = styled('button', {
  ...BUTTON_BASE_STYLES,
  // Reset
  alignItems: 'center',
  display: 'inline-flex',
  flexShrink: 0,
  fontFamily: 'inherit',
  fontSize: '14px',
  justifyContent: 'center',
  lineHeight: '1',
  // Custom
  position: 'relative',
  padding: '0',
  textDecoration: 'none',
  backgroundColor: 'transparent',

  '&::before': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
  },
  '&::after': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
  },
  '@hover': {
    '&:hover': {
      cursor: 'pointer',
      '&::before': {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
      },
      '&::after': {
        opacity: 0.05,
      },
    },
  },

  '&:focus-visible': {
    outline: '2px solid currentColor',
    '&::before': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    '&::after': {
      opacity: 0.15,
    },
  },

  '&:active': {
    '&::before': {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
    },
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
    variant: {
      default: {
        color: '$slate10',
      },
      contrast: {
        color: '$hiContrast',
      },
      primary: {
        color: '$primary',
      },
      red: {
        color: '$red9',
      },
      green: {
        color: '$green9',
      },
      orange: {
        color: '$orange9',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: '2',
  },
});

export type IconButtonVariants = VariantProps<typeof IconButton>;
