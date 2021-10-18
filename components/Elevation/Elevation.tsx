import { styled } from '../../stitches.config';

export const elevationVariant = {
  0: {
    boxShadow: 'none',
  },
  1: {
    boxShadow:
      '0 1px 5px 0 hsla(0, 0%, 0%, 0.2), 0 3px 1px -2px hsla(0, 0%, 0%, 0.12), 0 2px 2px 0 hsla(0, 0%, 0%, 0.14)',
  },
  2: {
    boxShadow:
      '0 2px 4px -1px hsla(0, 0%, 0%, 0.2), 0 1px 10px 0 hsla(0, 0%, 0%, 0.12), 0 4px 5px 0 hsla(0, 0%, 0%, 0.14)',
  },
  3: {
    boxShadow:
      '0 3px 5px -1px hsla(0, 0%, 0%, 0.2), 0 1px 18px 0 hsla(0, 0%, 0%, 0.12), 0 6px 10px 0 hsla(0, 0%, 0%, 0.14)',
  },
  4: {
    boxShadow:
      '0 7px 8px -4px hsla(0, 0%, 0%, 0.2), 0 5px 22px 4px hsla(0, 0%, 0%, 0.12), 0 12px 17px 2px hsla(0, 0%, 0%, 0.14)',
  },
  5: {
    boxShadow:
      '0 11px 15px -7px hsla(0, 0%, 0%, 0.2), 0 9px 46px 8px hsla(0, 0%, 0%, 0.12), 0 24px 38px 3px hsla(0, 0%, 0%, 0.14)',
  },
};

export const Elevation = styled('div', {
  display: 'inline-block',

  variants: {
    variant: elevationVariant,
  },
  defaultVariants: {
    variant: 1,
  },
});
