import { styled } from '../../stitches.config';

export const Badge = styled('span', {
  // Reset
  alignItems: 'center',
  appearance: 'none',
  borderWidth: '0',
  boxSizing: 'border-box',
  display: 'inline-flex',
  flexShrink: 0,
  fontFamily: '$rubik',
  fontWeight: 500,
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
    variant: {
      gray: {
        bc: '$gray9@0.2',
        color: '$gray9',
      },
      red: {
        bc: '$red9@0.2',
        color: '$red9',
      },
      blue: {
        bc: '$blue9@0.2',
        color: '$blue9',
      },
      green: {
        bc: '$green9@0.2',
        color: '$green9',
      },
      neon: {
        bc: '$neon9@0.2',
        color: '$neon9',
      },
      orange: {
        bc: '$orange9@0.2',
        color: '$orange9',
      },
    },
  },
  compoundVariants: [
    {
      interactive: true,
      variant: 'gray',
      css: { '&:focus-visible': { boxShadow: '0 0 0 1px $colors$gray9' } },
    },
    {
      interactive: true,
      variant: 'red',
      css: { '&:focus-visible': { boxShadow: '0 0 0 1px $colors$red9' } },
    },
    {
      interactive: true,
      variant: 'blue',
      css: { '&:focus-visible': { boxShadow: '0 0 0 1px $colors$blue9' } },
    },
    {
      interactive: true,
      variant: 'green',
      css: { '&:focus-visible': { boxShadow: '0 0 0 1px $colors$green9' } },
    },
    {
      interactive: true,
      variant: 'neon',
      css: { '&:focus-visible': { boxShadow: '0 0 0 1px $colors$neon9' } },
    },
    {
      interactive: true,
      variant: 'orange',
      css: { '&:focus-visible': { boxShadow: '0 0 0 1px $colors$orange9' } },
    },
  ],
  defaultVariants: {
    size: 'small',
    interactive: false,
    variant: 'gray',
  },
});
