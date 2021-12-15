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
      avatar1: {
        borderRadius: '$round',
        height: '$3',
        width: '$3',
      },
      avatar2: {
        borderRadius: '$round',
        height: '$5',
        width: '$5',
      },
      avatar3: {
        borderRadius: '$round',
        height: '$6',
        width: '$6',
      },
      avatar4: {
        borderRadius: '$round',
        height: '$7',
        width: '$7',
      },
      avatar5: {
        borderRadius: '$round',
        height: '$8',
        width: '$8',
      },
      avatar6: {
        borderRadius: '$round',
        height: '$9',
        width: '$9',
      },
      text: {
        height: '$1',
      },
      title: {
        height: '$5',
      },
      heading: {
        height: '$3',
      },
      badge: {
        borderRadius: '$pill',
      },
      button: {
        borderRadius: '$3',
      },
      text: {
        '&:empty:before': {
          content: '"\\00a0"', // adds a space character before element
        }
      },
    },
  },
  defaultVariants: {
    variant: 'text',
  },
});

export type SkeletonVariants = VariantProps<typeof Skeleton>;
export type SkeletonProps = SkeletonVariants & {};
