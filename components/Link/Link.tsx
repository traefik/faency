import { styled } from '../../stitches.config';
import { Text } from '../Text';

export const UnstyledLink = styled('a', {
  color: 'inherit',
  textDecoration: 'inherit',
  fontWeight: 'inherit',
});

export const Link = styled('a', {
  alignItems: 'center',
  gap: '$1',
  flexShrink: 0,
  outline: 'none',

  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  textDecorationColor: '$slate4',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  lineHeight: 'inherit',
  fontFamily: '$rubik',

  '@hover': {
    '&:hover': {
      textDecorationLine: 'underline',
    },
  },
  '&:focus': {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineOffset: '2px',
    textDecorationLine: 'none',
  },
  [`& ${Text}`]: {
    color: 'inherit',
  },
  variants: {
    variant: {
      blue: {
        color: '$linkBlue',
        textDecoration: 'none',
        textDecorationColor: '$linkBlueTextDecoration',
        '&:focus': {
          outlineColor: '$linkBlueFocusOutline',
        },
      },
      primary: {
        color: '$linkPrimary',
        textDecoration: 'none',
        '@hover': {
          '&:hover': {
            textDecorationColor: '$linkPrimaryHoverTextDecoration',
          },
        },
        '&:focus': {
          outlineColor: '$linkPrimaryFocusOutline',
        },
      },
      subtle: {
        color: '$linkSubtle',
        textDecorationColor: '$linkSubtleTextDecoration',
        '@hover': {
          '&:hover': {
            textDecorationColor: '$linkSubtleHoverTextDecoration',
          },
        },
        '&:focus': {
          outlineColor: '$linkSubtleFocusOutline',
        },
      },
      contrast: {
        color: '$linkContrast',
        textDecorationColor: '$linkContrastTextDecoration',
        '@hover': {
          '&:hover': {
            textDecorationColor: '$linkContrastHoverTextDecoration',
          },
        },
        '&:focus': {
          outlineColor: '$linkContrastFocusOutline',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'contrast',
  },
});
