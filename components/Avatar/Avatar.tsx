import React from 'react';
import { styled, VariantProps, CSS } from '../../stitches.config';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { Box } from '../Box';

const StyledAvatar = styled(AvatarPrimitive.Root, {
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  boxSizing: 'border-box',
  display: 'flex',
  flexShrink: 0,
  position: 'relative',
  border: 'none',
  fontFamily: 'inherit',
  lineHeight: '1',
  margin: '0',
  outline: 'none',
  padding: '0',
  fontWeight: '500' as any,
  color: '$hiContrast',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 'inherit',
    boxShadow: 'inset 0px 0px 1px rgba(0, 0, 0, 0.12)',
  },

  variants: {
    size: {
      '1': {
        width: '$3',
        height: '$3',
      },
      '2': {
        width: '$5',
        height: '$5',
      },
      '3': {
        width: '$6',
        height: '$6',
      },
      '4': {
        width: '$7',
        height: '$7',
      },
      '5': {
        width: '$8',
        height: '$8',
      },
      '6': {
        width: '$9',
        height: '$9',
      },
    },
    variant: {
      gray: {
        backgroundColor: '$slate5',
      },
      red: {
        backgroundColor: '$red5',
      },
      purple: {
        backgroundColor: '$purple5',
      },
      blue: {
        backgroundColor: '$blue5',
      },
      green: {
        backgroundColor: '$green5',
      },
      grass: {
        backgroundColor: '$grass5',
      },
      amber: {
        backgroundColor: '$amber5',
      },
      orange: {
        backgroundColor: '$orange5',
      },
    },
    shape: {
      square: {
        borderRadius: '$2',
      },
      circle: {
        borderRadius: '50%',
      },
    },
  },
  defaultVariants: {
    size: '2',
    variant: 'gray',
    shape: 'circle',
  },
});

const StyledAvatarImage = styled(AvatarPrimitive.Image, {
  display: 'flex',
  objectFit: 'cover',
  boxSizing: 'border-box',
  height: '100%',
  verticalAlign: 'middle',
  width: '100%',
});

const StyledAvatarFallback = styled(AvatarPrimitive.Fallback, {
  textTransform: 'uppercase',
  fontFamily: '$rubik',
  color: '$deepBlue10',

  variants: {
    size: {
      '1': {
        fontSize: '10px',
        lineHeight: '15px',
      },
      '2': {
        fontSize: '$3',
      },
      '3': {
        fontSize: '$6',
      },
      '4': {
        fontSize: '$7',
      },
      '5': {
        fontSize: '$8',
      },
      '6': {
        fontSize: '$9',
      },
    },
  },
  defaultVariants: {
    size: '2',
  },
});

type AvatarVariants = VariantProps<typeof StyledAvatar>;
type AvatarPrimitiveProps = Omit<React.ComponentProps<typeof AvatarPrimitive.Root>, 'as'>;
type AvatarOwnProps = AvatarPrimitiveProps &
  AvatarVariants & {
    css?: CSS;
    alt?: string;
    src?: string;
    fallback?: React.ReactNode;
    // status?: StatusColors['variant'];
  };

export const Avatar = React.forwardRef<React.ElementRef<typeof StyledAvatar>, AvatarOwnProps>(
  ({ alt, src, fallback, size, variant, shape, css, ...props }, forwardedRef) => {
    return (
      <Box
        css={{
          ...css,
          position: 'relative',
          height: 'fit-content',
          width: 'fit-content',
        }}
      >
        <StyledAvatar {...props} ref={forwardedRef} size={size} variant={variant} shape={shape}>
          <StyledAvatarImage alt={alt} src={src} />
          <StyledAvatarFallback size={size}>{fallback}</StyledAvatarFallback>
        </StyledAvatar>
      </Box>
    );
  }
);
