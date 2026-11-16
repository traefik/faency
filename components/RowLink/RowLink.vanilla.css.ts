import { globalStyle, style } from '@vanilla-extract/css';

import { tokens } from '../../styles/tokens.css';
import {
  ROW_LINK_ATTRIBUTE,
  ROW_LINK_CONTROL_Z_INDEX,
  ROW_LINK_CONTROLS,
  ROW_LINK_Z_INDEX,
} from './RowLink.constants';

const hasRowLink = `&:has([${ROW_LINK_ATTRIBUTE}])`;

export const rowLink = style({
  color: 'inherit',
  textDecoration: 'none',
  outline: 'none',

  '::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: ROW_LINK_Z_INDEX,
  },

  selectors: {
    '&:focus-visible::after': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: tokens.colors.focusOutline,
      outlineOffset: '-2px',
    },
    [`&[${ROW_LINK_ATTRIBUTE}="click"]::after`]: {
      content: 'none',
    },
    [`&[${ROW_LINK_ATTRIBUTE}="click"]:focus-visible`]: {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: tokens.colors.focusOutline,
      outlineOffset: '2px',
    },
  },
});

export const rowLinkTable = style({
  selectors: {
    [hasRowLink]: {
      isolation: 'isolate',
    },
  },
});

export const rowLinkRow = style({
  selectors: {
    [hasRowLink]: {
      position: 'relative',
    },
  },
});

globalStyle(`${rowLinkRow}:has([${ROW_LINK_ATTRIBUTE}]) ${ROW_LINK_CONTROLS}`, {
  position: 'relative',
  zIndex: ROW_LINK_CONTROL_Z_INDEX,
});
