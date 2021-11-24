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
    variant: {
      gray: {
        bc: '$gray6',
        color: '$gray10',
      },
      red: {
        bc: '$red6',
        color: '$red10',
      },
      blue: {
        bc: '$blue6',
        color: '$blue10',
      },
      green: {
        bc: '$green6',
        color: '$green10',
      },
      neon: {
        bc: '$neon6',
        color: '$neon10',
      },
      orange: {
        bc: '$orange6',
        color: '$orange10',
      },
      purple: {
        bc: '$purple6',
        color: '$purple10',
      },
    },
    alphaBg: {
      true: {},
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
    {
      alphaBg: true,
      variant: 'gray',
      css: { bc: '$grayA6' },
    },
    {
      alphaBg: true,
      variant: 'red',
      css: { bc: '$redA6' },
    },
    {
      alphaBg: true,
      variant: 'blue',
      css: { bc: '$blueA6' },
    },
    {
      alphaBg: true,
      variant: 'green',
      css: { bc: '$greenA6' },
    },
    {
      alphaBg: true,
      variant: 'neon',
      css: { bc: '$neonA6' },
    },
    {
      alphaBg: true,
      variant: 'orange',
      css: { bc: '$orangeA6' },
    },
    {
      alphaBg: true,
      variant: 'purple',
      css: { bc: '$purpleA6' },
    },
  ],
  defaultVariants: {
    size: 'small',
    interactive: false,
    variant: 'gray',
  },
});
