import { css } from '../../stitches.config';
import { elevationVariants } from '../Elevation';

export const baseItemCss = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontFamily: '$rubik',
  fontSize: '$1',
  fontVariantNumeric: 'tabular-nums',
  lineHeight: '1',
  cursor: 'default',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  height: '$5',
  px: '$5',
});

export const itemCss = css(baseItemCss, {
  position: 'relative',
  color: '$hiContrast',

  '&:focus': {
    outline: 'none',
    backgroundColor: '$blue9',
    color: 'white',
  },

  '&[data-disabled]': {
    color: '$slate9',
  },
});

export const labelCss = css(baseItemCss, {
  color: '$slate11',
});

export const menuCss = css({
  boxSizing: 'border-box',
  minWidth: 120,
  py: '$1',
  variants: {
    elevation: elevationVariants,
  },
  defaultVariants: {
    elevation: 2,
  },
});

export const separatorCss = css({
  height: 1,
  my: '$1',
  backgroundColor: '$slate6',
});
