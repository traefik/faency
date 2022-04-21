import React, { ComponentProps, useMemo } from 'react';
import { styled, VariantProps } from '../../stitches.config';
import { Slot } from '@radix-ui/react-slot';

export const COLORS = ['gray', 'red', 'blue', 'green', 'neon', 'orange', 'purple'] as const;
type COLOR_VALUES = typeof COLORS[number];

const getColorBadgeStyles = (color: COLOR_VALUES) => ({
  bc: `$${color}6`,
  color: `$${color}10`,
});

type ColorVariants = Record<COLOR_VALUES, { bc: string; color: string }>;
const colorVariants: ColorVariants = COLORS.reduce(
  (variants, color) => ({
    ...variants,
    [color]: getColorBadgeStyles(color),
  }),
  {} as ColorVariants
);

const interactiveColorVariants: ColorVariants = COLORS.reduce(
  (variants, color) => ({
    ...variants,
    [color]: {
      ...getColorBadgeStyles(color),
      '&:focus-visible': { outline: `2px solid $${color}9` },
    },
  }),
  {} as ColorVariants
);

const alphaColorCompoundVariants = COLORS.map((color) => ({
  alphaBg: true,
  variant: color,
  css: { bc: `$${color}A6` },
}));

const BADGE_BASE_STYLES = {
  // Reset
  alignItems: 'center',
  appearance: 'none',
  border: 'none',
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
  compoundVariants: alphaColorCompoundVariants,
  defaultVariants: {
    size: 'small',
    variant: 'gray',
  },
};

const StyledSpanBadge = styled('span', BADGE_BASE_STYLES);
const StyledSpanBadgeSlot = styled(Slot, StyledSpanBadge);

const StyledButtonBadge = styled('button', BADGE_BASE_STYLES, {
  '&:focus-visible': {
    outline: '2px solid $gray9',
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
  variants: {
    variant: interactiveColorVariants,
  },
});
const StyledButtonBadgeSlot = styled(Slot, StyledButtonBadge);

interface BadgeProps
  extends ComponentProps<typeof StyledButtonBadge>,
    VariantProps<typeof StyledButtonBadge> {
  asChild?: boolean;
  interactive?: boolean;
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
