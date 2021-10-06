import {styled} from '../../stitches.config';

export const Elevation = styled('div', {
  display: 'inline-block',

  variants: {
    height: {
      0: {
        boxShadow: 'none'
      },
      1: {
        boxShadow: '0 2px 6px rgba(0,0,0,.25)'
      },
      2: {
        boxShadow: '0 4px 12px rgba(0,0,0,.23)'
      },
      3: {
        boxShadow: '0 6px 18px rgba(0,0,0,.21)'
      },
      4: {
        boxShadow: '0 8px 24px rgba(0,0,0,.19)'
      },
      5: {
        boxShadow: '0 10px 32px rgba(0,0,0,.17)'
      },
    }
  },
  defaultVariants: {
    height: 0,
  },
});
