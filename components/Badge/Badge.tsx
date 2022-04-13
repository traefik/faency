import React, { ComponentProps, useMemo } from 'react';
import { styled, VariantProps } from '../../stitches.config';
import { Slot } from '@radix-ui/react-slot';

export const COLORS = ['gray', 'red', 'blue', 'green', 'neon', 'orange', 'purple'] as const;
type COLOR_VALUES = typeof COLORS[number];

type ColorVariants = Record<COLOR_VALUES, { bc: string; color: string }>;
const colorVariants: ColorVariants = COLORS.reduce(
  (variants, color) => ({
    ...variants,
    [color]: {
      bc: `$${color}6`,
      color: `$${color}10`,
    },
  }),
  {} as ColorVariants
);

const alphaColorCompoundVariants = COLORS.map((color) => ({
  alphaBg: true,
  variant: color,
  css: { bc: `$${color}A6` },
}));

const interactiveColorCompoundVariants = COLORS.map((color) => ({
  interactive: true,
  variant: color,
  css: { '&:focus-visible': { boxShadow: `0 0 0 1px $colors$${color}9` } },
}));

const BADGE_BASE_STYLES = {
  // Reset
  alignItems: 'center',
  appearance: 'none',
  borderWidth: '0',
  boxSizing: 'border-box',
  display: 'inline-flex',
  flexShrink: 0,
  fontFamily: '$rubik',
  fontWeight: '$medium',
  justifyContent: 'center',
  lineHeight: '1',
  verticalAlign: 'middle',
  outline: 'none',
  padding: '0',
  textDecoration: 'none',
  userSelect: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  borderRadius: '$pill',
  whiteSpace: 'nowrap',
  fontVariantNumeric: 'tabular-nums',
  position: 'relative',

  '&:disabled': {
    backgroundColor: '$slate3',
    pointerEvents: 'none',
    color: '$slate8',
  },
  variants: {
    interactive: {
      true: {},
    },
    size: {
      small: {
        height: '$4',
        px: '$2',
        fontSize: '$2',
      },
      large: {
        height: '$5',
        px: '$3',
        fontSize: '$3',
      },
    },
    variant: colorVariants,
    alphaBg: {
      true: {},
    },
  },
  compoundVariants: [...interactiveColorCompoundVariants, ...alphaColorCompoundVariants],
  defaultVariants: {
    size: 'small',
    interactive: false,
    variant: 'gray',
  },
};

const StyledSpanBadge = styled('span', BADGE_BASE_STYLES);
const StyledSpanBadgeSlot = styled(Slot, StyledSpanBadge);

const StyledButtonBadge = styled('button', BADGE_BASE_STYLES, {
  '&:focus-visible': {
    boxShadow: '0 0 0 1px $colors$focusOutline',
  },
  '&:hover': {
    cursor: 'pointer',
    '&::before': {
      backgroundColor: '$badgeInteractiveBackground',
      boxSizing: 'border-box',
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      borderRadius: 'inherit',
    },
  },
});
const StyledButtonBadgeSlot = styled(Slot, StyledButtonBadge);

interface BadgeProps
  extends ComponentProps<typeof StyledButtonBadge>,
    VariantProps<typeof StyledButtonBadge> {
  asChild?: boolean;
}

export const Badge = React.forwardRef<React.ElementRef<typeof StyledButtonBadge>, BadgeProps>(
  ({ interactive, asChild, ...props }, forwardedRef) => {
    const Component = useMemo(() => {
      if (interactive) {
        return asChild ? StyledButtonBadgeSlot : StyledButtonBadge;
      }
      return asChild ? StyledSpanBadgeSlot : StyledSpanBadge;
    }, [asChild]);

    return <Component {...props} ref={forwardedRef} />;
  }
);
