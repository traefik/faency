import { style } from '@vanilla-extract/css';

import { tokens } from '../../styles/tokens.css';
import { FULL_COL_SPAN_ATTRIBUTE } from './AriaTable.constants';

export const ariaTable = style({ display: 'table' });

export const collapsibleTable = style({ borderCollapse: 'collapse' });

export const ariaThead = style({ display: 'table-header-group' });
export const ariaTbody = style({ display: 'table-row-group' });
export const ariaTfoot = style({ display: 'table-footer-group' });

export const ariaTr = style({
  display: 'table-row',
  selectors: {
    // Places the full-width cell against its own row.
    [`&:has(> [${FULL_COL_SPAN_ATTRIBUTE}])`]: {
      position: 'relative',
    },
  },
});

export const ariaCell = style({ display: 'table-cell' });

export const fillerCell = style({ visibility: 'hidden' });

export const fullColSpanCell = style({
  position: 'absolute',
  left: 0,
  width: '100%',
});

export const collapsedRow = style({
  selectors: {
    '&[data-open]:not(:last-child)': {
      borderBottom: `1px solid ${tokens.colors.tableRowBorder}`,
    },
  },
});

// Visibility switches after the collapse animation, so closed content leaves the tab order.
export const collapsedCell = style({
  selectors: {
    '&&': {
      transition: 'all 0.2s ease-out, visibility 0s',
      paddingTop: 0,
      paddingBottom: 0,
      border: 'none',
    },
    '&&[data-closed]': {
      transition: 'all 0.2s ease-out, visibility 0s 0.2s',
      padding: `0 ${tokens.space['3']}`,
      pointerEvents: 'none',
      visibility: 'hidden',
    },
  },
});

export const collapsedContent = style({
  boxSizing: 'border-box',
  transition: 'all 0.2s ease-out',
  padding: `${tokens.space['3']} ${tokens.space['3']} 0`,
  selectors: {
    [`${collapsedCell}[data-closed] > &`]: {
      height: 0,
      overflow: 'hidden',
      padding: `0 ${tokens.space['3']}`,
    },
  },
});
