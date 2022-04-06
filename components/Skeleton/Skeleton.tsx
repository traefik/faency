import { keyframes, styled, VariantProps } from '../../stitches.config';

const pulse = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: '100%' },
});

export const Skeleton = styled('div', {
  backgroundColor: '$skeletonBackground',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '3px',
  height: 'auto',
  width: 'auto',
  '&:not(:empty)': {
    '& > *': {
      visibility: 'hidden',
    },
    maxWidth: 'fit-content',
  },

  '&::after': {
    animationName: `${pulse}`,
    animationDuration: '500ms',
    animationDirection: 'alternate',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
    backgroundColor: '$skeletonAnimation',
    borderRadius: 'inherit',
    bottom: 0,
    content: '""',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },

  variants: {
    variant: {
      square: {
        borderRadius: '$2',
      },
      circle: {
        borderRadius: '$round',
      },
      badge: {
        borderRadius: '$pill',
      },
      button: {
        borderRadius: '$3',
        display: 'inline-flex',
      },
      text: {
        '&:empty:before': {
          content: '"\\00a0"', // adds a space character before element
        },
      },
    },
  },
  defaultVariants: {
    variant: 'text',
  },
});

export type SkeletonVariants = VariantProps<typeof Skeleton>;
export type SkeletonProps = SkeletonVariants & {};
