import { VariantProps, CSS } from '@stitches/react';
import React from 'react';
import merge from 'lodash.merge';
import { styled, keyframes } from '../../stitches.config';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';

export const StyledButton = styled('button', {
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
      top: '-2px',
      right: '-2px',
      bottom: '-2px',
      left: '-2px',
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
        px: '$3',
        fontSize: '$3',
        lineHeight: '$sizes$6',
      },
      large: {
        borderRadius: '$3',
        height: '$7',
        px: '$3',
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
        backgroundColor: '$deepBlue3',
        boxShadow: `inset 0 0 0 1px $deepBlue4`,
        color: 'transparent',
        overflow: 'hidden',
        pointerEvents: 'none',
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
      state: 'waiting',
      css: {
        backgroundColor: '$deepBlue3',
        color: 'transparent',
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
      state: 'waiting',
      css: {
        backgroundColor: '$deepBlue3',
        color: 'transparent',
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

type ButtonVariants = VariantProps<typeof StyledButton>;
export type ButtonProps = ButtonVariants;

const Waiting = styled('div', {
  position: 'absolute',
  top: 0,
  left: '-100%',
  width: '200%',
  height: '100%',
  backgroundImage: `linear-gradient(
                -45deg,
                transparent 33%,
                $colors$deepBlue4 33%,
                $colors$deepBlue4 66%,
                transparent 66%
              )`,
  variants: {
    size: {
      small: {
        $$bgSize: '$sizes$8',
        backgroundSize: '$$bgSize',
        animation: `${keyframes({
          '100%': { transform: 'translateX($sizes$8)' },
        })} 500ms linear infinite`,
      },
      medium: {
        $$bgSize: '$sizes$9',
        backgroundSize: '$$bgSize',
        animation: `${keyframes({
          '100%': { transform: 'translateX($sizes$9)' },
        })} 500ms linear infinite`,
      },
      large: {
        $$bgSize: '$sizes$10',
        backgroundSize: '$$bgSize',
        animation: `${keyframes({
          '100%': { transform: 'translateX($sizes$10)' },
        })} 500ms linear infinite`,
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export const Button = React.forwardRef<React.ElementRef<typeof StyledButton>, ButtonProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <StyledButton ref={forwardedRef} {...props}>
        {children}
        {props.state === 'waiting' && <Waiting size={props.size} />}
      </StyledButton>
    );
  }
);

const BaseButton = (props: ButtonProps): JSX.Element => <Button {...props} />;
export const ButtonForStory = modifyVariantsForStory<
  ButtonVariants,
  ButtonProps & React.ButtonHTMLAttributes<any>
>(BaseButton);
