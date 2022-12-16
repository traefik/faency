import React, { ComponentProps, useMemo } from 'react';
import { styled, keyframes, CSS, VariantProps } from '../../stitches.config';
import { modifyVariantsForStory } from '../../utils/modifyVariantsForStory';
import { Slot } from '@radix-ui/react-slot';

export const BUTTON_BASE_STYLES = {
  appearance: 'none',
  userSelect: 'none',
  boxSizing: 'border-box',
  border: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  '&:disabled': {
    pointerEvents: 'none',
    opacity: 0.5,
  },
};

const BG_SIZES = {
  small: '$sizes$8',
  medium: '$sizes$9',
  large: '$sizes$10',
};

const backgroundSizeAnimation = (size: keyof typeof BG_SIZES) => ({
  $$bgSize: BG_SIZES[size],
  backgroundSize: '$$bgSize',
  backgroundImage: `linear-gradient(
            -45deg,
            transparent 33%,
            $colors$deepBlue4 33%,
            $colors$deepBlue4 66%,
            transparent 66%
          )`,
  animation: `${keyframes({
    '100%': { transform: 'translateX($$bgSize)' },
  })} 500ms linear infinite`,
});

export const StyledButton = styled('button', BUTTON_BASE_STYLES, {
  // Reset
  all: 'unset',
  alignItems: 'center',
  overflow: 'hidden',

  '&::before': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    inset: 0,
  },
  '&::after': {
    boxSizing: 'border-box',
    content: '""',
    position: 'absolute',
    inset: 0,
  },

  // Custom reset?
  display: 'inline-flex',
  flexShrink: 0,
  justifyContent: 'center',
  lineHeight: '1',

  // Custom
  position: 'relative',
  height: '$5',
  px: '$2',
  fontFamily: '$rubik',
  fontSize: '$3',
  fontWeight: '$medium',
  fontVariantNumeric: 'tabular-nums',

  '&:focus-visible': {
    boxShadow: `inset 0 0 0 2px $colors$focusOutline`,
    '&::before': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    '&::after': {
      opacity: 0.15,
    },
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

  '&:active': {
    '&::before': {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
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
        bc: '$primary',
        c: '$buttonPrimaryText',
        '&:focus-visible': {
          boxShadow: 'inset 0 0 0 2px $colors$buttonPrimaryFocusBorder',
        },
        '@hover': {
          '&:hover': {
            '&::after': {
              backgroundColor: '$primary',
            },
          },
        },
      },
      secondary: {
        bc: '$buttonSecondaryBg',
        c: '$buttonSecondaryText',
        boxShadow: 'inset 0 0 0 2px $colors$buttonSecondaryBorder',
        '&:active': {
          boxShadow: 'inset 0 0 0 1px $colors$buttonSecondaryBorder',
        },
        '&:focus-visible': {
          boxShadow: 'inset 0 0 0 2px $colors$buttonSecondaryFocusBorder',
        },
        '@hover': {
          '&:hover': {
            '&::after': {
              backgroundColor: '$primary',
            },
          },
        },
      },
      red: {
        backgroundColor: '$buttonRedBg',
        color: '$buttonRedText',
        '&:focus-visible': {
          boxShadow: 'inset 0 0 0 2px $colors$buttonRedFocusBg',
        },
      },
    },
    state: {
      active: {
        bc: '$deepBlue5',
        c: '$deepBlue11',
        '&:active': {
          backgroundColor: '$deepBlue5',
        },
      },
      waiting: {
        bc: '$deepBlue3',
        boxShadow: `inset 0 0 0 1px $deepBlue4`,
        c: 'transparent',
        overflow: 'hidden',
        pointerEvents: 'none',
        '&::after': {
          left: '-100%',
          width: '200%',
          ...backgroundSizeAnimation('medium'),
        },
      },
    },
    ghost: {
      true: {
        boxShadow: 'none',
        '@hover': {
          '&:hover': {
            boxShadow: 'none',
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
        color: '$primary',
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
            color: '$buttonRedHoverText',
            backgroundColor: 'transparent',
          },
        },
      },
    },
    {
      size: 'small',
      state: 'waiting',
      css: {
        '&::after': backgroundSizeAnimation('small'),
      },
    },
    {
      size: 'large',
      state: 'waiting',
      css: {
        '&::after': backgroundSizeAnimation('large'),
      },
    },
  ],
  defaultVariants: {
    size: 'medium',
    variant: 'primary',
  },
});
const StyledButtonSlot = styled(Slot, StyledButton);

export interface ButtonVariants extends VariantProps<typeof StyledButton> {}
export interface ButtonProps extends ComponentProps<typeof StyledButton>, ButtonVariants {
  css?: CSS;
  asChild?: boolean;
}

export const Button = React.forwardRef<React.ElementRef<typeof StyledButton>, ButtonProps>(
  ({ children, asChild, ...props }, forwardedRef) => {
    const Component = useMemo(() => (asChild ? StyledButtonSlot : StyledButton), [asChild]);
    return (
      <Component ref={forwardedRef} {...props}>
        {children}
      </Component>
    );
  }
);

const BaseButton = (props: ButtonProps): JSX.Element => <Button {...props} />;
export const ButtonForStory = modifyVariantsForStory<ButtonVariants, ButtonProps>(BaseButton);
