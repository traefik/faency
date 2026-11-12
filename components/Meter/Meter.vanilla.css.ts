import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '../../styles/tokens.css';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space['1'],
  minWidth: 0,
});

export const caption = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: tokens.space['2'],
  fontFamily: tokens.fonts.rubik,
  fontSize: tokens.fontSizes['2'],
  lineHeight: '1.4',
});

export const captionLabel = style({
  color: tokens.colors.textDefault,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const captionValue = style({
  marginLeft: 'auto',
  color: tokens.colors.textSubtle,
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',
});

export const trackRecipe = recipe({
  base: {
    display: 'flex',
    width: '100%',
    borderRadius: tokens.radii['1'],
    backgroundColor: tokens.colors.meterTrackBg,
    overflow: 'hidden',
  },
  variants: {
    size: {
      small: { height: tokens.sizes['1'] },
      medium: { height: tokens.sizes['2'] },
      large: { height: '12px' },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export const segment = style({
  height: '100%',
  flexShrink: 0,
  selectors: {
    '&:nth-child(3n+1)': { backgroundColor: tokens.colors.chartSeries1 },
    '&:nth-child(3n+2)': { backgroundColor: tokens.colors.chartSeries2 },
    '&:nth-child(3n)': { backgroundColor: tokens.colors.chartSeries3 },
    '&:last-child': {
      borderTopRightRadius: tokens.radii['1'],
      borderBottomRightRadius: tokens.radii['1'],
    },
  },
});
