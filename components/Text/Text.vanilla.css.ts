import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { tokens } from '../../styles';
import {
  colorVariants,
  gradientVariants,
  noWrapVariants,
  sizeVariants,
  transformVariants,
  weightVariants,
} from '../../styles/textVariants.css';

const text = style({
  lineHeight: '1',
  margin: '0',
  fontFamily: tokens.fonts.rubik,
  fontVariantNumeric: 'tabular-nums',
  display: 'inline-block',
});

export const textRecipe = recipe({
  base: text,

  variants: {
    size: sizeVariants,
    weight: weightVariants,
    variant: colorVariants,
    gradient: gradientVariants,
    transform: transformVariants,
    noWrap: noWrapVariants,
  },

  defaultVariants: {
    size: '3',
    variant: 'default',
  },
});
