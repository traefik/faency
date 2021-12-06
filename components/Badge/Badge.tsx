import { styled } from '../../stitches.config';

export const COLORS = ['gray', 'red', 'blue', 'green', 'neon', 'orange', 'purple'] as const;
type COLOR_VALUES = typeof COLORS[number];

type ColorVariants = Record<COLOR_VALUES, { bc: string, color: string }>
const colorVariants: ColorVariants = COLORS.reduce((variants, color) => ({
  ...variants,
  [color]: {
    bc: `$${color}6`,
    color: `$${color}10`,
  }
}), {} as ColorVariants);

const alphaColorCompoundVariants = COLORS.map((color) => ({
  alphaBg: true,
  variant: color,
  css: { bc: `$${color}A6` }
}));

const interactiveColorCompoundVariants = COLORS.map((color) => ({
  interactive: true,
  variant: color,
  css: { '&:focus-visible': { boxShadow: `0 0 0 1px $colors$${color}9` } }
}))

export const Badge = styled('span', {
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
      true: {
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
            borderRadius: '5px',
          },
        },
      },
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
  compoundVariants: [
    ...interactiveColorCompoundVariants,
    ...alphaColorCompoundVariants,
  ],
  defaultVariants: {
    size: 'small',
    interactive: false,
    variant: 'gray',
  },
});
