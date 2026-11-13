import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import {
  colorVariants,
  gradientVariants,
  noWrapVariants,
  sizeVariants,
  transformVariants,
  weightVariants,
} from '../../styles/textVariants.css';
import { tokens } from '../../styles/tokens.css';
import { elevationVariants } from '../Elevation/Elevation.vanilla.css';
import { ROW_LINK_CONTROL_Z_INDEX } from '../RowLink/RowLink.constants';

const rowBorder = `1px solid ${tokens.colors.tableRowBorder}`;

const alignVariants = {
  start: { textAlign: 'start' },
  center: { textAlign: 'center' },
  end: { textAlign: 'end' },
} as const;

const textVariants = {
  size: sizeVariants,
  weight: weightVariants,
  variant: colorVariants,
  gradient: gradientVariants,
  noWrap: noWrapVariants,
} as const;

const layer = (backgroundColor: string, borderRadius: Record<string, string>) =>
  ({
    pointerEvents: 'none',
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundColor,
    ...borderRadius,
  }) as const;

export const table = style({
  width: '100%',
  tableLayout: 'fixed',
  boxSizing: 'border-box',
  borderCollapse: 'separate',
  borderSpacing: 0,
  fontFamily: tokens.fonts.rubik,
  color: tokens.colors.tableText,
  borderRadius: tokens.radii['3'],
  overflow: 'hidden',
});

export const tableRecipe = recipe({
  base: table,
  variants: {
    elevation: elevationVariants,
  },
  defaultVariants: {
    elevation: 1,
  },
});

const captionBase = style({
  lineHeight: '1.25',
  margin: '0',
  fontFamily: tokens.fonts.rubik,
  fontVariantNumeric: 'proportional-nums',
  display: 'table-caption',
  textAlign: 'start',
  fontWeight: tokens.fontWeights.medium,
});

export const captionRecipe = recipe({
  base: captionBase,
  variants: {
    ...textVariants,
    transform: transformVariants,
  },
  defaultVariants: {
    size: '3',
    variant: 'default',
  },
});

export const tbody = style({
  width: '100%',
  verticalAlign: 'middle',
});

export const thead = style({
  position: 'relative',
  borderTopLeftRadius: 'inherit',
  borderTopRightRadius: 'inherit',
  verticalAlign: 'middle',

  '::after': layer(tokens.colors.tableHeaderLayerBackground, {
    borderTopLeftRadius: 'inherit',
    borderTopRightRadius: 'inherit',
  }),
});

export const tfoot = style({
  verticalAlign: 'middle',
  position: 'relative',
  borderRadius: 'inherit',

  '::after': layer(tokens.colors.tableFooterLayerBackground, { borderRadius: 'inherit' }),

  selectors: {
    [`${table} ${tbody}:not(:empty) ~ &, ${table} ${thead}:not(:empty) ~ &`]: {
      borderTopLeftRadius: '0',
      borderTopRightRadius: '0',
    },
  },
});

const tr = style({
  verticalAlign: 'inherit',
  selectors: {
    '&:hover': {
      color: tokens.colors.tableHoverText,
    },
  },
});

export const trRecipe = recipe({
  base: tr,
  variants: {
    interactive: {
      true: {
        selectors: {
          '&:hover': {
            backgroundColor: tokens.colors.tableHoverBackground,
            cursor: 'pointer',
          },
        },
      },
    },
    active: {
      true: {
        backgroundColor: tokens.colors.tableHoverBackground,
        color: tokens.colors.tableActiveText,
        fontWeight: tokens.fontWeights.semiBold,
      },
    },
  },
  compoundVariants: [
    {
      variants: { interactive: true, active: true },
      style: {
        selectors: {
          '&:hover': {
            color: tokens.colors.tableActiveHoverText,
          },
        },
      },
    },
  ],
});

// Text and Label base styles, then the header cell's own.
const th = style({
  margin: '0',
  fontFamily: tokens.fonts.rubik,
  fontVariantNumeric: 'tabular-nums',
  cursor: 'default',
  fontWeight: tokens.fontWeights.medium,
  lineHeight: '2.18',

  display: 'table-cell',
  verticalAlign: 'inherit',
  borderTopLeftRadius: 'inherit',
  borderTopRightRadius: 'inherit',
  textAlign: 'start',
  padding: `${tokens.space['2']} ${tokens.space['3']}`,
  borderBottom: rowBorder,

  selectors: {
    [`${thead} &`]: {
      fontSize: tokens.fontSizes['1'],
      color: tokens.colors.tableHeaderText,
      fontWeight: tokens.fontWeights.light,
    },
  },
});

export const thRecipe = recipe({
  base: th,
  variants: {
    ...textVariants,
    transform: {
      ...transformVariants,
      // Label's capitalize sets inline-block; a cell must stay a cell.
      capitalize: { ...transformVariants.capitalize, display: 'table-cell' },
    },
    align: alignVariants,
  },
  defaultVariants: {
    size: '0',
    variant: 'subtle',
    transform: 'capitalize',
    align: 'start',
  },
});

export const sortButton = style({
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  gap: tokens.space['2'],
  borderRadius: tokens.radii['1'],
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      color: tokens.colors.hiContrast,
    },
    '&:focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: tokens.colors.focusOutline,
      outlineOffset: '2px',
    },
  },
});

export const sortIcon = style({
  flexShrink: 0,
});

globalStyle(`${sortIcon} > path`, {
  opacity: 0.4,
});

export const sortIconActive = style({
  selectors: {
    [`${sortIcon} > &`]: {
      opacity: 1,
    },
  },
});

export const emptyHeaderCell = style({
  width: 24,
});

const td = style({
  boxSizing: 'border-box',
  padding: `${tokens.space['5']} ${tokens.space['3']}`,
  borderBottom: rowBorder,
  fontSize: tokens.fontSizes['3'],
  lineHeight: '16px',
  verticalAlign: 'inherit',

  selectors: {
    [`${tr}:last-child > &`]: {
      borderBottom: 'none',
    },
    // A closed collapsible row is followed only by its hidden content row.
    [`${tr}[data-collapsed]:nth-last-child(2) > &`]: {
      borderBottom: 'none',
    },
    [`${tfoot} &`]: {
      fontSize: tokens.fontSizes['1'],
      color: tokens.colors.tableHeaderText,
      fontWeight: tokens.fontWeights.light,
      padding: `${tokens.space['2']} ${tokens.space['3']}`,
    },
    [`${table} ${tbody}:not(:empty) ~ ${tfoot} &`]: {
      borderTop: rowBorder,
    },
  },
});

export const tdRecipe = recipe({
  base: td,
  variants: {
    subtle: {
      true: {
        fontWeight: tokens.fontWeights.regular,
        color: tokens.colors.tableSubtleText,
      },
    },
    align: alignVariants,
  },
  defaultVariants: {
    align: 'start',
  },
});

export const toggleCell = style({
  selectors: {
    '&&': {
      padding: `0 0 0 ${tokens.space['3']}`,
    },
  },
});

export const toggle = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  zIndex: ROW_LINK_CONTROL_Z_INDEX,
  height: '40px',
  ':hover': {
    color: tokens.colors.tableActiveText,
  },
});

export const expandButton = style({
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  borderRadius: tokens.radii['1'],
  cursor: 'pointer',
  selectors: {
    '&:focus-visible': {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: tokens.colors.focusOutline,
      outlineOffset: '2px',
    },
  },
});

export const chevron = style({
  transition: 'transform 0.2s ease-out',
  selectors: {
    [`${expandButton}[aria-expanded="true"] > &`]: {
      transform: 'rotate(90deg)',
    },
  },
});

// Visibility switches after the collapse animation, so closed content leaves the tab order.
export const collapsedCell = style({
  transition: 'padding 0.2s ease-out, visibility 0s',
  selectors: {
    '&&[data-closed]': {
      transition: 'padding 0.2s ease-out, visibility 0s 0.2s',
      visibility: 'hidden',
      lineHeight: 0,
      fontSize: 0,
      padding: `0px ${tokens.space['3']}`,
      border: 'none',
    },
  },
});

export const collapsedContent = style({
  boxSizing: 'border-box',
  transition: 'all 0.2s ease-out',
  selectors: {
    [`${collapsedCell}[data-closed] > &`]: {
      height: 0,
      overflow: 'hidden',
    },
  },
});
