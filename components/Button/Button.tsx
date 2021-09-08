import { VariantProps } from '@stitches/react';
import { styled } from '../../stitches.config';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

export const Button = styled('button', {
  // Reset
  all: 'unset',
  alignItems: 'center',
  boxSizing: 'border-box',
  userSelect: 'none',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },

  // Custom reset?
  display: 'inline-flex',
  flexShrink: 0,
  justifyContent: 'center',
  lineHeight: '1',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  // Custom
  position: 'relative',
  height: '$5',
  px: '$2',
  fontFamily: '$rubik',
  fontSize: '$3',
  fontWeight: 500,
  fontVariantNumeric: 'tabular-nums',

  '@hover': {
    '&:hover': {
      cursor: 'pointer',
    },
  },

  '&:disabled': {
    pointerEvents: 'none',
    opacity: 0.5,
  },

  '&:focus-visible': {
    '&::after': {
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      zIndex: 1,
      top: '-1px',
      right: '-1px',
      bottom: '-1px',
      left: '-1px',
      display: 'block',
      pointerEvents: 'none',
      boxShadow: '0 0 0 2px $colors$focusOutline',
      transition: 'box-shadow .1s ease-in-out',
      borderRadius: '$3',
    },
  },

  variants: {
    size: {
      small: {
        borderRadius: '$3',
        height: '$5',
        px: '$2',
        fontSize: '$1',
        lineHeight: '$sizes$5',
      },
      medium: {
        borderRadius: '$3',
        height: '$6',
        px: '$4',
        fontSize: '$3',
        lineHeight: '$sizes$6',
      },
      large: {
        borderRadius: '$3',
        height: '$7',
        px: '$4',
        fontSize: '$3',
        lineHeight: '$sizes$7',
      },
    },
    variant: {
      primary: {
        backgroundColor: '$buttonPrimaryBg',
        color: '$buttonPrimaryText',
        '@hover': {
          '&:hover': {
            backgroundColor: '$buttonPrimaryHoverBg',
          },
        },
      },
      secondary: {
        backgroundColor: '$buttonSecondaryBg',
        color: '$buttonSecondaryText',
        '@hover': {
          '&:hover': {
            backgroundColor: '$buttonSecondaryHoverBg',
          },
        },
      },
      red: {
        backgroundColor: '$buttonRedBg',
        color: '$buttonRedText',
        '@hover': {
          '&:hover': {
            backgroundColor: '$buttonRedHoverBg',
          },
        },
      },
    },
    state: {
      active: {
        backgroundColor: '$deepBlue5',
        color: '$deepBlue11',
        '@hover': {
          '&:hover': {
            backgroundColor: '$deepBlue5',
          },
        },
        '&:active': {
          backgroundColor: '$deepBlue5',
        },
      },
      waiting: {
        backgroundColor: '$slate4',
        boxShadow: 'inset 0 0 0 1px $colors$slate8',
        color: 'transparent',
        pointerEvents: 'none',
        '@hover': {
          '&:hover': {
            backgroundColor: '$slate5',
            boxShadow: 'inset 0 0 0 1px $colors$slate8',
          },
        },
        '&:active': {
          backgroundColor: '$slate5',
        },
      },
    },
    ghost: {
      true: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        '@hover': {
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: 'transparent',
          },
        },
      },
    },
    rounded: {
      true: {
        borderRadius: '$pill',
      },
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      ghost: 'true',
      css: {
        color: '$buttonPrimaryGhostText',
        backgroundColor: 'transparent',
        '@hover': {
          '&:hover': {
            color: '$buttonPrimaryGhostHoverText',
            backgroundColor: 'transparent',
          },
        },
      },
    },
    {
      variant: 'secondary',
      ghost: 'true',
      css: {
        color: '$buttonSecondaryGhostText',
        backgroundColor: 'transparent',
        '@hover': {
          '&:hover': {
            color: '$buttonSecondaryGhostHoverText',
            backgroundColor: 'transparent',
          },
        },
      },
    },
    {
      variant: 'secondary',
      state: 'active',
      css: {
        backgroundColor: '$buttonPrimaryBg',
        color: '$buttonPrimaryText',
        '@hover': {
          '&:hover': {
            backgroundColor: '$buttonPrimaryHoverBg',
          },
        },
      },
    },
    {
      variant: 'red',
      ghost: 'true',
      css: {
        color: '$buttonRedBg',
        backgroundColor: 'transparent',
        '@hover': {
          '&:hover': {
            color: '$buttonRedHoverBg',
            backgroundColor: 'transparent',
          },
        },
      },
    },
  ],
  defaultVariants: {
    size: 'medium',
    variant: 'primary',
  },
});

type ButtonVariants = VariantProps<typeof Button>;
export interface ButtonProps extends ButtonVariants {}
const BaseButton = (props: ButtonProps): JSX.Element => <Button {...props} />;
export const ButtonForStory = modifyVariantsForStory<
  ButtonVariants,
  ButtonProps & React.ButtonHTMLAttributes<any>
>(BaseButton);
