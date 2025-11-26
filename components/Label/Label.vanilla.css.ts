import { style } from '@vanilla-extract/css';
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

// Base label styles (inherits from Text component with label-specific overrides)
const labelBase = style({
  margin: '0',
  fontFamily: tokens.fonts.rubik,
  fontVariantNumeric: 'tabular-nums',
  display: 'inline-block',
  verticalAlign: 'middle',
  cursor: 'default',
  fontWeight: tokens.fontWeights.medium,
  lineHeight: '2.18',
});

export const labelRecipe = recipe({
  base: labelBase,

  variants: {
    size: sizeVariants,
    weight: weightVariants,
    variant: colorVariants,
    gradient: gradientVariants,
    transform: transformVariants,
    noWrap: noWrapVariants,
  },

  defaultVariants: {
    size: '0',
    variant: 'subtle',
    transform: 'capitalize',
  },
});
