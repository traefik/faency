import { styled } from '../stitches.config';

export const Code = styled('code', {
  fontFamily: '$mono',
  fontSize: 'max(12px, 85%)',
  whiteSpace: 'nowrap',
  padding: '0 3px 2px 3px',

  variants: {
    variant: {
      gray: {
        backgroundColor: '$slate3',
        color: '$slate11',
      },
      deepBlue: {
        backgroundColor: '$deepBlue3',
        color: '$deepBlue11',
      },
    },
  },
  defaultVariants: {
    variant: 'deepBlue',
  },
});
