import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '@/styles/tokens.css';

export const layout = style({
  display: 'inline-flex',
  flexDirection: 'column',
  gap: tokens.space['2'],
});

export const row = style({
  display: 'flex',
});

export const calendarRecipe = recipe({
  base: {
    flex: 1,
    minHeight: '280px',
    minWidth: '268px',
  },
  variants: {
    mode: {
      fluid: { minHeight: '244px' },
      static: {},
    },
  },
});

export const pageRecipe = recipe({
  base: {
    display: 'none',
    flexDirection: 'column',
    height: '100%',
  },
  variants: {
    visible: {
      true: { display: 'flex' },
    },
  },
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.space['2'],
  paddingLeft: tokens.space['2'],
  paddingRight: tokens.space['2'],
});

export const headerCenterButton = style({
  flexGrow: 1,
  textAlign: 'center',
});

export const gridRecipe = recipe({
  base: {
    display: 'grid',
    alignItems: 'center',
    gap: tokens.space['1'],
    paddingLeft: tokens.space['2'],
    paddingRight: tokens.space['2'],
    borderLeft: `2px solid ${tokens.colors.buttonSecondaryBorder}`,
    borderRight: `2px solid ${tokens.colors.buttonSecondaryBorder}`,
  },
  variants: {
    columns: {
      '3': { gridTemplateColumns: 'repeat(3, 1fr)', height: '100%' },
      '7': { gridTemplateColumns: 'repeat(7, 1fr)' },
    },
  },
});

// Styles that override ButtonVanilla or TextVanilla base styles use '&&' to double the class,
// so they win regardless of the order the bundler emits the stylesheets in.
export const weekDay = style({
  selectors: {
    '&&': { lineHeight: tokens.sizes['6'], textAlign: 'center' },
  },
});

export const cellRecipe = recipe({
  base: {
    selectors: {
      '&&': { paddingLeft: 0, paddingRight: 0, textAlign: 'center' },
    },
  },
  variants: {
    kind: {
      day: { selectors: { '&&': { width: '32px' } } },
      month: {},
      year: {},
      time: {
        selectors: {
          '&&': { paddingLeft: tokens.space['2'], paddingRight: tokens.space['2'] },
        },
      },
    },
    now: {
      true: { selectors: { '&&': { fontWeight: tokens.fontWeights.bold } } },
    },
    outside: {
      true: { selectors: { '&&': { color: tokens.colors.textSubtle } } },
    },
  },
});

export const timeColumn = style({
  flex: 1,
  width: '90px',
  position: 'relative',
  overflow: 'auto',
});

export const timeColumnInner = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space['1'],
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
});

export const timeLabel = style({
  selectors: {
    '&&': { marginTop: '32px', marginLeft: '8px', lineHeight: tokens.sizes['6'] },
  },
});

export const timeList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space['1'],
  overflow: 'auto',
  paddingLeft: tokens.space['2'],
  paddingRight: tokens.space['2'],
});

export const presets = style({
  display: 'flex',
  gap: tokens.space['2'],
});

export const presetButton = style({
  flex: '1 1 0',
});

export const visuallyHidden = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
});
