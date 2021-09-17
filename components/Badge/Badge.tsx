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
  justifyContent: 'center',
  lineHeight: '1',
  verticalAlign: 'middle',
  outline: 'none',
  padding: '0',
  textDecoration: 'none',
  userSelect: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  borderRadius: '5px',
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
        fontWeight: '300',
      },
      large: {
        height: '$5',
        px: '$3',
        fontSize: '$3',
        fontWeight: '300',
      },
    },
    variant: {
      gray: {
        backgroundColor: '$badgeDefaultBackground',
        color: '$badgeDefaultText',
      },
      red: {
        backgroundColor: '$red6',
        color: '$red10',
      },
      blue: {
        backgroundColor: '$blue5',
        color: '$blue9',
      },
      green: {
        backgroundColor: '$grass6',
        color: '$grass10',
      },
      neon: {
        backgroundColor: '$badgeNeonBackground',
        color: '$badgeNeonText',
      },
      orange: {
        backgroundColor: '$amber6',
        color: '$amber10',
      },
    },
  },
  compoundVariants: [
    {
      interactive: true,
      variant: 'gray',
      css: { '&:focus-visible': { boxShadow: '0 0 0 1px $colors$badgeDefaultText' } },
    },
    {
      interactive: true,
      variant: 'red',
      css: { '&:focus-visible': { boxShadow: '0 0 0 1px $colors$red10' } },
    },
    {
      interactive: true,
      variant: 'blue',
      css: { '&:focus-visible': { boxShadow: '0 0 0 1px $colors$blue9' } },
    },
    {
      interactive: true,
      variant: 'green',
      css: { '&:focus-visible': { boxShadow: '0 0 0 1px $colors$grass10' } },
    },
    {
      interactive: true,
      variant: 'neon',
      css: { '&:focus-visible': { boxShadow: '0 0 0 1px $colors$badgeNeonText' } },
    },
    {
      interactive: true,
      variant: 'orange',
      css: { '&:focus-visible': { boxShadow: '0 0 0 1px $colors$amber10' } },
    },
  ],
  defaultVariants: {
    size: 'small',
    interactive: false,
    variant: 'gray',
  },
});
